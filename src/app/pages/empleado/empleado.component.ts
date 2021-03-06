import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
// import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

//Services
import { EmpleadosService } from '../../services/empleados.service';


//Models
import { EmpleadoModel } from '../../models/empleado';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {

  empleado:EmpleadoModel

  constructor( private empleadosServices:EmpleadosService, private router:ActivatedRoute) {
    this.empleado = new EmpleadoModel()
  }

  ngOnInit() {
  }


  public save( forma: NgForm ){

    if( forma.invalid ){
      Swal.fire({
        type: 'error',
        title: 'El formulario no es valido',
        text: 'Por Favor! Revisa que todos los campos esten correctamente completados.',
      })
      return;
    }

   this.newEmpleado( forma )

  }

  newEmpleado( forma: NgForm ){
    
    Swal.fire({
      allowOutsideClick: false,
      title: 'Creando Registro',
      type: 'info',
      text: 'El registro esta siendo procesado...'
    })
    Swal.showLoading();

    this.empleadosServices.newEmpleado( this.empleado )
                          .subscribe( resp => {
                            Swal.close()
                            Swal.fire({
                              title: '¡Empleado Registrado!',
                              html: `¡<b>${this.empleado.nombre}</b>, ya es parte del equipo!`,
                              type: 'success'
                            })
                            forma.reset();
                            
                          }, (err) => {
                            Swal.fire({
                              type: 'error',
                              title: 'Error!',
                              text: 'Ha ocurrido un error al realizar el registro por favor intentelo nuevamente',
                            })
                          })
                          
  }

  //Validations

  // private salarioValid( salario:FormControl ){

  //   if( isNaN(salario.value) ){
  //     return {
  //       'numberValid': { 'message': 'Los datos ingresados no son validos' }
  //     }
  //   }
  // }

}
