import { Component, OnInit } from '@angular/core';
import { LoadingBarService } from './loading-bar.service';
import { CONFIGS } from '../../my-config';
import { User } from '../object/user';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: User;
  isCollapsed = false;
  idNavItem: string;
  isPageLoading: boolean = true;
  constructor(public loadingService: LoadingBarService,
    private location: Location,
    private userService: UserService,
    private cookieService: CookieService,
    private router: Router) { }

  ngOnInit() {
    this.userService.me().subscribe(
      u => this.currentUser = u
    );
    console.log(this.currentUser);

    const path = this.location.path().substring(1);
    this.idNavItem = path;
  }
  navItemClick(id: string) {

    this.idNavItem = id;
  }
  logout() {
    this.userService.logoutUser().subscribe(
      r => {
        this.cookieService.delete("token");
        this.currentUser = undefined;
        this.router.navigate([''])
      }
    );
  }
}
