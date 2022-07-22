const img1 = document.querySelector("#img1");
const img2 = document.createElement("header");
img2.innerHTML = `
<img src="img/bg2.jpg" alt="Hitman's Wife's Bodyguard" id="img2">
`;
img1.replaceWith(img2);
const newTitle = document.querySelector("#img2");
const oldTitle = document.querySelector("#title");
oldTitle.textContent = newTitle.alt; 
const promo = document.querySelector(".main_promo");
promo.remove();