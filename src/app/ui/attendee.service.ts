import { Injectable } from '@angular/core';
import { CONFIGS } from '../my-config';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Pagination } from './object/pagination';
import { Attendee } from './object/attendee';
import { Label } from './object/label';

@Injectable({
  providedIn: 'root'
})
export class AttendeeService {
  private host = CONFIGS.urlOptions.host;
  private attendeePath = CONFIGS.urlOptions.attendeePath;
  private pagePath = CONFIGS.urlOptions.pagePath + '?_id=attendee';
  private labelPath = CONFIGS.urlOptions.labelPath;
  private page: number = 1;
  private limit: number = 5;

  constructor(private http: HttpClient, private cookieService: CookieService) { }
  private getAttendees(type: string, limit?: number, pageNum?: number): Observable<Attendee[]> {
    var tempPage = this.page;
    if (type === 'previous') {
      tempPage--;
    } else if (type === 'next') {
      tempPage++;
    } else if (type === 'specific') {
      tempPage = pageNum;
    }

    var tempLimit;
    if (limit) {
      tempLimit = limit;
    } else {
      tempLimit = this.limit;
    }
    let url;
    url = `${this.host}${this.attendeePath}?_page=${tempPage}&_limit=${tempLimit}`;
    const httpOption = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get("token") }) };
    return this.http.get<Attendee[]>(url, httpOption).pipe(
      tap(t => {
        const length = t.length
        console.log(`fetched ${length} Attendees `);
        if (length !== 0) this.page = tempPage;
      }),
      catchError(this.handleError<Attendee[]>('getAttendees', []))
    );
  }
  firstAttendees(limit?: number): Observable<Attendee[]> {
    this.page = 0;
    return this.getAttendees("next", limit);
  }
  nextAttendees(limit?: number): Observable<Attendee[]> {
    return this.getAttendees("next", limit);
  }
  previousAttendees(limit?: number): Observable<Attendee[]> {
    return this.getAttendees("previous", limit);
  }
  specificPage(n: number, limit?: number): Observable<Attendee[]> {
    return this.getAttendees("specific", limit, n);
  }

  newAttendee(attendee: Attendee): Observable<Attendee> {
    const httpOption = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get("token") }) };
    const url = `${this.host}${this.attendeePath}`;
    return this.http.post<Attendee>(url, attendee, httpOption).pipe(
      tap(t => {
        console.log(`posted new Attendee`);
      }),
      catchError(this.handleError<Attendee>('newAttendee'))
    );
  }
  editAttendee(attendee: Attendee): Observable<Attendee> {
    const httpOption = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get("token") }) };
    const url = `${this.host}${this.attendeePath}/${attendee.id}`;
    return this.http.put<Attendee>(url, attendee, httpOption).pipe(
      tap(t => {
        console.log(`posted editing Attendee`);
      }),
      catchError(this.handleError<Attendee>('editAttendee'))
    );
  }
  removeAttendee(id: number): Observable<number> {
    const httpOption = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get("token") }) };
    const url = `${this.host}${this.attendeePath}/${id}`;
    return this.http.delete<number>(url, httpOption).pipe(
      tap(t => {
        console.log(`deleted ${id} Attendee`);
      }),
      catchError(this.handleError<number>('removeAttendee'))
    );
  }
  getNumberOfAttendee(): Observable<Pagination> {
    const httpOption = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    const url = `${this.host}${this.pagePath}`;
    return this.http.get<Pagination>(url, httpOption).pipe(
      tap(t => {
        console.log(`total: ${t.number} Event`);
      }),
      catchError(this.handleError<Pagination>('getNumberOfEvent'))
    );
  }
  getLabels(): Observable<Label[]> {
    const httpOption = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get("token") }) };
    const url = `${this.host}${this.labelPath}`;
    return this.http.get<Label[]>(url, httpOption).pipe(
      catchError(this.handleError<Label[]>('getLabels'))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for Event consumption
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };

  }
}
