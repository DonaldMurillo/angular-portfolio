import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../shared/entities/base.entity';
import { User } from '../../auth/entities/user.entity';
import { Collection } from '../../collections/entities/collection.entity';

@Entity()
export class UserProfile extends BaseEntity {

  @Column({
    nullable: false,
    unique: true
  })
  nickname: string

  @Column({
    nullable: true,
    type: 'bytea'
  })
  avatarImage: Buffer

  @Column({
    nullable: false,
    default: false
  })
  showTrades: boolean

  @Column({
    nullable: false,
    default: 'light'
  })
  theme: string

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(() => Collection, collection => collection.profile, { eager: true, cascade: true })
  collections: Collection[];

  // add collections
  // theme selector4
  // array recurrent_store

}
