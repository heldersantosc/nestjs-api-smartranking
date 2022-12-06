import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CriarJogadorDto } from '../dtos/criar-jogador.dto';
import { IJogador } from '../interfaces/jogador.interface';

@Injectable()
export class JogadoresService {
  private readonly logger = new Logger(JogadoresService.name);
  constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<IJogador>) {}

  async consultarTodosJogadores(): Promise<IJogador[]> {
    return await this.jogadorModel.find().exec();
  }

  async consultarJogadorPorEmail(email: string): Promise<IJogador> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();
    if (jogadorEncontrado) return jogadorEncontrado;
    throw new NotFoundException(`Jogador com email: ${email} não encontrado!`);
  }

  async deletarJogadorPeloEmail(email: string): Promise<void> {
    return await this.jogadorModel.remove({ email }).exec();
  }

  async criar(criaJogadorDto: CriarJogadorDto): Promise<IJogador> {
    this.logger.log(`criar: ${criaJogadorDto.email}`);
    const jogadorCriado = new this.jogadorModel(criaJogadorDto);
    return await jogadorCriado.save();
  }

  async atualizar(criaJogadorDto: CriarJogadorDto): Promise<IJogador> {
    this.logger.log(`atualizar: ${criaJogadorDto.email}`);
    return await this.jogadorModel.findOneAndUpdate({ email: criaJogadorDto.email }, { $set: criaJogadorDto }).exec();
  }
}