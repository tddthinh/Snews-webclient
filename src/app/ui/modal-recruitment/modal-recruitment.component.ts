import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recruitment } from '../object/Recruitment';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CONFIGS } from '../../my-config';
import { RecruitmentService } from '../recruitment.service';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-modal-recruitment',
  templateUrl: './modal-recruitment.component.html',
  styleUrls: ['./modal-recruitment.component.css']
})
export class ModalRecruitmentComponent implements OnInit {
  editorOptions: Object = CONFIGS.editorOptions;
  filePath: string;
  fileUploadMsg: string;
  editResult = 'edit';
  newResult = 'new';
  stateText: string;
  stateColor: string;
  tempRecruitment: Recruitment;

  fields: string[];
  companies: string[];
  vacancies: string[];

  @Input() btnClass: string;
  @Input() recruitment?: Recruitment;
  @Output() added = new EventEmitter<Recruitment>();

  constructor(private modalService: NgbModal, private recruitmentSerivce: RecruitmentService) { }
  ngOnInit(): void {
    this.tempRecruitment = Object.assign({}, this.recruitment)
    
  }

  open(content) {
    this.recruitmentSerivce.getField().subscribe({
      next: f => { this.fields = f }
    })
    this.recruitmentSerivce.getCompany().subscribe({
      next: f => { this.companies = f }
    })
    this.recruitmentSerivce.getVacancy().subscribe({
      next: f => { this.vacancies = f }
    })
    
    this.stateText = "";
    this.fileUploadMsg = "";
    const MODAL_UI_OPTIONS: NgbModalOptions = {
      ariaLabelledBy: 'modal-basic-title',
      size: "sm"
    };
    this.modalService.open(content, MODAL_UI_OPTIONS);
  }
  post(result: string) {
    this.stateText = "Đang xử lý.."
    this.stateColor = "text-primary";
    switch (result) {
      case this.editResult: {
        this.editRecruitment();
        break;
      }
      case this.newResult: {
        this.newRecruitment();
        break;
      }
    }
  }
  editRecruitment() {
    this.recruitmentSerivce.editRecruitment(this.tempRecruitment).subscribe({
      next: tp => {
        this.recruitment = Object.assign(this.recruitment, tp)
        this.stateText = "Sửa tin thành công!";
        this.stateColor = "text-success";
        this.modalService.dismissAll();
      },
      error: err => {
        this.stateText = "Lỗi: " + err;
        this.stateColor = "text-danger";
      }
    });
  }
  newRecruitment() {
    //console.log(this.recruitment);
    this.recruitmentSerivce.newRecruitment(this.tempRecruitment).subscribe({
      next: r => {
        this.stateText = "Đăng tin thành công!";
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
      this.fileUploadMsg = "Đang tải lên tệp..";
      let file: File = fileList[0];
      this.filePath = file.name;
      this.recruitmentSerivce.fileUpload(file).subscribe({
        error: err => {
          this.fileUploadMsg = "Lỗi: " + err;
        },
        next: (x) => {
          this.fileUploadMsg = "Đã tải xong!";
          this.tempRecruitment.file = x.link;
        },
      });
    }
  }

  searchField = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : this.fields.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
  searchCompany = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : this.companies.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
  searchVacancy = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : this.vacancies.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  choiceField(s: string) {
    this.tempRecruitment.field = s;
  }
  choiceCompany(s: string) {
    this.tempRecruitment.company = s;
  }
  choiceVacancy(s: string) {
    this.tempRecruitment.vacancy = s;
  }
}
