import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { Event } from '../../object/event';
import { Subscription, interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventService } from '../../event.service';
import { Attendee } from '../../object/attendee';

@Component({
  selector: 'app-muster',
  templateUrl: './muster.component.html',
  styleUrls: ['./muster.component.css']
})
export class MusterComponent implements OnChanges {


  @Input() event: Event;
  @Output() backMuster = new EventEmitter();
  stateTitle: string;
  state: string;
  timer: string = "00:00:00";
  timerCounter: Subscription;
  timeOut: string = "00:00"
  timeOutCounter: Subscription;
  mTimeOut: number;
  sTimeOut: number;
  isTimeOutTurnOn: boolean = false;
  rfid: string = '';
  att: Attendee;
  constructor(private eventService: EventService) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.stateTitle = "vào";
    this.state = "in";

    let h, m, s: number;
    let sp = this.event.end_time.split(":");
    h = +sp[0];
    m = +sp[1];
    let t_end = (h * 60 + m) * 60 * 1000;
    let end = new Date();
    end.setTime(t_end);
    let now = new Date();
    h = now.getHours();
    m = now.getMinutes();
    s = now.getSeconds();
    let t_now = (h * 60 + m) * 60 * 1000 + s * 1000;
    now.setTime(t_now);


    this.timerCounter = interval(1000).subscribe(
      _ => {
        t_now += 1000;
        let countdown = new Date();
        let t_cd = t_end - t_now + (countdown.getTimezoneOffset() * 60 * 1000);
        let hours, mins, secs: number;
        countdown.setTime(t_cd);
        hours = countdown.getHours();
        mins = countdown.getMinutes();
        secs = countdown.getSeconds();
        if (hours <= 0 && mins <= 0 && secs <= 0 || t_cd < countdown.getTimezoneOffset() * 60 * 1000) {
          this.isTimeOutTurnOn = true;
          hours = 0;
          mins = 0;
          secs = 0;
        }
        this.timer = (hours <= 9 ? '0' + hours : hours)
          + ":"
          + (mins <= 9 ? '0' + mins : mins)
          + ":"
          + (secs <= 9 ? '0' + secs : secs);

        if (this.isTimeOutTurnOn) {
          this.timerCounter.unsubscribe();
          this.state = 'out';
          this.stateTitle = 'ra';
        }
      }
    );

    let nowTO = new Date();
    let hTO = nowTO.getHours();
    let mTO = nowTO.getMinutes();
    let sTO = nowTO.getSeconds();
    let t_nowTO = (hTO * 60 + mTO) * 60 * 1000 + sTO * 1000;
    let t_endTO = t_end + this.event.timeout * 60 * 1000;


    if ((t_end - t_nowTO) < 0) {
      let dTO = new Date();

      dTO.setTime(t_endTO - t_nowTO + dTO.getTimezoneOffset() * 60 * 1000);
      this.mTimeOut = dTO.getHours() * 60 + dTO.getMinutes();
      this.sTimeOut = dTO.getSeconds();
    } else {
      this.mTimeOut = this.event.timeout;
      this.sTimeOut = 0;
    }
    this.timeOut = (this.event.timeout <= 9 ? '0' + this.event.timeout : this.event.timeout) + ":00";

    this.timeOutCounter = interval(1000).subscribe(
      t => {
        if (this.isTimeOutTurnOn) {
          this.sTimeOut = this.sTimeOut - 1;
          if (this.sTimeOut < 0) {
            this.sTimeOut = 59;
            this.mTimeOut -= 1;
          }
          this.timeOut = (this.mTimeOut <= 9 ? '0' + this.mTimeOut : this.mTimeOut)
            + ":"
            + (this.sTimeOut <= 9 ? '0' + this.sTimeOut : this.sTimeOut);
          if (this.mTimeOut == 0 && this.sTimeOut == 0) {
            this.isTimeOutTurnOn = false;
          }
        }
      }
    );
  }

  back() {
    this.timerCounter.unsubscribe();
    this.timeOutCounter.unsubscribe();
    this.backMuster.emit();
  }
  muster() {

    this.eventService.musterAttendee(this.event.id, this.rfid, this.state).subscribe(
      a => {
        this.att = a;
      }
    );
    this.rfid = '';
    
  }
}
