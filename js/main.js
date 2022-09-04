"use strict";

// ELEMENTS CALL
let elForm = $(".js-form");
let elInput = $(".js-input", elForm);
let elSelect = $(".js-select", elForm);

// THE RESULT
let elList = $(".js-list");
let elResults = $(".js-results");
let elResults2 = $(".js-results-2");

let bokmarkList = $(".js-list-mark");

let slideBtn = $(".top__btn");
let slider = $(".slider");

let modal = $(".modal-body");

// ARRAY BOOKMARKS

const localBok = JSON.parse(window.localStorage.getItem("bookmarks"));
let bookmarks = localBok || [];

// RESULTS ELEMENS LENGTH
elResults.textContent = films.length;
elResults2.textContent = films.length;

// GANRES
const renderGenres = function (arr) {
  const uniqueGenres = [];

  arr.forEach((film) => {
    film.genres.forEach((genre) => {
      if (!uniqueGenres.includes(genre)) {
        uniqueGenres.push(genre);
      }
    });
  });

  uniqueGenres.forEach((genre) => {
    const genresOption = document.createElement("option");

    genresOption.textContent = genre;
    genresOption.value = genre;

    elSelect.appendChild(genresOption);
  });
};

// RENDER FUNCTION
const renderMovies = function (arr, htmlElement) {
  arr.forEach(function (film) {
    let elLi = document.createElement("li");
    elLi.classList.add("list__item");

    let elImg = document.createElement("img");
    elImg.classList.add("list__img");

    let elHeading = document.createElement("h3");
    elHeading.classList.add("list__heading");

    let elP = document.createElement("p");
    elP.classList.add("list__text");

    let elP2 = document.createElement("p");
    elP2.classList.add("list__text2");

    let elLink = document.createElement("a");
    elLink.setAttribute("class", "list-button btn btn-success text-white");

    let elButtonBookmark = document.createElement("button");
    elButtonBookmark.setAttribute("class", "mark-button btn btn-primary w-100");
    elButtonBookmark.textContent = "Bookmark";
    elButtonBookmark.dataset.bookmarkBtnId = film.id;

    let elButtonInfo = document.createElement("button");
    elButtonInfo.setAttribute(
      "class",
      "bokmark-info btn btn-info text-white w-100"
    );
    elButtonInfo.setAttribute("data-bs-toggle", "modal");
    elButtonInfo.setAttribute("data-bs-target", "#exampleModal");

    elButtonInfo.textContent = "Info";
    elButtonInfo.dataset.infoBtnId = film.id;

    let elBox = document.createElement("div");
    elBox.classList.add("list__box");

    elImg.src = film.poster;
    elHeading.textContent = film.title;
    // elP.textContent = film.overview;
    elP2.textContent = film.genres.join(" ");
    elLink.setAttribute("href", `https://www.youtube.com/`);
    elLink.setAttribute("class", "w-100 btn btn-success text-white");
    elLink.textContent = "Watch";

    // elBox.append(elHeading);
    elBox.append(elLink, elButtonBookmark, elButtonInfo);
    elLi.append(elImg, elHeading, elP2, elBox);
    htmlElement.append(elLi);
  });
};

renderMovies(films, elList);
renderGenres(films);

// Search function
elSelect.addEventListener("change", function (evt) {
  evt.preventDefault();
  elList.innerHTML = "";

  let elSelectValue = elSelect.value;

  let filteredFilms = [];

  films.forEach(function (nimadir) {
    if (elSelect.value === "all" || nimadir.genres.includes(elSelectValue)) {
      filteredFilms.push(nimadir);
      elResults.textContent = filteredFilms.length;
    }
  });
  renderMovies(filteredFilms, elList);
});

// Search function
elInput.addEventListener("input", (evt) => {
  evt.preventDefault();
  let searchRegex = new RegExp(elInput.value.trim(), "gi");

  let array = [];
  films.forEach(function (film) {
    elList.innerHTML = "";
    if (film.title.match(searchRegex)) {
      array.push(film);
      elResults2.textContent = `${array.length}`;
    }
    renderMovies(array, elList);
  });
});

let infoFunsiya = function (www) {
  modal.innerHTML = "";

  www.forEach(function (film) {
    let elText = document.createElement("p");
    elText.textContent = film.title;

    modal.append(elText);
  });
};

infoFunsiya(films);

// BOOKMARKS DELETE
bokmarkList.addEventListener("click", function (evt) {
  if (evt.target.matches(".remove-button")) {
    const btnId = evt.target.dataset.delete;
    const index = bookmarks.findIndex((bookmark) => bookmark.id === btnId);
    bookmarks.splice(index, 1);

    window.localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    
    bokmarkList.innerHTML = "";

    if (bookmarks.length === 0) {
      window.localStorage.removeItem("bookmarks");
    }
    renderBookmarks(bookmarks, bokmarkList);
  }
});

// REMOVE BOOKMARKS
const renderBookmarks = function (arr, htmlElement) {
  bokmarkList.innerHTML = "";
  arr.forEach(function (bokmark) {
    const newItem2 = document.createElement("li");
    const removBtn = document.createElement("button");
    removBtn.setAttribute("class", "remove-button btn btn-danger");
    removBtn.textContent = "Remove";
    window.localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    removBtn.dataset.delete = bokmark.id;

    newItem2.textContent = bokmark.title;

    newItem2.append(removBtn);
    htmlElement.appendChild(newItem2);
  });
};
elList.addEventListener("click", function (evt) {
  if (evt.target.matches(".mark-button")) {
    const bookmarkId = evt.target.dataset.bookmarkBtnId;

    const foundBookmark = films.find((film) => film.id === bookmarkId);
    if (!bookmarks.includes(foundBookmark)) {
      bookmarks.push(foundBookmark);
      window.localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
      renderBookmarks(bookmarks, bokmarkList);
    }
  }
});

renderBookmarks(localBok, bokmarkList);