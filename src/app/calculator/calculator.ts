import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryService } from '../services/history';
import { Display } from '../display/display';
import { Keyboard } from '../keyboard/keyboard';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, Display, Keyboard],
  templateUrl: './calculator.html',
  styleUrl: './calculator.scss'
})
export class Calculator {
  displayValue: string = '0';
  firstOperand: number | null = null;
  operator: string | null = null;
  waitForSecondNumber: boolean = false;
  isHistoryVisible: boolean = false;

  constructor(private historyService: HistoryService) {}

  get history(): string[] {
    return this.historyService.getHistory();
  }

  public toggleHistory(): void {
    if (this.history.length > 0) {
      this.isHistoryVisible = !this.isHistoryVisible;
    }
  }

  public onNumberClick(number: string): void {
    if (this.waitForSecondNumber) {
      this.displayValue = number;
      this.waitForSecondNumber = false;
    } else {
      this.displayValue = this.displayValue === '0' ? number : this.displayValue + number;
    }
  }

  public onOperatorClick(operator: string): void {
    if (this.firstOperand === null) {
      this.firstOperand = parseFloat(this.displayValue);
    } else if (this.operator) {
      this.calculateAndSetOperand();
    }
    this.operator = operator;
    this.waitForSecondNumber = true;
  }

  public onEqualsClick(): void {
    if (this.operator && this.firstOperand !== null && !this.waitForSecondNumber) {
      this.calculateAndSetOperand(true);
    }
  }

  private calculateAndSetOperand(isEquals: boolean = false): void {
    const secondOperand = parseFloat(this.displayValue);
    const calculation = `${this.firstOperand} ${this.operator} ${secondOperand}`;
    const result = this.calculate();
    
    this.historyService.addHistory(`${calculation} = ${result}`);

    this.displayValue = String(result);
    if (isEquals) {
      this.firstOperand = null;
      this.operator = null;
      this.waitForSecondNumber = false;
    } else {
      this.firstOperand = result;
    }
  }

  private calculate(): number {
    const secondOperand = parseFloat(this.displayValue);
    switch (this.operator) {
      case '+':
        return this.firstOperand! + secondOperand;
      case '-':
        return this.firstOperand! - secondOperand;
      case '*':
        return this.firstOperand! * secondOperand;
      case '/':
        if (secondOperand === 0) {
          // Handle division by zero
          return NaN; // Or some error state
        }
        return this.firstOperand! / secondOperand;
      case '%':
        return this.firstOperand! % secondOperand;
      default:
        return secondOperand;
    }
  }

  public onClearClick(): void {
    this.displayValue = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitForSecondNumber = false;
    this.historyService.clearHistory();
    this.isHistoryVisible = false;
  }

  public onDeleteClick(): void {
    if (this.waitForSecondNumber) return;
    this.displayValue = this.displayValue.slice(0, -1);
    if (this.displayValue === '') {
      this.displayValue = '0';
    }
  }
}
