import{i as e,n as t,r as n,t as r}from"./ThemeService-CO6axoEC.js";import{i,n as a,r as o,s,t as c}from"./ShortlistButton-BQJVnaeP.js";import{n as l,t as u}from"./AbstractBaseModalView-xbNQBY1A.js";var d=class{i18n;constructor(e){this.i18n=e}render(e,t){let n=t?.siteUrl||`https://www.du-it.de`,r=this.i18n.getLang(),i=r===`en`&&e.title_en?e.title_en:e.title,a={"@context":`https://schema.org`,"@type":`BlogPosting`,headline:i,description:r===`en`&&e.excerpt_en?e.excerpt_en:e.excerpt,image:`${n}/assets/blog/${e.id}-thumbnail.png`,datePublished:new Date(e.date).toISOString(),dateModified:new Date(e.updated||e.date).toISOString(),author:{"@type":`Person`,name:e.author,url:`${n}/#person`},publisher:{"@type":`Organization`,name:t?.branding?.legalName||t?.company||`du-it`,logo:{"@type":`ImageObject`,url:`${n}/assets/logos/du-it-logo-google-square.svg`}},mainEntityOfPage:`${n}/blog-article.html?post=${e.id}`},s={"@context":`https://schema.org`,"@type":`BreadcrumbList`,itemListElement:[{"@type":`ListItem`,position:1,name:r===`en`?`Home`:`Startseite`,item:n},{"@type":`ListItem`,position:2,name:`Blog`,item:`${n}/#blog`},{"@type":`ListItem`,position:3,name:i}]};o.injectJsonLd(`schema-blogposting`,a),o.injectJsonLd(`schema-breadcrumb`,s)}},f=class extends u{modalId=`global-info-modal`;titleId=`info-modal-title`;contentId=`info-modal-body`;render(){super.render();let e=document.getElementById(this.contentId);e&&e.classList.add(`info-modal__body`)}setContent(e){let t=document.getElementById(this.contentId);t&&(t.innerHTML=e)}},p=class extends l{view;constructor(e){super(e),this.view=e}init(){super.init(),this.setupInfoListeners()}setupInfoListeners(){document.addEventListener(`click`,e=>{let t=e.target.closest(`[data-info-template]`);if(!t)return;e.preventDefault();let n=t.getAttribute(`data-info-template`);n&&this.openTemplate(n)})}openTemplate(e){let t=document.getElementById(e);t&&(this.view.setTitle(t.dataset.title||``),this.view.setContent(t.innerHTML),this.open())}},m=class{static init(){document.querySelectorAll(`.code-block`).forEach(e=>{e.querySelector(`.code-block__header`)||this.setupBlock(e)})}static setupBlock(e){let t=e.querySelector(`pre`);if(!t)return;let n=`
            <div class="code-block__header">
                <span class="code-block__lang">${e.dataset.language||`Code`}</span>
                <button class="code-block__copy-btn" title="In Zwischenablage kopieren" aria-label="Code in Zwischenablage kopieren">
                    <i class="fa-regular fa-copy"></i>
                </button>
            </div>
        `;e.insertAdjacentHTML(`afterbegin`,n);let r=document.createElement(`div`);r.className=`code-block__body`,e.appendChild(r),r.appendChild(t);let i=e.querySelector(`.code-block__copy-btn`);i?.addEventListener(`click`,()=>{let e=t.innerText||``;navigator.clipboard.writeText(e).then(()=>{i.innerHTML=`<i class="fa-solid fa-check"></i>`,i.classList.add(`is-copied`),setTimeout(()=>{i.innerHTML=`<i class="fa-regular fa-copy"></i>`,i.classList.remove(`is-copied`)},2e3)})})}};document.addEventListener(`DOMContentLoaded`,async()=>{let o=new t;await o.init();let l={};try{let e=await fetch(`/config.json`);e.ok&&(l=await e.json())}catch(e){console.warn(`Config.json konnte nicht geladen werden.`,e)}let u=new r(l);new p(new f).init();let g=document.getElementById(`blog-article-root`);if(!g)return;let _=null;g.innerHTML=`
        <div class="fixed inset-0 z-0 bg-canvas transition-colors duration-500"></div>
        <div class="h-screen w-full overflow-hidden relative z-10 flex flex-col">
            
            <header class="w-full shrink-0 bg-surface border-b border-subtle py-3 px-6 flex justify-between items-center z-50 shadow-sm">
                <div class="flex items-center gap-6">
                    <a href="/index.html#hero" class="group transition-transform hover:scale-105 shrink-0" aria-label="Startseite du-it">
                        ${s.render(l,o,{size:`small`,showSlogan:!1,logoPosition:`left`,animate:`none`,logoSize:`w-6 h-6`})}
                    </a>
                    
                    <a href="/blog-overview.html" id="back-to-blog-link" class="inline-flex items-center gap-2 text-muted hover:text-amber-600 dark:hover:text-cyan-400 transition-colors text-sm font-sans font-bold group border-l border-subtle pl-6">
                        <i class="fa-solid fa-arrow-left text-xs transition-transform group-hover:-translate-x-1"></i> 
                        ${o.t(`sections.blog.article.back_to_overview`)||`Zurück zur Blog-Übersicht`}
                    </a>
                </div>
                
                <div class="flex items-center gap-2">
                    ${n.languageToggle(`lang-toggle-article`,o)}
                    ${n.themeToggle(`theme-toggle-article`,o)}
                </div>
            </header>

            <main class="site-layout__main-content flex-1 h-full overflow-y-auto overflow-x-hidden scroll-smooth px-4 sm:px-6 py-8" id="main-scroll">
                <div class="max-w-3xl mx-auto space-y-10 pb-12">
                    
                    <div id="article-header-container"></div>
                    <div id="article-takeaways-container"></div>
                    <div id="article-content-body" class="w-full"></div>

                    <div class="pt-8 border-t border-subtle flex flex-col sm:flex-row items-center gap-6 bg-surface p-6 rounded-2xl">
                        <img src="/assets/dirk-ulrich-portrait-2-square.webp" alt="Dirk Ulrich" class="w-20 h-20 rounded-2xl object-cover border-2 border-brand-500/30 shrink-0">
                        <div>
                            <h4 class="text-lg font-bold text-primary mb-1">Dirk Ulrich</h4>
                            <p class="text-xs font-mono blog-article__author-role mb-2">Senior Java Backend Developer</p>
                            <p class="text-xs text-muted leading-relaxed" id="author-bio-text">
                                ${o.t(`sections.blog.author_bio`)||`Seit über 25 Jahren freiberuflicher Softwareentwickler im Enterprise-Umfeld mit Spezialisierung auf Java, Spring Boot Microservices und moderne KI-Integrationsmuster.`}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Slot für den Shortlist-FAB -->
                <div id="shortlist-button-container"></div>
            </main>
            
            <div id="footer-container" class="w-full shrink-0 pb-6 pl-4 md:pl-16 pr-4 md:pr-16 border-t border-subtle bg-surface/30"></div>
        </div>

        <!-- Slot für die RightSidebar (Drawer & Modal) -->
        <div id="right-sidebar-container"></div>
    `,new a(`footer-container`,o,l).render();let v=new i(`right-sidebar-container`,o);v.render();let y=new c(`shortlist-button-container`,o,l,{behavior:`docked`});y.render(),new e(o,l,[`lang-toggle-article`]).init(),document.getElementById(`theme-toggle-article`)?.addEventListener(`click`,()=>u.toggleTheme()),window.addEventListener(`languageChanged`,()=>{let e=document.getElementById(`back-to-blog-link`);e&&(e.innerHTML=`<i class="fa-solid fa-arrow-left text-xs transition-transform group-hover:-translate-x-1"></i> ${o.t(`sections.blog.article.back_to_overview`)||`Zurück zur Blog-Übersicht`}`);let t=document.getElementById(`author-bio-text`);if(t&&(t.textContent=o.t(`sections.blog.author_bio`)||`Seit über 25 Jahren...`),v.updateTexts(),y.updateTexts(),_){let e=document.getElementById(`article-content-body`)?.innerHTML||``;h(_,e),new d(o).render(_,l)}});let b=new URLSearchParams(window.location.search).get(`post`);if(b)try{let e=(await(await fetch(`/assets/blog-index.json`)).json()).posts.find(e=>e.id===b&&e.visible);if(!e){let e=document.getElementById(`article-content-body`);e&&(e.innerHTML=`<p class="text-red-500">Artikel nicht gefunden.</p>`),document.body.style.visibility=`visible`;return}let t=await(await fetch(`/assets/${e.metaPath}`)).json();_=t;let n=await(await fetch(`/assets/${t.contentPath}`)).text();t.customCss&&await new Promise(e=>{let n=document.createElement(`link`);n.rel=`stylesheet`,n.href=`/assets/${t.customCss}`,n.onload=()=>e(),n.onerror=()=>{console.error(`CSS konnte nicht geladen werden: ${n.href}`),e()},document.head.appendChild(n)}),h(t,n),new d(o).render(t,l),m.init()}catch(e){console.error(e);let t=document.getElementById(`article-content-body`);t&&(t.innerHTML=`<p class="text-red-500">Fehler beim Laden des Artikels: ${e.message}</p>`)}finally{document.body.style.visibility=`visible`}else{let e=document.getElementById(`article-content-body`);e&&(e.innerHTML=`<p class="text-red-500">Kein Artikel angegeben.</p>`),document.body.style.visibility=`visible`}});function h(e,t){let n=document.getElementById(`article-header-container`);n&&(n.innerHTML=`
            <div class="mb-4">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono border border-brand-500/30 bg-brand-500/10 blog-article__category-badge">
                    ${e.categoryLabel}
                </span>
            </div>
            <h1 class="text-3xl sm:text-5xl font-serif font-medium text-primary tracking-tight leading-tight mb-6">
                ${e.title}
            </h1>
            <div class="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-muted p-4 rounded-xl border border-subtle bg-surface">
                <div class="flex items-center gap-2"><i class="fa-regular fa-calendar"></i> ${e.updated||e.date}</div>
                <div class="flex items-center gap-2"><i class="fa-regular fa-clock"></i> ${e.readTime}</div>
                <div class="flex items-center gap-2"><i class="fa-regular fa-user"></i> ${e.author}</div>
            </div>
        `);let r=document.getElementById(`article-takeaways-container`);r&&e.takeaways&&e.takeaways.length>0&&(r.innerHTML=`
            <div class="bg-surface border border-subtle rounded-xl p-6 shadow-sm my-8">
                <h3 class="text-sm font-bold text-primary mb-3 flex items-center gap-2">
                    <i class="fa-solid fa-lightbulb text-amber-500"></i> Key Takeaways
                </h3>
                <ul class="list-disc pl-5 space-y-2 text-sm text-muted">
                    ${e.takeaways.map(e=>`<li>${e}</li>`).join(``)}
                </ul>
            </div>
        `);let i=document.getElementById(`article-content-body`);i&&t&&(i.innerHTML=t)}