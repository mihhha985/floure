import { Entity, Column, PrimaryGeneratedColumn,ManyToOne } from 'typeorm';
import { Catalog } from './catalog.entity';

@Entity()
export class Parametrs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  size: number;

	@Column()
	cost: number;

	@ManyToOne(() => Catalog, (catalog) => catalog.parametrs, {onDelete: 'CASCADE'})
  catalog: Catalog
}