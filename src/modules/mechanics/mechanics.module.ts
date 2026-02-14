import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MechanicsService } from './mechanics.service';
import { MechanicsController } from './mechanics.controller';
import { Mechanic } from './entities/mechanic.entity';
import { MechanicCommission } from './entities/mechanic_commisions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mechanic, MechanicCommission])],
  controllers: [MechanicsController],
  providers: [MechanicsService],
  exports: [MechanicsService],
})
export class MechanicsModule { }
