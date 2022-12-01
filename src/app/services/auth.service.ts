import { Injectable } from '@angular/core';
import { async } from '@firebase/util';
import { promise } from 'protractor';
import { user } from '../shared/user.interface';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import firebase from 'firebase/compat/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: Observable<user>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) =>{
        if(user){
          return this.afs.doc<user>( ` users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    )

  }
  
  
  
  
  async resetPasswprd(email:string):Promise<void>{
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {console.log('error',error)
      
    }
  }
  
  
  
  async loginGoogle():Promise<user>{
    try {
      const {user}=await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      this.uptadeUserData(user);
      return user;
    } catch (error) {console.log('error',error)
      
    }
  }
  
  
  async register(email:string, password:string):Promise<user>{
    try {
      const{user}=await this.afAuth.createUserWithEmailAndPassword(email,password); 
      await this.sendVerificationEmail();
      return user;
    }
    catch (error){console.log('error',error)}
  }
  
  async login(email:string, password:string):Promise<user>{
    try{
      const{user}=await this.afAuth.signInWithEmailAndPassword(email,password);
      return user;
    }
    catch(error){console.log('error',error)}
  }
  
  async sendVerificationEmail(): Promise<void>{
    try{
      return (await this.afAuth.currentUser).sendEmailVerification();
    }
    catch(error){
      console.log('error',error);
    }
  }

   isEmailVerified(user:user):boolean{
    return user.emailVerified===true ? true : false;
  }

  
  async logout():Promise<void>{
    try{
      await this.afAuth.signOut();
    }
    catch(error){
      console.log('error',error);
    }
  }
  private uptadeUserData(user:user){
    const userRef:AngularFirestoreDocument<user> = this.afs.doc(`users/${user.uid}`);
    const data:user = {
      uid:user.uid,
      email:user.email,
      emailVerified:user.emailVerified,
      displayName:user.displayName,

    };


    return userRef.set(data, {merge:true});
  }
} 
