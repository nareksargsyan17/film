"use strict";

const poster = document.querySelector("header img");
const advs = document.querySelectorAll("#main_promo .mp");
const filmsBlock = document.getElementById("films");
const form = document.querySelector("#add");
const _DB = {
	movies: [
		{
			name: "Logan",
			check: false
		},
		{
			name: "Spider-Man",
			check: false
		},
		{
			name: "The Seven Samurai",
			check: false
		},
		{
			name: "Bonnie and Clyde",
			check: false
		},
		{
			name: "Reservoir Dogs",
			check: false
		},
		{
			name: "Crid",
			check: false
		},
		{
			name: "Doctor Zhivago",
			check: false
		},
		{
			name: "The Deer Hunter",
			check: false
		},
		{
			name: "Rocky",
			check: false
		},
	]
};

function init() {
	advs.forEach(adv => adv.remove());
	poster.src = "img/bg2.jpg";
	if (poster.src.slice(31) === "bg1.jpg") {
		poster.alt = "GEMINI MAN";
	} else {
		poster.alt = "Hitman's wife's bodyguard";
	}
	document.title = poster.alt;
}
init();

form.addEventListener("submit", (e) => {
	e.preventDefault();
	let val = e.target.firstElementChild.value.trim();
	const check = document.querySelector("input[name='favorite']");
	for (let i of _DB.movies) {
		if (i.name == val) {
			alert("This movie is already on your list.");
			return;
		}
	}
	if (val !== "" && val !== "<" && val !== ">" && val !== "/" && val !== "?") {
		if (check.checked) {
			_DB.movies.push({ name: val, check: true });
		} else {
			_DB.movies.push({ name: val, check: false });
		}
		setSort(_DB.movies);
		createFilmsList(_DB.movies, filmsBlock);
	}
	e.target.reset();
});
function forOne(arr, elm) {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] == elm) {
			return 1;
		}
	}
	return 0;
}
function setSort(arr) {
	arr.sort((a, b) => a.name.localeCompare(b.name));
}
function createFilmsList(filmsArr, parent) {
	parent.innerHTML = "";
	if (filmsArr.length < 20) {
		setSort(filmsArr);
		filmsArr.forEach((film, index) => {
			parent.innerHTML += `
				<p>
					${index + 1}. 
					${film.name.length >= 21 ? film.name.slice(0, 21) + '...' : film.name}
					<span data-rm>&#128465</span>
					<span class = "fav">&#11088;</span>
				</p>
			`;
			if (film.check) {
				document.querySelectorAll(".fav")[index].style.display = "block";
			}

		});
	} else {
		let sortArr = [];
		randomNums();
		function randomNums() {
			let randomNum = Math.floor(Math.random() * filmsArr.length);
			let name = filmsArr[randomNum].name;
			if (sortArr.length < 20) {
				if (forOne(sortArr, name) === 0) {
					sortArr.push(name);
				}
				randomNums();
			} else {
				return sortArr;
			}
		}
		sortArr.sort((a, b) => {
			return a.toLowerCase().localeCompare(b.toLowerCase())
		})
		sortArr.forEach((film, index) => {
			parent.innerHTML += `
				<p>
					${index + 1}. 
					${film.length >= 21 ? film.slice(0, 21) + '...' : film}
					<span data-rm>&#128465</span>
					<span class = "fav">&#11088;</span>
				</p>
			`;
			if (film.check) {
				document.querySelectorAll(".fav")[index].style.display = "block";
			}
		})
	}
	addFavorite()
	removeFilmFromList('[data-rm]')
}
function removeFilmFromList(selector) {
	setSort(_DB.movies);
	document.querySelectorAll(selector).forEach((btn, index) => {
		btn.addEventListener("click", () => {
			btn.parentElement.remove();
			_DB.movies.splice(index, 1);
			createFilmsList(_DB.movies, filmsBlock);
		});
	});
}
function addFavorite() {
	document.querySelectorAll(".fav").forEach((btn, index) => {
		btn.addEventListener("click", () => {
			_DB.movies[index].check === true ? _DB.movies[index].check = false : _DB.movies[index].check = true;
			createFilmsList(_DB.movies, filmsBlock);
		});
	});
}

createFilmsList(_DB.movies, filmsBlock);