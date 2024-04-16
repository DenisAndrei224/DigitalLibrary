import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3000';
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users`);
  }

  getUser(id: number): Observable<any> {
    const url = `${this.baseUrl}/users/${id}`;
    return this.http.get<any>(url);
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
          observer.next(authenticatedUser);
        } else {
          observer.error('Invalid username or password');
          this.loggedIn.next(false);
          observer.next(false);
        }
        observer.complete();
      });
    });
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
}
