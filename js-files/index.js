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

// Remove book from all associated data structures and shift relevant indices
function removeBook(e) {
  let bookCard = e.target.parentNode;
  let bookIndex = bookCard.dataset.index;

  deleteFromLibraryArray(myLibrary, bookIndex, 1);
  bookCard.remove();
  shiftBookIndices(bookIndex);
}

// Delete book from Library array
function deleteFromLibraryArray(library, index, deletions) {
  library.splice(index, deletions);
}

// Shift indices of consequent book elements
function shiftBookIndices(toShift) {
  let books = document.querySelectorAll(".book");
  for (let i = toShift; i < books.length; i++) {
    books[i].dataset.index--;
  }
}

// Change read status of a book
function changeReadStatus (e) {
  let bookCard = e.target.parentNode.parentNode;
  changeContainerColor(e, bookCard);
  changeDatasetStatus(e, bookCard);
}

// Change container color of book
function changeContainerColor(e, container) {
  e.target.checked ? container.style.backgroundColor = "rgb(134, 133, 191)": container.style.backgroundColor = "grey";
}

// Change dataset status of book
function changeDatasetStatus(e, container) {
  myLibrary[container.dataset.index].read = e.target.checked;
}

// Change what to display in top banner
function changeFormDisplay() {
  showForm();
  hideFormPrompt();
}

// Display user form
function showForm() {
  form.style.display = 'grid';
}

// Hide prompt to display user form
function hideFormPrompt() {
  displayForm.style.display = 'none';
  displayFormContainer.style.display = 'none';
}
