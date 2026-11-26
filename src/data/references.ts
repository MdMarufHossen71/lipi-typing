// Verified sources for keyboard mappings, lessons and guides.
export interface Reference {
  title: string
  url: string
  note?: string
  license?: string
}

export const references: Reference[] = [
  {
    title: 'Avro Keyboard (OmicronLab) — GitHub',
    url: 'https://github.com/OmicronLab/Avro-Keyboard',
    note: 'Source of the Avro Phonetic scheme; Delphi source of the Windows IME.',
    license: 'MPL-1.1',
  },
  {
    title: 'Avro Keyboard — official site',
    url: 'https://omicronlab.com/avro-keyboard.html',
    note: 'Latest Avro Keyboard 5.6.0 (Unicode + ANSI), free download + docs.',
  },
  {
    title: 'Avro Phonetic documentation (OmicronLab)',
    url: 'https://omicronlab.com/docs.html',
    note: 'Documentation index incl. "Bangla Typing with Avro Phonetic".',
  },
  {
    title: 'jsAvroPhonetic — GitHub (dipu-bd)',
    url: 'https://github.com/dipu-bd/jsAvroPhonetic',
    note: 'JS port of the phonetic engine; the mapping data used to verify our tables.',
    license: 'MPL-1.1',
  },
  {
    title: 'avro-phonetic on npm (v1.1.5)',
    url: 'https://www.npmjs.com/package/avro-phonetic',
    note: 'Note: this package is jQuery-based and NOT used by Lipi (incompatible with Vite).',
    license: 'MPL-1.1',
  },
  {
    title: 'OpenBangla Keyboard — GitHub',
    url: 'https://github.com/OpenBangla/OpenBangla-Keyboard',
    note: 'Linux IME bundling the Avro Phonetic engine + fixed layouts (Probhat, National, etc.).',
    license: 'GPL-3.0',
  },
  {
    title: 'm17n bn-bijoyUnicode.mim (BijoyLinux)',
    url: 'https://github.com/asikdial-tech/BijoyLinux',
    note: 'Source of the Unicode Bijoy key→character mapping used in our visual keyboard.',
  },
  {
    title: 'Bijoy keyboard — Bengali Wikipedia',
    url: 'https://bn.wikipedia.org/wiki/%E0%A6%AC%E0%A6%BF%E0%A6%9C%E0%A6%AF%E0%BC%BC_%E0%A6%95%E0%A6%BF%E0%A6%AC%E0%A7%8B%E0%A6%B0%E0%A7%8D%E0%A6%A1',
    note: 'History, version table, ANSI vs Unicode, BDS 1738:2018 national layout.',
  },
  {
    title: 'Bengali input methods — English Wikipedia',
    url: 'https://en.wikipedia.org/wiki/Bengali_input_methods',
    note: 'Proprietary/open-source layout overview, Bangladesh Copyright Act 2005.',
  },
  {
    title: 'Bijoy Ekushe — official site (Ananda Computers)',
    url: 'https://www.bijoyekushe.net.bd/',
    note: 'Official source for Bijoy software download/activation. Proprietary — do not redistribute.',
  },
  {
    title: 'Hind Siliguri (font)',
    url: 'https://fonts.google.com/specimen/Hind+Siliguri',
    note: 'Primary Bangla UI font used by Lipi.',
    license: 'OFL-1.1',
  },
  {
    title: 'Inter (font)',
    url: 'https://fonts.google.com/specimen/Inter',
    note: 'Primary Latin/UI font used by Lipi.',
    license: 'OFL-1.1',
  },
]
