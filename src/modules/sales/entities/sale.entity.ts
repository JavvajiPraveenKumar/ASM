import { Customer } from 'src/modules/customers/entities/customer.entity';
import { Payment } from 'src/modules/payments/entities/payment.entity';
import { SaleItem } from '../entities/sale_items.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';

@Entity('sales')
export class Sale {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'bigint', nullable: true })
  customer_id: number;

  @Column({ type: 'varchar', length: 50 })
  sale_type: string;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  total_amount: number;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  paid_amount: number;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  pending_amount: number;

  @Column({ type: 'varchar', length: 30 })
  payment_status: string;

  @Column({ type: 'date' })
  sale_date: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => Customer, { nullable: true })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @OneToMany(() => Payment, (payment) => payment.sale)
payments: Payment[];


@OneToMany(() => SaleItem, (saleItem) => saleItem.sale)
saleItems: SaleItem[];

}

