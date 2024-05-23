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
        FILTER (
          regex(?title, "^${keyword}$", "i") // Change here to match the exact title
        )
      }
    `;
    return this.executeQuery(query).pipe(
      map((response) => response.results.bindings)
    );
  }

  executeQuery(query: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/sparql-results+json',
    });

    // Manually format the body to ensure correct encoding
    const body = `query=${encodeURIComponent(query)}`;

    console.log('Sending query:', query); // Logs the query to the console
    console.log('Sending headers:', headers); // Logs the headers
    console.log('Sending body:', body.toString()); // Logs the body

    return this.http.post<any>(this.fusekiEndPoint, body, { headers });
  }
}
