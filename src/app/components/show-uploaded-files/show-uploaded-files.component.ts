import {
    Component, Input, OnChanges, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, Output,
    EventEmitter
} from '@angular/core';
import {AssignmentService} from '../../services/assignment.service';
import {NotifyService} from '../../services/notify.service';

@Component({
    selector: 'app-show-uploaded-files',
    templateUrl: './show-uploaded-files.component.html',
    styleUrls: ['./show-uploaded-files.component.css']
})
export class ShowUploadedFilesComponent implements OnChanges, OnInit {

    selectedStudent: { 'studentID': number, 'studentName': string, 'fileNames': string[], 'filePaths': string[] };
    currentSubmission: any;

    @Input() submission: any;
    @Output() selectedFilesEmitter: EventEmitter<any> = new EventEmitter(true);

    constructor(private notifyService: NotifyService, private assignmentService: AssignmentService) {
    }

    ngOnInit() {
    }

    ngOnChanges(changes) {
        this.currentSubmission = changes.submission.currentValue;
        this.selectedStudent = {
            studentID: this.currentSubmission['studentID'],
            studentName: this.currentSubmission['studentName'],
            fileNames: [],
            filePaths: []
        };
    }

    showPreview(fileName: string) {

        const selectedFileForPreview = {
            fileName: fileName,
            studentID: this.currentSubmission.studentID + ''
        };

        this.notifyService.pushPreviewData(selectedFileForPreview);
    }

    selectedFiles(fileName: string, filePath) {
        const indexOfFileName = this.selectedStudent.fileNames.findIndex(filename => filename === fileName);
        if (indexOfFileName === -1) { // add file to the array
            this.selectedStudent.fileNames.push(fileName);
            this.selectedStudent.filePaths.push(filePath);
        } else {
            this.selectedStudent.fileNames.splice(indexOfFileName, 1);
            this.selectedStudent.filePaths.splice(indexOfFileName, 1);
        }

        this.selectedFilesEmitter.emit(this.selectedStudent);
    }

}
