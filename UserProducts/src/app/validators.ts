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

    static nationalCode(control: AbstractControl): ValidationErrors | null {
        const value = control.value || '';
        const isValid = /^\d{10}$/.test(value);
        if (isValid){
            return null;
        } 
        return { nationalCode: true };
    }

    static phoneNumber(control: AbstractControl): ValidationErrors | null {
        const value = control.value || '';
        const isValid = /^0\d{10}$/.test(value); 
        if (isValid){
            return null ;
        }
        return {phoneNumber: true};
    }
}
