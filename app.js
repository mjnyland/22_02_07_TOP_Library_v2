const bookList = document.getElementById('books')
const addBookButton = document.getElementById('add-book')
const saveBookButton = document.querySelector('.save-book');
const form = document.getElementById('new-book-form');

let myLibrary =  [];

function Book(title, author, pages, read){
    this.title = title,
    this.author = author,
    this.pages = pages
    this.read = read
}

Book.prototype.updateRead = function(){
    this.read = !this.read;
}

function displayBooks(){
    bookList.innerHTML = '';
    let i = 0;
    for (const books of myLibrary){
        const newBook = document.createElement('LI');
        newBook.textContent = `${books.title}, ${books.author}, ${books.pages}, ${books.read}`;
        newBook.dataset.index = i;

        const removeBookButton = document.createElement('BUTTON');
        removeBookButton.textContent = 'REMOVE BOOK';
        removeBookButton.classList.add('remove-book-button');

        const updateReadButton = document.createElement('BUTTON');
        updateReadButton.textContent = 'UPDATE READ';
        updateReadButton.classList.add('remove-book-button');

        newBook.append(removeBookButton);
        newBook.append(updateReadButton);
        bookList.append(newBook);

        removeBookButton.addEventListener('click', removeBook);
        updateReadButton.addEventListener('click', e => {
            books.updateRead();
            displayBooks();
        })

        i++
    }
}

function removeBook(e){
    const index = e.target.parentNode.dataset.index;
    console.log(index)
    myLibrary.splice(index, 1);
    e.target.remove();
    displayBooks();
}

function addBookToLibrary(e){
    e.preventDefault()

    let newTitle = document.getElementById('book-name').value;
    let newAuthor = document.getElementById('author-name').value;
    let newNumPages = document.getElementById('number-of-pages').value;
    let readBox = document.getElementById('read');

    console.log(readBox.checked)

    const newBook = new Book (newTitle, newAuthor, newNumPages, readBox.checked)

    myLibrary.push(newBook)

    form.reset();
    form.style.display = 'none'
    displayBooks()
}


addBookButton.addEventListener('click', e => {
    form.style.display = 'block'
});
saveBookButton.addEventListener('click', addBookToLibrary);