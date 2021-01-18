import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';


export interface Credentials {
  email: string;
  password: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: Observable<any>;

  constructor(private fireAuth: AngularFireAuth) {
    this.userData = fireAuth.authState;
    fireAuth.authState.subscribe( auth => {
      if(auth) {
        console.log('logged-id');
        console.log(auth);
      } else {
        console.log('not logged-id');
        console.log(auth);
      }
    });

    console.log("Start");
  }

  get user() {
    return this.fireAuth.currentUser;
  }

  login(email : string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  register(email:string, password: string) {
    return this.fireAuth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    return this.fireAuth.signOut();
  }

  setPersistance(s: string): void{
    this.fireAuth.setPersistence(s);
  }

  getLogged() {
    return this.userData; 
  }

  getUser(){
    return this.fireAuth.currentUser;
  }

}
