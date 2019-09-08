import { Injectable } from '@angular/core';
import {  Headers, Http ,Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import {  HttpClientModule } from '@angular/common/http';
import {  HttpModule } from '@angular/http';
import { BehaviorSubject } from 'rxjs/Rx';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class QuizServiceService { 
	
	constructor(private http:Http , private db: AngularFirestore) {}
	
	private dataSource = new BehaviorSubject<String>("");
  data = this.dataSource.asObservable();
	
	private questionBs = new BehaviorSubject<String>("");
  questionObs = this.questionBs.asObservable();
	
	updateQuestion(question){ 
		console.log('updateQuestion'+question);
		this.questionBs.next(question);
	}

	updatedDataSelection(subject){
    console.log('updatedDataSelection');
    this.dataSource.next(subject);
  }

loadSubject(){
  return this.db.collection('subject'
   , ref => ref.where('desc', '==', 'Java')
  ).valueChanges();
  // , ref => ref.where('id', '==', questionId)
}

loadQuestion(){
  return this.db.collection('question/java/java').valueChanges();
}
loadQuestionsBySub(subjectId){
  console.log('subjectId::'+subjectId);
  if(subjectId == ''){
    subjectId='dummy';
  }
  return this.db.collection('question/'+subjectId+'/one').valueChanges();
}

	loadSubjectOld(){
		return this.http
		.get('http://localhost:8990/subject/')
		.map(
			(response: Response) => {
			  const data = response.json();
			  
			  return data;
			}
		)
		.catch(
			(error: Response) => {
			  return Observable.throw('Something went wrong');
			}
		);
		 
	}
	
	loadQuestionsOld(){
		return this.http
		.get('http://localhost:8990/question/')
		.map(
			(response: Response) => {
			  const data = response.json();
			  
			  return data;
			}
		)
		.catch(
			(error: Response) => {
			  return Observable.throw('Something went wrong');
			}
		);
		 
	}
	 
	loadQuestionsBySubOld(subjectId){
		return this.http
		.get('http://localhost:8990/question/'+subjectId)
		.map(
			(response: Response) => {
			  const data = response.json();
			  
			  return data;
			}
		)
		.catch(
			(error: Response) => {
			  return Observable.throw('Something went wrong');
			}
		);
		 
	}
	
	loadAnswers(questionId,subjectId){
		console.log('questionId,subjectId'+questionId+','+subjectId);
    if(subjectId == ''){
    subjectId='dummy';
  }
	this.db.collection('question/'+'jav'+'/answer'
  //, ref => ref.where('id', '==', '1')
  ).valueChanges();
	/*	return this.http
		.get('http://localhost:8990/answer/'+questionId+'/'+subjectId)
		.map(
			(response: Response) => {
			  const data = response.json();
			  
			  return data;
			}
		)
		.catch(
			(error: Response) => {
			  return Observable.throw('Something went wrong');
			}
		);
		*/
	}
	delete(subjectId ,questionId ) {
    let promise = new Promise((resolve, reject) => {
      let apiURL = 'http://localhost:8990/delete/question/'+subjectId+'/'+questionId;
      this.http
        .get(apiURL)
        .toPromise()
        .then(
          res => {
            // Success
           console.log(res);
            resolve();
          },
          msg => {
            // Error
            reject(msg);
          }
        );
    });
    return promise;
  }
}
