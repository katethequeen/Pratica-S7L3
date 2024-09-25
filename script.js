const libraryUrl = "https://striveschool-api.herokuapp.com/books";

const getBook = function () {
  fetch(libraryUrl)
    .then((response) => {
      console.log("Response", response);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("C'è qualcosa che non va!");
      }
    })
    .then((data) => {
      console.log(data);

      const row = document.getElementById("card-row");
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

function deleteBook(element) {
  element.closest(".col").style.display = "none";
}

const addedBooks = [];
const cartText = document.querySelector(".cartText");
function addBook(title, price) {
  addedBooks.push({ title, price });
  updateCart();
}

function updateCart() {
  cartText.innerHTML = "";
  addedBooks.forEach((book) => {
    const bookItem = document.createElement("a");
    bookItem.classList.add("dropdown-item");
    bookItem.innerText = `${book.title} - ${book.price}$`;
    cartText.appendChild(bookItem);
  });
}
