import { Component, signal } from '@angular/core';

@Component({
  selector: 'footer-front',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterFrontComponent {

  currentYear = signal(new Date().getFullYear())

}
