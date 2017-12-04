import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {isNullOrUndefined, isUndefined} from "util";

@Injectable()
export class CompareService {
    private BASE_URL = environment['BASE_URL'] || 'http://localhost:8080/';
    private _selectedStudents: any;

    constructor(private $http: HttpClient) {
    }

    submitForComparison(student1, student2) {
        const x = {
            students: [student1, student2]
        };
        localStorage.setItem('selectedStudents', JSON.stringify(x));
        this._selectedStudents = x; // setting selectedStudents to use it in other components

        const req = new HttpRequest('POST', this.BASE_URL + 'compare', JSON.stringify(x), {
            headers: new HttpHeaders({'Content-Type': 'application/json'}),
            reportProgress: true,
        });
        return this.$http.request(req);
    }

    get selectedStudents(): any {
        const selectedStudentsLocalStorage = localStorage.getItem('selectedStudents');
        if (isUndefined(this._selectedStudents) && !isNullOrUndefined(selectedStudentsLocalStorage)) {
            return JSON.parse(selectedStudentsLocalStorage);
        } else {
            return this._selectedStudents;
        }
    }

    set selectedStudents(value: any) {
        this._selectedStudents = value;
    }

    getResult() {
        const resultLocalStorage = localStorage.getItem('result');

        if (!isNullOrUndefined(resultLocalStorage)) {
            const resultsString = resultLocalStorage.split(',');
            const resultInts = [];
            for (let i = 0; i < resultsString.length; i++) {
                resultInts[i] = parseFloat(resultsString[i]);
            }

            return resultInts;
        }

        return null;
    }

}
