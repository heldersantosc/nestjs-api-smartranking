import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import * as dotenv from 'dotenv';
import { JogadoresModule } from './jogadores/module/jogadores.module';
import { CategoriasModule } from './categorias/categorias.module';

dotenv.config();

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_URL), JogadoresModule, CategoriasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
