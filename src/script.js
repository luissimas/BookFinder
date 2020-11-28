//API key
const apiKey = 'AIzaSyAZVpG9uqFgbgGyNR9y46WVpvyaQIbO4Ms';

//Axios setup
const GoogleAPI = axios.create({
  baseURL: 'https://www.googleapis.com/books/v1/volumes'
});

//DOM elements
let inputText = document.querySelector('#form input');
let btnQuery = document.querySelector('#form button');
let divBooks = document.querySelector('#cardDisplay');

//Variables
let itemsPerPage = 10;
let indexPage = 1;

function getBooks() {
  GoogleAPI.get('', {params: {q: inputText.value, maxResults: itemsPerPage, startIndex: (indexPage * 10), printType: 'books', key: apiKey}})
    .then((response) => {
      displayBooks(response.data.items);
      //books = response.data.items;
      console.log(response.data.items);
    }).catch((error) => {
      console.log(error);
    });
}

function displayBooks(booksArray) {
  divBooks.innerHTML = '';

  for (const book of booksArray) {
    displayBook(book);
  }
}

function displayBook(book) {
  //Card setup
  let cardElement = document.createElement('div');
  let cardBody = document.createElement('div');
  let cardFooter = document.createElement('div');

  cardElement.setAttribute('class', 'card p-1 m-3 shadow');
  cardElement.setAttribute('style', 'width: 20rem; max-height: 100rem;');
  cardBody.setAttribute('class', 'card-body');
  cardFooter.setAttribute('class', 'd-flex justify-content-between m-3');

  let titleElement = document.createElement('h5');
  let authorsElement = document.createElement('p')
  let pagesElement = document.createElement('small')
  let linkElement = document.createElement('a');
  let imageElement = document.createElement('img')

  titleElement.setAttribute('class', 'card-title');
  authorsElement.setAttribute('class', 'card-text');
  pagesElement.setAttribute('class', 'text-muted');
  linkElement.appendChild(document.createTextNode('Comprar'));
  linkElement.setAttribute('class', 'btn btn-primary');
  imageElement.setAttribute('class', 'card-img-top mb-3');


  titleElement.appendChild(document.createTextNode(book.volumeInfo.title));
  authorsElement.appendChild(document.createTextNode(book.volumeInfo.authors));

  if (book.volumeInfo.pageCount) {
    pagesElement.appendChild(document.createTextNode(book.volumeInfo.pageCount + ' pages'));
  }

  imageElement.setAttribute('src', book.volumeInfo.imageLinks.thumbnail);

  linkElement.setAttribute('href', book.volumeInfo.canonicalVolumeLink);

  cardBody.appendChild(imageElement);
  cardBody.appendChild(titleElement);
  cardBody.appendChild(authorsElement);
  cardFooter.appendChild(pagesElement);
  cardFooter.appendChild(linkElement);


  cardElement.appendChild(cardBody);
  cardElement.appendChild(cardFooter);

  divBooks.appendChild(cardElement);

}


inputText.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    btnQuery.click();
  }
});


btnQuery.addEventListener('click', getBooks);
