import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn!: boolean;
  username: string | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.isLoggedIn().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      if (loggedIn) {
        this.userService.getUsername().subscribe((username) => {
          this.username = username;
        });
      } else {
        this.username = null;
      }
    });
  }

  logout(): void {
    this.userService.logout(); // Call the logout method from UserService
    this.router.navigate(['/login']); // Navigate to the login page after logout
  }
}
