import { Component, OnInit } from '@angular/core';
import {AssignmentService} from '../../services/assignment.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {

  firstSubmissionSelected: any;
  secondSubmissionSelected: any;
  studentName1: String;
  studentName2: String;

  constructor(private assignmentService: AssignmentService) { }

  ngOnInit() {
  }

  firstSubmission(event) {
    if (event.studentName) {
      this.studentName1 = event.studentName;
    } else {
      this.firstSubmissionSelected = event;
    }
  }

  secondSubmission(event) {
    if (event.studentName) {
      this.studentName2 = event.studentName;
    } else {
      this.secondSubmissionSelected = event;
    }
  }

  disableCompareCheck() {
    if (this.firstSubmissionSelected && this.secondSubmissionSelected) {
      const firstLength = this.firstSubmissionSelected.fileNames.length;
      const secondLength = this.secondSubmissionSelected.fileNames.length;
      if (firstLength !== 0 && secondLength !== 0) {
        return false;
      }
    }
    return true;
  }

  compare() {
    console.log(this.firstSubmissionSelected , ' ' , this.secondSubmissionSelected);
  }

}
