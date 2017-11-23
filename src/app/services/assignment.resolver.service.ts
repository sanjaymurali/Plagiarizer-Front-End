import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AssignmentService} from './assignment.service';

@Injectable()
export class AssignmentResolver implements Resolve<any> {
    constructor(private assignmentService: AssignmentService) {
    }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return this.assignmentService.getAssignment();
    }
}
