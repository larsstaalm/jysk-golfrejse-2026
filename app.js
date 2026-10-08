/* Jysk Golfrejse 2026 — interaktiv plan */

const $ = (s, r = document) => r.querySelector(s);
const el = (t, c, h) => { const n = document.createElement(t); if (c) n.className = c; if (h != null) n.innerHTML = h; return n; };
const kr = n => n.toLocaleString("da-DK", { maximumFractionDigits: 0 }) + " kr.";
const mins = t => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
const maps = q => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);
const dirs = (a, b) => "https://www.google.com/maps/dir/?api=1&origin=" + encodeURIComponent(a) + "&destination=" + encodeURIComponent(b);

const TABS = [
  { id: "overblik", label: "Overblik" },
  { id: "dag1", label: "Dag 1 · Ons" },
  { id: "dag2", label: "Dag 2 · Tor" },
  { id: "dag3", label: "Dag 3 · Fre" },
  { id: "baner", label: "Banerne" },
  { id: "ophold", label: "Overnatning" },
  { id: "budget", label: "Budget" },
  { id: "klar", label: "Gør klar" },
];

/* ---------- Navigation ---------- */
function buildNav() {
  const nav = $("#nav");
  TABS.forEach(t => {
    const b = el("button", null, t.label);
    b.setAttribute("role", "tab");
    b.dataset.tab = t.id;
    b.onclick = () => show(t.id);
    nav.appendChild(b);
  });
}

function show(id) {
  TABS.forEach(t => {
    const p = $("#p-" + t.id);
    const b = $(`#nav button[data-tab="${t.id}"]`);
    if (p) p.hidden = t.id !== id;
    if (b) b.setAttribute("aria-selected", String(t.id === id));
  });
  if (location.hash.slice(1) !== id) history.replaceState(null, "", "#" + id);
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
}

/* ---------- Countdown ---------- */
function countdown() {
  const target = new Date(TRIP.start);
  const tick = () => {
    const diff = target - new Date();
    const node = $("#countdown");
    if (diff <= 0) { node.textContent = "Turen er i gang — god fornøjelse ⛳"; return; }
    const d = Math.floor(diff / 864e5);
    const h = Math.floor(diff % 864e5 / 36e5);
    const m = Math.floor(diff % 36e5 / 6e4);
    node.innerHTML = `Afgang fra Solrød Strand om <b>${d}</b> dage, <b>${h}</b> timer og <b>${m}</b> minutter — onsdag d. 21. oktober kl. 05:20.`;
  };
  tick(); setInterval(tick, 30000);
}

/* ---------- Daylight bar ---------- */
const DL_START = 6 * 60, DL_END = 20 * 60; // 06:00–20:00
const pct = m => ((m - DL_START) / (DL_END - DL_START)) * 100;

function daylightBar(day) {
  const s = SUN[day.n];
  const box = el("div", "daylight");
  box.appendChild(el("h3", null, `Lys og runder <em>${s.label} · dansk sommertid</em>`));

  const track = el("div", "dl-track");

  // Rounds as blocks
  day.items.filter(i => i.type === "golf").forEach((it, idx) => {
    const start = mins(it.t), end = start + 240;
    const b = el("div", "dl-block", `Runde ${idx + 1} · 18 huller`);
    b.style.left = pct(start) + "%";
    b.style.width = (pct(end) - pct(start)) + "%";
    if (day.risk === "high" && idx === 1) b.classList.add("warnb");
    b.title = `${it.title} — ${it.t}–${String(Math.floor(end / 60)).padStart(2, "0")}:${String(end % 60).padStart(2, "0")}`;
    track.appendChild(b);
  });

  // Sun markers
  [[s.rise, "Solop " + s.rise], [s.set, "Solned " + s.set]].forEach(([t, label]) => {
    const m = el("div", "dl-mark");
    m.style.left = pct(mins(t)) + "%";
    m.dataset.l = label;
    track.appendChild(m);
  });

  box.appendChild(track);

  const axis = el("div", "dl-axis");
  ["06", "08", "10", "12", "14", "16", "18", "20"].forEach(h => axis.appendChild(el("span", null, h)));
  box.appendChild(axis);

  const lastGolf = day.items.filter(i => i.type === "golf").pop();
  const endLast = mins(lastGolf.t) + 240;
  const margin = mins(s.set) - endLast;

  box.appendChild(el("div", "dl-legend", `
    <span><i style="background:var(--fair)"></i>Planlagt runde</span>
    <span><i style="background:#8fc4f2"></i>Fuldt dagslys</span>
    <span><i style="background:#7a5340"></i>Tusmørke (spilbart)</span>
    <span>Civilt lys ${s.dawn}–${s.dusk}</span>
    <span style="color:${margin < 45 ? "var(--warn)" : "var(--fair)"}">Margin efter sidste runde: ${margin} min.</span>
  `));
  return box;
}

/* ---------- Day panels ---------- */
function buildDay(day) {
  const p = $("#p-dag" + day.n);
  const s = SUN[day.n];

  const head = el("div", "dayhead");
  head.appendChild(el("div", null, `
    <div class="tag ${day.risk === "high" ? "amber" : ""}">Dag ${day.n} · ${day.weekday} ${day.dateLabel}</div>
    <h2>${day.headline}</h2>
  `));
  head.appendChild(el("div", "dh-meta", `
    <span class="pill">🚗 ${day.drive} km</span>
    <span class="pill">⛳ 36 huller</span>
    <span class="pill">🌅 ${s.rise}</span>
    <span class="pill">🌇 ${s.set}</span>
    <span class="pill ${day.risk === "high" ? "hot" : "ok"}">${day.risk === "high" ? "Stram tidsplan" : "God margin"}</span>
  `));
  p.appendChild(head);

  p.appendChild(el("p", "lede", day.summary + ` <strong style="color:${day.risk === "high" ? "var(--warn)" : "var(--fair)"}">${day.riskNote}</strong>`));
  p.appendChild(daylightBar(day));

  const tl = el("div", "tl");
  day.items.forEach(it => {
    const ev = el("div", "ev " + it.type + (it.warn ? " warn" : ""));
    ev.appendChild(el("div", "ev-time", it.t));
    ev.appendChild(el("div", "ev-dot"));
    const body = el("div", "ev-body");
    body.appendChild(el("div", "ev-head", `<strong>${it.title}</strong>${it.meta ? `<span>${it.meta}</span>` : ""}`));
    if (it.desc) body.appendChild(el("p", null, it.desc));

    const links = el("div", "ev-links");
    if (it.course) {
      const c = COURSES[it.course];
      links.appendChild(el("a", "minibtn", "📍 " + c.addr)).href = maps(c.name + ", " + c.addr);
      links.appendChild(el("a", "minibtn", "🔗 Greenfee & booking")).href = c.web;
      links.lastChild.target = "_blank"; links.lastChild.rel = "noopener";
      links.firstChild.target = "_blank"; links.firstChild.rel = "noopener";
    }
    if (it.stay) {
      const st = STAYS[it.stay];
      const a1 = el("a", "minibtn", "📍 " + st.addr); a1.href = maps(st.name + ", " + st.addr); a1.target = "_blank"; a1.rel = "noopener";
      const a2 = el("a", "minibtn", "🔗 Book"); a2.href = st.web; a2.target = "_blank"; a2.rel = "noopener";
      links.append(a1, a2);
    }
    if (links.children.length) body.appendChild(links);

    if (it.course && COURSES[it.course].tip) body.appendChild(el("p", "note", COURSES[it.course].tip));
    ev.appendChild(body);
    tl.appendChild(ev);
  });
  p.appendChild(tl);
}

/* ---------- Overview ---------- */
function buildOverview() {
  const wrap = $("#overview-days");
  DAYS.forEach(d => {
    const c = el("div", "card");
    c.innerHTML = `
      <div class="tag ${d.risk === "high" ? "amber" : ""}">Dag ${d.n} · ${d.weekday}</div>
      <h3>${d.headline}</h3>
      <p>${d.summary}</p>
      <div style="display:flex;gap:.45rem;flex-wrap:wrap;margin-top:1rem">
        ${d.courses.map(k => `<span class="pill">${COURSES[k].name}</span>`).join("")}
      </div>
      <p class="note">${d.riskNote}</p>`;
    const b = el("button", "minibtn", "Se dag " + d.n + " →");
    b.style.marginTop = "1rem";
    b.onclick = () => show("dag" + d.n);
    c.appendChild(b);
    wrap.appendChild(c);
  });

  const sc = $("#sun-cards");
  DAYS.forEach(d => {
    const s = SUN[d.n];
    const light = mins(s.dusk) - mins(s.dawn);
    sc.appendChild(el("div", "card", `
      <div class="tag blue">Dag ${d.n} · ${d.dateLabel}</div>
      <h3>${s.label}</h3>
      <table style="margin-top:.8rem">
        <tr><td>Civilt gry</td><td class="num">${s.dawn}</td></tr>
        <tr><td>Solopgang</td><td class="num">${s.rise}</td></tr>
        <tr><td>Solnedgang</td><td class="num">${s.set}</td></tr>
        <tr><td>Civilt tusmørke slut</td><td class="num">${s.dusk}</td></tr>
        <tr class="total"><td>Brugbart lys</td><td class="num">${Math.floor(light / 60)}t ${light % 60}m</td></tr>
      </table>`));
  });

  // Route
  const legs = [
    ["Solrød Strand", "Silkeborg Golfklub, Sommervej 50, 8600 Silkeborg", "292 km", "3 t 10 min", "E20 over Storebælt + Silkeborgmotorvejen"],
    ["Silkeborg Golfklub, Sommervej 50, Silkeborg", "Lyngbygaard Golf, Lyngbygårdsvej 29, 8220 Brabrand", "37 km", "25 min", "Silkeborgmotorvejen østpå"],
    ["Lyngbygaard Golf, Brabrand", "Best Western Hotel Royal, Den Røde Plads 10, 7500 Holstebro", "110 km", "1 t 20 min", "Rute 15 via Herning"],
    ["Den Røde Plads 10, 7500 Holstebro", "Holstebro Golfklub Skovbanen, Brandsbjergvej 4, 7570 Vemb", "28 km", "30 min", "Rute 16 mod Vemb"],
    ["Brandsbjergvej 4, 7570 Vemb", "Nordvestjysk Golfklub, Nystrupvej 19, Thisted", "110 km", "1 t 30 min", "Rute 11 gennem Thy, via McDonald's Måbjerg"],
    ["Nystrupvej 19, Thisted", "A Hus, Gatten, 9640 Farsø", "100 km", "1 t 25 min", "Via Aggersundbroen"],
    ["Gatten, 9640 Farsø", "Solrød Strand", "400 km", "4 t 15 min", "E45 + E20 over Storebælt"],
  ];
  const t = el("table");
  t.innerHTML = "<tr><th>Etape</th><th>Rute</th><th class='num'>Distance</th><th class='num'>Tid</th><th></th></tr>" +
    legs.map(([a, b, km, tm, via]) => `<tr>
      <td><strong>${a.split(",")[0]}</strong> → <strong>${b.split(",")[0]}</strong><br><span style="color:var(--muted);font-size:.82rem">${via}</span></td>
      <td></td><td class="num">${km}</td><td class="num">${tm}</td>
      <td class="num"><a class="minibtn" target="_blank" rel="noopener" href="${dirs(a, b)}">Kort</a></td></tr>`).join("") +
    `<tr class="total"><td>I alt</td><td></td><td class="num">1.077 km</td><td class="num">12 t 35 m</td><td></td></tr>`;
  $("#route").appendChild(t);
}

/* ---------- Courses & stays ---------- */
function buildCourses() {
  const wrap = $("#course-cards");
  const order = ["lyngbygaard", "silkeborg", "holstebro", "nordvestjysk", "himmerlandNew", "himmerlandOld"];
  order.forEach((k, i) => {
    const c = COURSES[k];
    const d = i < 2 ? 1 : i < 4 ? 2 : 3;
    wrap.appendChild(el("div", "card", `
      <div class="tag">Dag ${d} · Runde ${i % 2 + 1}</div>
      <h3>${c.name}</h3>
      <p style="color:var(--fair);font-size:.86rem;font-weight:600;margin:.1rem 0 .7rem">${c.course}</p>
      <p>${c.blurb}</p>
      <table style="margin-top:1rem">
        <tr><td>Greenfee</td><td class="num" style="color:var(--fair)">${TRIP.freeGolf ? "Gratis" : kr(c.greenfee)}</td></tr>
        <tr class="sub"><td colspan="2">${TRIP.freeGolf ? "Normalpris " + kr(c.greenfee) + " — " + c.feeNote.toLowerCase() : c.feeNote}</td></tr>
      </table>
      <p class="note">${c.tip}</p>
      <div class="ev-links">
        <a class="minibtn" target="_blank" rel="noopener" href="${maps(c.name + ", " + c.addr)}">📍 ${c.addr}</a>
        <a class="minibtn" target="_blank" rel="noopener" href="${c.web}">🔗 Klubbens side</a>
      </div>`));
  });
}

function buildStays() {
  const wrap = $("#stay-cards");
  [["soepark", "Nat 1 · onsdag 21. okt"], ["himmerland", "Nat 2 · torsdag 22. okt"]].forEach(([k, lbl]) => {
    const s = STAYS[k];
    wrap.appendChild(el("div", "card", `
      <div class="tag ${k === "himmerland" ? "amber" : ""}">${lbl}</div>
      <h3>${s.name}</h3>
      <p style="color:var(--fair);font-size:.86rem;font-weight:600;margin:.1rem 0 .7rem">${s.type}</p>
      <p>${s.blurb}</p>
      <div style="display:flex;gap:.4rem;flex-wrap:wrap;margin:1rem 0">
        ${s.perks.map(p => `<span class="pill">${p}</span>`).join("")}
      </div>
      <table>
        <tr><td>Vejledende pris</td><td class="num">${kr(s.price)}</td></tr>
        <tr class="sub"><td colspan="2">${s.priceNote}</td></tr>
      </table>
      ${s.warnNote ? `<p class="note" style="color:var(--warn);margin-top:.8rem">${s.warnNote}</p>` : ""}
      <div class="ev-links">
        <a class="minibtn" target="_blank" rel="noopener" href="${maps(s.name + ", " + s.addr)}">📍 ${s.addr}</a>
        <a class="minibtn" target="_blank" rel="noopener" href="${s.web}">🔗 Book</a>
      </div>`));
  });
}

/* ---------- Budget ---------- */
const TIERS = {
  lean: { f: 0.8, food: 350, note: "Mad fra supermarked og madlavning i begge hytter. Enkel standard begge nætter." },
  mid: { f: 1, food: 650, note: "Frokost i klubhuset og én middag ude pr. dag. Det realistiske niveau." },
  plus: { f: 1.25, food: 1100, note: "À la carte hver aften, bl.a. i restauranten på HimmerLand, og en større Airbnb-hytte. Buggy vælges separat ovenfor." },
};
let state = { people: 2, cars: 1, tier: "mid", buggyRounds: 6 };

function budget() {
  const T = TIERS[state.tier];
  const { people, cars } = state;

  const listFee = Object.values(COURSES).reduce((a, c) => a + c.greenfee, 0);
  const greenfee = TRIP.freeGolf ? 0 : listFee * T.f;

  // Nat 1 er hotelværelser til 2; nat 2 er et Airbnb-hus, der deles af op til 4.
  const rooms = Math.ceil(people / 2);
  const huts = Math.ceil(people / 4);
  const stayTotal = STAYS.soepark.price * rooms + STAYS.himmerland.price * huts;

  // Kørslen er gratis — kun Storebælt koster.
  const bridge = TRIP.bridgeEachWay * 2 * cars; // 220 kr. pr. vej med BroBizz

  const foodTotal = T.food * people;

  // Buggy: 300 kr. pr. styk pr. runde, én buggy deles af to spillere.
  const buggies = Math.ceil(people / 2);
  const buggyTotal = TRIP.buggyPrice * buggies * state.buggyRounds;

  const grand = greenfee * people + stayTotal + bridge + foodTotal + buggyTotal;

  $("#budget-table").innerHTML = `
    <tr><th>Post</th><th class="num">Pr. person</th><th class="num">I alt</th></tr>
    <tr><td>Greenfee — 6 runder</td><td class="num" style="color:var(--fair)">Gratis</td><td class="num" style="color:var(--fair)">0 kr.</td></tr>
    <tr class="sub"><td colspan="3">I spiller frit. Normalprisen ville have været ${kr(listFee)} pr. person.</td></tr>

    <tr><td>Overnatning — 2 nætter</td><td class="num">${kr(stayTotal / people)}</td><td class="num">${kr(stayTotal)}</td></tr>
    <tr class="sub"><td colspan="3">${rooms} værelse${rooms > 1 ? "r" : ""} på Best Western Holstebro (${kr(STAYS.soepark.price)} pr. stk., 2 pers.) + ${huts} Airbnb-hus (${kr(STAYS.himmerland.price)}, deles af op til 4)</td></tr>

    <tr><td>Storebælt — tur/retur</td><td class="num">${kr(bridge / people)}</td><td class="num">${kr(bridge)}</td></tr>
    <tr class="sub"><td colspan="3">${kr(TRIP.bridgeEachWay)} pr. vej med BroBizz × ${cars} bil${cars > 1 ? "er" : ""} · kørslen er gratis</td></tr>

    <tr><td>Mad og drikke</td><td class="num">${kr(T.food)}</td><td class="num">${kr(foodTotal)}</td></tr>
    ${buggyTotal ? `
    <tr><td>Buggy — ${state.buggyRounds} runde${state.buggyRounds > 1 ? "r" : ""}</td><td class="num">${kr(buggyTotal / people)}</td><td class="num">${kr(buggyTotal)}</td></tr>
    <tr class="sub"><td colspan="3">${kr(TRIP.buggyPrice)} pr. buggy pr. runde × ${buggies} buggy${buggies > 1 ? "er" : ""} — delt mellem ${people > 1 ? "jer" : "dig"}, dvs. ${kr(TRIP.buggyPrice * buggies * state.buggyRounds / people)} pr. person</td></tr>` : ""}

    <tr class="total"><td>I alt</td><td class="num">${kr(grand / people)}</td><td class="num">${kr(grand)}</td></tr>`;

  $("#per-person").innerHTML = kr(grand / people) + "<small>Pr. person i alt</small>";
  $("#grand").innerHTML = kr(grand) + "<small>Samlet for gruppen</small>";
  $("#tier-note").innerHTML = "<b>" + ({ lean: "Nøjsom", mid: "Normal", plus: "Forkælelse" })[state.tier] + ":</b> " + T.note;
  $("#lbl-people").textContent = people;
  $("#lbl-cars").textContent = cars;
  $("#lbl-buggy").textContent = state.buggyRounds + " af 6";

  const buggyNotes = {
    0: "Alt til fods. Billigst, men dag 1 og 2 slutter under 10 minutter før solnedgang — der er ingen tid at tabe.",
    1: "Én buggy: tag den på Nordvestjysk om eftermiddagen dag 2. Det er turens strammeste runde, i klitter og modvind.",
    2: "Anbefalet: eftermiddagsrunderne dag 1 og 2 — de to runder, der rammer solnedgangen. 36 huller til fods dagligt koster tempo sidst på runden.",
    6: "Buggy på alle seks runder — jeres valg. Med 108 huller på tre dage er det ikke dovenskab, men udholdenhed. Det køber samtidig tempo på de to runder, der slutter tættest på solnedgang.",
  };
  $("#buggy-note").textContent =
    buggyNotes[state.buggyRounds] ||
    `Buggy på ${state.buggyRounds} af turens 6 runder. Prioritér eftermiddagsrunderne dag 1 og 2 — de rammer solnedgangen tættest.`;
}

function wireBudget() {
  $("#people").oninput = e => {
    state.people = +e.target.value;
    const maxCars = Math.max(1, Math.ceil(state.people / 2));
    $("#cars").max = maxCars;
    if (state.cars > maxCars) state.cars = +($("#cars").value = maxCars);
    budget();
  };
  $("#cars").oninput = e => { state.cars = +e.target.value; budget(); };
  $("#buggy").oninput = e => { state.buggyRounds = +e.target.value; budget(); };
  $("#tier").querySelectorAll("button").forEach(b => {
    b.onclick = () => {
      state.tier = b.dataset.tier;
      $("#tier").querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
      budget();
    };
  });
  budget();
}

/* ---------- Checklists ---------- */
function checklist(container, bar, key, groups) {
  const saved = JSON.parse(localStorage.getItem(key) || "{}");
  let total = 0;

  const update = () => {
    const done = Object.values(saved).filter(Boolean).length;
    bar.style.width = total ? (done / total * 100) + "%" : "0";
  };

  groups.forEach(g => {
    const card = el("div", "card");
    card.appendChild(el("div", "tag", g.cat));
    g.items.forEach(item => {
      const id = g.cat + "::" + (item.task || item);
      total++;
      const lab = el("label", "check");
      const cb = el("input"); cb.type = "checkbox"; cb.checked = !!saved[id];
      cb.onchange = () => { saved[id] = cb.checked; localStorage.setItem(key, JSON.stringify(saved)); update(); };
      lab.appendChild(cb);
      lab.appendChild(el("span", null, item.task
        ? `<strong>${item.task}</strong><br><span style="color:var(--muted);font-size:.84rem">${item.why}</span>`
        : item));
      card.appendChild(lab);
    });
    container.appendChild(card);
  });
  update();
}

function buildPrep() {
  const byWhen = {};
  PREP.forEach(p => { (byWhen[p.when] ||= []).push(p); });
  const groups = Object.entries(byWhen).map(([cat, items]) => ({ cat, items }));
  checklist($("#prep-cards"), $("#prep-bar"), "golf26-prep", groups);
  checklist($("#pack-cards"), $("#pack-bar"), "golf26-pack", PACKING);
}

/* ---------- Init ---------- */
buildNav();
buildOverview();
DAYS.forEach(buildDay);
buildCourses();
buildStays();
wireBudget();
buildPrep();
countdown();

const initial = location.hash.slice(1);
show(TABS.some(t => t.id === initial) ? initial : "overblik");
window.addEventListener("hashchange", () => {
  const h = location.hash.slice(1);
  if (TABS.some(t => t.id === h)) show(h);
});
