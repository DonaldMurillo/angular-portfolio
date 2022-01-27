import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../shared/entities/base.entity';
import { Collection } from './collection.entity';

@Entity()
export class CollectionItem extends BaseEntity {
  @Column({
    nullable: false,
    type: 'uuid',
  })
  scryfallId: string;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  scryfallUri: string;

  @Column({
    nullable: false,
  })
  imageUriNormal: string;

  @Column('varchar', {
    nullable: true,
    array: true,
    ///
  })
  colors: string[];

  @Column({
    nullable: false,
  })
  foil: boolean;

  @Column({
    nullable: false,
  })
  quantity: number;

  @Column({
    nullable: true,
  })
  lang: string;

  @ManyToOne(() => Collection, (collection) => collection.items, {
    onDelete: 'CASCADE',
  })
  collection: Collection;
}
