/* =============================================================================
   STADIUM SCOPE — MAIN SCRIPT
   -----------------------------------------------------------------------------
   One script for every page. Each HTML page sets `data-page` (and sometimes
   `data-league`) on its <body>, and the router at the bottom of this file
   decides what to render.

   Reading order:
     1. Helpers        — the maths (overall score) and small utilities
     2. Logo badge     — the team mark drawn next to every stadium
     3. Renderers      — ranking lists, the three kinds of table, detail page
     4. Animation      — GSAP + ScrollTrigger
     5. Router         — wires it all up on DOMContentLoaded
   ========================================================================== */

/* ============================================================ 1. HELPERS === */

/* Scores are shown to two decimal places, matching how they're recorded:
   8.01, 8.44, 8.74. Change this one number to show more or fewer. */
const SCORE_DECIMALS = 2;

/* THE score calculation. Every score shown anywhere on the site comes from
   here, so it can never drift out of sync with the data.
   Overall = average of the four categories. */
function overallScore(stadium) {
  return roundScore(rawScore(stadium));
}

/* Unrounded average — used for sorting so that 8.4375 still beats 8.4374. */
function rawScore(stadium) {
  if (!isRated(stadium)) return 0;
  const values = RATING_CATEGORIES.map((c) => Number(stadium.ratings[c.key]) || 0);
  const total = values.reduce((sum, n) => sum + n, 0);
  return total / values.length;
}

function roundScore(n) {
  const factor = 10 ** SCORE_DECIMALS;
  /* The tiny nudge matters. (7.6+8.8+8.5+7.8)/4 is exactly 8.175, but in
     binary floating point it lands on 8.174999999999999, which would round
     down to 8.17 instead of 8.18. Adding one epsilon's worth pushes a value
     that *should* sit on the .xx5 boundary back onto it. */
  return Math.round((n + Number.EPSILON * n) * factor) / factor;
}

/* Print a score with no trailing zeros: 8.5 stays "8.5", 8.01 stays "8.01". */
function fmtScore(n) {
  return String(roundScore(n));
}

/* A stadium counts as rated once every category has a number on it. Venues
   that are booked but not yet visited have ratings: null. */
function isRated(stadium) {
  return !!stadium.ratings &&
    RATING_CATEGORIES.every((c) => typeof stadium.ratings[c.key] === "number");
}

/* All stadiums in one league — including ones not yet visited. */
function byLeague(league) {
  return STADIUMS.filter((s) => s.league === league);
}

/* Just the scored ones. This is what every ranking and table is built from. */
function ratedIn(league) {
  return byLeague(league).filter(isRated);
}

/* Booked but not yet visited, soonest first (they carry no score). */
function upcomingIn(league) {
  return byLeague(league).filter((s) => !isRated(s));
}

/* Every scored stadium, all leagues. */
const RATED = () => STADIUMS.filter(isRated);

/* Sorted by the manual `rank` field (1 = best) — used inside a league. */
function sortedByRank(list) {
  return [...list].sort((a, b) => a.rank - b.rank);
}

/* Sorted by score, best first — used for the cross-league master table. */
function sortedByScore(list) {
  return [...list].sort(
    (a, b) => rawScore(b) - rawScore(a) || a.name.localeCompare(b.name)
  );
}

/* One row of the site overview table. */
function leagueSummary(league) {
  const list = ratedIn(league);
  const best = sortedByScore(list)[0];
  const average = list.reduce((sum, s) => sum + rawScore(s), 0) / list.length;
  return { league, count: list.length, average, best, upcoming: upcomingIn(league).length };
}

const LEAGUES = ["NFL", "MLB", "NBA"];
const LEAGUE_LABEL = {
  NFL: "Football",
  MLB: "Baseball",
  NBA: "Basketball",
};

/* Tiny helper so the renderers below read like HTML instead of DOM calls. */
function el(html) {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}

/* Escape anything that ends up inside markup, so a stray < in review text
   can't break the page. */
function esc(str) {
  return String(str).replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
}

/* The game I actually attended, as one short line:
   "Nov 25, 2021 · Raiders 36 – Cowboys 33 (OT)".
   Returns "" for a stadium with no `game`, so the line just disappears. */
function gameLine(stadium) {
  const g = stadium.game;
  if (!g) return "";
  const ot = /OT/i.test(g.status || "") ? " (OT)" : "";
  return `${g.date} · ${g.away.team} ${g.away.score} – ${g.home.team} ${g.home.score}${ot}`;
}

/* ========================================================= 2. LOGO BADGE === */

/* Draws the team mark that sits next to every stadium name.
   If the stadium has a `logo` path we use that image; otherwise we build a
   clean monogram badge from the team's own colours. Drop a real file into
   assets/logos/ and add `logo: "assets/logos/gb.svg"` to swap it in. */
function makeLogo(stadium, size = "md") {
  const brand = stadium.brand || {};
  const primary = brand.primary || "#0B0B0C";
  const secondary = brand.secondary || "#FFFFFF";

  if (stadium.logo) {
    return `<span class="logo logo-${size}" style="background:${primary}">
              <img src="${esc(stadium.logo)}" alt="${esc(stadium.team)} logo">
            </span>`;
  }

  return `<span class="logo logo-${size}"
                style="background:${primary}; color:#fff;
                       box-shadow: inset 0 -3px 0 ${secondary};"
                title="${esc(stadium.team)}"
                aria-hidden="true">${esc(brand.abbr || "•")}</span>`;
}

/* ========================================================== 3. RENDERERS === */

/* ---- 3a. Ranking list (the big editorial rows on every league page) ------ */
function renderRankingList(container, list) {
  if (!container) return;
  container.innerHTML = "";

  list.forEach((stadium, i) => {
    const row = el(`
      <a href="stadium.html?id=${esc(stadium.id)}" class="rank-card reveal">
        <span class="rank-num tnum">${i + 1}</span>

        <span class="flex items-center gap-4 min-w-0">
          ${makeLogo(stadium, "md")}
          <span class="min-w-0">
            <span class="block h3">${esc(stadium.name)}</span>
            <span class="block text-sm mt-1" style="color:var(--ink-soft)">
              ${esc(stadium.team)} &nbsp;·&nbsp; ${esc(stadium.info.city)}
            </span>
            ${gameLine(stadium) ? `<span class="scoreline mt-1.5">${esc(gameLine(stadium))}</span>` : ""}
          </span>
        </span>

        <span class="text-right pl-3">
          <span class="score-big tnum">${fmtScore(overallScore(stadium))}</span>
          <span class="block eyebrow mt-1">Overall</span>
        </span>
      </a>
    `);
    container.appendChild(row);
  });
}

/* ---- 3b. Table 1: the site overview -------------------------------------- */
/* One row per league plus a totals row: what this site actually contains. */
function renderOverviewTable(container) {
  if (!container) return;

  const rows = LEAGUES.map((league) => {
    const s = leagueSummary(league);
    return `
      <tr>
        <td><span class="cell-name">${league}</span></td>
        <td style="color:var(--ink-faint)">${LEAGUE_LABEL[league]}</td>
        <td class="cell-num">${s.count}</td>
        <td class="cell-num" style="color:var(--ink-faint)">${s.upcoming || "—"}</td>
        <td class="cell-num">${fmtScore(s.average)}</td>
        <td>
          <a class="link-u cell-name" href="stadium.html?id=${esc(s.best.id)}">
            ${esc(s.best.name)}
          </a>
        </td>
        <td class="cell-score">${fmtScore(overallScore(s.best))}</td>
        <td class="text-right">
          <a class="link-u text-sm" style="color:var(--accent)"
             href="${league.toLowerCase()}.html">View&nbsp;→</a>
        </td>
      </tr>`;
  }).join("");

  const rated = RATED();
  const totalCount = rated.length;
  const totalUpcoming = STADIUMS.length - rated.length;
  const totalAvg = rated.reduce((sum, s) => sum + rawScore(s), 0) / rated.length;
  const overallBest = sortedByScore(rated)[0];

  container.innerHTML = `
    <table class="data">
      <thead>
        <tr>
          <th>League</th>
          <th>Sport</th>
          <th class="cell-num">Visited</th>
          <th class="cell-num">Booked</th>
          <th class="cell-num">Avg score</th>
          <th>Highest rated</th>
          <th class="cell-num">Score</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${rows}
        <tr class="row-total">
          <td>All</td>
          <td style="color:var(--ink-faint)">Three sports</td>
          <td class="cell-num">${totalCount}</td>
          <td class="cell-num">${totalUpcoming || "—"}</td>
          <td class="cell-num">${fmtScore(totalAvg)}</td>
          <td>
            <a class="link-u" href="stadium.html?id=${esc(overallBest.id)}">
              ${esc(overallBest.name)}
            </a>
          </td>
          <td class="cell-score">${fmtScore(overallScore(overallBest))}</td>
          <td></td>
        </tr>
      </tbody>
    </table>`;
}

/* ---- 3c. Table 2: the master ranking across all three leagues ------------ */
function renderMasterTable(container) {
  if (!container) return;

  const rows = sortedByScore(RATED())
    .map((s, i) => `
      <tr>
        <td class="cell-rank">${i + 1}</td>
        <td>
          <a class="flex items-center gap-3" href="stadium.html?id=${esc(s.id)}">
            ${makeLogo(s, "sm")}
            <span class="cell-name">${esc(s.name)}</span>
          </a>
        </td>
        <td style="color:var(--ink-soft)">${esc(s.team)}</td>
        <td><span class="badge">${s.league}</span></td>
        ${RATING_CATEGORIES.map(
          (c) => `<td class="cell-num" style="color:var(--ink-faint)">${fmtScore(s.ratings[c.key])}</td>`
        ).join("")}
        <td class="cell-score">${fmtScore(overallScore(s))}</td>
      </tr>`)
    .join("");

  container.innerHTML = `
    <table class="data" style="min-width:820px">
      <thead>
        <tr>
          <th>#</th>
          <th>Stadium</th>
          <th>Team</th>
          <th>League</th>
          ${RATING_CATEGORIES.map((c) => `<th class="cell-num">${c.label.slice(0, 4)}</th>`).join("")}
          <th class="cell-num">Overall</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
}

/* ---- 3d. Table 3: one league's visited venues, with the details ---------- */
function renderLeagueTable(container, league) {
  if (!container) return;

  const rows = sortedByRank(ratedIn(league))
    .map((s, i) => `
      <tr>
        <td class="cell-rank">${i + 1}</td>
        <td>
          <a class="flex items-center gap-3" href="stadium.html?id=${esc(s.id)}">
            ${makeLogo(s, "sm")}
            <span class="cell-name">${esc(s.name)}</span>
          </a>
        </td>
        <td style="color:var(--ink-soft)">${esc(s.team)}</td>
        <td style="color:var(--ink-soft)">${esc(s.info.city)}</td>
        <td class="cell-num" style="color:var(--ink-faint)">${esc(s.info.opened)}</td>
        <td class="cell-num" style="color:var(--ink-faint)">${esc(s.info.capacity)}</td>
        <td style="color:var(--ink-faint)">${esc(s.info.roof)}</td>
        <td class="cell-score">${fmtScore(overallScore(s))}</td>
      </tr>`)
    .join("");

  container.innerHTML = `
    <table class="data" style="min-width:760px">
      <thead>
        <tr>
          <th>#</th>
          <th>Stadium</th>
          <th>Team</th>
          <th>City</th>
          <th class="cell-num">Opened</th>
          <th class="cell-num">Capacity</th>
          <th>Roof</th>
          <th class="cell-num">Overall</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
}

/* ---- 3e. The stadium detail page ---------------------------------------- */
function renderStadiumPage() {
  const id = new URLSearchParams(window.location.search).get("id");
  const stadium = STADIUMS.find((s) => s.id === id);
  const root = document.getElementById("stadium-root");
  if (!root) return;

  /* Bad or missing ?id= — say so instead of rendering a blank page. */
  if (!stadium) {
    root.innerHTML = `
      <div class="shell" style="padding-block:120px 160px">
        <p class="eyebrow">404 <span class="dot">·</span> Not found</p>
        <h1 class="display mt-5">No stadium<br>by that name.</h1>
        <p class="lede mt-7">
          The link used <code>?id=${esc(id || "")}</code>, which isn't in the data file.
        </p>
        <a class="btn mt-9" href="index.html">← Back to the rankings</a>
      </div>`;
    return;
  }

  document.title = `${stadium.name} — Stadium Scope`;

  /* Booked but not visited yet: there's nothing to score or review, so show
     the fixtures card instead of pretending we have an opinion. */
  if (!isRated(stadium)) {
    renderUpcomingStadiumPage(root, stadium);
    return;
  }

  const score = overallScore(stadium);
  const leagueRank = sortedByRank(ratedIn(stadium.league))
    .findIndex((s) => s.id === stadium.id) + 1;
  const overallRank = sortedByScore(RATED())
    .findIndex((s) => s.id === stadium.id) + 1;

  /* Which category scored highest? That bar gets the accent colour. */
  const bestKey = RATING_CATEGORIES
    .slice()
    .sort((a, b) => stadium.ratings[b.key] - stadium.ratings[a.key])[0].key;

  const meters = RATING_CATEGORIES.map((c) => {
    const value = Number(stadium.ratings[c.key]);
    return `
      <div class="meter-row reveal">
        <div class="flex items-baseline justify-between gap-4 mb-2.5">
          <div>
            <span class="meter-label">${c.label}</span>
            <span class="meter-blurb block mt-0.5">${c.blurb}</span>
          </div>
          <span class="meter-value tnum">${fmtScore(value)}<span style="color:var(--ink-faint)">/10</span></span>
        </div>
        <div class="meter-track">
          <div class="meter-fill ${c.key === bestKey ? "is-best" : ""}"
               data-value="${value}"></div>
        </div>
      </div>`;
  }).join("");

  const info = [
    ["Capacity", stadium.info.capacity],
    ["Opened", stadium.info.opened],
    ["City", stadium.info.city],
    ["Surface", stadium.info.surface],
    ["Roof", stadium.info.roof],
  ].map(([k, v]) => `
      <div class="info-item">
        <div class="info-key">${k}</div>
        <div class="info-val">${esc(v)}</div>
      </div>`).join("");

  root.innerHTML = `
    <!-- ---------- Header ---------- -->
    <header class="shell" style="padding-block:56px 40px">
      <a href="${stadium.league.toLowerCase()}.html"
         class="eyebrow link-u">← ${stadium.league} rankings</a>

      <div class="mt-9 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
        <div class="min-w-0">
          <div class="flex items-center gap-4">
            ${makeLogo(stadium, "lg")}
            <div class="flex flex-wrap gap-2">
              <span class="badge badge-accent">${stadium.league}</span>
              <span class="badge">#${leagueRank} in ${stadium.league}</span>
              <span class="badge">#${overallRank} overall</span>
            </div>
          </div>
          <h1 class="display mt-6">${esc(stadium.name)}</h1>
          <p class="lede mt-4">${esc(stadium.team)} &nbsp;·&nbsp; ${esc(stadium.info.city)}</p>
          ${gameLine(stadium) ? `
            <p class="eyebrow mt-6">Game attended</p>
            <p class="scoreline scoreline-lg mt-2">${esc(gameLine(stadium))}</p>` : ""}
        </div>

        <div class="lg:text-right shrink-0">
          <div class="eyebrow">Overall score</div>
          <div class="score-hero mt-2" style="color:var(--accent)">${fmtScore(score)}</div>
          <div class="text-sm mt-2" style="color:var(--ink-faint)">
            Average of ${RATING_CATEGORIES.length} categories, out of 10
          </div>
        </div>
      </div>
    </header>

    <div class="shell"><hr class="rule-dark"></div>

    <!-- ---------- Ratings + review ---------- -->
    <div class="shell grid lg:grid-cols-[minmax(0,1fr)_380px] gap-14 lg:gap-20"
         style="padding-block:56px">

      <!-- Written review -->
      <div>${renderReview(stadium.review)}</div>

      <!-- Sidebar: rating meters + extra info -->
      <aside>
        <p class="eyebrow reveal">The ratings</p>
        <div class="mt-3" style="border-top:1px solid var(--ink)">${meters}</div>

        <p class="eyebrow mt-14 reveal">Extra info</p>
        <div class="mt-3" style="border-top:1px solid var(--ink)">${info}</div>
      </aside>
    </div>

    <!-- ---------- Next / previous in this league ---------- -->
    <div class="shell" style="padding-bottom:40px">
      <div id="neighbours" class="grid sm:grid-cols-2 gap-4"></div>
    </div>`;

  renderNeighbours(stadium);
}

/* Builds the written review. Each of the four parts is only rendered once it
   has something in it, so a stadium with the ratings filled in but the words
   not written yet shows a short note instead of four empty headings. */
function renderReview(review) {
  if (!review) return "";

  const parts = [];

  if (review.overview) {
    parts.push(`
      <section class="reveal">
        <p class="eyebrow">Overview</p>
        <p class="prose mt-4 text-[17px]">${esc(review.overview)}</p>
      </section>`);
  }

  if (review.liked && review.liked.length) {
    parts.push(`
      <section class="mt-14 reveal">
        <p class="eyebrow">What I liked</p>
        <ul class="list-pro mt-4">
          ${review.liked.map((l) => `<li>${esc(l)}</li>`).join("")}
        </ul>
      </section>`);
  }

  if (review.disliked && review.disliked.length) {
    parts.push(`
      <section class="mt-14 reveal">
        <p class="eyebrow">What I didn't like</p>
        <ul class="list-con mt-4">
          ${review.disliked.map((l) => `<li>${esc(l)}</li>`).join("")}
        </ul>
      </section>`);
  }

  if (review.verdict) {
    parts.push(`
      <section class="mt-14 reveal">
        <p class="eyebrow">Final verdict</p>
        <blockquote class="verdict mt-5">${esc(review.verdict)}</blockquote>
      </section>`);
  }

  /* Nothing written yet — say so rather than showing an empty column. */
  if (!parts.length) {
    return `
      <section class="reveal">
        <p class="eyebrow">The write-up</p>
        <p class="lede mt-4">
          Ratings are in; the write-up isn't. The overview, what I liked, what I
          didn't and the final verdict go here.
        </p>
      </section>`;
  }

  return parts.join("");
}

/* Previous / next stadium within the same league, at the foot of the page. */
function renderNeighbours(stadium) {
  const list = sortedByRank(ratedIn(stadium.league));
  const i = list.findIndex((s) => s.id === stadium.id);
  const prev = list[i - 1];
  const next = list[i + 1];
  const box = document.getElementById("neighbours");
  if (!box) return;

  const tile = (s, label, align) => !s ? "" : `
    <a class="tile reveal ${align}" href="stadium.html?id=${esc(s.id)}">
      <span class="eyebrow">${label}</span>
      <span class="flex items-center gap-3 mt-3 ${align === "text-right" ? "justify-end" : ""}">
        ${makeLogo(s, "sm")}
        <span class="h3">${esc(s.name)}</span>
      </span>
      <span class="block text-sm mt-2" style="color:var(--ink-soft)">
        ${esc(s.team)} · ${fmtScore(overallScore(s))}
      </span>
    </a>`;

  /* If there's no "previous" (this is the #1 stadium) we drop an empty cell in
     so the "next" tile still sits in the right-hand column. */
  const spacer = !prev && next ? `<span class="hidden sm:block"></span>` : "";

  box.innerHTML =
    tile(prev, `← Ranked higher in ${stadium.league}`, "") +
    spacer +
    tile(next, `Ranked lower in ${stadium.league} →`, "text-right");
}

/* ---- 3f. Detail page for a venue that hasn't been visited yet ------------ */
function renderUpcomingStadiumPage(root, stadium) {
  const info = [
    ["Capacity", stadium.info.capacity],
    ["Opened", stadium.info.opened],
    ["City", stadium.info.city],
    ["Surface", stadium.info.surface],
    ["Roof", stadium.info.roof],
  ].map(([k, v]) => `
      <div class="info-item">
        <div class="info-key">${k}</div>
        <div class="info-val">${esc(v)}</div>
      </div>`).join("");

  root.innerHTML = `
    <header class="shell" style="padding-block:56px 40px">
      <a href="${stadium.league.toLowerCase()}.html"
         class="eyebrow link-u">← ${stadium.league} rankings</a>

      <div class="mt-9 flex items-center gap-4">
        ${makeLogo(stadium, "lg")}
        <div class="flex flex-wrap gap-2">
          <span class="badge">${stadium.league}</span>
          <span class="badge badge-accent">Not yet visited</span>
        </div>
      </div>

      <h1 class="display mt-6">${esc(stadium.name)}</h1>
      <p class="lede mt-4">${esc(stadium.team)} &nbsp;·&nbsp; ${esc(stadium.info.city)}</p>
    </header>

    <div class="shell"><hr class="rule-dark"></div>

    <div class="shell grid lg:grid-cols-[minmax(0,1fr)_380px] gap-14 lg:gap-20"
         style="padding-block:56px">
      <div>
        <p class="eyebrow reveal">Booked for</p>
        <p class="h2 mt-4 reveal">${esc(stadium.visit || "A date to be confirmed")}</p>
        <p class="prose mt-7 reveal" style="max-width:56ch">
          No score yet — the four categories only get filled in after I've
          actually been. Check back once the game has been played.
        </p>
        <a class="btn mt-9 reveal" href="${stadium.league.toLowerCase()}.html">
          ← See the venues I have scored
        </a>
      </div>

      <aside>
        <p class="eyebrow reveal">Extra info</p>
        <div class="mt-3" style="border-top:1px solid var(--ink)">${info}</div>
      </aside>
    </div>`;
}

/* ---- 3g. "Up next" strip on a league page ------------------------------- */
function renderUpcoming(container, league) {
  const list = upcomingIn(league);
  /* No booked venues in this league? Hide the whole section. */
  const section = container && container.closest("[data-upcoming-section]");
  if (!container || !list.length) {
    if (section) section.hidden = true;
    return;
  }

  container.innerHTML = list.map((s) => `
    <a class="tile reveal" href="stadium.html?id=${esc(s.id)}">
      <span class="eyebrow">${esc(s.visit || "Date TBC")}</span>
      <span class="flex items-center gap-3 mt-3">
        ${makeLogo(s, "sm")}
        <span class="h3">${esc(s.name)}</span>
      </span>
      <span class="block text-sm mt-2" style="color:var(--ink-soft)">
        ${esc(s.team)} · ${esc(s.info.city)}
      </span>
    </a>`).join("");
}

/* ---- 3h. Home page league tiles ----------------------------------------- */
/* `includeAll` adds a fourth tile linking to the master ranking. The rankings
   page itself passes false — it would only link back to itself. */
function renderLeagueTiles(container, includeAll = false) {
  if (!container) return;

  const leagueTiles = LEAGUES.map((league) => {
    const s = leagueSummary(league);
    return `
      <a class="tile tile-compact reveal" href="${league.toLowerCase()}.html">
        <div class="flex items-start justify-between">
          <span class="tile-title">${league}</span>
          <span class="tile-arrow text-xl" style="color:var(--ink-faint)">→</span>
        </div>
        <p class="text-sm mt-1.5" style="color:var(--ink-soft)">
          ${s.count} venues · avg ${fmtScore(s.average)}
        </p>
        <div class="mt-4 pt-4" style="border-top:1px solid var(--rule)">
          <span class="eyebrow">Number one</span>
          <span class="flex items-center gap-2.5 mt-2">
            ${makeLogo(s.best, "sm")}
            <span class="font-semibold text-sm">${esc(s.best.name)}</span>
          </span>
        </div>
      </a>`;
  });

  if (!includeAll) {
    container.innerHTML = leagueTiles.join("");
    return;
  }

  /* A fourth tile alongside the three leagues, pointing at the master ranking. */
  const rated = RATED();
  const average = rated.reduce((sum, st) => sum + rawScore(st), 0) / rated.length;
  const best = sortedByScore(rated)[0];

  leagueTiles.push(`
      <a class="tile tile-compact tile-accent reveal" href="rankings.html">
        <div class="flex items-start justify-between">
          <span class="tile-title">All</span>
          <span class="tile-arrow text-xl" style="color:var(--accent)">→</span>
        </div>
        <p class="text-sm mt-1.5" style="color:var(--ink-soft)">
          ${rated.length} venues · avg ${fmtScore(average)}
        </p>
        <div class="mt-4 pt-4" style="border-top:1px solid var(--rule)">
          <span class="eyebrow">The master ranking</span>
          <span class="flex items-center gap-2.5 mt-2">
            ${makeLogo(best, "sm")}
            <span class="font-semibold text-sm">${esc(best.name)}</span>
          </span>
        </div>
      </a>`);

  container.innerHTML = leagueTiles.join("");
}

/* ========================================================== 4. ANIMATION === */

/* All motion lives here. Everything is progressive enhancement: if GSAP fails
   to load, `.js-off` on <html> keeps the page fully visible and readable. */
function initAnimations() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (typeof gsap === "undefined" || reduced) {
    document.documentElement.classList.add("js-off");
    // Bars still need their width, just without the animation.
    document.querySelectorAll(".meter-fill").forEach((bar) => {
      bar.style.width = Number(bar.dataset.value) * 10 + "%";
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* 1. Hero: the elements marked .hero-in slide up on load, staggered. */
  gsap.to(".hero-in", {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: "power3.out",
    stagger: 0.08,
  });

  /* 2. Everything else marked .reveal fades and slides in on scroll.
        Ranking rows share a trigger with their neighbours so they arrive as a
        staggered wave rather than one at a time. */
  gsap.utils.toArray(".ranking-list").forEach((list) => {
    gsap.to(list.querySelectorAll(".reveal"), {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.07,
      scrollTrigger: { trigger: list, start: "top 85%", once: true },
    });
  });

  gsap.utils.toArray(".reveal").forEach((node) => {
    if (node.closest(".ranking-list")) return;   // already handled above
    if (node.classList.contains("hero-in")) return;
    gsap.to(node, {
      opacity: 1,
      y: 0,
      duration: 0.75,
      ease: "power3.out",
      scrollTrigger: { trigger: node, start: "top 90%", once: true },
    });
  });

  /* 3. Rating bars grow from 0 to their value. */
  gsap.utils.toArray(".meter-fill").forEach((bar, i) => {
    gsap.to(bar, {
      width: Number(bar.dataset.value) * 10 + "%",
      duration: 1.1,
      delay: 0.15 + i * 0.09,
      ease: "power3.out",
      scrollTrigger: { trigger: bar, start: "top 95%", once: true },
    });
  });
}

/* ============================================================= 5. ROUTER === */

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;

  if (page === "home") {
    renderOverviewTable(document.getElementById("overview-table"));
    renderLeagueTiles(document.getElementById("league-tiles"), true);
    /* Top five overall, as a teaser list on the home page. */
    renderRankingList(
      document.getElementById("ranking-list"),
      sortedByScore(RATED()).slice(0, 5)
    );
  }

  /* rankings.html — the master table on its own page. */
  if (page === "rankings") {
    renderMasterTable(document.getElementById("master-table"));
    renderLeagueTiles(document.getElementById("league-tiles"));

    const stats = document.getElementById("rankings-stats");
    if (stats) {
      const rated = RATED();
      const average = rated.reduce((sum, s) => sum + rawScore(s), 0) / rated.length;
      const best = sortedByScore(rated)[0];
      stats.textContent =
        `${rated.length} venues scored · average ${fmtScore(average)} · top rated ${best.name}`;
    }
  }

  if (page === "league") {
    const league = document.body.dataset.league;             // "NFL" | "MLB" | "NBA"
    renderRankingList(
      document.getElementById("ranking-list"),
      sortedByRank(ratedIn(league))
    );
    renderLeagueTable(document.getElementById("league-table"), league);
    renderUpcoming(document.getElementById("upcoming"), league);

    /* Fill in the small stat line under the league heading. */
    const stats = document.getElementById("league-stats");
    if (stats) {
      const s = leagueSummary(league);
      const booked = s.upcoming ? ` · ${s.upcoming} booked` : "";
      stats.textContent =
        `${s.count} venues visited${booked} · average score ${fmtScore(s.average)} · top rated ${s.best.name}`;
    }
  }

  if (page === "stadium") {
    renderStadiumPage();
  }

  /* Stamp the year in the footer so it never goes stale. */
  document.querySelectorAll("[data-year]").forEach((n) => {
    n.textContent = new Date().getFullYear();
  });

  initAnimations();
});
