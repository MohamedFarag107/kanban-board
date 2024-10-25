"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderHelper = void 0;
const common_1 = require("@nestjs/common");
let OrderHelper = class OrderHelper {
    constructor() {
        this.BASE_62_DIGITS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    }
    midpoint({ a, b, digits }) {
        const zero = digits[0];
        if (b != null && a >= b) {
            throw new Error(a + ' >= ' + b);
        }
        if (a.slice(-1) === zero || (b && b.slice(-1) === zero)) {
            throw new Error('trailing zero');
        }
        if (b) {
            let n = 0;
            while ((a[n] || zero) === b[n]) {
                n++;
            }
            if (n > 0) {
                return (b.slice(0, n) +
                    this.midpoint({ a: a.slice(n), b: b.slice(n), digits }));
            }
        }
        const digitA = a ? digits.indexOf(a[0]) : 0;
        const digitB = b != null ? digits.indexOf(b[0]) : digits.length;
        if (digitB - digitA > 1) {
            const midDigit = Math.round(0.5 * (digitA + digitB));
            return digits[midDigit];
        }
        else {
            if (b && b.length > 1) {
                return b.slice(0, 1);
            }
            else {
                return (digits[digitA] + this.midpoint({ a: a.slice(1), b: null, digits }));
            }
        }
    }
    validateInteger(int) {
        if (int.length !== this.getIntegerLength(int[0])) {
            throw new Error('invalid integer part of order key: ' + int);
        }
    }
    getIntegerLength(head) {
        if (head >= 'a' && head <= 'z') {
            return head.charCodeAt(0) - 'a'.charCodeAt(0) + 2;
        }
        else if (head >= 'A' && head <= 'Z') {
            return 'Z'.charCodeAt(0) - head.charCodeAt(0) + 2;
        }
        else {
            throw new Error('invalid order key head: ' + head);
        }
    }
    getIntegerPart(key) {
        const integerPartLength = this.getIntegerLength(key[0]);
        if (integerPartLength > key.length) {
            throw new Error('invalid order key: ' + key);
        }
        return key.slice(0, integerPartLength);
    }
    validateOrderKey(key, digits) {
        if (key === 'A' + digits[0].repeat(26)) {
            throw new Error('invalid order key: ' + key);
        }
        const i = this.getIntegerPart(key);
        const f = key.slice(i.length);
        if (f.slice(-1) === digits[0]) {
            throw new Error('invalid order key: ' + key);
        }
    }
    incrementInteger(x, digits) {
        this.validateInteger(x);
        const [head, ...digs] = x.split('');
        let carry = true;
        for (let i = digs.length - 1; carry && i >= 0; i--) {
            const d = digits.indexOf(digs[i]) + 1;
            if (d === digits.length) {
                digs[i] = digits[0];
            }
            else {
                digs[i] = digits[d];
                carry = false;
            }
        }
        if (carry) {
            if (head === 'Z') {
                return 'a' + digits[0];
            }
            if (head === 'z') {
                return null;
            }
            const h = String.fromCharCode(head.charCodeAt(0) + 1);
            if (h > 'a') {
                digs.push(digits[0]);
            }
            else {
                digs.pop();
            }
            return h + digs.join('');
        }
        else {
            return head + digs.join('');
        }
    }
    decrementInteger(x, digits) {
        this.validateInteger(x);
        const [head, ...digs] = x.split('');
        let borrow = true;
        for (let i = digs.length - 1; borrow && i >= 0; i--) {
            const d = digits.indexOf(digs[i]) - 1;
            if (d === -1) {
                digs[i] = digits.slice(-1);
            }
            else {
                digs[i] = digits[d];
                borrow = false;
            }
        }
        if (borrow) {
            if (head === 'a') {
                return 'Z' + digits.slice(-1);
            }
            if (head === 'A') {
                return null;
            }
            const h = String.fromCharCode(head.charCodeAt(0) - 1);
            if (h < 'Z') {
                digs.push(digits.slice(-1));
            }
            else {
                digs.pop();
            }
            return h + digs.join('');
        }
        else {
            return head + digs.join('');
        }
    }
    generateKeyBetween(a, b, digits = this.BASE_62_DIGITS) {
        if (a != null) {
            this.validateOrderKey(a, digits);
        }
        if (b != null) {
            this.validateOrderKey(b, digits);
        }
        if (a != null && b != null && a >= b) {
            throw new Error(a + ' >= ' + b);
        }
        if (a == null) {
            if (b == null) {
                return 'a' + digits[0];
            }
            const ib = this.getIntegerPart(b);
            const fb = b.slice(ib.length);
            if (ib === 'A' + digits[0].repeat(26)) {
                return ib + this.midpoint({ a: '', b: fb, digits });
            }
            if (ib < b) {
                return ib;
            }
            const res = this.decrementInteger(ib, digits);
            if (res == null) {
                throw new Error('cannot decrement any more');
            }
            return res;
        }
        if (b == null) {
            const ia = this.getIntegerPart(a);
            const fa = a.slice(ia.length);
            const i = this.incrementInteger(ia, digits);
            return i == null ? ia + this.midpoint({ a: fa, b: null, digits }) : i;
        }
        const ia = this.getIntegerPart(a);
        const fa = a.slice(ia.length);
        const ib = this.getIntegerPart(b);
        const fb = b.slice(ib.length);
        if (ia === ib) {
            return ia + this.midpoint({ a: fa, b: fb, digits });
        }
        const i = this.incrementInteger(ia, digits);
        if (i == null) {
            throw new Error('cannot increment any more');
        }
        if (i < b) {
            return i;
        }
        return ia + this.midpoint({ a: fa, b: null, digits });
    }
    generateNKeysBetween(a, b, n, digits = this.BASE_62_DIGITS) {
        if (n === 0) {
            return [];
        }
        if (n === 1) {
            return [this.generateKeyBetween(a, b, digits)];
        }
        if (b == null) {
            let c = this.generateKeyBetween(a, b, digits);
            const result = [c];
            for (let i = 0; i < n - 1; i++) {
                c = this.generateKeyBetween(c, b, digits);
                result.push(c);
            }
            return result;
        }
        if (a == null) {
            let c = this.generateKeyBetween(a, b, digits);
            const result = [c];
            for (let i = 0; i < n - 1; i++) {
                c = this.generateKeyBetween(a, c, digits);
                result.push(c);
            }
            result.reverse();
            return result;
        }
        const mid = Math.floor(n / 2);
        const c = this.generateKeyBetween(a, b, digits);
        return [
            ...this.generateNKeysBetween(a, c, mid, digits),
            c,
            ...this.generateNKeysBetween(c, b, n - mid - 1, digits),
        ];
    }
};
exports.OrderHelper = OrderHelper;
exports.OrderHelper = OrderHelper = __decorate([
    (0, common_1.Injectable)()
], OrderHelper);
//# sourceMappingURL=order.helper.js.map