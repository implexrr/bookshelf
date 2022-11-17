let myLibrary = [];
let addBook = document.querySelector("#add-book");
let title = document.querySelector("#title");
let author = document.querySelector("#author");
let pages = document.querySelector("#pages");

let form = document.querySelector("form");
form.addEventListener("submit", addBookToLibrary);

function Book(title, author, pages, read) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(e) {
  e.preventDefault();
  let bookToAdd = new Book(title.value, author.value, pages.value, read.value);
  myLibrary.push(bookToAdd);
  form.reset();
}