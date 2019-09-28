import { Component, OnInit } from "@angular/core";
import { QuizServiceService } from "../quiz-service.service";
import { Quiz } from "./quiz";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Component({
  selector: "app-quiz",
  templateUrl: "./quiz.component.html",
  styleUrls: ["./quiz.component.css"]
})
export class QuizComponent implements OnInit {
  subjectId: any = 20;
  quizQuestions: Quiz;
  questions;
  answers;
  options;
  firstLoad = true;
  question: any;
  option1: any;
  option2: any;
  option3: any;
  option4: any;
  index: number = 0;
  totalQuestions = 0;
  sub: any;
  answerSet: any[];
  constructor(
    private quizService: QuizServiceService,
    private route: ActivatedRoute
  ) {
    const id: Observable<string> = this.route.params.pipe(map(p => p.id));
    console.log("id");
    console.log(id);
    const user = this.route.data.pipe(map(d => d.user));
    console.log("user");
    console.log(user);
  }

  ngOnInit() {
    console.log("start on init");
    this.sub = this.route.data.subscribe(v => console.log(v));
    console.log("quiz component on init :" + this.subjectId);

    this.quizService.loadQuizQuestionsBySub(this.subjectId).subscribe(
      (questions1: any[]) => {
        this.questions = questions1;
        console.log("1");
        console.log(questions1);
      },
      error => console.log(error)
    );

    this.quizService.loadAnswersBySub(this.subjectId).subscribe(
      (data1: any[]) => {
        this.answers = data1;
        console.log(data1);
      },
      error => console.log(error)
    );
    this.quizService.loadOptionsBySub(this.subjectId).subscribe(
      (data1: any[]) => {
        this.options = data1;
        console.log(data1);
        this.index = 0;
          this.loadQuestion(this.index);  
      },
      error => console.log(error)
    );
     
    /*
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
*/
  }
  loadQuestion(index) {
    //if(this.firstLoad){
    //  this.firstLoad=false;
    //let optIndex = 0;
    this.question = this.questions[index].desc;
    console.log(this.question);
    let answer1 = this.answers.filter( e => e.id == this.questions[index].id ); 
    console.log(answer1);
    this.option1 = this.options[0].desc;
    this.option2 = this.options[1].desc;
    this.option3 = this.options[2].desc;
    this.option4 = this.options[3].desc;
    //}
  }
  next() {
    console.log("next");
    document.getElementById("opt1").style.backgroundColor = "lightblue";
    document.getElementById("opt2").style.backgroundColor = "lightblue";
    document.getElementById("opt3").style.backgroundColor = "lightblue";
    document.getElementById("opt4").style.backgroundColor = "lightblue";
    this.loadQuestion(++this.index);
  }

  previous() {
    console.log("previous");
    this.loadQuestion(--this.index);
  }

  opt1() {
    let ans = this.answerSet[this.index].answerId;
    console.log("ans" + ans);
    document.getElementById("opt1").style.backgroundColor = "red";
    document.getElementById("opt2").style.backgroundColor = "red";
    document.getElementById("opt3").style.backgroundColor = "red";
    document.getElementById("opt4").style.backgroundColor = "red";
    document.getElementById("opt" + ans).style.backgroundColor = "green";
  }
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
