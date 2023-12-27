import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {
  
  qId = 0;
  quiz:any;

  categories=[
    {
      cid:0,
      title:'',
      description:''
    }
  ]

  constructor(private route:ActivatedRoute, 
    private _quiz:QuizService, 
    private _category:CategoryService,
    private router:Router){}
  
  ngOnInit(): void {
    this.qId = this.route.snapshot.params['qid'];  
    
    this._quiz.getQuiz(this.qId).subscribe(
      (data:any)=>{
        this.quiz = data;
        console.log(this.quiz);
      },
      (error)=>{
        console.log(error);
      }
    );

    this._category.categories().subscribe(
      (data:any)=>{
        this.categories = data;
      },
      (error)=>{
        console.log("error in loading categories");
      }
    )
  }

  // update form submit
  public updateQuiz(){
    // to do validation

    this._quiz.updateQuiz(this.quiz).subscribe(
      (data:any)=>{
        Swal.fire('Sucess..!!', 'Quiz Updated', 'success').then((e)=>{
          this.router.navigate(['/admin/quizzes']);
        });
      },
      (error)=>{
        Swal.fire('Error..!!', 'Server Error', 'error');
      }
    )

  }

}
