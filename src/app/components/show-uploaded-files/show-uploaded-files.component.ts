import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {AssignmentService} from '../../services/assignment.service';

@Component({
  selector: 'app-show-uploaded-files',
  templateUrl: './show-uploaded-files.component.html',
  styleUrls: ['./show-uploaded-files.component.css']
})
export class ShowUploadedFilesComponent implements OnChanges, OnInit {

  submission: any;
  selectedStudent: any;
  @Output() emitSelectedStudent: EventEmitter<any> = new EventEmitter<any>();
  @Input() studentID: Number;

  selectedFileForPreview: {studentID: Number, fileName: string};

  constructor(private assignmentService: AssignmentService) {
  }

  ngOnInit() {

  }

  ngOnChanges(changes) {
    if (!changes.studentID.firstChange) {
      this.submission = [];
      this.selectedStudent = {
        studentID: 0,
        fileNames: []
      }
      const studentID = changes.studentID.currentValue;
      this.assignmentService.getSubmission(studentID)
        .subscribe(res => {
          this.submission = res;
          this.emitSelectedStudent.emit({
            'studentName': this.submission.studentName
          });
        }, err => console.log(err));
    }
  }

  showPreview(fileName: string) {
    this.selectedFileForPreview = {
      studentID: this.studentID,
      fileName: fileName
    };
  }

  selectedFiles(studentID: Number, fileName: string) {
      this.selectedStudent.studentID = studentID;
      const indexOfFileName = this.selectedStudent
                                  .fileNames
                                  .findIndex(filename => {
                                    return filename === fileName;
                                  });
      if (indexOfFileName === -1) { // add file to the array
        this.selectedStudent.fileNames.push(fileName);
      } else {
        this.selectedStudent.fileNames.splice(indexOfFileName, 1);
      }

      this.emitSelectedStudent.emit(this.selectedStudent);

  }

}
