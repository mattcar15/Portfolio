# Portfolio

Personal portfolio website built with Next.js, showcasing projects and experience.

🌐 **Live Site**: [carrollmatt.com](https://carrollmatt.com)

## Tech Stack

- [Next.js](https://nextjs.org) - React framework with static site generation
- TypeScript
- Tailwind CSS
- shadcn/ui components

## Getting Started

### Development

IMPORTANT: If it's your first time using the lbirary you must first run `yarn build` it generates the images needed for displaying the picture objects

First, install dependencies with Yarn:

```bash
yarn install
```

Then run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building

To create a production build:

```bash
yarn build
```

This generates a static export in the `./out` directory, which can be served by any static hosting provider.

## Deployment

The site is automatically deployed to GitHub Pages using GitHub Actions. The deployment workflow:

1. **Trigger**: Automatically runs on every push to the `main` branch
2. **Build Process**: 
   - Uses Node.js 22.4.1
   - Installs dependencies with `yarn install --frozen-lockfile`
   - Builds the static site with `yarn build`
3. **Deploy**: Uploads the `./out` directory to GitHub Pages

The workflow configuration can be found in `.github/workflows/deploy.yml`.

### Custom Domain

The site is configured to serve from the custom domain [https://carrollmatt.com](https://carrollmatt.com) via the `CNAME` file in the repository root.
