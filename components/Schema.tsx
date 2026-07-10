import Script from 'next/script'

import { siteIdentity } from '@/lib/site-content'
import { getSiteUrl } from '@/lib/site-metadata'

export default function Schema() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteIdentity.name,
    jobTitle: siteIdentity.headline,
    url: getSiteUrl(),
    image: `${getSiteUrl()}/og-image.jpg`,
    sameAs: [
      'https://medium.com/@drferdiiskandar',
      'https://orcid.org/0009-0003-3788-1307',
      'https://x.com/ClaudesyI81047',
      'https://substack.com/@drferdiiskandar',
      'https://www.kaggle.com/drferdiiskandar',
      'https://www.reddit.com/user/SixCupaCoffee/',
      'https://www.linkedin.com/in/dr-ferdi-iskandar-1b620a3b5',
      'https://huggingface.co/dr-Ferdi',
    ],
    worksFor: [
      {
        '@type': 'Organization',
        name: 'Sentra Artificial Intelligence',
      },
      {
        '@type': 'Organization',
        name: 'RSIA Melinda DHAI',
      },
    ],
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteIdentity.shortName,
    url: getSiteUrl(),
  }

  return (
    <>
      <Script
        id="schema-person"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Script
        id="schema-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  )
}
