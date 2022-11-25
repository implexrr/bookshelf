// GLOBALS
// Initialize empty library array
let myLibrary = [];
let bookshelf = document.querySelector("#bookshelf");

// Add functionality to "Add Book" button
let displayFormContainer = document.querySelector("#display-form-container");
let displayForm = document.querySelector("#display-form");
displayForm.addEventListener("click", changeFormDisplay);

// Add functionality to form submit button
let form = document.querySelector("form");
form.addEventListener("submit", addBookToLibrary);

// Assign variables to form inputs
let pairs = document.querySelectorAll('.label-input-pair input');
for (let i = 0; i < pairs.length; i++) {
  window[pairs[i].id] = document.querySelector(`#${pairs[i].id}`);
}

// Book constructor
function Book(title, author, pages, read) {
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
    e.target.parentNode.parentNode.style.backgroundColor = "rgb(134, 133, 191)";
  }
  else {
    e.target.parentNode.parentNode.style.backgroundColor = "grey";
  }
  console.log(e.target.checked);
  myLibrary[e.target.parentNode.parentNode.dataset.index].read = e.target.checked;
}

// function showUserForm(e) {
//   form.style.display = 'grid';
//   displayForm.style.display = 'none';
//   displayFormContainer.style.display = 'none';
// }

function changeFormDisplay() {
  showForm();
  hideFormPrompt();
}

function showForm() {
  form.style.display = 'grid';
}

function hideFormPrompt() {
  displayForm.style.display = 'none';
  displayFormContainer.style.display = 'none';
}
