// HTML contents
const newBookBtn = document.querySelector(".new-book-btn");
const addBookBtn = document.querySelector(".add-book-btn");
const myModal = document.querySelector(".new-book-dialog");


const myLibrary = [];

function Book(title, authorFirstName, authorLastName, category, readStatus) {
    this.title = title;
    this.authorFirstName = authorFirstName;
    this.authorLastName = authorLastName;
    this.category = category;
    this.readStatus = readStatus;
}

function AddBookToLibrary(title, authorFirstName, authorLastName, category, readStatus) {
    let book = new Book(title, authorFirstName, authorLastName, category, readStatus);
    myLibrary.push(book);
}

Object.setPrototypeOf(AddBookToLibrary.prototype, Book.prototype);

// Button event listeners
newBookBtn.addEventListener('click', () => myModal.showModal());

window.addEventListener('click', function(event) {
    if (event.target == myModal) {
      myModal.close();
    }
})

addBookBtn.addEventListener('click', () => {
    const titleInput = document.querySelector("#title").value;
    const authorFirstNameInput = document.querySelector("#author-first").value;
    const authorLastNameInput = document.querySelector("#author-last").value;
    const selectInput = document.querySelector("#category").value;
    const readInput = document.querySelector("#read");
    const unreadInput = document.querySelector("#unread");

    if(readInput.checked) {
        AddBookToLibrary(titleInput, authorFirstNameInput, authorLastNameInput, selectInput, "Read");
    } else if (unreadInput.checked) {
        AddBookToLibrary(titleInput, authorFirstNameInput, authorLastNameInput, selectInput, "Unread");
    }

    console.log(myLibrary)
});