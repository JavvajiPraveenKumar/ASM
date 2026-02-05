import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from './config/database.config';
import { UserModule } from './modules/user/user.module';
import { CatagoriesModule } from './modules/categories/categories.module';
import { Supplier } from './modules/suppliers/entities/supplier.entity';
import { SuppliersModule } from './modules/suppliers/suppliers.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(databaseConfig()),
    UserModule,
    CatagoriesModule,
    SuppliersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
