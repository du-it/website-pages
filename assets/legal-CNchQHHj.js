import{i as e,n as t,r as n,t as r}from"./ThemeService-CO6axoEC.js";document.addEventListener(`DOMContentLoaded`,async()=>{let i=new t,a={};try{let e=await fetch(`/config.json`);e.ok&&(a=await e.json())}catch(e){console.warn(`[legal] Config.json konnte nicht geladen werden.`,e)}await i.init();let o=new r(a),s=document.getElementById(`legal-content`),c=document.getElementById(`legal-header-controls`),l=document.getElementById(`back-link`),u=document.getElementById(`current-year`);c&&(c.innerHTML=`
            ${n.themeToggle(`theme-toggle`,i)}
            ${n.languageToggle(`lang-toggle`,i)}
        `),new e(i,a,[`lang-toggle`]).init(),document.getElementById(`theme-toggle`)?.addEventListener(`click`,()=>{o.toggleTheme()}),u&&(u.textContent=new Date().getFullYear().toString());let d=()=>{l&&(l.textContent=i.t(`sections.blog.back_to_home`)||`Zurück zur Startseite`),s&&(s.innerHTML=`
            <!-- Impressum -->
            <section id="impressum" class="mb-16">
                <h1 class="section-title text-gradient-warm mb-6 border-b border-subtle pb-4">${i.t(`legal.imprint_title`)}</h1>
                <div class="space-y-4 text-muted text-sm leading-relaxed">
                    <p class="font-bold text-primary text-base">${i.t(`legal.imprint_owner`)}</p>
                    <p>${i.t(`legal.imprint_name`)}</p>
                    <p>${i.t(`legal.imprint_address`)}</p>
                    
                    <h2 class="text-xl font-bold text-primary mt-8 mb-2">${i.t(`legal.imprint_contact`)}</h2>
                    <p>${i.t(`legal.imprint_email`)}: <a href="mailto:d.ulrich@du-it.de" class="legal__email-link">d.ulrich@du-it.de</a></p>
                    <p>${i.t(`legal.imprint_phone`)}: +49-(0)174 948 87 39</p>

                    <p class="mt-6">${i.t(`legal.imprint_responsible`)}</p>
                </div>
            </section>

            <!-- Datenschutz -->
            <section id="datenschutz">
                <h2 class="section-title text-gradient-warm mb-6 border-b border-subtle pb-4">${i.t(`legal.privacy_title`)}</h2>
                <div class="space-y-4 text-muted text-sm leading-relaxed">
                    <h3 class="text-lg font-bold text-primary">${i.t(`legal.privacy_1_title`)}</h3>
                    <p>${i.t(`legal.privacy_1_text`)}</p>
                    
                    <h3 class="text-lg font-bold text-primary mt-6">${i.t(`legal.privacy_2_title`)}</h3>
                    <p>${i.t(`legal.privacy_2_text`)}</p>
                    
                    <h3 class="text-lg font-bold text-primary mt-6">${i.t(`legal.privacy_3_title`)}</h3>
                    <p>${i.t(`legal.privacy_3_text`)}</p>
                    
                    <h3 class="text-lg font-bold text-primary mt-6">${i.t(`legal.privacy_4_title`)}</h3>
                    <p>${i.t(`legal.privacy_4_text`)}</p>
                </div>
            </section>
        `)};d(),window.addEventListener(`languageChanged`,()=>{d()})});