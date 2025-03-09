
{
  'use strict';

  const favoriteBooks = [];

  function render() {
    //pobieranie referencji do szablonu
    const templateBook = Handlebars.compile(
      document.querySelector('#template-book').innerHTML
    );

    //pobranie referencji do listy ksiazek
    const booksList = document.querySelector('.books-list');

    //iteracja po kazdym elemencie z dataSource.books
    for (let book of dataSource.books) {
      //wygenerwoanie kodu html na podstawie szablony idanych o konkretnej ksiazce
      const generatedHTML = templateBook(book);
      //generowanie elemntu DOM na podstawie HTML
      const element = document.createElement('div');
      element.innerHTML = generatedHTML;
      //dodanie wygenerowanego elementu do listy ksiazek
      booksList.appendChild(element.firstElementChild);
    }
  }

  function initActions() {
    const bookImages = document.querySelectorAll('.books-list .book__image');
    for (let bookImage of bookImages) {
      //nasluchiwacz
      bookImage.addEventListener('dblclick', function (event) {
        event.preventDefault();

        //add favorite class
        bookImage.classList.add('favorite');
        //pbiera identyfikator ksiazki z data-id
        const bookId = bookImage.getAttribute('data-id');

        if (favoriteBooks.includes(bookId)) {
          //usuwa jesli jest w ulub
          bookImage.classList.remove('favorite');
          //znalezienie indexu
          const index = favoriteBooks.indexOf(bookId);
          favoriteBooks.splice(index, 1);
        } else {
          //dodanie klasy favorite
          bookImage.classList.add('favorite');
          favoriteBooks.push(bookId);
        }
        console.log(favoriteBooks);
      });
    }
  }
  //wywolanie
  render();
  initActions();
}