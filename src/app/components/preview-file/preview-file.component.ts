import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {AssignmentService} from '../../services/assignment.service';

@Component({
  selector: 'app-preview-file',
  templateUrl: './preview-file.component.html',
  styleUrls: ['./preview-file.component.css']
})
export class PreviewFileComponent implements OnInit, OnChanges {

  @Input() selectedFile: any;
  fileContent: any;

  constructor(private assignmentService: AssignmentService) { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    if (!changes.selectedFile.firstChange) {
      const currentValue = changes.selectedFile.currentValue;
      const studentID: string = currentValue.studentID + '';
      const fileName: string = currentValue.fileName;
      this.assignmentService.getFile(studentID, fileName)
        .subscribe(res => {
          this.fileContent = res;
        } , err => console.log(err));
    }
  }

}
