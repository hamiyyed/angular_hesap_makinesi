import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private history: string[] = [];
  private readonly MAX_HISTORY_LENGTH = 5;

  constructor() { }

  addHistory(calculation: string): void {
    // Add the new calculation to the beginning of the array
    this.history.unshift(calculation);

    // Ensure the history does not exceed the maximum length
    if (this.history.length > this.MAX_HISTORY_LENGTH) {
      this.history.pop();
    }
  }

  getHistory(): string[] {
    return this.history;
  }

  clearHistory(): void {
    this.history = [];
  }
}
