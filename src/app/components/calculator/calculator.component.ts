import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {
  displayValue = '0';
  currentOperand = '';
  previousOperand = '';
  operation: string | null = null;

  press(value: string) {
    if (value === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand += value;
    this.displayValue = this.currentOperand;
  }

  pressOperator(op: string) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.calculate();
    }
    this.operation = op;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

   calculate() {
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    let result: number;
    switch (this.operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case 'X':
        result = prev * current;
        break;
      case '÷':
        result = prev / current;
        break;
      default:
        return;
    }

    this.displayValue = result.toString();
    this.currentOperand = this.displayValue;
    this.operation = null;
    this.previousOperand = '';
  }

  clear() {
    this.displayValue = '0';
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = null;
  }


}
