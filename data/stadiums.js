/* =============================================================================
   STADIUM SCOPE — DATA
   -----------------------------------------------------------------------------
   This is the ONLY file you need to edit to add, remove, or change a stadium.
   Everything on the site (rankings, tables, detail pages, averages) is built
   from the array below at page load. Nothing is hardcoded in the HTML.

   HOW TO ADD A NEW STADIUM
   1. Copy any object below and paste it at the end of the STADIUMS array.
   2. Give it a unique `id` (lowercase, dashes — this becomes the URL:
      stadium.html?id=your-new-id).
   3. Fill in `ratings` (0–10, decimals allowed). The overall score is
      calculated for you — never type it by hand.
   4. Set `rank` to its position *within its own league* (1 = best) and bump the
      ranks of the stadiums it leapfrogs.
   5. Save and refresh. That's it.

   FIELD REFERENCE
   id        slug used in the URL                     e.g. "lambeau-field"
   name      stadium name
   team      team (or teams) that play there
   league    "NFL" | "MLB" | "NBA"
   rank      manual rank inside its league, 1 = best
   ratings   atmosphere / stadium / uniqueness / gameplay, each 0–10
   review    { overview, liked[], disliked[], verdict }
   info      { capacity, opened, city, surface, roof }
   brand     { abbr, primary, secondary } — used to draw the team logo badge
   logo      OPTIONAL path to a real logo image, e.g. "assets/logos/gb.svg".
             If present it is used instead of the generated badge.
   status    OPTIONAL "upcoming" for a venue that's booked but not yet visited.
             Such an entry has rank: null, ratings: null and review: null, and
             is listed under "Up next" instead of in the ranking.
   visit     OPTIONAL date line shown for an upcoming venue, e.g.
             "Oct 4, 2026 · vs Rams".

   ONE STADIUM PER GAMEDAY, NOT PER BUILDING
   A shared stadium is scored once per team — MetLife appears twice, as
   metlife-stadium-jets and metlife-stadium-giants, with different ratings.
   ========================================================================== */

/* The four categories that make up the overall score.
   Add a category here and the meters, tables and math all follow along. */
const RATING_CATEGORIES = [
  { key: "atmosphere", label: "Atmosphere", blurb: "Crowd, noise, traditions" },
  { key: "stadium",    label: "Stadium",    blurb: "The building itself" },
  { key: "uniqueness", label: "Uniqueness", blurb: "Could only be here" },
  { key: "gameplay",   label: "Gameplay",   blurb: "Sightlines and the game" },
];

const STADIUMS = [
  /* ------------------------------------------------------------------ NFL --
     Ratings below are the real ones from the "going to all NFL stadiums"
     project. Note MetLife appears twice — once for the Jets, once for the
     Giants — because they're scored as separate gamedays.
     Review text is left blank on purpose — write your own in the empty
     strings/arrays below. The ratings are already the real ones. */
  {
    id: "att-stadium",
    name: "AT&T Stadium",
    team: "Dallas Cowboys",
    league: "NFL",
    rank: 1,
    brand: { abbr: "DAL", primary: "#041E42", secondary: "#869397" },
    ratings: { atmosphere: 8.5, stadium: 8.85, uniqueness: 8.75, gameplay: 8.85 },
    review: {
      overview: "",
      liked: [],
      disliked: [],
      verdict: "",
    },
    info: { capacity: "80,000", opened: 2009, city: "Arlington, TX", surface: "Artificial turf", roof: "Retractable" },
  },
  {
    id: "levis-stadium",
    name: "Levi's Stadium",
    team: "San Francisco 49ers",
    league: "NFL",
    rank: 2,
    brand: { abbr: "SF", primary: "#AA0000", secondary: "#B3995D" },
    ratings: { atmosphere: 8.8, stadium: 8.6, uniqueness: 8.4, gameplay: 8.7 },
    review: {
      overview: "",
      liked: [],
      disliked: [],
      verdict: "",
    },
    info: { capacity: "68,500", opened: 2014, city: "Santa Clara, CA", surface: "Natural grass", roof: "Open air" },
  },
  {
    id: "sofi-stadium",
    name: "SoFi Stadium",
    team: "Los Angeles Rams",
    league: "NFL",
    rank: 3,
    brand: { abbr: "LAR", primary: "#003594", secondary: "#FFA300" },
    ratings: { atmosphere: 8, stadium: 8.9, uniqueness: 8.85, gameplay: 8.25 },
    review: {
      overview: "",
      liked: [],
      disliked: [],
      verdict: "",
    },
    info: { capacity: "70,240", opened: 2020, city: "Inglewood, CA", surface: "Artificial turf", roof: "Fixed canopy, open sides" },
  },
  {
    id: "gillette-stadium",
    name: "Gillette Stadium",
    team: "New England Patriots",
    league: "NFL",
    rank: 4,
    brand: { abbr: "NE", primary: "#002244", secondary: "#C60C30" },
    ratings: { atmosphere: 8.45, stadium: 8.4, uniqueness: 8.5, gameplay: 8.45 },
    review: {
      overview: "",
      liked: [],
      disliked: [],
      verdict: "",
    },
    info: { capacity: "64,628", opened: 2002, city: "Foxborough, MA", surface: "Artificial turf", roof: "Open air" },
  },
  {
    id: "state-farm-stadium",
    name: "State Farm Stadium",
    team: "Arizona Cardinals",
    league: "NFL",
    rank: 5,
    brand: { abbr: "ARI", primary: "#97233F", secondary: "#FFB612" },
    ratings: { atmosphere: 8.3, stadium: 8.7, uniqueness: 8.4, gameplay: 8.35 },
    review: {
      overview: "",
      liked: [],
      disliked: [],
      verdict: "",
    },
    info: { capacity: "63,400", opened: 2006, city: "Glendale, AZ", surface: "Natural grass (roll-out)", roof: "Retractable" },
  },
  {
    id: "mt-bank-stadium",
    name: "M&T Bank Stadium",
    team: "Baltimore Ravens",
    league: "NFL",
    rank: 6,
    brand: { abbr: "BAL", primary: "#241773", secondary: "#9E7C0C" },
    ratings: { atmosphere: 8.3, stadium: 8.3, uniqueness: 8.25, gameplay: 7.75 },
    review: {
      overview: "",
      liked: [],
      disliked: [],
      verdict: "",
    },
    info: { capacity: "71,008", opened: 1998, city: "Baltimore, MD", surface: "Natural grass", roof: "Open air" },
  },
  {
    id: "metlife-stadium-jets",
    name: "MetLife Stadium",
    team: "New York Jets",
    league: "NFL",
    rank: 7,
    brand: { abbr: "NYJ", primary: "#125740", secondary: "#FFFFFF" },
    ratings: { atmosphere: 8.2, stadium: 7.8, uniqueness: 7.9, gameplay: 8.15 },
    review: {
      overview: "",
      liked: [],
      disliked: [],
      verdict: "",
    },
    info: { capacity: "82,500", opened: 2010, city: "East Rutherford, NJ", surface: "Artificial turf", roof: "Open air" },
  },
  {
    id: "metlife-stadium-giants",
    name: "MetLife Stadium",
    team: "New York Giants",
    league: "NFL",
    rank: 8,
    brand: { abbr: "NYG", primary: "#0B2265", secondary: "#A71930" },
    ratings: { atmosphere: 7.6, stadium: 7.7, uniqueness: 7.5, gameplay: 7.75 },
    review: {
      overview: "",
      liked: [],
      disliked: [],
      verdict: "",
    },
    info: { capacity: "82,500", opened: 2010, city: "East Rutherford, NJ", surface: "Artificial turf", roof: "Open air" },
  },

  /* --- Booked, not yet visited. No ratings until I've actually been. -------
     To score one of these: delete `status` and `visit`, then fill in
     `ratings`, `review` and `rank` exactly like the entries above. It moves
     into the ranking automatically. */
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
    info: { capacity: "76,125", opened: 2001, city: "Denver, CO", surface: "Natural grass", roof: "Open air" },
  },
  {
    id: "lincoln-financial-field",
    name: "Lincoln Financial Field",
    team: "Philadelphia Eagles",
    league: "NFL",
    rank: null,
    status: "upcoming",
    visit: "Oct 4, 2026 · vs Rams",
    brand: { abbr: "PHI", primary: "#004C54", secondary: "#A5ACAF" },
    ratings: null,
    review: null,
    info: { capacity: "69,596", opened: 2003, city: "Philadelphia, PA", surface: "Hybrid grass", roof: "Open air" },
  },
  /* ------------------------------------------------------------------ MLB --
     Real ratings from the "going to all MLB stadiums" project. Same rules as
     the other two: one entry per team, reviews stay blank until written. */
  {
    id: "citizens-bank-park",
    name: "Citizens Bank Park",
    team: "Philadelphia Phillies",
    league: "MLB",
    rank: 1,
    brand: { abbr: "PHI", primary: "#E81828", secondary: "#002D72" },
    ratings: { atmosphere: 8.2, stadium: 8.8, uniqueness: 8.5, gameplay: 8.2 },
    review: {
      overview: "",
      liked: [],
      disliked: [],
      verdict: "",
    },
    info: { capacity: "42,901", opened: 2004, city: "Philadelphia, PA", surface: "Natural grass", roof: "Open air" },
  },
  {
    id: "yankee-stadium",
    name: "Yankee Stadium",
    team: "New York Yankees",
    league: "MLB",
    rank: 2,
    brand: { abbr: "NYY", primary: "#132448", secondary: "#C4CED4" },
    ratings: { atmosphere: 8.7, stadium: 7.8, uniqueness: 8.5, gameplay: 8.4 },
    review: {
      overview: "",
      liked: [],
      disliked: [],
      verdict: "",
    },
    info: { capacity: "46,537", opened: 2009, city: "Bronx, NY", surface: "Natural grass", roof: "Open air" },
  },
  {
    id: "citi-field",
    name: "Citi Field",
    team: "New York Mets",
    league: "MLB",
    rank: 3,
    brand: { abbr: "NYM", primary: "#002D72", secondary: "#FF5910" },
    ratings: { atmosphere: 8.3, stadium: 8.4, uniqueness: 8.1, gameplay: 7.9 },
    review: {
      overview: "",
      liked: [],
      disliked: [],
      verdict: "",
    },
    info: { capacity: "41,922", opened: 2009, city: "Queens, NY", surface: "Natural grass", roof: "Open air" },
  },

  /* ------------------------------------------------------------------ NBA --
     Real ratings from the "going to all NBA stadiums" project. Same rule as
     the NFL list: one entry per team, and reviews stay blank until written. */
  {
    id: "madison-square-garden",
    name: "Madison Square Garden",
    team: "New York Knicks",
    league: "NBA",
    rank: 1,
    brand: { abbr: "NYK", primary: "#006BB6", secondary: "#F58426" },
    ratings: { atmosphere: 8.6, stadium: 8.7, uniqueness: 8.75, gameplay: 8.15 },
    review: {
      overview: "",
      liked: [],
      disliked: [],
      verdict: "",
    },
    info: { capacity: "19,812", opened: 1968, city: "New York, NY", surface: "Hardwood", roof: "Indoor" },
  },
  {
    id: "barclays-center",
    name: "Barclays Center",
    team: "Brooklyn Nets",
    league: "NBA",
    rank: 2,
    brand: { abbr: "BKN", primary: "#000000", secondary: "#FFFFFF" },
    ratings: { atmosphere: 7.6, stadium: 8.8, uniqueness: 8.5, gameplay: 7.8 },
    review: {
      overview: "",
      liked: [],
      disliked: [],
      verdict: "",
    },
    info: { capacity: "17,732", opened: 2012, city: "Brooklyn, NY", surface: "Hardwood", roof: "Indoor" },
  },
  {
    id: "footprint-center",
    name: "Footprint Center",
    team: "Phoenix Suns",
    league: "NBA",
    rank: 3,
    brand: { abbr: "PHX", primary: "#1D1160", secondary: "#E56020" },
    ratings: { atmosphere: 7.7, stadium: 8.4, uniqueness: 8.1, gameplay: 8.25 },
    review: {
      overview: "",
      liked: [],
      disliked: [],
      verdict: "",
    },
    info: { capacity: "17,071", opened: 1992, city: "Phoenix, AZ", surface: "Hardwood", roof: "Indoor" },
  },
];


/* Make the data available to main.js. Because these pages are opened as plain
   files (no build step, no modules), we hang everything off `window`. */
window.STADIUMS = STADIUMS;
window.RATING_CATEGORIES = RATING_CATEGORIES;
