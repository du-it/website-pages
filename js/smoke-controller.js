"use strict";export class SmokeController{constructor(e={}){this.canvas=document.getElementById("smoke-canvas"),this.isInitialized=!1,this.gl=null,this.ext=null,this.textureWidth=0,this.textureHeight=0,this.density=null,this.velocity=null,this.divergence=null,this.curl=null,this.pressure=null,this.clearProgram=null,this.displayProgram=null,this.splatProgram=null,this.advectionProgram=null,this.divergenceProgram=null,this.curlProgram=null,this.vorticityProgram=null,this.pressureProgram=null,this.gradienSubtractProgram=null,this.blit=null,this.pointers=[],this.splatStack=[],this.config={TEXTURE_DOWNSAMPLE:1,DENSITY_DISSIPATION:.95,VELOCITY_DISSIPATION:.86,PRESSURE_DISSIPATION:.06,PRESSURE_ITERATIONS:25,CURL:65,SPLAT_RADIUS:55e-5,DENSITY_INTENSITY:.015,COLOR_INTENSITY:2.5,SPLAT_COLOR_WEIGHTS:[.1,.09,.1],THEME_COLORS:{dark:[245,160,90],light:[120,170,255]}},this.lastTime=Date.now(),this.lastMoveTime=Date.now(),this.lastX=0,this.lastY=0;const i=this.config.THEME_COLORS.dark,t=this.config.COLOR_INTENSITY;this.pointerColor=[i[0]/255*t,i[1]/255*t,i[2]/255*t];const o=localStorage.getItem("enableSmokeEffect");this.isEnabled=o!==null?JSON.parse(o):e?.enableSmokeEffect!==!1,this.canvas&&(this.isEnabled?(this.init(),this.canvas.classList.add("active")):(this.canvas.style.display="none",this.canvas.classList.remove("active"))),this.initSmokeToggle()}initSmokeToggle(){const e=document.getElementById("smoke-toggle-btn"),i=document.getElementById("smoke-toggle-icon");!e||!i||(this.updateToggleVisuals(i),e.addEventListener("click",()=>{this.isEnabled=!this.isEnabled,localStorage.setItem("enableSmokeEffect",JSON.stringify(this.isEnabled)),this.updateToggleVisuals(i),this.isEnabled?this.canvas&&(this.canvas.style.display="block",this.canvas.classList.add("active"),this.isInitialized?(this.lastTime=Date.now(),requestAnimationFrame(()=>this.update())):this.init()):this.canvas&&(this.canvas.style.display="none",this.canvas.classList.add("active"))}))}updateToggleVisuals(e){const t=window.location.pathname.includes("/blog/")?"../":"./";this.isEnabled?(e.src=`${t}assets/SmokeEffectToggleButtonOn_transp.png`,e.classList.remove("grayscale","opacity-50")):(e.src=`${t}assets/SmokeEffectToggleButtonOff_transp.png`,e.classList.add("grayscale","opacity-50"))}init(){if(this.isInitialized)return;this.isInitialized=!0;const e=this.canvas;e.width=e.clientWidth,e.height=e.clientHeight;const i=this.getWebGLContext(e);if(this.gl=i.gl,this.ext=i.ext,!this.gl)return;const t=this.gl;this.initContextHandling(),this.initResizeHandling();function o(){this.id=-1,this.x=0,this.y=0,this.dx=0,this.dy=0,this.down=!1,this.moved=!1,this.color=[30,0,300]}this.pointers.push(new o);class s{constructor(E,c,R){if(this.gl=E,this.uniforms={},this.program=this.gl.createProgram(),this.gl.attachShader(this.program,c),this.gl.attachShader(this.program,R),this.gl.linkProgram(this.program),!this.gl.getProgramParameter(this.program,this.gl.LINK_STATUS))throw this.gl.getProgramInfoLog(this.program);const S=this.gl.getProgramParameter(this.program,this.gl.ACTIVE_UNIFORMS);for(let T=0;T<S;T++){const p=this.gl.getActiveUniform(this.program,T).name;this.uniforms[p]=this.gl.getUniformLocation(this.program,p)}}bind(){this.gl.useProgram(this.program)}}const n=(v,E)=>{const c=t.createShader(v);if(t.shaderSource(c,E),t.compileShader(c),!t.getShaderParameter(c,t.COMPILE_STATUS))throw t.getShaderInfoLog(c);return c},a=n(t.VERTEX_SHADER,`
            precision highp float;
            attribute vec2 aPosition;
            varying vec2 vUv;
            varying vec2 vL;
            varying vec2 vR;
            varying vec2 vT;
            varying vec2 vB;
            uniform vec2 texelSize;
            void main () {
                vUv = aPosition * 0.5 + 0.5;
                vL = vUv - vec2(texelSize.x, 0.0);
                vR = vUv + vec2(texelSize.x, 0.0);
                vT = vUv + vec2(0.0, texelSize.y);
                vB = vUv - vec2(0.0, texelSize.y);
                gl_Position = vec4(aPosition, 0.0, 1.0);
            }
        `),r=n(t.FRAGMENT_SHADER,`
            precision highp float;
            varying vec2 vUv;
            uniform sampler2D uTexture;
            uniform float value;
            void main () {
                gl_FragColor = value * texture2D(uTexture, vUv);
            }
        `),h=n(t.FRAGMENT_SHADER,`
            precision highp float;
            varying vec2 vUv;
            uniform sampler2D uTexture;
            void main () {
                vec4 texColor = texture2D(uTexture, vUv);
                // Alpha-Wert aus der Helligkeit/Dichte ableiten (schwarz = transparent)
                float alpha = max(texColor.r, max(texColor.g, texColor.b));
                gl_FragColor = vec4(texColor.rgb, alpha);
            }
            // void main () {
            //     gl_FragColor = texture2D(uTexture, vUv);
            // }
        `),u=n(t.FRAGMENT_SHADER,`
            precision highp float;
            varying vec2 vUv;
            uniform sampler2D uTarget;
            uniform float aspectRatio;
            uniform vec3 color;
            uniform vec2 point;
            uniform float radius;
            void main () {
                vec2 p = vUv - point.xy;
                p.x *= aspectRatio;
                vec3 splat = exp(-dot(p, p) / radius) * color;
                vec3 base = texture2D(uTarget, vUv).xyz;
                gl_FragColor = vec4(base + splat, 1.0);
            }
        `),g=n(t.FRAGMENT_SHADER,`
            precision highp float;
            varying vec2 vUv;
            uniform sampler2D uVelocity;
            uniform sampler2D uSource;
            uniform vec2 texelSize;
            uniform float dt;
            uniform float dissipation;
            void main () {
                vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
                gl_FragColor = dissipation * texture2D(uSource, coord);
                gl_FragColor.a = 1.0;
            }
        `),l=n(t.FRAGMENT_SHADER,`
            precision highp float;
            varying vec2 vUv, vL, vR, vT, vB;
            uniform sampler2D uVelocity;
            void main () {
                float L = texture2D(uVelocity, vL).x;
                float R = texture2D(uVelocity, vR).x;
                float T = texture2D(uVelocity, vT).y;
                float B = texture2D(uVelocity, vB).y;
                float div = 0.5 * (R - L + T - B);
                gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
            }
        `),f=n(t.FRAGMENT_SHADER,`
            precision highp float;
            varying vec2 vUv, vL, vR, vT, vB;
            uniform sampler2D uVelocity;
            void main () {
                float L = texture2D(uVelocity, vL).y;
                float R = texture2D(uVelocity, vR).y;
                float T = texture2D(uVelocity, vT).x;
                float B = texture2D(uVelocity, vB).x;
                float vorticity = R - L - T + B;
                gl_FragColor = vec4(vorticity, 0.0, 0.0, 1.0);
            }
        `),d=n(t.FRAGMENT_SHADER,`
            precision highp float;
            varying vec2 vUv, vT, vB;
            uniform sampler2D uVelocity, uCurl;
            uniform float curl, dt;
            void main () {
                float T = texture2D(uCurl, vT).x;
                float B = texture2D(uCurl, vB).x;
                float C = texture2D(uCurl, vUv).x;
                vec2 force = vec2(abs(T) - abs(B), 0.0);
                force *= 1.0 / length(force + 0.00001) * curl * C;
                vec2 vel = texture2D(uVelocity, vUv).xy;
                gl_FragColor = vec4(vel + force * dt, 0.0, 1.0);
            }
        `),m=n(t.FRAGMENT_SHADER,`
            precision highp float;
            varying vec2 vUv, vL, vR, vT, vB;
            uniform sampler2D uPressure, uDivergence;
            void main () {
                float L = texture2D(uPressure, vL).x;
                float R = texture2D(uPressure, vR).x;
                float T = texture2D(uPressure, vT).x;
                float B = texture2D(uPressure, vB).x;
                float divergence = texture2D(uDivergence, vUv).x;
                float pressure = (L + R + B + T - divergence) * 0.25;
                gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
            }
        `),x=n(t.FRAGMENT_SHADER,`
            precision highp float;
            varying vec2 vUv, vL, vR, vT, vB;
            uniform sampler2D uPressure, uVelocity;
            uniform vec2 texelSize;
            void main () {
                if (vUv.x < texelSize.x * 2.0 || vUv.x > 1.0 - texelSize.x * 2.0) {
                    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
                    return;
                }
                float L = texture2D(uPressure, vL).x;
                float R = texture2D(uPressure, vR).x;
                float T = texture2D(uPressure, vT).x;
                float B = texture2D(uPressure, vB).x;
                vec2 velocity = texture2D(uVelocity, vUv).xy;
                velocity.xy -= vec2(R - L, T - B);
                gl_FragColor = vec4(velocity, 0.0, 1.0);
            }
        `);this.initFramebuffers(),this.clearProgram=new s(t,a,r),this.displayProgram=new s(t,a,h),this.splatProgram=new s(t,a,u),this.advectionProgram=new s(t,a,g),this.divergenceProgram=new s(t,a,l),this.curlProgram=new s(t,a,f),this.vorticityProgram=new s(t,a,d),this.pressureProgram=new s(t,a,m),this.gradienSubtractProgram=new s(t,a,x),this.blit=(t.bindBuffer(t.ARRAY_BUFFER,t.createBuffer()),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),t.STATIC_DRAW),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,t.createBuffer()),t.bufferData(t.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,0,2,3]),t.STATIC_DRAW),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0),t.enableVertexAttribArray(0),v=>{t.bindFramebuffer(t.FRAMEBUFFER,v),t.drawElements(t.TRIANGLES,6,t.UNSIGNED_SHORT,0)}),this.multipleSplats(parseInt(Math.random()*20)+5),this.listenersInitialized||(this.initEventListeners(e),this.listenersInitialized=!0),this.update(),console.log("Smoke Effect Controller initialized successfully.")}initEventListeners(e){e.addEventListener("mousemove",i=>{if(!this.isEnabled)return;const t=Date.now(),o=t-this.lastMoveTime;this.lastMoveTime=t;const s=15,n=Math.max(s,Math.min(e.width-s,i.offsetX)),a=Math.max(s,Math.min(e.height-s,i.offsetY));if(o>100||!this.pointers[0].down){this.lastX=n,this.lastY=a,this.pointers[0].x=n,this.pointers[0].y=a,this.pointers[0].dx=0,this.pointers[0].dy=0,this.pointers[0].down=!0,this.pointers[0].moved=!1;return}this.pointers[0].moved=!0,this.pointers[0].dx=(n-this.lastX)*10,this.pointers[0].dy=(a-this.lastY)*10,this.pointers[0].x=n,this.pointers[0].y=a,this.lastX=n,this.lastY=a}),e.addEventListener("mousemove",()=>{this.isEnabled&&(this.pointers[0].down=!0,this.pointers[0].color=this.pointerColor)}),e.addEventListener("mousedown",i=>{if(!this.isEnabled)return;this.pointers[0].down=!0;const t=15,o=Math.max(t,Math.min(e.width-t,i.offsetX)),s=Math.max(t,Math.min(e.height-t,i.offsetY));this.lastX=o,this.lastY=s,this.pointers[0].x=o,this.pointers[0].y=s,this.pointers[0].dx=0,this.pointers[0].dy=0,this.lastMoveTime=Date.now()}),window.addEventListener("mouseup",()=>{this.pointers[0].down=!1,this.pointers[0].dx=0,this.pointers[0].dy=0}),e.addEventListener("mouseleave",()=>{this.pointers[0].down=!1,this.pointers[0].dx=0,this.pointers[0].dy=0})}deleteFBO(e){if(!e)return;const i=this.gl;e.read?(i.deleteTexture(e.read[0]),i.deleteFramebuffer(e.read[1]),i.deleteTexture(e.write[0]),i.deleteFramebuffer(e.write[1])):(i.deleteTexture(e[0]),i.deleteFramebuffer(e[1]))}initFramebuffers(){try{const e=this.gl;this.deleteFBO(this.density),this.deleteFBO(this.velocity),this.deleteFBO(this.divergence),this.deleteFBO(this.curl),this.deleteFBO(this.pressure),this.textureWidth=e.drawingBufferWidth>>this.config.TEXTURE_DOWNSAMPLE,this.textureHeight=e.drawingBufferHeight>>this.config.TEXTURE_DOWNSAMPLE;const i=this.ext.halfFloatTexType,t=this.ext.formatRGBA,o=this.ext.formatRG,s=this.ext.formatR;this.density=this.createDoubleFBO(2,this.textureWidth,this.textureHeight,t.internalFormat,t.format,i,e.LINEAR),this.velocity=this.createDoubleFBO(0,this.textureWidth,this.textureHeight,o.internalFormat,o.format,i,e.LINEAR),this.divergence=this.createFBO(4,this.textureWidth,this.textureHeight,s.internalFormat,s.format,i,e.NEAREST),this.curl=this.createFBO(5,this.textureWidth,this.textureHeight,s.internalFormat,s.format,i,e.NEAREST),this.pressure=this.createDoubleFBO(6,this.textureWidth,this.textureHeight,s.internalFormat,s.format,i,e.NEAREST)}catch(e){console.error("\u{1F6A8} Fehler in initFramebuffers:",e)}}initResizeHandling(){this.resizeObserver||(this.resizeObserver=new ResizeObserver(()=>{if(!this.isEnabled||this.isContextLost)return;const e=this.canvas.clientWidth,i=this.canvas.clientHeight;e===0||i===0||this.canvas.width===e&&this.canvas.height===i||(console.log(`[Smoke] ResizeObserver: ${e}x${i}.`),this.canvas.width=e,this.canvas.height=i,this.initFramebuffers(),this.multipleSplats(10))}),this.resizeObserver.observe(this.canvas))}createFBO(e,i,t,o,s,n,a){const r=this.gl;r.activeTexture(r.TEXTURE0+e);let h=r.createTexture();r.bindTexture(r.TEXTURE_2D,h),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,a),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,a),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),r.texImage2D(r.TEXTURE_2D,0,o,i,t,0,s,n,null);let u=r.createFramebuffer();return r.bindFramebuffer(r.FRAMEBUFFER,u),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,h,0),r.viewport(0,0,i,t),r.clear(r.COLOR_BUFFER_BIT),[h,u,e]}createDoubleFBO(e,i,t,o,s,n,a){let r=this.createFBO(e,i,t,o,s,n,a),h=this.createFBO(e+1,i,t,o,s,n,a);return{get read(){return r},get write(){return h},swap(){let u=r;r=h,h=u}}}splat(e,i,t,o,s){const a=this.canvas;(e<30||e>a.width-30)&&(t*=.1,o*=.5);const r=this.gl;this.splatProgram.bind(),r.uniform1i(this.splatProgram.uniforms.uTarget,this.velocity.read[2]),r.uniform1f(this.splatProgram.uniforms.aspectRatio,a.width/a.height),r.uniform2f(this.splatProgram.uniforms.point,e/a.width,1-i/a.height),r.uniform3f(this.splatProgram.uniforms.color,t,-o,1),r.uniform1f(this.splatProgram.uniforms.radius,this.config.SPLAT_RADIUS),this.blit(this.velocity.write[1]),this.velocity.swap(),r.uniform1i(this.splatProgram.uniforms.uTarget,this.density.read[2]);const h=this.config.SPLAT_COLOR_WEIGHTS;r.uniform3f(this.splatProgram.uniforms.color,s[0]*h[0],s[1]*h[1],s[2]*h[2]),this.blit(this.density.write[1]),this.density.swap()}multipleSplats(e){const i=this.canvas;for(let t=0;t<e;t++){const o=[Math.random()*10,Math.random()*10,Math.random()*10];this.splat(i.width*Math.random(),i.height*Math.random(),1e3*(Math.random()-.5),1e3*(Math.random()-.5),o)}}update(){if(!(!this.isEnabled||this.isContextLost||this.isResizing)){try{const e=Math.min((Date.now()-this.lastTime)/1e3,.016);this.lastTime=Date.now();const i=this.gl;i.viewport(0,0,this.textureWidth,this.textureHeight),this.splatStack.length>0&&this.multipleSplats(this.splatStack.pop()),this.advectionProgram.bind(),i.uniform2f(this.advectionProgram.uniforms.texelSize,1/this.textureWidth,1/this.textureHeight),i.uniform1i(this.advectionProgram.uniforms.uVelocity,this.velocity.read[2]),i.uniform1i(this.advectionProgram.uniforms.uSource,this.velocity.read[2]),i.uniform1f(this.advectionProgram.uniforms.dt,e),i.uniform1f(this.advectionProgram.uniforms.dissipation,this.config.VELOCITY_DISSIPATION),this.blit(this.velocity.write[1]),this.velocity.swap(),i.uniform1i(this.advectionProgram.uniforms.uVelocity,this.velocity.read[2]),i.uniform1i(this.advectionProgram.uniforms.uSource,this.density.read[2]),i.uniform1f(this.advectionProgram.uniforms.dissipation,this.config.DENSITY_DISSIPATION),this.blit(this.density.write[1]),this.density.swap();for(let o=0;o<this.pointers.length;o++){const s=this.pointers[o];s.moved&&(this.splat(s.x,s.y,s.dx,s.dy,s.color),s.moved=!1)}this.curlProgram.bind(),i.uniform2f(this.curlProgram.uniforms.texelSize,1/this.textureWidth,1/this.textureHeight),i.uniform1i(this.curlProgram.uniforms.uVelocity,this.velocity.read[2]),this.blit(this.curl[1]),this.vorticityProgram.bind(),i.uniform2f(this.vorticityProgram.uniforms.texelSize,1/this.textureWidth,1/this.textureHeight),i.uniform1i(this.vorticityProgram.uniforms.uVelocity,this.velocity.read[2]),i.uniform1i(this.vorticityProgram.uniforms.uCurl,this.curl[2]),i.uniform1f(this.vorticityProgram.uniforms.curl,this.config.CURL),i.uniform1f(this.vorticityProgram.uniforms.dt,e),this.blit(this.velocity.write[1]),this.velocity.swap(),this.divergenceProgram.bind(),i.uniform2f(this.divergenceProgram.uniforms.texelSize,1/this.textureWidth,1/this.textureHeight),i.uniform1i(this.divergenceProgram.uniforms.uVelocity,this.velocity.read[2]),this.blit(this.divergence[1]),this.clearProgram.bind();let t=this.pressure.read[2];i.activeTexture(i.TEXTURE0+t),i.bindTexture(i.TEXTURE_2D,this.pressure.read[0]),i.uniform1i(this.clearProgram.uniforms.uTexture,t),i.uniform1f(this.clearProgram.uniforms.value,this.config.PRESSURE_DISSIPATION),this.blit(this.pressure.write[1]),this.pressure.swap(),this.pressureProgram.bind(),i.uniform2f(this.pressureProgram.uniforms.texelSize,1/this.textureWidth,1/this.textureHeight),i.uniform1i(this.pressureProgram.uniforms.uDivergence,this.divergence[2]),t=this.pressure.read[2],i.uniform1i(this.pressureProgram.uniforms.uPressure,t),i.activeTexture(i.TEXTURE0+t);for(let o=0;o<this.config.PRESSURE_ITERATIONS;o++)i.bindTexture(i.TEXTURE_2D,this.pressure.read[0]),this.blit(this.pressure.write[1]),this.pressure.swap();this.gradienSubtractProgram.bind(),i.uniform2f(this.gradienSubtractProgram.uniforms.texelSize,1/this.textureWidth,1/this.textureHeight),i.uniform1i(this.gradienSubtractProgram.uniforms.uPressure,this.pressure.read[2]),i.uniform1i(this.gradienSubtractProgram.uniforms.uVelocity,this.velocity.read[2]),this.blit(this.velocity.write[1]),this.velocity.swap(),i.viewport(0,0,i.drawingBufferWidth,i.drawingBufferHeight),i.bindFramebuffer(i.FRAMEBUFFER,null),i.clearColor(0,0,0,0),i.clear(i.COLOR_BUFFER_BIT),this.displayProgram.bind(),i.uniform1i(this.displayProgram.uniforms.uTexture,this.density.read[2]),this.blit(null)}catch(e){console.error("\u{1F6A8} Smoke Render Loop Error:",e);return}this.isEnabled&&requestAnimationFrame(()=>this.update())}}getWebGLContext(e){const i={alpha:!0,depth:!1,stencil:!1,antialias:!1};let t=e.getContext("webgl2",i);const o=!!t;o||(t=e.getContext("webgl",i)||e.getContext("experimental-webgl",i)),t.enable(t.BLEND),t.blendFunc(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA);let s=t.getExtension("OES_texture_half_float"),n=t.getExtension("OES_texture_half_float_linear");o&&(t.getExtension("EXT_color_buffer_float"),n=t.getExtension("OES_texture_float_linear")),t.clearColor(0,0,0,0);const a=o?t.HALF_FLOAT:s?s.HALF_FLOAT_OES:null,r=(l,f,d,m)=>{if(!this.supportRenderTextureFormat(l,f,d,m))switch(f){case l.R16F:return r(l,l.RG16F,l.RG,m);case l.RG16F:return r(l,l.RGBA16F,l.RGBA,m);default:return null}return{internalFormat:f,format:d}};let h=o?r(t,t.RGBA16F,t.RGBA,a):r(t,t.RGBA,t.RGBA,a),u=o?r(t,t.RG16F,t.RG,a):h,g=o?r(t,t.R16F,t.RED,a):h;return{gl:t,ext:{formatRGBA:h,formatRG:u,formatR:g,halfFloatTexType:a,supportLinearFiltering:n}}}supportRenderTextureFormat(e,i,t,o){let s=e.createTexture();e.bindTexture(e.TEXTURE_2D,s),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,i,4,4,0,t,o,null);let n=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,n),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,s,0),e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE}setThemeMode(e){if(!this.gl)return;const i=e?this.config.THEME_COLORS.dark:this.config.THEME_COLORS.light,t=this.config.COLOR_INTENSITY;this.pointerColor=[i[0]/255*t,i[1]/255*t,i[2]/255*t]}initContextHandling(){this.isContextLost=!1,this.canvas.addEventListener("webglcontextlost",e=>{e.preventDefault(),this.isContextLost=!0,console.warn("[Smoke] WebGL Context verloren. Pausiere Rendering.")},!1),this.canvas.addEventListener("webglcontextrestored",()=>{this.isContextLost=!1,console.log("[Smoke] WebGL Context wiederhergestellt. Initialisiere neu."),this.isInitialized=!1,this.pointers=[],this.init()},!1)}}
