import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { Sale } from './entities/sale.entity';
import { SaleItem } from './entities/sale_items.entity';
import { Payment } from '../payments/entities/payment.entity'; // verify path
import { SparePart } from '../spare-parts/entities/spare-part.entity';
import { InventoryTransaction } from '../inventory-transactions/entities/inventory-transaction.entity';
import { Mechanic } from '../mechanics/entities/mechanic.entity';
import { MechanicCommission } from '../mechanics/entities/mechanic_commisions.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Sale,
      SaleItem,
      Payment,
      SparePart,
      InventoryTransaction,
      Mechanic,
      MechanicCommission,
    ]),
  ],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule { }
