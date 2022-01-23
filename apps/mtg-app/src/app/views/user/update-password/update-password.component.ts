import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { combineLatest, Observable, startWith, Subject, takeUntil } from 'rxjs';
import { AuthQuery } from '../../../services/auth/auth.query';
import { AuthService } from '../../../services/auth/auth.service';
import { PasswordCheck } from '../../../services/user/user.models';
import { passwordPattern } from '../../../shared/constants/regex';

@Component({
	selector: 'ap-update-password',
	templateUrl: './update-password.component.html',
	styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit, OnDestroy {

	private destroy$ = new Subject();
	private pattern = passwordPattern;

	isLoading$!: Observable<boolean>;
	passwordCheck!: PasswordCheck;

	newPassword = new FormControl('', [Validators.required, Validators.pattern(this.pattern)]);
	repeatNewPassword = new FormControl('', [Validators.required, Validators.pattern(this.pattern)]);

	form: FormGroup = new FormGroup({
		oldPassword: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
		newPassword: this.newPassword,
		repeatNewPassword: this.repeatNewPassword,
	})

	constructor(private service: AuthService, private query: AuthQuery) { }

	ngOnInit() {
		this.isLoading$ = this.query.select('isLoading');
		combineLatest([
			this.newPassword.valueChanges.pipe(startWith(this.newPassword.value)),
			this.repeatNewPassword.valueChanges.pipe(startWith(this.repeatNewPassword.value))
		])
		.pipe(takeUntil(this.destroy$))
			.subscribe(([value, confirm]) => {
				this.passwordCheck = {
					hasLowercase: !!value.match(/(?=.*?[a-z])/),
					hasUppercase: !!value.match(/^(?=.*?[A-Z])/),
					hasNumber: !!value.match(/(?=.*?[0-9])/),
					hasSymbol: !!value.match(/(?=.*?[#?!@$ %^&*-])/),
					hasLength: value.length >= 8, 
					passwordsMatch: value === confirm,
				}
			})
	}

	checkFormControl(controlName: string) {
		const control = this.form.get(controlName);
		return control?.dirty && control?.invalid;
	}

	continue() {
		this.form.markAllAsTouched();
		if (this.form.invalid) return;
		this.service.updatePassword(this.form.value);
	}

	ngOnDestroy(): void {
		this.destroy$.next(null);
		this.destroy$.complete();
	}
}
