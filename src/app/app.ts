
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Perfil } from './perfil/perfil';
import { SobreMi } from './sobre-mi/sobre-mi';
import { Educacion } from './educacion/educacion';
import { Certificaciones } from './certificaciones/certificaciones';
import { Proyectos } from './proyectos/proyectos';
import { Habilidades } from './habilidades/habilidades';
import { Navbar } from './navbar/navbar';
import { FooterComponent } from './footer/footer';

@Component({
  selector: 'app-root',
  imports: [
    Navbar,
    Perfil,
    SobreMi,
    Educacion,
    Certificaciones,
    Proyectos,
    Habilidades,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('portafolio-angular');
}
