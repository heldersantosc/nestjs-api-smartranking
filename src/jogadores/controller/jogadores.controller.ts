import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { AtualizarJogadorDto } from '../dtos/atualizar-jogador.dto';
import { CriarJogadorDto } from '../dtos/criar-jogador.dto';
import { IJogador } from '../interfaces/jogador.interface';
import { JogadoresValidacaoParametrosPipe } from '../pipes/jogadores-validacao-prametros.pipe';
import { JogadoresService } from '../service/jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
    return await this.jogadoresService.criar(criarJogadorDto);
  }

  @Put('/:id')
  async atualizarJogador(@Param('id') id: string, @Body() atualizarJogadorDto: AtualizarJogadorDto): Promise<IJogador> {
    return await this.jogadoresService.atualizar(id, atualizarJogadorDto);
  }

  @Get('/:id')
  async consultarJogadorPorId(@Param('id', JogadoresValidacaoParametrosPipe) id: string): Promise<IJogador> {
    return await this.jogadoresService.consultarJogadorPorId(id);
  }

  @Get()
  async consultarJogadores(): Promise<IJogador[]> {
    return await this.jogadoresService.consultarTodosJogadores();
  }

  @Delete('/:id')
  async deletarJogador(@Param('id') id: string): Promise<void> {
    return this.jogadoresService.deletarJogadorPeloId(id);
  }
}
