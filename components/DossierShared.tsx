// Architected and built by dr Classy

import Link from 'next/link'

type DossierIndexEntry = {
  detail: string
  href: string
  number: string
  title: string
}

type DossierGlanceSection = {
  items: readonly string[]
  title: string
}

export function DossierIndexNav({ entries }: { entries: readonly DossierIndexEntry[] }) {
  return (
    <>
      {entries.map((item) => (
        <Link href={item.href} key={item.number}>
          <span>{item.number}</span>
          <strong>{item.title}</strong>
          <em>{item.detail}</em>
        </Link>
      ))}
    </>
  )
}

export function DossierGlanceSections({
  sections,
}: {
  sections: readonly DossierGlanceSection[]
}) {
  return (
    <>
      {sections.map((section) => (
        <section key={section.title}>
          <h3>{section.title}</h3>
          <ul>
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ))}
    </>
  )
}
