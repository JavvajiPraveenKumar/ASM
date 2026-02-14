import { Sale } from 'src/modules/sales/entities/sale.entity';
import { SparePart } from 'src/modules/spare-parts/entities/spare-part.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('sale_items')
export class SaleItem {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  sale_id: number;

  @Column({ type: 'bigint' })
  spare_part_id: number;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  selling_price: number;

  @ManyToOne(() => Sale, (sale) => sale.saleItems)
  @JoinColumn({ name: 'sale_id' })
  sale: Sale;

  @ManyToOne(() => SparePart, (sparePart) => sparePart.saleItems)
  @JoinColumn({ name: 'spare_part_id' })
  sparePart: SparePart;
}
