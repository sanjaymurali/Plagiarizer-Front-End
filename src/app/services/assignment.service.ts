import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class AssignmentService {
    private BASE_URL = environment['BASE_URL'] || 'http://localhost:8080/';

    private assignment: any[];
    private submissions: any[];

    constructor(private $http: HttpClient) {
    }

    // get all submissions
    getAssignment() {
        return this.$http.get(this.BASE_URL + 'assignment');
    }

    getSubmission(studentID: Number) {
        return this.$http.get(this.BASE_URL + 'assignment/' + studentID);
    }

    getFile(studentID: string, fileName: string) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('studentID', studentID);
        queryParams = queryParams.append('fileName', fileName);
        return this.$http.get(this.BASE_URL + 'submission', {params: queryParams});
    }

    setAssignmentLocally(assignment) {
        this.assignment = assignment;
        this.submissions = assignment.map(one => one);
    }

    getAssignmentLocally() {
        return this.assignment;
    }

    getCurrentStudent() {
        return this.submissions.pop();
    }

}
