import {Component, OnInit} from '@angular/core';
import {CompareService} from "../../services/compare.service";
import {isNullOrUndefined} from "util";
import {Router} from "@angular/router";

@Component({
    selector: 'app-result',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

    selectedStudents: any;
    result: any;
    noStudents = false;

    constructor(private compareService: CompareService, private router: Router) {
    }

    ngOnInit() {
        this.selectedStudents = this.compareService.selectedStudents;

        this.result = this.compareService.getResult();
        if (isNullOrUndefined(this.selectedStudents) && isNullOrUndefined(this.result)) {
            this.noStudents = true;
        }
        console.log(this.selectedStudents);
        console.log(this.result);
    }

    compareAgain() {
        localStorage.clear();
        this.router.navigate(['/select']);
    }

}
