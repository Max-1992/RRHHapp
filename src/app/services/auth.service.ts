// Angular Module
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

// Models
import { UserModel } from '../models/usuario';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url:string;
  private apiKey:string;

  private userToken:string;

  constructor( private http:HttpClient) {
    this.url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
    this.apiKey = 'AIzaSyAkX6N4rpiCWD2yMaeX2qjzSD4-ACB0q1Q';
    this.leerToken()
   }


  login( user:UserModel ){
    
    let authData = {
      ... user,
      returnSecundareToken: true
    }

    return  this.http.post(`${this.url}signInWithPassword?key=${this.apiKey}`, authData)
                      .pipe(
                        map( resp => {
                          console.log(resp)
                          this.guardarToken( resp['idToken']);
                          return resp;
                        })
                      )
  }

  logaut(){
    localStorage.removeItem('token');
  }

  newUser( user:UserModel ){
  
    const authData = {
      ...user,
      returnSecundareToken: true
    }

    return this.http.post(`${this.url}signUp?key=${this.apiKey}`, authData)
                    .pipe(
                      map( resp => {
                          this.guardarToken( resp['idToken'] );
                          return resp;
                      })
                    )
             
  }

private guardarToken( idToken:string ){
      this.userToken = idToken;
      localStorage.setItem('token', this.userToken);

      let hoy = new Date()
      hoy.setSeconds(36000)
      localStorage.setItem('expiration', hoy.getTime().toString())

  }

public  leerToken(){

    if ( localStorage.getItem('token') ){
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    };

    return this.userToken;
  }

  statusAuthentication(){
    
    if ( this.userToken.length < 2 ){
      return false;
    }

    const expiration = Number(localStorage.getItem('expiration'));
    let expirationToken = new Date();

    expirationToken.setTime(expiration);

    if ( expirationToken > new Date() ){
      return true;
    } else {
      return false;
    }



  }


}
