
import { SparePart } from 'src/modules/spare-parts/entities/spare-part.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToMany,
} from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text',})
  description: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', })
  createdAt: Date;
  //Relations
  @OneToMany(() => SparePart, (sparePart) => sparePart.category)
  spareParts: SparePart[];
}
