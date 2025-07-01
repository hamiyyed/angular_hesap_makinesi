import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './display.html',
  styleUrl: './display.scss'
})
export class Display {
  @Input() displayValue!: string;
  @Input() history: string[] = [];
  @Input() isHistoryVisible: boolean = false;
  @Output() toggleHistory = new EventEmitter<void>();
}
