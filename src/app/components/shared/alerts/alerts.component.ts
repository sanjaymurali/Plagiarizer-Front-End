import {Component, Input, OnInit} from '@angular/core';
import {NotifyService} from '../../../services/notify.service';

@Component({
    selector: 'app-alerts',
    templateUrl: './alerts.component.html',
    styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

    success: Boolean = false;
    error: Boolean = false;
    message: String = '';

    constructor(private alertService: NotifyService) {
    }

    ngOnInit() {
        this.alertService.alertData$.subscribe(res => {
            this.success = res['success'];
            this.error = res['error'];
            this.message = res['message'];
        }, err => console.log('Error in Alert Component: ', err));
    }


}
