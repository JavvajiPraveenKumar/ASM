import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password_hash: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', default: true })
  role: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' , type: 'timestamp',})
  updatedAt: Date;
}
