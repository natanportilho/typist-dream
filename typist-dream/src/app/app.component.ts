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
  timerRunning = false;

  start() {
    const mainSection = document.getElementById('main-section');
    mainSection.style.display = 'block';
    const startButton = document.getElementById('start-button');
    startButton.style.display = 'none';
    const timer = document.getElementById('timer');
    timer.style.display = 'block';
    const challenge = document.getElementById('challenge-description');
    challenge.style.display = 'inline';
    this.createTextSection();
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const startButton = document.getElementById('start-button');

    if (startButton.style.display !== 'none') {
      return;
    }

    if (!this.timerRunning) {
      this.timerRunning = true;
      this.startTimer();
    }

    const key = event.key;
    this.typed = this.typed.concat(key);
    console.log(this.typed);

    if (this.text.length == this.typed.length) {
      if (this.text == this.typed) {
        console.log('sucess');
        this.stopTimer();
        const timer = document.getElementById('timer');
        timer.innerText = 'Your time is: ' + this.getCountertext(Number(timer.innerText));
      } else {
        console.log('fail');
      }
    }
    this.rewriteText();
  }

  @HostListener('document:keydown', ['$event']) onKeydownHandler(
    event: KeyboardEvent
  ) {
    const startButton = document.getElementById('start-button');

    if (startButton.style.display !== 'none') {
      return;
    }
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

  createTextSection() {
    const text1 = 'Learn one way to build applications with Angular and reuse your code and abilities to build apps for any deployment target. For web, mobile web, native mobile and native desktop.';
    const text2 = 'Achieve the maximum speed possible on the Web Platform right now, and take it further, via Web Workers and server-side rendering. Angular puts you in control over scalability right here.';
    const text3 = 'Meet data requirements by building data models on RxJS, Immutable.js or another push-model. From prototype through global deployment, Angular delivers the productivity and scalable infrastructure that supports Google\'s largest applications.';
    const possiblePhrases: string[] = ['text1', 'text2', 'text3'];
    const selectedTextindex = this.randomIntFromInterval(0, possiblePhrases.length - 1);
    const text = document.getElementById('text');
    text.innerText = possiblePhrases[selectedTextindex];
    this.text = text.innerText;
    this.originalText = text.innerText;
  }

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  getCountertext(seconds: number) {
    if (seconds < 60) {
      return seconds + ' seconds.';
    } else {
      const minutes = Math.floor(seconds / 60);
      const rest = seconds % 60;
      return minutes + ':' + rest;
    }
  }

}
