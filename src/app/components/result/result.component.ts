import {Component, OnInit} from '@angular/core';
import {CompareService} from "../../services/compare.service";
import {isNullOrUndefined} from "util";

@Component({
    selector: 'app-result',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

    selectedStudents: any;
    noStudents = false;

    constructor(private compareService: CompareService) {
    }

    ngOnInit() {
        this.selectedStudents = this.compareService.selectedStudents;
        if (isNullOrUndefined(this.selectedStudents)) {
            this.noStudents = true;
        }
        console.log(this.selectedStudents);
    }

}
