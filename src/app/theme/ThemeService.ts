import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkModeSubject = new BehaviorSubject<boolean>(false);
  public isDarkMode$ = this.darkModeSubject.asObservable();

  constructor() {
    this.initializeTheme();
  }

  private initializeTheme(): void {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      // Determinar tema inicial
      const shouldUseDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

      console.log('Inicializando tema:', { savedTheme, prefersDark, shouldUseDark });

      this.setTheme(shouldUseDark);
    }
  }

  toggleTheme(): void {
    const currentTheme = this.darkModeSubject.value;
    console.log('Cambiando tema de:', currentTheme, 'a:', !currentTheme);
    this.setTheme(!currentTheme);
  }

  setTheme(isDark: boolean): void {
    console.log('=== APLICANDO TEMA ===');
    console.log('Tema solicitado:', isDark ? 'OSCURO' : 'CLARO');

    if (typeof document !== 'undefined') {
      const html = document.documentElement;
      const body = document.body;

      console.log('Clases ANTES:', html.classList.toString());

      if (isDark) {
        html.classList.add('dark');
        body.classList.add('dark');
        localStorage?.setItem('theme', 'dark');
        console.log('✅ Clase "dark" AÑADIDA');
      } else {
        html.classList.remove('dark');
        body.classList.remove('dark');
        localStorage?.setItem('theme', 'light');
        console.log('✅ Clase "dark" REMOVIDA');
      }

      console.log('Clases DESPUÉS:', html.classList.toString());
      console.log('Valor en localStorage:', localStorage?.getItem('theme'));

      // Verificar si Tailwind detecta el cambio
      const testElement = document.querySelector('.dark\\:bg-gray-800');
      if (testElement) {
        const computedStyle = window.getComputedStyle(testElement);
        console.log('Estilo computado de elemento dark:', computedStyle.backgroundColor);
      }

      console.log('=== FIN APLICACIÓN TEMA ===');
    }

    this.darkModeSubject.next(isDark);
  }

  get isDarkMode(): boolean {
    return this.darkModeSubject.value;
  }
}
