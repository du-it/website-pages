import{c as e}from"./ShortlistButton-BQJVnaeP.js";var t=class{async loadBlogData(){try{console.log(`[BlogService] Lade blog-index.json von: /assets/blog-index.json`);let e=await fetch(`/assets/blog-index.json`);if(!e.ok)return console.error(`Blog-Index konnte nicht geladen werden (HTTP ${e.status}). Pfad prüfen: /assets/blog-index.json`),{categories:[],posts:[]};let t=await e.json(),n=t.posts.filter(e=>e.visible);n.length===0&&console.warn(`[BlogService] Keine sichtbaren Posts in der blog-index.json gefunden (visible: true fehlt).`);let r=n.map(async e=>{let t=`/assets/${e.metaPath}`;console.log(`[BlogService] Lade Metadaten für Post "${e.id}" von: ${t}`);try{let e=await fetch(t);return e.ok?await e.json():(console.error(`[BlogService] HTTP Fehler ${e.status} beim Laden von ${t}`),null)}catch(e){return console.error(`[BlogService] Netzwerkfehler beim Laden von ${t}:`,e),null}}),i=(await Promise.all(r)).filter(e=>e!==null);return i.sort((e,t)=>new Date(t.date).getTime()-new Date(e.date).getTime()),console.log(`[BlogService] Erfolgreich ${i.length} Posts geladen.`),{categories:t.categories,posts:i}}catch(e){return console.error(`[BlogService] Kritischer Fehler beim Laden der Blog-Daten:`,e),{categories:[],posts:[]}}}},n=class{containerId;i18n;service;categories=[];posts=[];activeCategory=`all`;constructor(e,n){this.containerId=e,this.i18n=n,this.service=new t}async loadData(){let e=await this.service.loadBlogData();this.categories=e.categories,this.posts=e.posts}renderFiltersHtml(){return this.categories.filter(e=>e.visible!==!1).map(e=>{let t=this.activeCategory===e.id,n=e.color||`cyan`,r=`blog-filter__btn`;return t&&(r+=` is-active bg-${n}-100 dark:bg-${n}-500/10 text-${n}-700 dark:text-${n}-400 border-${n}-300 dark:border-${n}-500/30`),`
                <button class="${r}" data-filter="${e.id}">
                    ${e.id===`all`?this.i18n.t(`sections.blog.common.all_categories`):e.label}
                </button>
            `}).join(``)}renderCard(t){let n=e.formatRichText(t.excerpt),r=`blog-card__category--${this.categories.find(e=>e.id===t.category)?.color||`cyan`}`,i=t.updated||t.date,a=!!(t.updated&&t.updated!==t.date);return`
            <article class="blog-card group">
                <div class="blog-card__header">
                    <span class="blog-card__category ${r}">${t.categoryLabel}</span>
                    <span class="blog-card__date" title="${a?`Aktualisiert am `+t.updated:`Erstellt am `+t.date}">${i}</span>
                </div>
                <h3 class="blog-card__title group-hover:text-cyan-500 transition-colors">${t.title}</h3>
                <p class="blog-card__excerpt">${n}</p>
                <div class="blog-card__footer">
                    <span class="blog-card__readtime"><i class="fa-regular fa-clock"></i> ${t.readTime}</span>
                    <a href="/blog-article.html?post=${t.id}" class="blog-card__link">
                        ${this.i18n.t(`sections.blog.common.read_more`)} <i class="fa-solid fa-arrow-right text-[10px] transition-transform group-hover:translate-x-1"></i>
                    </a>
                </div>
            </article>
        `}setupFilterListeners(e,t,n){let r=e.querySelector(`#${t}`);r&&r.addEventListener(`click`,e=>{let t=e.target.closest(`.blog-filter__btn`);if(t){let e=t.getAttribute(`data-filter`);e&&e!==this.activeCategory&&(this.activeCategory=e,n())}})}};export{t as n,n as t};