/* import { FormGroup } from '@angular/forms';
export function mustMatch(password: string, confirmPassword: string) {
  return (formgroup: FormGroup) => {
    const passwordControl = formgroup.controls[password];
    const confirmPasswordControl = formgroup.controls[confirmPassword];
    if(confirmPasswordControl.errors && !confirmPasswordControl.errors['mustMatch']){
      return;
    }
    if(passwordControl.value != confirmPasswordControl.value){
      confirmPasswordControl.setErrors({mustMatch:true});
    }else{
      confirmPasswordControl.setErrors(null);
    }
  }
} */
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
export function mustMatch(password: string, confirmPassword: string) {
  return (ctrl: AbstractControl): ValidationErrors | null => {
    const passwordControl = ctrl.get(password);
    const confirmPasswordControl = ctrl.get(confirmPassword);
    if (confirmPasswordControl.errors && !confirmPasswordControl.errors['mustMatch']) {
      return null;
    }
    if (passwordControl.value != confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ mustMatch: true });
    } else {
      confirmPasswordControl.setErrors(null);
    }
    return null;
  }
}
