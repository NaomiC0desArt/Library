const myLibrary = [];

//books constructor
function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error(`You mus use the "new" operator to call the constructor :)`);
  }
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read === true ? "already read it" : "not read yet";
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
  };
}

Book.prototype.changeReadingState = function () {
  if (this.read === "already read it") {
    this.read = "not read yet";
  } else {
    this.read = "already read it";
  }
};

//book creation
function addBookToLibrary(title, author, pages, read) {
  let newBook = new Book(title, author, pages, read);

  myLibrary.push(newBook);
}

//main container for all the cards
const container = document.querySelector(".container");

//function to display all the books
function displayBooks() {
  myLibrary.forEach((book) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.dataset.bookId = book.id;

    const bookInfo = document.createElement("div");
    bookInfo.classList.add("book-info");

    const div_delete = document.createElement("div");
    div_delete.classList.add("div-delete");

    const title = document.createElement("p");
    title.textContent = book.title;

    const delete_btn = document.createElement("button");
    delete_btn.classList.add("delete-btn");
    delete_btn.innerHTML = `<span class="material-symbols-outlined">
delete
</span>`;

    div_delete.appendChild(title);
    div_delete.appendChild(delete_btn);

    const author = document.createElement("p");
    author.textContent = book.author;

    const pages = document.createElement("p");
    pages.textContent = `${book.pages} pages`;

    const read = document.createElement("button");
    read.classList.add("btn-read");

    if (book.read === "already read it") {
      read.classList.add("read");
    }

    read.textContent = book.read;

    bookInfo.appendChild(div_delete);
    bookInfo.appendChild(author);
    bookInfo.appendChild(pages);
    bookInfo.appendChild(read);

    div.appendChild(bookInfo);
    container.appendChild(div);
  });
}
const form = document.querySelector(".form");

//event to send info from the form to myLibrary
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("book-title").value;
  const author = document.getElementById("book-author").value;
  const pages = document.getElementById("book-pages").value;
  const read = document.getElementById("book-read").checked;

  addBookToLibrary(title, author, pages, read);
  container.innerHTML = "";
  displayBooks();

  console.log("book added");
  form.reset();
});

//Event to delete and change reading state with event delegation
container.addEventListener("click", (event) => {
  const card = event.target.closest("[data-book-id]");
  const bookId = card.dataset.bookId;
  const index = myLibrary.findIndex((book) => book.id === bookId);

  //event to delete
  if (event.target.closest(".delete-btn")) {
    myLibrary.splice(index, 1);
    container.innerHTML = "";
    displayBooks();
  }

  //event to change reading state
  if (event.target.closest(".btn-read")) {
    myLibrary[index].changeReadingState();
    event.target.textContent = myLibrary[index].read;

    event.target.classList.toggle("read");
  }
});

//silly book list
addBookToLibrary("Pride and Prejuice", "Jane Austen", 384, true);
addBookToLibrary("How to solve it", "George Polya", 288, false);
displayBooks();
