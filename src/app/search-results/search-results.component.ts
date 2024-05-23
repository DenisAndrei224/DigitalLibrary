import { Component } from '@angular/core';
import { SparqlService } from '../sparql.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent {
  searchQuery: string = '';
  books: any[] = [];

  constructor(private sparqlService: SparqlService) {}

  onSearch() {
    if (this.searchQuery) {
      this.sparqlService.searchBooks(this.searchQuery).subscribe({
        next: (bindings: any[]) => {
          this.books = bindings.map((binding) => ({
            title: binding.title?.value,
            authorName: binding.authorName?.value,
            description: binding.description?.value,
          }));
        },
        error: (error) => {
          console.error('Error fetching books:', error);
          this.books = []; // Clear books on error
        },
      });
    } else {
      console.log('Search query is empty');
      this.books = []; // Clear books if search query is empty
    }
  }
}
