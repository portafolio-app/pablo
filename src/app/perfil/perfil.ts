import { Component, OnInit, OnDestroy, ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Perfil implements OnInit, OnDestroy {
  frases: string[] = [
    'Diseño de Interfaces UX/UI',
    'Machine Learning',
    'Análisis de Datos',
    'Gestión de Proyectos'
  ];

  textoBase: string = 'Ingeniero de Sistemas y Computación, con experiencia en ';
  textoAnimado: string = '';

  private fraseIndex = 0;
  private charIndex = 0;
  private animationId: number | null = null;
  private timeoutId: number | null = null;
  private isTyping = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    // Pequeño delay para asegurar que el componente esté completamente inicializado
    this.timeoutId = setTimeout(() => {
      this.startAnimation();
    }, 100) as any;
  }

  ngOnDestroy() {
    this.stopAnimation();
  }

  private stopAnimation() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  private startAnimation() {
    this.typeNextFrase();
  }

  private typeNextFrase() {
    this.textoAnimado = '';
    this.charIndex = 0;
    this.isTyping = true;
    this.typeCharacter();
  }

  private typeCharacter() {
    const frase = this.frases[this.fraseIndex];

    if (this.charIndex < frase.length && this.isTyping) {
      this.textoAnimado += frase[this.charIndex];
      this.charIndex++;
      this.cdr.detectChanges(); // Forzar detección de cambios

      // Usar setTimeout para controlar la velocidad de escritura
      this.timeoutId = setTimeout(() => {
        this.typeCharacter();
      }, 80) as any; // Velocidad de escritura (ms por carácter)

    } else if (this.isTyping) {
      // Terminó de escribir, pausa antes de borrar
      this.timeoutId = setTimeout(() => {
        this.deleteFrase();
      }, 2000) as any; // Pausa después de escribir completamente
    }
  }

  private deleteFrase() {
    this.isTyping = false;
    this.deleteCharacter();
  }

  private deleteCharacter() {
    if (this.textoAnimado.length > 0 && !this.isTyping) {
      this.textoAnimado = this.textoAnimado.slice(0, -1);
      this.cdr.detectChanges(); // Forzar detección de cambios

      // Usar setTimeout para controlar la velocidad de borrado
      this.timeoutId = setTimeout(() => {
        this.deleteCharacter();
      }, 50) as any; // Velocidad de borrado (más rápido que escribir)

    } else if (!this.isTyping) {
      // Terminó de borrar, pausa antes de la siguiente frase
      this.timeoutId = setTimeout(() => {
        this.fraseIndex = (this.fraseIndex + 1) % this.frases.length;
        this.typeNextFrase();
      }, 500) as any; // Pausa después de borrar completamente
    }
  }
}