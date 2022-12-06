import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresController } from '../controller/jogadores.controller';
import { JogadorSchema } from '../interfaces/jogador.schema';
import { JogadoresService } from '../service/jogadores.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Jogador', schema: JogadorSchema }])],
  controllers: [JogadoresController],
  providers: [JogadoresService],
})
export class JogadoresModule {}
