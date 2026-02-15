import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from './config/database.config';
import { UserModule } from './modules/user/user.module';
import { CatagoriesModule } from './modules/categories/categories.module';
import { SuppliersModule } from './modules/suppliers/suppliers.module';
import { SparePartsModule } from './modules/spare-parts/spare-parts.module';
import { CustomersModule } from './modules/customers/customers.module';
import { InventoryTransactionsModule } from './modules/inventory-transactions/inventory-transactions.module';
import { EmployeesModule } from './modules/employees/employees.module';
import { MechanicsModule } from './modules/mechanics/mechanics.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { SalesModule } from './modules/sales/sales.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(databaseConfig()),
    UserModule,
    CatagoriesModule,
    SuppliersModule,
    SparePartsModule,
    CustomersModule,
    InventoryTransactionsModule,
    EmployeesModule,
    MechanicsModule,
    PaymentsModule,
    SalesModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
