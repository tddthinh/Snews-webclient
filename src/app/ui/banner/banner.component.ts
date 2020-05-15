import { Component, OnInit } from '@angular/core';
import { TopicService } from '../topic.service';
import { Banner } from '../object/banner';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  banner: Banner;

  constructor(private topicService: TopicService) { }

  ngOnInit() {
    this.getBanner();
  }
  getBanner() {
    
  }
}
