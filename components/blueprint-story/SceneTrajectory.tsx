// Architected and built by Classy.
import styles from './blueprint-story.module.css'
import { Frame } from './Frame'

/** Copy fase sesuai arahan Chief (2026-07-07). */
const ZONES = [
  {
    label: 'T0 · Baseline Clinical State',
    detailLines: ['Status awal pasien sebagai', 'titik acuan klinis.'],
  },
  {
    label: 'T1 · Subtle Physiological Deviation',
    detailLines: ['Muncul perubahan ringan atau sinyal', 'awal yang belum tampak kritis.'],
  },
  {
    label: 'T2 · Escalating Deterioration Risk',
    detailLines: ['Pola perubahan mulai mengarah pada', 'peningkatan risiko perburukan.'],
  },
  {
    label: 'T3 · Critical Deterioration Alert',
    detailLines: [
      'Kondisi menunjukkan potensi deteriorasi',
      'bermakna dan membutuhkan',
      'eskalasi klinis segera.',
    ],
  },
]

/**
 * The rising deterioration curve is split into four connected segments so the
 * scrub can reveal one zone at a time: [segment i] + [divider i-1] + [labels i].
 * Draw steps: 0 = frame, 1 = axes, 2..5 = zones (with phase-boundary nodes).
 */
const DESKTOP_SEGMENTS = [
  'M60,430 C150,427 240,418 330,398',
  'M330,398 C420,378 510,352 600,318',
  'M600,318 C690,284 780,248 870,212',
  'M870,212 C960,176 1050,146 1140,120',
]
const DESKTOP_DIVIDERS = ['M330,470 V150', 'M600,470 V150', 'M870,470 V150']
const DESKTOP_NODES: Array<[number, number]> = [
  [60, 430],
  [330, 398],
  [600, 318],
  [870, 212],
  [1140, 120],
]

const MOBILE_SEGMENTS = [
  'M40,368 C72,364 104,356 135,340',
  'M135,340 C166,324 198,300 230,272',
  'M230,272 C262,244 294,216 325,190',
  'M325,190 C356,164 388,140 420,120',
]
const MOBILE_DIVIDERS = ['M135,400 V150', 'M230,400 V150', 'M325,400 V150']
const MOBILE_NODES: Array<[number, number]> = [
  [40, 368],
  [135, 340],
  [230, 272],
  [325, 190],
  [420, 120],
]

const diamond = ([x, y]: [number, number], r: number) =>
  `M${x - r},${y} L${x},${y - r} L${x + r},${y} L${x},${y + r} Z`

/**
 * Keluarga rumus pemantauan, semuanya persis dari kode med-assist:
 * clinical-snapshot.ts (SI, MAP via occult-shock-detector, PP),
 * clinical-trajectory-intelligence.ts (NEWS2 + aturan eskalasi SIRS∧NEWS2),
 * occult-shock-detector.ts (SHOCK_THRESHOLDS).
 */
const FORMULAS = [
  'SI = nadi / sistolik',
  'MAP = diastolik + (sistolik − diastolik) / 3',
  'PP = sistolik − diastolik',
  'NEWS2 = Σ skor(RR, SpO₂, sistolik, nadi, suhu, kesadaran)',
  'eskalasi: SIRS ≥ 2 ∧ NEWS2 ≥ 4',
  'ambang syok: SBP < 90 · MAP < 65 · ΔSBP ≥ 40',
]

type DiagramSpec = {
  className: string
  viewBox: string
  frame: { w: number; h: number; inset?: number; blockW?: number }
  axis: string
  /** sumbu risiko (vertikal) + panah, dan panah ujung sumbu waktu */
  axisExtra: string
  /** grid chart: garis horizontal (level risiko) + vertikal (tick waktu) */
  gridH: string
  gridV: string
  riskLabel: { x: number; y: number }
  timeLabel: { x: number; y: number }
  segments: string[]
  dividers: string[]
  nodes: Array<[number, number]>
  nodeR: number
  formulaHeading: string
  formulaBracket: string
  formulaX: number
  formulaHeadingY: number
  formulaStartY: number
  formulaLineGap: number
  formulaSize: number
  formulaHeadingSize: number
  labelSize: number
  detailSize: number
  detailLineGap: number
} &
  // 'columns' = label per zona di bawah sumbu; 'legend' = daftar vertikal.
  (| { labelMode: 'columns'; zoneCenters: number[]; labelY: number }
    | { labelMode: 'legend'; legendX: number; legendStartY: number }
  )

function ZoneLabels({ spec }: { spec: DiagramSpec }) {
  if (spec.labelMode === 'columns') {
    return (
      <>
        {ZONES.map((zone, i) => (
          <g data-fade="" data-step={2 + i} key={zone.label}>
            <text
              className={`${styles.sans} ${styles.txtMain}`}
              fontSize={spec.labelSize}
              textAnchor="middle"
              x={spec.zoneCenters[i]}
              y={spec.labelY}
            >
              {zone.label}
            </text>
            {zone.detailLines.map((line, j) => (
              <text
                key={line}
                className={`${styles.sans} ${styles.txtMuted}`}
                fontSize={spec.detailSize}
                textAnchor="middle"
                x={spec.zoneCenters[i]}
                y={spec.labelY + 18 + j * spec.detailLineGap}
              >
                {line}
              </text>
            ))}
          </g>
        ))}
      </>
    )
  }

  // Legend: daftar vertikal di bawah sumbu (untuk layar sempit).
  const tops: number[] = []
  for (let i = 0; i < ZONES.length; i++) {
    tops.push(
      i === 0
        ? spec.legendStartY
        : tops[i - 1] + 18 + ZONES[i - 1].detailLines.length * spec.detailLineGap + 10
    )
  }
  return (
    <>
      {ZONES.map((zone, i) => {
        const top = tops[i]
        return (
          <g data-fade="" data-step={2 + i} key={zone.label}>
            <text
              className={`${styles.sans} ${styles.txtMain}`}
              fontSize={spec.labelSize}
              x={spec.legendX}
              y={top}
            >
              {zone.label}
            </text>
            {zone.detailLines.map((line, j) => (
              <text
                key={line}
                className={`${styles.sans} ${styles.txtMuted}`}
                fontSize={spec.detailSize}
                x={spec.legendX}
                y={top + 16 + j * spec.detailLineGap}
              >
                {line}
              </text>
            ))}
          </g>
        )
      })}
    </>
  )
}

function Diagram({ spec }: { spec: DiagramSpec }) {
  return (
    <svg
      className={`${styles.canvas} ${spec.className}`}
      viewBox={spec.viewBox}
      role="img"
      aria-label="Kurva deteriorasi T0 sampai T3 yang menanjak melewati empat fase pemantauan"
    >
      <Frame
        {...spec.frame}
        name="SENTRA — TRAJECTORY"
        dwg="DWG T0T3-001 · REV A"
        sheet="SKALA NTS · SHEET 02/03"
      />
      <path
        data-draw=""
        data-step={1}
        className={`${styles.draw} ${styles.thin}`}
        pathLength={1}
        d={spec.axis}
      />
      <path
        data-draw=""
        data-step={1}
        className={`${styles.draw} ${styles.thin} ${styles.soft}`}
        pathLength={1}
        d={spec.axisExtra}
      />
      <path
        data-draw=""
        data-step={1}
        className={`${styles.draw} ${styles.thin} ${styles.faint}`}
        pathLength={1}
        d={spec.gridH}
      />
      <path
        data-draw=""
        data-step={1}
        className={`${styles.draw} ${styles.thin} ${styles.faint}`}
        pathLength={1}
        d={spec.gridV}
      />
      <g data-fade="" data-step={1}>
        <text
          className={`${styles.mono} ${styles.txtMuted}`}
          fontSize={spec.detailSize}
          textAnchor="middle"
          transform={`rotate(-90 ${spec.riskLabel.x} ${spec.riskLabel.y})`}
          x={spec.riskLabel.x}
          y={spec.riskLabel.y}
        >
          risiko
        </text>
        <text
          className={`${styles.mono} ${styles.txtMuted}`}
          fontSize={spec.detailSize}
          textAnchor="end"
          x={spec.timeLabel.x}
          y={spec.timeLabel.y}
        >
          waktu
        </text>
      </g>
      {/* Keluarga rumus & algoritme pemantauan di ruang atas-kiri kurva */}
      <path
        data-draw=""
        data-step={1}
        className={`${styles.draw} ${styles.thin}`}
        pathLength={1}
        d={spec.formulaBracket}
      />
      <g data-fade="" data-step={1}>
        <text
          className={`${styles.mono} ${styles.txtAccent}`}
          fontSize={spec.formulaHeadingSize}
          x={spec.formulaX}
          y={spec.formulaHeadingY}
        >
          {spec.formulaHeading}
        </text>
        {FORMULAS.map((line, i) => (
          <text
            key={line}
            className={`${styles.mono} ${styles.txtMuted}`}
            fontSize={spec.formulaSize}
            x={spec.formulaX}
            y={spec.formulaStartY + i * spec.formulaLineGap}
          >
            {line}
          </text>
        ))}
      </g>
      {ZONES.map((zone, i) => (
        <g key={zone.label}>
          {i > 0 && (
            <path
              data-draw=""
              data-step={2 + i}
              className={`${styles.draw} ${styles.thin} ${styles.soft}`}
              pathLength={1}
              d={spec.dividers[i - 1]}
            />
          )}
          <path
            data-draw=""
            data-step={2 + i}
            className={styles.draw}
            pathLength={1}
            d={spec.segments[i]}
          />
          <path
            data-draw=""
            data-step={2 + i}
            className={`${styles.draw} ${styles.thin}`}
            pathLength={1}
            d={
              diamond(spec.nodes[i], spec.nodeR) +
              (i === ZONES.length - 1 ? ` ${diamond(spec.nodes[i + 1], spec.nodeR)}` : '')
            }
          />
        </g>
      ))}
      <ZoneLabels spec={spec} />
    </svg>
  )
}

const DESKTOP_SPEC: DiagramSpec = {
  className: styles.desktopOnly,
  viewBox: '0 0 1200 700',
  frame: { w: 1200, h: 700 },
  axis: 'M60,470 H1140',
  axisExtra: 'M60,470 V150 M56,158 L60,150 L64,158 M1140,470 H1150 M1143,466 L1150,470 L1143,474',
  gridH: 'M64,214 H1136 M64,278 H1136 M64,342 H1136 M64,406 H1136',
  gridV: 'M195,154 V466 M465,154 V466 M735,154 V466 M1005,154 V466',
  riskLabel: { x: 44, y: 310 },
  timeLabel: { x: 1148, y: 458 },
  segments: DESKTOP_SEGMENTS,
  dividers: DESKTOP_DIVIDERS,
  nodes: DESKTOP_NODES,
  nodeR: 5,
  formulaHeading: 'RUMUS PEMANTAUAN — clinical-snapshot · NEWS2',
  formulaBracket: 'M100,174 H106 M100,174 V326 M100,326 H106',
  formulaX: 114,
  formulaHeadingY: 184,
  formulaStartY: 210,
  formulaLineGap: 22,
  formulaSize: 11.5,
  formulaHeadingSize: 10,
  labelMode: 'columns',
  zoneCenters: [195, 465, 735, 1005],
  labelY: 496,
  labelSize: 14,
  detailSize: 11,
  detailLineGap: 15,
}

const MOBILE_SPEC: DiagramSpec = {
  className: styles.mobileOnly,
  viewBox: '0 0 460 800',
  frame: { w: 460, h: 800, inset: 12, blockW: 238 },
  axis: 'M40,400 H420',
  axisExtra: 'M40,400 V150 M36,158 L40,150 L44,158 M420,400 H428 M423,396 L428,400 L423,404',
  gridH: 'M44,200 H416 M44,250 H416 M44,300 H416 M44,350 H416',
  gridV: 'M87.5,154 V396 M182.5,154 V396 M277.5,154 V396 M372.5,154 V396',
  riskLabel: { x: 28, y: 275 },
  timeLabel: { x: 426, y: 390 },
  segments: MOBILE_SEGMENTS,
  dividers: MOBILE_DIVIDERS,
  nodes: MOBILE_NODES,
  nodeR: 4,
  formulaHeading: 'RUMUS — clinical-snapshot · NEWS2',
  formulaBracket: 'M44,164 H49 M44,164 V284 M44,284 H49',
  formulaX: 54,
  formulaHeadingY: 174,
  formulaStartY: 192,
  formulaLineGap: 17,
  formulaSize: 8.5,
  formulaHeadingSize: 8,
  labelMode: 'legend',
  labelSize: 13,
  detailSize: 11,
  detailLineGap: 14,
  legendX: 40,
  legendStartY: 432,
}

export function SceneTrajectory() {
  return (
    <div data-bp-scene="" className={styles.scene}>
      <header data-fade="" data-step={0} className={styles.sceneHead}>
        <p className={styles.kicker}>Blueprint 02</p>
        <h2 className={styles.title}>TRAJECTORY — Linimasa Perburukan Klinis T0→T3</h2>
        <p className={styles.subtitle}>
          Kerangka Empat Fase Pemantauan Dini Risiko Deteriorasi Pasien
        </p>
      </header>
      <div className={styles.canvasWrap}>
        <Diagram spec={DESKTOP_SPEC} />
        <Diagram spec={MOBILE_SPEC} />
      </div>
    </div>
  )
}
