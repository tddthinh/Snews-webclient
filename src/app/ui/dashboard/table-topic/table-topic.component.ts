import { Component, OnInit } from '@angular/core';
import { TopicService } from '../../topic.service';
import { LoadingBarService } from '../../header/loading-bar.service';
import { Topic } from '../../object/Topic';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CONFIGS } from '../../../my-config';
import { CookieService } from 'ngx-cookie-service';

interface TopicRow {
  topic: Topic;
  checked: boolean;
}

@Component({
  selector: 'app-table-topic',
  templateUrl: './table-topic.component.html',
  styleUrls: ['./table-topic.component.css']
})
export class TableTopicComponent implements OnInit {
  limit: number = 10;
  collectionSize: number;
  page: number = 1;
  rows: TopicRow[] = [];
  newTopic: Topic = new Topic();
  constructor(private topicService: TopicService,
    private loadingService: LoadingBarService,
    private cookieService: CookieService) { }
  ngOnInit() {

    this.initTopics();
    this.getMaxPage();
  }
  initAuthToken(){
    CONFIGS.editorOptions.requestHeaders.authorization = this.cookieService.get("token");
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
  specific(n: number) {
    this.loadingService.setLoading(true);
    var ob = this.topicService.specificPage(n, this.limit);
    this.updateTopics(ob);
  }
  private updateTopics(ob: Observable<Topic[]>) {
    ob.subscribe(
      topics => {
        if (topics.length !== 0) {
          this.rows = [];
          topics.forEach(e => {
            this.rows.push({ topic: e, checked: false })
          });
        }
        this.loadingService.setLoading(false);
      }
    );
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
  remove() {
    this.rows.filter(e => e.checked).forEach(
      t => this.topicService.removeTopic(t.topic.id).subscribe(
        _ => {
          const index = this.rows.indexOf(t, 0);
          if (index > -1) {
            this.rows.splice(index, 1);
          }
        }
      )
    );
  }
  onAdded(topic: Topic) {
    this.rows.unshift({ topic: topic, checked: false });
    this.newTopic = new Topic();
  }
}
