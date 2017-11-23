import {Component, Input, OnInit} from '@angular/core';
import {NotifyService} from '../../services/notify.service';

@Component({
    selector: 'app-show-selected-files',
    templateUrl: './show-selected-files.component.html',
    styleUrls: ['./show-selected-files.component.css']
})
export class ShowSelectedFilesComponent implements OnInit {

    @Input() currentSubmission: any;

    constructor(private notifyService: NotifyService) {
    }

    ngOnInit() {
    }

    showPreview(fileName: string) {

        const selectedFileForPreview = {
            fileName: fileName,
            studentID: this.currentSubmission.studentID + ''
        };

        this.notifyService.pushPreviewData(selectedFileForPreview);
    }

}
