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
  /* ------------------------------------------------------------------ NFL -- */
  {
    id: "lambeau-field",
    name: "Lambeau Field",
    team: "Green Bay Packers",
    league: "NFL",
    rank: 1,
    brand: { abbr: "GB", primary: "#203731", secondary: "#FFB612" },
    ratings: { atmosphere: 9.8, stadium: 8.6, uniqueness: 9.7, gameplay: 9.2 },
    review: {
      overview:
        "Lambeau is the closest thing American sport has to a cathedral. It sits in a residential neighbourhood, people park on front lawns, and the whole town moves toward the same building at the same time. The bowl itself is plain by modern standards — no ribbon boards wrapping every surface, no club level stacked over your head — and that plainness is exactly the point. You are there for football in the cold with 78,000 people who have held the same seats for three generations.",
      liked: [
        "The walk-up: neighbourhood streets, tailgates on driveways, no ocean of parking garages",
        "Bowl seating means almost every seat looks straight down at the field",
        "Traditions that are actually observed — the Lambeau Leap, the crowd noise on third down",
        "Cold weather is treated as a feature, not an apology",
      ],
      disliked: [
        "Bench seating with no backs; four hours is a long time on aluminium",
        "Concourses get genuinely tight at halftime",
        "Concessions are fine but nothing you'd travel for",
      ],
      verdict:
        "The best atmosphere in the NFL and the one stadium I'd tell someone to see first. It loses a little on comfort and amenities, and gains all of it back the moment the place gets loud.",
    },
    info: { capacity: "81,441", opened: 1957, city: "Green Bay, WI", surface: "Hybrid grass", roof: "Open air" },
  },
  {
    id: "arrowhead-stadium",
    name: "Arrowhead Stadium",
    team: "Kansas City Chiefs",
    league: "NFL",
    rank: 2,
    brand: { abbr: "KC", primary: "#E31837", secondary: "#FFB81C" },
    ratings: { atmosphere: 9.9, stadium: 8.4, uniqueness: 8.8, gameplay: 9.1 },
    review: {
      overview:
        "Arrowhead is the loudest building I have ever stood in, and it is not close. The bowl is steep and closed off at both ends, which traps sound instead of letting it escape, and the crowd has clearly rehearsed. The tailgate scene in the surrounding lots starts hours early and is a full event on its own — barbecue everywhere, and the smell carries into the concourse.",
      liked: [
        "Verified-loudest-stadium noise that you feel in your chest",
        "The tailgate lots are the best pre-game scene in the league",
        "Steep upper deck keeps you close to the action even at the top",
        "Kansas City barbecue inside the building is the real thing",
      ],
      disliked: [
        "The stadium is marooned in a parking lot — nothing to walk to",
        "Getting out afterwards takes about an hour",
        "The building's 1970s bones show once you're off the seating bowl",
      ],
      verdict:
        "Come for the noise, stay for the food. Arrowhead sits just behind Lambeau only because the setting is a parking lot rather than a town.",
    },
    info: { capacity: "76,416", opened: 1972, city: "Kansas City, MO", surface: "Natural grass", roof: "Open air" },
  },
  {
    id: "sofi-stadium",
    name: "SoFi Stadium",
    team: "Los Angeles Rams / Chargers",
    league: "NFL",
    rank: 3,
    brand: { abbr: "LA", primary: "#003594", secondary: "#FFA300" },
    ratings: { atmosphere: 8.2, stadium: 9.9, uniqueness: 9.3, gameplay: 8.4 },
    review: {
      overview:
        "SoFi is the most impressive building in American sport and it knows it. The translucent canopy floats over an open-air bowl, the field is sunk below ground level so you walk in at the top of the lower deck, and the double-sided Infinity Screen hangs over midfield like a piece of infrastructure that wandered in. It is a genuinely beautiful piece of architecture. It is also, on the wrong Sunday, half full of the visiting team's fans.",
      liked: [
        "The canopy and the Infinity Screen — nothing else looks like this",
        "Sunken bowl means short walks and easy sightlines from the entry level",
        "Wide concourses, real food, no queues that ruin a quarter",
        "Perfect weather and shade for every seat",
      ],
      disliked: [
        "Home-crowd energy depends entirely on the opponent",
        "Prices — tickets, parking and food are all top of the market",
        "The screen is so good you catch yourself watching it instead of the field",
      ],
      verdict:
        "The best building, not the best gameday. Worth the trip as architecture alone; pick the opponent carefully if you want an atmosphere to go with it.",
    },
    info: { capacity: "70,240", opened: 2020, city: "Inglewood, CA", surface: "Artificial turf", roof: "Fixed canopy, open sides" },
  },
  {
    id: "att-stadium",
    name: "AT&T Stadium",
    team: "Dallas Cowboys",
    league: "NFL",
    rank: 4,
    brand: { abbr: "DAL", primary: "#041E42", secondary: "#869397" },
    ratings: { atmosphere: 8.0, stadium: 9.4, uniqueness: 8.7, gameplay: 8.1 },
    review: {
      overview:
        "Everything here is scaled up until it stops feeling like a stadium and starts feeling like an airport terminal with a football field in it. The retractable roof and the glass end zone doors make the interior feel enormous and bright, and the contemporary art collection on the concourses is a real museum-grade collection, which is a stranger sentence than it should be. The centre-hung video board is still the reference point for every board built since.",
      liked: [
        "Scale — the interior volume is genuinely hard to process in photos",
        "The art collection makes wandering the concourses worthwhile",
        "Roof and end-zone glass keep it airy instead of cavernous",
        "Upper-deck sightlines are better than the height suggests",
      ],
      disliked: [
        "Corporate, quiet crowd until something big happens",
        "The upper deck is a serious climb from the field",
        "Arlington's parking-lot setting again means nowhere to walk to",
      ],
      verdict:
        "A spectacle rather than a football atmosphere. Go once for the building; go to Arrowhead for the noise.",
    },
    info: { capacity: "80,000", opened: 2009, city: "Arlington, TX", surface: "Artificial turf", roof: "Retractable" },
  },
  {
    id: "metlife-stadium",
    name: "MetLife Stadium",
    team: "New York Giants / Jets",
    league: "NFL",
    rank: 5,
    brand: { abbr: "NY", primary: "#0B2265", secondary: "#A71930" },
    ratings: { atmosphere: 7.0, stadium: 7.8, uniqueness: 6.2, gameplay: 7.4 },
    review: {
      overview:
        "MetLife is competent and completely anonymous. It was built to be shared by two teams, which means it commits to neither — the concourse signage swaps colours depending on who is home and the building has no identity of its own underneath. Sightlines are good, the concourses are wide, and there is nothing here you will remember a week later.",
      liked: [
        "Genuinely good sightlines from almost every seat",
        "Train access from Manhattan is easy and beats driving",
        "Wide, modern concourses that move a big crowd well",
      ],
      disliked: [
        "No identity — a grey bowl in a car park in New Jersey",
        "Atmosphere is inconsistent and often flat",
        "The surrounding complex has nothing to do before or after",
        "Exposed and cold in December without the charm that earns elsewhere",
      ],
      verdict:
        "Perfectly fine, entirely forgettable. If you live nearby it's an easy afternoon; it is not a stadium worth travelling for.",
    },
    info: { capacity: "82,500", opened: 2010, city: "East Rutherford, NJ", surface: "Artificial turf", roof: "Open air" },
  },

  /* ------------------------------------------------------------------ MLB -- */
  {
    id: "fenway-park",
    name: "Fenway Park",
    team: "Boston Red Sox",
    league: "MLB",
    rank: 1,
    brand: { abbr: "BOS", primary: "#BD3039", secondary: "#0C2340" },
    ratings: { atmosphere: 9.6, stadium: 8.2, uniqueness: 9.9, gameplay: 9.0 },
    review: {
      overview:
        "Fenway is a ballpark that was fitted into a city block in 1912 and has been argued with ever since. Nothing about it is regular: the Green Monster looms in left, right field bends into a corner nobody would design on purpose, and the seats are small because people were smaller. The neighbourhood does half the work — Lansdowne Street before first pitch is as much a part of the night as the game.",
      liked: [
        "The Green Monster, in person, is taller and closer than you expect",
        "Every quirk is a real accident of the site, not a manufactured one",
        "Yawkey Way and the surrounding streets make it a whole evening",
        "You are extremely close to the field almost everywhere",
      ],
      disliked: [
        "Obstructed-view support columns are still a real thing here",
        "Narrow seats, narrow rows, narrow concourses",
        "Prices are the highest in baseball",
      ],
      verdict:
        "The most characterful ballpark in the sport. Bring a small tolerance for discomfort and it is untouchable.",
    },
    info: { capacity: "37,755", opened: 1912, city: "Boston, MA", surface: "Natural grass", roof: "Open air" },
  },
  {
    id: "oracle-park",
    name: "Oracle Park",
    team: "San Francisco Giants",
    league: "MLB",
    rank: 2,
    brand: { abbr: "SF", primary: "#FD5A1E", secondary: "#27251F" },
    ratings: { atmosphere: 9.0, stadium: 9.3, uniqueness: 9.2, gameplay: 8.8 },
    review: {
      overview:
        "The best-sited ballpark in baseball. It sits on the edge of McCovey Cove with the bay behind right field, kayakers waiting for splash hits, and the Bay Bridge lit up over the top of the stands. Modern retro done properly: brick, steel, an asymmetric outfield with a genuinely absurd right field wall, and a promenade you can walk the full way around while watching the game through the arches.",
      liked: [
        "McCovey Cove and the bay views — the single best backdrop in the sport",
        "The waterfront arches let you watch for free while you walk",
        "Garlic fries and a food programme well above league average",
        "Walkable from downtown; no car needed",
      ],
      disliked: [
        "Wind off the bay makes night games genuinely cold in July",
        "The right-field configuration kills a lot of would-be home runs",
        "Sun in the eyes in a few upper sections for afternoon games",
      ],
      verdict:
        "Bring a jacket in summer and it is close to a perfect night out. Only Fenway's history keeps it out of first.",
    },
    info: { capacity: "41,265", opened: 2000, city: "San Francisco, CA", surface: "Natural grass", roof: "Open air" },
  },
  {
    id: "wrigley-field",
    name: "Wrigley Field",
    team: "Chicago Cubs",
    league: "MLB",
    rank: 3,
    brand: { abbr: "CHC", primary: "#0E3386", secondary: "#CC3433" },
    ratings: { atmosphere: 9.4, stadium: 8.0, uniqueness: 9.8, gameplay: 8.8 },
    review: {
      overview:
        "Wrigley is a ballpark inside a neighbourhood rather than next to one. Ivy on the outfield brick, a hand-turned scoreboard that somebody still climbs into, rooftop bleachers on the buildings across the street, and Wrigleyville going from bar to ballpark and back all afternoon. Recent renovations added the video boards and modern clubhouses without sanding off the character, which is harder than it sounds.",
      liked: [
        "The ivy and the manual scoreboard — still operated by hand",
        "Wrigleyville: you can arrive three hours early and never be bored",
        "Day baseball here is the best version of day baseball",
        "The El drops you two blocks away",
      ],
      disliked: [
        "Support posts still obstruct views in the older sections",
        "Tight seats and tighter concourses under the grandstand",
        "The video boards, while well done, cut into the classic sightlines",
      ],
      verdict:
        "A neighbourhood ballpark that a whole city organises its summer around. Book a day game and go.",
    },
    info: { capacity: "41,649", opened: 1914, city: "Chicago, IL", surface: "Natural grass", roof: "Open air" },
  },
  {
    id: "dodger-stadium",
    name: "Dodger Stadium",
    team: "Los Angeles Dodgers",
    league: "MLB",
    rank: 4,
    brand: { abbr: "LAD", primary: "#005A9C", secondary: "#EF3E42" },
    ratings: { atmosphere: 8.8, stadium: 8.5, uniqueness: 8.4, gameplay: 8.3 },
    review: {
      overview:
        "Dodger Stadium is a mid-century design object: clean lines, pastel seat decks, the wavy pavilion roofs in the outfield and the San Gabriel mountains sitting behind them at sunset. It is the third-oldest park in baseball and by far the cleanest-looking of the three. The crowd arrives late and leaves early, which is a real cliché and also true, but the middle innings on a warm evening are hard to beat.",
      liked: [
        "Sunset behind the outfield with the mountains — the view is the sell",
        "Original 1962 design still looks modern; the colour palette is perfect",
        "Wide, comfortable seating tiers and real leg room",
        "Dodger Dogs, obviously",
      ],
      disliked: [
        "The parking lot is enormous and getting out is a 45-minute ordeal",
        "Crowd empties in the seventh regardless of the score",
        "Essentially no public transport option and nothing walkable nearby",
      ],
      verdict:
        "Gorgeous ballpark, frustrating logistics. Arrive early, accept that you'll sit in traffic afterwards, and enjoy the view.",
    },
    info: { capacity: "56,000", opened: 1962, city: "Los Angeles, CA", surface: "Natural grass", roof: "Open air" },
  },
  {
    id: "yankee-stadium",
    name: "Yankee Stadium",
    team: "New York Yankees",
    league: "MLB",
    rank: 5,
    brand: { abbr: "NYY", primary: "#132448", secondary: "#C4CED4" },
    ratings: { atmosphere: 8.6, stadium: 8.9, uniqueness: 7.4, gameplay: 8.1 },
    review: {
      overview:
        "The 2009 building is a polished, expensive recreation of the old one — the frieze is back, Monument Park is out behind centre field, and the amenities are as good as anything in baseball. What it does not have is the ghost of the original. It reads as a very well-executed new ballpark wearing a heritage costume, and the enormous premium sections behind the plate put a moat between the expensive seats and everyone else.",
      liked: [
        "Monument Park and the museum are worth arriving early for",
        "Great Hall and the concourses are genuinely impressive",
        "Bleacher Creatures and the roll call — a real tradition, still going",
        "Subway drops you at the gate",
      ],
      disliked: [
        "The premium moat behind home plate is visibly empty on TV and in person",
        "Feels like a reproduction rather than the real thing",
        "Priciest concessions in the sport by some distance",
      ],
      verdict:
        "A very good modern ballpark carrying an impossible weight of expectation. Go for the history that's on display; don't expect the old building's atmosphere.",
    },
    info: { capacity: "46,537", opened: 2009, city: "Bronx, NY", surface: "Natural grass", roof: "Open air" },
  },

  /* ------------------------------------------------------------------ NBA -- */
  {
    id: "madison-square-garden",
    name: "Madison Square Garden",
    team: "New York Knicks",
    league: "NBA",
    rank: 1,
    brand: { abbr: "NYK", primary: "#006BB6", secondary: "#F58426" },
    ratings: { atmosphere: 9.5, stadium: 8.3, uniqueness: 9.6, gameplay: 8.9 },
    review: {
      overview:
        "The Garden is stacked vertically on top of Penn Station in the middle of Manhattan, which means the whole building leans in over the floor. The upper bowl is steep enough to be slightly alarming and it is the best upper deck in basketball for exactly that reason. When the Knicks are good the noise arrives all at once and the place is unmatched; when they are not, it is still the most famous room in the sport.",
      liked: [
        "The steepest, best upper bowl in the league — no bad angle",
        "Chase Bridges hanging over the court are a genuinely novel seat",
        "You walk out of the doors straight into midtown Manhattan",
        "History is everywhere without being oppressive about it",
      ],
      disliked: [
        "Concourses are tight and the building's age shows off the bowl",
        "Ticket prices are the highest in the NBA",
        "Getting in through Penn Station on a weekday is a scrum",
      ],
      verdict:
        "The most important room in basketball. Worth every bit of the price for one night, and the atmosphere on a good night is the best in the league.",
    },
    info: { capacity: "19,812", opened: 1968, city: "New York, NY", surface: "Hardwood", roof: "Indoor" },
  },
  {
    id: "td-garden",
    name: "TD Garden",
    team: "Boston Celtics",
    league: "NBA",
    rank: 2,
    brand: { abbr: "BOS", primary: "#007A33", secondary: "#BA9653" },
    ratings: { atmosphere: 9.3, stadium: 8.4, uniqueness: 9.0, gameplay: 8.7 },
    review: {
      overview:
        "TD Garden is an ordinary-looking 1990s arena carrying an extraordinary amount of history in its rafters. The banners are the first thing you see and they set the tone for everything else. The parquet floor is still parquet, the crowd is knowledgeable and unforgiving in equal measure, and North Station puts you inside the building without ever going outdoors.",
      liked: [
        "Championship banners and retired numbers — the ceiling is the exhibit",
        "The parquet floor, which still looks like nothing else in the league",
        "A demanding, informed crowd that reacts to the right things",
        "Sits directly on top of a transit hub in the middle of the city",
      ],
      disliked: [
        "The building itself is a fairly generic 90s arena bowl",
        "Upper-deck seats are further from the floor than at MSG",
        "Concourses back up badly at the end of a quarter",
      ],
      verdict:
        "The banners and the crowd carry it. Second-best atmosphere in the league inside a merely good building.",
    },
    info: { capacity: "19,156", opened: 1995, city: "Boston, MA", surface: "Hardwood", roof: "Indoor" },
  },
  {
    id: "chase-center",
    name: "Chase Center",
    team: "Golden State Warriors",
    league: "NBA",
    rank: 3,
    brand: { abbr: "GSW", primary: "#1D428A", secondary: "#FFC72C" },
    ratings: { atmosphere: 8.4, stadium: 9.7, uniqueness: 8.6, gameplay: 8.5 },
    review: {
      overview:
        "Chase Center is the best-designed arena in the NBA and it is not particularly close. It is privately built, sits on the Mission Bay waterfront, and the plaza outside is a real public space rather than a token forecourt. Inside, the concourses are wide and daylit, the food is a curated San Francisco lineup instead of standard arena fare, and every technical system in the building is current.",
      liked: [
        "Best concourses and best food of any arena in the league",
        "Thrive City plaza outside makes arriving early actually appealing",
        "Waterfront setting, walkable from the Embarcadero",
        "Immaculate sightlines and the sharpest video board in the NBA",
      ],
      disliked: [
        "Tech-money crowd is late, seated, and quiet until the fourth quarter",
        "Almost no history in a building that opened in 2019",
        "Expensive in every direction, including the plaza restaurants",
      ],
      verdict:
        "The best building, the softest crowd. If arenas were graded on architecture alone this is number one.",
    },
    info: { capacity: "18,064", opened: 2019, city: "San Francisco, CA", surface: "Hardwood", roof: "Indoor" },
  },
  {
    id: "united-center",
    name: "United Center",
    team: "Chicago Bulls",
    league: "NBA",
    rank: 4,
    brand: { abbr: "CHI", primary: "#CE1141", secondary: "#000000" },
    ratings: { atmosphere: 8.7, stadium: 8.2, uniqueness: 8.5, gameplay: 8.4 },
    review: {
      overview:
        "The United Center is enormous by NBA standards — over 20,000 seats — and that scale gives it a roar that smaller arenas can't produce. The Jordan statue outside is a pilgrimage site and the pre-game introductions still use the same music and the same darkened-arena spotlight routine, which remains the best intro sequence in the league. The upper deck is famously, comically high.",
      liked: [
        "Loudest big-arena crowd in the NBA when the building is full",
        "The pre-game introduction sequence is worth showing up early for",
        "Jordan statue and the 90s banners give it real weight",
        "Six championship banners and the room knows it",
      ],
      disliked: [
        "The 300 level is a genuine hike and feels a long way from the floor",
        "Surrounding West Side blocks are mostly parking, not places to go",
        "Interior finishes feel dated next to the newest arenas",
      ],
      verdict:
        "Big, loud and full of history. Just don't buy the cheapest upper-deck seat and expect to see faces.",
    },
    info: { capacity: "20,917", opened: 1994, city: "Chicago, IL", surface: "Hardwood", roof: "Indoor" },
  },
  {
    id: "crypto-com-arena",
    name: "Crypto.com Arena",
    team: "Los Angeles Lakers",
    league: "NBA",
    rank: 5,
    brand: { abbr: "LAL", primary: "#552583", secondary: "#FDB927" },
    ratings: { atmosphere: 8.5, stadium: 8.0, uniqueness: 8.3, gameplay: 8.2 },
    review: {
      overview:
        "Downtown LA's arena hosts more teams than anywhere else in the country and it shows — the building is a hard-working, slightly worn venue that changes identity every night. The banners and retired numbers are extraordinary, LA Live outside gives you somewhere to be before tip-off, and courtside is the most-photographed row of seats in sport. Everything above the lower bowl is far more ordinary.",
      liked: [
        "The banner collection is one of the great displays in basketball",
        "LA Live means bars, food and life immediately outside the doors",
        "Downtown location with actual transit options",
        "Star-watching is a genuine part of the experience",
      ],
      disliked: [
        "Crowd arrives at the end of the first quarter and leaves before the end",
        "Shared by four teams; the building has no fixed personality",
        "1999 interiors are showing their age against newer arenas",
      ],
      verdict:
        "Great history, great neighbourhood, average building and a late crowd. Fine to visit, not one to plan a trip around.",
    },
    info: { capacity: "19,068", opened: 1999, city: "Los Angeles, CA", surface: "Hardwood", roof: "Indoor" },
  },
];

/* Make the data available to main.js. Because these pages are opened as plain
   files (no build step, no modules), we hang everything off `window`. */
window.STADIUMS = STADIUMS;
window.RATING_CATEGORIES = RATING_CATEGORIES;
