import { AuthQuery } from './../../../services/auth/auth.query';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Observable, takeUntil, Subject, combineLatest, startWith } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordPattern } from '../../../shared/constants/regex';

interface PasswordCheck {
	hasLowercase: boolean;
	hasUppercase: boolean;
	hasNumber: boolean;
	hasSymbol: boolean;
	hasLength: boolean;
	passwordsMatch: boolean;
}

@Component({
	selector: 'ap-user-signup',
	templateUrl: './user-signup.component.html',
	styleUrls: ['./user-signup.component.scss']
})
export class UserSignupComponent implements OnInit, OnDestroy {

	private destroy$ = new Subject();
	private pattern = passwordPattern;

	isLoading$!: Observable<boolean>;
	passwordCheck!: PasswordCheck;

	password = new FormControl('', [Validators.required, Validators.pattern(this.pattern)]);
	cPassword = new FormControl('', [Validators.required, Validators.pattern(this.pattern)]);

	form: FormGroup = new FormGroup({
		username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
		email: new FormControl('', [Validators.email, Validators.required]),
		password: this.password,
		cPassword: this.cPassword,
	})

	constructor(private service: AuthService, private query: AuthQuery) { }

	ngOnInit() {
		this.isLoading$ = this.query.select('isLoading');
		combineLatest([
			this.password.valueChanges.pipe(startWith(this.password.value)),
			this.cPassword.valueChanges.pipe(startWith(this.cPassword.value))
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
		this.service.userSignUp(this.form.value);
	}

	ngOnDestroy(): void {
		this.destroy$.next(null);
		this.destroy$.complete();
	}
}
