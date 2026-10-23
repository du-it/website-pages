import{skillsData as n,SKILL_CATEGORIES as s}from"./skills-data.js";export class TechStackController{initial_category="backend";constructor(){this.grid=document.getElementById("skill-grid"),this.filterContainer=document.getElementById("skill-filters"),this.filterButtons=[],this.grid&&this.filterContainer&&this.init()}init(){this.renderFilterButtons(),this.renderSkills(this.initial_category),this.bindEvents()}renderFilterButtons(){this.filterContainer.innerHTML=s.map(e=>{const i=e.id===this.initial_category;return`
            <button data-filter="${e.id}" class="btn-filter ${i?"active":""}">
                <i class="${e.icon} text-sm"></i>
                <span>${e.label}</span>
            </button>
        `}).join(""),this.filterButtons=this.filterContainer.querySelectorAll(".btn-filter")}bindEvents(){this.filterButtons.forEach(e=>{e.addEventListener("click",i=>{const t=i.currentTarget.getAttribute("data-filter");this.filterButtons.forEach(r=>{r.classList.remove("active")}),i.currentTarget.classList.add("active"),this.renderSkills(t)})})}renderSkills(e){if(!this.grid)return;const i=e==="all"?n:n.filter(t=>t.category===e);this.grid.innerHTML=i.map(t=>{const r=t.icon.trim().startsWith("<")||t.icon.includes("<svg")?t.icon:`<i class="${t.icon}"></i>`;return`
            <div class="skill-card card-surface rounded-xl p-4 text-center flex flex-col items-center justify-center hover:border-brand-500/50 transition-all duration-300 group">
                ${t.badge?`<span class="card-badge">${t.badge}</span>`:""}
                <div class="text-4xl mb-3 flex items-center justify-center h-12 w-12 group-hover:scale-110 transition-transform duration-300">
                    ${r}
                </div>
                <span class="text-xs font-semibold card-surface-muted group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                    ${t.name}
                </span>
            </div>`}).join("")}}
