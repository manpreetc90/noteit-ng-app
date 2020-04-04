import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { Notebook } from './model/notebook';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notebooks: Notebook[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getAllNotebooks();
  }

  getAllNotebooks(){
    this.apiService.getAllNotebooks().subscribe(
      res => {
        this.notebooks = res;
      },
      err =>{
        alert("Error occured while getting notebooks");
      }
    );

  }

}
