# Stratametrics

Stratametrics is a premium, institutional-grade data-as-a-service frontend designed for high-net-worth investors, quants, and professional traders. The product combines secure authentication, real-time market data, and a refined monochrome experience to present financial intelligence in a calm, trustworthy, and highly usable format.

## What the product does

- Presents a polished public landing experience for the brand and product narrative
- Supports secure authentication through Supabase with email/password and Google OAuth
- Protects premium dashboard routes and market data access behind authentication
- Connects to a backend API for market-data retrieval and display
- Offers a structured dashboard experience with Home, Markets, Portfolio, and Settings views

## Design philosophy

Stratametrics is built around an institutional visual language:

- Deep, premium neutral backgrounds with strong typography
- Monochrome surfaces and editorial spacing
- Sharp, readable numerical presentation for market data
- A calm, trustworthy interface designed for long-form analysis and high-stakes decision-making

## Core stack

- React 19 with Vite
- TypeScript
- React Router
- Tailwind CSS
- Supabase Auth
- Axios
- Lucide icons

## Project structure

- src/components — reusable UI surfaces such as the landing page, auth form, layout, and market grid
- src/hooks — authentication and market-data state logic
- src/services — Supabase client setup
- public — static assets, including the landing-page hero illustration

## Authentication and routing

- Public routes include the landing experience and login screen
- Protected routes require a valid Supabase session
- Authenticated users can still navigate to Home from the sidebar and reach the rest of the product experience

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a local environment file with your Supabase values:
   ```bash
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
3. Start the app:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## Roadmap opportunities

- Add portfolio analytics widgets and risk summaries
- Introduce live charts and real-time price updates
- Expand role-based access and admin controls
- Add saved watchlists and alerts
- Connect additional institutional data providers
