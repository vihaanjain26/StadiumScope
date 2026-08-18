# Stadium Scope

A static stadium rankings and review site — NFL stadiums, MLB ballparks and NBA
arenas — scored on four categories and ranked honestly.

Plain HTML, CSS and JavaScript. Tailwind and GSAP come from a CDN. **No build
step, no framework, no backend, no database.**

---

## How to open it

**Option 1 — just double-click `index.html`.** It runs straight from the file
system. Everything works: the rankings, the tables, the detail pages, the
animations.

**Option 2 — VS Code Live Server** (nicer, because the page reloads when you
save). Install the *Live Server* extension, right-click `index.html`, choose
**"Open with Live Server"**.

You need to be online the first time you open it — Tailwind, GSAP and the Inter
font load from CDNs. If those are blocked, the site still renders and stays fully
readable; you just lose the animations and some spacing polish.

---

## The files

```
index.html          Home: overview table, top five, master ranking, method
nfl.html            NFL ranking + NFL venues table
mlb.html            MLB ranking + MLB venues table
nba.html            NBA ranking + NBA venues table
stadium.html        ONE page that renders any stadium, via ?id= in the URL
                    e.g. stadium.html?id=att-stadium
data/stadiums.js    ← ALL the data lives here. This is the file you edit.
main.js             All the rendering + animation logic, shared by every page
styles.css          The design system, shared by every page
assets/logos/       Optional real logo images (see the README in there)
```

---

## Where to edit stadium data

**`data/stadiums.js`** — that's it. Every score, table, ranking and detail page
on the site is generated from that one array when the page loads. Nothing is
typed into the HTML.

To change a review, a rating or a capacity, find the stadium in that file, edit
it, and refresh the browser.

**The reviews are intentionally blank.** Every stadium has the empty shape ready
to fill in:

```js
review: {
  overview: "",     // a paragraph or two setting the scene
  liked: [],        // one string per bullet
  disliked: [],     // one string per bullet
  verdict: "",      // a sentence or two to close
},
```

Fill in as much or as little as you like — each of the four parts only appears on
the page once it has something in it. A stadium with nothing written shows a
short "ratings are in, the write-up isn't" note instead of four empty headings.

---

## How to add a new stadium

1. Open `data/stadiums.js`.
2. Copy any existing stadium object and paste it at the end of the `STADIUMS`
   array (order in the file doesn't matter — the site sorts it).
3. Change the fields:

```js
{
  id: "petco-park",                    // unique slug → stadium.html?id=petco-park
  name: "Petco Park",
  team: "San Diego Padres",
  league: "MLB",                       // "NFL" | "MLB" | "NBA"
  rank: 3,                             // its position within its own league, 1 = best
  brand: { abbr: "SD", primary: "#2F241D", secondary: "#FFC425" },
  ratings: { atmosphere: 9.0, stadium: 9.1, uniqueness: 8.6, gameplay: 8.7 },
  review: {
    overview: "A paragraph or two setting the scene.",
    liked:    ["A good thing", "Another good thing"],
    disliked: ["A bad thing"],
    verdict:  "One or two sentences of conclusion.",
  },
  info: { capacity: "40,209", opened: 2004, city: "San Diego, CA",
          surface: "Natural grass", roof: "Open air" },
},
```

4. Bump the `rank` of any stadium in that league it just leapfrogged, so the
   ranks still run 1, 2, 3…
5. Save, refresh. It now appears in the league ranking, the league table, the
   master table, the home-page averages, and it has its own detail page.

You never type an overall score — `overallScore()` in `main.js` calculates it.

### The game you attended

Each stadium carries the game that was actually seen there. It's printed under
the team and city on every ranking card, and under the header on the detail page:

```js
game: {
  date: "Nov 25, 2021",
  status: "Final/OT",                        // "Final/OT" adds "(OT)" to the line
  away: { team: "Raiders",  score: 36 },
  home: { team: "Cowboys",  score: 33 },
},
```

renders as **Nov 25, 2021 · Raiders 36 – Cowboys 33 (OT)**. Leave `game` off
entirely and the line simply doesn't appear.

### One entry per gameday, not per building

A stadium shared by two teams is scored twice, because a Jets game and a Giants
game are not the same day out. That's why `metlife-stadium-jets` and
`metlife-stadium-giants` are separate entries with separate ratings.

### Venues you've booked but not visited

Give the entry `status: "upcoming"`, a `visit` line, and `rank`, `ratings` and
`review` all set to `null`:

```js
{
  id: "empower-field",
  name: "Empower Field at Mile High",
  team: "Denver Broncos",
  league: "NFL",
  rank: null,
  status: "upcoming",
  visit: "Sep 20, 2026 · vs Jaguars",
  brand: { abbr: "DEN", primary: "#FB4F14", secondary: "#002244" },
  ratings: null,
  review: null,
  info: { /* … */ },
},
```

It shows up under **Up next** on its league page and counts in the "Booked"
column of the overview table, but stays out of every ranking and average. When
you've been: delete `status` and `visit`, fill in `ratings`, `review` and `rank`,
and it moves into the ranking on its own.

---

## How the score works

```
Overall = (atmosphere + stadium + uniqueness + gameplay) / 4
```

rounded to two decimal places, computed in `overallScore()` in `main.js` every
time a page loads. Sorting uses the *unrounded* average, so 8.4375 still beats
8.4374. Trailing zeros are trimmed, so 8.5 prints as `8.5` and 8.01 as `8.01`.
Change `SCORE_DECIMALS` at the top of `main.js` to show more or fewer.

The four categories are defined in `RATING_CATEGORIES` at the top of
`data/stadiums.js`. Add or rename one there and the meters, the table columns and
the maths all follow automatically.

---

## Design notes

- **Type:** Inter only, loaded from Google Fonts.
- **Colour:** warm paper background, near-black ink, one accent (crimson
  `#C8102E`). No gradients anywhere.
- **Structure:** hairline rules instead of boxes and drop shadows; big tabular
  numerals do the work.
- **Motion (GSAP + ScrollTrigger):** hero slides up on load, sections fade in on
  scroll, ranking rows arrive as a staggered wave, cards lift on hover, and each
  rating bar animates its width from 0 to its value.
- **Accessibility:** motion is skipped entirely for anyone with
  `prefers-reduced-motion: reduce`, and if GSAP fails to load the page renders
  fully visible instead of blank.
- Mobile-first and responsive; wide tables scroll sideways inside their own
  container rather than breaking the page.
