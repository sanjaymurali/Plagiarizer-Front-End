import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {AssignmentService} from '../../services/assignment.service';

@Component({
  selector: 'app-show-uploaded-files',
  templateUrl: './show-uploaded-files.component.html',
  styleUrls: ['./show-uploaded-files.component.css']
})
export class ShowUploadedFilesComponent implements OnChanges, OnInit {

  submission: any;
  @Input() studentID: Number;

  selectedFileForPreview: {studentID: Number, fileName: string};


  constructor(private assignmentService: AssignmentService) {
  }

  ngOnInit() {

  }

  ngOnChanges(changes) {
    if (!changes.studentID.firstChange) {
      const studentID = changes.studentID.currentValue;
      this.assignmentService.getSubmission(studentID)
        .subscribe(res => {
          this.submission = res;
        }, err => console.log(err));
    }

  }

  showPreview(fileName: string) {
    this.selectedFileForPreview = {
      studentID: this.studentID,
      fileName: fileName
    };
  }

  selectedFiles(studentID: number, fileName: string) {

  }

}
