import { Component, OnInit } from '@angular/core';
import {CompareService} from "../../services/compare.service";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

    selectedStudents: any;

  constructor(private compareService: CompareService) { }

  ngOnInit() {
      this.selectedStudents = this.compareService.selectedStudents;
      console.log(this.selectedStudents);
  }

}
