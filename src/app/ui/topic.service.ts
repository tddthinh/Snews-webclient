import { Injectable } from '@angular/core';
import { Topic } from './object/Topic';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Pagination } from './object/pagination';
import { CONFIGS } from '../my-config';
import { Link } from './object/Link';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  private host = CONFIGS.urlOptions.host;
  private topicPath = CONFIGS.urlOptions.topicPath;
  private fileUploadPath = CONFIGS.urlOptions.fileUploadPath;
  private pagePath = CONFIGS.urlOptions.pagePath + '?_id=topic';
  private page: number = 0;
  private limit: number = 7;
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  private getTopics(type: string, limit?: number, pageNum?: number): Observable<Topic[]> {
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
    const url = `${this.host}${this.topicPath}?_page=${tempPage}&_limit=${tempLimit}`;
    return this.http.get<Topic[]>(url).pipe(
      tap(t => {
        const length = t.length;
        console.log(`fetched ${length} topics `);
        if (length !== 0) this.page = tempPage;
      }),
      catchError(this.handleError<Topic[]>('getTopics', []))
    );
  }
  firstTopics(limit?: number): Observable<Topic[]> {
    this.page = 0;
    return this.getTopics("next", limit);
  }
  nextTopcis(limit?: number): Observable<Topic[]> {
    return this.getTopics("next", limit);
  }
  previousTopcis(limit?: number): Observable<Topic[]> {
    return this.getTopics("previous", limit);
  }
  specificPage(n: number, limit?: number): Observable<Topic[]> {
    return this.getTopics("specific", limit, n);
  }
  newTopic(topic: Topic): Observable<Topic> {
    const httpOption = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get("token") }) };
    const url = `${this.host}${this.topicPath}`;

    return this.http.post<Topic>(url, topic, httpOption).pipe(
      tap(t => {
        console.log(`posted new topic`);
      }),
      catchError(this.handleError<Topic>('newTopic'))
    );
  }
  editTopic(topic: Topic): Observable<Topic> {
    const httpOption = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get("token") }) };
    const url = `${this.host}${this.topicPath}/${topic.id}`;

    return this.http.put<Topic>(url, topic, httpOption).pipe(
      tap(t => {
        console.log(`posted editing topic`);
      }),
      catchError(this.handleError<Topic>('editTopic'))
    );
  }
  imageUpload(file: File, name?: string): Observable<Link> {
    let formData: FormData = new FormData();
    formData.append('file', file, name ? name : file.name);
    const httpOption = {
      headers: new HttpHeaders(
        {
          'Accept': 'application/json',
          'Authorization': this.cookieService.get("token")
        }
      )
    };
    return this.http.post<Link>(`${this.host}${this.fileUploadPath}`, formData, httpOption).pipe(
      tap(t => {
        console.log(`uploaded image new topic`);
      }),
      catchError(this.handleError<Link>('imageUpload'))
    )
  }
  getTopic(id: number) : Observable<Topic>{
    const url = `${this.host}${this.topicPath}/${id}`;
    return this.http.get<Topic>(url).pipe(
      tap(t => {
        console.log(`got ${id} topics `);
      }),
      catchError(this.handleError<Topic>('getTopic'))
    );
  }
  removeTopic(id : number): Observable<number>{
    const httpOption = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get("token") }) };
    const url = `${this.host}${this.topicPath}/${id}`;
    return this.http.delete<number>(url,httpOption).pipe(
      tap(t => {
        console.log(`deleted ${id} topics`);
      }),
      catchError(this.handleError<number>('removeTopic'))
    );
  }
  getNumberOfTopic(): Observable<Pagination> {
    const httpOption = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    const url = `${this.host}${this.pagePath}`;
    return this.http.get<Pagination>(url,httpOption).pipe(
      tap(t => {
        console.log(`total: ${t.number} topic`);
      }),
      catchError(this.handleError<Pagination>('getNumberOfTopic'))
    );
  }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };

  }
}
