const libraryUrl = "https://striveschool-api.herokuapp.com/books";

//Creo la funzione che mi prende i dati dall'Url assegnato
const getBook = function () {
  fetch(libraryUrl)
    .then((response) => {
      console.log("Response", response);
      //Se va a buon fine mi ridà il json
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("C'è qualcosa che non va!");
      }
    })
    //se va a buon fine l'operazione e me lo trasforma in json
    //ora posso usarlo e lavorarci estrapolando gli elementi
    .then((data) => {
      console.log(data);

      const row = document.getElementById("card-row");
      //prendo ogni singolo elemento che mi serve
      data.forEach((element) => {
        const newCol = document.createElement("div");
        newCol.classList.add("col", "col-12", "col-md-3", "col-lg-3");
        newCol.innerHTML = `<div class="card">
            <img src="${element.img}" class="card-img-top" alt="card image" />
            <div class="card-body">
              <h5 class="card-title">${element.title}</h5>
              <p class="card-text">Price: ${element.price}$</p>
              <div class="">
              <a href="#" class="btn btn-warning btn-lg" onclick="deleteBook(this)">Delete</a>
              <a href="#" class="btn btn-info btn-lg" onclick="addBook('${element.title}', '${element.price}')">Buy</a>
              </div>
            </div>
          </div>`;
        row.appendChild(newCol);
      });
    })
    .catch((err) => console.log(err));
};

getBook();

//Aggiungo la funzione per creare il Button per cancellare
function deleteBook(element) {
  element.closest(".col").style.display = "none";
}

//Local books and ADD button

const localStorageKey = "books";

class Book {
  constructor(_title, _price) {
    this.title = _title;
    this.price = _price;
  }
}

//Prendo il 'li' in cui inserire il mio link 'a'
const cartText = document.querySelector(".cartText");

//Recupero i libri dal localStorage, se non c'è nulla mi da un array vuoto
//function addBook(title, price) {
let booksLocalStorage = localStorage.getItem(localStorageKey);
if (!booksLocalStorage) {
  booksLocalStorage = [];
} else {
  booksLocalStorage = JSON.parse(booksLocalStorage);
}

console.log(booksLocalStorage);

function updateCart() {
  cartText.innerHTML = "";
  booksLocalStorage.forEach((book, index) => {
    const bookItem = document.createElement("a");
    bookItem.classList.add("dropdown-item");
    bookItem.innerText = `${book.title} - ${book.price}$`;
    bookItem.addEventListener("click", () => {
      removeBook(index);
    });
    cartText.appendChild(bookItem);
  });
}
// Funzione per aggiungere un libro
const addBook = function (title, price) {
  booksLocalStorage.push({ title, price });
  localStorage.setItem(localStorageKey, JSON.stringify(booksLocalStorage));
  updateCart();
};

const removeBook = function (index) {
  booksLocalStorage.splice(index, 1); // Rimuove l'elemento dall'array
  localStorage.setItem(localStorageKey, JSON.stringify(booksLocalStorage)); // Aggiorna il localStorage
  updateCart(); // Aggiorna la visualizzazione del carrello
};

// Aggiorna il carrello all'avvio per mostrare i libri già presenti nel localStorage
updateCart();
