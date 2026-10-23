export class InnovationsController{constructor(){this.container=document.getElementById("innovations-container"),this.container&&this.init()}async init(){try{const e=await fetch("./assets/innovations.json");if(!e.ok){console.error(`InnovationsController Error: HTTP error! status: ${e.status}`),this.renderError();return}const i=(await e.json()).filter(l=>l.visible===!0),a=document.getElementById("innovation"),s=document.querySelector('[data-nav-section="innovation"]');if(i.length===0){a&&a.classList.add("hidden"),s&&s.classList.add("hidden");return}a&&a.classList.remove("hidden"),s&&s.classList.remove("hidden"),this.render(i)}catch(e){console.error("InnovationsController Error:",e),this.renderError()}}renderError(){this.container&&(this.container.innerHTML=`
                <div class="p-6 rounded-xl border border-red-500/30 bg-red-950/20 text-red-300 text-center font-mono text-sm">
                    <i class="fa-solid fa-triangle-exclamation mb-2 text-lg"></i>
                    <p>Die Innovationsfelder konnten aktuell nicht geladen werden.</p>
                </div>
            `)}toRoman(e){return{1:"I",2:"II",3:"III",4:"IV",5:"V",6:"VI",7:"VII",8:"VIII",9:"IX",10:"X"}[e]||e}render(e){const r=t=>{let n='<div class="grid grid-cols-1 md:grid-cols-3 gap-6">';return t.forEach(o=>{const d=o.tags.map(c=>`<span class="px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800/40 text-purple-800 dark:text-purple-300 font-mono">${c}</span>`).join("");n+=`
                    <div class="innovation-card">
                        <div>
                            <div class="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4 text-purple-400">
                                <i class="fa-solid ${o.icon} text-lg"></i>
                            </div>
                            <h5 class="text-base font-semibold text-slate-900 dark:text-white mb-2">${o.title}</h5>
                            <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">${o.text}</p>
                        </div>
                        <div class="flex flex-wrap gap-1.5 font-mono text-[11px]">${d}</div>
                    </div>
                `}),n+="</div>",n},i=t=>`
            <div class="innovation-banner">
                <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div class="space-y-3 max-w-3xl">
                        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-purple-500/10 border border-purple-500/20 text-purple-700 dark:text-purple-300">
                            <i class="fa-solid fa-flask text-purple-600 dark:text-purple-400"></i>
                            <span>${t.tag}</span>
                        </div>
                        <h4 class="text-xl font-semibold text-slate-900 dark:text-white">${t.title}</h4>
                        <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">${t.text}</p>
                    </div>
                    <div class="flex-shrink-0">
                        <a href="${t.buttonHref}" class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-all shadow-lg shadow-purple-600/20">
                            <i class="fa-solid fa-paper-plane"></i>
                            <span>${t.buttonText}</span>
                        </a>
                    </div>
                </div>
            </div>
        `;let a='<div class="flex flex-wrap justify-center gap-3 mb-10" role="tablist">';e.forEach((t,n)=>{a+=`
                <button type="button" 
                    class="innovation-tab ${n===0?"active":""}"
                    data-target="innovation-content-${t.id}"
                    role="tab">
                    <i class="fa-solid ${t.categoryIcon}"></i>
                    <span>${t.title}</span>
                </button>
            `}),a+="</div>";let s='<div class="space-y-8">';e.forEach((t,n)=>{const o=n===0,d=this.toRoman(n+1);s+=`
                <div id="innovation-content-${t.id}" class="innovation-pane space-y-8 ${o?"":"hidden"}">
                    <div class="innovation-pane-header">
                        <div class="innovation-pane-header-left">
                            <span class="innovation-pane-badge">Innovationsfeld ${d}</span>
<!--                            <h3 class="innovation-pane-title text-gradient-warm">-->
                            <h3 class="innovation-pane-title text-slate-900 dark:text-white">
                                ${t.title}
                            </h3>
                        </div>
                        <p class="innovation-pane-desc">${t.description}</p>
                    </div>
                    ${i(t.banner)}
                    ${r(t.cards)}
                </div>
            `}),s+="</div>";let l='<div class="space-y-4">';e.forEach((t,n)=>{const o=n===0?"open":"",d=this.toRoman(n+1);l+=`
                <details ${o} class="innovation-accordion group">
                    <summary class="p-5 font-semibold text-slate-900 dark:text-white cursor-pointer flex items-center justify-between select-none hover:bg-slate-100 dark:hover:bg-slate-800/55 transition-colors">
                        <div class="flex items-center gap-3">
                            <div class="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                                <i class="fa-solid ${t.categoryIcon}"></i>
                            </div>
                            <div>
                                <span class="text-xs font-mono text-purple-600 dark:text-purple-400 block">Innovationsfeld ${d}</span>
                                <span class="text-base">${t.title}</span>
                            </div>
                        </div>
                        <i class="fa-solid fa-chevron-down text-slate-400 transition-transform group-open:rotate-180"></i>
                    </summary>
                    <div class="p-5 sm:p-6 border-t border-slate-200 dark:border-slate-800/80 space-y-6">
                        <p class="text-slate-600 dark:text-slate-400 text-sm">${t.description}</p>
                        ${i(t.banner)}
                        ${r(t.cards)}
                    </div>
                </details>
            `}),l+="</div>",this.container.innerHTML=`
            <div class="hidden md:block">
                ${a}
                ${s}
            </div>
            <div class="block md:hidden">
                ${l}
            </div>
        `,this.bindEvents()}bindEvents(){const e=this.container.querySelectorAll(".innovation-tab"),r=this.container.querySelectorAll(".innovation-pane");e.forEach(i=>{i.addEventListener("click",()=>{const a=i.getAttribute("data-target");e.forEach(s=>{s.classList.remove("active")}),i.classList.add("active"),r.forEach(s=>{s.id===a?s.classList.remove("hidden"):s.classList.add("hidden")})})})}}
