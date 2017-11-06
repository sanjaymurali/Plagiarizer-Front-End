import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class ProgressService {

  private psData = new Subject();

  psData$ = this.psData.asObservable();

  public pushData(data) {
    this.psData.next(data);
  }
}
