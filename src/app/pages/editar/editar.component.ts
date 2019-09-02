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
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  empleado:EmpleadoModel

  constructor( private empleadosServices:EmpleadosService, private router:ActivatedRoute) {
    this.empleado = new EmpleadoModel()
  }

  ngOnInit() {
    this.getEmpleado()
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

    this.updateEmpleado()
    

  }

  updateEmpleado(){
    Swal.fire({
      allowOutsideClick: false,
      title: 'Actualizando Registro',
      type: 'info',
      text: 'El registro esta siendo actualizado...'
    })
    Swal.showLoading();
    this.empleadosServices.editEmpleado(this.empleado)
                          .subscribe( (resp:EmpleadoModel) => {
                            Swal.close()
                            this.empleado = resp;

                            Swal.fire({
                              title: '¡Empleado Actualizado!',
                              html: `Los datos de <b>${this.empleado.nombre}</b>, han sido actualizados`,
                              type: 'success'
                            })
                            
                            this.getEmpleado()
                          }, (err) => {
                            Swal.fire({
                              type: 'error',
                              title: '¡Error al actualizar datos!',
                              text: 'Ha ocurrido un error al actualizar los datos, por favor intentelo nuevamente',
                            })
                          })
  }

  private getEmpleado(){
    const id = this.router.snapshot.paramMap.get('id');

    this.empleadosServices.getEmpleado(id)
                          .subscribe( (resp:EmpleadoModel) => {
                                this.empleado = resp;
                                this.empleado.id = id;
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
