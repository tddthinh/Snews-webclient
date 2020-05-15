import { Injectable } from '@angular/core';
import { Event } from './object/event';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CONFIGS } from '../my-config';
import { CookieService } from 'ngx-cookie-service';
import { Pagination } from './object/pagination';
import { Attendee } from './object/attendee';
import { Progress } from './object/progress';
import { EventState } from './object/event-state';
import { AttendeeStatistics } from './object/attendee-statistics';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private host = CONFIGS.urlOptions.host;
  private eventPath = CONFIGS.urlOptions.eventPath;
  private pagePath = CONFIGS.urlOptions.pagePath + '?_id=event';
  private page: number = 1;
  private limit: number = 5;

  constructor(private http: HttpClient, private cookieService: CookieService) { }
  private getEvents(type: string, isMy?: boolean, limit?: number, pageNum?: number): Observable<Event[]> {
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
    if (!isMy) {
      url = `${this.host}${this.eventPath}?_page=${tempPage}&_limit=${tempLimit}`;
    } else {
      url = `${this.host}${this.eventPath}/my?_page=${tempPage}&_limit=${tempLimit}`;
    }
    const httpOption = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get("token") }) };
    return this.http.get<Event[]>(url, httpOption).pipe(
      tap(t => {
        const length = t.length;
        console.log(`fetched ${length} Events `);
        if (length !== 0) this.page = tempPage;
      }),
      catchError(this.handleError<Event[]>('getEvents', []))
    );
  }
  private getAttendees(type: string, eventID: number, search: string, limit?: number, pageNum?: number): Observable<Attendee[]> {
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
    if(search === ""){
      url = `${this.host}${this.eventPath}/${eventID}/attendees?_page=${tempPage}&_limit=${tempLimit}`;
    }else{
      url = `${this.host}${this.eventPath}/${eventID}/attendees/search?_page=${tempPage}&_limit=${tempLimit}&_text=${encodeURI(search)}`;
    }
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

  firstEvents(limit?: number): Observable<Event[]> {
    this.page = 0;
    return this.getEvents("next", false, limit);
  }
  nextEvents(limit?: number): Observable<Event[]> {
    return this.getEvents("next", false, limit);
  }
  previousEvents(limit?: number): Observable<Event[]> {
    return this.getEvents("previous", false, limit);
  }
  specificPage(n: number, limit?: number): Observable<Event[]> {
    return this.getEvents("specific", false, limit, n);
  }

  specificPageMy(n: number, limit?: number): Observable<Event[]> {
    return this.getEvents("specific", true, limit, n);
  }
  firstEventsMy(limit?: number): Observable<Event[]> {
    this.page = 0;
    return this.getEvents("next", true, limit);
  }
  nextEventsMy(limit?: number): Observable<Event[]> {
    return this.getEvents("next", true, limit);
  }
  previousEventsMy(limit?: number): Observable<Event[]> {
    return this.getEvents("previous", true, limit);
  }


  specificPageAttendee(eventID: number,search: string, n: number, limit?: number): Observable<Attendee[]> {
    return this.getAttendees("specific", eventID,search, limit, n);
  }
  firstAttendee(eventID: number,search: string, limit?: number): Observable<Attendee[]> {
    this.page = 0;
    return this.getAttendees("next", eventID,search, limit);
  }
  nextAttendee(eventID: number,search: string, limit?: number): Observable<Attendee[]> {
    return this.getAttendees("next", eventID,search, limit);
  }
  previousAttendee(eventID: number,search: string, limit?: number): Observable<Attendee[]> {
    return this.getAttendees("previous", eventID,search, limit);
  }

  newEvent(event: Event): Observable<Event> {
    const httpOption = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get("token") }) };
    const url = `${this.host}${this.eventPath}`;

    return this.http.post<Event>(url, event, httpOption).pipe(
      tap(t => {
        console.log(`posted new Event`);
      }),
      catchError(this.handleError<Event>('newEvent'))
    );
  }
  editEvent(event: Event): Observable<Event> {
    const httpOption = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get("token") }) };
    const url = `${this.host}${this.eventPath}/${event.id}`;

    return this.http.put<Event>(url, event, httpOption).pipe(
      tap(t => {
        console.log(`posted editing Event`);
      }),
      catchError(this.handleError<Event>('editEvent'))
    );
  }
  removeEvent(id: number): Observable<number> {
    const httpOption = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get("token") }) };
    const url = `${this.host}${this.eventPath}/${id}`;
    return this.http.delete<number>(url, httpOption).pipe(
      tap(t => {
        console.log(`deleted ${id} Events`);
      }),
      catchError(this.handleError<number>('removeEvent'))
    );
  }
  getNumberOfEvent(): Observable<Pagination> {
    const httpOption = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    const url = `${this.host}${this.pagePath}`;
    return this.http.get<Pagination>(url, httpOption).pipe(
      tap(t => {
        console.log(`total: ${t.number} Event`);
      }),
      catchError(this.handleError<Pagination>('getNumberOfEvent'))
    );
  }
  countAttendees(id: number, search: string): Observable<number> {
    
    const httpOption = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get("token") }) };
    let url;
    if(search === ""){
      url = `${this.host}${this.eventPath}/${id}/attendees/count`;
    }else{
      url = `${this.host}${this.eventPath}/${id}/attendees/count/search?_text=${search}`;
    }
    return this.http.get<number>(url, httpOption).pipe(
      catchError(this.handleError<number>('countAttendees'))
    );
  }

  importAttendee(file: File, eventId: number, name?: string): Observable<Progress> {
    let formData: FormData = new FormData();
    formData.append('file', file, name ? name : file.name);
    const httpOption = {
      headers: new HttpHeaders(
        {
          'Authorization': this.cookieService.get("token")
        }
      )
    };
    const url = `${this.host}${this.eventPath}/${eventId}/attendees/import`
    console.log(url);
    return this.http.post<Progress>(`${url}`, formData, httpOption).pipe(
      tap(t => {
        console.log(`imported attendees`);
      }),
      catchError(this.handleError<Progress>('importAttendee'))
    )
  }
  getEventState(id: number): Observable<EventState> {
    const httpOption = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get("token") }) };
    const url = `${this.host}${this.eventPath}/${id}/state`;
    return this.http.get<EventState>(url, httpOption).pipe(
      catchError(this.handleError<EventState>('getEventState'))
    );
  }
  musterAttendee(id: number, rfid: string, state: string): Observable<Attendee> {
    const httpOption = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get("token") }) };
    const url = `${this.host}${this.eventPath}/${id}/muster?_rifd=${rfid}&_state=${state}`;
    return this.http.get<Attendee>(url, httpOption).pipe(
      catchError(this.handleError<Attendee>('musterAttendee'))
    );
  }
  statisticAttendee(id: number): Observable<AttendeeStatistics> {
    const httpOption = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get("token") }) };
    const url = `${this.host}${this.eventPath}/${id}/statistics`;
    return this.http.get<AttendeeStatistics>(url, httpOption).pipe(
      catchError(this.handleError<AttendeeStatistics>('musterAstatisticAttendeettendee'))
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
