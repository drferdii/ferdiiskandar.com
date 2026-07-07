type SectionNumberMarkProps = {
  number: string
}

export default function SectionNumberMark({ number }: SectionNumberMarkProps) {
  return (
    <aside aria-hidden="true" className="fi-section-number-mark">
      <span>Bagian</span>
      <strong>{number}</strong>
      <i />
      <b>✧</b>
    </aside>
  )
}
