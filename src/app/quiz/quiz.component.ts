import { Component, OnInit } from '@angular/core';
import { QuizServiceService } from '../quiz-service.service';
import { Quiz } from './quiz';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  subjectId: any = 20;
  quizQuestions: Quiz;
  firstLoad=true ;
  question: any;
  option1: any;
  option2: any;
  option3: any;
  option4: any;
  index : number = 0;
  totalQuestions= 0;
  sub: any;
  answerSet: any[];
  constructor(private quizService :QuizServiceService, private route: ActivatedRoute) { 

    const id: Observable<string> = this.route.params.pipe(map(p => p.id));
    console.log('id');
    console.log(id);
    const user = this.route.data.pipe(map(d => d.user));
    console.log('user');
    console.log(user);

  }

  ngOnInit() {
    this.sub = this.route
      .data
      .subscribe(v => console.log(v));

    this.quizService.loadQuizBySub(this.subjectId)
			.subscribe(
				(questions1: any) => {
					this.quizQuestions = questions1;
          console.log('in component ');  
          console.log(questions1);  
          this.index = 0;
          this.loadQuestion(this.index);   
          this.totalQuestions=  this.quizQuestions.mcqList.length ; 
          this.answerSet =  this.quizQuestions.answers;
				},
				(error) => console.log(error)
		);

  }
  loadQuestion(index){
    //if(this.firstLoad){
    //  this.firstLoad=false;
      this.question = this.quizQuestions.mcqList[index].question;
      this.option1 = this.quizQuestions.mcqList[index].option1;
      this.option2 = this.quizQuestions.mcqList[index].option2;
      this.option3 = this.quizQuestions.mcqList[index].option3;
      this.option4 = this.quizQuestions.mcqList[index].option4;
    //}
  }
  next(){
    console.log('next');
    document.getElementById("opt1").style.backgroundColor = "lightblue";
    document.getElementById("opt2").style.backgroundColor = "lightblue";
    document.getElementById("opt3").style.backgroundColor = "lightblue";
    document.getElementById("opt4").style.backgroundColor = "lightblue";
    this.loadQuestion(++this.index);
  }

  previous(){
    console.log('previous');
    this.loadQuestion(--this.index);
  }

  opt1(){
    let ans = this.answerSet[this.index].answerId;
    console.log('ans'+ans);
    document.getElementById("opt1").style.backgroundColor = "red";
    document.getElementById("opt2").style.backgroundColor = "red";
    document.getElementById("opt3").style.backgroundColor = "red";
    document.getElementById("opt4").style.backgroundColor = "red";
    document.getElementById("opt"+ans).style.backgroundColor = "green";

  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}