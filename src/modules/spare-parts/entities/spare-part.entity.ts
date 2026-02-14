import { Category } from 'src/modules/categories/entities/category.entity';
import { InventoryTransaction } from 'src/modules/inventory-transactions/entities/inventory-transaction.entity';
import { Supplier } from 'src/modules/suppliers/entities/supplier.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany
} from 'typeorm';

@Entity({ name: 'spare_parts'})
export class SparePart {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Index({ unique: true })
  @Column({ name: 'part_code', type: 'varchar', length: 100 })
  partCode: string;

  @Column({ name: 'part_name', type: 'varchar', length: 255 })
  partName: string;

  @Column({ name: 'category_id', type: 'bigint' })
  categoryId: number;

  @Column({ name: 'supplier_id', type: 'bigint' })
  supplierId: number;

  @Column({ name: 'vehicle_brand', type: 'varchar', length: 100 })
  vehicleBrand: string;

  @Column({ name: 'vehicle_model', type: 'varchar', length: 100 })
  vehicleModel: string;

  @Column({ name: 'vehicle_type', type: 'varchar', length: 50 })
  vehicleType: string;

  @Column({ name: 'engine_cc', type: 'varchar', length: 50, nullable: true })
  engineCc?: string;

  @Column({ name: 'part_type', type: 'varchar', length: 50 })
  partType: string; // Genuine / OEM / Aftermarket

  @Column({ type: 'varchar', length: 50, nullable: true })
  position?: string; // Front / Rear / Left / Right

  @Column({ type: 'varchar', length: 50, nullable: true })
  material?: string; // Rubber / Metal / Plastic

  @Column({ name: 'cost_price', type: 'numeric', precision: 10, scale: 2 })
  costPrice: number;

  @Column({ name: 'selling_price', type: 'numeric', precision: 10, scale: 2 })
  sellingPrice: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  mrp?: number;

  @Column({ name: 'gst_percentage', type: 'numeric', precision: 5, scale: 2 })
  gstPercentage: number;

  @Column({ name: 'current_stock', type: 'int' })
  currentStock: number;

  @Column({ name: 'min_stock_level', type: 'int' })
  minStockLevel: number;

  @Column({ type: 'varchar', length: 50 })
  unit: string; // Piece, Set, etc.

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ name: 'hsn_code', type: 'varchar', length: 50, nullable: true })
  hsnCode?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

// 3️⃣ Relations (FK mappings)
 /* ✅ The rule you must follow (VERY important)
The second arrow function must exactly match the property name
written on the other entity.*/
@ManyToOne(() => Category, (category) => category.spareParts)
@JoinColumn({ name: 'category_id' })
category: Category;

@ManyToOne(()=>Supplier,(supplier)=>supplier.spareParts)
@JoinColumn({name:'supplier_id'})
supplier:Supplier

@OneToMany(
  () => InventoryTransaction,
  (inventoryTransaction) => inventoryTransaction.sparePart,
)
inventoryTransactions: InventoryTransaction[];

}

