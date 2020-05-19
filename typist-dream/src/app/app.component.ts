import { Component } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'typist-dream';
  text = '';
  typed = '';
  originalText = '';

  start() {
    const mainSection = document.getElementById('main-section');
    mainSection.style.display = 'block';
    const startButton = document.getElementById('start-button');
    startButton.style.display = 'none';
    const text = document.getElementById('text');
    this.text = text.innerText
    this.originalText = text.innerText;
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
    this.rewriteText();
  }

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.keyCode == 8) {
      this.typed = this.typed.slice(0, -1);
    }
    this.rewriteText();
  }

  rewriteText() {
    const lastTypedIndex = this.typed.length - 1;
    if (this.originalText[lastTypedIndex] == this.typed[lastTypedIndex]) {
      this.fixColors(this.typed.length);
    } else {
      this.typed = this.typed.slice(0, -1);
    }
  }

  fixColors(position: Number) {
    const textElement = document.getElementById("text");
    const txt = this.originalText;
    let newText = "";

    for (let i = 0; i < this.originalText.length; i++) {
      if (i < position) {
        newText += '<span style="color:#2a9d8f' + '">' + txt.charAt(i) + '</span>';
      } else {
        newText += '<span style="color:#e63946' + '">' + txt.charAt(i) + '</span>';
      }
    }
    textElement.innerHTML = newText;
  }
}
