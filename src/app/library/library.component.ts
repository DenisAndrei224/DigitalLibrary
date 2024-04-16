import { Component, OnInit } from '@angular/core';
import { SparqlService } from '../sparql.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
})
export class LibraryComponent implements OnInit {
  displayedColumns: string[] = ['title', 'authorName', 'description', 'action'];
  dataSource!: MatTableDataSource<any>;

  constructor(private sparqlService: SparqlService) {}

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks(): void {
    this.sparqlService.getAllBooks().subscribe(
      (response: any) => {
        this.dataSource = response.results.bindings;
      },
      (error: any) => {
        console.error('Error fetching books:', error);
      }
    );
  }

  rentBook(book: any): void {
    // Implement rent functionality here
    console.log('Renting book:', book);
    alert('Rented book ' + book.title.value + ' by ' + book.authorName.value);
    // You can call a service method here to handle the rent operation
  }
}
