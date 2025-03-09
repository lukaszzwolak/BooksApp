{
  'use strict';

  const favoriteBooks = [];
  const filters = [];

  function determineRatingBgc(rating) {
    if (rating < 6) {
      return 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%)';
    } else if (rating > 6 && rating <= 8) {
      return 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%)';
    } else if (rating > 8 && rating <= 9) {
      return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else {
      return 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%)';
    }
  }

  function render() {
    //pobieranie referencji do szablonu
    const templateBook = Handlebars.compile(
      document.querySelector('#template-book').innerHTML
    );

    //pobranie referencji do listy ksiazek
    const booksList = document.querySelector('.books-list');
    booksList.innerHTML = '';

    //iteracja po kazdym elemencie z dataSource.books
    for (let book of dataSource.books) {

      /*obliczenie ratingWidth i ratingBgc i
      przeksztalcenie ratingu na sklae procentowa */
      const ratingWidth = book.rating * 10;
      const ratingBgc = determineRatingBgc(book.rating);

      //dodanie nowych wlasciwosci do obiektu
      const bookData = {
        ...book,
        ratingWidth,
        ratingBgc,
      };

      //wygenerwoanie kodu html na podstawie szablony idanych o konkretnej ksiazce
      const generatedHTML = templateBook(bookData);
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
        const filterValue = event.target.value;

        if (event.target.checked) {
          filters.push(filterValue);
        } else {
          const index = filters.indexOf(filterValue);
          if (index !== -1) {
            filters.splice(index, 1);
          }
        }

        console.log('Aktualne filtry:', filters);
        filterBooks();
      }
    });
  }

  function filterBooks() {
    for (let book of dataSource.books) {
      let shouldBeHidden = false;

      for (let filter of filters) {
        if (!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }

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


  //wywolanie
  render();
  initActions();
}