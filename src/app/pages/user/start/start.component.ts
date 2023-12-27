import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  
  qid:any;
  questions = <any>[{
    quiz:{
      title:''
    },
   
  }];

  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;

  isSubmit = false;
  timer:any;
    
  constructor(private locationSt:LocationStrategy,
    private _route:ActivatedRoute,
    private _question:QuestionService
    ){}
  
  ngOnInit(): void {
   this.preventBackButton();
   this.qid = this._route.snapshot.params['qid'];

   this.loadQuestions();
  }

  preventBackButton(){
    history.pushState(null, '', location.href);
    this.locationSt.onPopState(()=>{
      history.pushState(null,'',location.href);
  });
}

loadQuestions(){
this._question.getQuestionsOfQuizForTest(this.qid).subscribe(
  (data:any)=>{
    this.questions = data;

    this.timer = this.questions.length * 2 * 60;

  console.log(data);

  this.startTimer();

  },
  (error)=>{
    console.log(error);
    Swal.fire('Error..!!', 'Server Error..', 'error');
  }
)
}

submitQuiz(){
  Swal.fire(
    {
      title: 'Do you want to submit the quiz?',
      showCancelButton:true,
      confirmButtonText:'Submit',
      icon:'info'
    }
  ).then((result)=>{
    if(result.isConfirmed){    
     this.evalQuiz();
    }else if(result.isDenied){
      Swal.fire('Changes are not saved','','error');
    }
  })
}

startTimer()
{
  let t = window.setInterval(()=>{
    if(this.timer<=0){
      this.evalQuiz();
      clearInterval(t);
    }else{
      this.timer--;
    }
  },1000);
}

getFormattedTime()
{
  let minutes = Math.floor(this.timer/60);
  let seconds = this.timer - minutes * 60;
  return `${minutes} min : ${seconds} sec`;
}

evalQuiz(){
  
  this._question.evalQuiz(this.questions).subscribe(
    (data:any)=>{
      console.log(data);
      this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
      this.correctAnswers = data.correctAnswers;
      this.attempted = data.attempted;
      this.isSubmit = true;      
    },
    (error: any)=>{
      console.log(error);      
    }
  );
}

printPage(){
  window.print();
}

}
