import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  
  
  categories=[
    {
      cid:0,
      title:'',
      description:''
    }
  ]

  quizData={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:true,
    category: {
      cid:0
    },
  }
  
  constructor(private _cat:CategoryService, private _snack:MatSnackBar, private _quizService:QuizService){}

  ngOnInit(): void {
    this._cat.categories().subscribe(
      (data:any)=>{
        this.categories = data;
        console.log(this.categories);
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error..!!', 'Server Error','error');
      }
    )
  }

  addQuiz(){
    if(this.quizData.title.trim() =='' && this.quizData.title == null){
      this._snack.open('Title Required..!!','',{
        duration:3000,
      });
      return;
    }

    this._quizService.addQuiz(this.quizData).subscribe(
      (data:any)=>{
        Swal.fire('Success!!', 'Quiz is Added..', 'success');
        this.quizData={
          title:'',
          description:'',
          maxMarks:'',
          numberOfQuestions:'',
          active:false,
          category: {
            cid:0
          },
        }
      },
      (error)=>{
        Swal.fire('Error!!', 'Server Error', 'error');
      }
    )
  }

  

}
