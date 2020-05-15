import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../object/user';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../user.service';
import { Role } from '../object/role';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css']
})
export class ModalUserComponent implements OnInit {
  editResult = 'edit';
  newResult = 'new';
  stateText: string;
  stateColor: string;
  rePassword: string;
  errrorRePassword: string;
  roles: Role[];
  tempUser: User;
  @Input() btnClass: string;
  @Input() user?: User;
  @Output() added = new EventEmitter<User>();

  constructor(private modalService: NgbModal, private userSerivce: UserService) { }
  ngOnInit(): void {
    this.userSerivce.getRoles().subscribe(
      roles => this.roles = roles
    )
  }
  open(content) {
    this.stateText = "";
    this.user.password = null;
    this.tempUser = Object.assign({}, this.user);
    if (!this.tempUser.id) {
      this.tempUser.role = this.roles[0];
    } else {
      this.tempUser.role = this.roles.find(r => r.id === this.tempUser.role.id);
    }
    const MODAL_UI_OPTIONS: NgbModalOptions = {
      ariaLabelledBy: 'modal-basic-title',
      size: "sm"
    };
    this.modalService.open(content, MODAL_UI_OPTIONS);
  }
  editUser() {
    this.userSerivce.editUser(this.tempUser).subscribe(
      result => {
        if (!result.error) {
          this.user = Object.assign(this.user,result);
          this.stateText = "Sửa tài khoản thành công!";
          this.stateColor = "text-success";
          this.modalService.dismissAll();
        } else {
          this.stateText = "";
          result.role = this.tempUser.role;
          this.tempUser = result;
        }
      },
      error => {
        this.stateText = "Lỗi: unknowns";
        this.stateColor = "text-danger";
        console.log(error);
      },
      () => {

      }
    )
  }
  newUser() {
    this.userSerivce.newUser(this.tempUser).subscribe(
      result => {
        if (!result.error) {
          this.stateText = "Tạo tài khoản thành công!";
          this.stateColor = "text-success";
          this.added.emit(result);
          this.modalService.dismissAll();
        } else {
          this.stateText = "";
          result.role = this.tempUser.role;
          this.tempUser = result;
        }
      },
      error => {
        this.stateText = "Lỗi: unknowns";
        this.stateColor = "text-danger";
        console.log(error);
      }
    );

  }
  post(result: string) {
    this.stateText = "Đang xử lý.."
    this.stateColor = "text-primary";
    switch (result) {
      case this.editResult: {
        this.editUser();
        break;
      }
      case this.newResult: {
        this.newUser();
        break;
      }
    }
  }

}
