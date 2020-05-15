import { Component, OnInit } from '@angular/core';
import { User } from '../../object/user';
import { UserService } from '../../user.service';
import { LoadingBarService } from '../../header/loading-bar.service';
import { CookieService } from 'ngx-cookie-service';
import { CONFIGS } from '../../../my-config';
import { Observable } from 'rxjs';

interface UserRow {
  user: User;
  checked: boolean;
}

@Component({
  selector: 'app-table-user',
  templateUrl: './table-user.component.html',
  styleUrls: ['./table-user.component.css']
})
export class TableUserComponent implements OnInit {
  limit: number = 10;
  collectionSize: number;
  page: number = 1;
  rows: UserRow[] = [];
  newUser: User = new User();
  me: User;
  constructor(private UserService: UserService,
    private loadingService: LoadingBarService,
    private cookieService: CookieService) { }
  ngOnInit() {
    this.UserService.me().subscribe(
      me => this.me = me
    );
    this.initUsers();
    this.getMaxPage();
  }
  initAuthToken() {
    CONFIGS.editorOptions.requestHeaders.authorization = this.cookieService.get("token");
  }
  initUsers() {
    this.loadingService.setLoading(true);
    var ob = this.UserService.firstUsers(this.limit);
    this.updateUsers(ob);
  }
  next() {
    this.loadingService.setLoading(true);
    var ob = this.UserService.nextTopcis(this.limit);
    this.updateUsers(ob);
  }
  previous() {
    this.loadingService.setLoading(true);
    var ob = this.UserService.previousTopcis(this.limit);
    this.updateUsers(ob);
  }
  specific(n: number) {
    this.loadingService.setLoading(true);
    var ob = this.UserService.specificPage(n, this.limit);
    this.updateUsers(ob);
  }
  private updateUsers(ob: Observable<User[]>) {
    ob.subscribe(
      user => {
        if (user.length !== 0) {
          this.rows = [];
          user.forEach(e => {
            this.rows.push({ user: e, checked: false })
          });
        }
        this.loadingService.setLoading(false);
      }
    );
  }
  getMaxPage() {
    this.UserService.getNumberOfUser().subscribe(
      t => {
        this.collectionSize = t.number;
      }
    );
  }
  onPager(pageNum: number): void {
    //console.log("Pager event Is: ", event)
    this.specific(pageNum);
  }
  remove() {
    this.rows.filter(e => e.checked).forEach(
      t => this.UserService.removeUser(t.user.id).subscribe(
        _ => {
          const index = this.rows.indexOf(t, 0);
          if (index > -1) {
            this.rows.splice(index, 1);
          }
        }
      )
    );
  }
  onAdded(user: User) {
    this.rows.unshift({ user: user, checked: false });
    this.newUser = new User();
  }
}
