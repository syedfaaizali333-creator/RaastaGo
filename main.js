/* RAASTAGO — Complete Road Information | Framework-free frontend */
document.addEventListener("DOMContentLoaded", () => {
  injectSharedLayout();
  setActiveNav();
  setupMobileNav();
  setupRouteForms();
  setupGlobalActions();
  setupPage();
});

function injectSharedLayout(){
  const header = document.querySelector("#site-header");
  const footer = document.querySelector("#site-footer");

  if(header) header.innerHTML = `
    <header class="navbar-wrap">
      <nav class="navbar container" aria-label="Primary navigation">
        <a class="brand" href="index.html" aria-label="RAASTAGO home">
          <span class="brand-mark"><span class="road-line"></span><span class="road-line road-line-2"></span><span class="brand-dot"></span></span>
          <span><strong>RAASTAGO</strong><small>COMPLETE ROAD INFORMATION</small></span>
        </a>
        <button class="mobile-menu-btn" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav">☰</button>
        <div class="desktop-nav">
          <a href="index.html" data-nav="home">Home</a>
          <a href="live-traffic.html" data-nav="traffic">Live Traffic</a>
          <a href="find-route.html" data-nav="route">Find Route</a>
          <a href="reports.html" data-nav="reports">Reports</a>
          <a href="safety-guide.html" data-nav="safety">Safety Guide</a>
          <a href="about.html" data-nav="about">About</a>
          <a href="login.html" class="login-link">Login</a>
          <a href="report.html" class="btn btn-danger btn-sm">⚠ Report Problem</a>
        </div>
      </nav>
      <div id="mobile-nav" class="mobile-nav container">
        <a href="index.html">Home</a><a href="live-traffic.html">Live Traffic</a><a href="find-route.html">Find Route</a><a href="reports.html">Reports</a><a href="report.html">Report Problem</a><a href="safety-guide.html">Safety Guide</a><a href="about.html">About</a><a href="login.html">Login</a>
      </div>
    </header>`;

  if(footer) footer.innerHTML = `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div class="footer-brand">
          <div class="brand footer-brand-mark"><span class="brand-mark"><span class="road-line"></span><span class="road-line road-line-2"></span><span class="brand-dot"></span></span><strong>RAASTAGO</strong></div>
          <p class="footer-tagline">See the Road Ahead.</p>
          <p>Complete road information for smarter travel decisions, including traffic conditions, route comparisons and community road reports.</p>
          <div class="socials"><a href="#" aria-label="Facebook">f</a><a href="#" aria-label="X">𝕏</a><a href="#" aria-label="Instagram">◎</a><a href="#" aria-label="LinkedIn">in</a></div>
        </div>
        <div><h3>Product</h3><a href="index.html">Home</a><a href="live-traffic.html">Live Traffic</a><a href="find-route.html">Find Route</a><a href="route-results.html">Route Results</a></div>
        <div><h3>Community</h3><a href="reports.html">Reports</a><a href="report.html">Report Problem</a><a href="safety-guide.html">Safety Guide</a><a href="dashboard.html">Dashboard</a></div>
        <div><h3>Company</h3><a href="about.html">About</a><a href="about.html">Privacy Policy</a><a href="about.html">Terms</a><a href="about.html">Contact</a></div>
      </div>
      <div class="footer-bottom"><div class="container"><span>© 2026 RAASTAGO. All rights reserved.</span><span>Demonstration data shown. Not live traffic information.</span></div></div>
    </footer>`;
}

function setActiveNav(){
  const p = location.pathname.split("/").pop() || "index.html";
  let key = "home";
  if(p.includes("traffic")) key="traffic";
  else if(p.includes("find-route") || p.includes("route-results")) key="route";
  else if(p === "reports.html" || p === "report.html") key="reports";
  else if(p.includes("safety")) key="safety";
  else if(p.includes("about")) key="about";
  document.querySelectorAll("[data-nav]").forEach(a => a.classList.toggle("active", a.dataset.nav===key));
}

function setupMobileNav(){
  const b=document.querySelector(".mobile-menu-btn"), n=document.querySelector("#mobile-nav");
  if(!b||!n)return;
  b.addEventListener("click",()=>{
    const open=n.classList.toggle("open");
    b.setAttribute("aria-expanded",String(open));
    b.textContent=open?"✕":"☰";
  });
}

function setupRouteForms(){
  document.querySelectorAll("[data-route-form]").forEach(form=>{
    form.addEventListener("submit", e=>{
      e.preventDefault();
      const from=form.querySelector("[name=from]")?.value.trim();
      const to=form.querySelector("[name=to]")?.value.trim();
      const err=form.querySelector(".form-error");
      if(!from||!to){
        if(err) err.textContent="Please enter both a starting location and a destination.";
        return;
      }
      if(err) err.textContent="";
      window.location.href=`route-results.html?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;
    });
  });
}

function setupGlobalActions(){
  document.querySelectorAll("[data-use-location]").forEach(btn=>btn.addEventListener("click",()=>{
    if(!navigator.geolocation){
      alert("Location is not supported by this browser. Please enter your location manually.");
      return;
    }
    btn.disabled=true;
    const original=btn.textContent;
    btn.textContent="Locating...";
    navigator.geolocation.getCurrentPosition(pos=>{
      btn.disabled=false;
      btn.textContent=original;
      const input=btn.closest(".location-wrap")?.querySelector("input");
      if(input){
        input.value=`${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`;
        input.dispatchEvent(new Event("input",{bubbles:true}));
      }
    },()=>{
      btn.disabled=false;
      btn.textContent=original;
      alert("We couldn't access your location. Please enter it manually.");
    },{enableHighAccuracy:true,timeout:10000});
  }));
}

function setupPage(){
  const page=document.body.dataset.page;
  if(page==="home") initHome();
  if(page==="find-route") initFindRoute();
  if(page==="route-results") initRouteResults();
  if(page==="traffic") initTraffic();
  if(page==="reports") initReports();
  if(page==="report") initReport();
  if(page==="login") initLogin();
  if(page==="dashboard") initDashboard();
  if(page==="safety") initSafety();
  if(page==="about") initAbout();
}

function mapCenterFromOptions(opts={}){
  if(opts.center) return opts.center;
  if(opts.city && CITY_COORDS[opts.city]) return CITY_COORDS[opts.city];
  const text=`${opts.from||""} ${opts.to||""}`.toLowerCase();
  for(const city of Object.keys(CITY_COORDS)){
    if(text.includes(city.toLowerCase())) return CITY_COORDS[city];
  }
  return CITY_COORDS.Karachi;
}

function renderMap(container, opts={}){
  if(!container) return;
  if(container._leafletMap){
    try{container._leafletMap.remove();}catch{}
    container._leafletMap=null;
  }
  container.innerHTML="";

  // Real interactive map when Leaflet is available.
  if(window.L){
    const center=mapCenterFromOptions(opts);
    const map=L.map(container,{scrollWheelZoom:true,zoomControl:true}).setView(center,opts.zoom||12);
    container._leafletMap=map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
      maxZoom:19,
      attribution:'&copy; OpenStreetMap contributors'
    }).addTo(map);

    const trafficColors={clear:"#16A34A",moderate:"#F59E0B",heavy:"#DC2626",closed:"#1F2937"};
    const corridorLines=[
      [[24.842,66.997],[24.858,67.015],[24.874,67.045],[24.890,67.078]],
      [[24.895,67.010],[24.885,67.040],[24.875,67.075],[24.868,67.108]],
      [[24.815,67.020],[24.830,67.045],[24.845,67.070],[24.862,67.100]],
      [[24.922,67.080],[24.915,67.110],[24.930,67.140],[24.945,67.165]]
    ];
    const levels=["clear","moderate","heavy","closed"];
    corridorLines.forEach((line,i)=>{
      L.polyline(line,{color:trafficColors[levels[i]],weight:i===2?7:6,opacity:.82,dashArray:i===3?"10 8":null}).addTo(map);
    });

    const incidentData=[
      {coords:[24.9207,67.1370],icon:"🚧",title:"Construction — Main University Road",tone:"moderate"},
      {coords:[24.8138,67.0305],icon:"🚨",title:"Accident — Clifton Bridge ramp",tone:"heavy"},
      {coords:[24.8312,67.0917],icon:"💧",title:"Flooding — Korangi Road underpass",tone:"heavy"},
      {coords:[31.4970,74.3270],icon:"🚦",title:"Signal problem — Kalma Chowk, Lahore",tone:"moderate"},
      {coords:[33.7077,73.0500],icon:"🕳️",title:"Pothole — Jinnah Avenue, Islamabad",tone:"moderate"}
    ];

    const iconFor=(emoji)=>{
      return L.divIcon({
        className:"raastago-marker",
        html:`<span>${emoji}</span>`,
        iconSize:[38,38],
        iconAnchor:[19,19],
        popupAnchor:[0,-18]
      });
    };

    if(opts.mode==="traffic"){
      Object.entries(CITY_COORDS).forEach(([city,coords])=>{
        L.circleMarker(coords,{radius:5,color:"#0B1F33",weight:2,fillColor:"#16A34A",fillOpacity:.9}).addTo(map)
          .bindTooltip(city,{direction:"top",offset:[0,-6]});
      });
      incidentData.forEach(i=>{
        if(i.coords[0]>30 && !opts.includeFarCities) return;
        L.marker(i.coords,{icon:iconFor(i.icon)}).addTo(map).bindPopup(`<b>${escapeHtml(i.title)}</b><br><small>Demonstration community report</small>`);
      });
      map.setView([28.5,69.0],5.5);
    } else if(opts.mode==="reports"){
      const reports=opts.reports||allReports();
      const points=[];
      reports.forEach(r=>{
        const coords=REPORT_COORDS[r.location]||CITY_COORDS[r.city]||CITY_COORDS.Karachi;
        points.push(coords);
        const meta=REPORT_META[r.type]||REPORT_META.other;
        L.marker(coords,{icon:iconFor(meta.icon)}).addTo(map).bindPopup(
          `<b>${escapeHtml(meta.label)}</b><br>${escapeHtml(r.location)}<br><small>${escapeHtml(r.status||"review")} · ${escapeHtml(r.reportedAt||"Recently")}</small>`
        );
      });
      if(points.length){
        map.fitBounds(points,{padding:[25,25],maxZoom:12});
      }
    } else if(opts.mode==="report"){
      const marker=L.marker(center,{draggable:true,icon:iconFor("📍")}).addTo(map).bindPopup("Selected report location").openPopup();
      container._reportMarker=marker;
      map.on("click",(e)=>{
        marker.setLatLng(e.latlng).openPopup();
        const input=document.querySelector('#report-form [name="location"]');
        if(input) input.value=`${e.latlng.lat.toFixed(5)}, ${e.latlng.lng.toFixed(5)}`;
      });
    } else {
      const route=[[24.842,66.997],[24.858,67.015],[24.874,67.045],[24.890,67.078],[24.905,67.110]];
      L.polyline(route,{color:"#ffffff",weight:11,opacity:.95}).addTo(map);
      L.polyline(route,{color:"#16A34A",weight:6,opacity:1}).addTo(map);
      L.marker(route[0],{icon:iconFor("●")}).addTo(map).bindPopup("Starting point");
      L.marker(route[route.length-1],{icon:iconFor("🏁")}).addTo(map).bindPopup("Recommended destination");
      incidentData.slice(0,4).forEach(i=>{
        if(i.coords[0]>30) return;
        L.marker(i.coords,{icon:iconFor(i.icon)}).addTo(map).bindPopup(`<b>${escapeHtml(i.title)}</b>`);
      });
    }

    const caption=document.createElement("div");
    caption.className="map-caption";
    caption.textContent=opts.caption||"Interactive road map • demonstration traffic data";
    container.appendChild(caption);
    setTimeout(()=>map.invalidateSize(),100);
    return;
  }

  // Offline fallback: always visible, never blank.
  const incidents=[
    {x:26,y:30,icon:"🚧",label:"Construction — Main University Road",tone:"moderate"},
    {x:62,y:22,icon:"🚨",label:"Accident — Clifton Bridge ramp",tone:"heavy"},
    {x:45,y:66,icon:"💧",label:"Flooding — Korangi Road underpass",tone:"heavy"},
    {x:76,y:55,icon:"🚦",label:"Signal problem — Kalma Chowk",tone:"moderate"},
    {x:16,y:62,icon:"🕳️",label:"Pothole — Jinnah Avenue",tone:"moderate"}
  ];
  container.innerHTML=`<div class="map-grid">
    <div class="map-label city-karachi">Karachi</div><div class="map-label city-lahore">Lahore</div><div class="map-label city-islamabad">Islamabad</div>
    <div class="map-road road-h heavy"></div><div class="map-road road-h moderate r2"></div>
    <div class="map-road road-v clear"></div><div class="map-road road-v moderate r3"></div>
    <div class="map-road road-diag clear"></div><div class="map-road road-closed"></div>
    ${opts.showRoute===false?"":'<div class="recommended-route"></div><div class="map-pin start">● Start</div><div class="map-pin destination">● RAASTAGO</div>'}
    ${incidents.map(i=>`<button class="incident ${i.tone}" style="left:${i.x}%;top:${i.y}%" title="${i.label}">${i.icon}</button>`).join("")}
    <span class="map-caption">${opts.caption||"Offline demonstration map — not live traffic data"}</span>
  </div>`;
}

function trafficBadge(level,label){
  const labels={clear:"Clear",moderate:"Moderate",heavy:"Heavy",closed:"Closed"};
  return `<span class="traffic-badge ${level}"><i></i>${label||labels[level]}</span>`;
}

function initHome(){
  renderMap(document.querySelector("#home-map"),{caption:"Pakistan route preview • demonstration traffic data"});
  const stats=document.querySelector("#home-stats");
  if(stats) stats.innerHTML=`<div><small>Active reports</small><strong>${TRAFFIC_STATS.activeReports}</strong></div><div><small>Clear roads</small><strong>${TRAFFIC_STATS.clear}%</strong></div><div><small>Cities covered</small><strong>${CITIES.length}</strong></div>`;
  const list=document.querySelector("#corridor-list");
  if(list) list.innerHTML=CORRIDORS.slice(0,5).map(c=>`<li><div><b>${c.name}</b><small>${c.city} · Avg speed ${c.speed} · Delay ${c.delay}</small></div>${trafficBadge(c.level)}</li>`).join("");
}

function initFindRoute(){
  const form=document.querySelector("#find-route-form");
  form?.addEventListener("submit",e=>{
    e.preventDefault();
    const from=form.from.value.trim(),to=form.to.value.trim(),err=form.querySelector(".form-error"),btn=form.querySelector("button[type=submit]");
    if(!from||!to){err.textContent=!from?"Please enter a starting point.":"Please enter a destination.";return;}
    err.textContent="";btn.disabled=true;btn.innerHTML="⏳ Finding your better route...";
    setTimeout(()=>location.href=`route-results.html?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`,700);
  });
  renderMap(document.querySelector("#find-map"),{caption:"Route planning map • demonstration traffic data"});
}

function initRouteResults(){
  const params=new URLSearchParams(location.search),from=params.get("from"),to=params.get("to");
  const q=document.querySelector("#route-query");
  if(q) q.innerHTML=`<span>📍</span><b>${escapeHtml(from||"Starting point")}</b><span>↔</span><b>${escapeHtml(to||"Destination")}</b>`;
  const empty=document.querySelector("#route-empty"), loading=document.querySelector("#route-loading"), content=document.querySelector("#route-content");
  if(!from||!to){empty.hidden=false;return;}
  loading.hidden=false;
  setTimeout(()=>{
    loading.hidden=true;
    content.hidden=false;
    renderMap(document.querySelector("#results-map"),{from,to,caption:"Recommended route preview • demonstration data"});
    renderRoutes();
  },650);
}

function renderRoutes(){
  const wrap=document.querySelector("#route-cards");
  if(!wrap)return;
  wrap.innerHTML=ROUTES.map(r=>`
    <article class="route-card ${r.kind}">
      <div class="route-head"><div><div class="route-title">${r.kind==="recommended"?'<span class="best-choice">★ Best Choice</span>':""}<h3>${r.kind==="recommended"?"⭐ ":""}${r.name}</h3><p>via ${r.via.join(" → ")}</p></div>${trafficBadge(r.traffic,r.trafficLabel)}</div>
      <div class="metrics"><div><small>Travel Time</small><strong>${r.time}</strong></div><div><small>Distance</small><strong>${r.distance}</strong></div><div><small>Traffic</small><strong>${r.trafficLabel}</strong></div><div><small>Estimated Delay</small><strong>${r.delay}</strong></div></div>
      <ul class="notes">${r.notes.map(n=>`<li>${n}</li>`).join("")}</ul>
      ${r.warning?`<p class="warning">⚠ ${r.warning}</p>`:""}
      <div class="route-actions"><button class="btn ${r.kind==="recommended"?"btn-primary":"btn-outline"}" onclick="selectRoute('${r.id}')">${r.kind==="recommended"?"Start Navigation":r.kind==="avoid"?"View Details":"View Route"} →</button><a class="btn btn-ghost" href="live-traffic.html">See on live map</a></div>
    </article>`).join("");
}
window.selectRoute=(id)=>{
  const r=ROUTES.find(x=>x.id===id);
  if(r) alert(`${r.name} selected — ${r.time}, ${r.distance}. This is a demonstration navigation action.`);
};

function initTraffic(){
  renderMap(document.querySelector("#traffic-map"),{mode:"traffic",caption:"Pakistan traffic overview • demonstration data"});
  const list=document.querySelector("#corridors");
  const filters=document.querySelector("#traffic-filters");
  const filter=(type)=>{
    if(!list)return;
    list.innerHTML=CORRIDORS.filter(c=>type==="all"||c.level===type).map(c=>`<li><div><b>${c.name}</b><small>${c.city} · Avg speed ${c.speed} · Delay ${c.delay}</small></div>${trafficBadge(c.level)}</li>`).join("") || `<li class="empty-state"><b>No corridors match this filter.</b></li>`;
  };
  filter("all");
  filters?.querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{
    filters.querySelectorAll("button").forEach(x=>x.classList.remove("selected"));
    b.classList.add("selected");
    filter(b.dataset.filter);
  }));
}

function getReports(){
  try{return JSON.parse(localStorage.getItem("raastagoReports")||"[]");}catch{return [];}
}
function saveReport(r){
  const all=getReports();
  all.unshift(r);
  localStorage.setItem("raastagoReports",JSON.stringify(all));
}
function allReports(){return [...getReports(),...MOCK_REPORTS];}

function reportCard(r,confirmable=true){
  const m=REPORT_META[r.type]||REPORT_META.other,s=STATUS_META[r.status]||STATUS_META.review;
  return `<article class="report-card"><div class="report-top"><div class="report-title"><span class="report-icon">${m.icon}</span><div><h3>${m.label}</h3><p>📍 ${escapeHtml(r.location)}, ${escapeHtml(r.city)}</p></div></div><span class="status ${r.status}"><i></i>${s.label}</span></div><p class="report-desc">${escapeHtml(r.description)}</p><div class="photo-placeholder">Photo placeholder</div><div class="report-meta"><span>🕒 ${escapeHtml(r.reportedAt)}</span><span>👤 ${escapeHtml(r.reporter)}</span><span>👍 ${r.confirmations} users confirmed</span>${r.delay?`<span class="delay">Delay ${escapeHtml(r.delay)}</span>`:""}</div><div class="report-actions"><a class="btn btn-outline btn-sm" href="live-traffic.html">View on Map</a>${confirmable?`<button class="btn btn-primary btn-sm confirm-btn" data-id="${r.id}">👍 Confirm</button>`:""}</div></article>`;
}

function populateReportOptions(){
  const type=document.querySelector('#report-form [name="type"]');
  const city=document.querySelector('#report-form [name="city"]');
  if(type) type.innerHTML=`<option value="">Select a problem type</option>`+REPORT_TYPES.map(t=>`<option value="${t.value}">${t.icon} ${t.label}</option>`).join("");
  if(city) city.innerHTML=CITIES.map(c=>`<option value="${c}">${c}</option>`).join("");
}

function initReports(){
  const grid=document.querySelector("#reports-grid"), search=document.querySelector("#report-search"), city=document.querySelector("#report-city"), type=document.querySelector("#report-type"), count=document.querySelector("#report-count");
  if(!grid)return;
  city.innerHTML=`<option value="all">All cities</option>`+CITIES.map(c=>`<option value="${c}">${c}</option>`).join("");
  type.innerHTML=`<option value="all">All types</option>`+REPORT_TYPES.map(t=>`<option value="${t.value}">${t.icon} ${t.label}</option>`).join("");
  let activeStatus="all";
  const statusWrap=document.querySelector("#status-filters");

  const render=()=>{
    const q=(search?.value||"").toLowerCase().trim(),c=city.value,t=type.value;
    const visible=allReports().filter(r=>(c==="all"||r.city===c)&&(t==="all"||r.type===t)&&(activeStatus==="all"||r.status===activeStatus)&&(!q||`${r.location} ${r.description} ${r.city}`.toLowerCase().includes(q)));
    count.textContent=`Showing ${visible.length} of ${allReports().length} reports.`;
    grid.innerHTML=visible.length?visible.map(r=>reportCard(r)).join(""):`<div class="empty-state"><h2>No traffic reports match your filters.</h2><p>Try a different city or problem type, or add the first report for this area.</p><a class="btn btn-primary" href="report.html">Report Problem</a></div>`;
    grid.querySelectorAll(".confirm-btn").forEach(btn=>btn.addEventListener("click",()=>{
      const reports=getReports(), local=reports.find(x=>x.id===btn.dataset.id);
      if(local){
        local.confirmations++;
        localStorage.setItem("raastagoReports",JSON.stringify(reports));
      } else {
        const mock=MOCK_REPORTS.find(x=>x.id===btn.dataset.id);
        if(mock) mock.confirmations++;
      }
      btn.textContent="✓ Confirmed";
      btn.disabled=true;
      btn.classList.remove("btn-primary");
      btn.classList.add("btn-secondary");
    }));
    renderMap(document.querySelector("#reports-map"),{mode:"reports",reports:visible,caption:"Community report map • demonstration data"});
  };

  [search,city,type].forEach(x=>x?.addEventListener("input",render));
  statusWrap?.querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{
    statusWrap.querySelectorAll("button").forEach(x=>x.classList.remove("selected"));
    b.classList.add("selected");
    activeStatus=b.dataset.status;
    render();
  }));
  render();
}

function initReport(){
  const form=document.querySelector("#report-form");
  if(!form)return;
  populateReportOptions();
  renderMap(document.querySelector("#report-map"),{mode:"report",city:"Karachi",caption:"Click the map to pin the reported location"});
  const type=form.querySelector("[name=type]"),loc=form.querySelector("[name=location]"),city=form.querySelector("[name=city]"),desc=form.querySelector("[name=description]"),file=form.querySelector("[name=photo]"),err=form.querySelector(".form-error"),success=document.querySelector("#report-success"),content=document.querySelector("#report-content"),count=form.querySelector(".char-count"),fileName=form.querySelector(".file-name");
  desc.addEventListener("input",()=>count.textContent=`${desc.value.length}/500`);
  file.addEventListener("change",()=>{
    if(file.files[0]){
      if(file.files[0].size>5*1024*1024){
        err.textContent="Photo must be 5 MB or smaller.";
        file.value="";
        return;
      }
      fileName.textContent=file.files[0].name;
    }
  });
  form.addEventListener("submit",e=>{
    e.preventDefault();
    err.textContent="";
    if(!type.value){err.textContent="Please select a problem type.";type.focus();return;}
    if(!loc.value.trim()){err.textContent="Please enter a location.";loc.focus();return;}
    if(desc.value.trim().length<10){err.textContent="Please provide at least 10 characters describing the problem.";desc.focus();return;}
    const report={id:"user-"+Date.now(),type:type.value,location:loc.value.trim(),city:city.value,reportedAt:"Just now",status:"review",description:desc.value.trim(),confirmations:0,reporter:"You"};
    saveReport(report);
    content.hidden=true;
    success.hidden=false;
  });
}

function initLogin(){
  const city=document.querySelector('#auth-form [name="city"]');
  if(city) city.innerHTML=CITIES.map(c=>`<option value="${c}">${c}</option>`).join("");
  const tabs=document.querySelectorAll("[data-auth-mode]"),form=document.querySelector("#auth-form");
  if(!form)return;
  const name=form.querySelector("[name=name]"),password=form.querySelector("[name=password]"),email=form.querySelector("[name=email]"),submit=form.querySelector("[type=submit]"),heading=document.querySelector("#auth-heading"),nameWrap=document.querySelector("#name-wrap"),cityWrap=document.querySelector("#city-wrap"),err=form.querySelector(".form-error");
  function mode(m){
    tabs.forEach(t=>t.classList.toggle("selected",t.dataset.authMode===m));
    document.querySelector("#auth-mode").value=m;
    nameWrap.hidden=cityWrap.hidden=m==="login";
    heading.textContent=m==="login"?"Welcome back":"Create your account";
    submit.textContent=m==="login"?"Login":"Create Account";
    err.textContent="";
  }
  tabs.forEach(t=>t.addEventListener("click",()=>mode(t.dataset.authMode)));
  form.addEventListener("submit",e=>{
    e.preventDefault();
    err.textContent="";
    if(!email.value.includes("@")){err.textContent="Please enter a valid email address.";return;}
    if(password.value.length<8){err.textContent="Password must be at least 8 characters.";return;}
    if(document.querySelector("#auth-mode").value==="register" && !name.value.trim()){err.textContent="Please enter your name.";return;}
    alert(document.querySelector("#auth-mode").value==="login"?"Login demonstration complete.":"Account registration demonstration complete.");
  });
  mode("login");
}

function initDashboard(){
  renderMap(document.querySelector("#dashboard-map"),{mode:"traffic",caption:"Dashboard traffic overview • demonstration data"});
  const my=document.querySelector("#my-reports");
  if(my)my.innerHTML=getReports().length?getReports().map(r=>reportCard(r,false)).join(""):`<div class="empty-state"><p class="font-semibold">You haven't reported anything yet.</p><p>Your reports help other commuters avoid blocked and flooded roads.</p><a class="btn btn-primary" href="report.html">Report Problem</a></div>`;
  const saved=document.querySelector("#saved-routes");
  if(saved)saved.innerHTML=SAVED_ROUTES.map(s=>`<li class="surface-card saved-route"><b>🔖 ${escapeHtml(s.name)}</b><span>${escapeHtml(s.origin)} → ${escapeHtml(s.destination)}</span><small>Typical time ${escapeHtml(s.time)}</small><a class="btn btn-outline btn-sm" href="route-results.html?from=${encodeURIComponent(s.origin)}&to=${encodeURIComponent(s.destination)}">Check now</a></li>`).join("");
  const recent=document.querySelector("#recent-searches");
  if(recent)recent.innerHTML=RECENT_SEARCHES.map(q=>`<li><a href="route-results.html?from=${encodeURIComponent(q.origin)}&to=${encodeURIComponent(q.destination)}"><b>${escapeHtml(q.origin)} → ${escapeHtml(q.destination)}</b><small>${escapeHtml(q.when)}</small></a></li>`).join("");
  const notes=document.querySelector("#notifications");
  if(notes)notes.innerHTML=NOTIFICATIONS.map(n=>`<li><p>${escapeHtml(n.text)}</p><small>${escapeHtml(n.time)}</small></li>`).join("");
}

function initSafety(){
  const g=document.querySelector("#safety-grid");
  if(!g)return;
  g.innerHTML=SAFETY_GUIDES.map(x=>`<article class="safety-card"><span class="safety-icon">${x.icon}</span><h2>${escapeHtml(x.title)}</h2><p>${escapeHtml(x.summary)}</p><ul>${x.tips.map(t=>`<li>${escapeHtml(t)}</li>`).join("")}</ul><div class="warning-box">⚠ ${escapeHtml(x.warning)}</div></article>`).join("");
}

function initAbout(){
  renderMap(document.querySelector("#about-map"),{mode:"traffic",caption:"Map coverage preview • demonstration data"});
}

function escapeHtml(s){
  return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
}
