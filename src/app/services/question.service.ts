import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {IQuestionAndAnswers} from '../models/question.interface';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private readonly _baseUrl= environment.apiUrl + '/question';

  constructor(
    private readonly _http: HttpClient,
  ) { }

  public getById(id: number): Promise<IQuestionAndAnswers> {
    const url = `${this._baseUrl}/get-question-with-answers/`;
    return firstValueFrom(this._http.post<IQuestionAndAnswers>(url, {question_id: id}));
  }
}
