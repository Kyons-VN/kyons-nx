import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { Subject } from '../../domain/subject/subject';
import { SERVER_API } from '../auth/interceptor';
import { DBHelper } from '../helper/helper';
import { Program } from './program';

const SELECTED_PROGRAM_KEY = 'selected_program';

@Injectable({
  providedIn: 'root',
})
export class KnowledgeService {
  constructor(private http: HttpClient) { }

  getSubjects(): Observable<Subject[]> {
    return this.http.get(SERVER_API + '/subjects').pipe(
      catchError(DBHelper.handleError('GET subjects_list', [])),
      map((collection: any) => {
        if (collection.length === 0) return [];
        return collection.map((item: any) => Subject.fromJson(item));
      })
    );
  }

  getPrograms(): Observable<Program[]> {
    return this.http.get(SERVER_API + '/students/programs').pipe(
      catchError(DBHelper.handleError('GET programs_list', [])),
      map((collection: any) => {
        if (collection.length === 0) return [];
        return collection.map((item: any) => Program.fromJson(item));
      })
    );
  }

  selectProgram(program: Program) {
    window.localStorage.setItem(
      SELECTED_PROGRAM_KEY,
      JSON.stringify(program.toJson())
    );
  }

  getSelectedProgram(): Program {
    return Program.fromJson(
      JSON.parse(
        window.localStorage.getItem(SELECTED_PROGRAM_KEY) ??
        JSON.stringify(Program.empty().toJson())
      )
    );
  }

  removeSelectedProgram() {
    window.localStorage.removeItem(SELECTED_PROGRAM_KEY);
  }
}
