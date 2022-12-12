import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AtualizarJogadorDto } from '../dtos/atualizar-jogador.dto';
import { CriarJogadorDto } from '../dtos/criar-jogador.dto';
import { IJogador } from '../interfaces/jogador.interface';

@Injectable()
export class JogadoresService {
  private readonly logger = new Logger(JogadoresService.name);
  constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<IJogador>) {}

  async consultarTodosJogadores(): Promise<IJogador[]> {
    return await this.jogadorModel.find().exec();
  }

  async consultarJogadorPorId(id: string): Promise<IJogador> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ id }).exec();
    if (jogadorEncontrado) return jogadorEncontrado;
    throw new NotFoundException(`Jogador com id: ${id} não encontrado!`);
  }

  async deletarJogadorPeloId(id: string): Promise<any> {
    return await this.jogadorModel.deleteOne({ id }).exec();
  }

  async criar(criaJogadorDto: CriarJogadorDto): Promise<IJogador> {
    try {
      const jogadorCriado = new this.jogadorModel(criaJogadorDto);
      return await jogadorCriado.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async atualizar(id: string, atualizarJogadorDto: AtualizarJogadorDto): Promise<IJogador> {
    try {
      return await this.jogadorModel.findOneAndUpdate({ _id: id }, { $set: atualizarJogadorDto }, { new: true }).exec();
    } catch (error) {
      throw new NotFoundException('Jogador não encontrado');
    }
  }
}
