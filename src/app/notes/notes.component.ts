import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { Notebook } from './model/notebook';
import { ApiService } from '../shared/api.service';
import { Note } from './model/note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notebooks: Notebook[] = [];
  notes: Note[] = [];
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getAllNotebooks();
    this.getAllNotes();
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

  getNotesByNotebook(){

  }
  getAllNotes(){
    this.apiService.getAllNotes().subscribe(
      res => {
        this.notes= res;
      },
      err => {
        alert("An error occurred while getting notes");
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

  deleteNotebook(notebook: Notebook){
    if(confirm('Are you sure you want to delete notebook?')){
    this.apiService.deleteNotebook(notebook.id).subscribe(
      res => {
          let index = this.notebooks.indexOf(notebook);
          this.notebooks.splice(index,1);
      },
      err => {
        alert("Error happened while delete notebook");
      }
    );
  }
  }
}
