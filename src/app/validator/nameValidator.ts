import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function nameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        const value = control.value;

        if (!value) {
            return null;
        }

        const nameValid = /[A-Z]{1,}[A-Za-z]{2,}/.test(value)
        const noWhite = /^\S*$/.test(value);

        const nameValidNoWhite = nameValid && noWhite

        return !nameValidNoWhite ? { nameStrength: true } : null;
    }
}