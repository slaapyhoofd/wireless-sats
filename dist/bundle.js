(()=>{"use strict";var e,t,i={715:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.bech32m=t.bech32=void 0;const i="qpzry9x8gf2tvdw0s3jn54khce6mua7l",n={};for(let e=0;e<i.length;e++){const t=i.charAt(e);n[t]=e}function r(e){const t=e>>25;return(33554431&e)<<5^996825010&-(t>>0&1)^642813549&-(t>>1&1)^513874426&-(t>>2&1)^1027748829&-(t>>3&1)^705979059&-(t>>4&1)}function a(e){let t=1;for(let i=0;i<e.length;++i){const n=e.charCodeAt(i);if(n<33||n>126)return"Invalid prefix ("+e+")";t=r(t)^n>>5}t=r(t);for(let i=0;i<e.length;++i){const n=e.charCodeAt(i);t=r(t)^31&n}return t}function s(e,t,i,n){let r=0,a=0;const s=(1<<i)-1,o=[];for(let n=0;n<e.length;++n)for(r=r<<t|e[n],a+=t;a>=i;)a-=i,o.push(r>>a&s);if(n)a>0&&o.push(r<<i-a&s);else{if(a>=t)return"Excess padding";if(r<<i-a&s)return"Non-zero padding"}return o}function o(e){return s(e,8,5,!0)}function c(e){const t=s(e,5,8,!1);if(Array.isArray(t))return t}function d(e){const t=s(e,5,8,!1);if(Array.isArray(t))return t;throw new Error(t)}function l(e){let t;function s(e,i){if(i=i||90,e.length<8)return e+" too short";if(e.length>i)return"Exceeds length limit";const s=e.toLowerCase(),o=e.toUpperCase();if(e!==s&&e!==o)return"Mixed-case string "+e;const c=(e=s).lastIndexOf("1");if(-1===c)return"No separator character for "+e;if(0===c)return"Missing prefix for "+e;const d=e.slice(0,c),l=e.slice(c+1);if(l.length<6)return"Data too short";let h=a(d);if("string"==typeof h)return h;const u=[];for(let e=0;e<l.length;++e){const t=l.charAt(e),i=n[t];if(void 0===i)return"Unknown character "+t;h=r(h)^i,e+6>=l.length||u.push(i)}return h!==t?"Invalid checksum for "+e:{prefix:d,words:u}}return t="bech32"===e?1:734539939,{decodeUnsafe:function(e,t){const i=s(e,t);if("object"==typeof i)return i},decode:function(e,t){const i=s(e,t);if("object"==typeof i)return i;throw new Error(i)},encode:function(e,n,s){if(s=s||90,e.length+7+n.length>s)throw new TypeError("Exceeds length limit");let o=a(e=e.toLowerCase());if("string"==typeof o)throw new Error(o);let c=e+"1";for(let e=0;e<n.length;++e){const t=n[e];if(t>>5!=0)throw new Error("Non 5-bit word");o=r(o)^t,c+=i.charAt(t)}for(let e=0;e<6;++e)o=r(o);o^=t;for(let e=0;e<6;++e)c+=i.charAt(o>>5*(5-e)&31);return c},toWords:o,fromWordsUnsafe:c,fromWords:d}}t.bech32=l("bech32"),t.bech32m=l("bech32m")},922:function(e,t,i){var n=this&&this.__awaiter||function(e,t,i,n){return new(i||(i=Promise))((function(r,a){function s(e){try{c(n.next(e))}catch(e){a(e)}}function o(e){try{c(n.throw(e))}catch(e){a(e)}}function c(e){var t;e.done?r(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(s,o)}c((n=n.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.handlePayment=t.handleLNURL=t.bech32Decode=t.decodeLnurl=t.LnurlResult=t.LnurlReader=t.ErrorReason=void 0;const r=i(715);var a,s;function o(e){if(!e)return!1;const t=e.toLowerCase();return!(!t||!(t.endsWith(".onion")||t.indexOf(".onion/")>=0||t.indexOf(".onion?")>=0))}function c(e){var t;if(!e||!e.data)return{isLnurl:s.No};const i=new TextDecoder(null!==(t=e.encoding)&&void 0!==t?t:"utf-8",{fatal:!0});try{return d(i.decode(e.data))}catch(e){return{isLnurl:s.No}}}function d(e){if(!e)return{isLnurl:s.No};try{const t=e.toLowerCase();if(t.startsWith("lightning:")){const t=h(e.slice("lightning:".length));return l(t)?{isLnurl:s.Yes,lnurl:t}:{isLnurl:s.No}}if(t.startsWith("lnurlw://")){let t="https://";return o(e)&&(t="http://"),{isLnurl:s.Yes,lnurl:t+e.slice(9)}}if(t.startsWith("lnurl")&&-1===t.indexOf(":")){const t=h(e);return l(t)?{isLnurl:s.Yes,lnurl:t}:{isLnurl:s.No}}if(t.startsWith("https://"))return{isLnurl:s.Maybe,lnurl:e};if(t.startsWith("http://"))return o(e)?{isLnurl:s.Maybe,lnurl:e}:{isLnurl:s.No}}catch(e){}return{isLnurl:s.No}}function l(e){return!!e&&(!!e.startsWith("https://")||e.startsWith("http://")&&o(e))}function h(e){const t=new TextDecoder("utf-8",{fatal:!0}),i=r.bech32.decode(e,2e3),n=r.bech32.fromWords(i.words);return t.decode(new Uint8Array(n))}function u(e,t,i,r){return n(this,void 0,void 0,(function*(){try{const n=-1===e.indexOf("?")?"?":"&",a=`${e}${n}k1=${t}&pr=${i.replace("lightning:","")}`,s=yield fetch(`${r}?url=${encodeURIComponent(a)}`),o=yield s.json();return"OK"===o.status?{success:!0,message:"invoice payment initiated"}:"ERROR"===o.status?{success:!1,message:o.reason}:{success:!1,message:"invalid response"}}catch(e){return{success:!1,message:e.message}}}))}!function(e){e[e.unavailable=0]="unavailable",e[e.aborted=1]="aborted",e[e.scanInProgress=2]="scanInProgress",e[e.permissionDenied=3]="permissionDenied",e[e.readingError=4]="readingError",e[e.noLnurlFound=5]="noLnurlFound"}(a=t.ErrorReason||(t.ErrorReason={})),t.LnurlReader=class{constructor(e,t){this.listening=!1,"NDEFReader"in window&&(this.ndefReader=new window.NDEFReader),this.onLnurlRead=e,this.onReadingError=t}get isAvailable(){return!!this.ndefReader}get isListening(){return this.listening}listenOnce(e){return n(this,void 0,void 0,(function*(){const t=this.onLnurlRead,i=this.onReadingError,r=this.listening,s=()=>{r||this.stopListening(),this.onLnurlRead=t,this.onReadingError=i};return new Promise(((o,c)=>n(this,void 0,void 0,(function*(){if(this.onLnurlRead=e=>{t&&t(e),s(),o(e)},this.onReadingError=(e,t)=>{i&&i(e,t),s(),c(e)},e&&(e.onabort=()=>{s(),c(a.aborted)}),!r)try{yield this.startListening(e)}catch(e){c(e)}}))))}))}startListening(e){return n(this,void 0,void 0,(function*(){if(!this.ndefReader)return Promise.reject(a.unavailable);if(!this.listening){try{this.abortController=new AbortController,e&&(e.onabort=e=>this._abort(e)),yield this.ndefReader.scan({signal:this.abortController.signal}),this.listening=!0}catch(e){if(e instanceof DOMException&&e.name)switch(e.name){case"AbortError":return Promise.reject(a.aborted);case"InvalidStateError":return Promise.reject(a.scanInProgress);case"NotAllowedError":return Promise.reject(a.permissionDenied);case"NotSupportedError":return Promise.reject(a.unavailable)}return Promise.reject(e)}this.ndefReader.onreadingerror=e=>this._onReadingError(e),this.ndefReader.onreading=e=>this._onReading(e)}}))}stopListening(){this._abort(a.aborted)}_abort(e){var t;null===(t=this.abortController)||void 0===t||t.abort(e),this.listening=!1}_onReadingError(e){this.onReadingError&&this.onReadingError(a.readingError,e)}_onReading(e){if(!(e&&e.message&&e.message.records&&Array.isArray(e.message.records)))return void this._onReadingError(e);const t=[];for(let i of e.message.records){if(!i||!i.data)continue;const e=c(i);switch(e.isLnurl){case s.Yes:return void(this.onLnurlRead&&this.onLnurlRead(e.lnurl));case s.Maybe:t.push(e.lnurl)}}t.length>0?this.onLnurlRead&&this.onLnurlRead(t[0]):this.onReadingError&&this.onReadingError(a.noLnurlFound)}},function(e){e[e.No=0]="No",e[e.Maybe=1]="Maybe",e[e.Yes=2]="Yes"}(s=t.LnurlResult||(t.LnurlResult={})),t.decodeLnurl=d,t.bech32Decode=h,t.handleLNURL=function(e,t,i){return n(this,void 0,void 0,(function*(){try{const n=encodeURIComponent(e),r=yield fetch(`${i}?url=${n}`),{callback:a,k1:s,reason:o,status:c}=yield r.json();return"ERROR"===c?{success:!1,message:o}:a&&"string"==typeof a&&s&&"string"==typeof s?u(a,s,t,i):{success:!1,message:"invalid response"}}catch(e){return{success:!1,message:e.message}}}))},t.handlePayment=u},6:(e,t,i)=>{i.r(t),i.d(t,{default:()=>r});class n{constructor(e,t,i,r,a){this._legacyCanvasSize=n.DEFAULT_CANVAS_SIZE,this._preferredCamera="environment",this._maxScansPerSecond=25,this._lastScanTimestamp=-1,this._destroyed=this._flashOn=this._paused=this._active=!1,this.$video=e,this.$canvas=document.createElement("canvas"),i&&"object"==typeof i?this._onDecode=t:(i||r||a?console.warn("You're using a deprecated version of the QrScanner constructor which will be removed in the future"):console.warn("Note that the type of the scan result passed to onDecode will change in the future. To already switch to the new api today, you can pass returnDetailedScanResult: true."),this._legacyOnDecode=t),t="object"==typeof i?i:{},this._onDecodeError=t.onDecodeError||("function"==typeof i?i:this._onDecodeError),this._calculateScanRegion=t.calculateScanRegion||("function"==typeof r?r:this._calculateScanRegion),this._preferredCamera=t.preferredCamera||a||this._preferredCamera,this._legacyCanvasSize="number"==typeof i?i:"number"==typeof r?r:this._legacyCanvasSize,this._maxScansPerSecond=t.maxScansPerSecond||this._maxScansPerSecond,this._onPlay=this._onPlay.bind(this),this._onLoadedMetaData=this._onLoadedMetaData.bind(this),this._onVisibilityChange=this._onVisibilityChange.bind(this),this._updateOverlay=this._updateOverlay.bind(this),e.disablePictureInPicture=!0,e.playsInline=!0,e.muted=!0;let s=!1;if(e.hidden&&(e.hidden=!1,s=!0),document.body.contains(e)||(document.body.appendChild(e),s=!0),i=e.parentElement,t.highlightScanRegion||t.highlightCodeOutline){if(r=!!t.overlay,this.$overlay=t.overlay||document.createElement("div"),(a=this.$overlay.style).position="absolute",a.display="none",a.pointerEvents="none",this.$overlay.classList.add("scan-region-highlight"),!r&&t.highlightScanRegion){this.$overlay.innerHTML='<svg class="scan-region-highlight-svg" viewBox="0 0 238 238" preserveAspectRatio="none" style="position:absolute;width:100%;height:100%;left:0;top:0;fill:none;stroke:#e9b213;stroke-width:4;stroke-linecap:round;stroke-linejoin:round"><path d="M31 2H10a8 8 0 0 0-8 8v21M207 2h21a8 8 0 0 1 8 8v21m0 176v21a8 8 0 0 1-8 8h-21m-176 0H10a8 8 0 0 1-8-8v-21"/></svg>';try{this.$overlay.firstElementChild.animate({transform:["scale(.98)","scale(1.01)"]},{duration:400,iterations:1/0,direction:"alternate",easing:"ease-in-out"})}catch(e){}i.insertBefore(this.$overlay,this.$video.nextSibling)}t.highlightCodeOutline&&(this.$overlay.insertAdjacentHTML("beforeend",'<svg class="code-outline-highlight" preserveAspectRatio="none" style="display:none;width:100%;height:100%;fill:none;stroke:#e9b213;stroke-width:5;stroke-dasharray:25;stroke-linecap:round;stroke-linejoin:round"><polygon/></svg>'),this.$codeOutlineHighlight=this.$overlay.lastElementChild)}this._scanRegion=this._calculateScanRegion(e),requestAnimationFrame((()=>{let t=window.getComputedStyle(e);"none"===t.display&&(e.style.setProperty("display","block","important"),s=!0),"visible"!==t.visibility&&(e.style.setProperty("visibility","visible","important"),s=!0),s&&(console.warn("QrScanner has overwritten the video hiding style to avoid Safari stopping the playback."),e.style.opacity="0",e.style.width="0",e.style.height="0",this.$overlay&&this.$overlay.parentElement&&this.$overlay.parentElement.removeChild(this.$overlay),delete this.$overlay,delete this.$codeOutlineHighlight),this.$overlay&&this._updateOverlay()})),e.addEventListener("play",this._onPlay),e.addEventListener("loadedmetadata",this._onLoadedMetaData),document.addEventListener("visibilitychange",this._onVisibilityChange),window.addEventListener("resize",this._updateOverlay),this._qrEnginePromise=n.createQrEngine()}static set WORKER_PATH(e){console.warn("Setting QrScanner.WORKER_PATH is not required and not supported anymore. Have a look at the README for new setup instructions.")}static async hasCamera(){try{return!!(await n.listCameras(!1)).length}catch(e){return!1}}static async listCameras(e=!1){if(!navigator.mediaDevices)return[];let t,i=async()=>(await navigator.mediaDevices.enumerateDevices()).filter((e=>"videoinput"===e.kind));try{e&&(await i()).every((e=>!e.label))&&(t=await navigator.mediaDevices.getUserMedia({audio:!1,video:!0}))}catch(e){}try{return(await i()).map(((e,t)=>({id:e.deviceId,label:e.label||(0===t?"Default Camera":`Camera ${t+1}`)})))}finally{t&&(console.warn("Call listCameras after successfully starting a QR scanner to avoid creating a temporary video stream"),n._stopVideoStream(t))}}async hasFlash(){let e;try{if(this.$video.srcObject){if(!(this.$video.srcObject instanceof MediaStream))return!1;e=this.$video.srcObject}else e=(await this._getCameraStream()).stream;return"torch"in e.getVideoTracks()[0].getSettings()}catch(e){return!1}finally{e&&e!==this.$video.srcObject&&(console.warn("Call hasFlash after successfully starting the scanner to avoid creating a temporary video stream"),n._stopVideoStream(e))}}isFlashOn(){return this._flashOn}async toggleFlash(){this._flashOn?await this.turnFlashOff():await this.turnFlashOn()}async turnFlashOn(){if(!this._flashOn&&!this._destroyed&&(this._flashOn=!0,this._active&&!this._paused))try{if(!await this.hasFlash())throw"No flash available";await this.$video.srcObject.getVideoTracks()[0].applyConstraints({advanced:[{torch:!0}]})}catch(e){throw this._flashOn=!1,e}}async turnFlashOff(){this._flashOn&&(this._flashOn=!1,await this._restartVideoStream())}destroy(){this.$video.removeEventListener("loadedmetadata",this._onLoadedMetaData),this.$video.removeEventListener("play",this._onPlay),document.removeEventListener("visibilitychange",this._onVisibilityChange),window.removeEventListener("resize",this._updateOverlay),this._destroyed=!0,this._flashOn=!1,this.stop(),n._postWorkerMessage(this._qrEnginePromise,"close")}async start(){if(this._destroyed)throw Error("The QR scanner can not be started as it had been destroyed.");if((!this._active||this._paused)&&("https:"!==window.location.protocol&&console.warn("The camera stream is only accessible if the page is transferred via https."),this._active=!0,!document.hidden))if(this._paused=!1,this.$video.srcObject)await this.$video.play();else try{let{stream:e,facingMode:t}=await this._getCameraStream();!this._active||this._paused?n._stopVideoStream(e):(this._setVideoMirror(t),this.$video.srcObject=e,await this.$video.play(),this._flashOn&&(this._flashOn=!1,this.turnFlashOn().catch((()=>{}))))}catch(e){if(!this._paused)throw this._active=!1,e}}stop(){this.pause(),this._active=!1}async pause(e=!1){if(this._paused=!0,!this._active)return!0;this.$video.pause(),this.$overlay&&(this.$overlay.style.display="none");let t=()=>{this.$video.srcObject instanceof MediaStream&&(n._stopVideoStream(this.$video.srcObject),this.$video.srcObject=null)};return e?(t(),!0):(await new Promise((e=>setTimeout(e,300))),!!this._paused&&(t(),!0))}async setCamera(e){e!==this._preferredCamera&&(this._preferredCamera=e,await this._restartVideoStream())}static async scanImage(e,t,i,r,a=!1,s=!1){let o,c=!1;t&&("scanRegion"in t||"qrEngine"in t||"canvas"in t||"disallowCanvasResizing"in t||"alsoTryWithoutScanRegion"in t||"returnDetailedScanResult"in t)?(o=t.scanRegion,i=t.qrEngine,r=t.canvas,a=t.disallowCanvasResizing||!1,s=t.alsoTryWithoutScanRegion||!1,c=!0):t||i||r||a||s?console.warn("You're using a deprecated api for scanImage which will be removed in the future."):console.warn("Note that the return type of scanImage will change in the future. To already switch to the new api today, you can pass returnDetailedScanResult: true."),t=!!i;try{let d,l,h;if([i,d]=await Promise.all([i||n.createQrEngine(),n._loadImage(e)]),[r,l]=n._drawToCanvas(d,o,r,a),i instanceof Worker){let e=i;t||n._postWorkerMessageSync(e,"inversionMode","both"),h=await new Promise(((t,i)=>{let a,s,c,d=-1;s=r=>{r.data.id===d&&(e.removeEventListener("message",s),e.removeEventListener("error",c),clearTimeout(a),null!==r.data.data?t({data:r.data.data,cornerPoints:n._convertPoints(r.data.cornerPoints,o)}):i(n.NO_QR_CODE_FOUND))},c=t=>{e.removeEventListener("message",s),e.removeEventListener("error",c),clearTimeout(a),i("Scanner error: "+(t?t.message||t:"Unknown Error"))},e.addEventListener("message",s),e.addEventListener("error",c),a=setTimeout((()=>c("timeout")),1e4);let h=l.getImageData(0,0,r.width,r.height);d=n._postWorkerMessageSync(e,"decode",h,[h.data.buffer])}))}else h=await Promise.race([new Promise(((e,t)=>window.setTimeout((()=>t("Scanner error: timeout")),1e4))),(async()=>{try{var[t]=await i.detect(r);if(!t)throw n.NO_QR_CODE_FOUND;return{data:t.rawValue,cornerPoints:n._convertPoints(t.cornerPoints,o)}}catch(i){if(t=i.message||i,/not implemented|service unavailable/.test(t))return n._disableBarcodeDetector=!0,n.scanImage(e,{scanRegion:o,canvas:r,disallowCanvasResizing:a,alsoTryWithoutScanRegion:s});throw`Scanner error: ${t}`}})()]);return c?h:h.data}catch(t){if(!o||!s)throw t;let d=await n.scanImage(e,{qrEngine:i,canvas:r,disallowCanvasResizing:a});return c?d:d.data}finally{t||n._postWorkerMessage(i,"close")}}setGrayscaleWeights(e,t,i,r=!0){n._postWorkerMessage(this._qrEnginePromise,"grayscaleWeights",{red:e,green:t,blue:i,useIntegerApproximation:r})}setInversionMode(e){n._postWorkerMessage(this._qrEnginePromise,"inversionMode",e)}static async createQrEngine(e){return e&&console.warn("Specifying a worker path is not required and not supported anymore."),!n._disableBarcodeDetector&&"BarcodeDetector"in window&&BarcodeDetector.getSupportedFormats&&(await BarcodeDetector.getSupportedFormats()).includes("qr_code")?new BarcodeDetector({formats:["qr_code"]}):i.e(126).then(i.bind(i,126)).then((e=>e.createWorker()))}_onPlay(){this._scanRegion=this._calculateScanRegion(this.$video),this._updateOverlay(),this.$overlay&&(this.$overlay.style.display=""),this._scanFrame()}_onLoadedMetaData(){this._scanRegion=this._calculateScanRegion(this.$video),this._updateOverlay()}_onVisibilityChange(){document.hidden?this.pause():this._active&&this.start()}_calculateScanRegion(e){let t=Math.round(2/3*Math.min(e.videoWidth,e.videoHeight));return{x:Math.round((e.videoWidth-t)/2),y:Math.round((e.videoHeight-t)/2),width:t,height:t,downScaledWidth:this._legacyCanvasSize,downScaledHeight:this._legacyCanvasSize}}_updateOverlay(){requestAnimationFrame((()=>{if(this.$overlay){var e=this.$video,t=e.videoWidth,i=e.videoHeight,n=e.offsetWidth,r=e.offsetHeight,a=e.offsetLeft,s=e.offsetTop,o=window.getComputedStyle(e),c=o.objectFit,d=t/i,l=n/r;switch(c){case"none":var h=t,u=i;break;case"fill":h=n,u=r;break;default:("cover"===c?d>l:d<l)?h=(u=r)*d:u=(h=n)/d,"scale-down"===c&&(h=Math.min(h,t),u=Math.min(u,i))}var[g,f]=o.objectPosition.split(" ").map(((e,t)=>{const i=parseFloat(e);return e.endsWith("%")?(t?r-u:n-h)*i/100:i}));o=this._scanRegion.width||t,l=this._scanRegion.height||i,c=this._scanRegion.x||0;var v=this._scanRegion.y||0;(d=this.$overlay.style).width=o/t*h+"px",d.height=l/i*u+"px",d.top=`${s+f+v/i*u}px`,i=/scaleX\(-1\)/.test(e.style.transform),d.left=`${a+(i?n-g-h:g)+(i?t-c-o:c)/t*h}px`,d.transform=e.style.transform}}))}static _convertPoints(e,t){if(!t)return e;let i=t.x||0,n=t.y||0,r=t.width&&t.downScaledWidth?t.width/t.downScaledWidth:1;t=t.height&&t.downScaledHeight?t.height/t.downScaledHeight:1;for(let a of e)a.x=a.x*r+i,a.y=a.y*t+n;return e}_scanFrame(){!this._active||this.$video.paused||this.$video.ended||("requestVideoFrameCallback"in this.$video?this.$video.requestVideoFrameCallback.bind(this.$video):requestAnimationFrame)((async()=>{if(!(1>=this.$video.readyState)){var e=Date.now()-this._lastScanTimestamp,t=1e3/this._maxScansPerSecond;e<t&&await new Promise((i=>setTimeout(i,t-e))),this._lastScanTimestamp=Date.now();try{var i=await n.scanImage(this.$video,{scanRegion:this._scanRegion,qrEngine:this._qrEnginePromise,canvas:this.$canvas})}catch(e){if(!this._active)return;this._onDecodeError(e)}!n._disableBarcodeDetector||await this._qrEnginePromise instanceof Worker||(this._qrEnginePromise=n.createQrEngine()),i?(this._onDecode?this._onDecode(i):this._legacyOnDecode&&this._legacyOnDecode(i.data),this.$codeOutlineHighlight&&(clearTimeout(this._codeOutlineHighlightRemovalTimeout),this._codeOutlineHighlightRemovalTimeout=void 0,this.$codeOutlineHighlight.setAttribute("viewBox",`${this._scanRegion.x||0} ${this._scanRegion.y||0} ${this._scanRegion.width||this.$video.videoWidth} ${this._scanRegion.height||this.$video.videoHeight}`),this.$codeOutlineHighlight.firstElementChild.setAttribute("points",i.cornerPoints.map((({x:e,y:t})=>`${e},${t}`)).join(" ")),this.$codeOutlineHighlight.style.display="")):this.$codeOutlineHighlight&&!this._codeOutlineHighlightRemovalTimeout&&(this._codeOutlineHighlightRemovalTimeout=setTimeout((()=>this.$codeOutlineHighlight.style.display="none"),100))}this._scanFrame()}))}_onDecodeError(e){e!==n.NO_QR_CODE_FOUND&&console.log(e)}async _getCameraStream(){if(!navigator.mediaDevices)throw"Camera not found.";let e=/^(environment|user)$/.test(this._preferredCamera)?"facingMode":"deviceId",t=[{width:{min:1024}},{width:{min:768}},{}],i=t.map((t=>Object.assign({},t,{[e]:{exact:this._preferredCamera}})));for(let e of[...i,...t])try{let t=await navigator.mediaDevices.getUserMedia({video:e,audio:!1});return{stream:t,facingMode:this._getFacingMode(t)||(e.facingMode?this._preferredCamera:"environment"===this._preferredCamera?"user":"environment")}}catch(e){}throw"Camera not found."}async _restartVideoStream(){let e=this._paused;await this.pause(!0)&&!e&&this._active&&await this.start()}static _stopVideoStream(e){for(let t of e.getTracks())t.stop(),e.removeTrack(t)}_setVideoMirror(e){this.$video.style.transform="scaleX("+("user"===e?-1:1)+")"}_getFacingMode(e){return(e=e.getVideoTracks()[0])?/rear|back|environment/i.test(e.label)?"environment":/front|user|face/i.test(e.label)?"user":null:null}static _drawToCanvas(e,t,i,n=!1){i=i||document.createElement("canvas");let r=t&&t.x?t.x:0,a=t&&t.y?t.y:0,s=t&&t.width?t.width:e.videoWidth||e.width,o=t&&t.height?t.height:e.videoHeight||e.height;return n||(n=t&&t.downScaledWidth?t.downScaledWidth:s,t=t&&t.downScaledHeight?t.downScaledHeight:o,i.width!==n&&(i.width=n),i.height!==t&&(i.height=t)),(t=i.getContext("2d",{alpha:!1})).imageSmoothingEnabled=!1,t.drawImage(e,r,a,s,o,0,0,i.width,i.height),[i,t]}static async _loadImage(e){if(e instanceof Image)return await n._awaitImageLoad(e),e;if(e instanceof HTMLVideoElement||e instanceof HTMLCanvasElement||e instanceof SVGImageElement||"OffscreenCanvas"in window&&e instanceof OffscreenCanvas||"ImageBitmap"in window&&e instanceof ImageBitmap)return e;if(!(e instanceof File||e instanceof Blob||e instanceof URL||"string"==typeof e))throw"Unsupported image type.";{let t=new Image;t.src=e instanceof File||e instanceof Blob?URL.createObjectURL(e):e.toString();try{return await n._awaitImageLoad(t),t}finally{(e instanceof File||e instanceof Blob)&&URL.revokeObjectURL(t.src)}}}static async _awaitImageLoad(e){e.complete&&0!==e.naturalWidth||await new Promise(((t,i)=>{let n=r=>{e.removeEventListener("load",n),e.removeEventListener("error",n),r instanceof ErrorEvent?i("Image load error"):t()};e.addEventListener("load",n),e.addEventListener("error",n)}))}static async _postWorkerMessage(e,t,i,r){return n._postWorkerMessageSync(await e,t,i,r)}static _postWorkerMessageSync(e,t,i,r){if(!(e instanceof Worker))return-1;let a=n._workerMessageId++;return e.postMessage({id:a,type:t,data:i},r),a}}n.DEFAULT_CANVAS_SIZE=400,n.NO_QR_CODE_FOUND="No QR code found",n._disableBarcodeDetector=!1,n._workerMessageId=0;const r=n},607:function(e,t,i){var n=this&&this.__awaiter||function(e,t,i,n){return new(i||(i=Promise))((function(r,a){function s(e){try{c(n.next(e))}catch(e){a(e)}}function o(e){try{c(n.throw(e))}catch(e){a(e)}}function c(e){var t;e.done?r(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(s,o)}c((n=n.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const r=i(922),a=i(6);function s(e,t){const i=document.getElementById("log");if(i){const n=document.createElement("div");n.innerHTML=`${e}\n`,t&&(n.style.color="red"),i.appendChild(n)}}document.addEventListener("DOMContentLoaded",(()=>n(void 0,void 0,void 0,(function*(){const e=document.getElementById("invoice"),t=document.getElementById("paste"),i=document.getElementById("listen"),o=document.getElementById("scan"),c=document.getElementById("video");s("ready"),null==t||t.addEventListener("click",(function(){navigator.clipboard.readText().then((t=>{e&&(e.value=t),s("lnurl copied")}),(()=>s("error copying lnurl",!0)))}));const d=new a.default(c,(t=>{s("QR found"),e.value=t.data,d.stop(),o&&(o.ariaBusy="false")}),{returnDetailedScanResult:!0});null==o||o.addEventListener("click",(()=>{d.start(),o.ariaBusy="true"})),null==i||i.addEventListener("click",(()=>n(void 0,void 0,void 0,(function*(){try{i.ariaBusy="true";const t=new r.LnurlReader;t.onLnurlRead=t=>n(void 0,void 0,void 0,(function*(){s("lnurl found"),yield(0,r.handleLNURL)(t,null==e?void 0:e.value,"proxy.php").then((e=>{e.success?s("invoice payment initiated!"):s(e.message,!0)})),i.ariaBusy="false"})),t.onReadingError=(e,t)=>{s(`reading error: ${r.ErrorReason[e]}${t?`, type: ${t.type}`:""}`,!0)},s("Checking NFC permissions"),yield t.startListening(),s("listening for NFC tags")}catch(e){i.ariaBusy="false",e in r.ErrorReason?s(r.ErrorReason[e],!0):s(e.message,!0)}}))))}))))}},n={};function r(e){var t=n[e];if(void 0!==t)return t.exports;var a=n[e]={exports:{}};return i[e].call(a.exports,a,a.exports,r),a.exports}r.m=i,r.d=(e,t)=>{for(var i in t)r.o(t,i)&&!r.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},r.f={},r.e=e=>Promise.all(Object.keys(r.f).reduce(((t,i)=>(r.f[i](e,t),t)),[])),r.u=e=>e+".bundle.js",r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),e={},t="wireless-sats:",r.l=(i,n,a,s)=>{if(e[i])e[i].push(n);else{var o,c;if(void 0!==a)for(var d=document.getElementsByTagName("script"),l=0;l<d.length;l++){var h=d[l];if(h.getAttribute("src")==i||h.getAttribute("data-webpack")==t+a){o=h;break}}o||(c=!0,(o=document.createElement("script")).charset="utf-8",o.timeout=120,r.nc&&o.setAttribute("nonce",r.nc),o.setAttribute("data-webpack",t+a),o.src=i),e[i]=[n];var u=(t,n)=>{o.onerror=o.onload=null,clearTimeout(g);var r=e[i];if(delete e[i],o.parentNode&&o.parentNode.removeChild(o),r&&r.forEach((e=>e(n))),t)return t(n)},g=setTimeout(u.bind(null,void 0,{type:"timeout",target:o}),12e4);o.onerror=u.bind(null,o.onerror),o.onload=u.bind(null,o.onload),c&&document.head.appendChild(o)}},r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;r.g.importScripts&&(e=r.g.location+"");var t=r.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var i=t.getElementsByTagName("script");i.length&&(e=i[i.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),r.p=e})(),(()=>{var e={179:0};r.f.j=(t,i)=>{var n=r.o(e,t)?e[t]:void 0;if(0!==n)if(n)i.push(n[2]);else{var a=new Promise(((i,r)=>n=e[t]=[i,r]));i.push(n[2]=a);var s=r.p+r.u(t),o=new Error;r.l(s,(i=>{if(r.o(e,t)&&(0!==(n=e[t])&&(e[t]=void 0),n)){var a=i&&("load"===i.type?"missing":i.type),s=i&&i.target&&i.target.src;o.message="Loading chunk "+t+" failed.\n("+a+": "+s+")",o.name="ChunkLoadError",o.type=a,o.request=s,n[1](o)}}),"chunk-"+t,t)}};var t=(t,i)=>{var n,a,[s,o,c]=i,d=0;if(s.some((t=>0!==e[t]))){for(n in o)r.o(o,n)&&(r.m[n]=o[n]);c&&c(r)}for(t&&t(i);d<s.length;d++)a=s[d],r.o(e,a)&&e[a]&&e[a][0](),e[a]=0},i=self.webpackChunkwireless_sats=self.webpackChunkwireless_sats||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))})(),r(607)})();