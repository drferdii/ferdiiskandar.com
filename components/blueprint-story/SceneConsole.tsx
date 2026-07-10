// Architected and built by Classy.
import styles from './blueprint-story.module.css'
import { Frame } from './Frame'

/**
 * Wireframe of the actual TTVInferenceUI console (med-assist): a single
 * vertical form stack — not a multi-panel dashboard. Panel map verified
 * against components/clinical/TTVInferenceUI.tsx in Phase 1: keluhan, faktor
 * risiko, asesmen (AutoSen Preset + Skala Nyeri), vital signs, temuan klinis,
 * bilah aksi. Draw steps: 0 = frame, 1..6 = panels, 7 = garis dimensi.
 */

const rect = (x: number, y: number, w: number, h: number) => `M${x},${y} h${w} v${h} h${-w} Z`

const DIMENSION_STEP = 7

type PanelProps = {
  step: number
  index: string
  y: number
  h: number
  children?: React.ReactNode
  labels: React.ReactNode
}

function Panel({ step, index, y, h, children, labels }: PanelProps) {
  return (
    <g>
      <path
        data-draw=""
        data-step={step}
        className={styles.draw}
        pathLength={1}
        d={rect(60, y, 520, h)}
      />
      {children}
      <g data-fade="" data-step={step}>
        <text
          className={`${styles.mono} ${styles.txtAccent}`}
          fontSize={11}
          textAnchor="end"
          x={52}
          y={y + 18}
        >
          {index}
        </text>
        {labels}
      </g>
    </g>
  )
}

function InnerPath({ step, d }: { step: number; d: string }) {
  return (
    <path
      data-draw=""
      data-step={step}
      className={`${styles.draw} ${styles.thin}`}
      pathLength={1}
      d={d}
    />
  )
}

export function SceneConsole() {
  return (
    <div data-bp-scene="" className={styles.scene}>
      <header data-fade="" data-step={0} className={styles.sceneHead}>
        <p className={styles.kicker}>Blueprint 03</p>
        <h2 className={styles.title}>Console Assist — TTVInferenceUI</h2>
        <p className={styles.subtitle}>konsol input klinis Sentra Assist</p>
      </header>
      <div className={`${styles.canvasWrap} ${styles.canvasWrapNarrow}`}>
        <svg
          className={styles.canvas}
          viewBox="0 0 640 856"
          role="img"
          aria-label="Wireframe konsol Sentra Assist: keluhan, faktor risiko, asesmen, vital signs, temuan klinis, dan bilah aksi"
        >
          <Frame
            w={640}
            h={856}
            inset={14}
            blockW={230}
            name="SENTRA — CONSOLE"
            dwg="DWG UI-001 · REV A"
            sheet="SKALA NTS · SHEET 03/03"
          />

          <Panel
            step={1}
            index="P1"
            y={60}
            h={96}
            labels={
              <>
                <text className={`${styles.sans} ${styles.txtMain}`} fontSize={15} x={72} y={84}>
                  Gejala / Keluhan
                </text>
                <text
                  className={`${styles.mono} ${styles.txtAccent}`}
                  fontSize={11}
                  textAnchor="middle"
                  x={510}
                  y={84}
                >
                  AutoComplete+
                </text>
              </>
            }
          >
            <InnerPath step={1} d={rect(452, 68, 116, 24)} />
            <InnerPath step={1} d="M76,116 H544 M76,134 H420" />
          </Panel>

          <Panel
            step={2}
            index="P2"
            y={172}
            h={112}
            labels={
              <>
                <text className={`${styles.sans} ${styles.txtMain}`} fontSize={15} x={72} y={196}>
                  Faktor Risiko
                </text>
                <text
                  className={`${styles.sans} ${styles.txtMuted}`}
                  fontSize={12}
                  textAnchor="middle"
                  x={196}
                  y={229}
                >
                  Alergi
                </text>
                <text
                  className={`${styles.sans} ${styles.txtMuted}`}
                  fontSize={12}
                  textAnchor="middle"
                  x={452}
                  y={229}
                >
                  Kehamilan
                </text>
                <text
                  className={`${styles.sans} ${styles.txtMuted}`}
                  fontSize={12}
                  textAnchor="middle"
                  x={196}
                  y={265}
                >
                  Disabilitas
                </text>
                <text
                  className={`${styles.sans} ${styles.txtMuted}`}
                  fontSize={12}
                  textAnchor="middle"
                  x={452}
                  y={265}
                >
                  Obesitas
                </text>
              </>
            }
          >
            <InnerPath step={2} d={`${rect(76, 210, 240, 28)} ${rect(332, 210, 240, 28)}`} />
            <InnerPath step={2} d={`${rect(76, 246, 240, 28)} ${rect(332, 246, 240, 28)}`} />
          </Panel>

          <Panel
            step={3}
            index="P3"
            y={300}
            h={76}
            labels={
              <>
                <text className={`${styles.sans} ${styles.txtMain}`} fontSize={15} x={72} y={324}>
                  Asesmen
                </text>
                <text
                  className={`${styles.sans} ${styles.txtMuted}`}
                  fontSize={12}
                  textAnchor="middle"
                  x={196}
                  y={355}
                >
                  AutoSen Preset
                </text>
                <text
                  className={`${styles.sans} ${styles.txtMuted}`}
                  fontSize={12}
                  textAnchor="middle"
                  x={452}
                  y={355}
                >
                  Skala Nyeri 0–10
                </text>
              </>
            }
          >
            <InnerPath step={3} d={`${rect(76, 336, 240, 28)} ${rect(332, 336, 240, 28)}`} />
          </Panel>

          <Panel
            step={4}
            index="P4"
            y={392}
            h={152}
            labels={
              <>
                <text className={`${styles.sans} ${styles.txtMain}`} fontSize={15} x={72} y={416}>
                  Vital Signs — Cardiopulmonary
                </text>
                <text
                  className={`${styles.sans} ${styles.txtMuted}`}
                  fontSize={12}
                  textAnchor="middle"
                  x={196}
                  y={449}
                >
                  GCS
                </text>
                <text
                  className={`${styles.sans} ${styles.txtMuted}`}
                  fontSize={12}
                  textAnchor="middle"
                  x={452}
                  y={449}
                >
                  T/D
                </text>
                <text
                  className={`${styles.sans} ${styles.txtMuted}`}
                  fontSize={12}
                  textAnchor="middle"
                  x={152}
                  y={489}
                >
                  Nadi
                </text>
                <text
                  className={`${styles.sans} ${styles.txtMuted}`}
                  fontSize={12}
                  textAnchor="middle"
                  x={320}
                  y={489}
                >
                  Suhu
                </text>
                <text
                  className={`${styles.sans} ${styles.txtMuted}`}
                  fontSize={12}
                  textAnchor="middle"
                  x={488}
                  y={489}
                >
                  Gula
                </text>
                <text
                  className={`${styles.sans} ${styles.txtMuted}`}
                  fontSize={12}
                  textAnchor="middle"
                  x={196}
                  y={529}
                >
                  Pernafasan
                </text>
                <text
                  className={`${styles.sans} ${styles.txtMuted}`}
                  fontSize={12}
                  textAnchor="middle"
                  x={452}
                  y={529}
                >
                  Saturasi O₂
                </text>
              </>
            }
          >
            <InnerPath step={4} d={`${rect(76, 430, 240, 30)} ${rect(332, 430, 240, 30)}`} />
            <InnerPath
              step={4}
              d={`${rect(76, 470, 152, 30)} ${rect(244, 470, 152, 30)} ${rect(412, 470, 152, 30)}`}
            />
            <InnerPath step={4} d={`${rect(76, 510, 240, 30)} ${rect(332, 510, 240, 30)}`} />
          </Panel>

          <Panel
            step={5}
            index="P5"
            y={560}
            h={96}
            labels={
              <>
                <text className={`${styles.sans} ${styles.txtMain}`} fontSize={15} x={72} y={584}>
                  Temuan Klinis
                </text>
                <text
                  className={`${styles.mono} ${styles.txtAccent}`}
                  fontSize={10}
                  textAnchor="middle"
                  x={113}
                  y={612}
                >
                  G2·BP
                </text>
                <text
                  className={`${styles.mono} ${styles.txtAccent}`}
                  fontSize={10}
                  textAnchor="middle"
                  x={113}
                  y={640}
                >
                  G4·RESP
                </text>
              </>
            }
          >
            <InnerPath step={5} d={`${rect(76, 598, 74, 20)} M162,608 H544`} />
            <InnerPath step={5} d={`${rect(76, 626, 74, 20)} M162,636 H460`} />
          </Panel>

          <Panel
            step={6}
            index="P6"
            y={672}
            h={60}
            labels={
              <>
                <text
                  className={`${styles.sans} ${styles.txtMain}`}
                  fontSize={13}
                  textAnchor="middle"
                  x={152}
                  y={706}
                >
                  Uplink
                </text>
                <text
                  className={`${styles.sans} ${styles.txtMain}`}
                  fontSize={13}
                  textAnchor="middle"
                  x={320}
                  y={706}
                >
                  Doctor
                </text>
                <text
                  className={`${styles.sans} ${styles.txtMain}`}
                  fontSize={13}
                  textAnchor="middle"
                  x={488}
                  y={706}
                >
                  Trajectory
                </text>
              </>
            }
          >
            <InnerPath
              step={6}
              d={`${rect(76, 684, 152, 36)} ${rect(244, 684, 152, 36)} ${rect(412, 684, 152, 36)}`}
            />
          </Panel>

          {/* Garis dimensi vertikal: tinggi penuh form stack */}
          <g>
            <path
              data-draw=""
              data-step={DIMENSION_STEP}
              className={`${styles.draw} ${styles.thin} ${styles.soft}`}
              pathLength={1}
              d="M595,60 H605 M600,60 V732 M595,732 H605"
            />
            <text
              data-fade=""
              data-step={DIMENSION_STEP}
              className={`${styles.mono} ${styles.txtMuted}`}
              fontSize={9}
              textAnchor="middle"
              transform="rotate(-90 614 396)"
              x={614}
              y={396}
            >
              TTVINFERENCEUI — FORM STACK
            </text>
          </g>
        </svg>
      </div>
    </div>
  )
}
