// Unicode Bijoy keyboard mapping.
// Source: m17n input-method file `bn-bijoyUnicode.mim` (BijoyLinux package),
// cross-validated against published Bijoy layout references (see References page).
// The physical key positions match QWERTY; `code` matches KeyboardEvent.code.
//
// IMPORTANT: This is the community/m17n *Unicode* Bijoy layout. The official
// Bijoy software also has a proprietary Unicode mode; legacy "Bijoy Classic"
// uses an ANSI/font encoding (NOT Unicode) and is NOT what this mapping shows.
// See the Bijoy Bayanno Guide page for ANSI vs Unicode details.

import type { LayoutKey } from './qwertyLayout'

export const bijoyRows: LayoutKey[][] = [
  // Row 0 — number row
  [
    { code: 'Backquote', base: '‌', shift: '‍', finger: 'LP', note: 'ZWNJ / ZWJ' },
    { code: 'Digit1', base: '১', shift: '!', finger: 'LP' },
    { code: 'Digit2', base: '২', shift: '@', finger: 'LR' },
    { code: 'Digit3', base: '৩', shift: '#', finger: 'LM' },
    { code: 'Digit4', base: '৪', shift: '৳', finger: 'LI', note: '৳ (টাকা)' },
    { code: 'Digit5', base: '৫', shift: '%', finger: 'LI' },
    { code: 'Digit6', base: '৬', shift: '÷', finger: 'RI' },
    { code: 'Digit7', base: '৭', shift: 'ঁ', finger: 'RI', note: 'চন্দ্রবিন্দু' },
    { code: 'Digit8', base: '৮', shift: '×', finger: 'RM' },
    { code: 'Digit9', base: '৯', shift: '(', finger: 'RR' },
    { code: 'Digit0', base: '০', shift: ')', finger: 'RP' },
    { code: 'Minus', base: '-', shift: '_', finger: 'RP' },
    { code: 'Equal', base: '=', shift: '+', finger: 'RP' },
  ],
  // Row 1
  [
    { code: 'KeyQ', base: 'ঙ', shift: 'ং', finger: 'LP' },
    { code: 'KeyW', base: 'য', shift: 'য়', finger: 'LR' },
    { code: 'KeyE', base: 'ড', shift: 'ঢ', finger: 'LM' },
    { code: 'KeyR', base: 'প', shift: 'ফ', finger: 'LI' },
    { code: 'KeyT', base: 'ট', shift: 'ঠ', finger: 'LI' },
    { code: 'KeyY', base: 'চ', shift: 'ছ', finger: 'RI' },
    { code: 'KeyU', base: 'জ', shift: 'ঝ', finger: 'RI' },
    { code: 'KeyI', base: 'হ', shift: 'ঞ', finger: 'RM' },
    { code: 'KeyO', base: 'গ', shift: 'ঘ', finger: 'RR' },
    { code: 'KeyP', base: 'ড়', shift: 'ঢ়', finger: 'RP' },
    { code: 'BracketLeft', base: '[', shift: '{', finger: 'RP' },
    { code: 'BracketRight', base: ']', shift: '}', finger: 'RP' },
    { code: 'Backslash', base: 'ৎ', shift: 'ঃ', finger: 'RP', note: 'খণ্ড-ট / বিসর্গ' },
  ],
  // Row 2 — home row
  [
    { code: 'KeyA', base: 'ৃ', shift: 'র্', finger: 'LP', note: 'ঋ-কার / র-ফলা' },
    { code: 'KeyS', base: 'ু', shift: 'ূ', finger: 'LR' },
    { code: 'KeyD', base: 'ি', shift: 'ী', finger: 'LM' },
    { code: 'KeyF', base: 'া', shift: 'অ', finger: 'LI' },
    { code: 'KeyG', base: '্', shift: '।', finger: 'LI', note: 'হসন্ত / দাঁড়ি' },
    { code: 'KeyH', base: 'ব', shift: 'ভ', finger: 'RI' },
    { code: 'KeyJ', base: 'ক', shift: 'খ', finger: 'RI' },
    { code: 'KeyK', base: 'ত', shift: 'থ', finger: 'RM' },
    { code: 'KeyL', base: 'দ', shift: 'ধ', finger: 'RR' },
    { code: 'Semicolon', base: ';', shift: ':', finger: 'RP' },
    { code: 'Quote', base: "'", shift: '"', finger: 'RP' },
  ],
  // Row 3
  [
    { code: 'KeyZ', base: '্র', shift: '্য', finger: 'LP', note: 'র-ফলা / য-ফলা' },
    { code: 'KeyX', base: 'ও', shift: 'ৌ', finger: 'LR' },
    { code: 'KeyC', base: 'ে', shift: 'ৈ', finger: 'LM' },
    { code: 'KeyV', base: 'র', shift: 'ল', finger: 'LI' },
    { code: 'KeyB', base: 'ন', shift: 'ণ', finger: 'LI' },
    { code: 'KeyN', base: 'স', shift: 'ষ', finger: 'RI' },
    { code: 'KeyM', base: 'ম', shift: 'শ', finger: 'RI' },
    { code: 'Comma', base: ',', shift: '<', finger: 'RM' },
    { code: 'Period', base: '.', shift: '>', finger: 'RR' },
    { code: 'Slash', base: '/', shift: '?', finger: 'RP' },
  ],
  // Row 4 — space
  [{ code: 'Space', base: ' ', shift: ' ', finger: 'TH', w: 8, note: 'Space' }],
]

export const allBijoyKeys: LayoutKey[] = bijoyRows.flat()
