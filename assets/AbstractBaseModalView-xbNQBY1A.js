var e=class{static audioCtx=null;static initAudioContextIfNeeded(){this.audioCtx||=new(window.AudioContext||window.webkitAudioContext),this.audioCtx.state===`suspended`&&this.audioCtx.resume()}static playSequence(e,t){if(this.initAudioContextIfNeeded(),this.audioCtx)try{let n=this.audioCtx.createOscillator(),r=this.audioCtx.createGain();n.type=`sine`,e.forEach(e=>{n.frequency.setValueAtTime(e.freq,this.audioCtx.currentTime+e.time)}),r.gain.setValueAtTime(.05,this.audioCtx.currentTime),r.gain.exponentialRampToValueAtTime(.001,this.audioCtx.currentTime+t),n.connect(r),r.connect(this.audioCtx.destination),n.start(),n.stop(this.audioCtx.currentTime+t)}catch(e){console.warn(`Audio Context konnte nicht gestartet werden.`,e)}}static playOpenSound(){this.playSequence([{freq:400,time:0},{freq:800,time:.05},{freq:300,time:.1}],.1)}static playCloseSound(){this.playSequence([{freq:600,time:0},{freq:200,time:.1}],.1)}},t=class{view;constructor(e){this.view=e}init(){this.view.render(),this.setupBaseEventListeners()}open(){let t=document.getElementById(this.view.modalId);t&&(t.classList.add(`is-open`),document.body.style.overflow=`hidden`,e.playOpenSound(),this.onOpen())}close(){let t=document.getElementById(this.view.modalId);t&&(t.classList.remove(`is-open`),document.body.style.overflow=``,e.playCloseSound(),this.onClose())}onOpen(){}onClose(){}setupBaseEventListeners(){document.getElementById(`${this.view.modalId}-close`)?.addEventListener(`click`,()=>this.close()),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&document.getElementById(this.view.modalId)?.classList.contains(`is-open`)&&this.close()})}},n=class{render(){document.getElementById(this.modalId)?.remove();let e=`
            <div id="${this.modalId}" class="base-modal" role="dialog" aria-modal="true" aria-labelledby="${this.titleId}">
                <div class="base-modal__window">
                    <div class="base-modal__header">
                        <h3 id="${this.titleId}" class="base-modal__title"></h3>
                        <button id="${this.modalId}-close" class="base-modal__close" aria-label="Schließen">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff0000">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div id="${this.contentId}" class="base-modal__content"></div>
                </div>
            </div>
        `;document.body.insertAdjacentHTML(`beforeend`,e)}setTitle(e){let t=document.getElementById(this.titleId);t&&(t.textContent=e)}};export{t as n,n as t};