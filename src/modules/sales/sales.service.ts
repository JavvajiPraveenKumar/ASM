import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Sale } from './entities/sale.entity';
import { SaleItem } from './entities/sale_items.entity';
import { SparePart } from '../spare-parts/entities/spare-part.entity';
import { InventoryTransaction } from '../inventory-transactions/entities/inventory-transaction.entity';
import { Payment } from '../payments/entities/payment.entity';
import { Mechanic } from '../mechanics/entities/mechanic.entity';
import { MechanicCommission } from '../mechanics/entities/mechanic_commisions.entity';

@Injectable()
export class SalesService {
  constructor(private dataSource: DataSource) { }

  async createSaleTransaction(createSaleDto: CreateSaleDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const {
        items,
        customer_id,
        sale_type,
        total_amount,
        paid_amount,
        payment_status,
        sale_date,
        mechanic_id,
        payment_mode,
      } = createSaleDto;

      // 1. Check current_stock
      for (const item of items) {
        const sparePart = await queryRunner.manager.findOne(SparePart, {
          where: { id: item.spare_part_id },
        });

        if (!sparePart) {
          throw new NotFoundException(
            `Spare part with ID ${item.spare_part_id} not found`,
          );
        }

        if (sparePart.currentStock < item.quantity) {
          throw new BadRequestException(
            `Insufficient stock for spare part: ${sparePart.partName}. Current: ${sparePart.currentStock}, Requested: ${item.quantity}`,
          );
        }
      }

      // 2. Create Sale Record
      const pending_amount = total_amount - paid_amount;
      const sale = queryRunner.manager.create(Sale, {
        customer_id: customer_id ?? undefined, // Use undefined instead of null
        sale_type,
        total_amount,
        paid_amount,
        pending_amount,
        payment_status,
        sale_date: new Date(sale_date),
      });

      const savedSale = await queryRunner.manager.save(sale);

      // 3. Create Sale Items and Update Inventory
      for (const item of items) {
        // Create Sale Item
        const saleItem = queryRunner.manager.create(SaleItem, {
          sale_id: savedSale.id,
          spare_part_id: item.spare_part_id,
          quantity: item.quantity,
          selling_price: item.selling_price,
          // total: item.quantity * item.selling_price, // If total column exists in SaleItem, usually calculated
        });
        await queryRunner.manager.save(saleItem);

        // Update Spare Part Stock
        const sparePart = await queryRunner.manager.findOne(SparePart, {
          where: { id: item.spare_part_id },
        }); // Re-fetch to be safe or use previous if locked, but here safe enough

        if (sparePart) {
          sparePart.currentStock -= item.quantity;
          await queryRunner.manager.save(sparePart);

          // Create Inventory Transaction
          const inventoryTransaction = queryRunner.manager.create(
            InventoryTransaction,
            {
              spare_part_id: item.spare_part_id,
              type: 'OUT', // Or 'SALE' depending on your enum/string
              quantity: item.quantity,
              reference_type: 'Sales',
              reference_id: savedSale.id,
            },
          );
          await queryRunner.manager.save(inventoryTransaction);
        }
      }

      // 4. Create Payment Record
      if (paid_amount > 0) {
        const payment = queryRunner.manager.create(Payment, {
          sale_id: savedSale.id,
          amount: paid_amount,
          payment_mode: payment_mode,
          payment_date: new Date(),
        });
        await queryRunner.manager.save(payment);
      }

      // 5. Create Mechanic Commission
      if (mechanic_id) {
        const mechanic = await queryRunner.manager.findOne(Mechanic, {
          where: { id: mechanic_id },
        });

        if (!mechanic) {
          // Should we throw error or ignore? Requirements say "if req.body have mechanic_id, we will create..."
          // I'll assume valid ID is provided or valid check needed.
          throw new NotFoundException(`Mechanic with ID ${mechanic_id} not found`);
        }

        // Logic for commission amount calculation? 
        // User didn't specify formula, assuming 0 or manual for now or passed in? 
        // User said: "create the record in mechanic_commisions table".
        // I will assume commission logic needs clarification or simple insert if commission data is in DTO?
        // Wait, DTO doesn't have commission amount. 
        // I'll create a placeholder record or calculate strict percentage if implied, 
        // but for now I'll set a default or look for config.
        // Let's assume a default 0 or based on total_amount? 
        // I'll stick to creating the record as requested, maybe with 0 commission for now if not specified.

        const commissionAmt = 0; // Placeholder
        const commissionPct = 0;

        const commission = queryRunner.manager.create(MechanicCommission, {
          mechanic_id: mechanic_id,
          sale_id: savedSale.id,
          commission_amt: commissionAmt,
          commission_pct: commissionPct,
        });
        await queryRunner.manager.save(commission);

      }

      await queryRunner.commitTransaction();

      return {
        message: 'Payment Successfully', // As requested
        saleId: savedSale.id,
      };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(
        `Transaction failed: ${err.message}`,
      );
    } finally {
      await queryRunner.release();
    }
  }

  findAll() {
    return `This action returns all sales`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sale`;
  }

  update(id: number, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }
}
