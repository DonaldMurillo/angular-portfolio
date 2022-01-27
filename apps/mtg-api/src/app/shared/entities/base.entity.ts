import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: 'now()',
    update: false,
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    default: 'now()',
    onUpdate: 'now()',
    nullable: false,
  })
  updatedAt: Date;

  @Column({
    default: true,
    nullable: false,
  })
  isActive: boolean;
}
