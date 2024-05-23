import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SparqlService {
  private fusekiEndPoint = 'http://localhost:3030/ds/query';

  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<any> {
    const query = `
      PREFIX ex: <http://www.semanticweb.org/denis/ontologies/2024/3/digital-library#>
      SELECT ?book ?title ?authorName ?description
      WHERE {
        ?book ex:hasTitle ?title .
        ?book ex:hasAuthor ?author .
        ?author ex:hasName ?authorName .
        ?book ex:description ?description .
      }
    `;
    return this.executeQuery(query);
  }

  searchBooks(keyword: string): Observable<any[]> {
    const query = `
      PREFIX ex: <http://www.semanticweb.org/denis/ontologies/2024/3/digital-library#>
      SELECT ?book ?title ?authorName ?description
      WHERE {
        ?book ex:hasTitle ?title .
        ?book ex:hasAuthor ?author .
        ?author ex:hasName ?authorName .
        ?book ex:description ?description .
        FILTER (regex(?title, "${keyword}", "i"))
      }
    `;
    // return this.executeQuery(query);
    return this.executeQuery(query).pipe(
      map((response) => response.results.bindings)
    );
  }

  executeQuery(query: string): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    const params = new HttpParams().set('query', query);

    return this.http.post<any>(this.fusekiEndPoint, params, { headers });
  }
}
