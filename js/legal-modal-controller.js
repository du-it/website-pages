export class LegalModalController{constructor(e={}){this.company=e.company||"du-it Dirk Ulrich-Informationstechnologie",this.developerName=e.developerName||"Dirk Ulrich",this.email=e.email||"d.ulrich@du-it.de",this.roleDescription=e.roleDescription||"Dipl.-Inf. FH Allgemeine Informatik",this.modal=document.getElementById("legal-modal"),this.modalContent=document.getElementById("modal-content"),this.closeBtn=document.getElementById("close-modal"),this.btnImpressum=document.getElementById("btn-impressum"),this.btnDatenschutz=document.getElementById("btn-datenschutz"),this.initEvents()}initEvents(){this.btnImpressum&&this.btnImpressum.addEventListener("click",()=>this.showImpressum()),this.btnDatenschutz&&this.btnDatenschutz.addEventListener("click",()=>this.showDatenschutz()),this.closeBtn&&this.closeBtn.addEventListener("click",()=>this.hide())}showImpressum(){this.modalContent&&(this.modalContent.innerHTML=`
            <h3 class="text-xl font-bold text-white mb-4">Impressum</h3>
            <p class="font-bold">${this.company} Dirk Ulrich-Informationstechnologie</p>
            <p>Inhaber: ${this.developerName} (Dipl.-Inf. FH Allgemeine Informatik)</p>
            <p>Anschrift: 14621 Sch\xF6nwalde-Glien (bei Berlin), Deutschland</p>
            <p class="mt-4"><strong>Kontakt:</strong></p> 
            <p>E-Mail: ${this.email}</p>
            <p class="mt-4 text-xs text-slate-400">Verantwortlich f\xFCr den Inhalt nach \xA7 55 Abs. 2 RStV: ${this.developerName}</p>
        `,this.show())}showDatenschutz(){this.modalContent&&(this.modalContent.innerHTML=`
            <h3 class="text-xl font-bold text-white mb-4">Datenschutzerkl\xE4rung</h3>
            <p class="text-xs leading-relaxed">
                Diese Webseite ist als leichtgewichtige Single-Page-Anwendung konzipiert. Es werden keine Tracking-Cookies oder Werbe-Analysedienste von Drittanbietern eingesetzt.
            </p>
            <p class="text-xs leading-relaxed mt-2">
                Daten, die Sie \xFCber das Kontaktformular senden, werden ausschlie\xDFlich zur Bearbeitung Ihrer Projektanfrage verarbeitet und nicht an Dritte weitergegeben.
            </p>
        `,this.show())}show(){this.modal&&(this.modal.classList.remove("hidden"),this.modal.classList.add("flex"))}hide(){this.modal&&(this.modal.classList.add("hidden"),this.modal.classList.remove("flex"))}}
