import{BaseHeader as e}from"./base-header.js";export class BlogOverviewHeader extends e{render(){return`
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                <!-- Klick auf das Logo f\xFChrt zur\xFCck zur Startseite -->
                <a href="${this.basePath}index.html#hero" class="flex items-center gap-3 group">
                    <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-500 to-brand-accent flex items-center justify-center text-slate-950 font-black text-xl shadow-lg transition-transform group-hover:scale-105">
                        &lt;/&gt;
                    </div>
                    <div class="flex flex-col">
                        <span class="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                            ${this.company} <span class="text-xs px-2 py-0.5 rounded bg-brand-500/20 text-brand-500 border border-brand-500/30 font-mono">Blog-Archiv</span>
                        </span>
                        <span class="text-xs text-slate-500 dark:text-slate-400 font-medium">${this.subTitle}</span>
                    </div>
                </a>

                <div class="flex items-center gap-4">
                    <!-- Theme Toggle -->
                    ${this.renderThemeToggle()}

                    <!-- Zur\xFCck zur Hauptseite -->
                    <a href="${this.basePath}index.html#blog" class="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-brand-500 font-mono text-xs transition-colors ml-2">
                        <i class="fa-solid fa-arrow-left text-[10px]"></i>
                        <span>Zur\xFCck zur Hauptseite</span>
                    </a>
                </div>
            </div>
        `}}
