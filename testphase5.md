# Phase 5 Test Checklist

## Before Testing
1. Ensure `npm run dev` is running
2. Open http://localhost:3000

---

## Konami Code Easter Egg
- [ ] Press: ↑ ↑ ↓ ↓ ← → ← → B A
- [ ] Secret message modal appears with "You found it!" text
- [ ] After 2 seconds, disco mode activates (rainbow colors + screen shake)
- [ ] Disco mode stops after 4 seconds

## Console Message
- [ ] Open browser DevTools (F12) → Console tab
- [ ] ASCII art "JAY" logo appears
- [ ] Welcome message and contact info shown
- [ ] Hint about Konami code visible

## SEO Meta Tags
- [ ] View page source (Ctrl+U) and verify:
  - `<title>` contains "Jay Pandya"
  - Open Graph tags present (og:title, og:description)
  - Twitter card tags present

## General
- [ ] Build passes (`npm run build`)
- [ ] Site works in both light/dark modes
- [ ] Keyboard navigation works

---

## Vercel Deployment (Optional)
- [ ] Add OPENAI_API_KEY to Vercel environment variables
- [ ] Deploy via GitHub integration or `vercel` CLI
- [ ] Test live site
