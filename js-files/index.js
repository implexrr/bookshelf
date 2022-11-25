// GLOBALS
// Initialize empty library array
let myLibrary = [];
let bookshelf = document.querySelector("#bookshelf");

// Add functionality to "Add Book" button
let displayFormContainer = document.querySelector("#display-form-container");
let displayForm = document.querySelector("#display-form");


// Add functionality to form submit button
let form = document.querySelector("form");
displayForm.addEventListener("click", function() {changeBannerDisplay("grid", "none")});
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

function createElement(elType, attributeType, attributeName, textContent) {
  let element = document.createElement(elType);
  element.setAttribute(attributeType, attributeName);
  element.textContent = textContent;
  return element;
}

function createBook() {

  let book = createElement("div", "class", "book", "");
  let bookTitle = createElement("div", "class", "title", `Title: ${myLibrary.at(-1).title}`);
  let bookAuthor = createElement("div", "class", "author", `Author: ${myLibrary.at(-1).author}`);
  let bookPages = createElement("div", "class", "pages", `Pages: ${myLibrary.at(-1).pages}`);
  let completionPair = createElement("div", "class", "completion-pair", "");
  let changeCompletionLabel = createElement("label", "for", "change-completion", "Read?");
  let changeCompletion = createElement("input", "class", "change-completion", "");
  let bookRemove = createElement("button", "class", "remove", "Remove book");

  book.dataset.index = myLibrary.length - 1;
  changeCompletion.type = "checkbox";
  if (read.checked == true) changeCompletion.checked = true;
  

  changeCompletion.addEventListener("input", changeReadStatus);
  bookRemove.addEventListener("click", removeBook);

  book.appendChild(bookTitle);
  book.appendChild(bookAuthor);
  book.appendChild(bookPages);
  completionPair.appendChild(changeCompletionLabel);
  completionPair.appendChild(changeCompletion);
  book.appendChild(completionPair);
  book.appendChild(bookRemove);
  
  changeBannerDisplay("none", "flex");
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
function changeBannerDisplay(displayModeForm, displayModePrompt) {
  changeFormDisplay(displayModeForm);
  changePromptDisplay(displayModePrompt);
}

// Display user form
function changeFormDisplay(displayMode) {
  form.style.display = displayMode;
}

// Hide prompt to display user form
function changePromptDisplay(displayMode) {
  displayForm.style.display = displayMode;
  displayFormContainer.style.display = displayMode;
}
// ------------------------