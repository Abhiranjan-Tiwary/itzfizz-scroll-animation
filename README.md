# Itzfizz Digital - Frontend Internship Assignment

A polished React/Vite landing page for the Itzfizz Digital frontend development assignment. The page uses a premium dark automotive direction, lime accents, responsive layout, and a GSAP ScrollTrigger hero sequence.

## Tech Stack

- React.js
- Vite
- JavaScript
- HTML5
- CSS3
- Tailwind CSS
- GSAP
- GSAP ScrollTrigger
- Lucide React icons

## Scroll Animation

The hero uses a single GSAP timeline with ScrollTrigger `scrub` enabled. The hero track is pinned during the main sequence, and scroll progress controls the car's horizontal and vertical translation, scale, rotation, route progress line, headline fade, and metric movement. The animation reverses naturally when scrolling upward and uses `gsap.context()` cleanup to avoid duplicate triggers during React lifecycle changes.

Reduced-motion users receive the same content without the scroll-pinned motion sequence.

## Asset Credit

The transparent top-view car asset is from FreePNGimg and is listed as Creative Commons CC0 1.0 Universal on its asset page:

https://freepngimg.com/svg/color/008000/153035-top-view-car-vector

## Local Setup

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production Build

```bash
npm run build
npm run preview
```

## GitHub Repository Setup

```bash
git init
git add .
git commit -m "Build Itzfizz scroll animation landing page"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

## GitHub Pages Deployment

This project uses `base: './'` in `vite.config.js`, so built assets work from a repository subpath.

1. Push the repository to GitHub.
2. In GitHub, open **Settings > Pages**.
3. Choose GitHub Actions or deploy the `dist` folder using a Pages workflow.
4. Run `npm run build` before publishing.
5. After deployment finishes, open the GitHub Pages URL and verify the hero, assets, and scroll animation.

## Vercel Deployment

1. Import the GitHub repository in Vercel.
2. Keep the default Vite settings.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Deploy and verify the live URL.
