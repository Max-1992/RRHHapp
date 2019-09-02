//Modulos de Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Guard
import { AuthGuard } from './guards/auth.guard';

//Componentes Personalizados
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { HomeComponent } from './pages/home/home.component';
import { EmpleadoComponent } from './pages/empleado/empleado.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { EditarComponent } from './pages/editar/editar.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'editar/:id', component: EditarComponent, canActivate: [ AuthGuard ]  },
  { path: 'home', component: HomeComponent, canActivate: [ AuthGuard ] },
  { path: 'empleado/:id', component: EmpleadoComponent, canActivate: [ AuthGuard ] },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
 

