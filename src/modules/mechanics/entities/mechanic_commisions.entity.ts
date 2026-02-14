import { Mechanic } from 'src/modules/mechanics/entities/mechanic.entity';
import { Sale } from 'src/modules/sales/entities/sale.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('mechanic_commissions')
export class MechanicCommission {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  mechanic_id: number;

  @Column({ type: 'bigint' })
  sale_id: number;

  @Column({ type: 'numeric', precision: 5, scale: 2 })
  commission_pct: number;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  commission_amt: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => Mechanic, (mechanic) => mechanic.mechanicCommissions)
  @JoinColumn({ name: 'mechanic_id' })
  mechanic: Mechanic;

  @ManyToOne(() => Sale, (sale) => sale.mechanicCommissions)
  @JoinColumn({ name: 'sale_id' })
  sale: Sale;
}
