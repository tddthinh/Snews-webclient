import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewsComponent } from './news/news.component';
import { EventsComponent } from './events/events.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from '../app-routing.module';
import { ModalLoginComponent } from './modal-login/modal-login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NewsMiddleComponent } from './news/news-middle/news-middle.component';
import { NewsReadingComponent } from './news/news-reading/news-reading.component';
import { TableTopicComponent } from './dashboard/table-topic/table-topic.component';
import { TableUserComponent } from './dashboard/table-user/table-user.component';
import { ModalTopicComponent } from './modal-topic/modal-topic.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { TableEventComponent } from './dashboard/table-event/table-event.component';
import { BannerComponent } from './banner/banner.component';
import { ModalUserComponent } from './modal-user/modal-user.component';
import { ModalEventComponent } from './modal-event/modal-event.component';
import { ModalAttendeeComponent } from './modal-attendee/modal-attendee.component';
import { TableAttendeeComponent } from './events/table-attendee/table-attendee.component';
import { MusterComponent } from './events/muster/muster.component';
import { StatisticsComponent } from './events/statistics/statistics.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { RecruitmentComponent } from './news/news-middle/recruitment/recruitment.component';
import { TableRecruitmentComponent } from './dashboard/table-recruitment/table-recruitment.component';
import { ModalRecruitmentComponent } from './modal-recruitment/modal-recruitment.component';
import { StatisticsRecruitmentComponent } from './dashboard/statistics-recruitment/statistics-recruitment.component';

@NgModule({
  imports: [
    NgbModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    Ng2GoogleChartsModule,
  ],
  declarations: [LayoutComponent, HeaderComponent, FooterComponent, NewsComponent, EventsComponent, DashboardComponent, PageNotFoundComponent, ModalLoginComponent, NewsMiddleComponent, NewsReadingComponent, TableTopicComponent, TableUserComponent, ModalTopicComponent, TableEventComponent, BannerComponent, ModalUserComponent, ModalEventComponent, ModalAttendeeComponent, TableAttendeeComponent, MusterComponent, StatisticsComponent, RecruitmentComponent, TableRecruitmentComponent, ModalRecruitmentComponent, StatisticsRecruitmentComponent],
  exports: [LayoutComponent]
})
export class UiModule { }
