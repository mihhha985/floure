import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Product } from './product.entity';

export type OrderStatus = "start" | "confirmed" | "cancelled" | "completed" | "refusal";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fio: string;

  @Column()
  phone: string;

	@Column()
	email: string;

  @Column()
  adres: string;

	@Column({
		type: "enum",
		enum: ["start", "confirmed", "cancelled", "completed", "refusal"],
		default: "start",
	})
	status:OrderStatus;

	@Column({nullable: true})
	comment: string;

	@Column()
	date: string;

	@OneToMany(() => Product, (product) => product.order)
  products: Product[];
}