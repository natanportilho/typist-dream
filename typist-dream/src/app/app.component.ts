import { Component } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  timeTaken = 0;
  interval;
  title = 'typist-dream';
  text = '';
  typed = '';
  originalText = '';

  start() {
    const mainSection = document.getElementById('main-section');
    mainSection.style.display = 'block';
    const startButton = document.getElementById('start-button');
    startButton.style.display = 'none';
    const timer = document.getElementById('timer');
    timer.style.display = 'block';
    const text = document.getElementById('text');
    this.text = text.innerText;
    this.originalText = text.innerText;
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.timeTaken === 0) {
      this.startTimer();
    }

    const key = event.key;
    this.typed = this.typed.concat(key);
    console.log(this.typed);

    if (this.text.length == this.typed.length) {
      if (this.text == this.typed) {
        console.log('sucess');
        this.stopTimer();
      } else {
        console.log('fail');
      }
    }
    this.rewriteText();
  }

  @HostListener('document:keydown', ['$event']) onKeydownHandler(
    event: KeyboardEvent
  ) {
    if (event.keyCode == 8) {
      this.typed = this.typed.slice(0, -1);
    }
    this.rewriteText();
  }

  rewriteText() {
    const lastTypedIndex = this.typed.length - 1;
    if (this.originalText[lastTypedIndex] === this.typed[lastTypedIndex]) {
      this.fixColors(this.typed.length);
    } else {
      this.typed = this.typed.slice(0, -1);
    }
  }

  fixColors(position: number) {
    const textElement = document.getElementById('text');
    const txt = this.originalText;
    let newText = '';

    for (let i = 0; i < this.originalText.length; i++) {
      if (i < position) {
        newText +=
          '<span style="color:#3a6ea5; text-decoration: underline;">' +
          txt.charAt(i) +
          '</span>';
      } else {
        newText +=
          '<span style="color:#010101' + '">' + txt.charAt(i) + '</span>';
      }
    }
    textElement.innerHTML = newText;
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeTaken >= 0) {
        this.timeTaken++;
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.interval);
  }
}
