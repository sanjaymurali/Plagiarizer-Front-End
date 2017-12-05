import {Component, Input, OnChanges, OnInit, AfterViewInit} from '@angular/core';
import {AssignmentService} from '../../services/assignment.service';
import {NotifyService} from "../../services/notify.service";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/do";
import {isNullOrUndefined} from "util";

@Component({
    selector: 'app-preview-file',
    templateUrl: './preview-file.component.html',
    styleUrls: ['./preview-file.component.css']
})
export class PreviewFileComponent implements OnInit {

    previewData: { fileContent: string, fileName: string } = {
        fileContent: '',
        fileName: ''
    };

    constructor(private notifyService: NotifyService, private assignmentService: AssignmentService) {
    }

    ngOnInit() {
        let temp = {};
        this.notifyService
            .previewFileData$
            .do(response => temp = response)
            .flatMap(response => this.assignmentService.getFile(temp['studentID'], temp['fileName']))
            .subscribe(res => {

                this.previewData.fileName = temp['fileName'];
                this.previewData.fileContent = res + '';

            }, err => {
                this.previewData.fileName = "Not Found!";
                this.previewData.fileContent = 'File Not Found!';
            });
    }
}
