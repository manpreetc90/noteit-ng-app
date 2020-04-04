import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../shared/api.service';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  model: FeedbackViewModel = {
    name: '',
    email: '',
    feedback: ''
  }
  constructor(private apiService: ApiService) {

  }

  sendFeedback() :void {
      this.apiService.postFeedback(this.model).subscribe(
        res => {
            location.reload();
        },
        err => {
            alert("Error occurred while posting feedback");
        }
      );
  }

  ngOnInit(): void {
  }
}

export interface FeedbackViewModel{
  name: String;
  email: String;
  feedback: String;
}
