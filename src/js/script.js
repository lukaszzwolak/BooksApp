
{
  'use strict';

  const favoriteBooks = [];
  const filters = [];

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
    const booksList = document.querySelector('.books-list');
    const filtersForm = document.querySelector('.filters');

    booksList.addEventListener('dblclick', function (event) {
      //zatrzymanie dzialania
      event.preventDefault();

      //sprawdzanie klikniecia w okladke
      const clickedElement = event.target.closest('.book__image');

      if (clickedElement) {
        //pobiera id ksiazki
        const bookId = clickedElement.getAttribute('data-id');

        if (favoriteBooks.includes(bookId)) {
          //usuwanie z ulub
          clickedElement.classList.remove('favorite');
          const index = favoriteBooks.indexOf(bookId);
          favoriteBooks.splice(index, 1);
        } else {
          //dodanie do ulub
          clickedElement.classList.add('favorite');
          favoriteBooks.push(bookId);
        }
      }
    });

    filtersForm.addEventListener('click', function (event) {
      if (
        event.target.tagName === 'INPUT' &&
        event.target.type === 'checkbox' &&
        event.target.name === 'filter'
      ) {
        console.log(event.target.value);
        filterBooks();
      }
    });
  }

  function filterBooks() {
    for (let book of dataSource.books) {
      let shouldBeHidden = false;
      for (let filter of filters) {
        //jesli filtr powinien byc true a nie jest
        if (!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }

        //szukanie ksiazki po id
        const bookElement = document.querySelector(`.book__image[data-id="${book.id}"]`);

        if (bookElement) {
          if (shouldBeHidden) {
            bookElement.classList.add('hidden');
          } else {
            bookElement.classList.remove('hidden');
          }
        }
      }
    }
  }


  //wywolanie
  render();
  initActions();
}