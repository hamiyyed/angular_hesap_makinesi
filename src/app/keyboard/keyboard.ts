import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  standalone: true,
  imports: [],
  templateUrl: './keyboard.html',
  styleUrl: './keyboard.scss'
})
export class Keyboard {
  @Output() numberClick = new EventEmitter<string>();
  @Output() operatorClick = new EventEmitter<string>();
  @Output() equalsClick = new EventEmitter<void>();
  @Output() clearClick = new EventEmitter<void>();
  @Output() deleteClick = new EventEmitter<void>();
}
