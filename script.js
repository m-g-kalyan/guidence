
/* ------------------------------
   Navigation & Theme
------------------------------ */
const sections = document.querySelectorAll(".content-section");
document.querySelectorAll(".nav-link").forEach(btn => {
  btn.addEventListener("click", () => {
    const id = btn.dataset.section;
    sections.forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
    if(id === "courses"){ requestIdleCallback(renderCards); }
  });
});
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
});

/* ------------------------------
   Data: 30 Technologies (2019–2025)
   popularity: 0–100 index (illustrative dataset)
------------------------------ */
const YEARS = [2019, 2020, 2021, 2022, 2023, 2024, 2025];
const TECH = [
  {name:"React", cat:"Web", pop:[70,75,80,86,88,90,91],
   roadmap:["HTML/CSS","JS (ES6+)","React Core & Hooks","State Mgmt (Redux/Zustand)","Routing & Forms","Testing (RTL/Jest)","SSR (Next.js)","Perf & Accessibility"],
   careers:["Frontend Dev","Full‑Stack Dev","UI Engineer","Web Performance Eng"],
   trends:["Server Components","RSC + Edge","Type‑safe APIs (tRPC)","Design Systems"]},
  {name:"Angular", cat:"Web", pop:[55,57,60,62,64,66,67],
   roadmap:["TS Fundamentals","Angular CLI","Components & RxJS","Routing & Forms","State Mgmt (NgRx)","Testing","SSR (Angular Universal)","Micro‑frontends"],
   careers:["Frontend Dev","Enterprise Web Dev","UI Engineer"],
   trends:["Standalone APIs","Signals","Zone‑less rendering"]},
  {name:"Vue", cat:"Web", pop:[45,50,58,60,63,65,66],
   roadmap:["JS/TS","Vue Core & SFC","Pinia/Vuex","Vue Router","Testing","SSR (Nuxt)","Animations","Best Practices"],
   careers:["Frontend Dev","Full‑Stack (Nuxt)"],
   trends:["Vue 3 ecosystem","Vite tooling","Islands architecture"]},
  {name:"Node.js", cat:"Backend", pop:[60,65,70,76,80,82,84],
   roadmap:["JS/TS","Node Core","Express/Fastify","Auth & Security","Databases (SQL/NoSQL)","Testing","Scalability","CI/CD"],
   careers:["Backend Dev","Full‑Stack Dev","Platform Eng"],
   trends:["Bun/Deno interop","Edge runtimes","Workers/Queues"]},
  {name:"Django", cat:"Backend", pop:[48,50,53,56,58,60,61],
   roadmap:["Python","Django ORM","Templates/Rest","Auth","Testing","Async","Channels","Deploy"],
   careers:["Backend Dev","Full‑Stack Dev"],
   trends:["ASGI adoption","HTMX/Alpine","Pydantic models"]},
  {name:"Spring Boot", cat:"Backend", pop:[62,64,66,70,73,76,78],
   roadmap:["Java","Spring Core","Spring Boot","Data JPA","Security","Testing","Microservices","Observability"],
   careers:["Backend Dev","Microservices Eng"],
   trends:["Native images","Virtual threads","Kubernetes‑native"]},
  {name:"Kubernetes", cat:"DevOps", pop:[40,50,60,70,78,83,86],
   roadmap:["Containers","YAML/Manifests","Services/Ingress","Helm/Kustomize","Operators","Security","Observability","GitOps"],
   careers:["DevOps Eng","Platform Eng","SRE"],
   trends:["eBPF","GitOps maturity","Serverless K8s"]},
  {name:"Docker", cat:"DevOps", pop:[65,72,78,82,84,86,87],
   roadmap:["Images","Dockerfile","Networking","Compose","Multi‑stage","Security","Registries","CI/CD"],
   careers:["DevOps Eng","Platform Eng","Developer Productivity"],
   trends:["Slim images","SBOMs","Supply‑chain security"]},
  {name:"AWS", cat:"Cloud", pop:[70,74,77,80,83,86,88],
   roadmap:["IAM","EC2/S3","RDS/DynamoDB","Lambda","VPC","CloudWatch","CDK/Terraform","Well‑Architected"],
   careers:["Cloud Architect","DevOps Eng","Solutions Architect"],
   trends:["Serverless first","Edge/CloudFront","Generative AI on cloud"]},
  {name:"Azure", cat:"Cloud", pop:[55,60,64,68,72,76,79],
   roadmap:["Identity","Compute/Storage","SQL/Cosmos","Functions","VNet","Monitor","Bicep/Terraform","Security"],
   careers:["Cloud Engineer","Data Engineer"],
   trends:["Hybrid cloud","AI Studio","Arc/Kubernetes"]},
  {name:"GCP", cat:"Cloud", pop:[40,45,52,58,64,70,73],
   roadmap:["IAM","GCE/GCS","BigQuery","Cloud Run","VPC","Cloud Logging","Terraform","Security"],
   careers:["Data Eng","Cloud Eng"],
   trends:["Serverless containers","Vertex AI","Data cloud"]},
  {name:"Python", cat:"Data", pop:[78,82,86,90,92,94,95],
   roadmap:["Syntax/Stdlib","Pandas/Numpy","APIs/Flask","Testing","Packaging","Async","Data/ML","Deploy"],
   careers:["Data Analyst","Backend Dev","ML Eng"],
   trends:["Type hints","Async data","PyTorch/TF tooling"]},
  {name:"R", cat:"Data", pop:[30,34,38,41,43,44,45],
   roadmap:["R basics","Tidyverse","Viz","Stats","ML","Reporting","Shiny","Deploy"],
   careers:["Data Analyst","Biostatistician"],
   trends:["Reproducible pipelines","Shiny apps"]},
  {name:"SQL", cat:"Data", pop:[82,84,86,88,90,92,93],
   roadmap:["Relational basics","Joins/Aggs","Window funcs","Modeling","Perf","ETL/ELT","DBT","Ops"],
   careers:["Data Eng","BI Eng","Analyst"],
   trends:["Lakehouse","Vector DB joins","HTAP"]},
  {name:"TensorFlow", cat:"AI/ML", pop:[50,55,60,58,57,58,59],
   roadmap:["Python","Tensors","Keras","CNN/RNN","Serving","TPU","MLOps","Tuning"],
   careers:["ML Eng","DL Eng"],
   trends:["Keras Core","Edge ML","TFX pipelines"]},
  {name:"PyTorch", cat:"AI/ML", pop:[35,45,60,72,80,86,90],
   roadmap:["Python","Autograd","NN Modules","Computer Vision","NLP","Distributed","Serving","MLOps"],
   careers:["ML Eng","Research Eng"],
   trends:["GenAI","Diffusion","Torch.compile"]},
  {name:"Scikit‑learn", cat:"AI/ML", pop:[55,58,61,64,66,67,68],
   roadmap:["Python","Preprocessing","Modeling","Pipelines","Tuning","Explainability","Deploy","Monitoring"],
   careers:["Data Scientist","ML Engineer"],
   trends:["AutoML","Interpretable ML"]},
  {name:"LangChain", cat:"AI/ML", pop:[0,0,20,40,65,72,76],
   roadmap:["Python/JS","LLMs & Tokens","Chains & Tools","RAG Basics","Vector DBs","Agents","Eval","Deploy"],
   careers:["GenAI Eng","AI Apps Dev"],
   trends:["RAG best‑practices","Observability","Guardrails"]},
  {name:"OpenCV", cat:"AI/ML", pop:[28,34,40,46,51,54,56],
   roadmap:["Python/C++","Images","Transforms","Detection","Tracking","DL integrations","Edge","Deploy"],
   careers:["CV Eng","Robotics Eng"],
   trends:["Edge CV","Real‑time inference"]},
  {name:"Power BI", cat:"BI", pop:[30,36,42,50,58,65,70],
   roadmap:["Data modeling","DAX","Power Query","Viz","Gateways","Row‑level security","Apps","Deploy"],
   careers:["BI Analyst","Data Analyst"],
   trends:["Copilots","Direct Lake","Semantic links"]},
  {name:"Tableau", cat:"BI", pop:[42,47,52,57,61,64,66],
   roadmap:["Data prep","Viz","LOD","Dashboards","Server/Cloud","Stories","Extensibility","Deploy"],
   careers:["BI Dev","Analyst"],
   trends:["Ask Data","Accelerators","Viz best‑practices"]},
  {name:"Cybersecurity", cat:"Security", pop:[50,58,64,70,76,82,86],
   roadmap:["Networking","Linux/Windows","Threats","Blue/Red Team","Cloud Sec","SIEM","Zero Trust","Certs"],
   careers:["Sec Analyst","Pentester","Sec Eng"],
   trends:["AI‑assisted defense","Cloud‑native sec","SBOMs"]},
  {name:"Blockchain", cat:"Emerging", pop:[20,35,60,55,48,45,44],
   roadmap:["Basics","Wallets","Smart Contracts","dApps","Oracles","Security","Scaling","Use‑cases"],
   careers:["Blockchain Dev","Smart‑contract Auditor"],
   trends:["L2 scaling","Real‑world assets","ZK proof tooling"]},
  {name:"Solidity", cat:"Emerging", pop:[10,22,45,40,36,34,33],
   roadmap:["EVM","Solidity","Contracts","Testing","Audits","Gas","Deploy","Tooling"],
   careers:["Smart‑contract Dev","Auditor"],
   trends:["ZK‑EVM","Account abstraction"]},
  {name:"Rust", cat:"Systems", pop:[12,18,28,40,52,60,66],
   roadmap:["Ownership","Borrowing/Lifetimes","Cargo","Async","FFI","WebAssembly","Systems","Perf"],
   careers:["Systems Dev","Blockchain Dev","Infra Eng"],
   trends:["Wasm","Embedded","High‑perf services"]},
  {name:"Go", cat:"Systems", pop:[32,38,44,52,60,66,70],
   roadmap:["Go basics","Concurrency","HTTP","CLI","gRPC","Microservices","Cloud","Perf"],
   careers:["Backend Dev","Cloud Infra Eng"],
   trends:["WASM","Cloud‑native","Tiny Go"]},
  {name:"C++", cat:"Systems", pop:[60,62,64,66,68,70,71],
   roadmap:["Syntax/Std","STL","Memory","Concurrency","Build","Perf","Modern C++","Tooling"],
   careers:["Game Dev","Quant Dev","Embedded"],
   trends:["C++20/23","Modules","Safety"]},
  {name:"Swift", cat:"Mobile", pop:[30,35,40,46,50,54,58],
   roadmap:["Swift","UIKit/SwiftUI","Networking","Persistence","Testing","Combine","App Store","Perf"],
   careers:["iOS Dev","Mobile Eng"],
   trends:["SwiftUI","Macros","VisionOS"]},
  {name:"Kotlin", cat:"Mobile", pop:[28,34,42,50,57,62,66],
   roadmap:["Kotlin","Android Jetpack","UI","Networking","Persistence","Coroutines","Compose","Release"],
   careers:["Android Dev","Mobile Eng"],
   trends:["Jetpack Compose","KMP","AI features"]},
  {name:"Flutter", cat:"Mobile", pop:[15,28,45,55,60,62,63],
   roadmap:["Dart","Widgets","State Mgmt","Navigation","Testing","Plugins","Perf","Release"],
   careers:["Cross‑platform Dev","Mobile Eng"],
   trends:["Flutter Web","Impeller","Fuchsia"]},
  {name:"AR/VR", cat:"XR", pop:[10,14,22,30,38,46,55],
   roadmap:["3D basics","Unity/Unreal","Interaction","Optimization","UX","Publishing","Monetization","XR SDKs"],
   careers:["XR Dev","3D Engineer"],
   trends:["Spatial computing","Enterprise XR","AI‑assisted XR"]}
];

/* ------------------------------
   Populate category filter
------------------------------ */
const categories = Array.from(new Set(TECH.map(t=>t.cat))).sort();
const categoryFilter = document.getElementById("categoryFilter");
categories.forEach(c => {
  const opt = document.createElement("option");
  opt.value = c; opt.textContent = c;
  categoryFilter.appendChild(opt);
});

/* ------------------------------
   Helpers
------------------------------ */
function sparkline(canvas, values){
  const ctx = canvas.getContext("2d");
  const w = canvas.width, h = canvas.height;
  ctx.clearRect(0,0,w,h);
  const pad = 4;
  const min = Math.min(...values), max = Math.max(...values);
  const scaleX = (w-2*pad)/(values.length-1);
  const scaleY = (h-2*pad)/(max-min || 1);
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  values.forEach((v,i)=>{
    const x = pad + i*scaleX;
    const y = h - pad - (v-min)*scaleY;
    if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
  });
  ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--brand').trim();
  ctx.stroke();
}

function drawTrendChart(canvas, years, values){
  const ctx = canvas.getContext("2d");
  const w = canvas.width, h = canvas.height;
  ctx.clearRect(0,0,w,h);
  const pad = 40;
  const min = Math.min(...values), max = Math.max(...values);
  const sx = (w-2*pad)/(years.length-1);
  const sy = (h-2*pad)/(max-min || 1);

  // axes
  ctx.strokeStyle = "rgba(255,255,255,0.25)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pad, h-pad); ctx.lineTo(w-pad, h-pad); // x
  ctx.moveTo(pad, pad); ctx.lineTo(pad, h-pad); // y
  ctx.stroke();

  // grid + labels
  ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--muted').trim();
  ctx.font = "12px system-ui";
  years.forEach((yr,i)=>{
    const x = pad + i*sx;
    ctx.fillText(String(yr), x-10, h-pad+16);
    ctx.beginPath(); ctx.moveTo(x, h-pad); ctx.lineTo(x, pad); ctx.stroke();
  });
  for(let g=0; g<=5; g++){
    const gv = min + (g/5)*(max-min);
    const y = h - pad - (gv-min)*sy;
    ctx.fillText(gv.toFixed(0), 6, y+4);
    ctx.beginPath(); ctx.moveTo(pad, y); ctx.lineTo(w-pad, y); ctx.stroke();
  }

  // line
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--brand').trim();
  ctx.beginPath();
  values.forEach((v,i)=>{
    const x = pad + i*sx;
    const y = h - pad - (v-min)*sy;
    if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
  });
  ctx.stroke();

  // fill
  const grd = ctx.createLinearGradient(0, pad, 0, h-pad);
  grd.addColorStop(0, "rgba(106,141,255,0.35)");
  grd.addColorStop(1, "rgba(106,141,255,0.00)");
  ctx.fillStyle = grd;
  ctx.lineTo(w-pad, h-pad); ctx.lineTo(pad, h-pad); ctx.closePath(); ctx.fill();
}

function computeYoY(values){
  const out = [];
  for(let i=1;i<values.length;i++){
    const pct = ((values[i] - values[i-1]) / (values[i-1]||1)) * 100;
    out.push(+pct.toFixed(1));
  }
  return out;
}
function cagr(values){
  const start = values[0], end = values[values.length-1];
  const n = values.length-1;
  if(start<=0 || n<=0) return 0;
  return +(Math.pow(end/start, 1/n) - 1)*100;
}

/* ------------------------------
   Render Cards
------------------------------ */
const grid = document.getElementById("grid");
const searchInput = document.getElementById("searchInput");
const sortBy = document.getElementById("sortBy");

function filteredAndSorted(){
  const q = (searchInput.value||"").toLowerCase();
  const cat = categoryFilter.value;
  let arr = TECH.filter(t => (cat==="all" || t.cat===cat) && (t.name.toLowerCase().includes(q) || t.cat.toLowerCase().includes(q)));
  if(sortBy.value==="name-asc"){
    arr.sort((a,b)=>a.name.localeCompare(b.name));
  } else if(sortBy.value==="trend-desc"){
    arr.sort((a,b)=>b.pop.at(-1)-a.pop.at(-1));
  } else if(sortBy.value==="cagr-desc"){
    arr.sort((a,b)=>cagr(b.pop)-cagr(a.pop));
  }
  return arr;
}

function renderCards(){
  const items = filteredAndSorted();
  grid.innerHTML = "";
  document.getElementById("statTechCount").textContent = String(items.length);

  requestAnimationFrame(()=>{
    items.forEach(t => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <div class="card-head">
          <div class="card-icon">${t.name.split(" ").map(w=>w[0]).join("").slice(0,3).toUpperCase()}</div>
          <div>
            <h3>${t.name}</h3>
            <small>${t.cat} • Latest: ${t.pop.at(-1)}</small>
          </div>
        </div>
        <div class="tags">
          <span class="tag">CAGR: ${cagr(t.pop).toFixed(1)}%</span>
          <span class="tag">Range: ${Math.min(...t.pop)}–${Math.max(...t.pop)}</span>
          <span class="tag">${YEARS[0]}–${YEARS.at(-1)}</span>
        </div>
        <canvas class="spark" width="400" height="40"></canvas>
        <button class="open-btn">Open roadmap & trends</button>
      `;
      grid.appendChild(card);
      const canvas = card.querySelector("canvas");
      sparkline(canvas, t.pop);
      card.querySelector(".open-btn").addEventListener("click", ()=> openModal(t));
    });
  });
}
searchInput.addEventListener("input", renderCards);
categoryFilter.addEventListener("change", renderCards);
sortBy.addEventListener("change", renderCards);

/* ------------------------------
   Modal
------------------------------ */
const modal = document.getElementById("modal");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalSubtitle = document.getElementById("modalSubtitle");
const modalIcon = document.getElementById("modalIcon");
const modalRoadmap = document.getElementById("modalRoadmap");
const modalCareers = document.getElementById("modalCareers");
const modalTrends = document.getElementById("modalTrends");
const trendChart = document.getElementById("trendChart");
const yoySummary = document.getElementById("yoySummary");

function openModal(t){
  modalTitle.textContent = t.name;
  modalSubtitle.textContent = `${t.cat} • ${YEARS[0]}–${YEARS.at(-1)} coverage`;
  modalIcon.textContent = t.name.split(" ").map(w=>w[0]).join("").slice(0,3).toUpperCase();

  modalRoadmap.innerHTML = t.roadmap.map(step=>`<li>${step}</li>`).join("");
  modalCareers.innerHTML = t.careers.map(c=>`<li>${c}</li>`).join("");
  modalTrends.innerHTML = t.trends.map(tr=>`<li>${tr}</li>`).join("");

  drawTrendChart(trendChart, YEARS, t.pop);

  const yoy = computeYoY(t.pop);
  yoySummary.innerHTML = [
    `<div class="ybox"><strong>Latest YoY</strong><small>${YEARS.at(-2)}→${YEARS.at(-1)}</small><div>${yoy.at(-1)}%</div></div>`,
    `<div class="ybox"><strong>Avg YoY</strong><small>${YEARS[0]}→${YEARS.at(-1)}</small><div>${(yoy.reduce((a,b)=>a+b,0)/yoy.length).toFixed(1)}%</div></div>`,
    `<div class="ybox"><strong>CAGR</strong><small>${YEARS[0]}→${YEARS.at(-1)}</small><div>${cagr(t.pop).toFixed(1)}%</div></div>`
  ].join("");

  modal.classList.add("show");
  modal.setAttribute("aria-hidden","false");
}
modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e)=>{ if(e.target===modal) closeModal(); });
function closeModal(){
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden","true");
}

/* Initial render */
renderCards();
