import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
    static passwordStrength(control: AbstractControl): ValidationErrors | null {
        const value: string = control.value || '';

        const hasNumber = /\d/.test(value);
        const hasLetter = /[a-zA-Z]/.test(value);
        const validLength = value.length >= 8;

        if (!hasNumber || !hasLetter || !validLength) {
            return { passwordStrength: true }; 
        }

        return null; 
    }
}
