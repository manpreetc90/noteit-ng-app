import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { Notebook } from './model/notebook';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notebooks: Notebook[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getAllNotebooks();
  }

  getAllNotebooks(){
    let url= "http://localhost:8082/api/notebooks/all";
    this.http.get<Notebook[]>(url).subscribe(
      res => {
        this.notebooks = res;
      },
      err => {
        alert("Error occured while getting the notebooks")
      }
    )
  }

}
