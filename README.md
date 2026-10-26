# Shouraya Sharma's static portfolio

The portfolio is a Next.js static export. Its public UI, icons, animations, and app layouts are unchanged. All portfolio content lives in `lib/data.ts`, transcribed from the supplied résumé. No database, authentication service, API, or environment variables are required.

## Develop and preview

- `npm install`
- `npm run dev` starts the development preview.
- `npm run build` generates the deployable static site in `out/`.
- `npm start` serves `out/` locally after a build. Set `PORT` to use a different port.

Deploy the contents of `out/` to a static host. The local preview script is a development convenience, not an application backend.

## Update content

Edit `lib/data.ts`, then rebuild and redeploy. The old Supabase admin dashboard, authentication callback, middleware, and database clients have been removed. Existing local `.env` files are unused and have not been modified.

Content mapping:

- About Me contains the résumé summary, degree, location, spoken languages, and contact links.
- Projects contains the current project list, with descriptions and technology tags drawn from the supplied project repositories where available.
- Experience contains the listed roles, including the Webmaster term through October 2026 and the current Executive Secretary role.
- Skills contains all eight technical skill groups from the résumé.
- Notes contains résumé-based education and current-work summaries, rather than invented journal entries. Note dates indicate the content snapshot, not original publication dates.
- Project categories organize work into personal, professional, and chapter/team work. OpsPilot AI is conservatively marked In Dev because the résumé does not confirm a live deployment; Shunt and Jugni are explicitly ongoing.
- Month-only experience dates use the first day internally; the existing UI displays only month and year.

The current Projects Finder has three built-in folders: Personal, Professional, and Team. To keep the frontend unchanged, Shivoham Labs projects are listed under Personal, while freelance work is listed under Professional. Freelance entries intentionally show only their names and live website links.

The source résumé itself is not copied into public assets.
