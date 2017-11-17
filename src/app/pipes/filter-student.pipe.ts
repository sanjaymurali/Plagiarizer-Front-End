import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterStudent'
})
export class FilterStudentPipe implements PipeTransform {

    transform(values: any, inputStudentID: number, anotherInput: number): any {
        if (!values) {
            return values;
        } else {
            return values.filter(value => (value.studentID !== inputStudentID && value.studentID !== anotherInput));
        }
    }

}
