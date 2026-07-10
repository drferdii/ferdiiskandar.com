// Architected and built by Classy.
import styles from './blueprint-story.module.css'

type FrameProps = {
  /** viewBox width of the host SVG */
  w: number
  /** viewBox height of the host SVG */
  h: number
  /** corner-bracket inset from the SVG edge */
  inset?: number
  /** title-block width */
  blockW?: number
  /** title-block height */
  blockH?: number
  name: string
  dwg: string
  /** third title-block row, e.g. "SKALA NTS · SHEET 01/03" */
  sheet: string
}

const BRACKET_LEN = 28
const BLOCK_GAP = 12
const GRID_LETTERS = 'ABCDEFGH'

/**
 * Shared blueprint frame: four corner registration brackets, drafting-sheet
 * border references (letter columns along the top, numbered rows down the
 * left), and the bottom-right three-row DWG title block (name / DWG / sheet).
 * Identical construction across all scenes; everything is draw step 0.
 */
export function Frame({
  w,
  h,
  inset = 16,
  blockW = 250,
  blockH = 78,
  name,
  dwg,
  sheet,
}: FrameProps) {
  const L = BRACKET_LEN
  const bx = w - inset - blockW
  const by = h - inset - blockH - BLOCK_GAP

  const brackets = [
    `M${inset},${inset + L} V${inset} H${inset + L}`,
    `M${w - inset - L},${inset} H${w - inset} V${inset + L}`,
    `M${w - inset},${h - inset - L} V${h - inset} H${w - inset - L}`,
    `M${inset + L},${h - inset} H${inset} V${h - inset - L}`,
  ].join(' ')

  const block =
    `M${bx},${by} h${blockW} v${blockH} h${-blockW} Z` +
    ` M${bx},${by + 26} h${blockW} M${bx},${by + 52} h${blockW}`

  // Border references: letter columns along the top edge, numbered rows down
  // the left edge — the ticks sit just inside the corner brackets.
  const cols = Math.max(3, Math.round(w / 220))
  const rows = Math.max(3, Math.round(h / 220))
  const colStep = (w - 2 * inset) / cols
  const rowStep = (h - 2 * inset) / rows

  const refTicks = [
    ...Array.from({ length: cols - 1 }, (_, i) => {
      const x = inset + (i + 1) * colStep
      return `M${x},${inset} V${inset + 8}`
    }),
    ...Array.from({ length: rows - 1 }, (_, i) => {
      const y = inset + (i + 1) * rowStep
      return `M${inset},${y} H${inset + 8}`
    }),
  ].join(' ')

  return (
    <g>
      <path data-draw="" data-step={0} className={styles.draw} pathLength={1} d={brackets} />
      <path
        data-draw=""
        data-step={0}
        className={`${styles.draw} ${styles.thin} ${styles.soft}`}
        pathLength={1}
        d={refTicks}
      />
      <path
        data-draw=""
        data-step={0}
        className={`${styles.draw} ${styles.thin}`}
        pathLength={1}
        d={block}
      />
      <g data-fade="" data-step={0}>
        {Array.from({ length: cols }, (_, i) => (
          <text
            key={`c${GRID_LETTERS[i]}`}
            className={`${styles.mono} ${styles.txtMuted}`}
            fontSize={9}
            textAnchor="middle"
            x={inset + (i + 0.5) * colStep}
            y={inset + 14}
          >
            {GRID_LETTERS[i]}
          </text>
        ))}
        {Array.from({ length: rows }, (_, i) => (
          <text
            key={`r${i + 1}`}
            className={`${styles.mono} ${styles.txtMuted}`}
            fontSize={9}
            textAnchor="middle"
            x={inset + 14}
            y={inset + (i + 0.5) * rowStep + 3}
          >
            {i + 1}
          </text>
        ))}
        <text
          className={`${styles.mono} ${styles.txtAccent}`}
          fontSize={12}
          x={bx + 12}
          y={by + 18}
        >
          {name}
        </text>
        <text className={`${styles.mono} ${styles.txtMuted}`} fontSize={11} x={bx + 12} y={by + 44}>
          {dwg}
        </text>
        <text className={`${styles.mono} ${styles.txtMuted}`} fontSize={11} x={bx + 12} y={by + 70}>
          {sheet}
        </text>
      </g>
    </g>
  )
}
