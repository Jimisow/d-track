import{D as ne,j as se,_ as Ar,k as Dr,m as Mr,n as Or,p as Lr,q as si,t as Fr,v as Wr,w as L,x as _,y as ee,z as we,A as Ve,L as Ur,B as Yt,C as Cn,E as $r,F as At,H as qr,S as Vr,I as Gr,J as vt,K as Ln,M as Hr,N as Br,O as gs,P as jr,Q as zr,R as Yr,T as Kr,U as ii,V as Qr,W as Xr,X as Jr,Y as Zr,Z as eo}from"./index.esm2017-BVztub6N.js";import{r as to,g as no,m as z,b as Ee}from"./auth-Ca34X4bO.js";import{o as so,e as g,a as io}from"./dom-mi_c-3pD.js";var vs={};const ys="@firebase/database",Cs="1.0.20";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ri="";function ro(n){ri=n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oo{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),L(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:Ln(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ao{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return ee(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oi=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new oo(e)}}catch{}return new ao},ye=oi("localStorage"),lo=oi("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $e=new Ur("@firebase/database"),ai=(function(){let n=1;return function(){return n++}})(),li=function(n){const e=qr(n),t=new Vr;t.update(e);const s=t.digest();return Gr.encodeByteArray(s)},yt=function(...n){let e="";for(let t=0;t<n.length;t++){const s=n[t];Array.isArray(s)||s&&typeof s=="object"&&typeof s.length=="number"?e+=yt.apply(null,s):typeof s=="object"?e+=L(s):e+=s,e+=" "}return e};let rt=null,ws=!0;const co=function(n,e){_(!0,"Can't turn on custom loggers persistently."),$e.logLevel=$r.VERBOSE,rt=$e.log.bind($e)},U=function(...n){if(ws===!0&&(ws=!1,rt===null&&lo.get("logging_enabled")===!0&&co()),rt){const e=yt.apply(null,n);rt(e)}},Ct=function(n){return function(...e){U(n,...e)}},wn=function(...n){const e="FIREBASE INTERNAL ERROR: "+yt(...n);$e.error(e)},ae=function(...n){const e=`FIREBASE FATAL ERROR: ${yt(...n)}`;throw $e.error(e),new Error(e)},G=function(...n){const e="FIREBASE WARNING: "+yt(...n);$e.warn(e)},uo=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&G("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Kt=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},ho=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},Ge="[MIN_NAME]",ke="[MAX_NAME]",Ne=function(n,e){if(n===e)return 0;if(n===Ge||e===ke)return-1;if(e===Ge||n===ke)return 1;{const t=Es(n),s=Es(e);return t!==null?s!==null?t-s===0?n.length-e.length:t-s:-1:s!==null?1:n<e?-1:1}},fo=function(n,e){return n===e?0:n<e?-1:1},et=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+L(e))},Fn=function(n){if(typeof n!="object"||n===null)return L(n);const e=[];for(const s in n)e.push(s);e.sort();let t="{";for(let s=0;s<e.length;s++)s!==0&&(t+=","),t+=L(e[s]),t+=":",t+=Fn(n[e[s]]);return t+="}",t},ci=function(n,e){const t=n.length;if(t<=e)return[n];const s=[];for(let i=0;i<t;i+=e)i+e>t?s.push(n.substring(i,t)):s.push(n.substring(i,i+e));return s};function $(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const ui=function(n){_(!Kt(n),"Invalid JSON number");const e=11,t=52,s=(1<<e-1)-1;let i,r,o,a,l;n===0?(r=0,o=0,i=1/n===-1/0?1:0):(i=n<0,n=Math.abs(n),n>=Math.pow(2,1-s)?(a=Math.min(Math.floor(Math.log(n)/Math.LN2),s),r=a+s,o=Math.round(n*Math.pow(2,t-a)-Math.pow(2,t))):(r=0,o=Math.round(n/Math.pow(2,1-s-t))));const c=[];for(l=t;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(i?1:0),c.reverse();const h=c.join("");let d="";for(l=0;l<64;l+=8){let u=parseInt(h.substr(l,8),2).toString(16);u.length===1&&(u="0"+u),d=d+u}return d.toLowerCase()},po=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},_o=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function mo(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const s=new Error(n+" at "+e._path.toString()+": "+t);return s.code=n.toUpperCase(),s}const go=new RegExp("^-?(0*)\\d{1,10}$"),vo=-2147483648,yo=2147483647,Es=function(n){if(go.test(n)){const e=Number(n);if(e>=vo&&e<=yo)return e}return null},Ke=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw G("Exception was thrown by user callback.",t),e},Math.floor(0))}},Co=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},ot=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wo{constructor(e,t){this.appCheckProvider=t,this.appName=e.name,jr(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t==null?void 0:t.getImmediate({optional:!0}),this.appCheck||t==null||t.get().then(s=>this.appCheck=s)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((t,s)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,s):t(null)},0)})}addTokenChangeListener(e){var t;(t=this.appCheckProvider)===null||t===void 0||t.get().then(s=>s.addTokenListener(e))}notifyForInvalidToken(){G(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eo{constructor(e,t,s){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=s,this.auth_=null,this.auth_=s.getImmediate({optional:!0}),this.auth_||s.onInit(i=>this.auth_=i)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(U("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,s)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,s):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',G(e)}}class Pt{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Pt.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wn="5",hi="v",di="s",fi="r",pi="f",_i=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,mi="ls",gi="p",En="ac",vi="websocket",yi="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ci{constructor(e,t,s,i,r=!1,o="",a=!1,l=!1,c=null){this.secure=t,this.namespace=s,this.webSocketOnly=i,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this.emulatorOptions=c,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=ye.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&ye.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function ko(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function wi(n,e,t){_(typeof e=="string","typeof type must == string"),_(typeof t=="object","typeof params must == object");let s;if(e===vi)s=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===yi)s=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);ko(n)&&(t.ns=n.namespace);const i=[];return $(t,(r,o)=>{i.push(r+"="+o)}),s+i.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class To{constructor(){this.counters_={}}incrementCounter(e,t=1){ee(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return Xr(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dn={},fn={};function Un(n){const e=n.toString();return dn[e]||(dn[e]=new To),dn[e]}function bo(n,e){const t=n.toString();return fn[t]||(fn[t]=e()),fn[t]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Io{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const s=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let i=0;i<s.length;++i)s[i]&&Ke(()=>{this.onMessage_(s[i])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ks="start",So="close",No="pLPCommand",xo="pRTLPCB",Ei="id",ki="pw",Ti="ser",Ro="cb",Po="seg",Ao="ts",Do="d",Mo="dframe",bi=1870,Ii=30,Oo=bi-Ii,Lo=25e3,Fo=3e4;class Ue{constructor(e,t,s,i,r,o,a){this.connId=e,this.repoInfo=t,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Ct(e),this.stats_=Un(t),this.urlFn=l=>(this.appCheckToken&&(l[En]=this.appCheckToken),wi(t,yi,l))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new Io(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(Fo)),ho(()=>{if(this.isClosed_)return;this.scriptTagHolder=new $n((...r)=>{const[o,a,l,c,h]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===ks)this.id=a,this.password=l;else if(o===So)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const s={};s[ks]="t",s[Ti]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(s[Ro]=this.scriptTagHolder.uniqueCallbackIdentifier),s[hi]=Wn,this.transportSessionId&&(s[di]=this.transportSessionId),this.lastSessionId&&(s[mi]=this.lastSessionId),this.applicationId&&(s[gi]=this.applicationId),this.appCheckToken&&(s[En]=this.appCheckToken),typeof location<"u"&&location.hostname&&_i.test(location.hostname)&&(s[fi]=pi);const i=this.urlFn(s);this.log_("Connecting via long-poll to "+i),this.scriptTagHolder.addTag(i,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){Ue.forceAllow_=!0}static forceDisallow(){Ue.forceDisallow_=!0}static isAvailable(){return Ue.forceAllow_?!0:!Ue.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!po()&&!_o()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=L(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const s=Jr(t),i=ci(s,Oo);for(let r=0;r<i.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,i.length,i[r]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const s={};s[Mo]="t",s[Ei]=e,s[ki]=t,this.myDisconnFrame.src=this.urlFn(s),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=L(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class $n{constructor(e,t,s,i){this.onDisconnect=s,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=ai(),window[No+this.uniqueCallbackIdentifier]=e,window[xo+this.uniqueCallbackIdentifier]=t,this.myIFrame=$n.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){U("frame writing exception"),a.stack&&U(a.stack),U(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||U("No IE domain setting required")}catch{const s=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+s+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Ei]=this.myID,e[ki]=this.myPW,e[Ti]=this.currentSerial;let t=this.urlFn(e),s="",i=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Ii+s.length<=bi;){const o=this.pendingSegs.shift();s=s+"&"+Po+i+"="+o.seg+"&"+Ao+i+"="+o.ts+"&"+Do+i+"="+o.d,i++}return t=t+s,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,s){this.pendingSegs.push({seg:e,ts:t,d:s}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const s=()=>{this.outstandingRequests.delete(t),this.newRequest_()},i=setTimeout(s,Math.floor(Lo)),r=()=>{clearTimeout(i),s()};this.addTag(e,r)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const s=this.myIFrame.doc.createElement("script");s.type="text/javascript",s.async=!0,s.src=e,s.onload=s.onreadystatechange=function(){const i=s.readyState;(!i||i==="loaded"||i==="complete")&&(s.onload=s.onreadystatechange=null,s.parentNode&&s.parentNode.removeChild(s),t())},s.onerror=()=>{U("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(s)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wo=16384,Uo=45e3;let Dt=null;typeof MozWebSocket<"u"?Dt=MozWebSocket:typeof WebSocket<"u"&&(Dt=WebSocket);class X{constructor(e,t,s,i,r,o,a){this.connId=e,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Ct(this.connId),this.stats_=Un(t),this.connURL=X.connectionURL_(t,o,a,i,s),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,s,i,r){const o={};return o[hi]=Wn,typeof location<"u"&&location.hostname&&_i.test(location.hostname)&&(o[fi]=pi),t&&(o[di]=t),s&&(o[mi]=s),i&&(o[En]=i),r&&(o[gi]=r),wi(e,vi,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,ye.set("previous_websocket_failure",!0);try{let s;Zr(),this.mySock=new Dt(this.connURL,[],s)}catch(s){this.log_("Error instantiating WebSocket.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=s=>{this.handleIncomingFrame(s)},this.mySock.onerror=s=>{this.log_("WebSocket error.  Closing connection.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_()}}start(){}static forceDisallow(){X.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,s=navigator.userAgent.match(t);s&&s.length>1&&parseFloat(s[1])<4.4&&(e=!0)}return!e&&Dt!==null&&!X.forceDisallow_}static previouslyFailed(){return ye.isInMemoryStorage||ye.get("previous_websocket_failure")===!0}markConnectionHealthy(){ye.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const s=Ln(t);this.onMessage(s)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(_(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const s=this.extractFrameCount_(t);s!==null&&this.appendFrame_(s)}}send(e){this.resetKeepAlive();const t=L(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const s=ci(t,Wo);s.length>1&&this.sendString_(String(s.length));for(let i=0;i<s.length;i++)this.sendString_(s[i])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(Uo))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}X.responsesRequiredToBeHealthy=2;X.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut{static get ALL_TRANSPORTS(){return[Ue,X]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const t=X&&X.isAvailable();let s=t&&!X.previouslyFailed();if(e.webSocketOnly&&(t||G("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),s=!0),s)this.transports_=[X];else{const i=this.transports_=[];for(const r of ut.ALL_TRANSPORTS)r&&r.isAvailable()&&i.push(r);ut.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}ut.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $o=6e4,qo=5e3,Vo=10*1024,Go=100*1024,pn="t",Ts="d",Ho="s",bs="r",Bo="e",Is="o",Ss="a",Ns="n",xs="p",jo="h";class zo{constructor(e,t,s,i,r,o,a,l,c,h){this.id=e,this.repoInfo_=t,this.applicationId_=s,this.appCheckToken_=i,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=h,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Ct("c:"+this.id+":"),this.transportManager_=new ut(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),s=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,s)},Math.floor(0));const i=e.healthyTimeout||0;i>0&&(this.healthyTimeout_=ot(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>Go?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>Vo?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(i)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(pn in e){const t=e[pn];t===Ss?this.upgradeIfSecondaryHealthy_():t===bs?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===Is&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=et("t",e),s=et("d",e);if(t==="c")this.onSecondaryControl_(s);else if(t==="d")this.pendingDataMessages.push(s);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:xs,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Ss,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Ns,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=et("t",e),s=et("d",e);t==="c"?this.onControl_(s):t==="d"&&this.onDataMessage_(s)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=et(pn,e);if(Ts in e){const s=e[Ts];if(t===jo){const i=Object.assign({},s);this.repoInfo_.isUsingEmulator&&(i.h=this.repoInfo_.host),this.onHandshake_(i)}else if(t===Ns){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let i=0;i<this.pendingDataMessages.length;++i)this.onDataMessage_(this.pendingDataMessages[i]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===Ho?this.onConnectionShutdown_(s):t===bs?this.onReset_(s):t===Bo?wn("Server Error: "+s):t===Is?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):wn("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,s=e.v,i=e.h;this.sessionId=e.s,this.repoInfo_.host=i,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),Wn!==s&&G("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),s=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,s),ot(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor($o))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):ot(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(qo))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:xs,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(ye.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Si{put(e,t,s,i){}merge(e,t,s,i){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,s){}onDisconnectMerge(e,t,s){}onDisconnectCancel(e,t){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ni{constructor(e){this.allowedEvents_=e,this.listeners_={},_(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const s=[...this.listeners_[e]];for(let i=0;i<s.length;i++)s[i].callback.apply(s[i].context,t)}}on(e,t,s){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:s});const i=this.getInitialEvent(e);i&&t.apply(s,i)}off(e,t,s){this.validateEventType_(e);const i=this.listeners_[e]||[];for(let r=0;r<i.length;r++)if(i[r].callback===t&&(!s||s===i[r].context)){i.splice(r,1);return}}validateEventType_(e){_(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mt extends Ni{static getInstance(){return new Mt}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!ii()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return _(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rs=32,Ps=768;class S{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let s=0;for(let i=0;i<this.pieces_.length;i++)this.pieces_[i].length>0&&(this.pieces_[s]=this.pieces_[i],s++);this.pieces_.length=s,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function b(){return new S("")}function C(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function fe(n){return n.pieces_.length-n.pieceNum_}function N(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new S(n.pieces_,e)}function qn(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function Yo(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function ht(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function xi(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new S(e,0)}function D(n,e){const t=[];for(let s=n.pieceNum_;s<n.pieces_.length;s++)t.push(n.pieces_[s]);if(e instanceof S)for(let s=e.pieceNum_;s<e.pieces_.length;s++)t.push(e.pieces_[s]);else{const s=e.split("/");for(let i=0;i<s.length;i++)s[i].length>0&&t.push(s[i])}return new S(t,0)}function E(n){return n.pieceNum_>=n.pieces_.length}function V(n,e){const t=C(n),s=C(e);if(t===null)return e;if(t===s)return V(N(n),N(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function Ko(n,e){const t=ht(n,0),s=ht(e,0);for(let i=0;i<t.length&&i<s.length;i++){const r=Ne(t[i],s[i]);if(r!==0)return r}return t.length===s.length?0:t.length<s.length?-1:1}function Vn(n,e){if(fe(n)!==fe(e))return!1;for(let t=n.pieceNum_,s=e.pieceNum_;t<=n.pieces_.length;t++,s++)if(n.pieces_[t]!==e.pieces_[s])return!1;return!0}function Y(n,e){let t=n.pieceNum_,s=e.pieceNum_;if(fe(n)>fe(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[s])return!1;++t,++s}return!0}class Qo{constructor(e,t){this.errorPrefix_=t,this.parts_=ht(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let s=0;s<this.parts_.length;s++)this.byteLength_+=Yt(this.parts_[s]);Ri(this)}}function Xo(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=Yt(e),Ri(n)}function Jo(n){const e=n.parts_.pop();n.byteLength_-=Yt(e),n.parts_.length>0&&(n.byteLength_-=1)}function Ri(n){if(n.byteLength_>Ps)throw new Error(n.errorPrefix_+"has a key path longer than "+Ps+" bytes ("+n.byteLength_+").");if(n.parts_.length>Rs)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Rs+") or object contains a cycle "+ve(n))}function ve(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gn extends Ni{static getInstance(){return new Gn}constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const s=!document[e];s!==this.visible_&&(this.visible_=s,this.trigger("visible",s))},!1)}getInitialEvent(e){return _(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tt=1e3,Zo=300*1e3,As=30*1e3,ea=1.3,ta=3e4,na="server_kill",Ds=3;class re extends Si{constructor(e,t,s,i,r,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=s,this.onConnectStatus_=i,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=re.nextPersistentConnectionId_++,this.log_=Ct("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=tt,this.maxReconnectDelay_=Zo,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Gn.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&Mt.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,s){const i=++this.requestNumber_,r={r:i,a:e,b:t};this.log_(L(r)),_(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),s&&(this.requestCBHash_[i]=s)}get(e){this.initConnection_();const t=new ne,i={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?t.resolve(a):t.reject(a)}};this.outstandingGets_.push(i),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,s,i){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),_(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),_(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:i,hashFn:t,query:e,tag:s};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,s=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(s)})}sendListen_(e){const t=e.query,s=t._path.toString(),i=t._queryIdentifier;this.log_("Listen on "+s+" for "+i);const r={p:s},o="q";e.tag&&(r.q=t._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const l=a.d,c=a.s;re.warnOnListenWarnings_(l,t),(this.listens.get(s)&&this.listens.get(s).get(i))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(s,i),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&ee(e,"w")){const s=we(e,"w");if(Array.isArray(s)&&~s.indexOf("no_index")){const i='".indexOn": "'+t._queryParams.getIndex().toString()+'"',r=t._path.toString();G(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${i} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||Yr(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=As)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=Kr(e)?"auth":"gauth",s={cred:e};this.authOverride_===null?s.noauth=!0:typeof this.authOverride_=="object"&&(s.authvar=this.authOverride_),this.sendRequest(t,s,i=>{const r=i.s,o=i.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,s=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,s)})}unlisten(e,t){const s=e._path.toString(),i=e._queryIdentifier;this.log_("Unlisten called for "+s+" "+i),_(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(s,i)&&this.connected_&&this.sendUnlisten_(s,i,e._queryObject,t)}sendUnlisten_(e,t,s,i){this.log_("Unlisten on "+e+" for "+t);const r={p:e},o="n";i&&(r.q=s,r.t=i),this.sendRequest(o,r)}onDisconnectPut(e,t,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:s})}onDisconnectMerge(e,t,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:s})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,s,i){const r={p:t,d:s};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{i&&setTimeout(()=>{i(o.s,o.d)},Math.floor(0))})}put(e,t,s,i){this.putInternal("p",e,t,s,i)}merge(e,t,s,i){this.putInternal("m",e,t,s,i)}putInternal(e,t,s,i,r){this.initConnection_();const o={p:t,d:s};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:i}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,s=this.outstandingPuts_[e].request,i=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,s,r=>{this.log_(t+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),i&&i(r.s,r.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,s=>{if(s.s!=="ok"){const r=s.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+L(e));const t=e.r,s=this.requestCBHash_[t];s&&(delete this.requestCBHash_[t],s(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):wn("Unrecognized action received from server: "+L(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){_(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=tt,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=tt,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>ta&&(this.reconnectDelay_=tt),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*ea)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),s=this.onRealtimeDisconnect_.bind(this),i=this.id+":"+re.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,s())},c=function(d){_(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(d)};this.realtime_={close:l,sendRequest:c};const h=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[d,u]=await Promise.all([this.authTokenProvider_.getToken(h),this.appCheckTokenProvider_.getToken(h)]);o?U("getToken() completed but was canceled"):(U("getToken() completed. Creating connection."),this.authToken_=d&&d.accessToken,this.appCheckToken_=u&&u.token,a=new zo(i,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,s,f=>{G(f+" ("+this.repoInfo_.toString()+")"),this.interrupt(na)},r))}catch(d){this.log_("Failed to get token: "+d),o||(this.repoInfo_.nodeAdmin&&G(d),l())}}}interrupt(e){U("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){U("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Cn(this.interruptReasons_)&&(this.reconnectDelay_=tt,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let s;t?s=t.map(r=>Fn(r)).join("$"):s="default";const i=this.removeListen_(e,s);i&&i.onComplete&&i.onComplete("permission_denied")}removeListen_(e,t){const s=new S(e).toString();let i;if(this.listens.has(s)){const r=this.listens.get(s);i=r.get(t),r.delete(t),r.size===0&&this.listens.delete(s)}else i=void 0;return i}onAuthRevoked_(e,t){U("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Ds&&(this.reconnectDelay_=As,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){U("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Ds&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+ri.replace(/\./g,"-")]=1,ii()?e["framework.cordova"]=1:Qr()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Mt.getInstance().currentlyOnline();return Cn(this.interruptReasons_)&&e}}re.nextPersistentConnectionId_=0;re.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class k{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new k(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qt{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const s=new k(Ge,e),i=new k(Ge,t);return this.compare(s,i)!==0}minPost(){return k.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Nt;class Pi extends Qt{static get __EMPTY_NODE(){return Nt}static set __EMPTY_NODE(e){Nt=e}compare(e,t){return Ne(e.name,t.name)}isDefinedOn(e){throw vt("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return k.MIN}maxPost(){return new k(ke,Nt)}makePost(e,t){return _(typeof e=="string","KeyIndex indexValue must always be a string."),new k(e,Nt)}toString(){return".key"}}const qe=new Pi;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xt{constructor(e,t,s,i,r=null){this.isReverse_=i,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?s(e.key,t):1,i&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class W{constructor(e,t,s,i,r){this.key=e,this.value=t,this.color=s??W.RED,this.left=i??H.EMPTY_NODE,this.right=r??H.EMPTY_NODE}copy(e,t,s,i,r){return new W(e??this.key,t??this.value,s??this.color,i??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,s){let i=this;const r=s(e,i.key);return r<0?i=i.copy(null,null,null,i.left.insert(e,t,s),null):r===0?i=i.copy(null,t,null,null,null):i=i.copy(null,null,null,null,i.right.insert(e,t,s)),i.fixUp_()}removeMin_(){if(this.left.isEmpty())return H.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let s,i;if(s=this,t(e,s.key)<0)!s.left.isEmpty()&&!s.left.isRed_()&&!s.left.left.isRed_()&&(s=s.moveRedLeft_()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed_()&&(s=s.rotateRight_()),!s.right.isEmpty()&&!s.right.isRed_()&&!s.right.left.isRed_()&&(s=s.moveRedRight_()),t(e,s.key)===0){if(s.right.isEmpty())return H.EMPTY_NODE;i=s.right.min_(),s=s.copy(i.key,i.value,null,null,s.right.removeMin_())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,W.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,W.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}W.RED=!0;W.BLACK=!1;class sa{copy(e,t,s,i,r){return this}insert(e,t,s){return new W(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class H{constructor(e,t=H.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new H(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,W.BLACK,null,null))}remove(e){return new H(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,W.BLACK,null,null))}get(e){let t,s=this.root_;for(;!s.isEmpty();){if(t=this.comparator_(e,s.key),t===0)return s.value;t<0?s=s.left:t>0&&(s=s.right)}return null}getPredecessorKey(e){let t,s=this.root_,i=null;for(;!s.isEmpty();)if(t=this.comparator_(e,s.key),t===0){if(s.left.isEmpty())return i?i.key:null;for(s=s.left;!s.right.isEmpty();)s=s.right;return s.key}else t<0?s=s.left:t>0&&(i=s,s=s.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new xt(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new xt(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new xt(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new xt(this.root_,null,this.comparator_,!0,e)}}H.EMPTY_NODE=new sa;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ia(n,e){return Ne(n.name,e.name)}function Hn(n,e){return Ne(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let kn;function ra(n){kn=n}const Ai=function(n){return typeof n=="number"?"number:"+ui(n):"string:"+n},Di=function(n){if(n.isLeafNode()){const e=n.val();_(typeof e=="string"||typeof e=="number"||typeof e=="object"&&ee(e,".sv"),"Priority must be a string or number.")}else _(n===kn||n.isEmpty(),"priority of unexpected type.");_(n===kn||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ms;class F{static set __childrenNodeConstructor(e){Ms=e}static get __childrenNodeConstructor(){return Ms}constructor(e,t=F.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,_(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Di(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new F(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:F.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return E(e)?this:C(e)===".priority"?this.priorityNode_:F.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:F.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const s=C(e);return s===null?t:t.isEmpty()&&s!==".priority"?this:(_(s!==".priority"||fe(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(s,F.__childrenNodeConstructor.EMPTY_NODE.updateChild(N(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Ai(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=ui(this.value_):e+=this.value_,this.lazyHash_=li(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===F.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof F.__childrenNodeConstructor?-1:(_(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,s=typeof this.value_,i=F.VALUE_TYPE_ORDER.indexOf(t),r=F.VALUE_TYPE_ORDER.indexOf(s);return _(i>=0,"Unknown leaf type: "+t),_(r>=0,"Unknown leaf type: "+s),i===r?s==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-i}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}F.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Mi,Oi;function oa(n){Mi=n}function aa(n){Oi=n}class la extends Qt{compare(e,t){const s=e.node.getPriority(),i=t.node.getPriority(),r=s.compareTo(i);return r===0?Ne(e.name,t.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return k.MIN}maxPost(){return new k(ke,new F("[PRIORITY-POST]",Oi))}makePost(e,t){const s=Mi(e);return new k(t,new F("[PRIORITY-POST]",s))}toString(){return".priority"}}const P=new la;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ca=Math.log(2);class ua{constructor(e){const t=r=>parseInt(Math.log(r)/ca,10),s=r=>parseInt(Array(r+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const i=s(this.count);this.bits_=e+1&i}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Ot=function(n,e,t,s){n.sort(e);const i=function(l,c){const h=c-l;let d,u;if(h===0)return null;if(h===1)return d=n[l],u=t?t(d):d,new W(u,d.node,W.BLACK,null,null);{const f=parseInt(h/2,10)+l,p=i(l,f),m=i(f+1,c);return d=n[f],u=t?t(d):d,new W(u,d.node,W.BLACK,p,m)}},r=function(l){let c=null,h=null,d=n.length;const u=function(p,m){const y=d-p,T=d;d-=p;const I=i(y+1,T),q=n[y],Q=t?t(q):q;f(new W(Q,q.node,m,null,I))},f=function(p){c?(c.left=p,c=p):(h=p,c=p)};for(let p=0;p<l.count;++p){const m=l.nextBitIsOne(),y=Math.pow(2,l.count-(p+1));m?u(y,W.BLACK):(u(y,W.BLACK),u(y,W.RED))}return h},o=new ua(n.length),a=r(o);return new H(s||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let _n;const Le={};class ie{static get Default(){return _(Le&&P,"ChildrenNode.ts has not been loaded"),_n=_n||new ie({".priority":Le},{".priority":P}),_n}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){const t=we(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof H?t:null}hasIndex(e){return ee(this.indexSet_,e.toString())}addIndex(e,t){_(e!==qe,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const s=[];let i=!1;const r=t.getIterator(k.Wrap);let o=r.getNext();for(;o;)i=i||e.isDefinedOn(o.node),s.push(o),o=r.getNext();let a;i?a=Ot(s,e.getCompare()):a=Le;const l=e.toString(),c=Object.assign({},this.indexSet_);c[l]=e;const h=Object.assign({},this.indexes_);return h[l]=a,new ie(h,c)}addToIndexes(e,t){const s=At(this.indexes_,(i,r)=>{const o=we(this.indexSet_,r);if(_(o,"Missing index implementation for "+r),i===Le)if(o.isDefinedOn(e.node)){const a=[],l=t.getIterator(k.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),Ot(a,o.getCompare())}else return Le;else{const a=t.get(e.name);let l=i;return a&&(l=l.remove(new k(e.name,a))),l.insert(e,e.node)}});return new ie(s,this.indexSet_)}removeFromIndexes(e,t){const s=At(this.indexes_,i=>{if(i===Le)return i;{const r=t.get(e.name);return r?i.remove(new k(e.name,r)):i}});return new ie(s,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nt;class v{static get EMPTY_NODE(){return nt||(nt=new v(new H(Hn),null,ie.Default))}constructor(e,t,s){this.children_=e,this.priorityNode_=t,this.indexMap_=s,this.lazyHash_=null,this.priorityNode_&&Di(this.priorityNode_),this.children_.isEmpty()&&_(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||nt}updatePriority(e){return this.children_.isEmpty()?this:new v(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?nt:t}}getChild(e){const t=C(e);return t===null?this:this.getImmediateChild(t).getChild(N(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(_(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const s=new k(e,t);let i,r;t.isEmpty()?(i=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(s,this.children_)):(i=this.children_.insert(e,t),r=this.indexMap_.addToIndexes(s,this.children_));const o=i.isEmpty()?nt:this.priorityNode_;return new v(i,o,r)}}updateChild(e,t){const s=C(e);if(s===null)return t;{_(C(e)!==".priority"||fe(e)===1,".priority must be the last token in a path");const i=this.getImmediateChild(s).updateChild(N(e),t);return this.updateImmediateChild(s,i)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let s=0,i=0,r=!0;if(this.forEachChild(P,(o,a)=>{t[o]=a.val(e),s++,r&&v.INTEGER_REGEXP_.test(o)?i=Math.max(i,Number(o)):r=!1}),!e&&r&&i<2*s){const o=[];for(const a in t)o[a]=t[a];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+Ai(this.getPriority().val())+":"),this.forEachChild(P,(t,s)=>{const i=s.hash();i!==""&&(e+=":"+t+":"+i)}),this.lazyHash_=e===""?"":li(e)}return this.lazyHash_}getPredecessorChildName(e,t,s){const i=this.resolveIndex_(s);if(i){const r=i.getPredecessorKey(new k(e,t));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const s=t.minKey();return s&&s.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new k(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const s=t.maxKey();return s&&s.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new k(t,this.children_.get(t)):null}forEachChild(e,t){const s=this.resolveIndex_(e);return s?s.inorderTraversal(i=>t(i.name,i.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const s=this.resolveIndex_(t);if(s)return s.getIteratorFrom(e,i=>i);{const i=this.children_.getIteratorFrom(e.name,k.Wrap);let r=i.peek();for(;r!=null&&t.compare(r,e)<0;)i.getNext(),r=i.peek();return i}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const s=this.resolveIndex_(t);if(s)return s.getReverseIteratorFrom(e,i=>i);{const i=this.children_.getReverseIteratorFrom(e.name,k.Wrap);let r=i.peek();for(;r!=null&&t.compare(r,e)>0;)i.getNext(),r=i.peek();return i}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===wt?-1:0}withIndex(e){if(e===qe||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new v(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===qe||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const s=this.getIterator(P),i=t.getIterator(P);let r=s.getNext(),o=i.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=s.getNext(),o=i.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===qe?null:this.indexMap_.get(e.toString())}}v.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class ha extends v{constructor(){super(new H(Hn),v.EMPTY_NODE,ie.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return v.EMPTY_NODE}isEmpty(){return!1}}const wt=new ha;Object.defineProperties(k,{MIN:{value:new k(Ge,v.EMPTY_NODE)},MAX:{value:new k(ke,wt)}});Pi.__EMPTY_NODE=v.EMPTY_NODE;F.__childrenNodeConstructor=v;ra(wt);aa(wt);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const da=!0;function A(n,e=null){if(n===null)return v.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),_(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new F(t,A(e))}if(!(n instanceof Array)&&da){const t=[];let s=!1;if($(n,(o,a)=>{if(o.substring(0,1)!=="."){const l=A(a);l.isEmpty()||(s=s||!l.getPriority().isEmpty(),t.push(new k(o,l)))}}),t.length===0)return v.EMPTY_NODE;const r=Ot(t,ia,o=>o.name,Hn);if(s){const o=Ot(t,P.getCompare());return new v(r,A(e),new ie({".priority":o},{".priority":P}))}else return new v(r,A(e),ie.Default)}else{let t=v.EMPTY_NODE;return $(n,(s,i)=>{if(ee(n,s)&&s.substring(0,1)!=="."){const r=A(i);(r.isLeafNode()||!r.isEmpty())&&(t=t.updateImmediateChild(s,r))}}),t.updatePriority(A(e))}}oa(A);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fa extends Qt{constructor(e){super(),this.indexPath_=e,_(!E(e)&&C(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const s=this.extractChild(e.node),i=this.extractChild(t.node),r=s.compareTo(i);return r===0?Ne(e.name,t.name):r}makePost(e,t){const s=A(e),i=v.EMPTY_NODE.updateChild(this.indexPath_,s);return new k(t,i)}maxPost(){const e=v.EMPTY_NODE.updateChild(this.indexPath_,wt);return new k(ke,e)}toString(){return ht(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pa extends Qt{compare(e,t){const s=e.node.compareTo(t.node);return s===0?Ne(e.name,t.name):s}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return k.MIN}maxPost(){return k.MAX}makePost(e,t){const s=A(e);return new k(t,s)}toString(){return".value"}}const _a=new pa;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Li(n){return{type:"value",snapshotNode:n}}function He(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function dt(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function ft(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function ma(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bn{constructor(e){this.index_=e}updateChild(e,t,s,i,r,o){_(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(t);return a.getChild(i).equals(s.getChild(i))&&a.isEmpty()===s.isEmpty()||(o!=null&&(s.isEmpty()?e.hasChild(t)?o.trackChildChange(dt(t,a)):_(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(He(t,s)):o.trackChildChange(ft(t,s,a))),e.isLeafNode()&&s.isEmpty())?e:e.updateImmediateChild(t,s).withIndex(this.index_)}updateFullNode(e,t,s){return s!=null&&(e.isLeafNode()||e.forEachChild(P,(i,r)=>{t.hasChild(i)||s.trackChildChange(dt(i,r))}),t.isLeafNode()||t.forEachChild(P,(i,r)=>{if(e.hasChild(i)){const o=e.getImmediateChild(i);o.equals(r)||s.trackChildChange(ft(i,r,o))}else s.trackChildChange(He(i,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?v.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pt{constructor(e){this.indexedFilter_=new Bn(e.getIndex()),this.index_=e.getIndex(),this.startPost_=pt.getStartPost_(e),this.endPost_=pt.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,s=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&s}updateChild(e,t,s,i,r,o){return this.matches(new k(t,s))||(s=v.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,s,i,r,o)}updateFullNode(e,t,s){t.isLeafNode()&&(t=v.EMPTY_NODE);let i=t.withIndex(this.index_);i=i.updatePriority(v.EMPTY_NODE);const r=this;return t.forEachChild(P,(o,a)=>{r.matches(new k(o,a))||(i=i.updateImmediateChild(o,v.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,i,s)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ga{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const s=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?s<=0:s<0},this.withinEndPost=t=>{const s=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?s<=0:s<0},this.rangedFilter_=new pt(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,s,i,r,o){return this.rangedFilter_.matches(new k(t,s))||(s=v.EMPTY_NODE),e.getImmediateChild(t).equals(s)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,s,i,r,o):this.fullLimitUpdateChild_(e,t,s,r,o)}updateFullNode(e,t,s){let i;if(t.isLeafNode()||t.isEmpty())i=v.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){i=v.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))i=i.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{i=t.withIndex(this.index_),i=i.updatePriority(v.EMPTY_NODE);let r;this.reverse_?r=i.getReverseIterator(this.index_):r=i.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:i=i.updateImmediateChild(a.name,v.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,i,s)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,s,i,r){let o;if(this.reverse_){const d=this.index_.getCompare();o=(u,f)=>d(f,u)}else o=this.index_.getCompare();const a=e;_(a.numChildren()===this.limit_,"");const l=new k(t,s),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),h=this.rangedFilter_.matches(l);if(a.hasChild(t)){const d=a.getImmediateChild(t);let u=i.getChildAfterChild(this.index_,c,this.reverse_);for(;u!=null&&(u.name===t||a.hasChild(u.name));)u=i.getChildAfterChild(this.index_,u,this.reverse_);const f=u==null?1:o(u,l);if(h&&!s.isEmpty()&&f>=0)return r!=null&&r.trackChildChange(ft(t,s,d)),a.updateImmediateChild(t,s);{r!=null&&r.trackChildChange(dt(t,d));const m=a.updateImmediateChild(t,v.EMPTY_NODE);return u!=null&&this.rangedFilter_.matches(u)?(r!=null&&r.trackChildChange(He(u.name,u.node)),m.updateImmediateChild(u.name,u.node)):m}}else return s.isEmpty()?e:h&&o(c,l)>=0?(r!=null&&(r.trackChildChange(dt(c.name,c.node)),r.trackChildChange(He(t,s))),a.updateImmediateChild(t,s).updateImmediateChild(c.name,v.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jn{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=P}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return _(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return _(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Ge}hasEnd(){return this.endSet_}getIndexEndValue(){return _(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return _(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:ke}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return _(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===P}copy(){const e=new jn;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function va(n){return n.loadsAllData()?new Bn(n.getIndex()):n.hasLimit()?new ga(n):new pt(n)}function ya(n,e){const t=n.copy();return t.limitSet_=!0,t.limit_=e,t.viewFrom_="r",t}function Os(n){const e={};if(n.isDefault())return e;let t;if(n.index_===P?t="$priority":n.index_===_a?t="$value":n.index_===qe?t="$key":(_(n.index_ instanceof fa,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=L(t),n.startSet_){const s=n.startAfterSet_?"startAfter":"startAt";e[s]=L(n.indexStartValue_),n.startNameSet_&&(e[s]+=","+L(n.indexStartName_))}if(n.endSet_){const s=n.endBeforeSet_?"endBefore":"endAt";e[s]=L(n.indexEndValue_),n.endNameSet_&&(e[s]+=","+L(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function Ls(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==P&&(e.i=n.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt extends Si{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(_(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,t,s,i){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=s,this.appCheckTokenProvider_=i,this.log_=Ct("p:rest:"),this.listens_={}}listen(e,t,s,i){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=Lt.getListenId_(e,s),a={};this.listens_[o]=a;const l=Os(e._queryParams);this.restRequest_(r+".json",l,(c,h)=>{let d=h;if(c===404&&(d=null,c=null),c===null&&this.onDataUpdate_(r,d,!1,s),we(this.listens_,o)===a){let u;c?c===401?u="permission_denied":u="rest_error:"+c:u="ok",i(u,null)}})}unlisten(e,t){const s=Lt.getListenId_(e,t);delete this.listens_[s]}get(e){const t=Os(e._queryParams),s=e._path.toString(),i=new ne;return this.restRequest_(s+".json",t,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(s,a,!1,null),i.resolve(a)):i.reject(new Error(a))}),i.promise}refreshAuthToken(e){}restRequest_(e,t={},s){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([i,r])=>{i&&i.accessToken&&(t.auth=i.accessToken),r&&r.token&&(t.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+zr(t);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(s&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=Ln(a.responseText)}catch{G("Failed to parse JSON response for "+o+": "+a.responseText)}s(null,l)}else a.status!==401&&a.status!==404&&G("Got unsuccessful REST response for "+o+" Status: "+a.status),s(a.status);s=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ca{constructor(){this.rootNode_=v.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ft(){return{value:null,children:new Map}}function Qe(n,e,t){if(E(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const s=C(e);n.children.has(s)||n.children.set(s,Ft());const i=n.children.get(s);e=N(e),Qe(i,e,t)}}function Tn(n,e){if(E(e))return n.value=null,n.children.clear(),!0;if(n.value!==null){if(n.value.isLeafNode())return!1;{const t=n.value;return n.value=null,t.forEachChild(P,(s,i)=>{Qe(n,new S(s),i)}),Tn(n,e)}}else if(n.children.size>0){const t=C(e);return e=N(e),n.children.has(t)&&Tn(n.children.get(t),e)&&n.children.delete(t),n.children.size===0}else return!0}function bn(n,e,t){n.value!==null?t(e,n.value):wa(n,(s,i)=>{const r=new S(e.toString()+"/"+s);bn(i,r,t)})}function wa(n,e){n.children.forEach((t,s)=>{e(s,t)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ea{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t=Object.assign({},e);return this.last_&&$(this.last_,(s,i)=>{t[s]=t[s]-i}),this.last_=e,t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fs=10*1e3,ka=30*1e3,Ta=300*1e3;class ba{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new Ea(e);const s=Fs+(ka-Fs)*Math.random();ot(this.reportStats_.bind(this),Math.floor(s))}reportStats_(){const e=this.statsListener_.get(),t={};let s=!1;$(e,(i,r)=>{r>0&&ee(this.statsToReport_,i)&&(t[i]=r,s=!0)}),s&&this.server_.reportStats(t),ot(this.reportStats_.bind(this),Math.floor(Math.random()*2*Ta))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var J;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(J||(J={}));function zn(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Yn(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Kn(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wt{constructor(e,t,s){this.path=e,this.affectedTree=t,this.revert=s,this.type=J.ACK_USER_WRITE,this.source=zn()}operationForChild(e){if(E(this.path)){if(this.affectedTree.value!=null)return _(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new S(e));return new Wt(b(),t,this.revert)}}else return _(C(this.path)===e,"operationForChild called for unrelated child."),new Wt(N(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t{constructor(e,t){this.source=e,this.path=t,this.type=J.LISTEN_COMPLETE}operationForChild(e){return E(this.path)?new _t(this.source,b()):new _t(this.source,N(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Te{constructor(e,t,s){this.source=e,this.path=t,this.snap=s,this.type=J.OVERWRITE}operationForChild(e){return E(this.path)?new Te(this.source,b(),this.snap.getImmediateChild(e)):new Te(this.source,N(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Be{constructor(e,t,s){this.source=e,this.path=t,this.children=s,this.type=J.MERGE}operationForChild(e){if(E(this.path)){const t=this.children.subtree(new S(e));return t.isEmpty()?null:t.value?new Te(this.source,b(),t.value):new Be(this.source,b(),t)}else return _(C(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Be(this.source,N(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pe{constructor(e,t,s){this.node_=e,this.fullyInitialized_=t,this.filtered_=s}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(E(e))return this.isFullyInitialized()&&!this.filtered_;const t=C(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ia{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function Sa(n,e,t,s){const i=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(ma(o.childName,o.snapshotNode))}),st(n,i,"child_removed",e,s,t),st(n,i,"child_added",e,s,t),st(n,i,"child_moved",r,s,t),st(n,i,"child_changed",e,s,t),st(n,i,"value",e,s,t),i}function st(n,e,t,s,i,r){const o=s.filter(a=>a.type===t);o.sort((a,l)=>xa(n,a,l)),o.forEach(a=>{const l=Na(n,a,r);i.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,n.query_))})})}function Na(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function xa(n,e,t){if(e.childName==null||t.childName==null)throw vt("Should only compare child_ events.");const s=new k(e.childName,e.snapshotNode),i=new k(t.childName,t.snapshotNode);return n.index_.compare(s,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xt(n,e){return{eventCache:n,serverCache:e}}function at(n,e,t,s){return Xt(new pe(e,t,s),n.serverCache)}function Fi(n,e,t,s){return Xt(n.eventCache,new pe(e,t,s))}function Ut(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function be(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let mn;const Ra=()=>(mn||(mn=new H(fo)),mn);class R{static fromObject(e){let t=new R(null);return $(e,(s,i)=>{t=t.set(new S(s),i)}),t}constructor(e,t=Ra()){this.value=e,this.children=t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:b(),value:this.value};if(E(e))return null;{const s=C(e),i=this.children.get(s);if(i!==null){const r=i.findRootMostMatchingPathAndValue(N(e),t);return r!=null?{path:D(new S(s),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(E(e))return this;{const t=C(e),s=this.children.get(t);return s!==null?s.subtree(N(e)):new R(null)}}set(e,t){if(E(e))return new R(t,this.children);{const s=C(e),r=(this.children.get(s)||new R(null)).set(N(e),t),o=this.children.insert(s,r);return new R(this.value,o)}}remove(e){if(E(e))return this.children.isEmpty()?new R(null):new R(null,this.children);{const t=C(e),s=this.children.get(t);if(s){const i=s.remove(N(e));let r;return i.isEmpty()?r=this.children.remove(t):r=this.children.insert(t,i),this.value===null&&r.isEmpty()?new R(null):new R(this.value,r)}else return this}}get(e){if(E(e))return this.value;{const t=C(e),s=this.children.get(t);return s?s.get(N(e)):null}}setTree(e,t){if(E(e))return t;{const s=C(e),r=(this.children.get(s)||new R(null)).setTree(N(e),t);let o;return r.isEmpty()?o=this.children.remove(s):o=this.children.insert(s,r),new R(this.value,o)}}fold(e){return this.fold_(b(),e)}fold_(e,t){const s={};return this.children.inorderTraversal((i,r)=>{s[i]=r.fold_(D(e,i),t)}),t(e,this.value,s)}findOnPath(e,t){return this.findOnPath_(e,b(),t)}findOnPath_(e,t,s){const i=this.value?s(t,this.value):!1;if(i)return i;if(E(e))return null;{const r=C(e),o=this.children.get(r);return o?o.findOnPath_(N(e),D(t,r),s):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,b(),t)}foreachOnPath_(e,t,s){if(E(e))return this;{this.value&&s(t,this.value);const i=C(e),r=this.children.get(i);return r?r.foreachOnPath_(N(e),D(t,i),s):new R(null)}}foreach(e){this.foreach_(b(),e)}foreach_(e,t){this.children.inorderTraversal((s,i)=>{i.foreach_(D(e,s),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,s)=>{s.value&&e(t,s.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z{constructor(e){this.writeTree_=e}static empty(){return new Z(new R(null))}}function lt(n,e,t){if(E(e))return new Z(new R(t));{const s=n.writeTree_.findRootMostValueAndPath(e);if(s!=null){const i=s.path;let r=s.value;const o=V(i,e);return r=r.updateChild(o,t),new Z(n.writeTree_.set(i,r))}else{const i=new R(t),r=n.writeTree_.setTree(e,i);return new Z(r)}}}function In(n,e,t){let s=n;return $(t,(i,r)=>{s=lt(s,D(e,i),r)}),s}function Ws(n,e){if(E(e))return Z.empty();{const t=n.writeTree_.setTree(e,new R(null));return new Z(t)}}function Sn(n,e){return xe(n,e)!=null}function xe(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(V(t.path,e)):null}function Us(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(P,(s,i)=>{e.push(new k(s,i))}):n.writeTree_.children.inorderTraversal((s,i)=>{i.value!=null&&e.push(new k(s,i.value))}),e}function he(n,e){if(E(e))return n;{const t=xe(n,e);return t!=null?new Z(new R(t)):new Z(n.writeTree_.subtree(e))}}function Nn(n){return n.writeTree_.isEmpty()}function je(n,e){return Wi(b(),n.writeTree_,e)}function Wi(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let s=null;return e.children.inorderTraversal((i,r)=>{i===".priority"?(_(r.value!==null,"Priority writes must always be leaf nodes"),s=r.value):t=Wi(D(n,i),r,t)}),!t.getChild(n).isEmpty()&&s!==null&&(t=t.updateChild(D(n,".priority"),s)),t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jt(n,e){return Vi(e,n)}function Pa(n,e,t,s,i){_(s>n.lastWriteId,"Stacking an older write on top of newer ones"),i===void 0&&(i=!0),n.allWrites.push({path:e,snap:t,writeId:s,visible:i}),i&&(n.visibleWrites=lt(n.visibleWrites,e,t)),n.lastWriteId=s}function Aa(n,e,t,s){_(s>n.lastWriteId,"Stacking an older merge on top of newer ones"),n.allWrites.push({path:e,children:t,writeId:s,visible:!0}),n.visibleWrites=In(n.visibleWrites,e,t),n.lastWriteId=s}function Da(n,e){for(let t=0;t<n.allWrites.length;t++){const s=n.allWrites[t];if(s.writeId===e)return s}return null}function Ma(n,e){const t=n.allWrites.findIndex(a=>a.writeId===e);_(t>=0,"removeWrite called with nonexistent writeId.");const s=n.allWrites[t];n.allWrites.splice(t,1);let i=s.visible,r=!1,o=n.allWrites.length-1;for(;i&&o>=0;){const a=n.allWrites[o];a.visible&&(o>=t&&Oa(a,s.path)?i=!1:Y(s.path,a.path)&&(r=!0)),o--}if(i){if(r)return La(n),!0;if(s.snap)n.visibleWrites=Ws(n.visibleWrites,s.path);else{const a=s.children;$(a,l=>{n.visibleWrites=Ws(n.visibleWrites,D(s.path,l))})}return!0}else return!1}function Oa(n,e){if(n.snap)return Y(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&Y(D(n.path,t),e))return!0;return!1}function La(n){n.visibleWrites=Ui(n.allWrites,Fa,b()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function Fa(n){return n.visible}function Ui(n,e,t){let s=Z.empty();for(let i=0;i<n.length;++i){const r=n[i];if(e(r)){const o=r.path;let a;if(r.snap)Y(t,o)?(a=V(t,o),s=lt(s,a,r.snap)):Y(o,t)&&(a=V(o,t),s=lt(s,b(),r.snap.getChild(a)));else if(r.children){if(Y(t,o))a=V(t,o),s=In(s,a,r.children);else if(Y(o,t))if(a=V(o,t),E(a))s=In(s,b(),r.children);else{const l=we(r.children,C(a));if(l){const c=l.getChild(N(a));s=lt(s,b(),c)}}}else throw vt("WriteRecord should have .snap or .children")}}return s}function $i(n,e,t,s,i){if(!s&&!i){const r=xe(n.visibleWrites,e);if(r!=null)return r;{const o=he(n.visibleWrites,e);if(Nn(o))return t;if(t==null&&!Sn(o,b()))return null;{const a=t||v.EMPTY_NODE;return je(o,a)}}}else{const r=he(n.visibleWrites,e);if(!i&&Nn(r))return t;if(!i&&t==null&&!Sn(r,b()))return null;{const o=function(c){return(c.visible||i)&&(!s||!~s.indexOf(c.writeId))&&(Y(c.path,e)||Y(e,c.path))},a=Ui(n.allWrites,o,e),l=t||v.EMPTY_NODE;return je(a,l)}}}function Wa(n,e,t){let s=v.EMPTY_NODE;const i=xe(n.visibleWrites,e);if(i)return i.isLeafNode()||i.forEachChild(P,(r,o)=>{s=s.updateImmediateChild(r,o)}),s;if(t){const r=he(n.visibleWrites,e);return t.forEachChild(P,(o,a)=>{const l=je(he(r,new S(o)),a);s=s.updateImmediateChild(o,l)}),Us(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}else{const r=he(n.visibleWrites,e);return Us(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}}function Ua(n,e,t,s,i){_(s||i,"Either existingEventSnap or existingServerSnap must exist");const r=D(e,t);if(Sn(n.visibleWrites,r))return null;{const o=he(n.visibleWrites,r);return Nn(o)?i.getChild(t):je(o,i.getChild(t))}}function $a(n,e,t,s){const i=D(e,t),r=xe(n.visibleWrites,i);if(r!=null)return r;if(s.isCompleteForChild(t)){const o=he(n.visibleWrites,i);return je(o,s.getNode().getImmediateChild(t))}else return null}function qa(n,e){return xe(n.visibleWrites,e)}function Va(n,e,t,s,i,r,o){let a;const l=he(n.visibleWrites,e),c=xe(l,b());if(c!=null)a=c;else if(t!=null)a=je(l,t);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const h=[],d=o.getCompare(),u=r?a.getReverseIteratorFrom(s,o):a.getIteratorFrom(s,o);let f=u.getNext();for(;f&&h.length<i;)d(f,s)!==0&&h.push(f),f=u.getNext();return h}else return[]}function Ga(){return{visibleWrites:Z.empty(),allWrites:[],lastWriteId:-1}}function $t(n,e,t,s){return $i(n.writeTree,n.treePath,e,t,s)}function Qn(n,e){return Wa(n.writeTree,n.treePath,e)}function $s(n,e,t,s){return Ua(n.writeTree,n.treePath,e,t,s)}function qt(n,e){return qa(n.writeTree,D(n.treePath,e))}function Ha(n,e,t,s,i,r){return Va(n.writeTree,n.treePath,e,t,s,i,r)}function Xn(n,e,t){return $a(n.writeTree,n.treePath,e,t)}function qi(n,e){return Vi(D(n.treePath,e),n.writeTree)}function Vi(n,e){return{treePath:n,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ba{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,s=e.childName;_(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),_(s!==".priority","Only non-priority child changes can be tracked.");const i=this.changeMap.get(s);if(i){const r=i.type;if(t==="child_added"&&r==="child_removed")this.changeMap.set(s,ft(s,e.snapshotNode,i.snapshotNode));else if(t==="child_removed"&&r==="child_added")this.changeMap.delete(s);else if(t==="child_removed"&&r==="child_changed")this.changeMap.set(s,dt(s,i.oldSnap));else if(t==="child_changed"&&r==="child_added")this.changeMap.set(s,He(s,e.snapshotNode));else if(t==="child_changed"&&r==="child_changed")this.changeMap.set(s,ft(s,e.snapshotNode,i.oldSnap));else throw vt("Illegal combination of changes: "+e+" occurred after "+i)}else this.changeMap.set(s,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ja{getCompleteChild(e){return null}getChildAfterChild(e,t,s){return null}}const Gi=new ja;class Jn{constructor(e,t,s=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=s}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const s=this.optCompleteServerCache_!=null?new pe(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Xn(this.writes_,e,s)}}getChildAfterChild(e,t,s){const i=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:be(this.viewCache_),r=Ha(this.writes_,i,t,1,s,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function za(n){return{filter:n}}function Ya(n,e){_(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),_(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function Ka(n,e,t,s,i){const r=new Ba;let o,a;if(t.type===J.OVERWRITE){const c=t;c.source.fromUser?o=xn(n,e,c.path,c.snap,s,i,r):(_(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!E(c.path),o=Vt(n,e,c.path,c.snap,s,i,a,r))}else if(t.type===J.MERGE){const c=t;c.source.fromUser?o=Xa(n,e,c.path,c.children,s,i,r):(_(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=Rn(n,e,c.path,c.children,s,i,a,r))}else if(t.type===J.ACK_USER_WRITE){const c=t;c.revert?o=el(n,e,c.path,s,i,r):o=Ja(n,e,c.path,c.affectedTree,s,i,r)}else if(t.type===J.LISTEN_COMPLETE)o=Za(n,e,t.path,s,r);else throw vt("Unknown operation type: "+t.type);const l=r.getChanges();return Qa(e,o,l),{viewCache:o,changes:l}}function Qa(n,e,t){const s=e.eventCache;if(s.isFullyInitialized()){const i=s.getNode().isLeafNode()||s.getNode().isEmpty(),r=Ut(n);(t.length>0||!n.eventCache.isFullyInitialized()||i&&!s.getNode().equals(r)||!s.getNode().getPriority().equals(r.getPriority()))&&t.push(Li(Ut(e)))}}function Hi(n,e,t,s,i,r){const o=e.eventCache;if(qt(s,t)!=null)return e;{let a,l;if(E(t))if(_(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=be(e),h=c instanceof v?c:v.EMPTY_NODE,d=Qn(s,h);a=n.filter.updateFullNode(e.eventCache.getNode(),d,r)}else{const c=$t(s,be(e));a=n.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=C(t);if(c===".priority"){_(fe(t)===1,"Can't have a priority with additional path components");const h=o.getNode();l=e.serverCache.getNode();const d=$s(s,t,h,l);d!=null?a=n.filter.updatePriority(h,d):a=o.getNode()}else{const h=N(t);let d;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const u=$s(s,t,o.getNode(),l);u!=null?d=o.getNode().getImmediateChild(c).updateChild(h,u):d=o.getNode().getImmediateChild(c)}else d=Xn(s,c,e.serverCache);d!=null?a=n.filter.updateChild(o.getNode(),c,d,h,i,r):a=o.getNode()}}return at(e,a,o.isFullyInitialized()||E(t),n.filter.filtersNodes())}}function Vt(n,e,t,s,i,r,o,a){const l=e.serverCache;let c;const h=o?n.filter:n.filter.getIndexedFilter();if(E(t))c=h.updateFullNode(l.getNode(),s,null);else if(h.filtersNodes()&&!l.isFiltered()){const f=l.getNode().updateChild(t,s);c=h.updateFullNode(l.getNode(),f,null)}else{const f=C(t);if(!l.isCompleteForPath(t)&&fe(t)>1)return e;const p=N(t),y=l.getNode().getImmediateChild(f).updateChild(p,s);f===".priority"?c=h.updatePriority(l.getNode(),y):c=h.updateChild(l.getNode(),f,y,p,Gi,null)}const d=Fi(e,c,l.isFullyInitialized()||E(t),h.filtersNodes()),u=new Jn(i,d,r);return Hi(n,d,t,i,u,a)}function xn(n,e,t,s,i,r,o){const a=e.eventCache;let l,c;const h=new Jn(i,e,r);if(E(t))c=n.filter.updateFullNode(e.eventCache.getNode(),s,o),l=at(e,c,!0,n.filter.filtersNodes());else{const d=C(t);if(d===".priority")c=n.filter.updatePriority(e.eventCache.getNode(),s),l=at(e,c,a.isFullyInitialized(),a.isFiltered());else{const u=N(t),f=a.getNode().getImmediateChild(d);let p;if(E(u))p=s;else{const m=h.getCompleteChild(d);m!=null?qn(u)===".priority"&&m.getChild(xi(u)).isEmpty()?p=m:p=m.updateChild(u,s):p=v.EMPTY_NODE}if(f.equals(p))l=e;else{const m=n.filter.updateChild(a.getNode(),d,p,u,h,o);l=at(e,m,a.isFullyInitialized(),n.filter.filtersNodes())}}}return l}function qs(n,e){return n.eventCache.isCompleteForChild(e)}function Xa(n,e,t,s,i,r,o){let a=e;return s.foreach((l,c)=>{const h=D(t,l);qs(e,C(h))&&(a=xn(n,a,h,c,i,r,o))}),s.foreach((l,c)=>{const h=D(t,l);qs(e,C(h))||(a=xn(n,a,h,c,i,r,o))}),a}function Vs(n,e,t){return t.foreach((s,i)=>{e=e.updateChild(s,i)}),e}function Rn(n,e,t,s,i,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;E(t)?c=s:c=new R(null).setTree(t,s);const h=e.serverCache.getNode();return c.children.inorderTraversal((d,u)=>{if(h.hasChild(d)){const f=e.serverCache.getNode().getImmediateChild(d),p=Vs(n,f,u);l=Vt(n,l,new S(d),p,i,r,o,a)}}),c.children.inorderTraversal((d,u)=>{const f=!e.serverCache.isCompleteForChild(d)&&u.value===null;if(!h.hasChild(d)&&!f){const p=e.serverCache.getNode().getImmediateChild(d),m=Vs(n,p,u);l=Vt(n,l,new S(d),m,i,r,o,a)}}),l}function Ja(n,e,t,s,i,r,o){if(qt(i,t)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(s.value!=null){if(E(t)&&l.isFullyInitialized()||l.isCompleteForPath(t))return Vt(n,e,t,l.getNode().getChild(t),i,r,a,o);if(E(t)){let c=new R(null);return l.getNode().forEachChild(qe,(h,d)=>{c=c.set(new S(h),d)}),Rn(n,e,t,c,i,r,a,o)}else return e}else{let c=new R(null);return s.foreach((h,d)=>{const u=D(t,h);l.isCompleteForPath(u)&&(c=c.set(h,l.getNode().getChild(u)))}),Rn(n,e,t,c,i,r,a,o)}}function Za(n,e,t,s,i){const r=e.serverCache,o=Fi(e,r.getNode(),r.isFullyInitialized()||E(t),r.isFiltered());return Hi(n,o,t,s,Gi,i)}function el(n,e,t,s,i,r){let o;if(qt(s,t)!=null)return e;{const a=new Jn(s,e,i),l=e.eventCache.getNode();let c;if(E(t)||C(t)===".priority"){let h;if(e.serverCache.isFullyInitialized())h=$t(s,be(e));else{const d=e.serverCache.getNode();_(d instanceof v,"serverChildren would be complete if leaf node"),h=Qn(s,d)}h=h,c=n.filter.updateFullNode(l,h,r)}else{const h=C(t);let d=Xn(s,h,e.serverCache);d==null&&e.serverCache.isCompleteForChild(h)&&(d=l.getImmediateChild(h)),d!=null?c=n.filter.updateChild(l,h,d,N(t),a,r):e.eventCache.getNode().hasChild(h)?c=n.filter.updateChild(l,h,v.EMPTY_NODE,N(t),a,r):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=$t(s,be(e)),o.isLeafNode()&&(c=n.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||qt(s,b())!=null,at(e,c,o,n.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tl{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const s=this.query_._queryParams,i=new Bn(s.getIndex()),r=va(s);this.processor_=za(r);const o=t.serverCache,a=t.eventCache,l=i.updateFullNode(v.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(v.EMPTY_NODE,a.getNode(),null),h=new pe(l,o.isFullyInitialized(),i.filtersNodes()),d=new pe(c,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=Xt(d,h),this.eventGenerator_=new Ia(this.query_)}get query(){return this.query_}}function nl(n){return n.viewCache_.serverCache.getNode()}function sl(n){return Ut(n.viewCache_)}function il(n,e){const t=be(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!E(e)&&!t.getImmediateChild(C(e)).isEmpty())?t.getChild(e):null}function Gs(n){return n.eventRegistrations_.length===0}function rl(n,e){n.eventRegistrations_.push(e)}function Hs(n,e,t){const s=[];if(t){_(e==null,"A cancel should cancel all event registrations.");const i=n.query._path;n.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(t,i);o&&s.push(o)})}if(e){let i=[];for(let r=0;r<n.eventRegistrations_.length;++r){const o=n.eventRegistrations_[r];if(!o.matches(e))i.push(o);else if(e.hasAnyCallback()){i=i.concat(n.eventRegistrations_.slice(r+1));break}}n.eventRegistrations_=i}else n.eventRegistrations_=[];return s}function Bs(n,e,t,s){e.type===J.MERGE&&e.source.queryId!==null&&(_(be(n.viewCache_),"We should always have a full cache before handling merges"),_(Ut(n.viewCache_),"Missing event cache, even though we have a server cache"));const i=n.viewCache_,r=Ka(n.processor_,i,e,t,s);return Ya(n.processor_,r.viewCache),_(r.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=r.viewCache,Bi(n,r.changes,r.viewCache.eventCache.getNode(),null)}function ol(n,e){const t=n.viewCache_.eventCache,s=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(P,(r,o)=>{s.push(He(r,o))}),t.isFullyInitialized()&&s.push(Li(t.getNode())),Bi(n,s,t.getNode(),e)}function Bi(n,e,t,s){const i=s?[s]:n.eventRegistrations_;return Sa(n.eventGenerator_,e,t,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Gt;class ji{constructor(){this.views=new Map}}function al(n){_(!Gt,"__referenceConstructor has already been defined"),Gt=n}function ll(){return _(Gt,"Reference.ts has not been loaded"),Gt}function cl(n){return n.views.size===0}function Zn(n,e,t,s){const i=e.source.queryId;if(i!==null){const r=n.views.get(i);return _(r!=null,"SyncTree gave us an op for an invalid query."),Bs(r,e,t,s)}else{let r=[];for(const o of n.views.values())r=r.concat(Bs(o,e,t,s));return r}}function zi(n,e,t,s,i){const r=e._queryIdentifier,o=n.views.get(r);if(!o){let a=$t(t,i?s:null),l=!1;a?l=!0:s instanceof v?(a=Qn(t,s),l=!1):(a=v.EMPTY_NODE,l=!1);const c=Xt(new pe(a,l,!1),new pe(s,i,!1));return new tl(e,c)}return o}function ul(n,e,t,s,i,r){const o=zi(n,e,s,i,r);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),rl(o,t),ol(o,t)}function hl(n,e,t,s){const i=e._queryIdentifier,r=[];let o=[];const a=_e(n);if(i==="default")for(const[l,c]of n.views.entries())o=o.concat(Hs(c,t,s)),Gs(c)&&(n.views.delete(l),c.query._queryParams.loadsAllData()||r.push(c.query));else{const l=n.views.get(i);l&&(o=o.concat(Hs(l,t,s)),Gs(l)&&(n.views.delete(i),l.query._queryParams.loadsAllData()||r.push(l.query)))}return a&&!_e(n)&&r.push(new(ll())(e._repo,e._path)),{removed:r,events:o}}function Yi(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function de(n,e){let t=null;for(const s of n.views.values())t=t||il(s,e);return t}function Ki(n,e){if(e._queryParams.loadsAllData())return Zt(n);{const s=e._queryIdentifier;return n.views.get(s)}}function Qi(n,e){return Ki(n,e)!=null}function _e(n){return Zt(n)!=null}function Zt(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ht;function dl(n){_(!Ht,"__referenceConstructor has already been defined"),Ht=n}function fl(){return _(Ht,"Reference.ts has not been loaded"),Ht}let pl=1;class js{constructor(e){this.listenProvider_=e,this.syncPointTree_=new R(null),this.pendingWriteTree_=Ga(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function es(n,e,t,s,i){return Pa(n.pendingWriteTree_,e,t,s,i),i?Xe(n,new Te(zn(),e,t)):[]}function _l(n,e,t,s){Aa(n.pendingWriteTree_,e,t,s);const i=R.fromObject(t);return Xe(n,new Be(zn(),e,i))}function ce(n,e,t=!1){const s=Da(n.pendingWriteTree_,e);if(Ma(n.pendingWriteTree_,e)){let r=new R(null);return s.snap!=null?r=r.set(b(),!0):$(s.children,o=>{r=r.set(new S(o),!0)}),Xe(n,new Wt(s.path,r,t))}else return[]}function Et(n,e,t){return Xe(n,new Te(Yn(),e,t))}function ml(n,e,t){const s=R.fromObject(t);return Xe(n,new Be(Yn(),e,s))}function gl(n,e){return Xe(n,new _t(Yn(),e))}function vl(n,e,t){const s=ts(n,t);if(s){const i=ns(s),r=i.path,o=i.queryId,a=V(r,e),l=new _t(Kn(o),a);return ss(n,r,l)}else return[]}function Bt(n,e,t,s,i=!1){const r=e._path,o=n.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||Qi(o,e))){const l=hl(o,e,t,s);cl(o)&&(n.syncPointTree_=n.syncPointTree_.remove(r));const c=l.removed;if(a=l.events,!i){const h=c.findIndex(u=>u._queryParams.loadsAllData())!==-1,d=n.syncPointTree_.findOnPath(r,(u,f)=>_e(f));if(h&&!d){const u=n.syncPointTree_.subtree(r);if(!u.isEmpty()){const f=wl(u);for(let p=0;p<f.length;++p){const m=f[p],y=m.query,T=er(n,m);n.listenProvider_.startListening(ct(y),mt(n,y),T.hashFn,T.onComplete)}}}!d&&c.length>0&&!s&&(h?n.listenProvider_.stopListening(ct(e),null):c.forEach(u=>{const f=n.queryToTagMap.get(tn(u));n.listenProvider_.stopListening(ct(u),f)}))}El(n,c)}return a}function Xi(n,e,t,s){const i=ts(n,s);if(i!=null){const r=ns(i),o=r.path,a=r.queryId,l=V(o,e),c=new Te(Kn(a),l,t);return ss(n,o,c)}else return[]}function yl(n,e,t,s){const i=ts(n,s);if(i){const r=ns(i),o=r.path,a=r.queryId,l=V(o,e),c=R.fromObject(t),h=new Be(Kn(a),l,c);return ss(n,o,h)}else return[]}function Pn(n,e,t,s=!1){const i=e._path;let r=null,o=!1;n.syncPointTree_.foreachOnPath(i,(u,f)=>{const p=V(u,i);r=r||de(f,p),o=o||_e(f)});let a=n.syncPointTree_.get(i);a?(o=o||_e(a),r=r||de(a,b())):(a=new ji,n.syncPointTree_=n.syncPointTree_.set(i,a));let l;r!=null?l=!0:(l=!1,r=v.EMPTY_NODE,n.syncPointTree_.subtree(i).foreachChild((f,p)=>{const m=de(p,b());m&&(r=r.updateImmediateChild(f,m))}));const c=Qi(a,e);if(!c&&!e._queryParams.loadsAllData()){const u=tn(e);_(!n.queryToTagMap.has(u),"View does not exist, but we have a tag");const f=kl();n.queryToTagMap.set(u,f),n.tagToQueryMap.set(f,u)}const h=Jt(n.pendingWriteTree_,i);let d=ul(a,e,t,h,r,l);if(!c&&!o&&!s){const u=Ki(a,e);d=d.concat(Tl(n,e,u))}return d}function en(n,e,t){const i=n.pendingWriteTree_,r=n.syncPointTree_.findOnPath(e,(o,a)=>{const l=V(o,e),c=de(a,l);if(c)return c});return $i(i,e,r,t,!0)}function Cl(n,e){const t=e._path;let s=null;n.syncPointTree_.foreachOnPath(t,(c,h)=>{const d=V(c,t);s=s||de(h,d)});let i=n.syncPointTree_.get(t);i?s=s||de(i,b()):(i=new ji,n.syncPointTree_=n.syncPointTree_.set(t,i));const r=s!=null,o=r?new pe(s,!0,!1):null,a=Jt(n.pendingWriteTree_,e._path),l=zi(i,e,a,r?o.getNode():v.EMPTY_NODE,r);return sl(l)}function Xe(n,e){return Ji(e,n.syncPointTree_,null,Jt(n.pendingWriteTree_,b()))}function Ji(n,e,t,s){if(E(n.path))return Zi(n,e,t,s);{const i=e.get(b());t==null&&i!=null&&(t=de(i,b()));let r=[];const o=C(n.path),a=n.operationForChild(o),l=e.children.get(o);if(l&&a){const c=t?t.getImmediateChild(o):null,h=qi(s,o);r=r.concat(Ji(a,l,c,h))}return i&&(r=r.concat(Zn(i,n,s,t))),r}}function Zi(n,e,t,s){const i=e.get(b());t==null&&i!=null&&(t=de(i,b()));let r=[];return e.children.inorderTraversal((o,a)=>{const l=t?t.getImmediateChild(o):null,c=qi(s,o),h=n.operationForChild(o);h&&(r=r.concat(Zi(h,a,l,c)))}),i&&(r=r.concat(Zn(i,n,s,t))),r}function er(n,e){const t=e.query,s=mt(n,t);return{hashFn:()=>(nl(e)||v.EMPTY_NODE).hash(),onComplete:i=>{if(i==="ok")return s?vl(n,t._path,s):gl(n,t._path);{const r=mo(i,t);return Bt(n,t,null,r)}}}}function mt(n,e){const t=tn(e);return n.queryToTagMap.get(t)}function tn(n){return n._path.toString()+"$"+n._queryIdentifier}function ts(n,e){return n.tagToQueryMap.get(e)}function ns(n){const e=n.indexOf("$");return _(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new S(n.substr(0,e))}}function ss(n,e,t){const s=n.syncPointTree_.get(e);_(s,"Missing sync point for query tag that we're tracking");const i=Jt(n.pendingWriteTree_,e);return Zn(s,t,i,null)}function wl(n){return n.fold((e,t,s)=>{if(t&&_e(t))return[Zt(t)];{let i=[];return t&&(i=Yi(t)),$(s,(r,o)=>{i=i.concat(o)}),i}})}function ct(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(fl())(n._repo,n._path):n}function El(n,e){for(let t=0;t<e.length;++t){const s=e[t];if(!s._queryParams.loadsAllData()){const i=tn(s),r=n.queryToTagMap.get(i);n.queryToTagMap.delete(i),n.tagToQueryMap.delete(r)}}}function kl(){return pl++}function Tl(n,e,t){const s=e._path,i=mt(n,e),r=er(n,t),o=n.listenProvider_.startListening(ct(e),i,r.hashFn,r.onComplete),a=n.syncPointTree_.subtree(s);if(i)_(!_e(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,h,d)=>{if(!E(c)&&h&&_e(h))return[Zt(h).query];{let u=[];return h&&(u=u.concat(Yi(h).map(f=>f.query))),$(d,(f,p)=>{u=u.concat(p)}),u}});for(let c=0;c<l.length;++c){const h=l[c];n.listenProvider_.stopListening(ct(h),mt(n,h))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class is{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new is(t)}node(){return this.node_}}class rs{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=D(this.path_,e);return new rs(this.syncTree_,t)}node(){return en(this.syncTree_,this.path_)}}const bl=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},zs=function(n,e,t){if(!n||typeof n!="object")return n;if(_(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return Il(n[".sv"],e,t);if(typeof n[".sv"]=="object")return Sl(n[".sv"],e);_(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},Il=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:_(!1,"Unexpected server value: "+n)}},Sl=function(n,e,t){n.hasOwnProperty("increment")||_(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const s=n.increment;typeof s!="number"&&_(!1,"Unexpected increment value: "+s);const i=e.node();if(_(i!==null&&typeof i<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return s;const o=i.getValue();return typeof o!="number"?s:o+s},tr=function(n,e,t,s){return as(e,new rs(t,n),s)},os=function(n,e,t){return as(n,new is(e),t)};function as(n,e,t){const s=n.getPriority().val(),i=zs(s,e.getImmediateChild(".priority"),t);let r;if(n.isLeafNode()){const o=n,a=zs(o.getValue(),e,t);return a!==o.getValue()||i!==o.getPriority().val()?new F(a,A(i)):n}else{const o=n;return r=o,i!==o.getPriority().val()&&(r=r.updatePriority(new F(i))),o.forEachChild(P,(a,l)=>{const c=as(l,e.getImmediateChild(a),t);c!==l&&(r=r.updateImmediateChild(a,c))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ls{constructor(e="",t=null,s={children:{},childCount:0}){this.name=e,this.parent=t,this.node=s}}function nn(n,e){let t=e instanceof S?e:new S(e),s=n,i=C(t);for(;i!==null;){const r=we(s.node.children,i)||{children:{},childCount:0};s=new ls(i,s,r),t=N(t),i=C(t)}return s}function Re(n){return n.node.value}function cs(n,e){n.node.value=e,An(n)}function nr(n){return n.node.childCount>0}function Nl(n){return Re(n)===void 0&&!nr(n)}function sn(n,e){$(n.node.children,(t,s)=>{e(new ls(t,n,s))})}function sr(n,e,t,s){t&&!s&&e(n),sn(n,i=>{sr(i,e,!0,s)}),t&&s&&e(n)}function xl(n,e,t){let s=n.parent;for(;s!==null;){if(e(s))return!0;s=s.parent}return!1}function kt(n){return new S(n.parent===null?n.name:kt(n.parent)+"/"+n.name)}function An(n){n.parent!==null&&Rl(n.parent,n.name,n)}function Rl(n,e,t){const s=Nl(t),i=ee(n.node.children,e);s&&i?(delete n.node.children[e],n.node.childCount--,An(n)):!s&&!i&&(n.node.children[e]=t.node,n.node.childCount++,An(n))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pl=/[\[\].#$\/\u0000-\u001F\u007F]/,Al=/[\[\].#$\u0000-\u001F\u007F]/,gn=10*1024*1024,us=function(n){return typeof n=="string"&&n.length!==0&&!Pl.test(n)},ir=function(n){return typeof n=="string"&&n.length!==0&&!Al.test(n)},Dl=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),ir(n)},hs=function(n){return n===null||typeof n=="string"||typeof n=="number"&&!Kt(n)||n&&typeof n=="object"&&ee(n,".sv")},jt=function(n,e,t,s){s&&e===void 0||Tt(Ve(n,"value"),e,t)},Tt=function(n,e,t){const s=t instanceof S?new Qo(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+ve(s));if(typeof e=="function")throw new Error(n+"contains a function "+ve(s)+" with contents = "+e.toString());if(Kt(e))throw new Error(n+"contains "+e.toString()+" "+ve(s));if(typeof e=="string"&&e.length>gn/3&&Yt(e)>gn)throw new Error(n+"contains a string greater than "+gn+" utf8 bytes "+ve(s)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let i=!1,r=!1;if($(e,(o,a)=>{if(o===".value")i=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!us(o)))throw new Error(n+" contains an invalid key ("+o+") "+ve(s)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);Xo(s,o),Tt(n,a,s),Jo(s)}),i&&r)throw new Error(n+' contains ".value" child '+ve(s)+" in addition to actual children.")}},Ml=function(n,e){let t,s;for(t=0;t<e.length;t++){s=e[t];const r=ht(s);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!us(r[o]))throw new Error(n+"contains an invalid key ("+r[o]+") in path "+s.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(Ko);let i=null;for(t=0;t<e.length;t++){if(s=e[t],i!==null&&Y(i,s))throw new Error(n+"contains a path "+i.toString()+" that is ancestor of another path "+s.toString());i=s}},rr=function(n,e,t,s){const i=Ve(n,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(i+" must be an object containing the children to replace.");const r=[];$(e,(o,a)=>{const l=new S(o);if(Tt(i,a,D(t,l)),qn(l)===".priority"&&!hs(a))throw new Error(i+"contains an invalid value for '"+l.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(l)}),Ml(i,r)},Ol=function(n,e,t){if(Kt(e))throw new Error(Ve(n,"priority")+"is "+e.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!hs(e))throw new Error(Ve(n,"priority")+"must be a valid Firebase priority (a string, finite number, server value, or null).")},or=function(n,e,t,s){if(!ir(t))throw new Error(Ve(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},Ll=function(n,e,t,s){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),or(n,e,t)},ue=function(n,e){if(C(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},Fl=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!us(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!Dl(t))throw new Error(Ve(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wl{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function rn(n,e){let t=null;for(let s=0;s<e.length;s++){const i=e[s],r=i.getPath();t!==null&&!Vn(r,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:r}),t.events.push(i)}t&&n.eventLists_.push(t)}function ar(n,e,t){rn(n,t),lr(n,s=>Vn(s,e))}function j(n,e,t){rn(n,t),lr(n,s=>Y(s,e)||Y(e,s))}function lr(n,e){n.recursionDepth_++;let t=!0;for(let s=0;s<n.eventLists_.length;s++){const i=n.eventLists_[s];if(i){const r=i.path;e(r)?(Ul(n.eventLists_[s]),n.eventLists_[s]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function Ul(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const s=t.getEventRunner();rt&&U("event: "+t.toString()),Ke(s)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $l="repo_interrupt",ql=25;class Vl{constructor(e,t,s,i){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=s,this.appCheckProvider_=i,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new Wl,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Ft(),this.transactionQueueTree_=new ls,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function Gl(n,e,t){if(n.stats_=Un(n.repoInfo_),n.forceRestClient_||Co())n.server_=new Lt(n.repoInfo_,(s,i,r,o)=>{Ys(n,s,i,r,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>Ks(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{L(t)}catch(s){throw new Error("Invalid authOverride provided: "+s)}}n.persistentConnection_=new re(n.repoInfo_,e,(s,i,r,o)=>{Ys(n,s,i,r,o)},s=>{Ks(n,s)},s=>{Hl(n,s)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(s=>{n.server_.refreshAuthToken(s)}),n.appCheckProvider_.addTokenChangeListener(s=>{n.server_.refreshAppCheckToken(s.token)}),n.statsReporter_=bo(n.repoInfo_,()=>new ba(n.stats_,n.server_)),n.infoData_=new Ca,n.infoSyncTree_=new js({startListening:(s,i,r,o)=>{let a=[];const l=n.infoData_.getNode(s._path);return l.isEmpty()||(a=Et(n.infoSyncTree_,s._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),ds(n,"connected",!1),n.serverSyncTree_=new js({startListening:(s,i,r,o)=>(n.server_.listen(s,r,i,(a,l)=>{const c=o(a,l);j(n.eventQueue_,s._path,c)}),[]),stopListening:(s,i)=>{n.server_.unlisten(s,i)}})}function cr(n){const t=n.infoData_.getNode(new S(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function bt(n){return bl({timestamp:cr(n)})}function Ys(n,e,t,s,i){n.dataUpdateCount++;const r=new S(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(i)if(s){const l=At(t,c=>A(c));o=yl(n.serverSyncTree_,r,l,i)}else{const l=A(t);o=Xi(n.serverSyncTree_,r,l,i)}else if(s){const l=At(t,c=>A(c));o=ml(n.serverSyncTree_,r,l)}else{const l=A(t);o=Et(n.serverSyncTree_,r,l)}let a=r;o.length>0&&(a=ze(n,r)),j(n.eventQueue_,a,o)}function Ks(n,e){ds(n,"connected",e),e===!1&&Yl(n)}function Hl(n,e){$(e,(t,s)=>{ds(n,t,s)})}function ds(n,e,t){const s=new S("/.info/"+e),i=A(t);n.infoData_.updateSnapshot(s,i);const r=Et(n.infoSyncTree_,s,i);j(n.eventQueue_,s,r)}function on(n){return n.nextWriteId_++}function Bl(n,e,t){const s=Cl(n.serverSyncTree_,e);return s!=null?Promise.resolve(s):n.server_.get(e).then(i=>{const r=A(i).withIndex(e._queryParams.getIndex());Pn(n.serverSyncTree_,e,t,!0);let o;if(e._queryParams.loadsAllData())o=Et(n.serverSyncTree_,e._path,r);else{const a=mt(n.serverSyncTree_,e);o=Xi(n.serverSyncTree_,e._path,r,a)}return j(n.eventQueue_,e._path,o),Bt(n.serverSyncTree_,e,t,null,!0),r},i=>(Je(n,"get for query "+L(e)+" failed: "+i),Promise.reject(new Error(i))))}function jl(n,e,t,s,i){Je(n,"set",{path:e.toString(),value:t,priority:s});const r=bt(n),o=A(t,s),a=en(n.serverSyncTree_,e),l=os(o,a,r),c=on(n),h=es(n.serverSyncTree_,e,l,c,!0);rn(n.eventQueue_,h),n.server_.put(e.toString(),o.val(!0),(u,f)=>{const p=u==="ok";p||G("set at "+e+" failed: "+u);const m=ce(n.serverSyncTree_,c,!p);j(n.eventQueue_,e,m),me(n,i,u,f)});const d=ps(n,e);ze(n,d),j(n.eventQueue_,d,[])}function zl(n,e,t,s){Je(n,"update",{path:e.toString(),value:t});let i=!0;const r=bt(n),o={};if($(t,(a,l)=>{i=!1,o[a]=tr(D(e,a),A(l),n.serverSyncTree_,r)}),i)U("update() called with empty data.  Don't do anything."),me(n,s,"ok",void 0);else{const a=on(n),l=_l(n.serverSyncTree_,e,o,a);rn(n.eventQueue_,l),n.server_.merge(e.toString(),t,(c,h)=>{const d=c==="ok";d||G("update at "+e+" failed: "+c);const u=ce(n.serverSyncTree_,a,!d),f=u.length>0?ze(n,e):e;j(n.eventQueue_,f,u),me(n,s,c,h)}),$(t,c=>{const h=ps(n,D(e,c));ze(n,h)}),j(n.eventQueue_,e,[])}}function Yl(n){Je(n,"onDisconnectEvents");const e=bt(n),t=Ft();bn(n.onDisconnect_,b(),(i,r)=>{const o=tr(i,r,n.serverSyncTree_,e);Qe(t,i,o)});let s=[];bn(t,b(),(i,r)=>{s=s.concat(Et(n.serverSyncTree_,i,r));const o=ps(n,i);ze(n,o)}),n.onDisconnect_=Ft(),j(n.eventQueue_,b(),s)}function Kl(n,e,t){n.server_.onDisconnectCancel(e.toString(),(s,i)=>{s==="ok"&&Tn(n.onDisconnect_,e),me(n,t,s,i)})}function Qs(n,e,t,s){const i=A(t);n.server_.onDisconnectPut(e.toString(),i.val(!0),(r,o)=>{r==="ok"&&Qe(n.onDisconnect_,e,i),me(n,s,r,o)})}function Ql(n,e,t,s,i){const r=A(t,s);n.server_.onDisconnectPut(e.toString(),r.val(!0),(o,a)=>{o==="ok"&&Qe(n.onDisconnect_,e,r),me(n,i,o,a)})}function Xl(n,e,t,s){if(Cn(t)){U("onDisconnect().update() called with empty data.  Don't do anything."),me(n,s,"ok",void 0);return}n.server_.onDisconnectMerge(e.toString(),t,(i,r)=>{i==="ok"&&$(t,(o,a)=>{const l=A(a);Qe(n.onDisconnect_,D(e,o),l)}),me(n,s,i,r)})}function Jl(n,e,t){let s;C(e._path)===".info"?s=Pn(n.infoSyncTree_,e,t):s=Pn(n.serverSyncTree_,e,t),ar(n.eventQueue_,e._path,s)}function Xs(n,e,t){let s;C(e._path)===".info"?s=Bt(n.infoSyncTree_,e,t):s=Bt(n.serverSyncTree_,e,t),ar(n.eventQueue_,e._path,s)}function Zl(n){n.persistentConnection_&&n.persistentConnection_.interrupt($l)}function Je(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),U(t,...e)}function me(n,e,t,s){e&&Ke(()=>{if(t==="ok")e(null);else{const i=(t||"error").toUpperCase();let r=i;s&&(r+=": "+s);const o=new Error(r);o.code=i,e(o)}})}function ec(n,e,t,s,i,r){Je(n,"transaction on "+e);const o={path:e,update:t,onComplete:s,status:null,order:ai(),applyLocally:r,retryCount:0,unwatcher:i,abortReason:null,currentWriteId:null,currentInputSnapshot:null,currentOutputSnapshotRaw:null,currentOutputSnapshotResolved:null},a=fs(n,e,void 0);o.currentInputSnapshot=a;const l=o.update(a.val());if(l===void 0)o.unwatcher(),o.currentOutputSnapshotRaw=null,o.currentOutputSnapshotResolved=null,o.onComplete&&o.onComplete(null,!1,o.currentInputSnapshot);else{Tt("transaction failed: Data returned ",l,o.path),o.status=0;const c=nn(n.transactionQueueTree_,e),h=Re(c)||[];h.push(o),cs(c,h);let d;typeof l=="object"&&l!==null&&ee(l,".priority")?(d=we(l,".priority"),_(hs(d),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):d=(en(n.serverSyncTree_,e)||v.EMPTY_NODE).getPriority().val();const u=bt(n),f=A(l,d),p=os(f,a,u);o.currentOutputSnapshotRaw=f,o.currentOutputSnapshotResolved=p,o.currentWriteId=on(n);const m=es(n.serverSyncTree_,e,p,o.currentWriteId,o.applyLocally);j(n.eventQueue_,e,m),an(n,n.transactionQueueTree_)}}function fs(n,e,t){return en(n.serverSyncTree_,e,t)||v.EMPTY_NODE}function an(n,e=n.transactionQueueTree_){if(e||ln(n,e),Re(e)){const t=hr(n,e);_(t.length>0,"Sending zero length transaction queue"),t.every(i=>i.status===0)&&tc(n,kt(e),t)}else nr(e)&&sn(e,t=>{an(n,t)})}function tc(n,e,t){const s=t.map(c=>c.currentWriteId),i=fs(n,e,s);let r=i;const o=i.hash();for(let c=0;c<t.length;c++){const h=t[c];_(h.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),h.status=1,h.retryCount++;const d=V(e,h.path);r=r.updateChild(d,h.currentOutputSnapshotRaw)}const a=r.val(!0),l=e;n.server_.put(l.toString(),a,c=>{Je(n,"transaction put response",{path:l.toString(),status:c});let h=[];if(c==="ok"){const d=[];for(let u=0;u<t.length;u++)t[u].status=2,h=h.concat(ce(n.serverSyncTree_,t[u].currentWriteId)),t[u].onComplete&&d.push(()=>t[u].onComplete(null,!0,t[u].currentOutputSnapshotResolved)),t[u].unwatcher();ln(n,nn(n.transactionQueueTree_,e)),an(n,n.transactionQueueTree_),j(n.eventQueue_,e,h);for(let u=0;u<d.length;u++)Ke(d[u])}else{if(c==="datastale")for(let d=0;d<t.length;d++)t[d].status===3?t[d].status=4:t[d].status=0;else{G("transaction at "+l.toString()+" failed: "+c);for(let d=0;d<t.length;d++)t[d].status=4,t[d].abortReason=c}ze(n,e)}},o)}function ze(n,e){const t=ur(n,e),s=kt(t),i=hr(n,t);return nc(n,i,s),s}function nc(n,e,t){if(e.length===0)return;const s=[];let i=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=V(t,l.path);let h=!1,d;if(_(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)h=!0,d=l.abortReason,i=i.concat(ce(n.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=ql)h=!0,d="maxretry",i=i.concat(ce(n.serverSyncTree_,l.currentWriteId,!0));else{const u=fs(n,l.path,o);l.currentInputSnapshot=u;const f=e[a].update(u.val());if(f!==void 0){Tt("transaction failed: Data returned ",f,l.path);let p=A(f);typeof f=="object"&&f!=null&&ee(f,".priority")||(p=p.updatePriority(u.getPriority()));const y=l.currentWriteId,T=bt(n),I=os(p,u,T);l.currentOutputSnapshotRaw=p,l.currentOutputSnapshotResolved=I,l.currentWriteId=on(n),o.splice(o.indexOf(y),1),i=i.concat(es(n.serverSyncTree_,l.path,I,l.currentWriteId,l.applyLocally)),i=i.concat(ce(n.serverSyncTree_,y,!0))}else h=!0,d="nodata",i=i.concat(ce(n.serverSyncTree_,l.currentWriteId,!0))}j(n.eventQueue_,t,i),i=[],h&&(e[a].status=2,(function(u){setTimeout(u,Math.floor(0))})(e[a].unwatcher),e[a].onComplete&&(d==="nodata"?s.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):s.push(()=>e[a].onComplete(new Error(d),!1,null))))}ln(n,n.transactionQueueTree_);for(let a=0;a<s.length;a++)Ke(s[a]);an(n,n.transactionQueueTree_)}function ur(n,e){let t,s=n.transactionQueueTree_;for(t=C(e);t!==null&&Re(s)===void 0;)s=nn(s,t),e=N(e),t=C(e);return s}function hr(n,e){const t=[];return dr(n,e,t),t.sort((s,i)=>s.order-i.order),t}function dr(n,e,t){const s=Re(e);if(s)for(let i=0;i<s.length;i++)t.push(s[i]);sn(e,i=>{dr(n,i,t)})}function ln(n,e){const t=Re(e);if(t){let s=0;for(let i=0;i<t.length;i++)t[i].status!==2&&(t[s]=t[i],s++);t.length=s,cs(e,t.length>0?t:void 0)}sn(e,s=>{ln(n,s)})}function ps(n,e){const t=kt(ur(n,e)),s=nn(n.transactionQueueTree_,e);return xl(s,i=>{vn(n,i)}),vn(n,s),sr(s,i=>{vn(n,i)}),t}function vn(n,e){const t=Re(e);if(t){const s=[];let i=[],r=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(_(r===o-1,"All SENT items should be at beginning of queue."),r=o,t[o].status=3,t[o].abortReason="set"):(_(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),i=i.concat(ce(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&s.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?cs(e,void 0):t.length=r+1,j(n.eventQueue_,kt(e),i);for(let o=0;o<s.length;o++)Ke(s[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sc(n){let e="";const t=n.split("/");for(let s=0;s<t.length;s++)if(t[s].length>0){let i=t[s];try{i=decodeURIComponent(i.replace(/\+/g," "))}catch{}e+="/"+i}return e}function ic(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const s=t.split("=");s.length===2?e[decodeURIComponent(s[0])]=decodeURIComponent(s[1]):G(`Invalid query segment '${t}' in query '${n}'`)}return e}const Js=function(n,e){const t=rc(n),s=t.namespace;t.domain==="firebase.com"&&ae(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!s||s==="undefined")&&t.domain!=="localhost"&&ae("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||uo();const i=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new Ci(t.host,t.secure,s,i,e,"",s!==t.subdomain),path:new S(t.pathString)}},rc=function(n){let e="",t="",s="",i="",r="",o=!0,a="https",l=443;if(typeof n=="string"){let c=n.indexOf("//");c>=0&&(a=n.substring(0,c-1),n=n.substring(c+2));let h=n.indexOf("/");h===-1&&(h=n.length);let d=n.indexOf("?");d===-1&&(d=n.length),e=n.substring(0,Math.min(h,d)),h<d&&(i=sc(n.substring(h,d)));const u=ic(n.substring(Math.min(n.length,d)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const f=e.slice(0,c);if(f.toLowerCase()==="localhost")t="localhost";else if(f.split(".").length<=2)t=f;else{const p=e.indexOf(".");s=e.substring(0,p).toLowerCase(),t=e.substring(p+1),r=s}"ns"in u&&(r=u.ns)}return{host:e,port:l,domain:t,subdomain:s,secure:o,scheme:a,pathString:i,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zs="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",oc=(function(){let n=0;const e=[];return function(t){const s=t===n;n=t;let i;const r=new Array(8);for(i=7;i>=0;i--)r[i]=Zs.charAt(t%64),t=Math.floor(t/64);_(t===0,"Cannot push at time == 0");let o=r.join("");if(s){for(i=11;i>=0&&e[i]===63;i--)e[i]=0;e[i]++}else for(i=0;i<12;i++)e[i]=Math.floor(Math.random()*64);for(i=0;i<12;i++)o+=Zs.charAt(e[i]);return _(o.length===20,"nextPushId: Length should be 20."),o}})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fr{constructor(e,t,s,i){this.eventType=e,this.eventRegistration=t,this.snapshot=s,this.prevName=i}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+L(this.snapshot.exportVal())}}class pr{constructor(e,t,s){this.eventRegistration=e,this.error=t,this.path=s}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _r{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return _(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ac{constructor(e,t){this._repo=e,this._path=t}cancel(){const e=new ne;return Kl(this._repo,this._path,e.wrapCallback(()=>{})),e.promise}remove(){ue("OnDisconnect.remove",this._path);const e=new ne;return Qs(this._repo,this._path,null,e.wrapCallback(()=>{})),e.promise}set(e){ue("OnDisconnect.set",this._path),jt("OnDisconnect.set",e,this._path,!1);const t=new ne;return Qs(this._repo,this._path,e,t.wrapCallback(()=>{})),t.promise}setWithPriority(e,t){ue("OnDisconnect.setWithPriority",this._path),jt("OnDisconnect.setWithPriority",e,this._path,!1),Ol("OnDisconnect.setWithPriority",t);const s=new ne;return Ql(this._repo,this._path,e,t,s.wrapCallback(()=>{})),s.promise}update(e){ue("OnDisconnect.update",this._path),rr("OnDisconnect.update",e,this._path);const t=new ne;return Xl(this._repo,this._path,e,t.wrapCallback(()=>{})),t.promise}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cn{constructor(e,t,s,i){this._repo=e,this._path=t,this._queryParams=s,this._orderByCalled=i}get key(){return E(this._path)?null:qn(this._path)}get ref(){return new te(this._repo,this._path)}get _queryIdentifier(){const e=Ls(this._queryParams),t=Fn(e);return t==="{}"?"default":t}get _queryObject(){return Ls(this._queryParams)}isEqual(e){if(e=se(e),!(e instanceof cn))return!1;const t=this._repo===e._repo,s=Vn(this._path,e._path),i=this._queryIdentifier===e._queryIdentifier;return t&&s&&i}toJSON(){return this.toString()}toString(){return this._repo.toString()+Yo(this._path)}}class te extends cn{constructor(e,t){super(e,t,new jn,!1)}get parent(){const e=xi(this._path);return e===null?null:new te(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class Ie{constructor(e,t,s){this._node=e,this.ref=t,this._index=s}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new S(e),s=Ye(this.ref,e);return new Ie(this._node.getChild(t),s,P)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(s,i)=>e(new Ie(i,Ye(this.ref,s),P)))}hasChild(e){const t=new S(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function It(n,e){return n=se(n),n._checkNotDeleted("ref"),e!==void 0?Ye(n._root,e):n._root}function Ye(n,e){return n=se(n),C(n._path)===null?Ll("child","path",e):or("child","path",e),new te(n._repo,D(n._path,e))}function zt(n){return n=se(n),new ac(n._repo,n._path)}function mr(n,e){n=se(n),ue("push",n._path),jt("push",e,n._path,!0);const t=cr(n._repo),s=oc(t),i=Ye(n,s),r=Ye(n,s);let o;return o=Promise.resolve(r),i.then=o.then.bind(o),i.catch=o.then.bind(o,void 0),i}function gt(n){return ue("remove",n._path),oe(n,null)}function oe(n,e){n=se(n),ue("set",n._path),jt("set",e,n._path,!1);const t=new ne;return jl(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function gr(n,e){rr("update",e,n._path);const t=new ne;return zl(n._repo,n._path,e,t.wrapCallback(()=>{})),t.promise}function Ce(n){n=se(n);const e=new _r(()=>{}),t=new un(e);return Bl(n._repo,n,t).then(s=>new Ie(s,new te(n._repo,n._path),n._queryParams.getIndex()))}class un{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const s=t._queryParams.getIndex();return new fr("value",this,new Ie(e.snapshotNode,new te(t._repo,t._path),s))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new pr(this,e,t):null}matches(e){return e instanceof un?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class _s{constructor(e,t){this.eventType=e,this.callbackContext=t}respondsTo(e){let t=e==="children_added"?"child_added":e;return t=t==="children_removed"?"child_removed":t,this.eventType===t}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new pr(this,e,t):null}createEvent(e,t){_(e.childName!=null,"Child events should have a childName.");const s=Ye(new te(t._repo,t._path),e.childName),i=t._queryParams.getIndex();return new fr(e.type,this,new Ie(e.snapshotNode,s,i),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof _s?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function lc(n,e,t,s,i){let r;if(typeof s=="object"&&(r=void 0,i=s),typeof s=="function"&&(r=s),i&&i.onlyOnce){const l=t,c=(h,d)=>{Xs(n._repo,n,a),l(h,d)};c.userCallback=t.userCallback,c.context=t.context,t=c}const o=new _r(t,r||void 0),a=e==="value"?new un(o):new _s(e,o);return Jl(n._repo,n,a),()=>Xs(n._repo,n,a)}function K(n,e,t,s){return lc(n,"value",e,t,s)}class cc{}class uc extends cc{constructor(e){super(),this._limit=e,this.type="limitToLast"}_apply(e){if(e._queryParams.hasLimit())throw new Error("limitToLast: Limit was already set (by another call to limitToFirst or limitToLast).");return new cn(e._repo,e._path,ya(e._queryParams,this._limit),e._orderByCalled)}}function hc(n){if(Math.floor(n)!==n||n<=0)throw new Error("limitToLast: First argument must be a positive integer.");return new uc(n)}function dc(n,...e){let t=se(n);for(const s of e)t=s._apply(t);return t}al(te);dl(te);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fc="FIREBASE_DATABASE_EMULATOR_HOST",Dn={};let pc=!1;function _c(n,e,t,s){const i=e.lastIndexOf(":"),r=e.substring(0,i),o=si(r);n.repoInfo_=new Ci(e,o,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0,t),s&&(n.authTokenProvider_=s)}function mc(n,e,t,s,i){let r=s||n.options.databaseURL;r===void 0&&(n.options.projectId||ae("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),U("Using default host for project ",n.options.projectId),r=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=Js(r,i),a=o.repoInfo,l;typeof process<"u"&&vs&&(l=vs[fc]),l?(r=`http://${l}?ns=${a.namespace}`,o=Js(r,i),a=o.repoInfo):o.repoInfo.secure;const c=new Eo(n.name,n.options,e);Fl("Invalid Firebase Database URL",o),E(o.path)||ae("Database URL must point to the root of a Firebase Database (not including a child path).");const h=vc(a,n,c,new wo(n,t));return new yc(h,n)}function gc(n,e){const t=Dn[e];(!t||t[n.key]!==n)&&ae(`Database ${e}(${n.repoInfo_}) has already been deleted.`),Zl(n),delete t[n.key]}function vc(n,e,t,s){let i=Dn[e.name];i||(i={},Dn[e.name]=i);let r=i[n.toURLString()];return r&&ae("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new Vl(n,pc,t,s),i[n.toURLString()]=r,r}class yc{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(Gl(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new te(this._repo,b())),this._rootInternal}_delete(){return this._rootInternal!==null&&(gc(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&ae("Cannot call "+e+" on a deleted database.")}}function Cc(n=Mr(),e){const t=Ar(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){const s=Dr("database");s&&vr(t,...s)}return t}function vr(n,e,t,s={}){n=se(n),n._checkNotDeleted("useEmulator");const i=`${e}:${t}`,r=n._repoInternal;if(n._instanceStarted){if(i===n._repoInternal.repoInfo_.host&&Or(s,r.repoInfo_.emulatorOptions))return;ae("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)s.mockUserToken&&ae('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new Pt(Pt.OWNER);else if(s.mockUserToken){const a=typeof s.mockUserToken=="string"?s.mockUserToken:Lr(s.mockUserToken,n.app.options.projectId);o=new Pt(a)}si(e)&&(Fr(e),Wr("Database",!0)),_c(r,i,s,o)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wc(n){ro(eo),Hr(new Br("database",(e,{instanceIdentifier:t})=>{const s=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return mc(s,i,r,t)},"PUBLIC").setMultipleInstances(!0)),gs(ys,Cs,n),gs(ys,Cs,"esm2017")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ec={".sv":"timestamp"};function Se(){return Ec}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kc{constructor(e,t){this.committed=e,this.snapshot=t}toJSON(){return{committed:this.committed,snapshot:this.snapshot.toJSON()}}}function yr(n,e,t){var s;if(n=se(n),ue("Reference.transaction",n._path),n.key===".length"||n.key===".keys")throw"Reference.transaction failed: "+n.key+" is a read-only object.";const i=(s=void 0)!==null&&s!==void 0?s:!0,r=new ne,o=(l,c,h)=>{let d=null;l?r.reject(l):(d=new Ie(h,new te(n._repo,n._path),P),r.resolve(new kc(c,d)))},a=K(n,()=>{});return ec(n._repo,n._path,e,o,a,i),r.promise}re.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};re.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};wc();let Rt=null;function St(){const{app:n,emulators:e}=z();if(!Rt&&(Rt=Cc(n),e!=null&&e.database)){const[t,s]=e.database.split(":");vr(Rt,t,Number(s))}return Rt}async function Tc(n="realAccount"){var r;if(!to(n))return{ok:!1,reason:"not-ready"};const{app:e,auth:t}=z();if(!e.options.databaseURL)return{ok:!1,reason:"no-database"};await((r=t.authStateReady)==null?void 0:r.call(t));const s=t.currentUser;if(!s)return{ok:!1,reason:"signed-out"};if(s.isAnonymous)return{ok:!1,reason:"guest"};const i=await no();return{ok:!0,uid:s.uid,name:String((i==null?void 0:i.displayName)??"Joueur").slice(0,24)}}const ei="ABCDEFGHJKLMNPQRSTUVWXYZ23456789",Cr=6,bc=120*1e3,Ic=60,Sc=300,ti="kump.socialMember",Nc=Object.freeze(["ltw.kump.fr","linetower.vercel.app","androgame.vercel.app","assassins.kump.fr","dtrack.kump.fr","www.kump.fr"]),wr=(n,e)=>n<e?`${n}_${e}`:`${e}_${n}`,x=n=>It(St(),`social/${n}`),xc=()=>Date.now()+Er;let Er=0,Rc=null;function kr(){Rc??(Rc=K(It(St(),".info/serverTimeOffset"),n=>{Er=Number(n.val())||0}))}function Pc(n){try{n?localStorage.setItem(ti,"1"):localStorage.removeItem(ti)}catch{}}async function Pe({fresh:n=!1}={}){var s,i;const e=((i=(s=z().auth)==null?void 0:s.currentUser)==null?void 0:i.uid)??null;if(!n&&(Fe!=null&&Fe.ok)&&Fe.uid===e)return Fe;const t=await Tc("socialAccount");return Fe=t,Pc(t.ok),t.ok&&kr(),t}let Fe=null;function Tr(n){try{const e=new URL(n);return["localhost","127.0.0.1"].includes(e.hostname)?typeof location<"u"&&["localhost","127.0.0.1"].includes(location.hostname):e.protocol==="https:"&&Nc.includes(e.hostname)}catch{return!1}}async function Mn({avatar:n}={}){const e=await Pe({fresh:!0});if(!e.ok)return null;const t=(await Ce(x(`profiles/${e.uid}`))).val();let s=t==null?void 0:t.code;(!s||(await Ce(x(`codes/${s}`))).val()!==e.uid)&&(s=await Ac(e.uid));const i={name:e.name,code:s,at:Se()},r=n===void 0?t==null?void 0:t.avatar:n;return r!=null&&r.game&&(r!=null&&r.id)&&(i.avatar={game:String(r.game),id:String(r.id)}),await oe(x(`profiles/${e.uid}`),i),{code:s,name:e.name}}async function Ac(n){for(let e=0;e<10;e++){const t=Bc(Cr),s=await yr(x(`codes/${t}`),i=>i===null?n:void 0).catch(()=>({committed:!1}));if(s.committed&&s.snapshot.val()===n)return t}throw On("code-unavailable")}async function ms(n){const e=(await Ce(x(`profiles/${n}`))).val();return e?{uid:n,name:e.name,code:e.code,avatar:e.avatar??null}:null}async function Dc(n){const e=await Pe();if(!e.ok)return{ok:!1,reason:e.reason};const t=String(n??"").trim().toUpperCase().replace(/[^A-Z0-9]/g,"");if(t.length!==Cr)return{ok:!1,reason:"code-not-found"};const s=(await Ce(x(`codes/${t}`))).val();if(!s)return{ok:!1,reason:"code-not-found"};if(s===e.uid)return{ok:!1,reason:"own-code"};const i=await ms(s),r=(i==null?void 0:i.name)??"Joueur";return(await Ce(x(`friends/${e.uid}/${s}`))).exists()?{ok:!1,reason:"already-friends"}:(await Ce(x(`requests/${e.uid}/${s}`))).exists()?(await Ir(s),{ok:!0,accepted:!0,name:r}):(await Ce(x(`requests/${s}/${e.uid}`))).exists()?{ok:!1,reason:"already-sent"}:(await oe(x(`requests/${s}/${e.uid}`),{name:e.name,at:Se()}),{ok:!0,name:r})}function br(n){var r,o;const e=(o=(r=z().auth)==null?void 0:r.currentUser)==null?void 0:o.uid;if(!e)return n([]),()=>{};const t=new Map;let s=[];const i=()=>n(s.map(a=>{var l;return{...a,avatar:((l=t.get(a.uid))==null?void 0:l.avatar)??null}}));return K(x(`requests/${e}`),async a=>{s=[],a.forEach(l=>{var c,h;s.push({uid:l.key,name:((c=l.val())==null?void 0:c.name)??"Joueur",at:((h=l.val())==null?void 0:h.at)??0})}),s.sort((l,c)=>c.at-l.at),i(),await Promise.all(s.filter(l=>!t.has(l.uid)).map(async l=>t.set(l.uid,await ms(l.uid).catch(()=>null)))),i()},()=>n([]))}async function Ir(n){const e=z().auth.currentUser.uid;await gr(It(St(),"social"),{[`friends/${e}/${n}`]:!0,[`friends/${n}/${e}`]:!0,[`requests/${e}/${n}`]:null})}async function Mc(n){const e=z().auth.currentUser.uid;await gt(x(`requests/${e}/${n}`))}async function Oc(n){const e=z().auth.currentUser.uid;await gr(It(St(),"social"),{[`friends/${e}/${n}`]:null,[`friends/${n}/${e}`]:null,[`unread/${e}/${n}`]:null})}function Lc(n){var c,h;const e=(h=(c=z().auth)==null?void 0:c.currentUser)==null?void 0:h.uid;if(!e)return n([]),()=>{};const t=new Map,s=new Map;let i={},r=!1;const o=()=>{r||(r=!0,queueMicrotask(()=>{r=!1;const d=[...s.entries()].map(([u,f])=>{var y,T,I;const p=f.presence,m=(p==null?void 0:p.state)==="online";return{uid:u,name:((y=f.profile)==null?void 0:y.name)??"…",code:((T=f.profile)==null?void 0:T.code)??null,avatar:((I=f.profile)==null?void 0:I.avatar)??null,online:m,game:(p==null?void 0:p.game)??null,gameName:(p==null?void 0:p.gameName)??null,status:m?(p==null?void 0:p.status)??"menu":"offline",lastSeen:(p==null?void 0:p.at)??0,unread:Number(i[u])||0}});d.sort((u,f)=>Number(f.online)-Number(u.online)||u.name.localeCompare(f.name,"fr")),n(d)}))},a=K(x(`unread/${e}`),d=>{i=d.val()??{},o()},()=>{}),l=K(x(`friends/${e}`),d=>{const u=new Set(Object.keys(d.val()??{}));for(const[f,p]of t)u.has(f)||(p.forEach(m=>m()),t.delete(f),s.delete(f));for(const f of u)t.has(f)||(s.set(f,{profile:null,presence:null}),t.set(f,[K(x(`profiles/${f}`),p=>{s.has(f)&&(s.get(f).profile=p.val()),o()},()=>{}),K(x(`presence/${f}`),p=>{s.has(f)&&(s.get(f).presence=p.val()),o()},()=>{})]));o()},()=>n([]));return()=>{l(),a(),t.forEach(d=>d.forEach(u=>u())),t.clear()}}function Fc(n){var t,s;const e=(s=(t=z().auth)==null?void 0:t.currentUser)==null?void 0:s.uid;return e?K(x(`unread/${e}`),i=>{const r=i.val()??{};n(Object.values(r).reduce((o,a)=>o+(Number(a)||0),0),r)},()=>n(0,{})):(n(0,{}),()=>{})}async function Wc({gameName:n,status:e="menu"}){const t=await Pe();if(!t.ok)return null;const s=x(`presence/${t.uid}`),i=Ee()??"kump",r=String(n??i).slice(0,40);let o=e,a=!1;const l=()=>({state:"online",game:i,gameName:r,status:o,at:Se()}),c=()=>({state:"offline",game:i,gameName:r,at:Se()}),h=async()=>{await zt(s).set(c()),await oe(s,l())};await h();const d=K(It(St(),".info/connected"),u=>{u.val()===!0&&!a&&h().catch(()=>{})});return{async setStatus(u){o=u==="playing"?"playing":"menu",a||await oe(s,l()).catch(()=>{})},async stop(){a||(a=!0,d(),await zt(s).cancel().catch(()=>{}),await oe(s,c()).catch(()=>{}))}}}async function Uc(n,{url:e,gameName:t,code:s}){const i=await Pe();if(!i.ok)throw On(i.reason);if(!Tr(e))throw On("bad-url");const r=mr(x(`invites/${n}`)),o={from:i.uid,name:i.name,game:Ee()??"kump",gameName:String(t??Ee()).slice(0,40),url:String(e).slice(0,300),at:Se()};s&&(o.code=String(s)),await oe(r,o),await zt(r).remove();const a=x(`replies/${i.uid}/${r.key}`);return{id:r.key,onReply(l){return K(a,c=>{const h=c.val();h!=null&&h.answer&&l(h.answer)},()=>{})},async cancel(){await zt(r).cancel().catch(()=>{}),await gt(r).catch(()=>{}),await gt(a).catch(()=>{})}}}function $c(n){var t,s;const e=(s=(t=z().auth)==null?void 0:t.currentUser)==null?void 0:s.uid;return e?(kr(),K(x(`invites/${e}`),i=>{const r=[];i.forEach(o=>{const a=o.val();a&&typeof a.at=="number"&&xc()-a.at<bc&&r.push({id:o.key,...a})}),r.sort((o,a)=>a.at-o.at),n(r)},()=>n([]))):(n([]),()=>{})}async function qc(n,e){const t=z().auth.currentUser.uid;await oe(x(`replies/${n.from}/${n.id}`),{answer:e==="accepted"?"accepted":"declined",by:t,at:Se()}).catch(()=>{}),await gt(x(`invites/${t}/${n.id}`)).catch(()=>{})}function Vc(n,e){var s,i;const t=(i=(s=z().auth)==null?void 0:s.currentUser)==null?void 0:i.uid;return t?K(dc(x(`chats/${wr(t,n)}`),hc(Ic)),r=>{const o=[];r.forEach(a=>{const l=a.val()??{};o.push({id:a.key,from:l.from,mine:l.from===t,text:String(l.text??""),at:Number(l.at)||0})}),e(o)},()=>e([])):(e([]),()=>{})}async function Gc(n,e){const t=await Pe();if(!t.ok)return{ok:!1,reason:t.reason};const s=String(e??"").replace(/\s+/g," ").trim().slice(0,Sc);if(!s)return{ok:!1,reason:"empty"};try{await oe(mr(x(`chats/${wr(t.uid,n)}`)),{from:t.uid,text:s,at:Se()})}catch{return{ok:!1,reason:"not-friends"}}return await yr(x(`unread/${n}/${t.uid}`),i=>(Number(i)||0)+1).catch(()=>{}),{ok:!0}}async function Hc(n){var t,s;const e=(s=(t=z().auth)==null?void 0:t.currentUser)==null?void 0:s.uid;e&&await gt(x(`unread/${e}/${n}`)).catch(()=>{})}function Bc(n){return[...crypto.getRandomValues(new Uint8Array(n))].map(t=>ei[t%ei.length]).join("")}function On(n){const e=new Error(n);return e.code=n,e}const it=Object.freeze({title:"Amis",myCode:"Ton code ami",copy:"Copier",copied:"Copié !",share:"Partager",addLabel:"Ajouter un ami avec son code",addPlaceholder:"CODE AMI",add:"Ajouter",requests:"Demandes reçues",friends:"Mes amis",accept:"Accepter",decline:"Refuser",invite:"Inviter",chat:"Discuter",remove:"Retirer de mes amis",removeConfirm:"Retirer {name} de tes amis ?",empty:"Pas encore d’amis : donne ton code, ou ajoute celui d’un ami.",online:"En ligne",playing:"En partie",offline:"Hors ligne",sameGame:"ici",seen:"vu {ago}",back:"Retour",send:"Envoyer",chatPlaceholder:"Écris un message…",chatEmpty:"Aucun message pour l’instant. Dis bonjour !",sent:"Demande envoyée à {name}.",autoAccepted:"{name} t’avait déjà demandé : vous êtes amis !",invited:"Invitation envoyée à {name}.",inviteFrom:"{name} t’invite à jouer",inviteOtherGame:"Tu vas quitter {game} pour rejoindre {target}.",inviteLeaveMatch:"Ta partie en cours sera abandonnée.",join:"Rejoindre",newMessage:"Nouveau message de {name}","code-not-found":"Aucun joueur avec ce code.","own-code":"C’est ton propre code : donne-le à un ami.","already-friends":"Vous êtes déjà amis.","already-sent":"Demande déjà envoyée : elle attend sa réponse.","not-friends":"Message non envoyé : vous n’êtes plus amis.",guest:"Les amis demandent un compte KUMP (email ou Google) : tes amis te retrouvent ainsi sur tous les jeux KUMP.","signed-out":"Connecte-toi à ton compte KUMP pour retrouver tes amis.","not-ready":"Compte KUMP injoignable (hors ligne ?).","no-database":"Les amis ne sont pas disponibles sur ce jeu.","bad-url":"Ce jeu ne peut pas encore envoyer d’invitation.",account:"Mon compte KUMP",error:"Une erreur est survenue, réessaie."}),Sr=(n,e={})=>n.replace(/\{(\w+)\}/g,(t,s)=>e[s]??""),Nr=new Map([["line-tower",{src:"https://linetower.vercel.app/assets/ui/avatars-face.webp",cols:7,rows:7}]]);function eu(n,e){Nr.set(n,e)}function yn(n,e,t){const s=g("span",{class:"kump-favatar","aria-hidden":"true"}),i=n!=null&&n.game?Nr.get(n.game):null,r=Number(String((n==null?void 0:n.id)??"").replace(/\D/g,""))-1;return i&&r>=0&&r<i.cols*i.rows?(s.classList.add("kump-favatar-img"),s.style.backgroundImage=`url("${i.src}")`,s.style.backgroundSize=`${i.cols*100}% ${i.rows*100}%`,s.style.backgroundPosition=`${r%i.cols/Math.max(1,i.cols-1)*100}% ${Math.floor(r/i.cols)/Math.max(1,i.rows-1)*100}%`):s.textContent=String(e??"?").trim().charAt(0).toUpperCase()||"?",t&&s.append(g("i",{class:`kump-dot kump-dot-${t}`})),s}function jc(n){if(!n)return"";const e=Math.max(1,Math.round((Date.now()-n)/6e4));if(e<60)return`il y a ${e} min`;const t=Math.round(e/60);return t<48?`il y a ${t} h`:`il y a ${Math.round(t/24)} j`}let We=null;function zc(n={}){if(xr(),We)return n.chatWith&&We.chat(n.chatWith),We;const e=(m,y)=>{var T;return Sr(((T=n.messages)==null?void 0:T[m])??it[m]??m,y)},t=[],s=so({title:e("title"),onClose:()=>{var m,y;(m=c.off)==null||m.call(c),t.forEach(T=>T()),We=null,(y=n.onClose)==null||y.call(n)}});s.card.classList.add("kump-friends-card");const{body:i}=s,r=(m,y,T="")=>{m.textContent=y??"",m.className=`kump-fmsg ${T}`,m.hidden=!y};let o=[],a=[],l="······",c={name:"list"};const h={close:s.close,chat:m=>f(m)};We=h,i.replaceChildren(g("p",{class:"kump-loading"},"…")),(async()=>{const m=await Pe();if(!m.ok)return d(m.reason);const y=await Mn().catch(()=>null);l=(y==null?void 0:y.code)??l,u(l),t.push(Lc(T=>{var I,q;o=T,c.name==="list"&&((I=c.renderFriends)==null||I.call(c)),c.name==="chat"&&((q=c.renderHeader)==null||q.call(c))})),t.push(br(T=>{var I;a=T,(I=c.renderRequests)==null||I.call(c,T)})),n.chatWith&&f(n.chatWith)})().catch(m=>{console.warn("[kump] amis indisponibles",m),d("not-ready")});function d(m){c={name:"gate"},i.replaceChildren(...[g("p",{class:"kump-intro"},e(m in it?m:"error")),n.onAccount&&(m==="guest"||m==="signed-out")?g("button",{class:"kump-btn kump-btn-primary kump-btn-block",onclick:()=>{s.close(),n.onAccount()}},e("account")):null].filter(Boolean))}function u(m){const y=g("p",{class:"kump-fmsg",hidden:!0,role:"status"}),T=g("input",{class:"kump-input kump-fcode-input",maxlength:"8",placeholder:e("addPlaceholder"),autocomplete:"off",autocapitalize:"characters",spellcheck:"false","aria-label":e("addLabel")}),I=g("button",{class:"kump-btn kump-btn-primary",type:"submit"},e("add")),q=g("form",{class:"kump-row kump-fadd",onsubmit:async w=>{if(w.preventDefault(),!I.disabled){I.disabled=!0;try{const O=await Dc(T.value);O.ok?(T.value="",r(y,e(O.accepted?"autoAccepted":"sent",{name:O.name}),"kump-ok")):r(y,e(O.reason),"kump-warn")}catch(O){console.warn("[kump] demande d’ami",O),r(y,e("error"),"kump-warn")}finally{I.disabled=!1}}}},T,I),Q=g("button",{class:"kump-btn kump-fcopy",type:"button",onclick:async()=>{try{await navigator.clipboard.writeText(m),Q.textContent=e("copied"),setTimeout(()=>Q.textContent=e("copy"),1400)}catch{r(y,m,"")}}},e("copy")),Ae=typeof navigator.share=="function"?g("button",{class:"kump-btn kump-fcopy",type:"button",onclick:()=>navigator.share({text:`${e("myCode")} : ${m}`}).catch(()=>{})},e("share")):null,hn=g("div",{class:"kump-fcode"},g("span",{class:"kump-label"},e("myCode")),g("strong",{class:"kump-fcode-value"},m),g("div",{class:"kump-row"},Q,Ae)),Ze=g("div",{class:"kump-freqs",hidden:!0}),De=g("div",{class:"kump-flist",role:"list"}),M=g("span",{class:"kump-fcount"});i.replaceChildren(hn,q,y,Ze,g("h3",{class:"kump-subtitle"},e("friends")," ",M),De),c={name:"list",renderRequests(w){Ze.hidden=w.length===0,Ze.replaceChildren(g("h3",{class:"kump-subtitle"},e("requests")),...w.map(O=>g("div",{class:"kump-frow"},yn(O.avatar,O.name),g("div",{class:"kump-fmain"},g("strong",{},O.name)),g("button",{class:"kump-btn kump-btn-primary kump-fsmall",onclick:B=>ge(B.currentTarget,()=>Ir(O.uid))},e("accept")),g("button",{class:"kump-btn kump-fsmall",onclick:B=>ge(B.currentTarget,()=>Mc(O.uid))},e("decline")))))},renderFriends(){if(M.textContent=o.length?`(${o.length})`:"",!o.length){De.replaceChildren(g("p",{class:"kump-note"},e("empty")));return}De.replaceChildren(...o.map(w=>le(w)))}},c.renderFriends(),c.renderRequests(a);async function ge(w,O){w.disabled=!0;try{await O()}catch(B){console.warn("[kump] amis",B),r(y,e("error"),"kump-warn"),w.disabled=!1}}function le(w){const O=w.online&&w.game===Ee(),B=w.online?`${e(w.status==="playing"?"playing":"online")} · ${O?e("sameGame"):w.gameName??""}`:`${e("offline")}${w.lastSeen?` · ${e("seen",{ago:jc(w.lastSeen)})}`:""}`,Rr=w.online?g("button",{class:"kump-btn kump-btn-primary kump-fsmall",disabled:w.status==="playing",title:w.status==="playing"?e("playing"):null,onclick:Oe=>{Oe.stopPropagation(),Me(Oe.currentTarget,w)}},e("invite")):null,Pr=w.unread?g("span",{class:"kump-fbadge","aria-label":`${w.unread} non lus`},String(w.unread>99?"99+":w.unread)):null;return g("div",{class:`kump-frow kump-fclick${w.online?" kump-fon":""}`,role:"listitem",tabindex:"0",onclick:()=>f(w.uid),onkeydown:Oe=>Oe.key==="Enter"?f(w.uid):null},yn(w.avatar,w.name,w.online?w.status==="playing"?"busy":"on":"off"),g("div",{class:"kump-fmain"},g("strong",{},w.name),g("span",{class:"kump-fstatus"},B)),Pr,Rr,g("button",{class:"kump-btn kump-fsmall kump-fchat","aria-label":`${e("chat")} — ${w.name}`,onclick:Oe=>{Oe.stopPropagation(),f(w.uid)}},"💬"))}async function Me(w,O){w.disabled=!0;try{n.onInvite?await n.onInvite(O):(await Uc(O.uid,{url:n.inviteUrl??`${location.origin}${location.pathname}`,gameName:n.gameName??Ee()}),r(y,e("invited",{name:O.name}),"kump-ok"))}catch(B){console.warn("[kump] invitation",B),r(y,e((B==null?void 0:B.code)in it?B.code:"error"),"kump-warn")}finally{w.disabled=!1}}}function f(m){var De;if(c.name==="chat"&&c.uid===m)return;(De=c.off)==null||De.call(c);const y=()=>o.find(M=>M.uid===m)??{uid:m,name:"…",online:!1},T=g("div",{class:"kump-fchat-head"}),I=g("div",{class:"kump-fchat-log",role:"log","aria-live":"polite"}),q=g("p",{class:"kump-fmsg",hidden:!0,role:"status"}),Q=g("input",{class:"kump-input",maxlength:"300",placeholder:e("chatPlaceholder"),autocomplete:"off","aria-label":e("chatPlaceholder")}),Ae=g("button",{class:"kump-btn kump-btn-primary kump-fsend",type:"submit","aria-label":e("send")},"➤"),hn=g("form",{class:"kump-row kump-fchat-form",onsubmit:async M=>{M.preventDefault();const ge=Q.value;if(!ge.trim()||Ae.disabled)return;Ae.disabled=!0;const le=await Gc(m,ge).catch(()=>({ok:!1,reason:"error"}));Ae.disabled=!1,le.ok?(Q.value="",r(q,"")):r(q,e(le.reason in it?le.reason:"error"),"kump-warn"),Q.focus()}},Q,Ae);i.replaceChildren(T,I,q,hn);const Ze=Vc(m,M=>{var le;const ge=I.scrollHeight-I.scrollTop-I.clientHeight<40;I.replaceChildren(...M.length?M.map(Me=>g("div",{class:`kump-fmsgline ${Me.mine?"kump-mine":""}`},g("span",{class:"kump-fbubble"},Me.text),g("time",{},Me.at?new Date(Me.at).toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}):""))):[g("p",{class:"kump-note"},e("chatEmpty"))]),(ge||(le=M.at(-1))!=null&&le.mine)&&(I.scrollTop=I.scrollHeight),Hc(m)});c={name:"chat",uid:m,off:Ze,renderHeader(){const M=y();T.replaceChildren(g("button",{class:"kump-btn kump-fsmall kump-fback",onclick:()=>p()},`‹ ${e("back")}`),yn(M.avatar,M.name,M.online?M.status==="playing"?"busy":"on":"off"),g("div",{class:"kump-fmain"},g("strong",{},M.name),g("span",{class:"kump-fstatus"},M.online?`${e(M.status==="playing"?"playing":"online")} · ${M.gameName??""}`:e("offline"))),g("button",{class:"kump-btn kump-btn-danger kump-fsmall",title:e("remove"),"aria-label":e("remove"),onclick:async()=>{window.confirm(e("removeConfirm",{name:M.name}))&&(await Oc(m).catch(()=>{}),p())}},"✕"))}},c.renderHeader(),Q.focus()}function p(){var m;(m=c.off)==null||m.call(c),u(l)}return h}async function tu(n={}){if(xr(),!(await Pe()).ok)return null;const t=(u,f)=>{var p;return Sr(((p=n.messages)==null?void 0:p[u])??it[u]??u,f)};await Mn({avatar:n.avatar}).catch(u=>console.warn("[kump] profil public",u));const s=await Wc({gameName:n.gameName,status:n.status});let i=n.status??"menu",r=0,o=0,a={};const l=()=>{var u;return(u=n.onBadge)==null?void 0:u.call(n,r+o)},c=[];c.push(br(u=>{r=u.length,l()})),c.push(Fc((u,f)=>{for(const[p,m]of Object.entries(f))m>(a[p]??0)&&!We&&ms(p).then(y=>Yc(t("newMessage",{name:(y==null?void 0:y.name)??"…"}),()=>{var T;return zc({...((T=n.friendsOptions)==null?void 0:T.call(n))??{},chatWith:p})})).catch(()=>{});a=f,o=u,l()}));const h=new Set;c.push($c(u=>{for(const f of u)h.has(f.id)||(h.add(f.id),d(f))}));function d(u){const f=u.game===Ee(),p=[];f||p.push(t("inviteOtherGame",{game:n.gameName??Ee(),target:u.gameName})),i==="playing"&&p.push(t("inviteLeaveMatch"));const m=g("div",{class:"kump-invite",role:"alertdialog","aria-label":t("inviteFrom",{name:u.name})},g("div",{class:"kump-invite-top"},g("span",{class:"kump-favatar kump-invite-ic","aria-hidden":"true"},"⚔"),g("div",{class:"kump-fmain"},g("strong",{},t("inviteFrom",{name:u.name})),g("span",{class:"kump-fstatus"},u.gameName))),p.length?g("p",{class:"kump-invite-note"},p.join(" ")):null,g("div",{class:"kump-row"},g("button",{class:"kump-btn kump-btn-primary",onclick:()=>T("accepted")},t("join")),g("button",{class:"kump-btn",onclick:()=>T("declined")},t("decline")))),y=setTimeout(()=>m.remove(),Math.max(5e3,12e4-(Date.now()-u.at)));document.body.append(m);async function T(I){var q;if(clearTimeout(y),m.remove(),await qc(u,I),I==="accepted"&&!(f&&((q=n.onJoin)==null?void 0:q.call(n,u))===!0)){if(!Tr(u.url))return console.warn("[kump] invitation vers une adresse non autorisée ignorée",u.url);await(s==null?void 0:s.stop()),location.assign(u.url)}}}return{async setStatus(u){i=u==="playing"?"playing":"menu",await(s==null?void 0:s.setStatus(i))},setAvatar(u){return Mn({avatar:u}).catch(()=>null)},async stop(){c.forEach(u=>u()),await(s==null?void 0:s.stop())}}}function Yc(n,e){const t=g("button",{class:"kump-ftoast",type:"button",onclick:()=>{t.remove(),e==null||e()}},"💬 ",n);document.body.append(t),setTimeout(()=>t.remove(),6e3)}const ni="kump-social-styles",Kc=`
.kump-friends-card { width: min(420px, 100%); }
.kump-fcode { display: grid; justify-items: center; gap: 6px; margin-bottom: 10px; padding: 12px; border: 1px solid var(--kump-border); border-radius: var(--kump-radius-sm); background: var(--kump-surface-2); }
.kump-fcode .kump-label { margin: 0; }
.kump-fcode-value { font-size: 1.7rem; letter-spacing: .22em; color: var(--kump-accent); font-variant-numeric: tabular-nums; }
.kump-fcopy { padding: 6px 12px; font-size: .85rem; }
.kump-fadd { margin: 4px 0 6px; }
.kump-fcode-input { text-transform: uppercase; letter-spacing: .18em; }
.kump-fmsg { margin: 4px 0 8px; font-size: .85rem; color: var(--kump-text-dim); }
.kump-fmsg[hidden] { display: none; }
.kump-fmsg.kump-ok { color: var(--kump-accent); }
.kump-fmsg.kump-warn { color: var(--kump-danger); }
.kump-fcount { color: var(--kump-text-dim); font-weight: 400; }
.kump-freqs[hidden] { display: none; }
.kump-flist { display: grid; gap: 6px; }
.kump-frow { display: flex; align-items: center; gap: 10px; padding: 8px 10px; border: 1px solid var(--kump-border); border-radius: var(--kump-radius-sm); background: var(--kump-surface-2); }
.kump-fclick { cursor: pointer; }
.kump-fclick:hover, .kump-fclick:focus-visible { border-color: var(--kump-accent); outline: none; }
.kump-fmain { flex: 1; min-width: 0; display: grid; }
.kump-fmain strong { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.kump-fstatus { font-size: .75rem; color: var(--kump-text-dim); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.kump-fon .kump-fstatus { color: var(--kump-accent); }
.kump-fsmall { padding: 6px 10px; font-size: .8rem; }
.kump-fbadge { flex: none; min-width: 20px; height: 20px; padding: 0 6px; display: grid; place-items: center; border-radius: 999px; background: var(--kump-danger); color: #fff; font-size: .72rem; font-weight: 800; }
.kump-favatar { position: relative; flex: none; width: 42px; height: 42px; display: grid; place-items: center; border-radius: 50%; background: var(--kump-surface); border: 2px solid var(--kump-border); color: var(--kump-accent); font-weight: 800; font-size: 1.1rem; }
.kump-favatar-img { background-repeat: no-repeat; }
.kump-dot { position: absolute; right: -2px; bottom: -2px; width: 13px; height: 13px; border-radius: 50%; border: 2px solid var(--kump-surface); }
.kump-dot-on { background: #3ddc5b; }
.kump-dot-busy { background: #ffb02e; }
.kump-dot-off { background: #7a7f8c; }
.kump-fchat-head { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
.kump-fback { flex: none; }
.kump-fchat-log { height: min(46vh, 360px); overflow-y: auto; display: flex; flex-direction: column; gap: 6px; padding: 8px; border: 1px solid var(--kump-border); border-radius: var(--kump-radius-sm); background: rgba(0, 0, 0, .25); }
.kump-fmsgline { display: flex; flex-direction: column; align-items: flex-start; max-width: 85%; }
.kump-fmsgline.kump-mine { align-self: flex-end; align-items: flex-end; }
.kump-fbubble { padding: 7px 11px; border-radius: 14px 14px 14px 4px; background: var(--kump-surface-2); border: 1px solid var(--kump-border); overflow-wrap: anywhere; }
.kump-mine .kump-fbubble { border-radius: 14px 14px 4px 14px; background: color-mix(in srgb, var(--kump-accent) 30%, var(--kump-surface-2)); }
.kump-fmsgline time { font-size: .65rem; color: var(--kump-text-dim); margin-top: 2px; }
.kump-fchat-form { margin-top: 8px; }
.kump-fsend { flex: none; }
.kump-invite { position: fixed; z-index: 9100; left: 50%; top: max(12px, env(safe-area-inset-top)); transform: translateX(-50%); width: min(360px, calc(100% - 24px)); padding: 12px; border-radius: var(--kump-radius); background: var(--kump-surface); border: 1px solid var(--kump-accent); color: var(--kump-text); font-family: var(--kump-font); box-shadow: 0 12px 34px rgba(0, 0, 0, .55); animation: kump-drop .35s ease-out; box-sizing: border-box; }
.kump-invite * { box-sizing: border-box; }
.kump-invite-top { display: flex; align-items: center; gap: 10px; }
.kump-invite-note { margin: 8px 0 0; font-size: .8rem; color: var(--kump-text-dim); }
.kump-invite .kump-row { margin-top: 10px; }
.kump-invite .kump-btn { flex: 1; }
.kump-ftoast { position: fixed; z-index: 9050; left: 50%; bottom: max(16px, env(safe-area-inset-bottom)); transform: translateX(-50%); max-width: calc(100% - 24px); padding: 10px 16px; border-radius: 999px; border: 1px solid var(--kump-border); background: var(--kump-surface); color: var(--kump-text); font: inherit; font-family: var(--kump-font); cursor: pointer; box-shadow: 0 8px 24px rgba(0, 0, 0, .5); animation: kump-rise .3s ease-out; }
@keyframes kump-drop { from { opacity: 0; transform: translate(-50%, -16px); } }
@keyframes kump-rise { from { opacity: 0; transform: translate(-50%, 16px); } }
@media (prefers-reduced-motion: reduce) { .kump-invite, .kump-ftoast { animation: none; } }
`;function xr(){if(typeof document>"u"||(io(),document.getElementById(ni)))return;const n=document.createElement("style");n.id=ni,n.textContent=Kc,document.head.append(n)}export{Nc as INVITE_HOSTS,ti as SOCIAL_MEMBER_KEY,it as SOCIAL_TEXT,Ir as acceptFriendRequest,Mc as declineFriendRequest,ms as getPublicProfile,Tr as isSafeInviteUrl,Hc as markRead,zc as openKumpFriends,Mn as publishProfile,eu as registerAvatarSet,Oc as removeFriend,qc as respondInvite,Dc as sendFriendRequest,Uc as sendInvite,Gc as sendMessage,Pe as socialAccount,tu as startKumpSocial,Wc as startPresence,Vc as watchChat,Lc as watchFriends,$c as watchInvites,br as watchRequests,Fc as watchUnread};
