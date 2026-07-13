import sitemap from '@/app/sitemap'

describe('sitemap', () => {
  it('lists the public editorial routes on the production domain', () => {
    const entries = sitemap()
    const urls = entries.map((entry) => entry.url)

    expect(urls).toEqual([
      'https://ferdiiskandar.com',
      'https://ferdiiskandar.com/about',
      'https://ferdiiskandar.com/works',
      'https://ferdiiskandar.com/notes',
      'https://ferdiiskandar.com/kisah-sentra',
      'https://ferdiiskandar.com/tanpa-naskah',
      'https://ferdiiskandar.com/bagaimana-sentra-dibangun',
      'https://ferdiiskandar.com/speaking',
      'https://ferdiiskandar.com/cv',
    ])
  })
})
