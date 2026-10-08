// Jysk Golfrejse 21.-23. oktober 2026
// Alle sol-tider er beregnet (NOAA) for den konkrete bane og angivet i dansk sommertid (UTC+2).
// Sommertiden ophører først søndag d. 25. oktober 2026, så hele turen køres på sommertid.

const TRIP = {
  title: "Jysk Golfrejse",
  subtitle: "108 huller på 3 dage",
  start: "2026-10-21T04:15:00+02:00",
  home: { name: "Solrød Strand", q: "Solrød Strand, Danmark" },
  bridgeEachWay: 220,
  buggyPrice: 300, // BroBizz, personbil
  freeGolf: true,     // Spillerne har fri greenfee — priser vises kun til orientering
  freeDriving: true,  // Kørslen er gratis — kun broafgift indgår i budgettet
};

const COURSES = {
  lyngbygaard: {
    name: "Lyngbygaard Golf",
    course: "18-hulsbanen (mesterskabsbanen)",
    addr: "Lyngbygårdsvej 29, 8220 Brabrand",
    web: "https://lyg.dk/gaester/",
    greenfee: 475,
    feeNote: "Hverdagspris 475 kr. (weekend 650 kr.)",
    blurb:
      "Moderne parkbane i det bølgede østjyske landskab få minutter fra Aarhus. Fri parkering ved klubhuset, check-in i receptionen. Brasseriet kan levere en to-go frokost til transporten.",
    tip: "Receptionens telefon er kun åben 10–14 på hverdage, så book teetiden i GolfBox i god tid.",
  },
  silkeborg: {
    name: "Silkeborg Golfklub",
    course: "18 huller af anlæggets 27 (SYD, VEST, ØST)",
    addr: "Sommervej 50, 8600 Silkeborg",
    web: "https://silkeborggolf.dk/gaester-greenfee/",
    greenfee: 500,
    feeNote: "Dynamisk pris 500–800 kr. Mindstepris 350 kr.",
    blurb:
      "Klassisk kuperet skovbane i Gudenå-landskabet — en af Danmarks smukkeste på en klar efterårsdag. Anlægget har 27 huller fordelt på sløjferne SYD, VEST og ØST.",
    tip: "Vigtigt: de tre 9-hullers sløjfer roterer, så hvilke 18 huller der er «banen» skifter cirka hver uge. Tjek baneinfo på hjemmesiden ugen før — ellers ved I ikke, hvilken sløjfe I starter på.",
  },
  holstebro: {
    name: "Holstebro Golfklub",
    course: "Skovbanen i Råsted, 18 huller",
    addr: "Brandsbjergvej 4, 7570 Vemb",
    web: "https://www.holstebrogolfklub.dk/gaester/greenfee/",
    greenfee: 400,
    feeNote: "Dynamisk pris 400–600 kr. Aldrig under 300 kr.",
    blurb:
      "Turens tungvægter. Prisbelønnet skovbane tegnet af Erik Schnack, redesignet af Robert Trent Jones Jr. (2004) og Philip Spogard (2014). Snævre fairways mellem gamle nåletræer.",
    tip: "Klubben har to anlæg. Skovbanen ligger på Brandsbjergvej 4 ved Råsted — ikke ved Storåbanen inde i Holstebro. Sæt adressen i GPS'en aftenen før, så I ikke kører forkert i mørket kl. 07:15.",
  },
  nordvestjysk: {
    name: "Nordvestjysk Golfklub",
    course: "18-hulsbanen, Nystrup",
    addr: "Nystrupvej 19, 7700 Thisted",
    web: "https://nvgolf.dk/gaest/greenfee/",
    greenfee: 400,
    feeNote: "Hverdage 400 kr. hele dagen. 2. runde samme dag: halv pris.",
    blurb:
      "Links-agtig klitbane i Nystrup Klitplantage ud mod Vesterhavet. Lyng, bjergfyr og vind — en helt anden golf end formiddagens skovbane.",
    tip: "Greenfee betales med kort på proboxen, og gyldigt DGU-kort skal medbringes. Buggy 300 kr. — overvej det her, dagen er den stramme.",
  },
  himmerlandNew: {
    name: "HimmerLand",
    course: "New Course, 18 huller",
    addr: "Centervej 1, Gatten, 9640 Farsø",
    web: "https://himmerlandresort.dk/aktiviteter/golf/info-og-priser/",
    greenfee: 500,
    feeNote: "Fredag: dynamisk pris fra 500 kr. (man–tor 450 kr.)",
    blurb:
      "Resortets mesterskabsbane og tidligere vært for Made in HimmerLand på DP World Tour. Bred, dramatisk og i topstand.",
    tip: "New Course lukker for sæsonen 1. november — I er inde under deadline med en uges margin.",
  },
  himmerlandOld: {
    name: "HimmerLand",
    course: "Old Course, 18 huller",
    addr: "Centervej 1, Gatten, 9640 Farsø",
    web: "https://himmerlandresort.dk/aktiviteter/golf/info-og-priser/",
    greenfee: 400,
    feeNote: "Fredag: dynamisk pris fra 400 kr. (man–tor 350 kr.)",
    blurb:
      "Den oprindelige bane — kortere, mere kuperet og med skovkarakter. Hul 1 på begge baner ligger bag Starters House, så skiftet mellem runderne tager under fem minutter.",
    tip: "Ingen transport mellem de to runder. Det er derfor dag 3 er turens mest afslappede 36 huller.",
  },
};

const STAYS = {
  soepark: {
    name: "Best Western Hotel Royal",
    type: "Hotel · Holstebro centrum",
    addr: "Den Røde Plads 10, 7500 Holstebro",
    web: "https://hotel-royal.dk/",
    price: 1000,
    priceNote: "ca. 850–1.200 kr. pr. dobbeltværelse pr. nat inkl. morgenmad",
    blurb:
      "Hotel midt i Holstebro i stedet for campinghytte. Rigtig seng efter en dag der starter 04:15, morgenbuffet inkluderet og gåafstand til byens restauranter — ingen aftenkørsel for at finde mad.",
    perks: ["Morgenbuffet inkluderet", "Gåafstand til restauranter", "30 min. til Skovbanen", "Rigtig seng efter 439 km"],
    warnNote:
      "Bekræft ved booking at morgenbuffeten åbner senest 06:45 — I skal køre 07:15 for at nå teetiden 08:04. Ellers bed om en to-go-morgenmad aftenen før.",
  },
  himmerland: {
    name: "A Hus, HimmerLand",
    type: "Feriehus · bookes via Airbnb",
    addr: "HimmerLand-området, Gatten, 9640 Farsø",
    web: "https://www.airbnb.dk/gatten-denmark/stays",
    price: 1100,
    priceNote: "ca. 900–1.400 kr. pr. hus pr. nat — deles af op til 4",
    blurb:
      "A Hus på HimmerLand-området, booket via Airbnb. Eget køkken, så morgenmaden kan stå klar kl. 06:40 uden at vente på en buffet, og kort afstand til Starters House fredag morgen.",
    perks: ["Eget køkken", "Selv-check-in sent om aftenen", "Deles af op til 4", "På HimmerLand-området"],
    warnNote:
      "Airbnb-linket er ikke indsat endnu — send det, så opdaterer jeg kort og booking-knap. Bemærk også at morgenbuffet og spa/pool ikke følger med et Airbnb-hus; morgenmaden købes ind torsdag aften.",
  },
};

// Beregnede sol-tider (dansk sommertid, UTC+2) pr. dag og lokation.
const SUN = {
  1: { dawn: "07:27", rise: "08:05", set: "18:07", dusk: "18:45", label: "Silkeborg (morgen) / Brabrand (aften)" },
  2: { dawn: "07:33", rise: "08:12", set: "18:08", dusk: "18:47", label: "Holstebro / Thisted" },
  3: { dawn: "07:32", rise: "08:12", set: "18:01", dusk: "18:40", label: "Gatten, Himmerland" },
};

const DAYS = [
  {
    n: 1,
    date: "2026-10-21",
    weekday: "Onsdag",
    dateLabel: "21. oktober 2026",
    headline: "Solrød → Silkeborg → Brabrand",
    summary:
      "Turens hårdeste morgen. Teetid 08:12 i Silkeborg betyder afgang fra Solrød kl. 04:15 og tre timers natkørsel. Til gengæld er resten af dagen rolig: kun 37 km mellem banerne og halvanden time til frokost inden runde 2 på Lyngbygaard kl. 14.",
    drive: 439,
    courses: ["silkeborg", "lyngbygaard"],
    stay: "soepark",
    risk: "high",
    riskNote: "Dagen klemmes i begge ender: afgang 04:15 i mørke, og runde 2 slutter 18:00 — kun 7 minutter før solnedgang. Midt på dagen er der til gengæld 1 t 20 min luft i Brabrand, som kan opsuge en forsinkelse fra formiddagen.",
    items: [
      { t: "04:15", type: "drive", title: "Afgang fra Solrød Strand", desc: "Meget tidlig start — bilen skal pakkes aftenen før, og I skal sove tidligt onsdag nat. 292 km til Silkeborg via E20, Storebælt og Silkeborgmotorvejen.", meta: "3 t 10 min", warn: true },
      { t: "05:35", type: "break", title: "Pause ved Storebælt", desc: "Kaffe og tank op ved Nyborg. Broafgift 220 kr. med BroBizz. Skift gerne chauffør her.", meta: "15 min" },
      { t: "07:40", type: "arrive", title: "Ankomst Silkeborg Golfklub", desc: "Check-in via GolfNext-automaten i Proshoppen. Det er stadig halvmørkt — daggry var 07:27, solen står først op 08:05.", meta: "32 min til teetid" },
      { t: "08:12", type: "golf", title: "Runde 1 — Silkeborg 18 huller", desc: "Kuperet skovbane i efterårsfarver. I slår ud 7 minutter efter solopgang, så de første huller spilles i lavt morgenlys.", meta: "ca. 4 t", course: "silkeborg" },
      { t: "12:12", type: "drive", title: "Videre mod Lyngbygaard", desc: "37 km, næsten alt på Silkeborgmotorvejen. Lyngbygaard ligger i Brabrand vest for Aarhus, så I undgår byen helt.", meta: "25 min" },
      { t: "12:40", type: "arrive", title: "Ankomst Lyngbygaard Golf", desc: "Check-in i receptionen. God tid — brug den på rangen eller putting greenen.", meta: "1 t 20 min til teetid" },
      { t: "12:50", type: "food", title: "Frokost i Brasseriet", desc: "45 minutter til at spise ordentligt og hvile benene. Efter en start kl. 04:15 er det her dagens vigtigste pause.", meta: "45 min" },
      { t: "14:00", type: "golf", title: "Runde 2 — Lyngbygaard 18 huller", desc: "Moderne parkbane i bølget østjysk landskab. Spil raskt — planen rammer solnedgangen præcist.", meta: "ca. 4 t", course: "lyngbygaard" },
      { t: "18:00", type: "sun", title: "Dagens kritiske punkt", desc: "Solnedgang 18:07. Marginen er 7 minutter, så hul 16-18 spilles i aftenlys. Der er civilt lys til 18:45, men brug lyse bolde og hold øje med tempoet fra hul 12.", meta: "Solnedgang 18:07", warn: true },
      { t: "18:15", type: "drive", title: "Kørsel til Holstebro", desc: "110 km ad rute 15 via Herning. Mørk køretur, og dagens anden lange etape — I har været oppe i 14 timer.", meta: "1 t 20 min" },
      { t: "19:35", type: "stay", title: "Check-in, Best Western Hotel Royal", desc: "Den Røde Plads 10, midt i Holstebro. Hotellet ligger i gåafstand til restauranterne, så bilen kan blive stående.", meta: "", stay: "soepark" },
      { t: "20:00", type: "food", title: "Aftensmad i Holstebro centrum", desc: "Gå ud og spis — I er inden for få hundrede meter af byens spisesteder. Tjek lukketider, da I er sent ude på en onsdag.", meta: "" },
    ],
  },
  {
    n: 2,
    date: "2026-10-22",
    weekday: "Torsdag",
    dateLabel: "22. oktober 2026",
    headline: "Skovbane møder klitbane",
    summary:
      "Turens mest kontrastfyldte dag — og den stramme. Prisbelønnet skovbane om formiddagen, vindblæst klitbane ved Vesterhavet om eftermiddagen. Frokosten er drive thru i Holstebro og spises undervejs.",
    drive: 238,
    courses: ["holstebro", "nordvestjysk"],
    stay: "himmerland",
    risk: "high",
    riskNote: "Turens strammeste dag. Med tee 1 kl. 08:04 slutter runde 1 først 12:05, og efter 110 km transport og et madstop er der kun 10 minutters luft før teetid kl. 14 — og runde 2 slutter 18:00, 8 minutter før solnedgang. Bliver runde 1 forsinket, æder det direkte af runde 2.",
    items: [
      { t: "06:45", type: "food", title: "Morgenbuffet på hotellet", desc: "Spis ordentligt — det er dagens eneste rigtige måltid ved et bord. Bekræft ved booking at buffeten åbner senest 06:45.", meta: "30 min" },
      { t: "07:15", type: "drive", title: "Kørsel til Råsted", desc: "28 km vestpå til Skovbanen, Brandsbjergvej 4 ved Vemb. OBS: ikke samme adresse som Storåbanen inde i byen — sæt GPS'en aftenen før.", meta: "30 min" },
      { t: "07:45", type: "arrive", title: "Ankomst Skovbanen", desc: "Knap 20 minutter til teetid. Solopgang er først 08:12, så de første huller spilles i gryende dagslys — det er lyst nok fra 07:33, men tag en bold I kan se.", meta: "19 min til tee" },
      { t: "08:04", type: "golf", title: "Runde 1 — Holstebro Skovbanen", desc: "Turens bedst bedømte bane. Hold tempoet — dagens plan har ingen luft at give væk.", meta: "ca. 4 t", course: "holstebro" },
      { t: "12:05", type: "drive", title: "Mod Holstebro", desc: "20 km tilbage mod byen. Første etape af dagens lange transport.",       meta: "25 min" },
            { t: "12:30", type: "food", title: "McDonald's Måbjerg — drive thru", desc: "Hyldgårdvej 5, nord i Holstebro og direkte på ruten mod Thisted. Bestil i app'en inden I når byen, så maden står klar — stoppet skal være kort. Spises i bilen.", meta: "15 min" },
      { t: "12:45", type: "drive", title: "Nordpå til Thisted", desc: "90 km ad rute 11 gennem Thy via Struer.", meta: "1 t 5 min" },
      { t: "13:50", type: "arrive", title: "Ankomst Nordvestjysk Golfklub", desc: "Kun 10 minutter til teetid. Skift tøj og pak bilen inden I kører fra McDonald's, så I kan gå direkte til tee. Check ind med DGU-kort, probox tager kun kort.", meta: "10 min til tee", warn: true },
      { t: "14:00", type: "golf", title: "Runde 2 — Nordvestjysk 18 huller", desc: "Klitbane i lyng og bjergfyr. Overvej buggy (300 kr.) — det er det bedst brugte beløb på hele turen med den tidsplan her.", meta: "ca. 4 t", course: "nordvestjysk" },
      { t: "18:00", type: "sun", title: "Dagens kritiske punkt", desc: "Solnedgang 18:08. Marginen er 8 minutter, og her er I ved Vesterhavet uden læ. Bliver runden bare 20 minutter forsinket, spilles de sidste huller i reelt tusmørke (civilt lys til 18:47).", meta: "Solnedgang 18:08", warn: true },
      { t: "18:15", type: "drive", title: "Kørsel til HimmerLand", desc: "100 km via Fjerritslev, Aggersundbroen og Løgstør. Mørk, men nem køretur.", meta: "1 t 25 min" },
      { t: "19:40", type: "stay", title: "Check-in i A Hus, HimmerLand", desc: "Airbnb med selv-check-in, så den sene ankomst er uproblematisk — ingen reception der lukker. Aftal nøglekode med værten i forvejen.", meta: "", stay: "himmerland" },
      { t: "20:15", type: "food", title: "Aftensmad og indkøb", desc: "Handl ind undervejs — i Løgstør eller Farsø på vejen — eller spis i restauranten på resortet. Husk morgenmad til i morgen: huset har køkken, men ingen buffet.", meta: "", warn: true },
    ],
  },
  {
    n: 3,
    date: "2026-10-23",
    weekday: "Fredag",
    dateLabel: "23. oktober 2026",
    headline: "36 huller på HimmerLand — og hjem",
    summary:
      "Turens letteste golf-logistik: begge baner starter bag Starters House. Ingen transport mellem runderne giver den margin, der skal bruges på hjemturen.",
    drive: 400,
    courses: ["himmerlandNew", "himmerlandOld"],
    stay: null,
    risk: "low",
    riskNote: "Nul transport mellem runderne. Færdig 1,5 time før solnedgang.",
    items: [
      { t: "06:40", type: "food", title: "Morgenmad i A Hus", desc: "Egen morgenmad fra køkkenet — det var indkøbet i går aftes. Pak bilen helt, så I kan køre direkte hjem efter runde 2.", meta: "" },
      { t: "07:25", type: "drive", title: "Til Starters House", desc: "Kort tur fra huset til klubhuset. Afsæt ti minutter mere, end kortet siger: det er mørkt og I skal have bags over på buggyen.", meta: "ca. 10 min" },
      { t: "07:45", type: "golf", title: "Runde 1 — New Course", desc: "Mesterskabsbanen og tidligere vært for Made in HimmerLand. Lukker for sæsonen 1. november.", meta: "ca. 4 t", course: "himmerlandNew" },
      { t: "11:45", type: "food", title: "Frokost i klubhuset", desc: "Tredive minutter. Hul 1 ligger lige uden for døren.", meta: "30 min" },
      { t: "12:30", type: "golf", title: "Runde 2 — Old Course", desc: "Kortere, mere kuperet og med skovkarakter. Turens hul 91-108.", meta: "ca. 4 t", course: "himmerlandOld" },
      { t: "16:30", type: "sun", title: "108 huller gennemført", desc: "Halvanden time før solnedgang. Tid til en øl i klubhuset inden hjemturen.", meta: "Solnedgang 18:01" },
      { t: "17:00", type: "drive", title: "Afgang mod Solrød", desc: "400 km via E45, Vejle, Fyn og Storebæltsbroen (220 kr. med BroBizz).", meta: "4 t 15 min" },
      { t: "19:00", type: "break", title: "Pause på Fyn", desc: "Aftensmad undervejs — I har fortjent andet end en sandwich.", meta: "45 min" },
      { t: "21:45", type: "arrive", title: "Hjemme i Solrød Strand", desc: "Turen er slut. 108 huller, 6 baner, 1.077 km.", meta: "" },
    ],
  },
];

const PACKING = [
  { cat: "Golf", items: ["Golfsæt + ekstra handsker", "Mindst 12 bolde pr. dag", "Regnhandsker (oktober i Thy)", "Vandtæt regntøj — jakke og bukser", "Ekstra par golfsko", "Håndklæde (gerne to)", "Afstandsmåler + oplader", "DGU-kort — kræves ved Nordvestjysk", "Tees, pitchfork, blyant"] },
  { cat: "Tøj", items: ["Varmt base layer", "Vindjakke", "Hue og halsedisse", "Skiftetøj til hver dag", "Morgenmad til fredag (købes torsdag)", "Pæne sko og skjorte til middag"] },
  { cat: "Bil & vej", items: ["BroBizz i forruden", "Telefonholder + billader", "Termokande", "Køletaske til snacks og drikkevarer", "Skraber og sprinklervæske", "Ekstra håndklæder til våde bags"] },
  { cat: "Papirer", items: ["Bekræftelser på alle 6 teetider", "Hotelbooking Best Western + Airbnb-kode til A Hus", "Sygesikringsbevis", "Kreditkort — proboxen tager kun kort"] },
];

const PREP = [
  { when: "Nu", task: "Book alle 6 teetider i GolfBox", why: "Oktober-formiddage på de gode baner forsvinder først. Dag 2 kl. 08:04 er den kritiske." },
  { when: "Nu", task: "Book Best Western Hotel Royal, Holstebro", why: "Bekræft samtidig at morgenbuffeten åbner senest 06:45 — I skal køre 07:15 for at nå teetiden 08:04." },
  { when: "Nu", task: "Book A Hus på HimmerLand via Airbnb", why: "Tjek tre ting på annoncen: at den tillader selv-check-in efter kl. 19:30, at der er køkken, og hvor langt der reelt er til Starters House." },
  { when: "Nu", task: "Bekræft fri greenfee på alle seks baner", why: "Få skriftligt på plads, hvordan I checker ind, når I ikke betaler — så undgår I diskussion i proshoppen kl. 07:45." },
  { when: "Nu", task: "Overvej buggy på Nordvestjysk", why: "Dag 2 slutter 8 minutter før solnedgang. Buggy er den billigste forsikring mod at spille de sidste huller i mørke." },
  { when: "2 dage før", task: "Tjek banestatus på alle 6 baner", why: "Efterårsvejr kan give midlertidige greens — og dermed halv greenfee." },
  { when: "Dagen før", task: "Pak bilen helt færdig og gå tidligt i seng", why: "Afgang kl. 04:15. Intet må findes frem om morgenen, og I skal kunne køre tre timer i mørke." },
];
