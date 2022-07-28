"use strict";
const imgName = document.querySelector("header img");
const title = document.querySelector("title");
const promo = document.querySelectorAll(".mp");
const films = document.getElementById("films");
const mewFilm = document.querySelector("#add input");
const addFilm = document.querySelector("#add button")
const yourDB = {
	movies: [
		"Logan", "Spider-Man", "The Seven Samurai",
		"Bonnie and Clyde", "Reservoir Dogs", "Crid",
		"Doctor Zhivago", "The Deer Hunter", "Rocky"
	]
};
imgName.src = "img/bg2.jpg";
if (imgName.src.slice(28, 29) == "2") {
	imgName.alt = "Hitman's wife's bodyguard";
} else {
	imgName.alt = "GEMINI MAN";
}
title.textContent = imgName.alt;
promo.forEach(items => items.remove());
yourDB.movies.forEach((item, index) => {

	films.innerHTML += `
		<p>${index + 1} ${item}
			<span data-rm>&#128465</span>
		</p>
	`
	document.querySelectorAll("[data-rm]").forEach((element, index) => {
		element.addEventListener("click", item => {
			const filmsName = document.querySelectorAll("#films p");
			item.target.parentElement.remove();
			console.log(index);
			for (let i = index; i < yourDB.movies.length; i++) {
				filmsName[i].childNodes[0].data = `${i} ${filmsName[i].childNodes[0].data.split(" ").splice(1).join(" ")}`;
			}
			console.log(yourDB.movies);
		})

	});

});
addFilm.addEventListener("click", function () {
	yourDB.movies.push(mewFilm.value);
	console.log(yourDB.movies);
	films.innerHTML += `
	<p>${films.childElementCount + 1} ${mewFilm.value}
		<span data-rm>&#128465</span>
	</p>
`
})