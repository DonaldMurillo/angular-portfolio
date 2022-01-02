import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthQuery } from '../../../services/auth/auth.query';
import { AuthService } from '../../../services/auth/auth.service';
import { passwordPattern } from '../../../shared/constants/regex';

@Component({
	selector: 'ap-user-login',
	templateUrl: './user-login.component.html',
	styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

	isLoading$!: Observable<boolean>;

	form: FormGroup = new FormGroup({
		username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
		password: new FormControl('', [Validators.minLength(8)]),
	})

	constructor(private service: AuthService, private query: AuthQuery) { }

	ngOnInit() {
		this.isLoading$ = this.query.select('isLoading');
	}


	checkFormControl(controlName: string) {
		const control = this.form.get(controlName);
		return control?.dirty && control?.invalid;
	}

	continue() {
		this.form.markAllAsTouched();
		if (this.form.invalid) return;
		this.service.userLogIn(this.form.value);
	}
}
