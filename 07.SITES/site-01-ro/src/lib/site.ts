export const SITE = {
  name: 'Betoteca',
  legalEntity: 'Betoteca Media SRL',
  tagline: 'Recenzii și ghiduri pentru pariuri sportive în România',
  lang: 'ro-RO',
  url: 'https://betoteca.ro',
} as const;

export const NAV = [
  { href: '/', label: 'Acasă' },
  { href: '/top-case-de-pariuri/', label: 'Top case' },
  { href: '/bonusuri/', label: 'Bonusuri' },
  { href: '/ghiduri/', label: 'Ghiduri' },
  { href: '/sport/fotbal/', label: 'Sport' },
  { href: '/aplicatii/', label: 'Aplicații' },
  { href: '/metode-de-plata/', label: 'Plăți' },
  { href: '/ponturi/pontul-zilei/', label: 'Ponturi' },
] as const;

export const FOOTER_LINKS = [
  { href: '/metodologie/', label: 'Metodologie' },
  { href: '/despre-noi/', label: 'Despre noi' },
  { href: '/contact/', label: 'Contact' },
  { href: '/termeni-si-conditii/', label: 'Termeni' },
  { href: '/politica-de-confidentialitate/', label: 'Confidențialitate' },
  { href: '/joc-responsabil/', label: 'Joc responsabil' },
] as const;
