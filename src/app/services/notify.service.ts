import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class NotifyService {

    private progressData = new Subject();
    private alertData = new Subject();
    private previewFileData = new Subject();
    private resultProgressData = new Subject();

    progressData$ = this.progressData.asObservable();
    alertData$ = this.alertData.asObservable();
    previewFileData$ = this.previewFileData.asObservable();
    resultProgressData$ = this.resultProgressData.asObservable();

    public pushProgressData(data) {
        this.progressData.next(data);
    }

    public pushAlertData(data) {
        this.alertData.next(data);
    }

    public pushPreviewData(data) {
        this.previewFileData.next(data);
    }

    public pushResultProgressData(data) {
        this.resultProgressData.next(data);
    }
}
