import { Component, Input } from '@angular/core';
import { Collection } from '../../../services/user/collections/collection.model';

@Component({
	selector: 'ap-collection-icon',
	templateUrl: './collection-icon.component.html',
	styleUrls: ['./collection-icon.component.scss']
})
export class CollectionIconComponent {

	@Input() collection!: Collection;
}
