import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


//Models
import { EmpleadoModel } from '../models/empleado';



@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  url:string;

  constructor( private http:HttpClient ) { 
    this.url = 'https://rrhhapp-d5635.firebaseio.com';
  }


newEmpleado( empleado:EmpleadoModel ){
  return  this.http.post(`${this.url}/empleados.json`, empleado)
            .pipe(
              map( (data:any) => {
                  return empleado.id = data.name
              })
            )
}

editEmpleado( empleado: EmpleadoModel ){

  const empleadoData = {
    ... empleado
  }

  delete empleadoData.id;

  return this.http.put(`${this.url}/empleados/${empleado.id}.json`, empleadoData);

}

getEmpleados(){
  return this.http.get(`${this.url}/empleados.json`)
                  .pipe(
                    map( resp => {
                      return this.createArray(resp);
                    })
                  )
}

getEmpleado( id: string ){
  return this.http.get(`${this.url}/empleados/${id}.json`)
}

deleteEmpleado( id: string ){
  return this.http.delete(`${this.url}/empleados/${id}.json`)
}

private createArray( EmpleadosOBJ: object ){
    const empleados: EmpleadoModel[] = [];

    if( !EmpleadosOBJ ){
        return [];
    }

    Object.keys( EmpleadosOBJ ).forEach( element => {
      const empleado = EmpleadosOBJ[element];
      empleado.id = element

      empleados.push(empleado)
    })

    return empleados;
}

}
