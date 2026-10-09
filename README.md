# Dadi’s birthday website

A standalone, responsive birthday website for Dadi, with a photo-led home page, a twenty-question quiz, a family leaderboard, and a Pictures gallery. Small Gujarati note: **તારાબેનનો જન્મદિવસ**.

No npm install, build step, framework, or paid hosting is required to publish the website files. A shared leaderboard needs the Supabase setup below. The existing ChatGPT-hosted version is separate and is not updated by this package.

## 1. Add Dadi’s picture

Put her photograph in `assets/dadi.jpg`. Or change `photo` in `config.js` to the correct relative filename (PNG and WebP work too).

Adjust `photoPosition` in `config.js` if needed: `"50% 35%"` keeps the crop slightly above centre. The real image remains unmodified. Until a photograph is added, the cover shows a heart with “Our Dadi.” No invented portrait is supplied.

## 2. Add family pictures

Put the photographs inside `assets/`, then edit the `pictures` list in `config.js`:

```js
pictures: [
  {
    src: "assets/dadi-with-purvi.jpg",
    caption: "Dadi and Purvi",
    alt: "Dadi with her granddaughter Purvi"
  },
  {
    src: "assets/family.jpg",
    caption: "All of us, together",
    alt: "Our family together"
  }
],
```

Keep commas between entries. Images open larger when clicked; Escape closes the enlarged photograph. Use simple filenames without spaces. File names and extensions must match exactly, including case. If no photographs have been added, the gallery shows an honest empty state.

## 3. Publish on GitHub Pages

1. Unzip the package.
2. Create a repository on GitHub, for example `dadi-birthday`.
3. Upload the **contents** of this folder to the repository root: `index.html`, `styles.css`, `app.js`, `questions.js`, `config.js`, `assets/`, and the other files. Do not put the ZIP itself on Pages. Keep the assets inside their folder.
4. Open repository **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Choose the `main` branch and `/ (root)`, then Save.
7. GitHub shows the published URL when deployment finishes. A project site normally looks like `https://YOUR-USERNAME.github.io/dadi-birthday/`.

All image, script, and stylesheet paths are relative, so the site works at a project-repository path and with a custom domain.

GitHub Pages is a static website host: it does not run the earlier Cloudflare/Next.js server or its database. This package is intentionally standalone.

A published Pages website is generally publicly accessible. Add photographs and names you are happy to show on that URL.

Official instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## 4. Shared family leaderboard

The quiz works immediately without a database. In that mode, it reveals a personal score but **does not save scores**, and the leaderboard explicitly says it is not connected. It does not pretend device-local scores are shared.

To let people on different phones join one leaderboard:

1. Create a Supabase project.
2. In its SQL Editor, run all of `supabase-setup.sql` once.
3. Find the project's URL and **publishable key** in the project connection/API settings.
4. Paste only those public values into `config.js`:

```js
supabaseUrl: "https://YOUR-PROJECT.supabase.co",
supabasePublishableKey: "sb_publishable_YOUR_KEY"
```

A legacy `anon` key also works. Never use a secret key or `service_role` key in a browser or GitHub repository.

5. Commit the changed `config.js` and let Pages republish.
6. Finish a quiz, enter your name and relationship, and check that your score also appears when the leaderboard is opened on another device.

The database grades the submitted answer indices; the browser does not get to choose its own score. Names/relationships are bounded to sixty characters, row-level security blocks direct table access, and only the two narrowly scoped database functions are callable. Retrying the same submission does not create another entry. Tied scores share a rank; the page shows the top 100 attempts. It is a friendly family game, not a cheat-proof competition: the source is readable, names are self-reported, and anonymous replay is allowed.

Shared mode never falls back to an unsaved local score if a network request fails. It preserves your answers and form so you can retry.

Supabase setup is included but has not been deployed into your account. Test it after adding your project values.

Official references:
- https://supabase.com/docs/guides/getting-started/api-keys
- https://supabase.com/docs/guides/database/functions
- https://supabase.com/docs/guides/database/postgres/row-level-security

## 5. Custom domain or shorter link

You do not need a domain to use Pages. To use a domain you own, enter it in repository **Settings → Pages → Custom domain**, then configure your registrar’s DNS as GitHub instructs. For a subdomain, the CNAME points to `YOUR-USERNAME.github.io`, not the full repository URL. Enable HTTPS when GitHub makes it available. Set the custom domain in Pages before pointing DNS at GitHub.

Official instructions: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

Alternatively, shorten the final live Pages URL using your preferred link-shortening service. No URL is shortened or domain purchased by this package.

## 6. Change the content

- `index.html`: opening-page wording, navigation, section containers.
- `styles.css`: colours, layout, photo frames, and cards.
- `questions.js`: question text, choices, correct indices, and answer-review memories. Choices are shuffled for each new attempt.
- `config.js`: portrait, gallery, shared-leaderboard connection.
- `app.js`: quiz, gallery, navigation, and saving behaviour.
- `supabase-setup.sql`: server grading and shared scores.

Birth year is question one. There are separate Chinese-checkers and carrom questions. White is an option in the colour question. Artwork in the question area contains no answer-specific flowers, food, bicycles, subjects, seasons, or board games. The small Samayik bag is one personal decorative detail; the overall theme is Dadi’s birthday scrapbook.

The unclear “5–7” note and the later phrase you asked to leave out are not used. The book and stavan use the supplied transliterations; you can refine the spelling when you have a book cover or the Gujarati title.

If you change correct answers, their order, or the question count in shared mode, update the matching server answer key and total in `supabase-setup.sql`, and use a new quiz version in both places before allowing new scores. Wording-only changes do not require an answer-key change.

## 7. Add the museum later

The game is already one section of the larger website. Add a new `<section id="museum" class="page" hidden>` at the marked location in `index.html`, add a navigation link, and include `museum` in the allowed section names in `app.js`’s `route()` function. It can use the same palette and photo gallery styles.

## Preview locally

Open `index.html` directly for a quick offline look. For the most reliable local preview, run:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`. This is a static-file server; no dependencies are installed.

## Artwork

`assets/samayik.png` is an original illustration made with the built-in image-generation tool. It depicts a cotton Samayik bag, folded cloth, a plain prayer book and beads on pale pink; it is decorative, not a photograph of Dadi’s belongings. It contains no quiz-answer subjects or religious emblems. No portrait of Dadi was generated.

## Validation in this package

JavaScript syntax, all twenty question definitions, correct-answer indices, requested changes, HTML asset paths, and the matching SQL answer key were checked. Browser layout/interaction checks could not run because this environment has no browser executable. The Supabase functions require your own project setup and have not been integration-tested against a live database.
