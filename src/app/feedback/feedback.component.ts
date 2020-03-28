import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  sendFeedback() :void {
    alert(this.model.name);
  }

  ngOnInit(): void {
  }
}

export interface FeedbackViewModel{
  name: String;
  email: String;
  feedback: String;
}
