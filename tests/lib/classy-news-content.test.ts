import {
  classyNewsEditorPicks,
  classyNewsFeatureStories,
  classyNewsBridgeCards,
  classyNewsClosing,
  classyNewsHero,
  classyNewsHomeSpotlight,
  classyNewsIndexEntries,
  classyNewsLeadStory,
  classyNewsSecondaryStories,
  classyNewsTrendingStories,
} from '@/lib/classy-news-content'

describe('classy news content', () => {
  it('keeps all reported stories wired to external source pages', () => {
    const hrefs = [
      classyNewsLeadStory.href,
      ...classyNewsSecondaryStories.map((story) => story.href),
      ...classyNewsTrendingStories.map((story) => story.href),
      ...classyNewsFeatureStories.map((story) => story.href),
      ...classyNewsEditorPicks.map((story) => story.href),
    ]

    expect(hrefs.every((href) => href.startsWith('https://'))).toBe(true)
  })

  it('keeps homepage spotlight routing back into the internal classy news surface', () => {
    expect(classyNewsHomeSpotlight.primaryHref).toBe('/classy-news')
    expect(classyNewsHomeSpotlight.secondaryHref).toBe('/notes')
  })

  it('keeps rewritten Indonesian summaries on every reported source entry', () => {
    expect(classyNewsLeadStory.summary.length).toBeGreaterThan(40)
    expect(classyNewsSecondaryStories.every((story) => story.summary.length > 40)).toBe(true)
    expect(classyNewsTrendingStories.every((story) => story.summary.length > 40)).toBe(true)
    expect(classyNewsFeatureStories.every((story) => story.summary.length > 40)).toBe(true)
    expect(classyNewsEditorPicks.every((story) => story.summary.length > 40)).toBe(true)
  })

  it('keeps at least 20 latest source entries on the page dataset', () => {
    const total =
      1 +
      classyNewsSecondaryStories.length +
      classyNewsTrendingStories.length +
      classyNewsFeatureStories.length +
      classyNewsEditorPicks.length

    expect(total).toBeGreaterThanOrEqual(20)
  })

  it('removes the previous English interface labels from the classy news surface copy', () => {
    const visibleCopy = [
      classyNewsHero.issueLabel,
      classyNewsHomeSpotlight.kicker,
      classyNewsHomeSpotlight.title,
      classyNewsHomeSpotlight.body,
      classyNewsClosing.secondaryLabel,
      classyNewsClosing.primaryLabel,
      ...classyNewsIndexEntries.map((item) => `${item.title} ${item.detail}`),
      ...classyNewsBridgeCards.map(
        (item) => `${item.label} ${item.title} ${item.body} ${item.cta}`,
      ),
    ].join(' ')

    expect(visibleCopy).not.toMatch(
      /\b(Section|Issue|Source|Linked|Hero|Trend|Deep|Editor|Notes|Works|Speaking|Closing|Connected)\b/i,
    )
  })
})
