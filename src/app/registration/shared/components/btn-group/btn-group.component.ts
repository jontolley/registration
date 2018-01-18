import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BtnGroupOption, BtnGroupOptions } from "./btn-group-option";

@Component({
  selector: 'app-btn-group',
  inputs: ['options', 'value'],
  templateUrl: './btn-group.component.html',
  styleUrls: ['./btn-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BtnGroupComponent),
      multi: true
    }
  ]
})
export class BtnGroupComponent implements ControlValueAccessor {

  options: BtnGroupOptions;
  value: any;
  values: any[] = [];

  constructor() { }

  valueChanged(option: BtnGroupOption) {
    if (this.options.multiselect) {
      let index = this.values.indexOf(option.value);
      if (index > -1) {
        // remove from values array
        this.values.splice(index, 1);
      } else {
        // add to values array
        this.values.push(option.value);
      }
      this.propagateChange(this.values);
    } else {
      this.value = option.value;
      this.propagateChange(this.value);
    }
  }

  isActive(option: BtnGroupOption) {
    if (this.options.multiselect) {
      let index = this.values.indexOf(option.value);
      return index > -1;
    } else {
      return option.value === this.value;
    }
  }

  propagateChange = (_: any) => { };

  // ControlValueAccessor methods

  writeValue(value: any): void {
    if (this.options.multiselect) {
      this.values = value;
    } else {
      this.value = value;
    }
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void { }

  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }
}
