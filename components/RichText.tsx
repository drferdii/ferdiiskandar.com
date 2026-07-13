import { Fragment } from 'react'

// Renders plain-text content that may contain simple `*italic*` and
// `**bold**` markers without pulling in a full markdown parser.
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g)

  return (
    <>
      {parts.map((part, index) => {
        const isStrong = part.startsWith('**') && part.endsWith('**') && part.length > 3
        const isEmphasis = part.startsWith('*') && part.endsWith('*') && part.length > 1

        return (
          <Fragment key={index}>
            {isStrong ? <strong>{part.slice(2, -2)}</strong> : isEmphasis ? <em>{part.slice(1, -1)}</em> : part}
          </Fragment>
        )
      })}
    </>
  )
}
