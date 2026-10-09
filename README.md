# Dadi’s birthday website — version 2

A static birthday website for GitHub Pages. No build, Node, or npm needed.

## What is included

- Main portrait: `dadi.jpg` (the actual solo Dadi photo).
- All eight uploaded JPGs displayed on a randomly arranged scrapbook wall. Tap any photograph to enlarge it. Shuffle changes the order.
- The original 20-question quiz, starting with her birth year. Name and relationship are requested after all answers.
- Dadi’s museum: childhood, a family timeline, everyday favourites, bookshelf, and the kindness corner.
- A nine-piece photo puzzle. Tap any two pieces to swap them. Pick any photograph from the album. No dragging required.
- A link to a Gujarati Gautam Pruchha reader and the official Jivdaya Trust donation page.
- Responsive phone layouts, keyboard navigation, reduced-motion support.

## Update your existing GitHub website

1. Download and extract this ZIP on your computer. Open the extracted folder.
2. Visit `https://github.com/Purvi9399/dadi-game` and select the branch used for Pages (normally `main`).
3. Choose **Add file → Upload files**.
4. Drag the FILES INSIDE the extracted folder onto the upload area. Do not upload the ZIP or a containing folder. `index.html` should be beside `config.js`, `app.js`, `memories.js`, and the photos at the repository root.
5. Upload all included files, including `memories.js` (new). GitHub will replace matching filenames. The eight photos already in your repository use the same names.
6. Click **Commit changes**. Use a message such as `Add Dadi's scrapbook, museum and puzzle`.
7. If Pages is already working, your existing publishing setup should rebuild. Check the repository’s **Actions** tab for completion.
8. Open `https://purvi9399.github.io/dadi-game/` and refresh. If it still shows the previous design, hard-refresh or try a private/incognito tab.

If publishing for the first time: **Settings → Pages → Build and deployment → Deploy from a branch → main → /(root) → Save**. The repository needs to be public for Pages on a free personal GitHub plan. The contents, photos, and shared family scores will be visible to anyone with access to the public site.

## Connect the shared family leaderboard to Supabase

The site runs without a database but then shows personal results only. Shared quiz scores need the setup below.

1. Open `https://supabase.com/dashboard`, create an account if needed, and create a new project. Pick a project name, database password, and region. Keep the database password for yourself; the website does not use it.
2. Wait for the project to finish provisioning.
3. Open **SQL Editor → New query**. Open the included `supabase-setup.sql` in a text editor, copy its ENTIRE contents into the query, and click **Run**. This creates the table and two limited functions used by the site. It enables RLS and disables direct browser access to the table. If you ran the previous version of this same SQL already, it is safe to run again and existing scores remain.
4. Open the project’s **Connect** dialog. Copy the HTTPS **Project URL** and the **Publishable key** (normally starts with `sb_publishable_`). You can also find publishable keys in project **Settings → API Keys**. This app also supports the legacy `anon` key. Do not copy a database connection string, `service_role`, or secret key.
5. In your GitHub repository, open `config.js`, click the pencil/edit button, and replace ONLY these two empty values:

```js
  supabaseUrl: "https://YOUR-PROJECT-REF.supabase.co",
  supabasePublishableKey: "sb_publishable_YOUR_PUBLIC_KEY"
```

Keep the comma between those lines. Keep the rest of the config unchanged. Commit the edit and wait for Pages to rebuild. The publishable key is intended to be visible in browser code; access is restricted by the database permissions in the SQL script.

6. Play the quiz on the published site. Finish every answer, submit your name and relationship, then open **Family scores**. A row should appear. Open the site on another phone and check that the same row is visible there.
7. In Supabase **Table Editor → dadi_scores**, you can inspect or delete a test entry.

If saving fails: check the project URL and key for stray spaces, ensure the project is active, confirm that the SQL ran without errors and that the Data API exposes `public`. Leave your answers in place and retry. Scores are computed on the server from the answers; the browser does not submit a precomputed score. Anyone with the public quiz link can submit attempts, so this is a friendly family game, not a tamper-proof contest. Use Refresh scores to fetch new results; it does not stream updates automatically.

Puzzle points are separate from quiz scores and are shown only in the puzzle session. They are not stored in Supabase. A completed puzzle earns 100 points for up to 8 swaps; extra swaps subtract 2 points each, with a minimum of 10.

## Add more photographs

1. Upload each new JPG/PNG to the repository root. Use simple filenames such as `dadi10.jpg` and match case exactly.
2. In `config.js`, add a comma-separated entry inside `pictures`:

```js
{src:"dadi10.jpg", caption:"A little memory together", alt:"Describe who or what is in this photograph"}
```

3. Commit. The scrapbook and puzzle picker both use that list. Gallery order is shuffled whenever you open it.
4. Set `puzzlePhoto` to the filename of your preferred Dadi-and-Dada picture. The current default, `dadi7.jpg`, is a family group photo. The people in it have not been identified individually.

## Make the museum yours

Edit the museum story text in `index.html`. Keep dates and memories confirmed by Dadi. The current historical section links to the History of Vadodara archive; it does not claim that the displayed personal photographs are childhood pictures.

For dated historical photos you have permission to publish, upload the photo and add to `historicalPhotos` in `config.js`:

```js
{src:"baroda-1955.jpg", caption:"Baroda, 1955 — photographer/source credit", alt:"Description of this historical photograph", sourceUrl:"https://the-original-source"}
```

Only label a year if the source establishes it. No AI reconstruction is presented as a historical photograph.

Add Purvi’s poems in `poems`:

```js
{title:"For my Dadi", text:"First line of the poem.\nSecond line of the poem."}
```

Upload an audio recording you have permission to share and set `stavanAudio: "stavan.mp3"`. Her favourite stavan is named in the museum even without a recording.

The bookshelf links to `https://jainqq.org/explore/037180/1`, a Gujarati Gautam Pruchha edition by Jayanandvijay, published by Guru Ramchandra Prakashan Samiti, 92 pages. Check Dadi’s cover to confirm whether it is her edition. The reader opens on the book provider’s site. A provider’s available PDF download is not permission to redistribute it. If you have a permitted PDF to publish, upload it and set `bookPdf: "gautam-pruchha.pdf"`; an additional reading link then appears.

## An extra birthday idea

“79 little acts of kindness”: ask each family member to choose one small act in her honour. Collect a sentence or voice note about it and read/play them for her. This honours the kindness she gives rather than asking her to be comfortable with a big party. The current website introduces the idea; it does not claim to collect or count pledges.

## Local editing in VS Code

Open this extracted folder in VS Code. Edit the HTML, CSS, or JS, then preview with the VS Code Live Server extension (or any static HTTP server). Upload the changed files to GitHub when ready. This version has no build command. If you prefer Git, clone your repository, copy these files into the clone, inspect `git diff`, then commit and push. Do not upload your Supabase database password or secret keys.

## Links and remaining content

- Old Vadodara photographs: https://historyofvadodara.in/gallery/photos/
- Then and now: https://historyofvadodara.in/then-now/
- Book reader: https://jainqq.org/explore/037180/1
- Donation: https://www.jivdayatrust.org/donate-now/
- Supabase public keys: https://supabase.com/docs/guides/getting-started/api-keys

The donation is processed on the charity’s site. This website does not collect payments. Old family photographs, poems, a stavan recording, and the exact book edition can be added when you have them.
