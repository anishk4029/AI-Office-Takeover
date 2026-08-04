# AI Office Takeover Escape Room

A React/Vite escape-room game for coworkers. Includes:

- Randomized poker room
- 4x4 Sudoku audit room
- Nerdle-style equation firewall
- Wordle-style office AI word puzzle
- Timer
- Progress tracker
- Shutdown code fragments
- Reset/randomize button

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown in your terminal.

## Build for production

```bash
npm run build
```

The production files will be generated in the `dist` folder.

## Deploy to Vercel

1. Create a new GitHub repository.
2. Upload this entire folder to the repository.
3. Go to Vercel and create a new project.
4. Import the GitHub repository.
5. Use these settings:
   - Framework preset: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
6. Deploy.

## Share with coworkers

After deployment, copy the Vercel URL and add it to:

- A SharePoint page
- A Teams post
- A Copilot agent starter response

## Important

Do not put sensitive company data into this app. It is a static front-end game and does not include authentication or data storage.
