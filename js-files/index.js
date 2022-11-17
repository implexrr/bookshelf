let myLibrary = [];

let form = document.querySelector("form");
let addBook = document.querySelector("#add-book");
let title = document.querySelector("#title");
let author = document.querySelector("#author");
let pages = document.querySelector("#pages");
let read = document.querySelector("#read");
form.addEventListener("submit", addBookToLibrary);

function Book(title, author, pages, read) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function() {
    console.log(`${this.title} by ${this.author} is ${this.pages} long, ${read}`)
  }
}

function addBookToLibrary(e) {
  e.preventDefault();
  let bookToAdd = new Book(title.value, author.value, pages.value, read.value);
  myLibrary.push(bookToAdd);
  return true;
}

// let bookToAdd;
// bookToAdd = new Book('The Hobbit', 'J.R.R. Tolkien', '295 pages', true);
// addBookToLibrary(bookToAdd);
// bookToAdd = new Book('The it', 'J Tolkien', '5 pages', true);
// addBookToLibrary(bookToAdd);
// bookToAdd = new Book('t', 'Jen', '329 pages', false);
// addBookToLibrary(bookToAdd);
