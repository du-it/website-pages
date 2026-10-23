import{BaseHeader as e}from"./base-header.js";export class BlogArticleHeader extends e{render(){return`
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                <!-- Klick auf das Logo f\xFChrt zur\xFCck zur Startseite (/index.html) -->
                <a href="${this.basePath}index.html#hero" class="flex items-center gap-3 group">
                    <!-- Magenta-Akzent f\xFCr das Artikel-Logo zur visuellen Unterscheidung -->
                    <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white font-black text-xl shadow-lg transition-transform group-hover:scale-105">
                        &lt;/&gt;
                    </div>
                    <div class="flex flex-col">
                        <span class="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                            ${this.company} <span class="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 border border-purple-500/30 font-mono">Blog-Artikel</span>
                        </span>
                        <span class="text-xs text-slate-400 font-medium">${this.subTitle}</span>
                    </div>
                </a>

                <div class="flex items-center gap-4">
                    <!-- Theme Toggle \xFCber geerbte Methode eingebunden -->
                    ${this.renderThemeToggle()}

                    <!-- Zur\xFCck-Link f\xFChrt zur Blog-\xDCbersicht (archive.html) -->
                    <a href="./archive.html" class="flex items-center gap-2 text-slate-400 hover:text-purple-400 font-mono text-xs transition-colors ml-2">
                        <i class="fa-solid fa-arrow-left text-[10px]"></i>
                        <span>Zur\xFCck zur Blog-\xDCbersicht</span>
                    </a>
                </div>
            </div>
        `}}
