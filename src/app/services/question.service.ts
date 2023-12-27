import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService implements OnInit {

  constructor(private _http:HttpClient) { }
  
  ngOnInit(): void {
    
  }

  //get all questions - admin
  public getQuestionsOfQuiz(qid:any)
  {
    return this._http.get(`${baseUrl}/question/quiz/all/${qid}`);
  }

  //get limited questions - normal user
  public getQuestionsOfQuizForTest(qid:any)
  {
    return this._http.get(`${baseUrl}/question/quiz/${qid}`);
  }

  //add questions
  public addQuetion(question:any){
    return this._http.post(`${baseUrl}/question/`, question);
  }

  //delete question
  public deleteQuestion(qid:any){
    return this._http.delete(`${baseUrl}/question/${qid}`);
  }

  //eval quiz
  public evalQuiz(questions:any)
  {
    return this._http.post(`${baseUrl}/question/eval-quiz`, questions);
  }

}
