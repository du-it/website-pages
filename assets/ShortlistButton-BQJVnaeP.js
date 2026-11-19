var e=class{static getHtml(e,t=`w-8 h-8`){let n=e?.branding?.logoPath;return n?`<img src="${n}" alt="du-it Logo" class="${t} object-contain drop-shadow-md">`:`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="${t} drop-shadow-md">
                <rect width="32" height="32" rx="7" class="fill-surface stroke-subtle transition-colors" stroke-width="1.5"/>
                <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-weight="900" font-size="11" class="fill-primary transition-colors">
                    <tspan fill="#06b6d4">{</tspan>du<tspan fill="#06b6d4">}</tspan>
                </text>
            </svg>
        `}},t=class{static scrollToElement(e){requestAnimationFrame(()=>{let t=e.startsWith(`#`)?e.substring(1):e,n=document.getElementById(t),r=document.getElementById(`main-scroll`);if(n&&r){let e=r.getBoundingClientRect().top,t=n.getBoundingClientRect().top-e+r.scrollTop;r.scrollTo({top:t,behavior:`smooth`})}})}},n=class{static formatLineBreaks(e){return e?e.replace(/\\n/g,`
`):``}static formatRichText(e){if(!e)return``;let t=this.formatLineBreaks(e);return t=t.replace(/\*\*(.*?)\*\*/g,`<strong>$1</strong>`),t=t.replace(/\*(.*?)\*/g,`<em>$1</em>`),t=t.replace(/_(.*?)_/g,`<em>$1</em>`),t}},r=class{static render(t,n,r={}){let i=(r.size||`small`)===`large`,a=r.showSlogan??t?.branding?.showClaim??!0,o=r.logoPosition||t?.branding?.logoPosition||`left`,s=r.animate||t?.branding?.animation||`none`,c=r.pulseCount??t?.branding?.pulseCount??3;if(s===`random`){let e=[`logo`,`text`,`alternating`];s=e[Math.floor(Math.random()*e.length)]}let l=t?.branding?.companyName||t?.company||`du-it`,u=n.t(`branding.legalName`),d=u===`branding.legalName`?t?.branding?.legalName||`Dirk Ulrich-Informationstechnologie`:u,f=t?.brandSlogan||`Smart Java Development`,p=i?`w-16 h-16 md:w-20 md:h-20`:`w-8 h-8`,m=r.logoSize||p,h=o===`right`?`branding--logo-right`:``,g=``;s===`logo`?g=`branding--animate-logo`:s===`text`?g=`branding--animate-text`:s===`alternating`&&(g=`branding--animate-alternating`);let _=`style="--branding-pulse-count: ${c};"`,v=r.textSize?` ${r.textSize}`:``;return`
            <div class="branding ${i?`branding--large`:`branding--small`} ${h} ${g}" ${_}>
                <div class="branding__logo">
                    ${e.getHtml(t,m)}
                </div>
                <div class="branding__text${v}">
                    <div class="branding__title">
                        <span class="branding__company">${l}</span>
                        <span class="branding__legal">${d}</span>
                    </div>
                    ${a?`
                        <span class="branding__slogan">${f}</span>
                    `:``}
                </div>
            </div>
        `}},i=class{projects=[];availableTags=new Set;currentLoadedLang=null;defaultTags=[`Java`,`Spring Boot`,`AWS`,`Azure`,`Docker`,`Kubernetes`,`Kafka`,`Cloud`,`Blockchain`,`DLT`,`TDD`,`Microservices`,`KI`,`LLM`,`REST API`,`Terraform`,`Python`,`SQL`];async loadProjects(e){if(this.currentLoadedLang===e&&this.projects.length>0)return this.projects;try{let t=await fetch(`/assets/Projekthistorie_${e}.json`);if(!t.ok)return console.error(`[ProjectsService] HTTP Fehler ${t.status} beim Laden der Projekte.`),[];let n=await t.json();return this.projects=n.filter(e=>!e._readme),this.currentLoadedLang=e,this.extractTags(),this.projects}catch(t){return console.error(`[ProjectsService] Fehler beim Laden der Projektdaten (${e}):`,t),this.projects=[],[]}}getProjectByIndex(e){return this.projects[e]}getProjectIndex(e){return this.projects.indexOf(e)}getAvailableTags(){return Array.from(new Set([...this.defaultTags,...Array.from(this.availableTags)])).sort()}filterProjects(e,t){let n=e.split(`,`).map(e=>e.trim()).filter(e=>e.length>0);return n.length===0?this.projects:this.projects.filter(e=>{let r=[e.kunde||``,e.aufgabe||``,e.beschreibung||``,this.getTechStackText(e)].join(` `).toLowerCase();return t===`AND`?n.every(e=>r.includes(e.toLowerCase())):n.some(e=>r.includes(e.toLowerCase()))})}getTechStackText(e){return e.techStack?Object.values(e.techStack).filter(e=>Array.isArray(e)).flat().join(`, `):``}extractTags(){this.availableTags.clear(),this.projects.forEach(e=>{e.techStack&&[...e.techStack.languages||[],...e.techStack.frameworks||[],...e.techStack.platforms||[],...e.techStack.tools||[]].forEach(e=>{let t=e.trim();t.length>1&&t.length<35&&this.availableTags.add(t)})})}},a=class{PROJECTS_KEY=`duit_shortlist_projects`;NOTES_KEY=`duit_shortlist_notes`;addProject(e){let t=this.getProjectIds();t.includes(e)||(t.push(e),localStorage.setItem(this.PROJECTS_KEY,JSON.stringify(t)),this.emitChange())}removeProject(e){let t=this.getProjectIds();t=t.filter(t=>t!==e),localStorage.setItem(this.PROJECTS_KEY,JSON.stringify(t)),this.emitChange()}isProjectSaved(e){return this.getProjectIds().includes(e)}getProjectIds(){let e=localStorage.getItem(this.PROJECTS_KEY);return e?JSON.parse(e):[]}addNote(e){let t=this.getNotes(),n=e.trim();n!==``&&!t.includes(n)&&(t.push(n),localStorage.setItem(this.NOTES_KEY,JSON.stringify(t)),this.emitChange())}removeNote(e){let t=this.getNotes();t=t.filter(t=>t!==e),localStorage.setItem(this.NOTES_KEY,JSON.stringify(t)),this.emitChange()}updateNote(e,t){let n=this.getNotes(),r=t.trim();if(r!==``&&n.includes(e)&&!n.includes(r)){let t=n.indexOf(e);n[t]=r,localStorage.setItem(this.NOTES_KEY,JSON.stringify(n)),this.emitChange()}}getNotes(){let e=localStorage.getItem(this.NOTES_KEY);if(!e)return[];try{let t=JSON.parse(e);if(Array.isArray(t))return t;if(typeof t==`string`)return t.trim()===``?[]:[t.trim()]}catch{return e.trim()===``?[]:[e.trim()]}return[]}hasAnyData(){return Object.keys(localStorage).some(e=>e.startsWith(`duit_shortlist`))}clearAllData(){let e=[];for(let t=0;t<localStorage.length;t++){let n=localStorage.key(t);n&&n.startsWith(`duit_shortlist`)&&e.push(n)}e.forEach(e=>localStorage.removeItem(e)),this.emitChange()}emitChange(){window.dispatchEvent(new CustomEvent(`shortlistChanged`))}},o=class{containerId;service;projectsService;i18n;isOpen=!1;confirmAction=null;constructor(e,t){this.containerId=e,this.i18n=t,this.service=new a,this.projectsService=new i}render(){let e=document.getElementById(this.containerId);e&&(e.innerHTML=`
            <div id="shortlist-backdrop" class="shortlist-backdrop hidden"></div>
            <aside id="shortlist-panel" class="shortlist-panel">
                <div class="shortlist-panel__header">
                    <h3 class="shortlist-panel__title" id="shortlist-title"></h3>
                    <div class="flex items-center gap-2">
                        <button id="shortlist-print-btn" class="shortlist-panel__print" aria-label="Drucken">
                            <i class="fa-solid fa-print"></i>
                        </button>
                        <button id="shortlist-close" class="shortlist-panel__close" aria-label="Close">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                </div>
                
                <div class="shortlist-panel__content">
                    <!-- Sektion: Gemerkte Projekte -->
                    <div class="shortlist-section">
                        <h4 class="shortlist-section__title" id="shortlist-projects-label"></h4>
                        <div id="shortlist-projects-container" class="shortlist-projects"></div>
                    </div>

                    <!-- Trennlinie (BEM-Mix: ui-divider für den Gradient, shortlist-divider für Abstände) -->
                    <hr class="ui-divider shortlist-divider">

                    <!-- Sektion: Notizen -->
                    <div class="shortlist-section">
                        <h4 class="shortlist-section__title" id="shortlist-notes-label"></h4>
                        
                        <div class="shortlist-notes__input-group">
                            <input type="text" id="shortlist-note-input" class="shortlist-notes__input" autocomplete="off" placeholder="Notiz hinzufügen...">
                            <button id="shortlist-add-note-btn" class="shortlist-notes__add-btn" aria-label="Notiz hinzufügen">
                                <i class="fa-solid fa-plus"></i>
                            </button>
                        </div>
                        
                        <ul id="shortlist-notes-list" class="shortlist-notes__list"></ul>
                    </div>
                    
                    <p class="shortlist-disclaimer" id="shortlist-disclaimer">
                        <i class="fa-solid fa-lock text-xs mr-1"></i>
                        <span id="shortlist-disclaimer-text"></span>
                    </p>

                    <div class="shortlist-footer-actions">
                        <button id="shortlist-clear-all" class="shortlist-clear-all-btn" aria-label="Alle Daten löschen">
                            <i class="fa-solid fa-broom"></i>
                            <span id="shortlist-clear-all-text"></span>
                        </button>
                    </div>
                </div>
            </aside>

            <!-- Bestätigungs-Modal -->
            <div id="shortlist-confirm-modal" class="shortlist-confirm hidden">
                <div class="shortlist-confirm__box">
                    <h4 class="shortlist-confirm__title" id="shortlist-confirm-title"></h4>
                    <p class="shortlist-confirm__text" id="shortlist-confirm-text"></p>
                    <div class="shortlist-confirm__actions">
                        <button id="shortlist-confirm-cancel" class="shortlist-confirm__btn shortlist-confirm__btn--cancel"></button>
                        <button id="shortlist-confirm-accept" class="shortlist-confirm__btn shortlist-confirm__btn--accept"></button>
                    </div>
                </div>
            </div>
        `,this.bindEvents(),this.updateTexts())}updateTexts(){let e=document.getElementById(`shortlist-title`);e&&(e.textContent=this.i18n.t(`shortlist.title`));let t=document.getElementById(`shortlist-projects-label`);t&&(t.textContent=this.i18n.t(`shortlist.projects_label`));let n=document.getElementById(`shortlist-notes-label`);n&&(n.textContent=this.i18n.t(`shortlist.notes_label`));let r=document.getElementById(`shortlist-close`);r&&r.setAttribute(`aria-label`,this.i18n.t(`shortlist.close`));let i=document.getElementById(`shortlist-print-btn`);i&&(i.setAttribute(`aria-label`,this.i18n.t(`shortlist.print_btn`)),i.setAttribute(`title`,this.i18n.t(`shortlist.print_btn`)));let a=document.getElementById(`shortlist-note-input`);a&&(a.placeholder=this.i18n.t(`shortlist.notes_placeholder`));let o=document.getElementById(`shortlist-add-note-btn`);o&&o.setAttribute(`aria-label`,this.i18n.t(`shortlist.add_note_btn`)||`Notiz hinzufügen`);let s=document.getElementById(`shortlist-clear-all-text`);s&&(s.textContent=this.i18n.t(`shortlist.clear_all_btn`)||`Alle Daten löschen`);let c=document.getElementById(`shortlist-disclaimer-text`);c&&(c.textContent=this.i18n.t(`shortlist.disclaimer`));let l=document.getElementById(`shortlist-confirm-cancel`);l&&(l.textContent=this.i18n.t(`shortlist.cancel_btn`)||`Abbrechen`);let u=document.getElementById(`shortlist-confirm-accept`);u&&(u.textContent=this.i18n.t(`shortlist.delete_btn`)||`Löschen`),this.loadAndRenderProjects(),this.renderNotes()}open(){this.isOpen||(this.isOpen=!0,document.getElementById(`shortlist-backdrop`)?.classList.remove(`hidden`),document.getElementById(`shortlist-panel`)?.classList.add(`is-open`))}close(){this.isOpen&&(this.isOpen=!1,document.getElementById(`shortlist-backdrop`)?.classList.add(`hidden`),document.getElementById(`shortlist-panel`)?.classList.remove(`is-open`))}bindEvents(){document.getElementById(`shortlist-close`)?.addEventListener(`click`,()=>this.close()),document.getElementById(`shortlist-print-btn`)?.addEventListener(`click`,()=>{this.printShortlist()});let e=document.getElementById(`shortlist-note-input`);document.getElementById(`shortlist-add-note-btn`)?.addEventListener(`click`,()=>{this.handleAddNote()}),e?.addEventListener(`keydown`,e=>{e.key===`Enter`&&(e.preventDefault(),this.handleAddNote())}),document.getElementById(`shortlist-clear-all`)?.addEventListener(`click`,()=>{this.openConfirmModal(this.i18n.t(`shortlist.clear_all_btn`),this.i18n.t(`shortlist.clear_all_confirm`),()=>{this.service.clearAllData()})}),document.getElementById(`shortlist-confirm-cancel`)?.addEventListener(`click`,()=>{this.closeConfirmModal()}),document.getElementById(`shortlist-confirm-accept`)?.addEventListener(`click`,()=>{this.confirmAction&&this.confirmAction(),this.closeConfirmModal()}),window.addEventListener(`shortlistChanged`,()=>{this.loadAndRenderProjects(),this.renderNotes()}),window.addEventListener(`openShortlist`,()=>this.open())}handleAddNote(){let e=document.getElementById(`shortlist-note-input`);e&&e.value.trim()!==``&&(this.service.addNote(e.value),e.value=``,e.focus())}openConfirmModal(e,t,n){let r=document.getElementById(`shortlist-confirm-title`);r&&(r.textContent=e);let i=document.getElementById(`shortlist-confirm-text`);i&&(i.textContent=t),this.confirmAction=n,document.getElementById(`shortlist-confirm-modal`)?.classList.remove(`hidden`)}closeConfirmModal(){this.confirmAction=null,document.getElementById(`shortlist-confirm-modal`)?.classList.add(`hidden`)}renderNotes(){let e=document.getElementById(`shortlist-notes-list`);e&&(e.innerHTML=``,this.service.getNotes().forEach(t=>{let n=document.createElement(`li`);n.className=`shortlist-notes__item`;let r=document.createElement(`span`);r.className=`shortlist-notes__item-text`,r.textContent=t;let i=document.createElement(`div`);i.className=`shortlist-notes__item-actions`;let a=document.createElement(`button`);a.className=`shortlist-notes__item-edit`,a.setAttribute(`aria-label`,`Notiz bearbeiten`),a.innerHTML=`<i class="fa-solid fa-pen text-xs"></i>`,a.addEventListener(`click`,()=>{this.startEditingNote(r,t)});let o=document.createElement(`button`);o.className=`shortlist-notes__item-delete`,o.setAttribute(`aria-label`,`Notiz löschen`),o.innerHTML=`<i class="fa-solid fa-trash-can text-xs"></i>`,o.addEventListener(`click`,()=>{this.service.removeNote(t)}),i.appendChild(a),i.appendChild(o),n.appendChild(r),n.appendChild(i),e.appendChild(n)}))}startEditingNote(e,t){let n=document.createElement(`input`);n.type=`text`,n.value=t,n.className=`shortlist-notes__item-edit-input`,n.maxLength=200,e.replaceWith(n),n.focus();let r=!1;n.addEventListener(`blur`,()=>{if(r)return;let i=n.value.trim();i&&i!==t?this.service.updateNote(t,i):n.replaceWith(e)}),n.addEventListener(`keydown`,t=>{t.key===`Enter`&&(t.preventDefault(),n.blur()),t.key===`Escape`&&(t.preventDefault(),r=!0,n.replaceWith(e))})}async printShortlist(){let e=this.service.getProjectIds(),t=this.service.getNotes();if(e.length===0&&t.length===0)return;await this.projectsService.loadProjects(this.i18n.getLang());let r=e.map(e=>this.projectsService.getProjectByIndex(e)).filter(e=>e!==void 0),i=new Date().toLocaleDateString(this.i18n.getLang(),{year:`numeric`,month:`long`,day:`numeric`}),a=document.createElement(`div`);a.id=`shortlist-print-container`,a.className=`print-container`,a.innerHTML=`
            <div class="print-header">
                <h1>${this.i18n.t(`shortlist.print_title`)}</h1>
                <p>${this.i18n.t(`shortlist.print_date`)}: ${i}</p>
            </div>
            <div class="print-projects">
                ${r.map(e=>{let t=this.projectsService.getTechStackText(e);return`
                    <div class="print-project">
                        <div class="print-project__header">
                            <strong>${e.kunde}</strong>
                            <span>${e.zeitraum}</span>
                        </div>
                        <h2>${n.formatRichText(e.aufgabe||``)}</h2>
                        <p>${n.formatRichText(e.beschreibung||``)}</p>
                        ${t?`
                            <div class="print-project__tech">
                                <strong>Tech Stack:</strong> ${t}
                            </div>
                        `:``}
                    </div>
                `}).join(``)}
            </div>
            ${t.length>0?`
                <div class="print-notes">
                    <h3>${this.i18n.t(`shortlist.notes_label`)}</h3>
                    <ul class="print-notes__list">
                        ${t.map(e=>`<li>${e.replace(/\n/g,`<br>`)}</li>`).join(``)}
                    </ul>
                </div>
            `:``}
            <div class="print-footer">
                <p>${this.i18n.t(`shortlist.print_footer`)}</p>
            </div>
        `,document.body.appendChild(a),window.print(),document.body.removeChild(a)}async loadAndRenderProjects(){let e=document.getElementById(`shortlist-projects-container`);if(!e)return;let t=this.service.getProjectIds();if(t.length===0){e.innerHTML=`<p class="text-muted text-sm text-center py-4">${this.i18n.t(`shortlist.empty_projects`)}</p>`;return}await this.projectsService.loadProjects(this.i18n.getLang());let n=t.map(e=>this.projectsService.getProjectByIndex(e)).filter(e=>e!==void 0);n.length===0?e.innerHTML=`<p class="text-muted text-sm text-center py-4">${this.i18n.t(`shortlist.empty_projects`)}</p>`:(e.innerHTML=n.map(e=>`
            <div class="shortlist-card" data-index="${this.projectsService.getProjectIndex(e)}">
                <div class="shortlist-card__header">
                    <span class="shortlist-card__title">${e.aufgabe||`Projekt`}</span>
                    <button class="shortlist-card__remove" aria-label="Entfernen">
                        <i class="fa-solid fa-trash-can text-xs"></i>
                    </button>
                </div>
                <p class="shortlist-card__desc">${e.kunde} (${e.zeitraum})</p>
            </div>
        `).join(``),e.querySelectorAll(`.shortlist-card__remove`).forEach(e=>{e.addEventListener(`click`,e=>{e.preventDefault(),e.stopPropagation();let t=e.currentTarget.closest(`.shortlist-card`)?.getAttribute(`data-index`);t&&this.service.removeProject(parseInt(t,10))})}),e.querySelectorAll(`.shortlist-card`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-index`);if(t){let e=this.projectsService.getProjectByIndex(parseInt(t,10));e&&(this.close(),window.dispatchEvent(new CustomEvent(`openProjectDetail`,{detail:e})))}})}))}},s=class{static injectJsonLd(e,t){let n=document.getElementById(e);n&&n.remove();let r=document.createElement(`script`);r.id=e,r.type=`application/ld+json`,r.textContent=JSON.stringify(t,null,2),document.head.appendChild(r)}},c=class{containerId;i18n;config;constructor(e,t,n){this.containerId=e,this.i18n=t,this.config=n}render(){let t=document.getElementById(this.containerId);if(!t)return;let n=this.config?.branding?.companyName||this.config?.company||`du-it`,r=this.i18n.t(`branding.legalName`)||`Dirk Ulrich-Informationstechnologie`,i=new Date().getFullYear(),a=this.i18n.t(`footer.imprint`)||`Impressum`,o=this.i18n.t(`footer.privacy`)||`Datenschutz`,s=this.i18n.t(`footer.partner`)||`Projektpartner & Vermittlung`,c=window.location.pathname,l=c===`/`||c.endsWith(`/index.html`)||c===``||c.endsWith(`/`);t.innerHTML=`
            <footer class="main-footer" aria-label="Fußbereich">
                <div class="main-footer__inner">
                    
                    <!-- Linke Spalte: Branding & Copyright -->
                    <div class="main-footer__brand-section pl-4">
                        <div class="main-footer__brand-row">
                            <a href="${l?`#hero`:`/index.html#hero`}" class="main-footer__logo-link" aria-label="Zur Startseite von du-it">
                                ${e.getHtml(this.config,`w-5 h-5`)}
                            </a>
                            <span class="main-footer__company">${n}</span>
                            <span class="main-footer__copyright">© ${i} ${r}</span>
                        </div>
                    </div>

                    <!-- Mitte: Social Media & Legal -->
                    <div class="main-footer__center-section">
                        <nav class="main-footer__social-section" aria-label="Social-Media-Profile">
                            <a href="https://www.linkedin.com/in/du-it-dirk-ulrich/" target="_blank" rel="noopener noreferrer"
                               class="main-footer__social-link" aria-label="LinkedIn-Profil" title="LinkedIn">
                                <i class="fa-brands fa-linkedin"></i>
                            </a>
                            <a href="https://www.xing.com/profile/Dirk_Ulrich/web_profiles" target="_blank" rel="noopener noreferrer"
                               class="main-footer__social-link" aria-label="XING-Profil" title="XING">
                                <i class="fa-brands fa-xing"></i>
                            </a>
                            <a href="https://jobtic.com/profile/dirk-ulrich" target="_blank" rel="noopener noreferrer"
                               class="main-footer__social-link" aria-label="jobtic-Profil" title="jobtic">
                                <img src="/assets/logos/jobtic-logo.png" alt="jobtic Logo" class="main-footer__social-image">
                            </a>
                            <a href="https://github.com/du-it" target="_blank" rel="noopener noreferrer"
                               class="main-footer__social-link" aria-label="GitHub-Profil" title="GitHub">
                                <i class="fa-brands fa-github"></i>
                            </a>
                        </nav>
                        
                        <nav class="main-footer__legal" aria-label="Rechtliche Navigation">
                            <a href="/legal.html#impressum" class="main-footer__legal-btn">${a}</a>
                            <span class="main-footer__legal-separator">•</span>
                            <a href="/legal.html#datenschutz" class="main-footer__legal-btn">${o}</a>
                        </nav>
                    </div>

                    <!-- Rechts: Partner -->
                    <div class="main-footer__partner-section pr-4">
                        <div class="main-footer__partner">
                            <span class="main-footer__partner-label">${s}:</span>
                            <a href="https://symbiolab.de/" target="_blank" rel="noopener noreferrer" 
                               class="main-footer__partner-link" aria-label="symbiolab.de">
                                <img src="/assets/logos/logo.symbiolab.svg" alt="symbiolab.de Logo" class="main-footer__partner-logo">
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        `,l&&this.setupEventListeners()}setupEventListeners(){document.querySelector(`.main-footer__logo-link`)?.addEventListener(`click`,e=>{e.preventDefault(),t.scrollToElement(`hero`)})}},l=class{containerId;service;i18n;config;options;hasFlown=!1;hasVibrated=!1;observer=null;visibilityTimeout=null;vibrateTimeout=null;flyTimeout=null;orbitTimeout=null;activeFlightAnim=null;activeOrbitAnimations=new Map;constructor(e,t,n,r={}){this.containerId=e,this.i18n=t,this.config=n,this.service=new a,this.options={behavior:`fly-to-target`,...r}}render(){let e=document.getElementById(this.containerId);if(!e)return;let t=this.config?.features?.shortlist?.fab||{},n=t.counterBadges||{},r=t.iconStyle??`fa-regular`,i=n.projectBadgeColor??`#CCFFCC`,a=n.noteBadgeColor??`#FFF1F0`,o=n.orbitDurationMs??4e3,s=n.landingDurationMs??1200;e.innerHTML=`
            <button id="shortlist-fab" class="shortlist-fab" aria-label="${this.i18n.t(`shortlist.title`)}">
                <i class="${r} fa-bookmark text-lg"></i>
                <span id="shortlist-fab-badge-notes" class="shortlist-fab__badge shortlist-fab__badge--notes hidden">0</span>
                <span id="shortlist-fab-badge-projects" class="shortlist-fab__badge shortlist-fab__badge--projects hidden">0</span>
            </button>
        `;let c=document.getElementById(`shortlist-fab`);if(c&&(c.style.setProperty(`--project-badge-color`,i),c.style.setProperty(`--note-badge-color`,a),c.style.setProperty(`--orbit-duration`,`${o}ms`),c.style.setProperty(`--landing-duration`,`${s}ms`)),this.updateTexts(),this.updateBadge(),this.options.behavior===`docked`)this.hasFlown=!0,this.hasVibrated=!0,e.className=`shortlist-button-container--docked`,e.style.visibility=`hidden`,document.body.appendChild(e),this.dockImmediately(e);else{let t=document.getElementById(`projects`);if(!t){console.warn(`[ShortlistButton] Projekt-Section nicht gefunden. FAB wird nicht gerendert.`);return}this.service.hasAnyData()?(this.hasFlown=!0,this.hasVibrated=!0,e.className=`shortlist-button-container--docked`,e.style.visibility=`hidden`,document.body.appendChild(e),this.dockImmediately(e)):(t.appendChild(e),e.className=`shortlist-button-container`,this.setupObserver(e))}document.getElementById(`shortlist-fab`)?.addEventListener(`click`,()=>{this.hasFlown||this.skipAnimationAndDock(),window.dispatchEvent(new CustomEvent(`openShortlist`))}),window.addEventListener(`shortlistChanged`,()=>{this.updateBadge(),this.startOrbitEffect()}),window.addEventListener(`focus`,()=>this.handleFocusReturn()),document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`visible`&&this.handleFocusReturn()})}updateTexts(){let e=document.getElementById(`shortlist-fab`);if(e){let t=this.i18n.t(`shortlist.fab_tooltip`)||this.i18n.t(`shortlist.title`);e.setAttribute(`aria-label`,t),e.setAttribute(`title`,t)}}updateBadge(){let e=document.getElementById(`shortlist-fab-badge-projects`),t=document.getElementById(`shortlist-fab-badge-notes`),n=!1;if(e){let t=this.service.getProjectIds().length;if(t>0){e.textContent!==t.toString()&&(n=!0),e.textContent=t.toString(),e.classList.remove(`hidden`);let r=t===1?`shortlist.tooltip_project_singular`:`shortlist.tooltip_project_plural`,i=this.i18n.t(r);t>1&&(i=i.replace(`{count}`,t.toString())),e.setAttribute(`title`,i),e.setAttribute(`aria-label`,i)}else e.classList.contains(`hidden`)||(n=!0),e.classList.add(`hidden`),e.removeAttribute(`title`),e.removeAttribute(`aria-label`)}if(t){let e=this.service.getNotes().length;if(e>0){t.textContent!==e.toString()&&(n=!0),t.textContent=e.toString(),t.classList.remove(`hidden`);let r=e===1?`shortlist.tooltip_note_singular`:`shortlist.tooltip_note_plural`,i=this.i18n.t(r);e>1&&(i=i.replace(`{count}`,e.toString())),t.setAttribute(`title`,i),t.setAttribute(`aria-label`,i)}else t.classList.contains(`hidden`)||(n=!0),t.classList.add(`hidden`),t.removeAttribute(`title`),t.removeAttribute(`aria-label`)}n&&this.service.hasAnyData()&&this.options.behavior===`fly-to-target`&&this.startOrbitEffect()}startOrbitEffect(){if(this.options.behavior===`docked`)return;let e=document.getElementById(`shortlist-fab`);if(!e)return;let t=this.config?.features?.shortlist?.fab?.counterBadges||{},n=t.orbitDurationMs??4e3,r=t.landingDurationMs??1200;this.orbitTimeout&&clearTimeout(this.orbitTimeout),this.activeOrbitAnimations.forEach(e=>e.cancel()),this.activeOrbitAnimations.clear(),e.querySelectorAll(`.shortlist-fab__badge`).forEach(e=>{e.style.transform=``});let i=Math.random()*360,a=Math.random()*360;e.style.setProperty(`--orbit-start-projects`,`${i}deg`),e.style.setProperty(`--orbit-start-notes`,`${a}deg`),e.classList.add(`shortlist-fab--orbiting`),this.orbitTimeout=window.setTimeout(()=>{e.classList.remove(`shortlist-fab--orbiting`);let t=e.querySelector(`.shortlist-fab__badge--projects`),n=e.querySelector(`.shortlist-fab__badge--notes`);t&&this.landBadge(t,i,-45,r),n&&this.landBadge(n,a,135,r),this.orbitTimeout=null},n)}landBadge(e,t,n,r){let i=t%360,a=n-i;for(;a>180;)a-=360;for(;a<-180;)a+=360;let o=i+a,s=e.animate([{transform:`rotate(${i}deg) translateX(24px) rotate(${-i}deg)`},{transform:`rotate(${o}deg) translateX(24px) rotate(${-o}deg)`}],{duration:r,easing:`cubic-bezier(0.1, 0.8, 0.2, 1)`,fill:`forwards`});this.activeOrbitAnimations.set(e,s),s.onfinish=()=>{e.style.transform=``,this.activeOrbitAnimations.delete(e)}}setupObserver(e){let t=document.getElementById(`main-scroll`);if(!t)return;let n=(this.config?.features?.shortlist?.fab||{}).animationDelayMs??3e3;this.observer=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&e.intersectionRatio>=1&&!this.hasVibrated?(this.visibilityTimeout&&clearTimeout(this.visibilityTimeout),this.visibilityTimeout=window.setTimeout(()=>{this.hasVibrated=!0,this.observer?.disconnect(),this.startFlightSequence()},n)):!e.isIntersecting&&this.visibilityTimeout&&(clearTimeout(this.visibilityTimeout),this.visibilityTimeout=null)})},{root:t,threshold:1}),this.observer.observe(e)}startFlightSequence(){let e=document.getElementById(`shortlist-fab`);if(!e)return;let t=this.config?.features?.shortlist?.fab||{},n=t.vibrateDurationMs??1200,r=t.vibrateIntensityPx??2,i=t.vibrateIntensityDeg??5,a=t.flyDelayMs??200;e.style.setProperty(`--vibrate-px`,`${r}px`),e.style.setProperty(`--vibrate-deg`,`${i}deg`),e.classList.add(`shortlist-fab--vibrating`),this.vibrateTimeout=window.setTimeout(()=>{e.classList.remove(`shortlist-fab--vibrating`),this.flyTimeout=window.setTimeout(()=>{this.playParabolaFlyAnimation(e)},a)},n)}playParabolaFlyAnimation(e){let t=e.parentElement,n=(this.config?.features?.shortlist?.fab||{}).flightDurationMs??3200;this.hasFlown=!0;let r=t.getBoundingClientRect(),i=r.left,a=r.top,o=document.querySelector(`.main-footer__partner`),s=24;if(o){let t=o.getBoundingClientRect();s=window.innerHeight-t.bottom+(t.height-e.offsetHeight)/2}t.style.position=`fixed`,t.style.top=`${a}px`,t.style.left=`${i}px`,t.style.right=`auto`,t.style.bottom=`auto`,t.style.zIndex=`90`,t.classList.add(`shortlist-button-container--fixed`);let c=window.innerWidth-e.offsetWidth-24,l=window.innerHeight-s-e.offsetHeight,u=i+(c-i)*.5,d=a-80,f=[];for(let e=0;e<=60;e++){let t=e/60,n=1-(1-t)**2,r=(1-n)**2*i+2*(1-n)*n*u+n**2*c,o=(1-n)**2*a+2*(1-n)*n*d+n**2*l,s=Math.sin(t*Math.PI)*15;f.push({transform:`translate(${r-i}px, ${o-a}px) rotate(${s}deg)`,offset:t,easing:`linear`})}this.activeFlightAnim=e.animate(f,{duration:n,fill:`forwards`}),this.activeFlightAnim.onfinish=()=>{this.dockContainer(t,s)}}skipAnimationAndDock(){this.visibilityTimeout&&clearTimeout(this.visibilityTimeout),this.vibrateTimeout&&clearTimeout(this.vibrateTimeout),this.flyTimeout&&clearTimeout(this.flyTimeout),this.observer?.disconnect();let e=document.getElementById(`shortlist-fab`),t=document.getElementById(this.containerId);e&&e.classList.remove(`shortlist-fab--vibrating`),t&&(this.hasFlown=!0,this.dockImmediately(t))}dockImmediately(e){let t=document.getElementById(`shortlist-fab`);t&&requestAnimationFrame(()=>{let n=document.querySelector(`.main-footer__partner`),r=24;if(n){let e=n.getBoundingClientRect();r=window.innerHeight-e.bottom+(e.height-t.offsetHeight)/2}this.dockContainer(e,r),e.style.visibility=`visible`})}handleFocusReturn(){this.hasFlown&&this.activeFlightAnim&&this.activeFlightAnim.playState!==`finished`&&this.activeFlightAnim.finish()}dockContainer(e,t){e.style.top=`auto`,e.style.left=`auto`,e.style.bottom=`${t}px`,e.style.right=`24px`,e.classList.remove(`shortlist-button-container--fixed`),e.classList.add(`shortlist-button-container--docked`),this.activeFlightAnim&&=(this.activeFlightAnim.cancel(),null);let n=document.getElementById(`shortlist-fab`);n&&(n.style.transform=``,n.classList.remove(`shortlist-fab--vibrating`))}};export{a,n as c,o as i,t as l,c as n,i as o,s as r,r as s,l as t,e as u};