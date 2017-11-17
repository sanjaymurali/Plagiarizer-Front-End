import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {AssignmentService} from '../../services/assignment.service';
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import {FilterStudentPipe} from "../../pipes/filter-student.pipe";

@Component({
    selector: 'app-select-student',
    templateUrl: './select-student.component.html',
    styleUrls: ['./select-student.component.css'],
    providers: [FilterStudentPipe]
})
export class SelectStudentComponent implements OnInit {

    @Input() studentSelected: any;
    @Output() eventEmitterStudentID: EventEmitter<any> = new EventEmitter(true);
    @Output() eventEmitterSelectedFiles: EventEmitter<any> = new EventEmitter(true);

    currentSubmission: any;
    assignment: any[];
    // UI
    noSubmissions: boolean;
    needMoreSubmission: boolean;
    onlyOneToShow: boolean;

    constructor(private assignmentService: AssignmentService, private filterStudent: FilterStudentPipe) {}

    ngOnInit() {
        this.assignment = this.assignmentService.getAssignmentLocally();
        this.currentSubmission = this.assignmentService.getCurrentStudent();

        if (!this.assignment || this.assignment.length === 0) {
            this.noSubmissions = true;
        }  else if (!this.currentSubmission) {
            this.needMoreSubmission = true;
        } else {
            this.checkNumberOfSubmissions(this.assignment, this.currentSubmission['studentID']);
            this.noSubmissions = false;
            this.needMoreSubmission = false;
            this.eventEmitterStudentID.emit(this.currentSubmission['studentID']);
        }
    }

    selectedStudent(submission) {
        this.eventEmitterStudentID.emit(submission['studentID']);
        this.currentSubmission = (submission);
    }

    checkNumberOfSubmissions(assignment, studentID) {
        const x = this.filterStudent.transform(assignment, studentID, this.studentSelected);
        if (x.length === 0 || x.length === 1) {
            this.onlyOneToShow = true;
        } else {
            this.onlyOneToShow = false;
        }
    }

    emitToParent(event) {
        this.eventEmitterSelectedFiles.emit(event);
    }


}

