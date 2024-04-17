import { Component, OnInit } from '@angular/core';
import { SparqlService } from '../sparql.service';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../user.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
})
export class LibraryComponent implements OnInit {
  displayedColumns: string[] = ['title', 'authorName', 'description', 'action'];
  dataSource!: MatTableDataSource<any>;
  isLoggedIn: boolean = false;

  constructor(
    private sparqlService: SparqlService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getAllBooks();
    this.checkAuthenticationStatus();
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

  checkAuthenticationStatus(): void {
    this.userService.isLoggedIn().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  rentBook(book: any): void {
    // Implement rent functionality here
    if (this.isLoggedIn) {
      console.log('Renting book:', book);
      alert('Rented book ' + book.title.value + ' by ' + book.authorName.value);
      // You can call a service method here to handle the rent operation
    } else {
      alert('Please login to rent books.');
    }
  }
}
