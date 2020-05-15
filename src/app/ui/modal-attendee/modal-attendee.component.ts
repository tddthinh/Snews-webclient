import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Attendee } from '../object/attendee';
import { AttendeeService } from '../attendee.service';
import { Label } from '../object/label';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-modal-attendee',
  templateUrl: './modal-attendee.component.html',
  styleUrls: ['./modal-attendee.component.css']
})
export class ModalAttendeeComponent implements OnInit {
  @Input() att: Attendee;
  @Input() btnClass: string;
  @Output() added = new EventEmitter<Attendee>();
  stateText: string;
  stateColor: string;
  importResult = 'import';
  newResult = 'new';
  editResult = 'edit';
  tempAtt: Attendee;
  @Input() labels: Label[];
  public model: Label;

  constructor(private modalService: NgbModal, private attendeeService: AttendeeService) { }

  ngOnInit() {
    
  }


  open(content) {
    this.stateText = "";
    this.tempAtt = Object.assign({}, this.att);
    const MODAL_UI_OPTIONS: NgbModalOptions = {
      ariaLabelledBy: 'modal-basic-title',
      size: "sm"
    };
    this.modalService.open(content, MODAL_UI_OPTIONS);
  }
  validateAttendee() {

  }
  _edit() {
    this.removeError();
    this.attendeeService.editAttendee(this.tempAtt).subscribe(
      att => {
        if (!att.error) {
          this.att.code = att.code;
          this.att.email = att.email;
          this.att.fullname = att.fullname;
          this.att.rfid = att.rfid;
          this.att.labels = att.labels;

          this.stateText = "Sửa thành công!";
          this.stateColor = "text-success";
          this.modalService.dismissAll();
        } else {
          this.tempAtt = att;
          this.stateText = "";
          if (!att.exists) {

          }
        }
      },
      error => {
        this.stateText = "Lỗi: unknowns";
        this.stateColor = "text-danger";
        console.log(error);
      }
    );
  }
  _new() {
    this.removeError();
    this.attendeeService.newAttendee(this.tempAtt).subscribe(
      att => {
        if (!att.error) {
          this.added.emit(Object.assign({}, att));
          this.tempAtt.code = '';
          this.tempAtt.fullname = '';
          this.tempAtt.email = this.tempAtt.email.substr(this.tempAtt.email.indexOf('@'), this.tempAtt.email.length);
          this.tempAtt.rfid = '';
          this.stateText = "Tạo thành công!";
          this.stateColor = "text-success";
        } else {
          if (!att.exists) {
            this.tempAtt = att;
            this.stateText = "";
          } else {
            this.tempAtt.errorCode = att.errorCode;
            this.stateText = "";
          }
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
        this._edit();
        break;
      }
      case this.newResult: {
        this._new();
        break;
      }
    }
  }

  removeError() {
    this.tempAtt.error = false;
    this.tempAtt.errorCode = '';
    this.tempAtt.errorEmail = '';
    this.tempAtt.errorFullname = '';
    this.tempAtt.errorRfid = '';
  }
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.labels.filter(v => v.content.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  formatter = (x: { id: number, content: string }) => x.content;
  removeLabel(label: Label) {
    const index = this.tempAtt.labels.indexOf(label, 0);
    if (index > -1) {
      this.tempAtt.labels.splice(index, 1);
    }
  }
  addLabel() {
    if ((typeof this.model) === 'object') {
      if (this.tempAtt.labels.findIndex(l => l.id == this.model.id) == -1) {
        this.tempAtt.labels.push(Object.assign({}, this.model));
        this.model = new Label();
      }
    }
  }
}
