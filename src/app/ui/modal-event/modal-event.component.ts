import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Role } from '../object/role';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { EventService } from '../event.service';
import { Event } from '../object/event';
import { Time, DatePipe } from '@angular/common';

@Component({
  selector: 'app-modal-event',
  templateUrl: './modal-event.component.html',
  styleUrls: ['./modal-event.component.css']
})
export class ModalEventComponent implements OnInit {

  editResult = 'edit';
  newResult = 'new';
  stateText: string;
  stateColor: string;
  roles: Role[];
  tempEvent: Event;
  @Input() btnClass: string;
  @Input() event?: Event;
  @Output() added = new EventEmitter<Event>();

  constructor(private modalService: NgbModal, private eventSerivce: EventService) { }
  ngOnInit(): void {
    this.tempEvent = Object.assign({}, this.event);
    if(!this.tempEvent.id){
      let today : Date = new Date();
      const datepipe = new DatePipe("en-US");
      this.tempEvent.date = datepipe.transform(today,"yyyy-MM-dd");
      this.tempEvent.start_time = "01:00:00";
      this.tempEvent.end_time = "02:00:00";
      
    }
  }
  open(content) {
    this.stateText = "";
    const MODAL_UI_OPTIONS: NgbModalOptions = {
      ariaLabelledBy: 'modal-basic-title',
      size: "sm"
    };
    this.modalService.open(content, MODAL_UI_OPTIONS);
  }
  editEvent() {
    this.eventSerivce.editEvent(this.tempEvent).subscribe(
      result => {
        if (!result.error) {
          this.event = Object.assign(this.event, result);
          this.stateText = "Sửa sự kiện thành công!";
          this.stateColor = "text-success";
          this.modalService.dismissAll();
        } else {
          this.stateText = "Sửa sự kiện thất bại!";
          this.stateColor = "text-danger"
          this.tempEvent = result;
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
  newEvent() {
    //console.log(this.event);
    this.eventSerivce.newEvent(this.tempEvent).subscribe(
      result => {
        if (!result.error) {
          result.attendees_count = 0;
          this.added.emit(result);
          this.stateText = "Tạo sự kiện thành công!";
          this.stateColor = "text-success";
          this.modalService.dismissAll();
        } else {
          this.stateText = "Tạo sự kiện thất bại!";
          this.stateColor = "text-danger"
          this.tempEvent = result;
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

    if(this.tempEvent.start_time.length == 5) this.tempEvent.start_time += ":00";
    if(this.tempEvent.end_time.length == 5) this.tempEvent.end_time += ":00";

    switch (result) {
      case this.editResult: {
        this.editEvent();
        break;
      }
      case this.newResult: {
        this.newEvent();
        break;
      }
    }
    
  }

}
