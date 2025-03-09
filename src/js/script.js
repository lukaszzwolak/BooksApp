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
//wywolanie
render();