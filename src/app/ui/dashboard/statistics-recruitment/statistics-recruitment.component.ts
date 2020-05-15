import { Component, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { RecruitmentService } from '../../recruitment.service';
import { LoadingBarService } from '../../header/loading-bar.service';
import { ChartSelectEvent } from 'ng2-google-charts';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-statistics-recruitment',
  templateUrl: './statistics-recruitment.component.html',
  styleUrls: ['./statistics-recruitment.component.css']
})
export class StatisticsRecruitmentComponent {
  @ViewChild('cchart') cchart;
  endDate: string;
  startDate: string;
  public chartData: any;

  constructor(private recruitmentService: RecruitmentService, private loading: LoadingBarService) { }
  ngOnInit(): void {
    let today: Date = new Date();
    const datepipe = new DatePipe("en-US");
    this.startDate = datepipe.transform(today, "yyyy-MM-dd");
    this.endDate = datepipe.transform(today, "yyyy-MM-dd");
    console.log(this.chartData);
  }

  start() {
    this.loading.setLoading(true);


    var data = new Array(['Element', '', { role: 'annotation' }]);
    var title = '';
    this.recruitmentService.totalUpField(this.startDate, this.endDate).subscribe(
      next => {
        next.forEach(field => {
          data.push([field.field, field.count, field.count+" người"])
        });

        this.chartData = {
          chartType: 'ColumnChart',
          dataTable: [] = data,
          options: {
            title: 'Thống kê Số lượng tuyển dụng theo Lĩnh vực',
            animation: {
              duration: 1000,
              easing: 'out',
              startup: true
            },
            legend: { position: "none" },
          }
        };

        console.log(this.chartData);
        this.loading.setLoading(false);

      }
    );
  }
  public select(recruitment: ChartSelectEvent) {

  }

}
