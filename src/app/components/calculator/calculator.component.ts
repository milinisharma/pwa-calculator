import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {
  currentOperand = '';
  previousOperand = '';
  operation: string | null = null;

  expression = '';
  result = '';
  showResult = false;

  press(value: string) {
   if (this.showResult) {
      this.expression = '';
      this.result = '';
      this.showResult = false;
    }

    const lastChar = this.expression.slice(-1);
    if (value === '.' && lastChar === '.') return;
    this.expression += value;
  }

  pressOperator(op: string) {
     if (!this.expression || this.isOperator(this.expression.slice(-1))) return;

    if (this.showResult) {
      this.expression = this.result;
      this.result = '';
      this.showResult = false;
    }

    this.expression += ' ' + op + ' ';
  }

   isOperator(char: string): boolean {
    return ['+', '-', '*', '/', 'x', '÷'].includes(char);
  }

   calculate() {
    try {
      const safeExpr = this.expression.replace(/X/g, '*').replace(/÷/g, '/');
      const evalResult = Function(`return (${safeExpr})`)(); // simple parser for demo
      this.result = evalResult.toString();
      this.showResult = true;
    } catch (err) {
      this.result = 'Error';
      this.showResult = true;
    }
  }

  clear() {
    this.expression = '';
    this.result = '';
    this.showResult = false;
  }


}
