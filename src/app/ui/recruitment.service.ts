import { Injectable } from '@angular/core';
import { Recruitment } from './object/Recruitment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Pagination } from './object/pagination';
import { CONFIGS } from '../my-config';
import { Link } from './object/Link';
import { CookieService } from 'ngx-cookie-service';
import { Field } from './object/field';

@Injectable({
  providedIn: 'root'
})
export class RecruitmentService {
  private host = CONFIGS.urlOptions.host;
  private recruitmentPath = CONFIGS.urlOptions.recruitmentPath;
  private fileUploadPath = CONFIGS.urlOptions.fileUploadPath;
  private pagePath = CONFIGS.urlOptions.pagePath + '?_id=recruitment';
  private page: number = 0;
  private limit: number = 7;
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  private getRecruitments(type: string, limit?: number, pageNum?: number): Observable<Recruitment[]> {
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
    const url = `${this.host}${this.recruitmentPath}?_page=${tempPage}&_limit=${tempLimit}`;
    return this.http.get<Recruitment[]>(url).pipe(
      tap(t => {
        const length = t.length;
        console.log(`fetched ${length} recruitments `);
        if (length !== 0) this.page = tempPage;
      }),
      catchError(this.handleError<Recruitment[]>('getRecruitments', []))
    );
  }
  firstRecruitments(limit?: number): Observable<Recruitment[]> {
    this.page = 0;
    return this.getRecruitments("next", limit);
  }
  nextRecruitments(limit?: number): Observable<Recruitment[]> {
    return this.getRecruitments("next", limit);
  }
  previousRecruitments(limit?: number): Observable<Recruitment[]> {
    return this.getRecruitments("previous", limit);
  }
  specificPage(n: number, limit?: number): Observable<Recruitment[]> {
    return this.getRecruitments("specific", limit, n);
  }
  newRecruitment(recruitment: Recruitment): Observable<Recruitment> {
    const httpOption = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get("token") }) };
    const url = `${this.host}${this.recruitmentPath}`;

    return this.http.post<Recruitment>(url, recruitment, httpOption).pipe(
      tap(t => {
        console.log(`posted new recruitment`);
      }),
      catchError(this.handleError<Recruitment>('newRecruitment'))
    );
  }
  editRecruitment(recruitment: Recruitment): Observable<Recruitment> {
    const httpOption = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get("token") }) };
    const url = `${this.host}${this.recruitmentPath}/${recruitment.id}`;

    return this.http.put<Recruitment>(url, recruitment, httpOption).pipe(
      tap(t => {
        console.log(`posted editing recruitment`);
      }),
      catchError(this.handleError<Recruitment>('editRecruitment'))
    );
  }
  fileUpload(file: File, name?: string): Observable<Link> {
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
        console.log(`uploaded file new recruitment`);
      }),
      catchError(this.handleError<Link>('fileUpload'))
    )
  }
  getRecruitment(id: number) : Observable<Recruitment>{
    const url = `${this.host}${this.recruitmentPath}/${id}`;
    return this.http.get<Recruitment>(url).pipe(
      tap(t => {
        console.log(`got ${id} recruitments `);
      }),
      catchError(this.handleError<Recruitment>('getRecruitment'))
    );
  }
  getField() : Observable<string[]>{
    const url = `${this.host}${this.recruitmentPath}/field`;
    return this.http.get<string[]>(url).pipe(
      catchError(this.handleError<string[]>('getRecruitmentField'))
    );
  }
  totalUpField(start: string, end:string) : Observable<Field[]>{
    const url = `${this.host}${this.recruitmentPath}/field/totalup?_start=${start}&_end=${end}`;
    return this.http.get<Field[]>(url).pipe(
      catchError(this.handleError<Field[]>('totalUpField'))
    );
  }
  getCompany() : Observable<string[]>{
    const url = `${this.host}${this.recruitmentPath}/company`;
    return this.http.get<string[]>(url).pipe(
      catchError(this.handleError<string[]>('getRecruitmentCompany'))
    );
  }
  getVacancy() : Observable<string[]>{
    const url = `${this.host}${this.recruitmentPath}/vacancy`;
    return this.http.get<string[]>(url).pipe(
      catchError(this.handleError<string[]>('getRecruitmentVacancy'))
    );
  }
  removeRecruitment(id : number): Observable<number>{
    const httpOption = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get("token") }) };
    const url = `${this.host}${this.recruitmentPath}/${id}`;
    return this.http.delete<number>(url,httpOption).pipe(
      tap(t => {
        console.log(`deleted ${id} recruitments`);
      }),
      catchError(this.handleError<number>('removeRecruitment'))
    );
  }
  getNumberOfRecruitment(): Observable<Pagination> {
    const httpOption = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    const url = `${this.host}${this.pagePath}`;
    return this.http.get<Pagination>(url,httpOption).pipe(
      tap(t => {
        console.log(`total: ${t.number} recruitment`);
      }),
      catchError(this.handleError<Pagination>('getNumberOfRecruitment'))
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
