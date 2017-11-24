import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {AssignmentService} from './assignment.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Observable} from "rxjs/Observable";

@Injectable()
export class AssignmentResolver implements Resolve<any> {
    constructor(private assignmentService: AssignmentService) {
    }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return this.assignmentService.getAssignment().catch(
            (err: Response, caught: Observable<any>) => {
                alert("Backend Server is down!");
                if (err !== undefined) {
                    return Observable.throw('The Backend server is down!');
                }
                return Observable.throw(caught); // <-----
            });
    }
}
