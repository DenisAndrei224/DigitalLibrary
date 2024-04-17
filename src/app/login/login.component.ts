import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.userService.authenticateUser(this.username, this.password).subscribe(
      (response: any) => {
        console.log('User authenticated succesfully!');
        this.router.navigate(['/home']);
      },
      (error: any) => {
        this.errorMessage = 'Invalid username or password';
        alert(this.errorMessage);
      }
    );
  }

  logout(): void {
    this.userService.logout(); // Call the logout method from UserService
    this.router.navigate(['/login']); // Navigate to the login page after logout
  }
}
