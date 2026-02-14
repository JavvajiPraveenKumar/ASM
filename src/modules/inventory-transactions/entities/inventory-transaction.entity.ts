import { SparePart } from 'src/modules/spare-parts/entities/spare-part.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity('inventory_transactions')
export class InventoryTransaction {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  spare_part_id: number;

  @Column({ type: 'varchar', length: 50 })
  type: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'varchar', length: 50 })
  reference_type: string;

  @Column({ type: 'bigint', nullable: true })
  reference_id: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => SparePart, (sparePart) => sparePart.inventoryTransactions)
  @JoinColumn({ name: 'spare_part_id' }) // foreign key column name
  sparePart: SparePart;
}
