import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-perfil',
  imports: [],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class Perfil implements OnInit, OnDestroy {
  frases: string[] = [
    'proyectos fullstack',
    'proyectos frontend',
    'proyectos backend',
    'proyectos IA',
    'Creador de Contenido'
  ];
  textoBase: string = 'Ingeniero de software con experiencia en';
  textoAnimado: string = '';
  private fraseIndex = 0;
  private charIndex = 0;
  private typingInterval: any;
  private pauseTimeout: any;

  ngOnInit() {
    this.typeNextFrase();
  }

  ngOnDestroy() {
    clearInterval(this.typingInterval);
    clearTimeout(this.pauseTimeout);
  }

  private typeNextFrase() {
    this.textoAnimado = '';
    this.charIndex = 0;
    const frase = this.frases[this.fraseIndex];
    this.typingInterval = setInterval(() => {
      if (this.charIndex < frase.length) {
        this.textoAnimado += frase[this.charIndex];
        this.charIndex++;
      } else {
        clearInterval(this.typingInterval);
        this.pauseTimeout = setTimeout(() => {
          this.fraseIndex = (this.fraseIndex + 1) % this.frases.length;
          this.typeNextFrase();
        }, 2000);
      }
    }, 60);
  }
}
