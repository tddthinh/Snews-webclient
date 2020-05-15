import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../object/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentJustify = 'justified';
  constructor(private userSerivce: UserService) { }

  ngOnInit() {
  }

}
