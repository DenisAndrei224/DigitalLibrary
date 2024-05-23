import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent {
  searchQuery: string = '';
  books: { title: string; author: string }[] = [];

  constructor() {}

  onSearch() {
    // For now, let's use a mock list of books
    const allBooks = [
      { title: 'Book One', author: 'Author A' },
      { title: 'Book Two', author: 'Author B' },
      { title: 'Another Book', author: 'Author A' },
    ];

    this.books = allBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
