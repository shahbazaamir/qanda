import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
users;
  constructor( private db : AngularFirestore) {

     this.users = db.list('/users');
     console.log(this.users);
   }

  ngOnInit() {
  }

  update(){
    this.db.database().ref('users/' + 'userId').set({
        username: 'name2',
        email: 'email1',
        profile_picture: 'imageUrl'
      });
  }
}