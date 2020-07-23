let myLibrary = [];
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function () {
        return `${title}, ${author}, ${pages} long, ${read}`
    }
}
// displays all the books on the page
function showBooks() {
    remake();
    for (let i = 0; i < myLibrary.length; i++) {
        let library = document.getElementById("library");
        let book = document.createElement("div");
        let title = document.createElement("h1");
        let author = document.createElement("h2");
        let pages = document.createElement("p");
        let read = document.createElement("p");
        let readResults = isRead(myLibrary[i].read);
        title.appendChild(document.createTextNode(myLibrary[i].title));
        author.appendChild(document.createTextNode(myLibrary[i].author));
        pages.appendChild(document.createTextNode(myLibrary[i].pages));
        read.appendChild(document.createTextNode(readResults));
        book.appendChild(title);
        book.appendChild(author);
        book.appendChild(pages);
        book.appendChild(read);
        readButton(myLibrary[i], book);
        deleteButton(myLibrary[i], book);
        library.appendChild(book);
    }
    localStorage.setItem('library', JSON.stringify(myLibrary));
}
// makes a book with form data
function makeBook() {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = document.getElementById("read").checked;
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    showBooks();
    resetForm();
    hideForm();
}
// clears the form after submission
function resetForm() {
    document.getElementById("title").value = ""
    document.getElementById("author").value = ""
    document.getElementById("pages").value = ""
    document.getElementById("read").checked = false;
}
// clears the page so that the library is not displayed twice.
function remake() {
    let library = document.getElementById("library");
    while (library.firstChild) {
        library.removeChild(library.lastChild);
    }
}
// this converts read status into strings
function isRead(book) {
    if (book) {
        return "Read"
    } else {
        return "Unread"
    }
}
// makes delete button
function deleteButton(book, container) {
    let del = document.createElement("button");
    del.innerHTML = "Delete Book?"
    del.addEventListener('click', function() {deleteBook(book)})
    container.appendChild(del);
}
// deletes the book
function deleteBook(book) {
    const sure = confirm(`Delete ${book.title}?`);
    if (sure === true) {
    myLibrary.splice(myLibrary.indexOf(book), 1);
    showBooks();
    }
}
// makes read/unread button
function readButton(book, container) {
    let red = document.createElement("button");
    if (book.read) {
        red.innerHTML = "unread?"
    } else {
        red.innerHTML = "read"
    }
    red.addEventListener('click', function () { changeStatus(book) })
    container.appendChild(red);
}
// changes read status
function changeStatus(book) {
    if (book.read === true) {
        book.read = false
    } else {
        book.read = true
    }
    showBooks();
}
// local storage
function storage() {
    if (localStorage.getItem('library')) {
        myLibrary = JSON.parse(localStorage.getItem('library'));
    }
}

// displays the form
function displayForm() {
    document.getElementById("form-pop").style.display = "block";
}

// hides the form
function hideForm() {
    document.getElementById("form-pop").style.display = "none";
}

storage();
showBooks();