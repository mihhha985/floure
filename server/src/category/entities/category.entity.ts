import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Catalog } from '../../catalog/entities/catalog.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

	@Column('int', { default: 0 })
	order:number;

	@Column({
		nullable:false,
		default:true
	})
	isActive:boolean;

	@OneToMany(() => Catalog, (catalog) => catalog.category)
	catalog:Catalog[];
}
