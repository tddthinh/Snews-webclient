import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';
import { User } from '../object/user';
import { UserService } from '../user.service';
import { CONFIGS } from '../../my-config';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit {
  user: User;
  stateText: string;
  stateColor: string;
  closeResult: string;
  @Input() btnClass: string;

  constructor(private modalService: NgbModal, 
    private userService: UserService, 
    private location: LocationStrategy,
    private cookieService: CookieService) { }
  ngOnInit(): void {}

  open(content) {
    this.user = new User();
    this.stateText = "";
    const MODAL_UI_OPTIONS: NgbModalOptions = {
      ariaLabelledBy: 'modal-basic-title',
      size: "sm"
    };
    this.modalService.open(content, MODAL_UI_OPTIONS);
  }
  login() {
    this.stateText = "Đang xử lý.."
    this.stateColor = "text-primary";
    this.userService.loginUser(this.user).subscribe(
      user => {
        if(user.token !== null){
          this.stateText = "Đang chuyển trang..";
          this.stateColor = "text-success";

          this.cookieService.set("token",user.token,1);
                    
          this.modalService.dismissAll();
          window.location.reload(true);
        }else{
          this.stateText = "Sai tài khoản/mật khẩu!";
          this.stateColor = "text-danger";
        }
      }
    );
  }
}
