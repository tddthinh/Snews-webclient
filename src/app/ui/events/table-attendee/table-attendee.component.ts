import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { Attendee } from '../../object/attendee';
import { EventService } from '../../event.service';
import { LoadingBarService } from '../../header/loading-bar.service';
import { Observable } from 'rxjs';
import { Event } from '../../object/event';
import { Label } from '../../object/label';
import { AttendeeService } from '../../attendee.service';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
interface AttendeeRow {
  attendee: Attendee;
  checked: boolean;
}

@Component({
  selector: 'app-table-attendee',
  templateUrl: './table-attendee.component.html',
  styleUrls: ['./table-attendee.component.css']
})
export class TableAttendeeComponent implements OnChanges {


  @Input() event: Event;
  limit: number = 10;
  collectionSize: number;
  page: number = 1;
  rows: AttendeeRow[] = [];
  newAtt: Attendee;
  file: File;
  importMsg: string;
  labels : Label[];
  tempSearchString: string = "";
  @Input() searchString: string = "";
  constructor(private eventService: EventService, private attendeeService: AttendeeService,
    private loadingService: LoadingBarService) { }
  ngOnInit() {
    this.newAtt = new Attendee();
    this.newAtt.eventId = this.event.id;
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.rows.splice(0, this.rows.length);
    this.initAttendees();
    this.initLabels();
    if (this.event) this.getMaxPage();
    this.tempSearchString = this.searchString;
  }

  initAttendees() {
    this.loadingService.setLoading(true);
    var ob = this.eventService.firstAttendee(this.event.id,this.searchString, this.limit);
    this.updateAttendees(ob);
  }

  initLabels() {
    this.attendeeService.getLabels().subscribe(
      l => this.labels = l
    );
  }

  next() {
    this.loadingService.setLoading(true);
    var ob = this.eventService.nextAttendee(this.event.id,this.searchString, this.limit);
    this.updateAttendees(ob);
  }
  previous() {
    this.loadingService.setLoading(true);
    var ob = this.eventService.previousAttendee(this.event.id,this.searchString, this.limit);
    this.updateAttendees(ob);
  }
  specific(n: number) {
    this.loadingService.setLoading(true);
    var ob = this.eventService.specificPageAttendee(this.event.id,this.searchString, n, this.limit);
    this.updateAttendees(ob);
  }
  private updateAttendees(ob: Observable<Attendee[]>) {
    ob.subscribe(
      Attendees => {
        if (Attendees.length !== 0) {
          this.rows = [];
          this.event.attendees_count = Attendees.length;
          Attendees.forEach(e => {
            this.rows.push({ attendee: e, checked: false })
          });
        }
        this.loadingService.setLoading(false);
      }
    );
  }
  getMaxPage() {
    this.eventService.countAttendees(this.event.id,this.searchString).subscribe(
      t => {
        this.collectionSize = t;
      }
    );
  }
  onPager(pageNum: number): void {
    //console.log("Pager event Is: ", event)
    this.specific(pageNum);
  }

  remove() {
    this.rows.filter(e => e.checked).forEach(
      t => this.attendeeService.removeAttendee(t.attendee.id).subscribe(
        _ => {
          const index = this.rows.indexOf(t, 0);
          if (index > -1) {
            this.rows.splice(index, 1);
            this.event.attendees_count -= 1;
          }
        }
      )
    );
  }
  onAdded(att: Attendee) {
    this.event.attendees_count += 1;
    this.rows.unshift({ attendee: att, checked: false });
  }
  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.file = fileList[0];
    }
  }
  _import() {
    if (this.file) {
      this.eventService.importAttendee(this.file, this.event.id).subscribe(
        next => {
          this.rows.splice(0, this.rows.length);
          this.initAttendees();
          this.initLabels();
          if (this.event) this.getMaxPage();
          this.importMsg = next.value+ "/"+ next.max + " dữ liệu được nhập.";
        },
        error => {
          this.importMsg = "có lỗi xẩy ra!";
        }
      )
    }
  }

  search(){
    this.searchString = this.tempSearchString;
    this.ngOnChanges(null);
  }
}
