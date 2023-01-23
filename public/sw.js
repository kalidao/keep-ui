<<<<<<< HEAD
if(!self.define){let e,a={};const s=(s,c)=>(s=new URL(s+".js",c).href,a[s]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=a,document.head.appendChild(e)}else e=s,importScripts(s),a()})).then((()=>{let e=a[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(c,i)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(a[n])return;let t={};const f=e=>s(e,n),d={module:{uri:n},exports:t,require:f};a[n]=Promise.all(c.map((e=>d[e]||f(e)))).then((e=>(i(...e),t)))}}define(["./workbox-7028bf80"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/157-c4b54994de54408a.js",revision:"c4b54994de54408a"},{url:"/_next/static/chunks/157-c4b54994de54408a.js.map",revision:"30224aff365be7e558b81a484746ba58"},{url:"/_next/static/chunks/186-c7916caf1dae346a.js",revision:"c7916caf1dae346a"},{url:"/_next/static/chunks/186-c7916caf1dae346a.js.map",revision:"b784714b02c26c60ab14365aacd95343"},{url:"/_next/static/chunks/264-f73f82d9d6be386c.js",revision:"f73f82d9d6be386c"},{url:"/_next/static/chunks/264-f73f82d9d6be386c.js.map",revision:"76463abdf7f70113f0ae64f0885d2179"},{url:"/_next/static/chunks/441-57a70e66e7e40977.js",revision:"57a70e66e7e40977"},{url:"/_next/static/chunks/441-57a70e66e7e40977.js.map",revision:"7e12fb8d115bd73aa978122ceedf2d86"},{url:"/_next/static/chunks/443-7640ef8130db7d01.js",revision:"7640ef8130db7d01"},{url:"/_next/static/chunks/443-7640ef8130db7d01.js.map",revision:"b4e9ed5493c8a68c4c98cfcb96853e9b"},{url:"/_next/static/chunks/61-d1a296fc7e49a445.js",revision:"d1a296fc7e49a445"},{url:"/_next/static/chunks/61-d1a296fc7e49a445.js.map",revision:"219405126e0b82e06fbe1d0e5ac534b0"},{url:"/_next/static/chunks/644-75e2260c9cf2b9e8.js",revision:"75e2260c9cf2b9e8"},{url:"/_next/static/chunks/644-75e2260c9cf2b9e8.js.map",revision:"23e49ec99602419e8a096440529f80b4"},{url:"/_next/static/chunks/664-266a84107c6e1240.js",revision:"266a84107c6e1240"},{url:"/_next/static/chunks/664-266a84107c6e1240.js.map",revision:"3f85ca68d089377924df4bfd16453eb6"},{url:"/_next/static/chunks/879-e32bba7082e323f4.js",revision:"e32bba7082e323f4"},{url:"/_next/static/chunks/879-e32bba7082e323f4.js.map",revision:"031c840ba8e0e6794cbd85f98d5b8177"},{url:"/_next/static/chunks/906-0c9478bcbcfda805.js",revision:"0c9478bcbcfda805"},{url:"/_next/static/chunks/906-0c9478bcbcfda805.js.map",revision:"0ffc72ee5a16e8390d4476eec8a866cf"},{url:"/_next/static/chunks/framework-f6221ac08e8d1be4.js",revision:"f6221ac08e8d1be4"},{url:"/_next/static/chunks/framework-f6221ac08e8d1be4.js.map",revision:"029fcdbe37f7c4593882a13015140df1"},{url:"/_next/static/chunks/main-3f1bbee080413629.js",revision:"3f1bbee080413629"},{url:"/_next/static/chunks/main-3f1bbee080413629.js.map",revision:"caa64bf975ba22f955565ef99b7e2350"},{url:"/_next/static/chunks/pages/%5BchainId%5D/%5Bkeep%5D-fbc003ce58f4f41f.js",revision:"fbc003ce58f4f41f"},{url:"/_next/static/chunks/pages/%5BchainId%5D/%5Bkeep%5D-fbc003ce58f4f41f.js.map",revision:"30a42ddb96c3f972bf1ece5566640aed"},{url:"/_next/static/chunks/pages/%5BchainId%5D/%5Bkeep%5D/%5BtxHash%5D-535ce352ce77514b.js",revision:"535ce352ce77514b"},{url:"/_next/static/chunks/pages/%5BchainId%5D/%5Bkeep%5D/%5BtxHash%5D-535ce352ce77514b.js.map",revision:"c5d9289a218f420048ccfc1180656759"},{url:"/_next/static/chunks/pages/%5BchainId%5D/%5Bkeep%5D/create-aa150b70bce99bbd.js",revision:"aa150b70bce99bbd"},{url:"/_next/static/chunks/pages/%5BchainId%5D/%5Bkeep%5D/create-aa150b70bce99bbd.js.map",revision:"6efbd5cf3c1af2ef5f684f7aba8db1bc"},{url:"/_next/static/chunks/pages/_error-741d7b5369ec5964.js",revision:"741d7b5369ec5964"},{url:"/_next/static/chunks/pages/_error-741d7b5369ec5964.js.map",revision:"7573ae6ab3be6dcba11336987df910a3"},{url:"/_next/static/chunks/pages/create-66c772dcb96c2460.js",revision:"66c772dcb96c2460"},{url:"/_next/static/chunks/pages/create-66c772dcb96c2460.js.map",revision:"a73b1fd1b12c563c5fe192a49be431af"},{url:"/_next/static/chunks/pages/dashboard-3b08b7e7520db65c.js",revision:"3b08b7e7520db65c"},{url:"/_next/static/chunks/pages/dashboard-3b08b7e7520db65c.js.map",revision:"1afdb714c3ac25279c1a0a7732807244"},{url:"/_next/static/chunks/pages/index-bb8eda28fba02f8f.js",revision:"bb8eda28fba02f8f"},{url:"/_next/static/chunks/pages/index-bb8eda28fba02f8f.js.map",revision:"ce1f02386374a3ad8dc56714057eb6de"},{url:"/_next/static/chunks/pages/login-b2afedba1b9843da.js",revision:"b2afedba1b9843da"},{url:"/_next/static/chunks/pages/login-b2afedba1b9843da.js.map",revision:"36ceab8762cf8591467b228578be68a8"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-4124fc546f5a1faa.js",revision:"4124fc546f5a1faa"},{url:"/_next/static/chunks/webpack-4124fc546f5a1faa.js.map",revision:"15a15890e641b789f9c7572a59f1cb95"},{url:"/_next/static/css/194d7cd277e0aab1.css",revision:"194d7cd277e0aab1"},{url:"/_next/static/css/194d7cd277e0aab1.css.map",revision:"4719d7eb8bd85ef70841daddc20f33e7"},{url:"/_next/static/css/1af02ace058b9bdc.css",revision:"1af02ace058b9bdc"},{url:"/_next/static/css/1af02ace058b9bdc.css.map",revision:"97edc72220566836350aa6dca2f3efed"},{url:"/_next/static/css/65d3522d07d9132d.css",revision:"65d3522d07d9132d"},{url:"/_next/static/css/65d3522d07d9132d.css.map",revision:"2130e2260b7b99a5bc48905206356202"},{url:"/_next/static/css/a39eeac7b186c342.css",revision:"a39eeac7b186c342"},{url:"/_next/static/css/a39eeac7b186c342.css.map",revision:"ea3cd3e6061a1d88497dd653cd4212db"},{url:"/_next/static/css/bd7bbfe9a8d337c7.css",revision:"bd7bbfe9a8d337c7"},{url:"/_next/static/css/bd7bbfe9a8d337c7.css.map",revision:"eca8ba1898716375ed2d5a4327d2e456"},{url:"/_next/static/css/c20c8f424380ab57.css",revision:"c20c8f424380ab57"},{url:"/_next/static/css/c20c8f424380ab57.css.map",revision:"67be382b9c1fdec61bc4c1fc654eaa92"},{url:"/_next/static/css/d133404eedf0b903.css",revision:"d133404eedf0b903"},{url:"/_next/static/css/d133404eedf0b903.css.map",revision:"cea585a082a21a8b906886a8f8cfa4b3"},{url:"/_next/static/css/fdc7aa82be318868.css",revision:"fdc7aa82be318868"},{url:"/_next/static/css/fdc7aa82be318868.css.map",revision:"d62967ab029f98f3c5a2a3e5e93ec35f"},{url:"/_next/static/media/031604e13da42498.p.woff2",revision:"b7fdaefdb396988cce151df99af44eac"},{url:"/_next/static/media/2aaf0723e720e8b9.p.woff2",revision:"e1b9f0ecaaebb12c93064cd3c406f82b"},{url:"/_next/static/media/53f08a4bfd832386.woff2",revision:"2230dcf36492f04e1ce85ed084906f54"},{url:"/_next/static/media/9c4f34569c9b36ca.woff2",revision:"2c1fc211bf5cca7ae7e7396dc9e4c824"},{url:"/_next/static/media/ae9ae6716d4f8bf8.woff2",revision:"b0c49a041e15bdbca22833f1ed5cfb19"},{url:"/_next/static/media/b1db3e28af9ef94a.woff2",revision:"70afeea69c7f52ffccde29e1ea470838"},{url:"/_next/static/media/b967158bc7d7a9fb.woff2",revision:"08ccb2a3cfc83cf18d4a3ec64dd7c11b"},{url:"/_next/static/media/c0f5ec5bbf5913b7.woff2",revision:"8ca5bc1cd1579933b73e51ec9354eec9"},{url:"/_next/static/media/d1d9458b69004127.woff2",revision:"9885d5da3e4dfffab0b4b1f4a259ca27"},{url:"/_next/static/mj9jEA4mY-sd5_ihgibtJ/_buildManifest.js",revision:"938f626cac560b8e508a03424d5b38e0"},{url:"/_next/static/mj9jEA4mY-sd5_ihgibtJ/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/android-chrome-192x192.png",revision:"260bfae007dce7cb7cea2956fa141483"},{url:"/android-chrome-512x512.png",revision:"ab6cfc2edb09892c22a07f29aa0ab314"},{url:"/apple-touch-icon.png",revision:"02e21eb3437de70a426fa4394204b95a"},{url:"/favicon-16x16.png",revision:"f40f8a1dd8b368041a343c2e3b8feec0"},{url:"/favicon-32x32.png",revision:"92ce67b852858b952271869d61772553"},{url:"/favicon.ico",revision:"f54d191151e4b2f6b5e05913709b9ff7"},{url:"/features/kBuilding.png",revision:"c0cae1fb1de05caf5ae3dce6d7a0a14c"},{url:"/features/kConnected.png",revision:"8350256d7b89d28c0eb8697f9db82283"},{url:"/features/kLegal.png",revision:"b4489b7ad7efd64270dba27ba9ed048e"},{url:"/fonts/BodoniModa-VariableFont_opsz,wght.ttf",revision:"2efcf38d01c43aefc462ea7c49230487"},{url:"/icons/Discord.svg",revision:"8113ca4b374db5785ca003421878165a"},{url:"/icons/Telegram.jpg",revision:"139af379a8fd9f8b03eba2625d60566d"},{url:"/icons/Twitter.png",revision:"7955196b3c0a0ed82f6b62222de768c4"},{url:"/kali-logo.svg",revision:"53b49f073f5c7a509906f7bbd2c7a68d"},{url:"/logo.jpeg",revision:"bb63b61343d535a842ea64e91ffc7d9d"},{url:"/manifest.json",revision:"eec05cab5e96f11ff88f163af342b194"},{url:"/paper.jpeg",revision:"447572cfd803a0154bd7f301659eaab5"},{url:"/paper.png",revision:"9f3d12754b442da3ef74f69e81cb0025"},{url:"/splash.webp",revision:"d4a364b244b024d2da53374e280fdb5e"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:s,state:c})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
=======
/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-212689ce'], (function (workbox) { 'use strict';

  importScripts();
  self.skipWaiting();
  workbox.clientsClaim();
  workbox.registerRoute("/", new workbox.NetworkFirst({
    "cacheName": "start-url",
    plugins: [{
      cacheWillUpdate: async ({
        request,
        response,
        event,
        state
      }) => {
        if (response && response.type === 'opaqueredirect') {
          return new Response(response.body, {
            status: 200,
            statusText: 'OK',
            headers: response.headers
          });
        }
        return response;
      }
    }]
  }), 'GET');
  workbox.registerRoute(/.*/i, new workbox.NetworkOnly({
    "cacheName": "dev",
    plugins: []
  }), 'GET');

}));
>>>>>>> 4816454382273c7aeb118bacb8c24e2854f4b967
//# sourceMappingURL=sw.js.map
