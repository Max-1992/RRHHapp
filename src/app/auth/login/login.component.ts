// Modulos Angular
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//Servicios
import { AuthService } from '../../services/auth.service';
import { UserModel } from '../../models/usuario';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  forma:FormGroup
  user:UserModel

  constructor( private authService: AuthService, private router:Router) {
    this.user = new UserModel();
   }

  ngOnInit() {
    this.forma = this.formEstructure();
    this.leerUsuario();
    this.forma.valueChanges.subscribe( (data:UserModel) => this.user = data );
  }

private formEstructure(){
  return new FormGroup({
    'email': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required),
    'rememberUser': new FormControl(true)
  })
};

access(){

  if( this.forma.invalid ){
    return;
  }

  this.login()

}


private login(){
  
  Swal.fire({
    allowOutsideClick: false,
    type: 'success',
    text: 'Espere por favor...'
  })
  Swal.showLoading();

  this.authService.login( this.user )
                  .subscribe( data => {
                    
                    Swal.close()
                    this.rememberUser( this.user )
                    this.router.navigateByUrl('/home');

                    const Toast = Swal.mixin({
                      toast: true,
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 3000
                    })
                    
                    Toast.fire({
                      type: 'success',
                      title: 'Bienvenido! Iniciaste Sesión correctamente!'
                    })

                  }, (err) => {
                    console.log(err)

                    Swal.fire({
                      type: 'error',
                      title: `${err.error.error.message}`
                    })
                  });
}

rememberUser( user:UserModel ){
  if( user.rememberUser ){
    localStorage.setItem('email', user.email)
  }
}

private leerUsuario(){
  if ( localStorage.getItem('email') ){
    this.forma.setValue( {
      'email': localStorage.getItem('email'),
      'password': '',
      'rememberUser': true
    })
  }
}

//Selectores personalizados

get password(){
  return this.forma.get('password');
}

get email(){
  return this.forma.get('email');
}



}
