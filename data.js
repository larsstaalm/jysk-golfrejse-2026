// Jysk Golfrejse 21.-23. oktober 2026
// Alle sol-tider er beregnet (NOAA) for den konkrete bane og angivet i dansk sommertid (UTC+2).
// Sommertiden ophører først søndag d. 25. oktober 2026, så hele turen køres på sommertid.

const TRIP = {
  title: "Jysk Golfrejse",
  subtitle: "108 huller på 3 dage",
  start: "2026-10-21T04:15:00+02:00",
  home: { name: "Solrød Strand", q: "Solrød Strand, Danmark" },
  bridgeEachWay: 220, // BroBizz, personbil
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
    course: "Silkeborg-banen, 18 huller",
    addr: "Sensommervej 15C, 8600 Silkeborg",
    web: "https://silkeborggolf.dk/gaester-greenfee/",
    greenfee: 500,
    feeNote: "Dynamisk pris 500–800 kr. Mindstepris 350 kr.",
    blurb:
      "Klassisk kuperet skovbane i Gudenå-landskabet — en af Danmarks smukkeste på en klar efterårsdag. Differentierede priser, så en eftermiddagstid rammer den lave ende af skalaen.",
    tip: "33% rabat til medlemmer af bl.a. Lyngbygaard, Holstebro, HimmerLand og Aalborg. Oplys det ved booking.",
  },
  holstebro: {
    name: "Holstebro Golfklub",
    course: "Skovbanen i Råsted, 18 huller",
    addr: "Råsted Kirkeby 5, 7570 Vemb",
    web: "https://www.holstebrogolfklub.dk/gaester/greenfee/",
    greenfee: 400,
    feeNote: "Dynamisk pris 400–600 kr. Aldrig under 300 kr.",
    blurb:
      "Turens tungvægter. Prisbelønnet skovbane tegnet af Erik Schnack, redesignet af Robert Trent Jones Jr. (2004) og Philip Spogard (2014). Snævre fairways mellem gamle nåletræer.",
    tip: "Klubben har to anlæg. Skovbanen ligger i Råsted — ikke ved Storåbanen inde i Holstebro. Tjek adressen i GolfBox før afgang.",
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
    name: "Holstebro Søpark Camping",
    type: "Campinghytte",
    addr: "Birkevej 25, 7500 Holstebro",
    web: "https://www.holstebro-soepark.dk/hytter-holstebro-soepark",
    price: 650,
    priceNote: "ca. 550–750 kr. pr. hytte pr. nat",
    blurb:
      "Prisvenligt og hyggeligt: standard- og luksushytter midt i naturen ved Vandkraftsøen, 10 min. fra Holstebro centrum. Pladsen har vinteråbent for hytter, så oktober er ingen hindring.",
    perks: ["Vinteråbent", "Hytter til 2–6 pers.", "20 min. til Skovbanen", "Eget køkken = billig morgenmad"],
  },
  himmerland: {
    name: "HimmerLand Golf & Spa Resort",
    type: "Resorthotel",
    addr: "Centervej 1, Gatten, 9640 Farsø",
    web: "https://himmerlandresort.dk/",
    price: 1300,
    priceNote: "ca. 1.100–1.600 kr. pr. dobbeltværelse inkl. morgenbuffet",
    blurb:
      "Turens forkælelse. Overnatning direkte ved første tee, morgenbuffet tidligt og spa- og poolområde til at skylle 72 huller ud af benene.",
    perks: ["Spa & pool", "Morgenbuffet", "0 min. til tee 1", "Spørg efter golfpakke (stay & play)"],
  },
};

// Beregnede sol-tider (dansk sommertid, UTC+2) pr. dag og lokation.
const SUN = {
  1: { dawn: "07:25", rise: "08:03", set: "18:07", dusk: "18:45", label: "Aarhus / Silkeborg" },
  2: { dawn: "07:33", rise: "08:12", set: "18:08", dusk: "18:47", label: "Holstebro / Thisted" },
  3: { dawn: "07:32", rise: "08:12", set: "18:01", dusk: "18:40", label: "Gatten, Himmerland" },
};

const DAYS = [
  {
    n: 1,
    date: "2026-10-21",
    weekday: "Onsdag",
    dateLabel: "21. oktober 2026",
    headline: "Solrød → Aarhus → Silkeborg",
    summary:
      "Turens lange kørselsdag. Tidlig afgang i mørke betaler sig: I står på tee 1 ved Lyngbygaard i det øjeblik lyset er spilbart.",
    drive: 335,
    courses: ["lyngbygaard", "silkeborg"],
    stay: "soepark",
    risk: "low",
    riskNote: "God margin. Runde 2 slutter ca. 1 time før solnedgang.",
    items: [
      { t: "04:15", type: "drive", title: "Afgang fra Solrød Strand", desc: "Bilen pakkes aftenen før. 255 km til Lyngbygaard via E20 og Storebæltsbroen.", meta: "2 t 50 min" },
      { t: "05:45", type: "break", title: "Pause ved Storebælt", desc: "Kaffe og tank op ved Korsør eller Nyborg. Broafgift 220 kr. med BroBizz.", meta: "15 min" },
      { t: "07:15", type: "arrive", title: "Ankomst Lyngbygaard Golf", desc: "Check-in i receptionen, scorekort og et par bolde på rangen mens det lysner.", meta: "Civilt gry 07:25" },
      { t: "07:50", type: "golf", title: "Runde 1 — Lyngbygaard 18 huller", desc: "Teetid sat til første spilbare lys. Spil som 2- eller 3-bold for at holde tempoet.", meta: "ca. 4 t", course: "lyngbygaard" },
      { t: "11:50", type: "drive", title: "Videre mod Silkeborg", desc: "38 km ad rute 15. Frokost spises i bilen — bestil en to-go i Brasseriet inden runden.", meta: "35 min" },
      { t: "12:45", type: "arrive", title: "Ankomst Silkeborg Golfklub", desc: "Check-in via GolfNext-automaten i Proshoppen.", meta: "" },
      { t: "13:05", type: "golf", title: "Runde 2 — Silkeborg 18 huller", desc: "Kuperet skovbane i efterårsfarver. Solnedgang 18:07, så der er komfortabel margin.", meta: "ca. 4 t", course: "silkeborg" },
      { t: "17:05", type: "sun", title: "Dagens 36 huller er i hus", desc: "En time før solnedgang. Skift sko og pak bilen i ro.", meta: "Solnedgang 18:07" },
      { t: "17:45", type: "drive", title: "Kørsel til Holstebro", desc: "80 km ad rute 15 vestpå.", meta: "1 t 5 min" },
      { t: "18:50", type: "stay", title: "Check-in, Holstebro Søpark", desc: "Campinghytte med eget køkken. Smid en pose morgenmad i køleskabet til i morgen.", meta: "", stay: "soepark" },
      { t: "19:45", type: "food", title: "Aftensmad i Holstebro", desc: "10 min. til centrum. Alternativt handles ind og laves mad i hytten — turens billigste aften.", meta: "" },
    ],
  },
  {
    n: 2,
    date: "2026-10-22",
    weekday: "Torsdag",
    dateLabel: "22. oktober 2026",
    headline: "Skovbane møder klitbane",
    summary:
      "Turens mest kontrastfyldte dag — og den stramme. Prisbelønnet skovbane om formiddagen, vindblæst klitbane ved Vesterhavet om eftermiddagen.",
    drive: 225,
    courses: ["holstebro", "nordvestjysk"],
    stay: "himmerland",
    risk: "high",
    riskNote: "Stram dag: transporten midt på dagen er 110 km. Runde 2 slutter kun ca. 30 min. før solnedgang.",
    items: [
      { t: "06:45", type: "food", title: "Morgenmad i hytten", desc: "Hurtig start — I skal være på tee før kl. 8.", meta: "" },
      { t: "07:15", type: "drive", title: "Kørsel til Råsted", desc: "20 km vestpå til Skovbanen. OBS: ikke samme adresse som Storåbanen.", meta: "25 min" },
      { t: "07:55", type: "golf", title: "Runde 1 — Holstebro Skovbanen", desc: "Turens bedst bedømte bane. Hold tempoet — dagens plan har ingen luft at give væk.", meta: "ca. 4 t", course: "holstebro" },
      { t: "11:55", type: "drive", title: "Nordpå til Thisted", desc: "110 km ad rute 11 gennem Thy. Frokost spises undervejs — pak sandwich om morgenen.", meta: "1 t 25 min" },
      { t: "13:25", type: "arrive", title: "Ankomst Nordvestjysk Golfklub", desc: "Betal på proboxen med kort. Husk gyldigt DGU-kort.", meta: "" },
      { t: "13:40", type: "golf", title: "Runde 2 — Nordvestjysk 18 huller", desc: "Klitbane i lyng og bjergfyr. Overvej buggy (300 kr.) for at sikre, at I når rundt i lys.", meta: "ca. 4 t", course: "nordvestjysk" },
      { t: "17:40", type: "sun", title: "Dagens kritiske punkt", desc: "Solnedgang 18:08. Marginen er ca. 28 minutter — bliver runden forsinket, spilles hul 17-18 i tusmørke (lys til 18:47).", meta: "Solnedgang 18:08", warn: true },
      { t: "17:55", type: "drive", title: "Kørsel til HimmerLand", desc: "100 km via Fjerritslev, Aggersundbroen og Løgstør. Mørk, men nem køretur.", meta: "1 t 25 min" },
      { t: "19:20", type: "stay", title: "Check-in, HimmerLand Resort", desc: "Værelse med udsigt over banerne. Book bord i restauranten inden ankomst.", meta: "", stay: "himmerland" },
      { t: "20:00", type: "food", title: "Middag på resortet", desc: "Efterfulgt af spa og pool. I har 36 huller i benene og 36 mere i morgen.", meta: "" },
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
      { t: "06:45", type: "food", title: "Morgenbuffet", desc: "Check ud og læg bagagen i bilen med det samme, så I kan køre direkte efter runde 2.", meta: "" },
      { t: "07:45", type: "golf", title: "Runde 1 — New Course", desc: "Mesterskabsbanen og tidligere vært for Made in HimmerLand. Lukker for sæsonen 1. november.", meta: "ca. 4 t", course: "himmerlandNew" },
      { t: "11:45", type: "food", title: "Frokost i klubhuset", desc: "Tredive minutter. Hul 1 ligger lige uden for døren.", meta: "30 min" },
      { t: "12:30", type: "golf", title: "Runde 2 — Old Course", desc: "Kortere, mere kuperet og med skovkarakter. Turens hul 91-108.", meta: "ca. 4 t", course: "himmerlandOld" },
      { t: "16:30", type: "sun", title: "108 huller gennemført", desc: "Halvanden time før solnedgang. Tid til en øl i klubhuset inden hjemturen.", meta: "Solnedgang 18:01" },
      { t: "17:00", type: "drive", title: "Afgang mod Solrød", desc: "400 km via E45, Vejle, Fyn og Storebæltsbroen (220 kr. med BroBizz).", meta: "4 t 15 min" },
      { t: "19:00", type: "break", title: "Pause på Fyn", desc: "Aftensmad undervejs — I har fortjent andet end en sandwich.", meta: "45 min" },
      { t: "21:45", type: "arrive", title: "Hjemme i Solrød Strand", desc: "Turen er slut. 108 huller, 6 baner, 1.003 km.", meta: "" },
    ],
  },
];

const PACKING = [
  { cat: "Golf", items: ["Golfsæt + ekstra handsker", "Mindst 12 bolde pr. dag", "Regnhandsker (oktober i Thy)", "Vandtæt regntøj — jakke og bukser", "Ekstra par golfsko", "Håndklæde (gerne to)", "Afstandsmåler + oplader", "DGU-kort — kræves ved Nordvestjysk", "Tees, pitchfork, blyant"] },
  { cat: "Tøj", items: ["Varmt base layer", "Vindjakke", "Hue og halsedisse", "Skiftetøj til hver dag", "Badetøj til spa på HimmerLand", "Pæne sko og skjorte til middag"] },
  { cat: "Bil & vej", items: ["BroBizz i forruden", "Telefonholder + billader", "Termokande", "Køletaske til frokost i bilen", "Skraber og sprinklervæske", "Ekstra håndklæder til våde bags"] },
  { cat: "Papirer", items: ["Bekræftelser på alle 6 teetider", "Booking på Søpark og HimmerLand", "Sygesikringsbevis", "Kreditkort — proboxen tager kun kort"] },
];

const PREP = [
  { when: "Nu", task: "Book alle 6 teetider i GolfBox", why: "Oktober-formiddage på de gode baner forsvinder først. Dag 2 kl. 07:55 er den kritiske." },
  { when: "Nu", task: "Book hytte på Holstebro Søpark", why: "Vinteråbent, men begrænset antal hytter uden for sæsonen." },
  { when: "Nu", task: "Book værelse på HimmerLand — spørg efter golfpakke", why: "Stay & play kan være billigere end værelse + 2 greenfees separat." },
  { when: "Nu", task: "Tjek greenfee-aftaler i jeres hjemmeklub", why: "Silkeborg, Lyngbygaard, Holstebro og HimmerLand giver indbyrdes 33% rabat. Det kan være 800+ kr. pr. person." },
  { when: "2 dage før", task: "Tjek banestatus på alle 6 baner", why: "Efterårsvejr kan give midlertidige greens — og dermed halv greenfee." },
  { when: "Dagen før", task: "Pak bilen helt færdig", why: "Afgang kl. 04:15. Intet skal findes frem om morgenen." },
];
