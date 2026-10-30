import{MainHeader as o}from"./headers/main-header.js";import{BlogOverviewHeader as i}from"./headers/blog-overview-header.js";import{BlogArticleHeader as n}from"./headers/blog-article-header.js";export function renderHeader(e="full",r={}){let a;e==="blog-article"?a=new n(r):e==="blog-overview"?a=new i(r):a=new o(r),a.init()}export function renderFooter(e={}){const{company:r="du-it",brandSlogan:a="Smart Java Development"}=e,t=document.getElementById("main-footer");if(!t)return;const l=window.location.pathname.includes("/blog/")?"../":"./";t.className="footer",t.innerHTML=`
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div class="flex items-center gap-2 text-center md:text-left">
                <a href="${l}index.html#hero" class="text-slate-900 dark:text-white font-bold hover:text-brand-500 transition-colors">
                    ${r}
                </a>
                <span class="text-xs footer-text">| ${a}</span>
                <span class="text-xs footer-text-muted ml-2">\xA9 ${new Date().getFullYear()} Dirk Ulrich-Informationstechnologie</span>
            </div>
            
            <div class="text-xs footer-text">
                Projektpartner & Vermittlung: <a href="https://symbiolab.de/" target="_blank" rel="noopener noreferrer" 
                class="inline-block px-1.5 py-0.5 rounded bg-transparent hover:bg-white dark:hover:bg-transparent border border-transparent hover:border-slate-200 dark:hover:border-transparent transition-all duration-200">
                    <img src="${l}assets/logo.symbiolab.svg" alt="symbiolab.de" class="h-6 w-auto inline relative top-[2px] brightness-100 dark:brightness-150">
                </a>
            </div>

            <!-- Social Links -->
            <nav aria-label="Social-Media-Profile" class="flex items-center gap-4 footer-text">
                <a href="https://www.linkedin.com/in/du-it-dirk-ulrich/" target="_blank" rel="noopener noreferrer"
                   aria-label="LinkedIn-Profil von Dirk Ulrich" title="LinkedIn-Profil"
                   class="hover:text-brand-500 transition-colors">
                    <i class="fa-brands fa-linkedin text-xl"></i>
                </a>
                <a href="https://www.xing.com/profile/Dirk_Ulrich/web_profiles" target="_blank" rel="noopener noreferrer"
                   aria-label="XING-Profil von Dirk Ulrich" title="XING-Profil"
                   class="hover:text-brand-500 transition-colors">
                    <i class="fa-brands fa-xing text-xl"></i>
                </a>
                <a href="https://jobtic.com/profile/dirk-ulrich" target="_blank" rel="noopener noreferrer"
                   aria-label="jobtic-Profil von Dirk Ulrich" title="jobtic-Profil"
                   class="hover:text-brand-500 transition-colors flex items-center">
                    <img src="${l}assets/jobtic-logo.png" alt="jobtic" class="h-5 w-auto inline transition-all dark:brightness-125">
                </a>
                <a href="https://github.com/du-it" target="_blank" rel="noopener noreferrer"
                   aria-label="GitHub-Profil von du-it" title="GitHub-Profil"
                   class="hover:text-brand-500 transition-colors">
                    <i class="fa-brands fa-github text-xl"></i>
                </a>
            </nav>

            <!-- Legal Modal Trigger -->
            <div class="flex items-center space-x-6 text-xs footer-text">
                <button id="btn-impressum" class="hover:text-brand-500 transition-colors">Impressum</button>
                <span>\u2022</span>
                <button id="btn-datenschutz" class="hover:text-brand-500 transition-colors">Datenschutz</button>
            </div>
        </div>
    `}export function renderGlobalModals(){if(document.getElementById("global-info-modal"))return;(document.getElementById("global-modals")||document.body).insertAdjacentHTML("beforeend",`
        <dialog id="global-info-modal" class="m-auto backdrop:bg-slate-950/80 backdrop:backdrop-blur-sm rounded-2xl bg-slate-900 text-slate-300 border border-slate-800 p-6 max-w-2xl w-11/12 shadow-2xl focus:outline-none">
            <form method="dialog">
                <div class="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                    <div class="flex items-center space-x-2 text-sky-400 font-bold text-lg">
                        <span id="modal-title"></span>
                    </div>
                    <button type="submit" class="text-slate-400 hover:text-white p-1 rounded-lg">\u2715</button>
                </div>
                <div id="modal-body" class="space-y-4 text-sm leading-relaxed overflow-y-auto max-h-[70vh] pr-1"></div>
                <div class="mt-6 pt-4 border-t border-slate-800 flex justify-end">
                    <button type="submit" class="px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium">Schlie\xDFen</button>
                </div>
            </form>
        </dialog>
    `)}export function renderArticleHeader(e,r={}){const t={...{categoryBadgeClass:"bg-purple-100 dark:bg-purple-500/10 text-purple-800 dark:text-purple-400 border-purple-200 dark:border-purple-500/20",titleClass:"text-2xl sm:text-5xl font-medium text-slate-900 dark:text-white tracking-tight leading-tight mb-6",teaserClass:"text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-light mb-8",metaBarClass:"bg-purple-50 dark:bg-purple-500/10 border-purple-200 dark:border-purple-500/20 text-slate-700 dark:text-slate-300",iconClass:"text-purple-600 dark:text-purple-400"},...r},s=e.author||"Dirk Ulrich";return`
    <header class="mb-12 pb-8 border-b border-slate-200 dark:border-slate-800/60">

        <!-- Kategorie / Tag -->
        <div class="mb-4">
            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-medium border ${t.categoryBadgeClass}">
                ${e.category}
            </span>
        </div>

        <!-- Titel -->
        <h1 class="${t.titleClass}">
            ${e.title}
        </h1>

        <!-- Kurze Zusammenfassung / Teaser (optional) -->
        ${e.teaser?`<p class="${t.teaserClass}">${e.teaser}</p>`:""}

        <!-- Meta-Zeile: Datum, Lesezeit, Autor -->
        <div class="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-mono p-4 rounded-xl border ${t.metaBarClass}">
            <div class="flex items-center gap-2">
                <i class="fa-regular fa-calendar ${t.iconClass} flex-shrink-0"></i>
                <span>Zuletzt aktualisiert:${e.updated||e.date}</span>
            </div>
            <div class="flex items-center gap-2">
                <i class="fa-regular fa-clock ${t.iconClass} flex-shrink-0"></i>
                <span>${e.readTime}</span>
            </div>
            <div class="flex items-center gap-2">
                <i class="fa-regular fa-user ${t.iconClass} flex-shrink-0"></i>
                <span>${s}</span>
            </div>
        </div>

    </header>
    `}
