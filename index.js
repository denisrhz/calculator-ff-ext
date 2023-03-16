class Calculator {
    _tempValue = "";
    _tempMethod = null;
    _secondValue = false;

    constructor(buttons, output) {
        this._buttons = buttons;
        this._output = output;
        buttons.onclick = this.onClick.bind(this);
    }
    
    enterNumber(number) {
        if (this._secondValue) {
            this._output.value = number;
            this._secondValue = false;
        } else if (this._output.value.length < 8) {
            this._output.value += number;
        }
    }

    calculate(method) {
        if (this._output.value && !this._secondValue) {
            if (this._tempMethod) {
                let x = this._tempValue;
                let y = this._output.value;
                this._output.value = String(this._tempMethod(x, y)).slice(0, 8);
            }
            this._tempValue = this._output.value;
            this._tempMethod = method;
            this._secondValue = true;
        }
    }

    clear() {
        this._output.value = "";
        this._tempValue = "";
        this._tempMethod = null;
        this._secondValue = false;
    }

    negative() {
        if (this._output.value.length < 8) {
            this._output.value = -this._output.value;
        }
    }

    percent() {
        if (!this._tempValue) {
            this._output.value = 0.01 * this._output.value;
        } else {
            this._output.value = 0.01 * this._tempValue * this._output.value;
        }
        
    }

    dot() {
        if (this._output.value.length < 8 && this._output.value && !this._output.value.includes(".")) {
            this._output.value += ".";
        }
    }

    divide() {
        this.calculate((x, y) => Number(x) / Number(y));
    }

    multiply() {
        this.calculate((x, y) => Number(x) * Number(y));
    }

    subtract() {
        this.calculate((x, y) => Number(x) - Number(y));
    }

    add() {
        this.calculate((x, y) => Number(x) + Number(y));
    }

    result() {
        if (this._tempMethod && !this._secondValue) {
            let x = this._tempValue;
            let y = this._output.value;
            this._output.value = String(this._tempMethod(x, y)).slice(0, 8);
            this._tempValue = "";
            this._tempMethod = null;
            this._secondValue = false;
        }
    }

    onClick(event) {
        let number = event.target.value;
        let action = event.target.dataset.action;

        if (number) {
            this.enterNumber(number); 
        } else if (action) {
            this[action]();
        }
    }
}

let buttons = document.querySelector('.buttons');
let output = document.querySelector('.output textarea');

new Calculator(buttons, output);