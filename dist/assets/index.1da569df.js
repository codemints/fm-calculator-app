const E=function(){const u=document.createElement("link").relList;if(u&&u.supports&&u.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}};E();const k=()=>{const g=Array.from(document.querySelectorAll(".key")),u=document.querySelector(".output h2");let t=[],o=[],e=0,r,l="";const m=i=>(i.forEach(s=>l+=s.join("")),e=0,r=void 0,t.length=0,o.length=0,new Function("return "+l)()),a=(i,s)=>{i.forEach((d,n,f)=>{s.push(new Array),n!==f.length-1&&d.forEach((h,p,y)=>{p!==y.length-1&&s[n].push(h)}),n===f.length-1&&d.forEach(h=>{s[n].push(h)})}),i.forEach((d,n,f)=>{if(n!==f.length-1){const h=[];h.push(d[d.length-1]),s.splice(n*2+1,0,h)}})},c=i=>{let s="";return i.forEach(d=>{d.forEach(n=>{s+=n})}),s};g.forEach(i=>{i.addEventListener("click",s=>{const d=s.target,n=s.target.value,f=d.dataset.function,h=["+","-","*","/"];if(!f){if(n==="."&&t.indexOf(".")!==-1)return;t.length<1?t.push(new Array(n)):t[e].push(n)}if(f==="reset"&&(t.length=0,e=0,r=void 0),f==="submit"&&t.length>1){a(t,o),u.innerHTML=m(o),l="";return}if(h.indexOf(n)!==-1){if(t.length<1){r=void 0;return}if(h.indexOf(r)!==-1)return;t[e].push(n),e++,t.push(new Array)}if(f==="delete"){if(t.length<1||t[0].length<1){t.length=0,e=0,r=void 0,u.innerHTML="";return}t[e].length<1&&(e--,t.pop()),t[e].pop()}f!=="submit"&&(u.innerHTML=c(t)),r=n})})},L=()=>{const g=Array.from(document.querySelectorAll('input[name="theme-control"]')),u=document.documentElement,t=localStorage.getItem("data-theme"),o="data-theme",e=a=>window.matchMedia(`(prefers-color-scheme: ${a})`),r=(a,c)=>{u.setAttribute(a,c),localStorage.setItem(a,c),l(c)},l=a=>{g.forEach(c=>{c.dataset.mode===a&&(g.forEach(i=>i.parentNode.classList.remove("active")),c.parentNode.classList.add("active"),c.checked=!0)})},m=(a,c)=>{t===c&&r(a,c)};e("dark").matches&&!t?(console.log(e("dark").matches,t),r(o,"dark"),l("dark")):!e("dark").matches&&!t&&(console.log(e("dark").matches,t),r(o,"light")),m(o,"dark"),m(o,"light"),m(o,"contrast"),g.forEach(a=>{a.addEventListener("change",c=>{const s=c.target.dataset.mode;r(o,s)})}),e("dark").addEventListener("change",()=>{e("dark").matches?r(o,"dark"):r(o,"light")})};k();L();