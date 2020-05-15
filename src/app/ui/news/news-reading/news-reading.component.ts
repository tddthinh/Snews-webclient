import { Component, OnInit } from '@angular/core';
import { TopicService } from '../../topic.service';
import { Topic } from '../../object/Topic';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news-reading',
  templateUrl: './news-reading.component.html',
  styleUrls: ['./news-reading.component.css']
})
export class NewsReadingComponent implements OnInit {
  topic: Topic;
  constructor(private topicService: TopicService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.topicService.getTopic(id).subscribe(
      t => this.topic = t
    );
  }

}
