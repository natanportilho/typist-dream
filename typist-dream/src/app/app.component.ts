import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'typist-dream';



  start() {
    const mainSection = document.getElementById('main-section');
    mainSection.style.display = 'block';
    const startButton = document.getElementById('start-button');
    startButton.style.display= 'none';
  }

}
