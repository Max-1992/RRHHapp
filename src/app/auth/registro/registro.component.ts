// Module Angualar
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';

//Services
import { AuthService } from '../../services/auth.service';


// Models
import { UserModel } from '../../models/usuario';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  forma: FormGroup;
  user: UserModel;
  


  constructor( private authService:AuthService, private router:Router ) {
    this.user = new UserModel();
    
   }

 public ngOnInit() {
    this.forma = this.formEstructure();
    this.forma.valueChanges.subscribe( ( data:UserModel ) => this.user = data);
  }

 private formEstructure(){
    return new FormGroup({
      'email': new FormControl('', [ Validators.required,
                                     Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
      'password': new FormControl('', [ Validators.required, 
                                        this.passwordValidations ]),
      'rememberUser': new FormControl(true)
    })
  }

 public UserRegister(){

  if( this.forma.invalid ){
    return;
  }

  this.newUser();

 }

 private newUser(){
  
  Swal.fire({
    allowOutsideClick: false,
    type: 'success',
    title: 'Creando Usuario..',
    text: 'Espere por favor...'
  })
    
  Swal.showLoading();

    this.authService.newUser(this.user)
                    .subscribe( data => {
                      
                      Swal.close()
                      this.rememberUser( this.user )
                      this.router.navigateByUrl('/home');

                      const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3500
                      })
                      
                      Toast.fire({
                        type: 'success',
                        title: 'Bienvenido! Tu registro se realizo correctamente!'
                      });
  
                    }, (err) => {
                     
                      Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        html: `Parece que el <b>Usuario ya existe</b>, por favor utilice otro correo para registrarse!`,
                      });

                    })
    
 }

 rememberUser( user:UserModel ){
  if( user.rememberUser ){
    localStorage.setItem('email', user.email)
  }
}

private leerUsuario(){
  if ( localStorage.getItem('email') ){
    this.forma['rememberUser'] = true;
  }
}

 //Selectores Personalizados

 get password(){
   return this.forma.get('password')
 }

 get email(){
  return this.forma.get('email')
}

//Validaciones Personalizadas

private passwordValidations( password:FormControl ):any{

  if ( password.value.length < 6 ){
      return {
          'passwordValidation': { 'message': 'Tu password debe contener 6 o más carateres.' }
      }
  }

  if ( password.value === password.value.toLowerCase() ){
    return {
      'passwordValidation': { 'message': 'Tu password debe contener al menos una mayúscular.' }
    }
  }

  if ( password.value === password.value.toUpperCase() ){
    return {
      'passwordValidation': { 'message': 'Tu password debe contener al menos una minúscula.'}
    }
  }

  if ( !/\d/.test(password.value) ){
    return {
      'passwordValidation': { 'message': 'Tu password debe contener al menos un número.'}
    }
  }
}

}
