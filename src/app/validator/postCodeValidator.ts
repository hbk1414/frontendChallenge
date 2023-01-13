import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function postCodeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        const value = control.value;

        if (!value) {
            return null;
        }

        const postCodeValid = /^(([A-Z]{1,2}[0-9][A-Z0-9]?|ASCN|STHL|TDCU|BBND|[BFS]IQQ|PCRN|TKCA) [0-9][A-Z]{2}|BFPO ?[0-9]{1,4}|(KY[0-9]|MSR|VG|AI)[ -]?[0-9]{4}|[A-Z]{2} ?[0-9]{2}|GE ?CX|GIR ?0A{2}|SAN ?TA1)$/.test(value)

        const postValid = postCodeValid

        return !postValid ? { postCodeStrength: true } : null;
    }
}