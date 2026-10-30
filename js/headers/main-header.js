import{BaseHeader as i}from"./base-header.js";export class MainHeader extends i{bindEvents(){super.bindEvents(),this.initSmokeToggleListener()}initSmokeToggleListener(){const n=document.getElementById("smoke-toggle-btn");if(!n)return;n.replaceWith(n.cloneNode(!0)),document.getElementById("smoke-toggle-btn").addEventListener("click",()=>{const e=document.getElementById("smoke-canvas"),o=localStorage.getItem("enableSmokeEffect"),t=!(o!==null?JSON.parse(o):!0);localStorage.setItem("enableSmokeEffect",JSON.stringify(t)),e&&(e.style.display=t?"block":"none");const a=document.getElementById("smoke-toggle-icon");if(a){const l=window.location.pathname.includes("/blog/")?"../":"./";a.src=`${l}assets/SmokeEffectToggleButton${t?"On":"Off"}_transp.png`,a.classList.toggle("grayscale",!t),a.classList.toggle("opacity-50",!t)}})}render(){const s=window.location.pathname.split("/").filter(Boolean).length<=2&&(window.location.pathname.endsWith("/")||window.location.pathname.endsWith("index.html")),e=`
            <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-500 to-brand-accent flex items-center justify-center text-slate-950 font-black text-xl shadow-lg ${s?"":"transition-transform group-hover:scale-105"}">
                &lt;/&gt;
            </div>
            <div class="flex flex-col truncate max-w-[150px] sm:max-w-none">
                <span class="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                    ${this.company} <span class="text-xs px-2 py-0.5 rounded bg-brand-500/20 text-brand-500 border border-brand-500/30 font-mono">${this.slogan}</span>
                </span>
                <span class="text-xs text-slate-400 font-medium">${this.subTitle}</span>
            </div>
        `;return`
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                ${s?`<a href="#hero" class="flex items-center gap-3 group">${e}</a>`:`<a href="${this.basePath}index.html#hero" class="flex items-center gap-3 group">${e}</a>`}
                                    
                <div class="flex items-center gap-3">
                    <button id="smoke-toggle-btn" class="hidden md:flex transition-all cursor-pointer flex items-center justify-center w-10 h-10 overflow-hidden shadow-md rounded-xl border border-slate-800 bg-slate-900/80 hover:border-slate-700" title="Smoke-Effekt ein-/ausschalten">
                        <img id="smoke-toggle-icon" src="${this.basePath}assets/SmokeEffectToggleButtonOn_transp.png" alt="Smoke Toggle" class="w-full h-full object-contain transition-all"/>
                    </button>
                    
                    ${this.renderThemeToggle()}
                </div>

                <!-- Desktop Menu -->
                <nav class="hidden md:flex items-center space-x-8 text-sm font-medium">
                    <a href="${this.basePath}index.html#about" data-nav-section="about" class="nav-link">Profil</a>
                    <a href="${this.basePath}index.html#tech-stack" data-nav-section="tech-stack" class="nav-link">Tech-Stack</a>
                    <a href="${this.basePath}index.html#projects" data-nav-section="projects" class="nav-link">Projekte</a>
                    <a href="${this.basePath}index.html#blog" data-nav-section="blog" class="nav-link">Blog</a>
                    <a href="${this.basePath}index.html#innovation" data-nav-section="innovation" class="nav-link flex items-center gap-1.5">
                        <i class="fa-solid fa-flask innovation-icon"></i> Innovationsfelder
                    </a>
                    <a href="${this.basePath}index.html#contact" data-nav-section="contact" class="px-5 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-semibold shadow-lg shadow-brand-600/20 transition-all hover:scale-105 active:scale-95">
                        Anfragen / Kontakt
                    </a>
                </nav>

                <button id="mobile-menu-btn" class="md:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white focus:outline-none">
                    <i class="fa-solid fa-bars text-xl" id="menu-icon"></i>
                </button>
            </div>
            
            <!-- Mobile Menu Dropdown -->
            <div id="mobile-menu" class="hidden md:hidden bg-slate-900/95 border-b border-slate-800 px-4 pt-2 pb-6 space-y-3">
                <a href="${this.basePath}index.html#about" data-nav-section="about" class="mobile-link nav-link block py-2 font-medium">Profil</a>
                <a href="${this.basePath}index.html#tech-stack" data-nav-section="tech-stack" class="mobile-link nav-link block py-2 font-medium">Tech-Stack</a>
                <a href="${this.basePath}index.html#projects" data-nav-section="projects" class="mobile-link nav-link block py-2 font-medium">Projekte</a>
                <a href="${this.basePath}index.html#blog" data-nav-section="blog" class="mobile-link nav-link block py-2 font-medium">Blog</a>
                <a href="${this.basePath}index.html#innovation" data-nav-section="innovation" class="mobile-link nav-link block py-2 font-medium">Innovationsfelder</a>
                <a href="${this.basePath}index.html#contact" data-nav-section="contact" class="mobile-link block w-full text-center mt-2 px-5 py-3 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-semibold">
                    Anfragen / Kontakt
                </a>
            </div>
        `}}
