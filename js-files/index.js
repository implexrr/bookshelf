let myLibrary = [];
let addBook = document.querySelector("#add-book");
let title = document.querySelector("#title");
let author = document.querySelector("#author");
let pages = document.querySelector("#pages");
let bookshelf = document.querySelector("#bookshelf");

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
  addToDisplay();
  form.reset();
}

function addToDisplay() {
  let newBook = createBook();
  bookshelf.appendChild(newBook);
}

function createBook() {
  let book = document.createElement("div");
  let bookTitle = document.createElement("div");
  let bookAuthor = document.createElement("div");
  let bookPages = document.createElement("div");
  let bookRead = document.createElement("div");
  book.dataset.stoof = myLibrary.length -1;

  book.classList.add(".book");
  bookTitle.classList.add(".title");
  bookAuthor.classList.add(".author");
  bookPages.classList.add(".pages");
  bookRead.classList.add(".read");

  bookTitle.textContent = myLibrary.at(-1).title;
  bookAuthor.textContent = myLibrary.at(-1).author;
  bookPages.textContent = myLibrary.at(-1).pages;
  bookRead.textContent = myLibrary.at(-1).read;

  book.appendChild(bookTitle);
  book.appendChild(bookAuthor);
  book.appendChild(bookPages);
  book.appendChild(bookRead);
  // newBook.textContent = myLibrary.at(-1).title;
  // bookshelf.appendChild(newBook);
  return book;
}

function removeBook() {
  
}