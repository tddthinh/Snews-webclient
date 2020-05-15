import { Injectable } from '@angular/core';
import { User } from './object/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CONFIGS } from '../my-config';
import { CookieService } from 'ngx-cookie-service';
import { Pagination } from './object/pagination';
import { Role } from './object/role';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private host = CONFIGS.urlOptions.host;
    private userPath = CONFIGS.urlOptions.userPath;
    private rolePath = CONFIGS.urlOptions.rolePath;
    private loginPath = CONFIGS.urlOptions.loginPath;
    private logoutPath = CONFIGS.urlOptions.logoutPath;
    private mePath = CONFIGS.urlOptions.mePath;
    private pagePath = CONFIGS.urlOptions.pagePath + '?_id=user';

    private page: number = 1;
    private limit: number = 5;

    constructor(private http: HttpClient, private cookieService: CookieService) { }


    loginUser(user: User): Observable<User> {
        const httpOption = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        const url = `${this.host}${this.loginPath}`;
        return this.http.post<User>(url, user, httpOption).pipe(
            catchError(this.handleError('loginUser', user))
        );
    }
    logoutUser(): Observable<number> {
        const httpOption = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get("token") }) };
        const url = `${this.host}${this.logoutPath}`;
        return this.http.get<number>(url, httpOption).pipe(
            catchError(this.handleError('logoutUser', null))
        );
    }
    me(): Observable<User> {
        const httpOption = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get("token") }) };
        const url = `${this.host}${this.mePath}`;
        return this.http.get<User>(url, httpOption).pipe(
            catchError(this.handleError('me', null))
        );
    }

    private getUsers(type: string, limit?: number, pageNum?: number): Observable<User[]> {
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
        const url = `${this.host}${this.userPath}?_page=${tempPage}&_limit=${tempLimit}`;
        const httpOption = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get("token") }) };
        return this.http.get<User[]>(url, httpOption).pipe(
            tap(t => {
                const length = t.length;
                console.log(`fetched ${length} Users `);
                if (length !== 0) this.page = tempPage;
            }),
            catchError(this.handleError<User[]>('getUsers', []))
        );
    }
    firstUsers(limit?: number): Observable<User[]> {
        this.page = 0;
        return this.getUsers("next", limit);
    }
    nextTopcis(limit?: number): Observable<User[]> {
        return this.getUsers("next", limit);
    }
    previousTopcis(limit?: number): Observable<User[]> {
        return this.getUsers("previous", limit);
    }
    specificPage(n: number, limit?: number): Observable<User[]> {
        return this.getUsers("specific", limit, n);
    }
    newUser(User: User): Observable<User> {
        const httpOption = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get("token") }) };
        const url = `${this.host}${this.userPath}`;

        return this.http.post<User>(url, User, httpOption).pipe(
            tap(t => {
                console.log(`posted new User`);
            }),
            catchError(this.handleError<User>('newUser'))
        );
    }
    editUser(User: User): Observable<User> {
        const httpOption = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get("token") }) };
        const url = `${this.host}${this.userPath}/${User.id}`;

        return this.http.put<User>(url, User, httpOption).pipe(
            tap(t => {
                console.log(`posted editing User`);
            }),
            catchError(this.handleError<User>('editUser'))
        );
    }
    removeUser(id: number): Observable<number> {
        const httpOption = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get("token") }) };
        const url = `${this.host}${this.userPath}/${id}`;
        return this.http.delete<number>(url, httpOption).pipe(
            tap(t => {
                console.log(`deleted ${id} Users`);
            }),
            catchError(this.handleError<number>('removeUser'))
        );
    }
    getNumberOfUser(): Observable<Pagination> {
        const httpOption = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        const url = `${this.host}${this.pagePath}`;
        return this.http.get<Pagination>(url, httpOption).pipe(
            tap(t => {
                console.log(`total: ${t.number} user`);
            }),
            catchError(this.handleError<Pagination>('getNumberOfUser'))
        );
    }
    getRoles(): Observable<Role[]> {
        const httpOption = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get("token") }) };
        const url = `${this.host}${this.rolePath}`;
        return this.http.get<Role[]>(url, httpOption).pipe(
            catchError(this.handleError<Role[]>('getRoles', []))
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
