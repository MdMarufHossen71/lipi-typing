# Contributing to Lipi

Thanks for your interest in improving Lipi! 🙌

## Setup

```bash
git clone https://github.com/MdMarufHossen71/lipi-typing.git
cd lipi-typing
npm install
npm run dev
```

## Before opening a PR

1. **Type-check & test**: `npm run typecheck && npm test`
2. **Build**: `npm run build` must succeed with no errors.
3. **Lint**: `npm run lint` should be clean.
4. Do **not** break existing tests — add tests for any new typing-engine logic.

## Adding content (lessons / keyboard mappings)

- Lesson content lives in `src/data/lessons/*.ts` as bilingual `{ bn, en }` objects. Keep both languages in sync.
- Keyboard mappings live in `src/data/*Layout.ts`. **Never fabricate a mapping** — cite a verifiable source in `src/data/references.ts`.
- UI strings live in `src/i18n/bn.ts` and `en.ts` (mirror keys in both files).

## Adding a new language (UI)

1. Create `src/i18n/<code>.ts` mirroring the keys of `bn.ts`.
2. Register it in `I18nContext.tsx` (`dicts`) and the `Lang` type.
3. Update the `LanguageSwitcher`.

## Honesty & accuracy rules

- Do **not** bundle, mirror or redistribute proprietary software (Bijoy installers/fonts). Link to official sources only.
- If a feature cannot be implemented reliably, label it clearly rather than faking it.
- Cite sources for any new educational claim or keyboard mapping.

## Commit style

Use descriptive commit messages, e.g. `feat(avro): add conjunct lesson`, `fix(test): grapheme count for anusvara`.

## Code style

- TypeScript strict mode. Use `import type` for type-only imports.
- No enums (use `const` objects + union types) — the project uses `erasableSyntaxOnly`.
- Keep the bundle small: prefer code-split routes and tree-shakeable imports.

By contributing, you agree your contributions are licensed under the project's MIT license.
