import {Component, Input, OnInit} from '@angular/core';
import {AssignmentService} from '../../services/assignment.service';

@Component({
  selector: 'app-select-student',
  templateUrl: './select-student.component.html',
  styleUrls: ['./select-student.component.css']
})
export class SelectStudentComponent implements OnInit {

  assignment: any;
  submission: Number;
  noSubmissions: Boolean;
  @Input() disableStudent: string;

  constructor(private assignmentService: AssignmentService) { }

  ngOnInit() {
    this.assignmentService.getAssignment().subscribe(res => {
      this.assignment = res;
      // if no submissions are present
      if (this.assignment.length === 0) {
        this.noSubmissions = true;
      } else {
        this.noSubmissions = false;
        this.submission = this.assignment[0]['studentID']; // initially
      }

    }, err => console.log(err));



  }

  selectedStudent(student) {
    const studentID: Number = student;
    this.submission = studentID;
  }

}

