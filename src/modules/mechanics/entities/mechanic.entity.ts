import { MechanicCommission } from 'src/modules/mechanics/entities/mechanic_commisions.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

@Entity('mechanics')
export class Mechanic {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @OneToMany(
    () => MechanicCommission,
    (commission) => commission.mechanic,
  )
  mechanicCommissions: MechanicCommission[];
}

