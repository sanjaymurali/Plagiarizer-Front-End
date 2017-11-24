import {Component, OnInit} from '@angular/core';
import {AssignmentService} from '../../services/assignment.service';
import {ActivatedRoute, Router} from '@angular/router';
import {isUndefined} from 'util';
import {CompareService} from '../../services/compare.service';

declare var $: any;

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

    compareCheck = true;

    showLoader = false;

    constructor(private assignmentService: AssignmentService,
                private router: Router,
                private route: ActivatedRoute,
                private compareService: CompareService) {
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
        this.compareService.submitForComparison(this.selectedFiles1, this.selectedFiles2)
            .subscribe(res => {

                    if (!isUndefined(res['body'])) {
                        console.log(res['body']);
                        this.showLoader = false;
                        this.runLoader();
                        //localStorage.setItem("result", )
                        this.router.navigate(['result']);
                    } else {
                        console.log("Happening...");
                        this.showLoader = true;
                        this.runLoader();
                    }

                }, err => console.log(err)
            );
    }

    // jQuery used here to add/remove CSS styles
    runLoader() {
        if (this.showLoader) {
            $('.compare-component').css({
                'pointer-events': 'none',
                'cursor': 'default',
                'opacity': 0.1
            });
        } else {
            $('.compare-component').css({
                'opacity': '',
                'pointer-events': '',
                'cursor': ''
            });
        }


    }
}
