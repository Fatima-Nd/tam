import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {InputText} from '../inputtext/InputText';
import classNames from 'classnames';
import {tip} from "../tooltip/Tooltip";
import { Ripple } from '../ripple/Ripple';

export class InputNumber extends Component {

    static defaultProps = {
        value: null,
        format: true,
        showButtons: false,
        buttonLayout: 'stacked',
        incrementButtonClassName: null,
        decrementButtonClassName: null,
        incrementButtonIcon: 'pi pi-angle-up',
        decrementButtonIcon: 'pi pi-angle-down',
        locale: undefined,
        localeMatcher: undefined,
        mode: 'decimal',
        suffix: null,
        prefix: null,
        currency: undefined,
        currencyDisplay: undefined,
        useGrouping: true,
        minFractionDigits: undefined,
        maxFractionDigits: undefined,
        id: null,
        name: null,
        type: 'text',
        step: 1,
        min: null,
        max: null,
        disabled: false,
        required: false,
        tabIndex: null,
        pattern: null,
        inputMode: null,
        placeholder: null,
        readonly: false,
        size: null,
        style: null,
        className: null,
        inputId: null,
        inputStyle: null,
        inputClassName: null,
        tooltip: null,
        tooltipOptions: null,
        ariaLabelledBy: null,
        onValueChange: null,
        onChange: null,
        onBlur: null,
        onFocus: null
    }

    static propTypes = {
        value: PropTypes.number,
        format: PropTypes.bool,
        showButtons: PropTypes.bool,
        buttonLayout: PropTypes.string,
        incrementButtonClassName: PropTypes.string,
        decrementButtonClassName: PropTypes.string,
        incrementButtonIcon: PropTypes.string,
        decrementButtonIcon: PropTypes.string,
        locale: PropTypes.string,
        localeMatcher: PropTypes.string,
        mode: PropTypes.string,
        suffix: PropTypes.string,
        prefix: PropTypes.string,
        currency: PropTypes.string,
        currencyDisplay: PropTypes.string,
        useGrouping: PropTypes.bool,
        minFractionDigits: PropTypes.number,
        maxFractionDigits: PropTypes.number,
        id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        step: PropTypes.number,
        min: PropTypes.number,
        max: PropTypes.number,
        disabled: PropTypes.bool,
        required: PropTypes.bool,
        tabIndex: PropTypes.number,
        pattern: PropTypes.string,
        inputMode: PropTypes.string,
        placeholder: PropTypes.string,
        readonly: PropTypes.bool,
        size: PropTypes.number,
        style: PropTypes.object,
        className: PropTypes.string,
        inputId: PropTypes.string,
        inputStyle: PropTypes.object,
        inputClassName: PropTypes.string,
        tooltip: PropTypes.string,
        tooltipOptions: PropTypes.object,
        ariaLabelledBy: PropTypes.string,
        onValueChange: PropTypes.func,
        onChange: PropTypes.func,
        onBlur: PropTypes.func,
        onFocus: PropTypes.func
    }

    constructor(props) {
        super(props);

        this.state = {
            focused: false
        };

        this.constructParser();

        this.onInput = this.onInput.bind(this);
        this.onInputKeyDown = this.onInputKeyDown.bind(this);
        this.onInputKeyPress = this.onInputKeyPress.bind(this);
        this.onInputClick = this.onInputClick.bind(this);
        this.onInputBlur = this.onInputBlur.bind(this);
        this.onInputFocus = this.onInputFocus.bind(this);
        this.onPaste = this.onPaste.bind(this);

        this.onUpButtonMouseLeave = this.onUpButtonMouseLeave.bind(this);
        this.onUpButtonMouseDown = this.onUpButtonMouseDown.bind(this);
        this.onUpButtonMouseUp = this.onUpButtonMouseUp.bind(this);
        this.onUpButtonKeyDown = this.onUpButtonKeyDown.bind(this);
        this.onUpButtonKeyUp = this.onUpButtonKeyUp.bind(this);

        this.onDownButtonMouseLeave = this.onDownButtonMouseLeave.bind(this);
        this.onDownButtonMouseDown = this.onDownButtonMouseDown.bind(this);
        this.onDownButtonMouseUp = this.onDownButtonMouseUp.bind(this);
        this.onDownButtonKeyDown = this.onDownButtonKeyDown.bind(this);
        this.onDownButtonKeyUp = this.onDownButtonKeyUp.bind(this);
    }

    getOptions() {
        return {
            localeMatcher: this.props.localeMatcher,
            style: this.props.mode,
            currency: this.props.currency,
            currencyDisplay: this.props.currencyDisplay,
            useGrouping: this.props.useGrouping,
            minimumFractionDigits: this.props.minFractionDigits,
            maximumFractionDigits: this.props.maxFractionDigits
        };
    }

    constructParser() {
        this.numberFormat = new Intl.NumberFormat(this.props.locale, this.getOptions());
        const numerals = [...new Intl.NumberFormat(this.props.locale, {useGrouping: false}).format(9876543210)].reverse();
        const index = new Map(numerals.map((d, i) => [d, i]));
        this._numeral = new RegExp(`[${numerals.join('')}]`, 'g');
        this._decimal = this.getDecimalExpression();
        this._group = this.getGroupingExpression();
        this._minusSign = this.getMinusSignExpression();
        this._currency = this.getCurrencyExpression();
        this._suffix = new RegExp(`[${this.props.suffix||''}]`, 'g');
        this._prefix = new RegExp(`[${this.props.prefix||''}]`, 'g');
        this._index = d => index.get(d);
    }

    getDecimalExpression() {
        const formatter = new Intl.NumberFormat(this.props.locale, {useGrouping: false});
        return new RegExp(`[${formatter.format(1.1).trim().replace(this._numeral, '')}]`, 'g');
    }

    getGroupingExpression() {
        const formatter = new Intl.NumberFormat(this.props.locale, {useGrouping: true});
        return new RegExp(`[${formatter.format(1000).trim().replace(this._numeral, '')}]`, 'g');
    }

    getMinusSignExpression() {
        const formatter = new Intl.NumberFormat(this.props.locale, {useGrouping: false});
        return new RegExp(`[${formatter.format(-1).trim().replace(this._numeral, '')}]`, 'g');
    }

    getCurrencyExpression() {
        if (this.props.currency) {
            const formatter = new Intl.NumberFormat(this.props.locale, {style: 'currency', currency: this.props.currency, currencyDisplay: this.props.currencyDisplay});
            return new RegExp(`[${formatter.format(1).replace(/\s/g, '').replace(this._numeral, '').replace(this._decimal, '').replace(this._group, '')}]`, 'g');
        }
        else {
            return new RegExp(`[]`,'g');
        }
    }

    formatValue(value) {
        if (value != null) {
            if (value === '-') { // Minus sign
                return value;
            }

            if (this.props.format) {
                let formatter = new Intl.NumberFormat(this.props.locale, this.getOptions());
                let formattedValue = formatter.format(value);
                if (this.props.prefix) {
                    formattedValue = this.props.prefix + formattedValue;
                }

                if (this.props.suffix) {
                    formattedValue = formattedValue + this.props.suffix;
                }

                return formattedValue;
            }

            return value;
        }

        return '';
    }

    parseValue(text) {
        let filteredText = text.trim()
                            .replace(/\s/g, '')
                            .replace(this._currency, '')
                            .replace(this._group, '')
                            .replace(this._suffix, '')
                            .replace(this._prefix, '')
                            .replace(this._minusSign, '-')
                            .replace(this._decimal, '.')
                            .replace(this._numeral, this._index);

        if (filteredText) {
            if (filteredText === '-') // Minus sign
                return filteredText;

            let parsedValue = +filteredText;
            return isNaN(parsedValue) ? null : parsedValue;
        }
        else {
            return null;
        }
    }

    repeat(event, interval, dir) {
        let i = interval || 500;

        this.clearTimer();
        this.timer = setTimeout(() => {
            this.repeat(event, 40, dir);
        }, i);

        this.spin(event, dir);
    }

    spin(event, dir) {
        let step = this.props.step * dir;
        let currentValue = this.parseValue(this.inputEl.value) || 0;
        let newValue = this.validateValue(currentValue + step);

        this.updateInput(newValue, 'spin');
        this.updateModel(event, newValue);

        this.handleOnChange(event, currentValue, newValue);
    }

    onUpButtonMouseDown(event) {
        if (!this.props.disabled) {
            this.inputEl.focus();
            this.repeat(event, null, 1);
            event.preventDefault();
        }
    }

    onUpButtonMouseUp() {
        if (!this.props.disabled) {
            this.clearTimer();
        }
    }

    onUpButtonMouseLeave() {
        if (!this.props.disabled) {
            this.clearTimer();
        }
    }

    onUpButtonKeyUp() {
        if (!this.props.disabled) {
            this.clearTimer();
        }
    }

    onUpButtonKeyDown(event) {
        if (event.keyCode === 32) {
            this.repeat(event, null, 1);
        }
    }

    onDownButtonMouseDown(event, focusInput) {
        if (!this.props.disabled) {
            this.inputEl.focus();
            this.repeat(event, null, -1);

            event.preventDefault();
        }
    }

    onDownButtonMouseUp() {
        if (!this.props.disabled) {
            this.clearTimer();
        }
    }

    onDownButtonMouseLeave() {
        if (!this.props.disabled) {
            this.clearTimer();
        }
    }

    onDownButtonKeyUp() {
        if (!this.props.disabled) {
            this.clearTimer();
        }
    }

    onDownButtonKeyDown(event) {
        if (event.keyCode === 32) {
            this.repeat(event, null, -1);
        }
    }

    onInput(event) {
        if (this.isSpecialChar) {
            event.target.value = this.lastValue;
        }
        this.isSpecialChar = false;
    }

    onInputKeyDown(event) {
        this.lastValue = event.target.value;
        if (event.shiftKey || event.altKey) {
            this.isSpecialChar = true;
            return;
        }

        let selectionStart = event.target.selectionStart;
        let selectionEnd = event.target.selectionEnd;
        let inputValue = event.target.value;
        let newValueStr = null;

        if (event.altKey) {
            event.preventDefault();
        }

        switch (event.which) {
            //up
            case 38:
                this.spin(event, 1);
                event.preventDefault();
            break;

            //down
            case 40:
                this.spin(event, -1);
                event.preventDefault();
            break;

            //left
            case 37:
                let prevChar = inputValue.charAt(selectionStart - 1);
                if (!this.isNumeralChar(prevChar)) {
                    event.preventDefault();
                }
            break;

            //right
            case 39:
                let currentChar = inputValue.charAt(selectionStart);
                if (!this.isNumeralChar(currentChar)) {
                    event.preventDefault();
                }
            break;

            //backspace
            case 8:
                event.preventDefault();

                if (selectionStart === selectionEnd) {
                    let deleteChar = inputValue.charAt(selectionStart - 1);
                    let decimalCharIndex = inputValue.search(this._decimal);
                    this._decimal.lastIndex = 0;

                    if (this.isNumeralChar(deleteChar)) {
                        if (this._group.test(deleteChar)) {
                            this._group.lastIndex = 0;
                            newValueStr = inputValue.slice(0, selectionStart - 2) + inputValue.slice(selectionStart - 1);
                        }
                        else if (this._decimal.test(deleteChar)) {
                            this._decimal.lastIndex = 0;
                            this.inputEl.setSelectionRange(selectionStart - 1, selectionStart - 1);
                        }
                        else if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
                            newValueStr = inputValue.slice(0, selectionStart - 1) + '0' + inputValue.slice(selectionStart);
                        }
                        else if (decimalCharIndex > 0 && decimalCharIndex === 1) {
                            newValueStr = inputValue.slice(0, selectionStart - 1) + '0' + inputValue.slice(selectionStart);
                            newValueStr = this.parseValue(newValueStr) > 0 ? newValueStr : '';
                        }
                        else {
                            newValueStr = inputValue.slice(0, selectionStart - 1) + inputValue.slice(selectionStart);
                        }
                    }

                    this.updateValue(event, newValueStr, 'delete-single');
                }
                else {
                    newValueStr = this.deleteRange(inputValue, selectionStart, selectionEnd);
                    this.updateValue(event, newValueStr, 'delete-range');
                }
            break;

            // del
            case 46:
                event.preventDefault();

                if (selectionStart === selectionEnd) {
                    let deleteChar = inputValue.charAt(selectionStart);
                    let decimalCharIndex = inputValue.search(this._decimal);
                    this._decimal.lastIndex = 0;

                    if (this.isNumeralChar(deleteChar)) {
                        if (this._group.test(deleteChar)) {
                            this._group.lastIndex = 0;
                            newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 2);
                        }
                        else if (this._decimal.test(deleteChar)) {
                            this._decimal.lastIndex = 0;
                            this.inputEl.setSelectionRange(selectionStart + 1, selectionStart + 1);
                        }
                        else if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
                            newValueStr = inputValue.slice(0, selectionStart) + '0' + inputValue.slice(selectionStart + 1);
                        }
                        else if (decimalCharIndex > 0 && decimalCharIndex === 1) {
                            newValueStr = inputValue.slice(0, selectionStart) + '0' + inputValue.slice(selectionStart + 1);
                            newValueStr = this.parseValue(newValueStr) > 0 ? newValueStr : '';
                        }
                        else {
                            newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 1);
                        }
                    }

                    this.updateValue(event, newValueStr, 'delete-back-single');
                }
                else {
                    newValueStr = this.deleteRange(inputValue, selectionStart, selectionEnd);
                    this.updateValue(event, newValueStr, 'delete-range');
                }
            break;

            default:
            break;
        }
    }

    onInputKeyPress(event) {
        event.preventDefault();
        let code = event.which || event.keyCode;
        let char = String.fromCharCode(code);
        const isDecimalSign = this.isDecimalSign(char);

        if ((48 <= code && code <= 57) || this.isMinusSign(char) || isDecimalSign) {
            this.insert(event, char, isDecimalSign);
        }
    }

    onPaste(event) {
        event.preventDefault();
        let data = (event.clipboardData || window['clipboardData']).getData('Text');
        if (data) {
            let filteredData = this.parseValue(data);
            if (filteredData != null) {
                this.insert(event, filteredData.toString());
            }
        }
    }

    isMinusSign(char) {
        if (this._minusSign.test(char)) {
            this._minusSign.lastIndex = 0;
            return true;
        }

        return false;
    }

    isDecimalSign(char) {
        if (this._decimal.test(char)) {
            this._decimal.lastIndex = 0;
            return true;
        }

        return false;
    }

    insert(event, text, isDecimalSign = false) {
        const selectionStart = this.inputEl.selectionStart;
        const selectionEnd = this.inputEl.selectionEnd;
        let inputValue = this.inputEl.value.trim();
        const decimalCharIndex = inputValue.search(this._decimal);
        this._decimal.lastIndex = 0;
        let newValueStr;

        if (isDecimalSign) {
            if (decimalCharIndex > 0 && selectionStart === decimalCharIndex) {
                this.updateValue(event, inputValue, 'insert');
            }
            else if (decimalCharIndex > selectionStart && decimalCharIndex < selectionEnd) {
                newValueStr = this.insertText(inputValue, text, selectionStart, selectionEnd);
                this.updateValue(event, newValueStr, 'insert');
            }
        }
        else {
            const maxFractionDigits = this.numberFormat.resolvedOptions().maximumFractionDigits;

            if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
                if ((selectionStart + text.length - (decimalCharIndex + 1)) <= maxFractionDigits) {
                    newValueStr = inputValue.slice(0, selectionStart) + text + inputValue.slice(selectionStart + text.length);
                    this.updateValue(event, newValueStr, 'insert');
                }
            }
            else {
                newValueStr = this.insertText(inputValue, text, selectionStart, selectionEnd);
                const operation = selectionStart !== selectionEnd ? 'range-insert' : 'insert';
                this.updateValue(event, newValueStr, operation);
            }
        }
    }

    insertText(value, text, start, end) {
        let newValueStr;

        if ((end - start) === value.length)
            newValueStr = text;
        else if (start === 0)
            newValueStr = text + value.slice(end);
        else if (end === value.length)
            newValueStr = value.slice(0, start) + text;
        else
            newValueStr = value.slice(0, start) + text + value.slice(end);

        return newValueStr;
    }

    deleteRange(value, start, end) {
        let newValueStr;

        if ((end - start) === value.length)
            newValueStr = '';
        else if (start === 0)
            newValueStr = value.slice(end);
        else if (end === value.length)
            newValueStr = value.slice(0, start);
        else
            newValueStr = value.slice(0, start) + value.slice(end);

        return newValueStr;
    }

    initCursor() {
        let selectionStart = this.inputEl.selectionStart;
        let inputValue = this.inputEl.value;
        let valueLength = inputValue.length;
        let index = null;

        let char = inputValue.charAt(selectionStart);
        if (this.isNumeralChar(char)) {
            return;
        }

        //left
        let i = selectionStart - 1;
        while (i >= 0) {
            char = inputValue.charAt(i);
            if (this.isNumeralChar(char)) {
                index = i;
                break;
            }
            else {
                i--;
            }
        }

        if (index !== null) {
            this.inputEl.setSelectionRange(index + 1, index + 1);
        }
        else {
            i = selectionStart + 1;
            while (i < valueLength) {
                char = inputValue.charAt(i);
                if (this.isNumeralChar(char)) {
                    index = i;
                    break;
                }
                else {
                    i++;
                }
            }

            if (index !== null) {
                this.inputEl.setSelectionRange(index, index);
            }
        }
    }

    onInputClick() {
        this.initCursor();
    }

    isNumeralChar(char) {
        if (char.length === 1 && (this._numeral.test(char) || this._decimal.test(char) || this._group.test(char) || this._minusSign.test(char))) {
            this.resetRegex();
            return true;
        }
        else {
            return false;
        }
    }

    resetRegex() {
        this._numeral.lastIndex =  0;
        this._decimal.lastIndex =  0;
        this._group.lastIndex =  0;
        this._minusSign.lastIndex =  0;
    }

    updateValue(event, valueStr, operation) {
        let currentValue = this.inputEl.value;
        let newValue = null;

        if (valueStr != null) {
            newValue = this.parseValue(valueStr);
            this.updateInput(newValue, operation);
        }

        this.handleOnChange(event, currentValue, newValue);
    }

    handleOnChange(event, currentValue, newValue) {
        if (this.props.onChange && this.isValueChanged(currentValue, newValue)) {
            this.props.onChange({
                originalEvent: event,
                value: newValue
            });
        }
    }

    isValueChanged(currentValue, newValue) {
        if (newValue === null && currentValue !== null) {
            return true;
        }

        if (newValue != null) {
            let parsedCurrentValue = (typeof currentValue === 'string') ? this.parseValue(currentValue) : currentValue;
            return newValue !== parsedCurrentValue;
        }

        return false;
    }

    validateValue(value) {
        if (this.props.min !== null && value < this.props.min) {
            return this.props.min;
        }

        if (this.props.max !== null && value > this.props.max) {
            return this.props.max;
        }

        return value;
    }

    updateInput(value, operation) {
        let inputValue = this.inputEl.value;
        let newValue = this.formatValue(value);
        let currentLength = inputValue.length;

        if (currentLength === 0) {
            this.inputEl.value = newValue;
            this.inputEl.setSelectionRange(0, 0);
            this.initCursor();
            this.inputEl.setSelectionRange(this.inputEl.selectionStart + 1, this.inputEl.selectionStart + 1);
        }
        else {
            let selectionStart = this.inputEl.selectionEnd;
            let selectionEnd = this.inputEl.selectionEnd;
            this.inputEl.value = newValue;
            let newLength = newValue.length;

            if (newLength === currentLength) {
                if (operation === 'insert' || operation === 'delete-back-single')
                    this.inputEl.setSelectionRange(selectionEnd + 1, selectionEnd + 1);
                else if (operation === 'range-insert')
                    this.inputEl.setSelectionRange(selectionEnd, selectionEnd);
                else if (operation === 'delete-single')
                    this.inputEl.setSelectionRange(selectionEnd - 1, selectionEnd - 1);
                else if (operation === 'delete-range')
                    this.inputEl.setSelectionRange(selectionStart, selectionStart);
                else if (operation === 'spin')
                    this.inputEl.setSelectionRange(selectionStart, selectionEnd);
            }
            else if (operation === 'delete-back-single') {
                let prevChar = inputValue.charAt(selectionStart - 1);
                let nextChar = inputValue.charAt(selectionStart);
                let diff = currentLength - newLength;
                let isGroupChar = this._group.test(nextChar);

                if (isGroupChar && diff === 1) {
                    selectionEnd += 1;
                }
                else if (!isGroupChar && this.isNumeralChar(prevChar)) {
                    selectionEnd += (-1 * diff) + 1;
                }

                this._group.lastIndex = 0;
                this.inputEl.setSelectionRange(selectionEnd, selectionEnd);
            }
            else {
                selectionEnd = selectionEnd + (newLength - currentLength);
                this.inputEl.setSelectionRange(selectionEnd, selectionEnd);
            }
        }

        this.inputEl.setAttribute('aria-valuenow', value);
    }

    updateInputValue(newValue) {
        this.inputEl.value = this.formatValue(newValue);
        this.inputEl.setAttribute('aria-valuenow', newValue);
    }

    updateModel(event, value) {
        if (this.props.onValueChange) {
            this.props.onValueChange({
                originalEvent: event,
                value: value,
                stopPropagation : () =>{},
                preventDefault : () =>{},
                target: {
                    name: this.props.name,
                    id: this.props.id,
                    value: value
                }
            });
        }
    }

    onInputFocus(event) {
        event.persist();
        this.setState({ focused: true }, () => {
            if (this.props.onFocus) {
                this.props.onFocus(event);
            }
        });
    }

    onInputBlur(event) {
        event.persist();
        this.setState({ focused: false }, () => {
            let newValue = this.validateValue(this.parseValue(this.inputEl.value));
            this.updateInputValue(newValue);
            this.updateModel(event, newValue);

            if (this.props.onBlur) {
                this.props.onBlur(event);
            }
        });
    }

    clearTimer() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    isStacked() {
        return this.props.showButtons && this.props.buttonLayout === 'stacked';
    }

    isHorizontal() {
        return this.props.showButtons && this.props.buttonLayout === 'horizontal';
    }

    isVertical() {
        return this.props.showButtons && this.props.buttonLayout === 'vertical';
    }

    getInputMode() {
        return this.props.inputMode || ((this.props.mode === 'decimal' && !this.props.minFractionDigits) ? 'numeric' : 'decimal');
    }

    componentDidMount() {
        if (this.props.tooltip) {
            this.renderTooltip();
        }

        const newValue = this.validateValue(this.props.value);
        if (this.props.value !== newValue) {
            this.updateModel(null, newValue);
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.tooltip !== this.props.tooltip) {
            if (this.tooltip)
                this.tooltip.updateContent(this.props.tooltip);
            else
                this.renderTooltip();
        }

        const isOptionChanged = this.isOptionChanged(prevProps);
        if (isOptionChanged) {
            this.constructParser();
        }

        if (prevProps.value !== this.props.value || isOptionChanged) {
            const newValue = this.validateValue(this.props.value);
            this.updateInputValue(newValue);

            if (this.props.value !== newValue) {
                this.updateModel(null, newValue);
            }
        }
    }

    isOptionChanged(prevProps) {
        const optionProps = ['locale', 'localeMatcher', 'mode', 'currency', 'currencyDisplay', 'useGrouping', 'minFractionDigits', 'maxFractionDigits', 'suffix', 'prefix'];
        return optionProps.some((option) => prevProps[option] !== this.props[option]);
    }

    componentWillUnmount() {
        if (this.tooltip) {
            this.tooltip.destroy();
            this.tooltip = null;
        }
    }

    renderTooltip() {
        this.tooltip = tip({
            target: this.element,
            content: this.props.tooltip,
            options: this.props.tooltipOptions
        });
    }

    renderInputElement() {
        const className = classNames('p-inputnumber-input', this.props.inputClassName);
        const valueToRender = this.formatValue(this.props.value);

        return (
            <InputText ref={(el) => this.inputEl = ReactDOM.findDOMNode(el)} id={this.props.inputId} style={this.props.inputStyle} role="spinbutton"
                       className={className} defaultValue={valueToRender} type={this.props.type} size={this.props.size} tabIndex={this.props.tabIndex} inputMode={this.getInputMode()}
                       maxLength={this.props.maxlength} disabled={this.props.disabled} required={this.props.required} pattern={this.props.pattern}
                       placeholder={this.props.placeholder} readOnly={this.props.readonly} name={this.props.name}
                       onKeyDown={this.onInputKeyDown} onKeyPress={this.onInputKeyPress} onInput={this.onInput} onClick={this.onInputClick}
                       onBlur={this.onInputBlur} onFocus={this.onInputFocus} onPaste={this.onPaste}
                       aria-valuemin={this.props.min} aria-valuemax={this.props.max} aria-valuenow={this.props.value} aria-labelledby={this.props.ariaLabelledBy} />
        );
    }

    renderUpButton() {
        const className = classNames('p-inputnumber-button p-inputnumber-button-up p-button p-button-icon-only p-component', {
            'p-disabled': this.props.disabled
        }, this.props.incrementButtonClassName);
        const icon = classNames('p-button-icon', this.props.incrementButtonIcon);

        return (
            <button type="button" className={className} onMouseLeave={this.onUpButtonMouseLeave} onMouseDown={this.onUpButtonMouseDown} onMouseUp={this.onUpButtonMouseUp}
                onKeyDown={this.onUpButtonKeyDown} onKeyUp={this.onUpButtonKeyUp} disabled={this.props.disabled} tabIndex="-1">
                <span className={icon}></span>
                <Ripple />
            </button>
        );
    }

    renderDownButton() {
        const className = classNames('p-inputnumber-button p-inputnumber-button-down p-button p-button-icon-only p-component', {
            'p-disabled': this.props.disabled
        }, this.props.decrementButtonClassName);
        const icon = classNames('p-button-icon', this.props.decrementButtonIcon);

        return (
            <button type="button" className={className} onMouseLeave={this.onDownButtonMouseLeave} onMouseDown={this.onDownButtonMouseDown} onMouseUp={this.onDownButtonMouseUp}
                onKeyDown={this.onDownButtonKeyDown} onKeyUp={this.onDownButtonKeyUp} disabled={this.props.disabled} tabIndex="-1">
                <span className={icon}></span>
                <Ripple />
            </button>
        );
    }

    renderButtonGroup() {
        const upButton = this.props.showButtons && this.renderUpButton();
        const downButton = this.props.showButtons && this.renderDownButton();

        if (this.isStacked()) {
            return (
                <span className="p-inputnumber-button-group">
                    {upButton}
                    {downButton}
                </span>
            )
        }

        return (
            <>
                {upButton}
                {downButton}
            </>
        )
    }

    render() {
        const className = classNames('p-inputnumber p-component', this.props.className, {
                'p-inputwrapper-filled': this.props.value != null && this.props.value.toString().length > 0,
                'p-inputwrapper-focus': this.state.focused,
                'p-inputnumber-buttons-stacked': this.isStacked(),
                'p-inputnumber-buttons-horizontal': this.isHorizontal(),
                'p-inputnumber-buttons-vertical': this.isVertical()
        });
        const inputElement = this.renderInputElement();
        const buttonGroup = this.renderButtonGroup();

        return (
            <span ref={(el) => this.element = el} id={this.props.id} className={className} style={this.props.style}>
                {inputElement}
                {buttonGroup}
            </span>
        );
    }
}
