import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Order } from './order.entity';

export type ColorType = 'white' | 'black' | 'lime' | 'sky' | 'purple' | 'pink' | 'rose' | 'gray';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

	@Column()
	articule: number;

	@Column()
	price: number;

	@Column()
	size: number;	

	@Column()
	quantity: number;

	@Column({default: false})
	lent: boolean;

  @Column(
		{
			type: "enum",
			enum: ["white", "black", "lime", "sky", "purple", "pink", "rose", "gray"],
			default: "white",
			nullable: true
		}
	)
	color:ColorType;

	@Column({ nullable: true})
	text: string;

	@ManyToOne(() => Order, (order) => order.products)
  order: Order;
}