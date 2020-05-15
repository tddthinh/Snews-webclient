import { Component, OnInit } from '@angular/core';
import { TopicService } from '../../topic.service';
import { Topic } from '../../object/topic';
import { LoadingBarService } from '../../header/loading-bar.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-news-middle',
  templateUrl: './news-middle.component.html',
  styleUrls: ['./news-middle.component.css']
})
export class NewsMiddleComponent implements OnInit {
  limit: number = 7;
  collectionSize: number;
  page: number = 1;
  topics: Topic[];
  constructor(private topicService: TopicService,
    private loadingService: LoadingBarService) { }
  ngOnInit() {
    this.initTopics();
    this.getMaxPage();
  }
  initTopics() {
    this.loadingService.setLoading(true);
    var ob = this.topicService.firstTopics(this.limit);
    this.updateTopics(ob);
  }
  next() {
    this.loadingService.setLoading(true);
    var ob = this.topicService.nextTopcis(this.limit);
    this.updateTopics(ob);
  }
  previous() {
    this.loadingService.setLoading(true);
    var ob = this.topicService.previousTopcis(this.limit);
    this.updateTopics(ob);
  }
  getMaxPage() {
    this.topicService.getNumberOfTopic().subscribe(
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
    var ob = this.topicService.specificPage(n, this.limit);
    this.updateTopics(ob);
  }
  private updateTopics(ob: Observable<Topic[]>) {
    ob.subscribe(
      topics => {
        this.topics = topics;
        this.loadingService.setLoading(false);
      }
    );
  }
}
