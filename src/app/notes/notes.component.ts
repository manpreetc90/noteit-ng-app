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

  createNotebook(){
    let newNotebook: Notebook = {
      name: 'New Notebook',
      id: null,
      nbNotes : 0
    }
    this.apiService.postNotebook(newNotebook).subscribe(
      res => {
        newNotebook.id = res.id;
        this.notebooks.push(newNotebook);
      },
      err => {
        alert("An error occurred while creating new notebook");
      }
    )
  }

  updateNotebook(updatedNotebook: Notebook){

    this.apiService.postNotebook(updatedNotebook).subscribe(
      res => { },
      err => {
         alert("Error occurred whle updating notebook");
        }
      );
  }
}
