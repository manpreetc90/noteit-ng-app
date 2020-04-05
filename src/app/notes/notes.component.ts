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
  selectedNotebook: Notebook;
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

  selecAllNotes(){
    this.selectedNotebook = null;
    this.getAllNotes();
  }

  deleteNote(note: Note){
   if(confirm('Are you sure you want to delete the note?')){
    this.apiService.deleteNote(note.id).subscribe(
      res => {
        let index= this.notes.indexOf(note);
        this.notes.splice(index,1);
      },
      err => {
        alert("An error occurred while delete note");
      }
    );
   }
  }

  selectNotebook(notebook: Notebook){
    this.selectedNotebook= notebook;
    this.apiService.getNotesByNotebook(notebook).subscribe(
      res => {
        this.notes= res;
      },
      err => {
         alert("An error has ocurred while downloading notes");
    }
    );
   }

  createNote(notebookId: string){
    let newNote: Note = {
      id : null,
      title: "New Note",
      text: "Write some text in here",
      lastModifiedOn: null,
      notebookId: notebookId
    };
    this.apiService.saveNote(newNote).subscribe(
      res => {
        newNote.id= res.id;
        this.notes.push(newNote);
      },
      err => {
        alert("AN error occurred while saving the note");
      }
    );
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
    };
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

  updateNote(note: Note){
      this.apiService.saveNote(note).subscribe(
        res => {

        },
        err => {
          alert("An error occurred while updating the note");
        }
      );
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
          if(notebook.id == this.selectedNotebook.id){
          this.selectedNotebook= null;
          this.getAllNotes();
      }
      },
      err => {
        alert("Error happened while delete notebook");
      }
    );
  }
  }
}
