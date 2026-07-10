// Architected and built by Classy.
import styles from './blueprint-story.module.css'
import { Frame } from './Frame'

const STAGES = [
  { no: '01', name: 'Input klinis', detail: 'vital sign & red flag' },
  { no: '02', name: 'Gate registry', detail: '21 legacy gates' },
  { no: '03', name: 'Pattern engine', detail: '70 pola · 11 kategori' },
  { no: '04', name: 'Protocol resolver', detail: '9 protokol ABCDE' },
  { no: '05', name: 'Triage verdict', detail: '4 zona keputusan' },
]

const FLOWS = ['vitals stream', 'gate flags', 'matched patterns', 'verdict payload']

/** Empat zona TriageZone persis seperti di lib/emergency-detector (med-assist). */
const VERDICT_ZONES = ['standby', 'hijau', 'kuning', 'merah']

const ABCDE = ['A', 'B', 'C', 'D', 'E']

/**
 * Registry engine nyata dari med-assist: lib/emergency-detector dan
 * lib/iskandar-diagnosis-engine (nama modul apa adanya; dua nama terpanjang
 * dipendekkan agar muat di chip).
 */
const ENGINES = [
  'gate-registry',
  'pattern-engine',
  'clinical-patterns',
  'action-protocols',
  'action-protocol-resolver',
  'triage-verdict',
  'ttv-inference',
  'gate2-workflow',
  'clinical-snapshot',
  'occult-shock-detector',
  'htn-classifier',
  'glucose-classifier',
  'symptom-signals',
  'recommendation-formatter',
  'red-flags',
  'traffic-light',
  'symptom-matcher',
  'ddi-checker',
  'reasoning-arbiter',
  'reasoning-evidence',
  'reasoning-therapy',
  'diagnosis-algorithm',
  'differential-diagnosis',
  'epidemiology-weights',
  'trajectory-analyzer',
  'hybrid-trajectory',
  'referral-decision-tree',
]

/** Draw steps: 0 frame, ganjil = kotak stage, genap = konektor + label flow,
 *  anotasi menempel pada step stage-nya, 10 = garis dimensi penutup. */
const stageStep = (i: number) => 1 + i * 2
const flowStep = (i: number) => 2 + i * 2
const DIMENSION_STEP = 10

function DesktopDiagram() {
  return (
    <svg
      className={`${styles.canvas} ${styles.desktopOnly}`}
      viewBox="0 0 1200 700"
      role="img"
      aria-label="Diagram pipeline AADI: lima tahap dari input klinis sampai triage verdict"
    >
      <Frame
        w={1200}
        h={700}
        name="SENTRA — AADI"
        dwg="DWG AADI-001 · REV A"
        sheet="SKALA NTS · SHEET 01/03"
      />
      {STAGES.map((s, i) => {
        const x = 55 + i * 230
        return (
          <g key={s.no}>
            <path
              data-draw=""
              data-step={stageStep(i)}
              className={styles.draw}
              pathLength={1}
              d={`M${x},210 h190 v110 h-190 Z`}
            />
            <g data-fade="" data-step={stageStep(i)}>
              <text
                className={`${styles.mono} ${styles.txtAccent}`}
                fontSize={11}
                x={x + 12}
                y={230}
              >
                {s.no}
              </text>
              <text
                className={`${styles.sans} ${styles.txtMain}`}
                fontSize={16}
                textAnchor="middle"
                x={x + 95}
                y={272}
              >
                {s.name}
              </text>
              <text
                className={`${styles.sans} ${styles.txtMuted}`}
                fontSize={12}
                textAnchor="middle"
                x={x + 95}
                y={296}
              >
                {s.detail}
              </text>
            </g>
          </g>
        )
      })}
      {FLOWS.map((f, i) => {
        const cx = 265 + i * 230
        return (
          <g key={f}>
            <path
              data-draw=""
              data-step={flowStep(i)}
              className={`${styles.draw} ${styles.thin}`}
              pathLength={1}
              d={`M${cx - 15},265 H${cx + 15} M${cx + 8},261 L${cx + 15},265 L${cx + 8},269 M${cx},278 V345`}
            />
            <text
              data-fade=""
              data-step={flowStep(i)}
              className={`${styles.mono} ${styles.txtMuted}`}
              fontSize={12}
              textAnchor="middle"
              x={cx}
              y={366}
            >
              {f}
            </text>
          </g>
        )
      })}

      {/* Anotasi Pattern engine: tumpukan kartu pola CP-001…CP-070 */}
      <g>
        <path
          data-draw=""
          data-step={stageStep(2)}
          className={`${styles.draw} ${styles.thin}`}
          pathLength={1}
          d="M575,148 h64 v20 h-64 Z M583,156 h64 v20 h-64 Z M591,164 h64 v20 h-64 Z M623,188 V206"
        />
        <text
          data-fade=""
          data-step={stageStep(2)}
          className={`${styles.mono} ${styles.txtMuted}`}
          fontSize={10}
          textAnchor="middle"
          x={611}
          y={140}
        >
          CP-001 … CP-070
        </text>
      </g>

      {/* Anotasi Protocol resolver: ruler fase A·B·C·D·E */}
      <g>
        <path
          data-draw=""
          data-step={stageStep(3)}
          className={`${styles.draw} ${styles.thin}`}
          pathLength={1}
          d={`M765,170 H915 ${ABCDE.map((_, i) => `M${765 + i * 37.5},170 V164`).join(' ')} M840,174 V206`}
        />
        <g data-fade="" data-step={stageStep(3)}>
          {ABCDE.map((c, i) => (
            <text
              key={c}
              className={`${styles.mono} ${styles.txtMuted}`}
              fontSize={10}
              textAnchor="middle"
              x={765 + i * 37.5}
              y={158}
            >
              {c}
            </text>
          ))}
        </g>
      </g>

      {/* Anotasi Triage verdict: empat zona keputusan */}
      <g>
        <path
          data-draw=""
          data-step={stageStep(4)}
          className={`${styles.draw} ${styles.thin}`}
          pathLength={1}
          d={`M975,378 H1165 ${VERDICT_ZONES.map((_, i) => `M${975 + i * 47.5},378 V384`).join(' ')} M1165,378 V384`}
        />
        <g data-fade="" data-step={stageStep(4)}>
          {VERDICT_ZONES.map((z, i) => (
            <text
              key={z}
              className={`${styles.mono} ${styles.txtMuted}`}
              fontSize={9.5}
              textAnchor="middle"
              x={975 + 23.75 + i * 47.5}
              y={398}
            >
              {z}
            </text>
          ))}
        </g>
      </g>

      {/* Engine registry: seluruh modul engine di bawah pipeline */}
      <g>
        <text
          data-fade=""
          data-step={DIMENSION_STEP}
          className={`${styles.mono} ${styles.txtAccent}`}
          fontSize={10}
          x={55}
          y={424}
        >
          ENGINE REGISTRY — emergency-detector · iskandar-diagnosis-engine
        </text>
        {Array.from({ length: Math.ceil(ENGINES.length / 6) }, (_, r) =>
          ENGINES.slice(r * 6, r * 6 + 6)
        ).map((row, r) => (
          <g key={row[0]}>
            <path
              data-draw=""
              data-step={DIMENSION_STEP}
              className={`${styles.draw} ${styles.thin}`}
              pathLength={1}
              d={row.map((_, i) => `M${55 + i * 187.6},${434 + r * 28} h172 v22 h-172 Z`).join(' ')}
            />
            <g data-fade="" data-step={DIMENSION_STEP}>
              {row.map((name, i) => (
                <text
                  key={name}
                  className={`${styles.mono} ${styles.txtMuted}`}
                  fontSize={10}
                  textAnchor="middle"
                  x={55 + i * 187.6 + 86}
                  y={434 + r * 28 + 15}
                >
                  {name}
                </text>
              ))}
            </g>
          </g>
        ))}
      </g>
    </svg>
  )
}

function MobileDiagram() {
  return (
    <svg
      className={`${styles.canvas} ${styles.mobileOnly}`}
      viewBox="0 0 460 1300"
      role="img"
      aria-label="Diagram pipeline AADI: lima tahap dari input klinis sampai triage verdict"
    >
      <Frame
        w={460}
        h={1300}
        inset={12}
        blockW={238}
        name="SENTRA — AADI"
        dwg="DWG AADI-001 · REV A"
        sheet="SKALA NTS · SHEET 01/03"
      />
      {STAGES.map((s, i) => {
        const y = 64 + i * 148
        return (
          <g key={s.no}>
            <path
              data-draw=""
              data-step={stageStep(i)}
              className={styles.draw}
              pathLength={1}
              d={`M70,${y} h250 v92 h-250 Z`}
            />
            <g data-fade="" data-step={stageStep(i)}>
              <text
                className={`${styles.mono} ${styles.txtAccent}`}
                fontSize={11}
                x={82}
                y={y + 22}
              >
                {s.no}
              </text>
              <text
                className={`${styles.sans} ${styles.txtMain}`}
                fontSize={17}
                textAnchor="middle"
                x={195}
                y={y + 44}
              >
                {s.name}
              </text>
              <text
                className={`${styles.sans} ${styles.txtMuted}`}
                fontSize={13}
                textAnchor="middle"
                x={195}
                y={y + 68}
              >
                {s.detail}
              </text>
            </g>
          </g>
        )
      })}
      {FLOWS.map((f, i) => {
        const top = 64 + i * 148 + 96
        return (
          <g key={f}>
            <path
              data-draw=""
              data-step={flowStep(i)}
              className={`${styles.draw} ${styles.thin}`}
              pathLength={1}
              d={`M195,${top + 4} V${top + 44} M191,${top + 37} L195,${top + 44} L199,${top + 37}`}
            />
            <text
              data-fade=""
              data-step={flowStep(i)}
              className={`${styles.mono} ${styles.txtMuted}`}
              fontSize={12}
              x={215}
              y={top + 28}
            >
              {f}
            </text>
          </g>
        )
      })}

      {/* Kartu pola CP-001…CP-070 di kanan Pattern engine */}
      <g>
        <path
          data-draw=""
          data-step={stageStep(2)}
          className={`${styles.draw} ${styles.thin}`}
          pathLength={1}
          d="M338,368 h58 v18 h-58 Z M346,376 h58 v18 h-58 Z M354,384 h58 v18 h-58 Z M334,393 H322"
        />
        <text
          data-fade=""
          data-step={stageStep(2)}
          className={`${styles.mono} ${styles.txtMuted}`}
          fontSize={9}
          textAnchor="middle"
          x={383}
          y={358}
        >
          CP-001…070
        </text>
      </g>

      {/* Ruler fase A–E di kanan Protocol resolver */}
      <g>
        <path
          data-draw=""
          data-step={stageStep(3)}
          className={`${styles.draw} ${styles.thin}`}
          pathLength={1}
          d={`M340,516 V596 ${ABCDE.map((_, i) => `M340,${516 + i * 20} H346`).join(' ')} M340,556 H322`}
        />
        <g data-fade="" data-step={stageStep(3)}>
          {ABCDE.map((c, i) => (
            <text
              key={c}
              className={`${styles.mono} ${styles.txtMuted}`}
              fontSize={10}
              x={354}
              y={520 + i * 20}
            >
              {c}
            </text>
          ))}
        </g>
      </g>

      {/* Empat zona keputusan di bawah Triage verdict */}
      <g>
        <path
          data-draw=""
          data-step={stageStep(4)}
          className={`${styles.draw} ${styles.thin}`}
          pathLength={1}
          d={`M70,764 H320 ${VERDICT_ZONES.map((_, i) => `M${70 + i * 62.5},764 V770`).join(' ')} M320,764 V770`}
        />
        <g data-fade="" data-step={stageStep(4)}>
          {VERDICT_ZONES.map((z, i) => (
            <text
              key={z}
              className={`${styles.mono} ${styles.txtMuted}`}
              fontSize={8.5}
              textAnchor="middle"
              x={70 + 31.25 + i * 62.5}
              y={780}
            >
              {z}
            </text>
          ))}
        </g>
      </g>

      {/* Engine registry: seluruh modul engine di bawah pipeline */}
      <g>
        <text
          data-fade=""
          data-step={DIMENSION_STEP}
          className={`${styles.mono} ${styles.txtAccent}`}
          fontSize={9}
          x={40}
          y={806}
        >
          ENGINE REGISTRY — 27 MODUL
        </text>
        {ENGINES.map((name, i) => {
          const col = i % 2
          const row = Math.floor(i / 2)
          const x = 40 + col * 195
          const y = 816 + row * 26
          return (
            <g key={name}>
              <path
                data-draw=""
                data-step={DIMENSION_STEP}
                className={`${styles.draw} ${styles.thin}`}
                pathLength={1}
                d={`M${x},${y} h185 v20 h-185 Z`}
              />
              <text
                data-fade=""
                data-step={DIMENSION_STEP}
                className={`${styles.mono} ${styles.txtMuted}`}
                fontSize={9.5}
                textAnchor="middle"
                x={x + 92.5}
                y={y + 14}
              >
                {name}
              </text>
            </g>
          )
        })}
      </g>
    </svg>
  )
}

export function SceneAADI() {
  return (
    <div data-bp-scene="" className={styles.scene}>
      <header data-fade="" data-step={0} className={styles.sceneHead}>
        <p className={styles.kicker}>Blueprint 01</p>
        <h2 className={styles.title}>AADI — Augmented AI Diagnostic Integrated</h2>
        <p className={styles.subtitle}>
          Sentra Medical Diagnostic Intelligence. Algoritma klinis dengan tingkat akurasi dan
          presisi tinggi.
        </p>
      </header>
      <div className={styles.canvasWrap}>
        <DesktopDiagram />
        <MobileDiagram />
      </div>
    </div>
  )
}
