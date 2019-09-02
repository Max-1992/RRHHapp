//Modulos de Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

//Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialConfigModule } from './material-config.module'

//Componentes Personalizados
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { EmpleadoComponent } from './pages/empleado/empleado.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { EditarComponent } from './pages/editar/editar.component';

//Rutas
import { AppRoutingModule } from './app-routing.module'

//Pipes
import { CapitalizadoPipe } from './pipes/capitalizado.pipe'



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    EmpleadoComponent,
    LoginComponent,
    RegistroComponent,
    EditarComponent,
    CapitalizadoPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialConfigModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
