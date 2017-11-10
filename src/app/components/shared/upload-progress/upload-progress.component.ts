import { Component, OnInit } from '@angular/core';
import {NotifyService} from '../../../services/notify.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-upload-progress',
  templateUrl: './upload-progress.component.html',
  styleUrls: ['./upload-progress.component.css']
})
export class UploadProgressComponent implements OnInit {

  percentDone: Number;
  fileUploaded: Boolean = false;

  constructor(private progressService: NotifyService) { }

  ngOnInit() {

    this.progressService.progressData$.subscribe(event => {
      if (event['type'] === HttpEventType.UploadProgress) {
        this.fileUploaded = false;
        // This is an upload progress event. Compute and show the % done:
        this.percentDone = Math.round(100 * event['loaded'] / event['total']);
      } else if (event instanceof HttpResponse) {
        setTimeout(() =>
          this.fileUploaded = true
        , 3000);

        console.log('File is completely uploaded!');
      }
    }, err => console.log('errr', err));
  }

}
