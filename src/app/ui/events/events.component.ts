import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { LoadingBarService } from '../header/loading-bar.service';
import { Event } from '../object/event';
import { Observable, interval, Subscription } from 'rxjs';
import { Time, DatePipe } from '@angular/common';
interface EventRow {
    event: Event;
    checked: boolean;
    started: boolean;
    ended: boolean;
}
@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
    limit: number = 10;
    collectionSize: number;
    page: number = 1;
    rows: EventRow[] = [];
    newEvent: Event = new Event();
    currentEvent: Event = null;
    todayDate: string;
    todayTime: string;
    musterMode: Boolean = false;
    isRefreshing: Boolean = false;

    updateAttendees = "update";
    statistics = "statistics";
    childComp : string;
    constructor(private eventService: EventService,
        private loadingService: LoadingBarService) { }
    ngOnInit() {
        this.initToday();
        this.initEvents();
        this.getMaxPage();
    }
    initEvents() {
        this.loadingService.setLoading(true);
        var ob = this.eventService.firstEventsMy(this.limit);
        this.updateEvents(ob);
    }
    initToday() {
        const today = new Date();
        const datepipe = new DatePipe("en-US");
        this.todayDate = datepipe.transform(today, "yyyy-MM-dd");
        this.todayTime = datepipe.transform(today, "hh:mm") + ":00";

    }
    next() {
        this.loadingService.setLoading(true);
        var ob = this.eventService.nextEventsMy(this.limit);
        this.updateEvents(ob);
    }
    previous() {
        this.loadingService.setLoading(true);
        var ob = this.eventService.previousEventsMy(this.limit);
        this.updateEvents(ob);
    }
    specific(n: number) {
        this.loadingService.setLoading(true);
        var ob = this.eventService.specificPageMy(n, this.limit);
        this.updateEvents(ob);
    }
    private updateEvents(ob: Observable<Event[]>) {
        ob.subscribe(
            Events => {
                if (Events.length !== 0) {
                    this.rows = [];
                    Events.forEach(e => {
                        const row = this.generateEventRow(e);
                        this.rows.push(row);
                    });
                }
                this.loadingService.setLoading(false);
            }
        );
    }
    generateEventRow(e: Event) {
        this.eventService.countAttendees(e.id, "").subscribe(
            count => e.attendees_count = count
        );
        let row: EventRow = { event: e, checked: false, started: false, ended: false };
        this.validateOutdated(row);
        return row;
    }
    validateOutdated(row: EventRow) {
        this.eventService.getEventState(row.event.id).subscribe(
            next => {
                if (next.compareTodayDate < 0) {
                    row.started = true;
                    row.ended = true;
                } else if (next.compareTodayDate > 0) {
                    row.started = false;
                    row.ended = false;
                } else if (next.compareTodayDate == 0) {
                    if (next.compareTodayTime < 0) {
                        row.started = false;
                        row.ended = false;
                    } else if (next.compareTodayTime > 0) {
                        row.started = true;
                        row.ended = true;
                    } else if (next.compareTodayTime == 0) {
                        row.started = true;
                        row.ended = false;
                    }
                }
            }
        );
    }

    getMaxPage() {
        this.eventService.getNumberOfEvent().subscribe(
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
            t => this.eventService.removeEvent(t.event.id).subscribe(
                _ => {
                    const index = this.rows.indexOf(t, 0);
                    if (index > -1) {
                        this.rows.splice(index, 1);
                    }
                }
            )
        );
    }
    onAdded(e: Event) {
        this.rows.unshift(this.generateEventRow(e));
        this.newEvent = new Event();
    }
    onRefresh() {
        this.isRefreshing = true;
        this.rows.forEach(
            row => this.validateOutdated(row)
        );
        interval(1500).subscribe(
            _ => this.isRefreshing = false
        );
        

    }
    goMuster(event: Event) {
        this.currentEvent = event;
        this.musterMode = true;
    }
    backMuster() {
        this.currentEvent = null;
        this.musterMode = false;
    }
    show(id: string, event: Event){
        this.currentEvent = event;
        this.childComp = id;
    }
}
