import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {
  
  qId: any;
  qTitle: any;

  questions=[
    {
        quesId: 0,
        content: "",
        image: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        answer: "",
    }
  ];
  
  constructor(private _route:ActivatedRoute,
    private _qusetionService:QuestionService,
    private snack:MatSnackBar
    ){}

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    

    this._qusetionService.getQuestionsOfQuiz(this.qId).subscribe(
      (data:any)=>{
        this.questions = data;
      },
      (error)=>{
        console.log(error);
        
      }
    )
    
  }

  //delete question
  deleteQuestion(quesId:any){
    Swal.fire({
      icon:"info",
      showCancelButton:true,
      confirmButtonText:"Delete",
      title:"Are you sure, want to delete this question?"
    }).then((result)=>{
      if(result.isConfirmed){
        this._qusetionService.deleteQuestion(quesId).subscribe(
          (data : any)=>{
            this.snack.open('Question Deleted..', '', {
              duration: 3000
            });
            this.questions = this.questions.filter((q)=>
            q.quesId!=quesId
            )
          },
          (error)=>{
            this.snack.open('Error in deleting question','',{
              duration:3000
            });
          }
        )
      }
    })
  }

}
