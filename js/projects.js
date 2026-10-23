const u=[{kunde_projekt:"FinTech Enterprise",zeitraum:"2024 - 2025",aufgabe:"Hexagonale Banking Microservice Suite",beschreibung:"Entwicklung entkoppelter Zahlungsverarbeitungs-Dienste. Trennung der Dom\xE4nenlogik von Infrastrukturadaptern durch Ports & Adapters Muster.",entwicklungsumgebung:"Java 21, Spring Boot 3, Hexagonal Arch., Kafka, TDD, Docker"},{kunde_projekt:"Logistik & Transport Konzern",zeitraum:"2023 - 2024",aufgabe:"Cloud-Native Event Integration Platform",beschreibung:"Migration monolithischer Altsysteme in eine skalierbare Cloud-Microservice-Landschaft auf AWS.",entwicklungsumgebung:"Spring Cloud, AWS Lambda, OpenAPI, Docker, GitLab CI/CD, Maven"},{kunde_projekt:"B2B SaaS Provider",zeitraum:"2026",aufgabe:"AI Integration & Prompt Engineering Pipeline",beschreibung:"Anbindung von LLM-Schnittstellen und automatisierter Prompt-Pipelines an bestehende Java Backend Services.",entwicklungsumgebung:"Python 3, Spring Boot, AI-Development, REST API, Docker"}];export async function loadAndRenderProjects(){const t=document.getElementById("projects-container");if(t)try{const e=await fetch("./assets/Projekthistorie.json");if(!e.ok){console.error(`HTTP-Fehler! Status: ${e.status}`),t.innerHTML='<p class="text-slate-400">Projekte konnten nicht geladen werden.</p>';return}const r=await e.json(),s=["TransnetBW","E.On Grid Solutions GmbH","Vaillant Group"],a=[...r.filter(n=>s.includes(n.kunde_projekt))];t.innerHTML=a.map(n=>{const o=c(n);return`
                <article class="card-surface card-project hover-text hover-text-cyan rounded-2xl p-6 flex flex-col justify-between group shadow-xl">
                    <div>
                      <!-- Header: Kunde / Zeitraum -->
                      <div class="flex items-center justify-between gap-2 mb-4">
                        <span class="text-blue-600 dark:text-sky-400 font-semibold text-sm tracking-wide">
                          ${(n.kunde_projekt||"").replace(/\\n/g,`
`)}
                        </span>
                        <span class="text-xs font-mono text-slate-500 dark:text-slate-400">
                          ${n.zeitraum||""}
                        </span>
                      </div>
            
                      <!-- Titel / Aufgabe -->
                      <h4 class="text-xl font-bold text-blue-600 dark:text-brand-300 mb-4 leading-tight whitespace-pre-line">
                        ${(n.aufgabe||"").replace(/\\n/g,`
`)}
                      </h4>
            
                      <!-- Beschreibung / Highlights -->
                      <p class="card-surface-muted text-sm leading-relaxed mb-6 whitespace-pre-line">
                        ${(n.beschreibung||"").replace(/\\n/g,`
`)}
                      </p>
                    </div>
            
                    <!-- Tags / Entwicklungsumgebung unten -->
                    <div class="pt-4 border-t border-slate-200 dark:border-slate-800/80">
                      <div class="flex flex-wrap gap-2">
                        ${o.map(l=>`
                          <span class="text-xs font-mono px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-900 text-brand-700 dark:text-sky-300 border border-slate-200 dark:border-slate-800/80">
                            ${l}
                          </span>
                        `).join("")}
                      </div>
                    </div>
                </article>
            `}).join("")}catch(e){console.error("Fehler beim Laden der Projekthistorie:",e),t.innerHTML='<p class="text-slate-400">Projekte konnten nicht geladen werden.</p>'}}function c(t){const e=t.entwicklungsumgebung||"";return typeof e=="string"&&e.length>0?e.split(",").map(r=>r.trim()).filter(r=>r.length>0).slice(0,6):[]}export function highlightText(t,e){if(!t)return"";const s=(Array.isArray(e)?e:e?[e]:[]).map(a=>typeof a=="string"?a.trim().replace(/[.*+?^${}()|[\]\\]/g,"\\$&"):"").filter(a=>a.length>0);if(s.length===0)return t;const i=new RegExp(`(${s.join("|")})`,"gi");return t.replace(i,'<mark class="bg-amber-500/25 text-amber-300 font-semibold px-0.5 rounded">$1</mark>')}
