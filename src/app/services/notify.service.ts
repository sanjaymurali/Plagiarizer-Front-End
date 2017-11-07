import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class NotifyService {

  private progressData = new Subject();
  private alertData = new Subject();

  progressData$ = this.progressData.asObservable();
  alertData$ = this.alertData.asObservable();

  public pushProgressData(data) {
    this.progressData.next(data);
  }

  public pushAlertData(data) {
    this.alertData.next(data);
  }
}
