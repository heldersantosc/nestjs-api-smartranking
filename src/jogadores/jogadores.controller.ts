import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { IJogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  async criarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
    return await this.jogadoresService.criar(criarJogadorDto);
  }

  @Patch()
  async atualizarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
    return await this.jogadoresService.atualizar(criarJogadorDto);
  }

  @Get()
  async consultarJogador(@Query('email') email: string): Promise<IJogador[] | IJogador> {
    return email
      ? await this.jogadoresService.consultarJogadorPorEmail(email)
      : await this.jogadoresService.consultarTodosJogadores();
  }

  @Delete()
  async deletarJogador(@Query('email') email: string): Promise<void> {
    this.jogadoresService.deletarJogadorPeloEmail(email);
  }
}
