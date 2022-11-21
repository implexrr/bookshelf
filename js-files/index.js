let myLibrary = [];

let displayFormContainer = document.querySelector("#display-form-container");
let displayForm = document.querySelector("#display-form");
displayForm.addEventListener("click", showUserForm);

let addBook = document.querySelector("#add-book");

let title = document.querySelector("#title");
let author = document.querySelector("#author");
let pages = document.querySelector("#pages");
let read = document.querySelector("#read");



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
  let bookToAdd = new Book(title.value, author.value, pages.value, read.checked);
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

  let completionPair = document.createElement("div");
    completionPair.setAttribute("class", "completion-pair");


  let changeCompletionLabel = document.createElement("label");
  changeCompletionLabel.setAttribute("for", "change-completion");
  changeCompletionLabel.textContent = "Read?";

  let changeCompletion = document.createElement("input");
  changeCompletion.type = "checkbox";
  changeCompletion.setAttribute("class", "change-completion");
  if (read.checked == true) {
    changeCompletion.checked = true;
  }
  changeCompletion.addEventListener("input", changeReadStatus);
  
  completionPair.appendChild(changeCompletionLabel);
  completionPair.appendChild(changeCompletion);

  let bookRemove = document.createElement("button");

  book.dataset.index = myLibrary.length - 1;

  book.classList.add("book");

  bookTitle.classList.add("title");
  bookAuthor.classList.add("author");
  bookPages.classList.add("pages");

  bookRemove.classList.add("remove");
  bookRemove.textContent = "Remove book";
  bookRemove.addEventListener("click", removeBook);

  bookTitle.textContent = `Title: ${myLibrary.at(-1).title}`;
  bookAuthor.textContent = `Author: ${myLibrary.at(-1).author}`;
  bookPages.textContent = `Pages: ${myLibrary.at(-1).pages}`;

  book.appendChild(bookTitle);
  book.appendChild(bookAuthor);
  book.appendChild(bookPages);

  
  book.appendChild(completionPair);
  
  book.appendChild(bookRemove);
  
  form.style.display = "none";
  displayForm.style.display = 'flex';
  displayFormContainer.style.display = 'flex';
  changeCompletion.dispatchEvent(new Event("input"));
  return book;
}

function removeBook(e) {
  let removeIndex = e.target.parentNode.dataset.index;
  myLibrary.splice(removeIndex, 1);
  e.target.parentNode.remove();
  let books = document.querySelectorAll(".book");
  for (let i = removeIndex; i < books.length; i++) {
    books[i].dataset.index--;
  }
}


function changeReadStatus (e) {
  if (e.target.checked) {
    e.target.parentNode.parentNode.style.backgroundColor = "aliceblue";
  }
  else {
    e.target.parentNode.parentNode.style.backgroundColor = "beige";
  }
  console.log(e.target.checked);
  myLibrary[e.target.parentNode.parentNode.dataset.index].read = e.target.checked;
}

function showUserForm(e) {
  form.style.display = 'grid';
  displayForm.style.display = 'none';
  displayFormContainer.style.display = 'none';
}