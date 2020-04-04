import { Injectable, ɵALLOW_MULTIPLE_PLATFORMS } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notebook } from '../notes/model/notebook';
import { FeedbackViewModel } from '../feedback/feedback.component';
import { Note } from '../notes/model/note';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private BASE_URL = "http://localhost:8082/api";
  private ALL_NOTEBOOKS_URL = this.BASE_URL + '/notebooks/all';
  private  SEND_FEEDBACK_URL = this.BASE_URL + '/feedback';
  private  SAVE_UPDATE_NOTEBOOKS = this.BASE_URL + '/notebooks/save';
  private  DELETE_NOTEBOOK_URL = this.BASE_URL + '/notebooks/delete';
  private ALL_NOTES_URL = this.BASE_URL + '/notes/all';
  private NOTES_BY_NOTEBOOK_URL = this.BASE_URL + '/notes/byNotebook/';

  constructor(private http: HttpClient) {

  }

  getAllNotebooks(): Observable<Notebook[]> {
      return this.http.get<Notebook[]>(this.ALL_NOTEBOOKS_URL);
  }

  postFeedback(feedback: FeedbackViewModel): Observable<any> {
    return this.http.post(this.SEND_FEEDBACK_URL, feedback);
  }

  postNotebook(notebook: Notebook): Observable<Notebook>{
    return this.http.post<Notebook>(this.SAVE_UPDATE_NOTEBOOKS, notebook);
  }

  deleteNotebook(id: string): Observable<any>{
    return this.http.delete(this.DELETE_NOTEBOOK_URL+ "/"+ id);
  }

  getAllNotes(): Observable<Note[]>{
    return this.http.get<Note[]>(this.ALL_NOTES_URL);
  }

  getNotesByNotebok(notebookId: string): Observable<Note[]>{
    return this.http.get<Note[]>(this.NOTES_BY_NOTEBOOK_URL + notebookId);
  }
}
