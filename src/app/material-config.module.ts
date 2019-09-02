import { NgModule } from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
  imports: [MatCheckboxModule, MatTableModule, MatFormFieldModule, MatInputModule,MatSelectModule, MatDatepickerModule, MatIconModule ],
  exports: [MatCheckboxModule, MatTableModule, MatFormFieldModule, MatInputModule,MatSelectModule, MatDatepickerModule, MatIconModule ]
})
export class MaterialConfigModule { }


