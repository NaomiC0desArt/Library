
const myLibrary = [];

function Book(title, author, pages, read){
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read === true ? "already read it" : "not read yet";
    this.info = function(){
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    }
}

function addBookToLibrary(title, author, pages, read){
    
    let newBook = new Book(title, author, pages, read);

    myLibrary.push(newBook);
}

addBookToLibrary("culo", "Juan calo", 65, true);
addBookToLibrary("pedro", "carla", 800, false);

const container = document.querySelector(".container");

function displayBooks(){
    const div = document.createElement("div");
    div.classList.add("card");
    
    myLibrary.forEach(book => {

    const bookInfo = document.createElement("div");
    bookInfo.classList.add("book-info");

    const title = document.createElement("p");
    title.textContent = book.title;

    const author = document.createElement("p");
    author.textContent = book.author;

    const pages = document.createElement("p");
    pages.textContent = book.pages;

    const read = document.createElement("p");
    read.textContent = book.read;

    bookInfo.appendChild(title);
    bookInfo.appendChild(author);
    bookInfo.appendChild(pages);
    bookInfo.appendChild(read);

    div.appendChild(bookInfo);
});

    container.appendChild(div);
}

displayBooks();

