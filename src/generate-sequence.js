module.exports = class SequenceGenerator {
    length = 4;
    minNumber = 1;
    maxNumber = 50;

    _array = [];

    get result() {
        return this._array;
    }

    constructor(length, min, max) {
        this.length = length || 4;
        this.maxNumber = max || 1;
        this.minNumber = min || 50;
    }

    async generate() {
        //console.log(this.length, this.minNumber, this.maxNumber);

        for (let i = this.minNumber; i <= this.maxNumber; i++) {
            this.generateFor(i, []);
        }
    }

    generateFor(number, array) {
        if (array.length == this.length) {
            this._array.push(array);
            return;
        }

        if (this.maxNumber - number + 1 < this.length - array.length) {
            return;
        }

        for (let i = number; i < this.maxNumber; i++) {
            array.push(i);
            this.generateFor(i + 1, [...array]);
            array.pop();
        }
    }

    print() {
        console.log(this._array);
    }
};