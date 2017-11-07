import {Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { UploadService } from '../../services/upload.service';
import {NotifyService} from '../../services/notify.service';
import {isUndefined} from 'util';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  providers: [UploadService]
})
export class UploadComponent implements OnInit {

  private formData = new FormData();
  showProgress: Boolean = false;
  message: String = '';

  constructor(private uploadService: UploadService, private notifyService: NotifyService) { }

  ngOnInit() {
  }

  uploadFile(uploadForm: NgForm) {
    this.formData.append('name', uploadForm.value.name);
    this.uploadService.upload(this.formData)
      .subscribe(
        res => {
          this.showProgress = true;

          // to make sure that we set the flags after the file gets completely uploaded
          if (!isUndefined(res['body'])) {
            const data = {
              success: true,
              error: false,
              message: res['body']['message']
            };
            this.notifyService.pushAlertData(data);
          }
          this.notifyService.pushProgressData(res);
        },
        err => {

          let message = '';
          this.showProgress = false;
          if (!isUndefined(err['error'])) {
            message = err['error']['message'];
          } else {
            message = 'Error Uploading the file(s)';
          }
          const data = {
            success: false,
            error: true,
            message: message
          };
          this.notifyService.pushAlertData(data);
          this.resetForm(uploadForm);
        }, () => this.resetForm(uploadForm));

  }

  fileChanges(event) {
    for (let i = 0; i < event.target.files.length; i++) {
      this.formData.append('files', event.target.files[i]);
    }
  }

  resetForm(form: NgForm) {
    form.reset();
    this.formData = new FormData();
  }

}
