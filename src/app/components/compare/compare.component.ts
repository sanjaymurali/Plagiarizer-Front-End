import {
    AfterContentChecked,
    AfterContentInit, AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, OnChanges, OnInit, QueryList,
    ViewChild,
    ViewChildren
} from '@angular/core';
import {AssignmentService} from '../../services/assignment.service';
import {SelectStudentComponent} from "../select-student/select-student.component";
import {ActivatedRoute} from "@angular/router";
import {ShowUploadedFilesComponent} from "../show-uploaded-files/show-uploaded-files.component";
import {isUndefined} from "util";

@Component({
    selector: 'app-compare',
    templateUrl: './compare.component.html',
    styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {

    selectedStudent1: any;
    selectedStudent2: any;

    selectedFiles1: any;
    selectedFiles2: any;

    compareCheck: boolean = true;

    constructor(private assignmentService: AssignmentService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.assignmentService.setAssignmentLocally(this.route.snapshot.data.assignment);
        this.disableCompareCheck(this.selectedFiles1, this.selectedFiles2);
    }

    fromFirstComponentStudentID(event) {
        this.selectedStudent1 = event;
        this.selectedFiles1 = null;
        this.disableCompareCheck(this.selectedFiles1, this.selectedFiles2);
    }

    fromFirstComponentSelectedFile(event) {
        this.selectedFiles1 = event;

        this.disableCompareCheck(this.selectedFiles1, this.selectedFiles2);
    }

    fromSecondComponentStudentID(event) {
        this.selectedStudent2 = event;
        this.selectedFiles2 = null;
        this.disableCompareCheck(this.selectedFiles1, this.selectedFiles2);
    }

    fromSecondComponentSelectedFile(event) {

        this.selectedFiles2 = event;

        this.disableCompareCheck(this.selectedFiles1, this.selectedFiles2);
    }

    disableCompareCheck(files1, files2) {
        if (!files1) {
            this.compareCheck = true;
        } else if (!files2) {
            this.compareCheck = true;
        } else {
            const firstLength = files1.fileNames.length;
            const secondLength = files2.fileNames.length;
            if (firstLength !== 0 && secondLength !== 0) {
                this.compareCheck = false;
            } else {
                this.compareCheck = true;
            }
        }
    }

    compare() {

        // Wire here to hit the backend
    }
}
