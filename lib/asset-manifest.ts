export const criticalStaticAssets = [
  '/assets/sounds/notif.mp3',
  '/assets/abby/abby.png',
  '/og-image.jpg',
  '/hero.png',
  '/drferdiiskandar.png',
  '/drferdi.png',
  '/classy-square.png',
  '/cdrferdi-study.png',
  '/sign.png',
  '/founder-sentra-shirt.jpg',
  '/me+assistant.png',
  '/tim-inisiatif-csr.png',
] as const

export type CriticalStaticAsset = (typeof criticalStaticAssets)[number]
