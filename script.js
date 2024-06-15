// const newBookBtn = document.querySelector(".new-book-btn");
// const myModal = document.querySelector(".new-book-dialog");

// newBookBtn.addEventListener('click', () => myModal.showModal())

const myLibrary = [];

function Book(title, authorFirstName, authorLastName, category, readStatus) {
    this.title = title;
    this.authorFirstName = authorFirstName;
    this.authorLastName = authorLastName;
    this.category = category;
    this.readStatus = readStatus;
}

function AddBookToLibrary(title, authorFirstName, authorLastName, category, readStatus) {
    book = Book.call(this, title, authorFirstName, authorLastName, category, readStatus);
    myLibrary.push(book);
}

Object.setPrototypeOf(AddBookToLibrary.prototype, Book.prototype);

AddBookToLibrary("Bookjarda", "sss", "aaas", "art", "sadasd")

console.log(myLibrary);
