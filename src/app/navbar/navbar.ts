import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Subscription } from 'rxjs';
import { ThemeService } from '../theme/ThemeService';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
  imports: [CommonModule]
})
export class Navbar implements OnInit, OnDestroy {
  private themeService = inject(ThemeService);
  private subscription = new Subscription();

  isDarkMode = false;

  ngOnInit() {
    // Suscribirse a los cambios del tema
    this.subscription.add(
      this.themeService.isDarkMode$.subscribe(isDark => {
        this.isDarkMode = isDark;
        console.log('Navbar - Estado del tema:', this.isDarkMode);
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toggleTheme() {
    console.log('Navbar - Botón clickeado');
    this.themeService.toggleTheme();
  }
}
