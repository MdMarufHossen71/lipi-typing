// QWERTY keyboard layout data with standard touch-typing finger assignment.
// `code` matches KeyboardEvent.code so the visual keyboard can highlight real key presses.

export type Finger = 'LP' | 'LR' | 'LM' | 'LI' | 'RI' | 'RM' | 'RR' | 'RP' | 'TH'

export interface LayoutKey {
  code: string
  base: string
  shift: string
  finger: Finger
  /** Width in grid units (1 = normal, 2 = wide) */
  w?: number
  note?: string
}

export const fingerColors: Record<Finger, string> = {
  LP: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
  LR: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  LM: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  LI: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  RI: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
  RM: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  RR: 'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/40 dark:text-fuchsia-300',
  RP: 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200',
  TH: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
}

export const fingerLabels: Record<Finger, { bn: string; en: string }> = {
  LP: { bn: 'বাম কনিকা', en: 'Left pinky' },
  LR: { bn: 'বাম অনামিকা', en: 'Left ring' },
  LM: { bn: 'বাম মধ্যমা', en: 'Left middle' },
  LI: { bn: 'বাম তর্জনী', en: 'Left index' },
  RI: { bn: 'ডান তর্জনী', en: 'Right index' },
  RM: { bn: 'ডান মধ্যমা', en: 'Right middle' },
  RR: { bn: 'ডান অনামিকা', en: 'Right ring' },
  RP: { bn: 'ডান কনিকা', en: 'Right pinky' },
  TH: { bn: 'বুড়ো আঙুল', en: 'Thumb' },
}

export const qwertyRows: LayoutKey[][] = [
  // Row 0 — number row
  [
    { code: 'Backquote', base: '`', shift: '~', finger: 'LP' },
    { code: 'Digit1', base: '1', shift: '!', finger: 'LP' },
    { code: 'Digit2', base: '2', shift: '@', finger: 'LR' },
    { code: 'Digit3', base: '3', shift: '#', finger: 'LM' },
    { code: 'Digit4', base: '4', shift: '$', finger: 'LI' },
    { code: 'Digit5', base: '5', shift: '%', finger: 'LI' },
    { code: 'Digit6', base: '6', shift: '^', finger: 'RI' },
    { code: 'Digit7', base: '7', shift: '&', finger: 'RI' },
    { code: 'Digit8', base: '8', shift: '*', finger: 'RM' },
    { code: 'Digit9', base: '9', shift: '(', finger: 'RR' },
    { code: 'Digit0', base: '0', shift: ')', finger: 'RP' },
    { code: 'Minus', base: '-', shift: '_', finger: 'RP' },
    { code: 'Equal', base: '=', shift: '+', finger: 'RP' },
  ],
  // Row 1 — QWERTY
  [
    { code: 'KeyQ', base: 'q', shift: 'Q', finger: 'LP' },
    { code: 'KeyW', base: 'w', shift: 'W', finger: 'LR' },
    { code: 'KeyE', base: 'e', shift: 'E', finger: 'LM' },
    { code: 'KeyR', base: 'r', shift: 'R', finger: 'LI' },
    { code: 'KeyT', base: 't', shift: 'T', finger: 'LI' },
    { code: 'KeyY', base: 'y', shift: 'Y', finger: 'RI' },
    { code: 'KeyU', base: 'u', shift: 'U', finger: 'RI' },
    { code: 'KeyI', base: 'i', shift: 'I', finger: 'RM' },
    { code: 'KeyO', base: 'o', shift: 'O', finger: 'RR' },
    { code: 'KeyP', base: 'p', shift: 'P', finger: 'RP' },
    { code: 'BracketLeft', base: '[', shift: '{', finger: 'RP' },
    { code: 'BracketRight', base: ']', shift: '}', finger: 'RP' },
    { code: 'Backslash', base: '\\', shift: '|', finger: 'RP' },
  ],
  // Row 2 — ASDF (home row)
  [
    { code: 'KeyA', base: 'a', shift: 'A', finger: 'LP' },
    { code: 'KeyS', base: 's', shift: 'S', finger: 'LR' },
    { code: 'KeyD', base: 'd', shift: 'D', finger: 'LM' },
    { code: 'KeyF', base: 'f', shift: 'F', finger: 'LI' },
    { code: 'KeyG', base: 'g', shift: 'G', finger: 'LI' },
    { code: 'KeyH', base: 'h', shift: 'H', finger: 'RI' },
    { code: 'KeyJ', base: 'j', shift: 'J', finger: 'RI' },
    { code: 'KeyK', base: 'k', shift: 'K', finger: 'RM' },
    { code: 'KeyL', base: 'l', shift: 'L', finger: 'RR' },
    { code: 'Semicolon', base: ';', shift: ':', finger: 'RP' },
    { code: 'Quote', base: "'", shift: '"', finger: 'RP' },
  ],
  // Row 3 — ZXCV
  [
    { code: 'KeyZ', base: 'z', shift: 'Z', finger: 'LP' },
    { code: 'KeyX', base: 'x', shift: 'X', finger: 'LR' },
    { code: 'KeyC', base: 'c', shift: 'C', finger: 'LM' },
    { code: 'KeyV', base: 'v', shift: 'V', finger: 'LI' },
    { code: 'KeyB', base: 'b', shift: 'B', finger: 'LI' },
    { code: 'KeyN', base: 'n', shift: 'N', finger: 'RI' },
    { code: 'KeyM', base: 'm', shift: 'M', finger: 'RI' },
    { code: 'Comma', base: ',', shift: '<', finger: 'RM' },
    { code: 'Period', base: '.', shift: '>', finger: 'RR' },
    { code: 'Slash', base: '/', shift: '?', finger: 'RP' },
  ],
  // Row 4 — space
  [{ code: 'Space', base: ' ', shift: ' ', finger: 'TH', w: 8, note: 'Space' }],
]

/** Flatten all keys for lookups. */
export const allQwertyKeys: LayoutKey[] = qwertyRows.flat()

export function findKey(code: string): LayoutKey | undefined {
  return allQwertyKeys.find((k) => k.code === code)
}
