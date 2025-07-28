import { Component, signal, OnInit, inject } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { RouterOutlet } from '@angular/router';
import { Perfil } from './perfil/perfil';
import { SobreMi } from './sobre-mi/sobre-mi';
import { Educacion } from './educacion/educacion';
import { Proyectos } from './proyectos/proyectos';
import { Habilidades } from './habilidades/habilidades';
import { Navbar } from './navbar/navbar';
import { FooterComponent } from './footer/footer';
import { ThemeService } from './theme/ThemeService';


@Component({
  selector: 'app-root',
  imports: [
    Navbar,
    Perfil,
    SobreMi,
    Educacion,
    Proyectos,
    Habilidades,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('portafolio-angular');

  // Inyectar el servicio para inicializarlo
  private themeService = inject(ThemeService);

  ngOnInit(): void {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      initFlowbite();
    }
  }
}
