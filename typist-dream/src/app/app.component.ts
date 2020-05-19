import { Component } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'typist-dream';
  text = 'natan portilho da silva';
  typed = '';

  start() {
    const mainSection = document.getElementById('main-section');
    mainSection.style.display = 'block';
    const startButton = document.getElementById('start-button');
    startButton.style.display = 'none';
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const key = event.key;
    this.typed = this.typed.concat(key);
    console.log(this.typed);

    if (this.text.length == this.typed.length) {

      if (this.text == this.typed) {
        console.log('sucess')
      } else {
        console.log('fail');
      }
    }
  }

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.keyCode == 8) {
      this.typed = this.typed.slice(0, -1);
    }
  }
}
