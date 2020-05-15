import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './ui/news/news.component';
import { EventsComponent } from './ui/events/events.component';
import { DashboardComponent } from './ui/dashboard/dashboard.component';
import { PageNotFoundComponent } from './ui/page-not-found/page-not-found.component';
import { NewsReadingComponent } from './ui/news/news-reading/news-reading.component';

const routes: Routes = [
  { path: '', redirectTo: 'news', pathMatch: 'full' },
  { path: 'news', component: NewsComponent },
  { path: 'reading/:id', component: NewsReadingComponent},
  { path: 'events', component: EventsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}