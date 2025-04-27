// HTML contents
const newBookBtn = document.querySelector(".new-book-btn");
const addBookBtn = document.querySelector(".add-book-btn");
const closeModalBtn = document.querySelector(".close-modal-btn");
const myModal = document.querySelector(".new-book-dialog");
const form = document.querySelector(".add-book-form");
const cardContainer = document.querySelector(".content");
const totalBooksStatsPar = document.querySelector(".total-books-stats");
const readStatsPar = document.querySelector(".read-stats");
const unreadStatsPar = document.querySelector(".unread-stats");

const titleInput = document.querySelector("#title").value;
const authorFirstNameInput = document.querySelector("#author-first").value;
const authorLastNameInput = document.querySelector("#author-last").value;
const selectInput = document.querySelector("#category").value;
const readInput = document.querySelector("#read");
const unreadInput = document.querySelector("#unread");

let unreadCounter = 0;
let readCounter = 0;
const myLibrary = [];
class Book {
    constructor(title, authorFirstName, authorLastName, category, readStatus) {
        this.title = title;
        this.authorFirstName = authorFirstName;
        this.authorLastName = authorLastName;
        this.category = category;
        this.readStatus = readStatus;
    }
}

function AddBookToLibrary(book) {
    if (!form.checkValidity()) {
        return;
    } else {   
        myLibrary.push(book);
        updateStats();
        renderBook(book);
    }
}

function updateStats() {
    totalBooksStatsPar.textContent = `Total Books: ${myLibrary.length}`;
    readStatsPar.textContent = `Read: ${readCounter}`;
    unreadStatsPar.textContent = `Unread: ${unreadCounter}`;
}

function toggleRead(book, readStatusPar, button) {
    if(book.readStatus === "Read") {
        book.readStatus = "Unread";
        readStatusPar.textContent = "Unread";
        button.classList.remove("green");
        button.classList.add("red");
        unreadCounter++;
        readCounter--;
    } else if (book.readStatus === "Unread") {
        book.readStatus = "Read";
        readStatusPar.textContent = "Read";
        button.classList.remove("red");
        button.classList.add("green");
        readCounter++;
        unreadCounter--;
    }
    updateStats();
}

function deleteBook(card, book) {
    cardContainer.removeChild(card);
    const index = myLibrary.indexOf(book);
    if (index > -1) {
        myLibrary.splice(index, 1);
        if (book.readStatus === "Read") {
            readCounter--;
        } else {
            unreadCounter--;
        }
        updateStats();
    }
}

function renderBook(book) {
    const card = document.createElement('div');
    card.classList.add("card");

    const bookTextDiv = document.createElement('div');
    bookTextDiv.classList.add("book-text");

    const bookH3 = document.createElement('h3');
    bookH3.classList.add('book-title');
    bookH3.textContent = book.title;

    const bookDetailsContainer = document.createElement('div');
    bookDetailsContainer.classList.add("book-details-container");

    const toggleReadContainer = document.createElement('div');
    toggleReadContainer.classList.add('toggle-read-container');

    const readStatusPar = document.createElement('p');
    readStatusPar.classList.add('read-status-par');
    readStatusPar.textContent = book.readStatus;

    const toggleReadBtn = document.createElement('button');
    toggleReadBtn.classList.add('toggle-read-btn');
    toggleReadBtn.textContent = "Toggle";

    if (book.readStatus === "Read") {
        toggleReadBtn.classList.add("green");
    } else {
        toggleReadBtn.classList.add("red");
    }

    toggleReadBtn.addEventListener('click', () => {
        toggleRead(book, readStatusPar, toggleReadBtn);
    });

    const authorPar = document.createElement('p');
    authorPar.classList.add('author');
    authorPar.textContent = `${book.authorFirstName}, ${book.authorLastName}`

    const categoryPar = document.createElement('p');
    categoryPar.classList.add('category-par');
    categoryPar.textContent = book.category;

    const deleteBtnContainer = document.createElement('div');
    deleteBtnContainer.classList.add('delete-btn-container');

    const deleteBookBtn = document.createElement('button');
    deleteBookBtn.classList.add('delete-book-btn');
    deleteBookBtn.textContent = "Delete Book";

    deleteBookBtn.addEventListener('click', () => {
        deleteBook(card, book);
    });

    cardContainer.appendChild(card);
    card.appendChild(bookTextDiv);
    bookTextDiv.appendChild(bookH3);
    bookTextDiv.appendChild(bookDetailsContainer);
    bookDetailsContainer.appendChild(authorPar);
    bookDetailsContainer.appendChild(categoryPar);
    bookDetailsContainer.appendChild(toggleReadContainer);
    toggleReadContainer.appendChild(toggleReadBtn);
    toggleReadContainer.appendChild(readStatusPar);
    card.appendChild(deleteBtnContainer);
    deleteBtnContainer.appendChild(deleteBookBtn);
}


// Button event listeners
newBookBtn.addEventListener('click', () => {
    myModal.style.display = "flex";
    myModal.showModal();
    
});

closeModalBtn.addEventListener('click', () => {
    myModal.style.display = "none";
    myModal.close()
});

window.addEventListener('click', function(event) {
    if (event.target == myModal) {
      myModal.close();
      myModal.style.display = "none";
    }
})

addBookBtn.addEventListener('click', (event) => {
    validateInputs();
    
    event.preventDefault();

    if (!form.checkValidity()) {
        return;
    } else {
        let readStatus = "";
        if(readInput.checked) {
            readStatus = "Read";
            readCounter++;
        } else if (unreadInput.checked) {
            readStatus = "Unread";
            unreadCounter++;
        };
    
        const newBook = new Book(titleInput, authorFirstNameInput, authorLastNameInput, selectInput, readStatus);
        AddBookToLibrary(newBook);
        
        myModal.close();
        myModal.style.display = "none";
    };
});

// Form validation

form.addEventListener("submit", (event) => {
    if (!form.checkValidity()) {
        event.preventDefault();
    } else {
        myModal.close();
    }
});

// Inputs Validation

function validateInputs() {
    const inputs = document.querySelectorAll("input");

    inputs.forEach(input => {
        const errorSpan = document.querySelector(`.error-span[data-error-for="${input.id}`);

        if (input.validity.valueMissing) {
            errorSpan.textContent = "This field is required";
            input.setCustomValidity("This field is required");
        } else {
            errorSpan.textContent = "";
            input.setCustomValidity("");
        };

        input.addEventListener("input", () => {
            input.setCustomValidity("");
            
            if (input.validity.valueMissing) {
                errorSpan.textContent = "This field is required";
                input.setCustomValidity("This field is required");
            } else {
                errorSpan.textContent = "";
                input.setCustomValidity("");
            };
        });
    });
}