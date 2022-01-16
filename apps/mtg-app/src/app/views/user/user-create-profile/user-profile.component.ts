import { AppQuery } from '../../../services/app/app.query';
import { Observable, Subject, takeUntil, combineLatest } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserQuery } from '../../../services/user/user.query';
import { AppService } from '../../../services/app/app.service';
import { UserService } from '../../../services/user/user.service';

@Component({
	selector: 'ap-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

	private destroy$ = new Subject();

	tradeOptions = [{ label: 'Enabled', value: true }, { label: 'Disabled', value: false }];
	themeOptions = [{ label: 'Light', value: 'light' }, { label: 'Dark', value: 'dark' }];

	form: FormGroup = new FormGroup({
		id: new FormControl(),
		nickname: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
		showTrades: new FormControl(),
		theme: new FormControl(),
	});

	isCreateProfile = true;

	isLoading$!: Observable<boolean>;
	constructor(private query: UserQuery, private service: UserService, private appService: AppService, private appQuery: AppQuery) { }

	ngOnInit() {
		this.isLoading$ = this.query.selectLoading();
		combineLatest([
			this.query.select(),
			this.appQuery.select('theme')
		])
		.pipe(takeUntil(this.destroy$))
		.subscribe(([state, appTheme]) => {
			if (state.id) {
				this.isCreateProfile = false;
				return this.form.reset(state);
			}
			const formTheme = this.form.get('theme')?.value;
			const formState =  this.form.dirty ? this.form.value : undefined;
			// TODO: FIGURE NAV MENU THEME SWITCHING BUG
			if (!state.theme || formTheme !== appTheme) {
				this.form.reset({ ...state, ...formState, theme: appTheme });
			}
			else this.form.reset({ ...state, ...formState });

		})
	}

	toggleTheme(theme: 'light' | 'dark') {
		this.appService.toggleTheme(theme)
	}

	continue() {
		this.form.markAllAsTouched();
		if (this.form.invalid) return;
		if (this.isCreateProfile) this.service.updateProfile(this.form.value)
		else this.service.createProfile(this.form.value)
	}

	ngOnDestroy(): void {
		this.destroy$.next(null);
		this.destroy$.complete();
	}
}
