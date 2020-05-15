import { Component, OnInit } from '@angular/core';
import { RecruitmentService } from '../../recruitment.service';
import { LoadingBarService } from '../../header/loading-bar.service';
import { Recruitment } from '../../object/Recruitment';
import { Observable } from 'rxjs';
import { CONFIGS } from '../../../my-config';
import { CookieService } from 'ngx-cookie-service';

interface RecruitmentRow {
  recruitment: Recruitment;
  checked: boolean;
}

@Component({
  selector: 'app-table-recruitment',
  templateUrl: './table-recruitment.component.html',
  styleUrls: ['./table-recruitment.component.css']
})
export class TableRecruitmentComponent implements OnInit {
  limit: number = 10;
  collectionSize: number;
  page: number = 1;
  rows: RecruitmentRow[] = [];
  newRecruitment: Recruitment = new Recruitment();
  constructor(private recruitmentService: RecruitmentService,
    private loadingService: LoadingBarService,
    private cookieService: CookieService) { }
  ngOnInit() {

    this.initRecruitments();
    this.getMaxPage();
  }
  initAuthToken(){
    CONFIGS.editorOptions.requestHeaders.authorization = this.cookieService.get("token");
  }
  initRecruitments() {
    this.loadingService.setLoading(true);
    var ob = this.recruitmentService.firstRecruitments(this.limit);
    this.updateRecruitments(ob);
  }
  next() {
    this.loadingService.setLoading(true);
    var ob = this.recruitmentService.nextRecruitments(this.limit);
    this.updateRecruitments(ob);
  }
  previous() {
    this.loadingService.setLoading(true);
    var ob = this.recruitmentService.previousRecruitments(this.limit);
    this.updateRecruitments(ob);
  }
  specific(n: number) {
    this.loadingService.setLoading(true);
    var ob = this.recruitmentService.specificPage(n, this.limit);
    this.updateRecruitments(ob);
  }
  private updateRecruitments(ob: Observable<Recruitment[]>) {
    ob.subscribe(
      recruitments => {
        if (recruitments.length !== 0) {
          this.rows = [];
          recruitments.forEach(e => {
            this.rows.push({ recruitment: e, checked: false })
          });
        }
        this.loadingService.setLoading(false);
      }
    );
  }
  getMaxPage() {
    this.recruitmentService.getNumberOfRecruitment().subscribe(
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
      t => this.recruitmentService.removeRecruitment(t.recruitment.id).subscribe(
        _ => {
          const index = this.rows.indexOf(t, 0);
          if (index > -1) {
            this.rows.splice(index, 1);
          }
        }
      )
    );
  }
  onAdded(recruitment: Recruitment) {
    this.rows.unshift({ recruitment: recruitment, checked: false });
    this.newRecruitment = new Recruitment();
  }
}
