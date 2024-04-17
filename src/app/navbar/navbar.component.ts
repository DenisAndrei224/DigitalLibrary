import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn!: boolean;
  username: string | null = null;

  constructor(private userService: UserService) {}

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
}
