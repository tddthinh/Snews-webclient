import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Topic } from '../object/Topic';
import { NgbModal, NgbModalOptions, NgbDateStruct, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { CONFIGS } from '../../my-config';
import { TopicService } from '../topic.service';

@Component({
  selector: 'app-modal-topic',
  templateUrl: './modal-topic.component.html',
  styleUrls: ['./modal-topic.component.css']
})
export class ModalTopicComponent implements OnInit {
  editorOptions: Object = CONFIGS.editorOptions;
  model: NgbDateStruct;
  imageUploadMsg: string;
  editResult = 'edit';
  newResult = 'new';
  stateText: string;
  stateColor: string;
  tempTopic: Topic;
  @Input() btnClass: string;
  @Input() topic?: Topic;
  @Output() added = new EventEmitter<Topic>();

  constructor(private modalService: NgbModal, private calendar: NgbCalendar, private topicSerivce: TopicService) { }
  ngOnInit(): void {
    this.tempTopic = Object.assign({},this.topic)
    if (this.tempTopic.id) {
      let d : string[] = this.tempTopic.date.split("/");
      
      this.model = new NgbDate(+d[2],+d[1],+d[0]);
    } else {
      this.selectToday();
    }
  }

  open(content) {
    this.stateText = "";
    this.imageUploadMsg = "";
    const MODAL_UI_OPTIONS: NgbModalOptions = {
      ariaLabelledBy: 'modal-basic-title',
      size: "lg"
    };
    this.modalService.open(content, MODAL_UI_OPTIONS);
  }
  post(result: string) {
    this.stateText = "Đang xử lý.."
    this.stateColor = "text-primary";
    switch (result) {
      case this.editResult: {
        this.editTopic();
        break;
      }
      case this.newResult: {
        this.newTopic();
        break;
      }
    }
  }
  editTopic() {
    this.topicSerivce.editTopic(this.tempTopic).subscribe({
      next: tp => {
        this.topic = Object.assign(this.topic,tp)
        this.stateText = "Sửa bài thành công!";
        this.stateColor = "text-success";
        this.modalService.dismissAll();
      },
      error: err => {
        this.stateText = "Lỗi: " + err;
        this.stateColor = "text-danger";
      }
    });
  }
  newTopic() {
    //console.log(this.topic);
    this.topicSerivce.newTopic(this.tempTopic).subscribe({
      next: r => {
        this.stateText = "Đăng bài thành công!";
        this.stateColor = "text-success";
        this.added.emit(r);
        this.modalService.dismissAll();
      },
      error: err => {
        this.stateText = "Lỗi: " + err;
        this.stateColor = "text-danger";
      }
    });

  }
  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      this.topicSerivce.imageUpload(file).subscribe({
        error: err => {
          this.imageUploadMsg = "Lỗi: " + err;
        },
        next: (x) => {
          this.tempTopic.image = x.link;
        },
      });
    }
  }
  selectToday() {
    this.model = this.calendar.getToday();
  }
}
