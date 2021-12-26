import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../shared/entities/base.entity';
import { User } from '../../auth/entities/user.entity';

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

  // add collections
  // theme selector4
  // array recurrent_store

}
