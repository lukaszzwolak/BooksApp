'use strict';

class BooksList {
  constructor() {
    this.favoriteBooks = [];
    this.filters = [];
    this.initData();
    this.getElements();
    this.render();
    this.initActions();
  }

  initData() {
    this.data = dataSource.books;
  }

  getElements() {
    this.booksList = document.querySelector('.books-list');
    this.filtersForm = document.querySelector('.filters');
    this.templateBook = Handlebars.compile(
      document.querySelector('#template-book').innerHTML
    );
  }

  determineRatingBgc(rating) {
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

  render() {
    this.booksList.innerHTML = '';

    //iteracja po kazdym elemencie z dataSource.books
    for (let book of this.data) {

      /*obliczenie ratingWidth i ratingBgc i
      przeksztalcenie ratingu na sklae procentowa */
      const ratingWidth = book.rating * 10;
      const ratingBgc = this.determineRatingBgc(book.rating);

      //dodanie nowych wlasciwosci do obiektu
      const bookData = {
        ...book,
        ratingWidth,
        ratingBgc,
      };

      //wygenerwoanie kodu html na podstawie szablony idanych o konkretnej ksiazce
      const generatedHTML = this.templateBook(bookData);
      //generowanie elemntu DOM na podstawie HTML
      const element = document.createElement('div');
      element.innerHTML = generatedHTML;

      //dodanie wygenerowanego elementu do listy ksiazek
      this.booksList.appendChild(element.firstElementChild);
    }
  }

  initActions() {
    this.booksList.addEventListener('dblclick', (event) => {
      //zatrzymanie dzialania
      event.preventDefault();

      //sprawdzanie klikniecia w okladke
      const clickedElement = event.target.closest('.book__image');

      if (clickedElement) {
        //pobiera id ksiazki
        const bookId = clickedElement.getAttribute('data-id');

        if (this.favoriteBooks.includes(bookId)) {
          //usuwanie z ulub
          clickedElement.classList.remove('favorite');
          const index = this.favoriteBooks.indexOf(bookId);
          this.favoriteBooks.splice(index, 1);
        } else {
          //dodanie do ulub
          clickedElement.classList.add('favorite');
          this.favoriteBooks.push(bookId);
        }
      }
    });

    this.filtersForm.addEventListener('click', (event) => {
      if (
        event.target.tagName === 'INPUT' &&
        event.target.type === 'checkbox' &&
        event.target.name === 'filter'
      ) {
        const filterValue = event.target.value;

        if (event.target.checked) {
          this.filters.push(filterValue);
        } else {
          const index = this.filters.indexOf(filterValue);
          if (index !== -1) {
            this.filters.splice(index, 1);
          }
        }
        this.filterBooks();
      }
    });
  }

  filterBooks() {
    for (let book of this.data) {
      let shouldBeHidden = false;

      for (let filter of this.filters) {
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
}
const app = new BooksList();

