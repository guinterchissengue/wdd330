import{g as o,s as d}from"./utils-BIllw1lT.js";/* empty css              */function s(){const t=o("so-cart")||[],a=t.map(e=>l(e));document.querySelector(".product-list").innerHTML=a.join(""),u(t)}function l(t){const a=t.Quantity||1;return`<li class="cart-card divider" data-id="${t.Id}">
  <a href="#" class="cart-card__image">
    <img
      src="${t.Image}"
      alt="${t.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${t.Name}</h2>
  </a>
  <p class="cart-card__color">${t.Colors[0].ColorName}</p>
  <div class="cart-card__quantity">
    <button
      class="quantity-btn"
      data-action="decrease"
      data-id="${t.Id}"
      aria-label="Decrease quantity"
    >
      -
    </button>
    <span class="quantity-value">qty: ${a}</span>
    <button
      class="quantity-btn"
      data-action="increase"
      data-id="${t.Id}"
      aria-label="Increase quantity"
    >
      +
    </button>
  </div>
  <p class="cart-card__price">$${(t.FinalPrice*a).toFixed(2)}</p>
</li>`}function u(t){const a=document.querySelector(".cart-footer");if(!t.length){a.classList.add("hide");return}const e=t.reduce((n,r)=>n+(r.Quantity||1),0),c=t.reduce((n,r)=>n+r.FinalPrice*(r.Quantity||1),0);document.querySelector(".cart-total-items").textContent=e,document.querySelector(".cart-total-price").textContent=`$${c.toFixed(2)}`,a.classList.remove("hide")}function y(t,a){let e=o("so-cart")||[];a<1?e=e.filter(c=>c.Id!==t):e=e.map(c=>c.Id===t?{...c,Quantity:a}:c),d("so-cart",e),s()}function m(t){const a=t.target.closest(".quantity-btn");if(!a)return;const c=(o("so-cart")||[]).find(i=>i.Id===a.dataset.id);if(!c)return;const n=c.Quantity||1,r=a.dataset.action==="increase"?n+1:n-1;y(a.dataset.id,r)}document.querySelector(".product-list").addEventListener("click",m);s();
