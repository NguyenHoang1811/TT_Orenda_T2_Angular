import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/layout/header/header';
import { Footer } from './shared/layout/footer/footer';
import { Test } from './shared/test/test';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [
    RouterOutlet,
    Header,
    Footer, 
    Test
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-app');
}
