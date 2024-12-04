import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3000';
  private loggedIn = new BehaviorSubject<boolean>(false);
  private loggedInKey = 'isLoggedIn';

  constructor(private http: HttpClient) {
    this.loggedIn.next(this.isLoggedInInLocalStorage());
  }

  private isLoggedInInLocalStorage(): boolean {
    const loggedInState = localStorage.getItem(this.loggedInKey);
    return loggedInState ? JSON.parse(loggedInState) : false;
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users`);
  }

  getUser(id: number): Observable<any> {
    const url = `${this.baseUrl}/users/${id}`;
    return this.http.get<any>(url);
  }

  // Signup method
  signup(name: string, email: string, password: string): Observable<any> {
    const user = { name, email, password };
    return this.http.post<any>(`${this.baseUrl}/signup`, user);
  }

  authenticateUser(username: string, password: string): Observable<any> {
    // return this.http.get<any[]>(
    //   `${this.baseUrl}?username=${username}&password=${password}`
    // );
    // return this.http.post<any>(`${this.baseUrl}/authenticate`, {
    //   username,
    //   password,
    // });
    return new Observable((observer) => {
      this.getUsers().subscribe((users) => {
        const authenticatedUser = users.find(
          (user) => user.username === username && user.password === password
        );
        if (authenticatedUser) {
          this.loggedIn.next(true);
          localStorage.setItem(this.loggedInKey, 'true');
          observer.next(authenticatedUser);
        } else {
          observer.error('Invalid username or password');
          this.loggedIn.next(false);
          localStorage.setItem(this.loggedInKey, 'false');
          observer.next(false);
        }
        observer.complete();
      });
    });
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getUsername(): Observable<string> {
    // Assuming authenticated user is stored somewhere or retrieved from server
    // Here we will assume it's the first user in the list
    return this.getUsers().pipe(
      map((users) => {
        if (users.length > 0) {
          return users[0].username; // Return the username of the first user
        } else {
          return ''; // Return empty string if no users found
        }
      })
    );
  }

  logout(): void {
    this.loggedIn.next(false); // Clear the loggedIn state
    localStorage.removeItem(this.loggedInKey); // Remove the loggedIn state from localStorage
  }
}
