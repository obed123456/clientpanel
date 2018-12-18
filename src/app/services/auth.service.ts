import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private afAuth: AngularFireAuth) { }

  login(email:string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(userData => resolve(userData), 
      err => reject(err)
      )
    });
  }

  //this is will check if you are login
  //if you navigate to login then it bring you to dashboard
  getAuth() {
    return this.afAuth.authState.pipe(map(auth =>  auth));
}

//Logout---Sign out

logout() {
  this.afAuth.auth.signOut();
}

//Regter new users
//can be turned off
register(email:string, password: string) {
  return new Promise((resolve, reject) => {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then(userData => resolve(userData), 
    err => reject(err)
    )
  });
}


}