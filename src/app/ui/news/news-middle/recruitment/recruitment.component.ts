import { Component, OnInit } from '@angular/core';
import { Recruitment } from 'src/app/ui/object/Recruitment';
import { RecruitmentService } from 'src/app/ui/recruitment.service';
import { LoadingBarService } from 'src/app/ui/header/loading-bar.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.css']
})
export class RecruitmentComponent implements OnInit {
  limit: number = 7;
  collectionSize: number;
  page: number = 1;
  recruitments: Recruitment[];
  constructor(private recruitmentService: RecruitmentService,
    private loadingService: LoadingBarService) { }
  ngOnInit() {
    this.initRecruitments();
    this.getMaxPage();
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
  specific(n: number) {
    this.loadingService.setLoading(true);
    var ob = this.recruitmentService.specificPage(n, this.limit);
    this.updateRecruitments(ob);
  }
  private updateRecruitments(ob: Observable<Recruitment[]>) {
    ob.subscribe(
      recruitments => {
        this.recruitments = recruitments;
        this.loadingService.setLoading(false);
      }
    );
  }
}
