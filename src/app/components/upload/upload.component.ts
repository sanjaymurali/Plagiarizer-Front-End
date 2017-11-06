import {Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { UploadService } from '../../services/upload.service';
import {ProgressService} from '../../services/progress.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  providers: [UploadService]
})
export class UploadComponent implements OnInit {

  private formData = new FormData();
  uploadError: Boolean = false;
  showProgress: Boolean = false;

  constructor(private uploadService: UploadService, private progressService: ProgressService) { }

  ngOnInit() {
  }

  uploadFile(uploadForm: NgForm) {
    this.formData.append('name', uploadForm.value.name);
    this.uploadService.upload(this.formData)
      .subscribe(
        res => {
          this.showProgress = true;
          this.progressService.pushData(res);
        },
        err => {
          this.uploadError = true;
          this.showProgress = false;
          console.log('error', err);
        });

  }

  fileChanges(event) {
    for (let i = 0; i < event.target.files.length; i++) {
      this.formData.append('files', event.target.files[i]);
    }
  }

}
