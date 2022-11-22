import { v4 as uuidv4 } from 'uuid';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';

@Injectable()
export class JogadoresService {
  private readonly logger = new Logger(JogadoresService.name);
  private jogadores: Jogador[] = [];

  async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
    this.logger.log(`criaJogadorDto: ${JSON.stringify(criarJogadorDto)}`);

    const { email } = criarJogadorDto;

    const jogadorEncontrado = this.jogadores.find((jogador) => jogador.email === email);

    if (jogadorEncontrado) {
      this.atualizar(jogadorEncontrado, criarJogadorDto);
    } else {
      this.criar(criarJogadorDto);
    }
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return this.jogadores;
  }

  async consultarJogadoresPeloEmail(email: string): Promise<Jogador> {
    const jogadorEncontrado = this.jogadores.find((jogador) => jogador.email === email);
    if (jogadorEncontrado) return jogadorEncontrado;

    throw new NotFoundException(`Jogador com email: ${email} não encontrado!`);
  }

  async deletarJogadorPeloEmail(email: string): Promise<void> {
    this.jogadores = this.jogadores.filter((jogador) => jogador.email !== email);
  }

  private criar(criaJogadorDto: CriarJogadorDto): void {
    const { nome, email, telefoneCelular } = criaJogadorDto;
    const jogador: Jogador = {
      _id: uuidv4(),
      nome,
      telefoneCelular,
      email,
      ranking: 'A',
      posicaoRanking: 1,
      urlFotoJogador:
        'https://img.r7.com/images/2014/06/09/7tz6d2bgf6_x3o4gf3cq_file.jpg?dimensions=771x420&no_crop=true',
    };

    this.jogadores.push(jogador);
  }

  private atualizar(jogadorEncontrado: Jogador, criarJogadorDto: CriarJogadorDto): void {
    const { nome } = criarJogadorDto;
    jogadorEncontrado.nome = nome;
  }
}
