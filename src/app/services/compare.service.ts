import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';

@Injectable()
export class CompareService {
    private BASE_URL = environment['BASE_URL'] || 'http://localhost:8080/';
    private _selectedStudents: any;

    constructor(private $http: HttpClient) {}

    submitForComparison(student1, student2) {
        const x = {
            students: [student1, student2]
        };

        this._selectedStudents = x; // setting selectedStudents to use it in other components

        const req = new HttpRequest('POST', this.BASE_URL + 'compare', JSON.stringify(x), {
            headers: new HttpHeaders({'Content-Type': 'application/json'}),
            reportProgress: true,
        });

        return this.$http.request(req);
    }

    get selectedStudents(): any {
        return this._selectedStudents;
    }

    set selectedStudents(value: any) {
        this._selectedStudents = value;
    }

}
