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
     The review text is placeholder: edit it, the numbers are already right. */
  {
    id: "att-stadium",
    name: "AT&T Stadium",
    team: "Dallas Cowboys",
    league: "NFL",
    rank: 1,
    brand: { abbr: "DAL", primary: "#041E42", secondary: "#869397" },
    ratings: { atmosphere: 8.5, stadium: 8.85, uniqueness: 8.75, gameplay: 8.85 },
    review: {
      overview:
        "Everything here is scaled up until it stops feeling like a stadium and starts feeling like an airport terminal with a football field in it. The retractable roof and the glass end zone doors make the interior feel enormous and bright, and the centre-hung video board is still the reference point for every board built since. It grades out top of the league on the building, the sightlines and the game itself — the crowd is the only category that doesn't lead.",
      liked: [
        "Scale — the interior volume is genuinely hard to process in photos",
        "The video board and the sightlines it gives you from anywhere in the bowl",
        "Roof and end-zone glass keep it airy instead of cavernous",
        "The contemporary art collection on the concourses is museum-grade",
      ],
      disliked: [
        "Corporate crowd stays quiet until something big happens",
        "The upper deck is a serious climb from the field",
        "Arlington's parking-lot setting — nowhere to walk to before or after",
      ],
      verdict:
        "The most complete stadium on the list. It wins on the building, not on the noise, and that's still enough for number one.",
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
      overview:
        "Levi's is the best crowd on this list so far and a genuinely well-built modern stadium underneath it. The asymmetric design — a tall suite tower on one side, an open low deck on the other — gives it a look nothing else has, and the 49ers Museum is the rare stadium attraction worth arriving early for. The famous problem is the sun: the east side bakes for an afternoon kickoff.",
      liked: [
        "Loudest crowd I've scored in the NFL so far",
        "Asymmetric bowl gives it a real silhouette instead of a generic ring",
        "Excellent Bay Area food and the best stadium wifi anywhere",
        "The 49ers Museum genuinely rewards showing up early",
      ],
      disliked: [
        "The sunny side is brutal for a 1pm kickoff",
        "Santa Clara is a long way from San Francisco itself",
        "Surrounding area is office parks — no atmosphere outside the gates",
      ],
      verdict:
        "Great crowd, smart building, terrible sun. Buy on the shaded side and it's one of the best days out in the league.",
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
      overview:
        "SoFi is the most impressive building in American sport and it knows it. The translucent canopy floats over an open-air bowl, the field is sunk below ground level so you walk in at the top of the lower deck, and the double-sided Infinity Screen hangs over midfield like a piece of infrastructure that wandered in. It scores top of the league on the building and near the bottom on the crowd, which is the whole story of the place.",
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
    id: "gillette-stadium",
    name: "Gillette Stadium",
    team: "New England Patriots",
    league: "NFL",
    rank: 4,
    brand: { abbr: "NE", primary: "#002244", secondary: "#C60C30" },
    ratings: { atmosphere: 8.45, stadium: 8.4, uniqueness: 8.5, gameplay: 8.45 },
    review: {
      overview:
        "The most evenly scored stadium on the list — every category lands within a tenth of the others, which tells you most of what Gillette is. The lighthouse and bridge at the north end give it a genuine signature, the 2023 renovation added the biggest video board in the league, and Patriot Place outside means there's somewhere to be for three hours before kickoff. Nothing here is spectacular and nothing is a problem.",
      liked: [
        "The lighthouse end zone — a real identity, not a manufactured one",
        "Patriot Place gives you a full afternoon outside the gates",
        "The renovated north end and its video board are a genuine upgrade",
        "Cold-weather football the way it's supposed to look",
      ],
      disliked: [
        "Foxborough is a long way from Boston and traffic in and out is grim",
        "Crowd expects to win and can go quiet when it isn't happening",
        "Turf rather than grass, in a stadium that would suit grass",
      ],
      verdict:
        "The most balanced stadium I've been to — good at everything, best at nothing. Sort out the traffic and it climbs.",
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
      overview:
        "The engineering is the attraction. The entire natural grass field sits on a tray that rolls out of the building into the Arizona sun between games, which is still the most ridiculous thing any stadium does, and the retractable roof means you get real grass indoors in a desert. The exterior's shifting metal panels look like nothing else in the league. The crowd is the quietest part of it.",
      liked: [
        "The roll-out grass tray — genuinely unique engineering",
        "Retractable roof makes a September game in Phoenix bearable",
        "Exterior panels shift colour through the day; it's a real building",
        "Grass field indoors, which almost nowhere else manages",
      ],
      disliked: [
        "Crowd is heavily neutral and often out-shouted by visitors",
        "Glendale is well outside Phoenix with the drive to match",
        "Interior bowl is more ordinary than the outside promises",
      ],
      verdict:
        "Go for the building and the roof. The gameday around it hasn't caught up to the engineering.",
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
      overview:
        "A solid, unglamorous football stadium with a loud crowd and a real city around it. It sits next to Camden Yards in downtown Baltimore, so you can walk from a bar to your seat, and the purple-heavy crowd commits from the first snap. Gameplay is the weak spot — the upper deck sits back further than it should and a lot of seats feel a long way from the field.",
      liked: [
        "Downtown location, walkable, right next to Camden Yards",
        "Crowd is loud and stays loud",
        "End-zone video boards are among the biggest in the league",
        "Real tailgate culture in the surrounding lots",
      ],
      disliked: [
        "Upper deck feels distant — the weakest sightlines of the ones I've scored",
        "Concourses back up badly at halftime",
        "The bowl itself is fairly plain from the inside",
      ],
      verdict:
        "Great city, great noise, average seats. Buy in the lower bowl and the score goes up a category.",
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
      overview:
        "Same building as the Giants entry, different day out — and it scores better on every category. A Jets crowd shows up expecting to be disappointed and is loud about it anyway, which is more entertaining than it sounds. The stadium underneath is still a shared, anonymous grey bowl that commits to neither tenant, but the sightlines are honestly good.",
      liked: [
        "Jets crowd is louder and funnier than the record deserves",
        "Genuinely good sightlines from almost every seat",
        "Train from Manhattan beats driving by a mile",
        "Wide, modern concourses that move a big crowd well",
      ],
      disliked: [
        "The building has no identity of its own under the swapped-out signage",
        "Nothing to do in the surrounding complex before or after",
        "Exposed and cold in December without the charm that earns elsewhere",
      ],
      verdict:
        "The better of the two MetLife gamedays. The crowd carries a building that gives it nothing.",
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
      overview:
        "The lowest-scoring gameday I've had. Same grey bowl in the same New Jersey car park, but with a Giants crowd that arrives late, sits down and stays there. Nothing is wrong with the stadium exactly — the concourses are wide, the seats are fine, the sightlines work — there is just nothing here at all, and a flat crowd removes the last reason to care.",
      liked: [
        "Sightlines are fine, which is the most positive thing available",
        "Easy train access from Manhattan",
        "Concourses handle 80,000 people without a crush",
      ],
      disliked: [
        "No identity — a grey bowl in a car park shared by two teams",
        "The quietest crowd I've scored",
        "Nothing walkable before or after; the complex is dead",
        "Cold and exposed without any of the charm that earns elsewhere",
      ],
      verdict:
        "Bottom of the list and it earned it. If you live nearby it's an easy afternoon; it is not a stadium worth travelling for.",
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
