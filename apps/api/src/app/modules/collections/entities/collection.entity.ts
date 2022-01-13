import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../shared/entities/base.entity';
import { UserProfile } from '../../user-profile/entities/user-profile.entity';
import { CollectionItem } from './collection-item.entity';

@Entity()
export class Collection extends BaseEntity {

  @Column({
    nullable: false
  })
  name: string

  @Column({
    nullable: false,
    default: false
  })
  tradeable: boolean



  @ManyToOne(() => UserProfile, profile => profile.collections)
  profile: UserProfile;

  @OneToMany(() => CollectionItem, item => item.collection, { eager: true, cascade: true })
  items: CollectionItem[];

}
