//Angular Modules
import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

//Services
import { EmpleadoModel } from '../../models/empleado';

//Models
import { EmpleadosService } from '../../services/empleados.service';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  empleados:EmpleadoModel[];
  loading:boolean = true;

  constructor( private empleadosServices: EmpleadosService) { }

  ngOnInit() {
    this.getEmpleados()
  }

  getEmpleados(){
    this.empleadosServices.getEmpleados()
                         .subscribe( resp => {
                           this.empleados = resp;
                           this.loading = false;
                         })
  }

  deleteEmpleado( empleado:EmpleadoModel, index: number ){

    Swal.fire({
      title: '¿Esta seguro?',
      text: `Esta seguro de que desea eliminar a ${empleado.nombre}`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {     
          if(resp.value)
            this.empleadosServices.deleteEmpleado( empleado.id )
                                  .subscribe( resp => {
                                      this.empleados.splice( index, 1)
                                  }) 
        })


}

}
