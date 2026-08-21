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
   photo     OPTIONAL my own photo of the venue, shown above the overall score:
             { src: "assets/photos/<id>.jpg", caption: "..." }
             Leave it off, or leave the file out, and nothing is shown.
   game      the game I actually attended:
             { date, status, away: { team, score }, home: { team, score } }
             Shown under the team and city everywhere the stadium is listed.
             Leave it off and the line simply doesn't appear.
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
    game: { date: "Nov 25, 2021", status: "Final/OT",
             away: { team: "Raiders", score: 36 },
             home: { team: "Cowboys", score: 33 } },
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
      liked: [
        "The crowd stayed in it even with the 49ers trailing, and they helped spark the comeback",
        "Easy to get into, with the bridge running straight from the parking lot to the gates",
        "Fans were friendly and funny all game without ever crossing the line",
        "A big stadium with plenty of seating",
      ],
      disliked: [
        "The concourses are tight, so getting anywhere at a busy moment is a struggle",
        "Not much to do outside the stadium",
      ],
      verdict:
        "Worth a visit whether or not you're a 49ers fan. Just don't turn up hours early, because there isn't much to do outside Levi's until the gates open.",
    },
    info: { capacity: "68,500", opened: 2014, city: "Santa Clara, CA", surface: "Natural grass", roof: "Open air" },
    game: { date: "Nov 9, 2025", status: "Final",
             away: { team: "Rams", score: 42 },
             home: { team: "49ers", score: 26 } },
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
    game: { date: "Nov 13, 2022", status: "Final",
             away: { team: "Cardinals", score: 27 },
             home: { team: "Rams", score: 17 } },
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
    game: { date: "Oct 27, 2024", status: "Final",
             away: { team: "Jets", score: 22 },
             home: { team: "Patriots", score: 25 } },
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
    game: { date: "Nov 10, 2024", status: "Final",
             away: { team: "Jets", score: 6 },
             home: { team: "Cardinals", score: 31 } },
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
    game: { date: "Oct 5, 2025", status: "Final",
             away: { team: "Texans", score: 44 },
             home: { team: "Ravens", score: 10 } },
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
      liked: [
        "A big stadium that holds a lot of fans",
        "The tailgating scene is very good",
        "The food tastes very good",
        "A good amount of legroom",
      ],
      disliked: [
        "The crowd turned on the team at times, which is understandable but wears on you",
        "No single standout feature that makes the stadium its own",
        "The crowd gave up in the third quarter and a lot of people left early",
      ],
      verdict:
        "If you're on the fence about a Jets game at MetLife, I'd lean toward skipping it, especially in the cold — which is most of their schedule. There's no wow factor here the way there is at SoFi or AT&T, and the fans aren't the best either.",
    },
    info: { capacity: "82,500", opened: 2010, city: "East Rutherford, NJ", surface: "Artificial turf", roof: "Open air" },
    game: { date: "Nov 24, 2023", status: "Final",
             away: { team: "Dolphins", score: 34 },
             home: { team: "Jets", score: 13 } },
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
    game: { date: "Oct 17, 2021", status: "Final",
             away: { team: "Rams", score: 38 },
             home: { team: "Giants", score: 11 } },
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
      liked: [
        "Plenty to do outside the ballpark, with bars and restaurants within walking distance",
        "A good one to go to with friends rather than on your own",
        "Just as much going on inside, including a lot of team shops",
        "The food is genuinely good. Get the ice cream cup",
        "Fans at a Sunday game in June were calm and friendly, though I can't say whether that holds in October",
        "A unique ballpark with a lot of attractions and good spots to take photos",
      ],
      disliked: [
        "The crowd drifted out of the game at times, which is what keeps the atmosphere score where it is. October would be a different story",
        "The surroundings could be better. Two other venues sit right next to the ballpark, so it gets chaotic when more than one of them has an event on",
      ],
      verdict:
        "I'd recommend a Phillies game here without hesitation, especially with friends on a summer day. Eat at the restaurants outside or grab something in the ballpark, and take your time with the attractions — there are more of them here than at most places.",
    },
    info: { capacity: "42,901", opened: 2004, city: "Philadelphia, PA", surface: "Natural grass", roof: "Open air" },
    photo: {
      src: "assets/photos/citizens-bank-park.jpg",
      caption: "(photo I took pre game at White Sox vs Phillies)",
    },
    game: { date: "Jun 7, 2026", status: "Final",
             away: { team: "White Sox", score: 5 },
             home: { team: "Phillies", score: 9 } },
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
      liked: [
        "The crowd for a late March game was loud and locked into every pitch",
        "Plenty of team shops around the ballpark if you want Yankees merch",
        "A lot here you won't find anywhere else, the hall of fame museum included",
        "Good food options all the way around the stadium",
      ],
      disliked: [
        "The surrounding area in the Bronx has its question marks",
        "Not many good parking options",
        "Getting out after the game is a hassle",
        "The design isn't the best in baseball, though it is a classic",
      ],
      verdict: "",
    },
    info: { capacity: "46,537", opened: 2009, city: "Bronx, NY", surface: "Natural grass", roof: "Open air" },
    game: { date: "Mar 30, 2025", status: "Final",
             away: { team: "Brewers", score: 3 },
             home: { team: "Yankees", score: 12 } },
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
    game: { date: "May 25, 2025", status: "Final",
             away: { team: "Dodgers", score: 1 },
             home: { team: "Mets", score: 3 } },
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
    game: { date: "Jan 15, 2024", status: "Final",
             away: { team: "Magic", score: 98 },
             home: { team: "Knicks", score: 94 } },
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
    game: { date: "Jan 9, 2026", status: "Final",
             away: { team: "Clippers", score: 121 },
             home: { team: "Nets", score: 105 } },
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
    game: { date: "Nov 10, 2024", status: "Final/OT",
             away: { team: "Kings", score: 127 },
             home: { team: "Suns", score: 118 } },
  },
];


/* Make the data available to main.js. Because these pages are opened as plain
   files (no build step, no modules), we hang everything off `window`. */
window.STADIUMS = STADIUMS;
window.RATING_CATEGORIES = RATING_CATEGORIES;
