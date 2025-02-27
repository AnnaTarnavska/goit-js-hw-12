import{a as f,S as p,i as h}from"./assets/vendor-KnZd4sWe.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();async function y(s){const o="https://pixabay.com/api/",n="48985063-5c5813c169e3db6e477352dc5";try{return await f.get(o,{params:{key:n,q:s,image_type:"photo",orientation:"horizontal",safesearch:"true",page:1,per_page:40}})}catch(r){throw console.error("Error fetching image data:",r),r}}const i=document.querySelector(".gallery"),u=document.querySelector(".loader-div"),L=new p(".gallery a",{captionData:"alt",captionDelay:250});function w(s){const{webformatURL:o,largeImageURL:n,tags:r,likes:e,views:t,comments:a,downloads:m}=s;return`
    <div class="image-card">
      <a href="${n}" target="_blank">
        <img src="${o}" alt="${r}" loading="lazy"/>
      </a>
      <div class="info">
        <p><strong>Likes:</strong>${e}</p>
        <p><strong>Views:</strong>${t}</p>
        <p><strong>Comments:</strong>${a}</p>
        <p><strong>Downloads:</strong>${m}</p>
      </div>
    </div>
  `}function v(s){i.innerHTML=s.map(w).join(""),L.refresh(),g()}function b(){i.classList.add("hidden"),u.classList.remove("hidden")}function g(){u.classList.add("hidden"),i.classList.remove("hidden")}function c(){h.show({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!",messageSize:"16px",messageLineHeight:"24px",messageColor:"#fff",maxWidth:"432px",backgroundColor:"#EF4040"})}const S=document.querySelector(".form"),l=document.querySelector(".search-input"),x=document.querySelector(".gallery");S.addEventListener("submit",q);async function q(s){s.preventDefault();const o=l.value.trim();if(!o)return c();l.value="",d(),b();try{const r=(await y(o)).data.hits;if(!r||r.length===0)throw d(),new Error("No images found");v(r)}catch(n){console.error("No results",n),g(),c()}}function d(){x.innerHTML=""}
//# sourceMappingURL=index.js.map
