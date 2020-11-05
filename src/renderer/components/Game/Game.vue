<template>
	<div class="wrapper">
		<div id="gameWindow">
			<div class="grid">
				<div class="item" v-for="item in rows" :key="item" data-index="item">
					&nbsp;
				</div>
			</div>
			<div class="blocos">
				<block class="bloco" v-for="bloco in blocos" :key="bloco.id"
					:data-coluna="bloco.coluna" :data-linha="bloco.linha"
					:bloco="bloco"
				>
				</block>
			</div>
			<div class="colunas">
				<div class="coluna" v-for="col in cols" :key="col" :data-index="col" @click="clicaColuna(col)">
				</div>
			</div>
		</div>
		<div id="hud">
			<div class="next">
				<block v-if="newBlock"
					:bloco="newBlock"
				></block>
			</div>
			<div class="powers">
				
			</div>
			<div class="tools">
				<p>Last lastInteraction: {{lastInteraction}}</p>
			</div>
		</div>
	</div>
</template>

<script>
	import Block from './Block'
	import * as TWEEN from '@tweenjs/tween.js'
	import { Bloco } from './Block.vue'
	
  export default {
    name: 'game',
		components: { Block },
		data: function ()
		{
			return {
				minN: 10,
				rangeN: 2,
				newBlock: null,
				cols: [0,1,2,3,4],
				rows: [
					0,1,2,3,4,
					5,6,7,8,9,
					10,11,12,13,14,
					15,16,17,18,19,
					20,21,22,23,24,
					25,26,27,28,29,
					30,31,32,33,34
				],
				blocos: [],
				grid: [],
				lastInteraction: 0
			}
		},
		created: function()
		{
			this.grid = []
			for (let i = 0; i < 5; i++)
			{
				this.grid[i] = [];
				for (let j = 0; j < 7; j++)
				{
					this.grid[i][j] = null;
				}
			}
			this.createBlock();
		},
		methods: {
			clicaColuna(n)
			{
				let bloco = {...this.newBlock};
				bloco.coluna = n;
				bloco.linha = 7;
				let blocosColuna = this.getColuna(n);
				this.createBlock();
				this.blocos.push(bloco);
				setTimeout(()=>
					{
						bloco.linha = blocosColuna.length;
						console.log(bloco.linha);
						this.checaVizinhos(bloco).then(vizinhos =>
						{
							this.checaTabuleiro();
						})
					},50
				);
			},
			createBlock()
			{
				let valor = Math.floor(Math.random() * (this.rangeN)) + (this.minN - 1);
				let bloco = new Bloco();
				bloco.valor = valor;
				
				this.newBlock = bloco;
			},
			getColuna(n)
			{
				let blocos = this.blocos.filter(bl => bl.coluna == n);
				return blocos;
			},
			checaVizinhos(bloco)
			{
				return new Promise((resolve, reject) =>
				{
					let vizinhos = [];
					let vizinho;
					// Pega vizinho de baixo
					if (bloco.linha > 0)
					{
						vizinho = this.blocos.find(bl => bl.coluna == (bloco.coluna) && bl.linha == (bloco.linha - 1));
						if (vizinho && vizinho.valor == bloco.valor) 
						{
							vizinhos.push(vizinho);
						}
					}
					if (vizinhos.length == 0 && bloco.linha > 6) return this.terminaJogo();
					// Pega vizinho do lado esquerdo
					if (bloco.coluna > 0)
					{
						vizinho = this.blocos.find(bl => bl.coluna == (bloco.coluna - 1) && bl.linha == (bloco.linha));
						if (vizinho && vizinho.valor == bloco.valor) 
						{
							vizinhos.push(vizinho);
						}
					}
					// Pega vizinho do lado direito
					if (bloco.coluna < 4)
					{
						vizinho = this.blocos.find(bl => bl.coluna == (bloco.coluna + 1) && bl.linha == (bloco.linha));
						if (vizinho && vizinho.valor == bloco.valor) 
						{
							vizinhos.push(vizinho);
						}
					}
					// Pega vizinho de cima
					if (bloco.linha < 7)
					{
						vizinho = this.blocos.find(bl => bl.coluna == (bloco.coluna) && bl.linha == (bloco.linha + 1));
						if (vizinho && vizinho.valor == bloco.valor)
						{
							vizinhos.push(vizinho);
						}
					}
					if (vizinhos.length > 0)
					{
						let valor = bloco.valor + vizinhos.length;
						
						for (let vizinho of vizinhos)
						{
							if (vizinho.coluna == (bloco.coluna))
							{
								if (vizinho.linha == (bloco.linha - 1))
								{
									//vizinho.linha += 1;
									setTimeout(()=>{bloco.linha -= 1;},300);
								}
								else
								{
									vizinho.linha -= 1;
								}
							}
							else if (vizinho.linha == (bloco.linha))
							{
								if (vizinho.coluna == (bloco.coluna - 1))
								{
									vizinho.coluna += 1;
								}
								else
								{
									vizinho.coluna -= 1;
								}
							}
							setTimeout(
								() => {
									this.blocos = this.blocos.filter(b => b.id != vizinho.id);
								},
								250
							)
						}
						
						bloco.valor = valor;
					}
					resolve(vizinhos);
				});
			},
			checaTabuleiro()
			{
				let items;
				for (let i = 0; i < 4; i++)
				{
					items = this.getColuna(i);
					if (!items || items.length < 1) continue;
					let linhaAtual = 0;
					for (let item of items)
					{
						console.log(item,item.linha, linhaAtual);
						if (item.linha > linhaAtual)
						{
							item.linha = linhaAtual;
						}
						linhaAtual++;
					}
					for (let item in items)
					{
						this.checaVizinhos(item);
					}
				}
			},
			terminaJogo()
			{
				console.log('Final!');
			},
			limpaJogo()
			{
				this.blocos = [];
			}
		}
  }
</script>

<style lang="scss">
#gameWindow {
	display: block;
	position: relative;
	font-size: 1rem;
	width: 40em;
	height: 56em;
	margin: 2rem auto 1rem;
	@media all and (orientation: landscape)
	{
		margin: 0px 20px auto;
		float: left;
		font-size: 0.68rem;
	}
	
	.grid {
		position: absolute;
		display: grid;
		grid-gap: 0.6em;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: -1;
		.item {
			background-color: rgba(white,0.1);
			border-radius: 0.3em;
		}
	}
	.colunas {
		position: absolute;
		display: grid;
		grid-gap: 0.6em;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 9;
		.coluna {
			cursor: pointer;
			transition: all 0.25s ease;
			&:hover {
				background-color: rgba(white,0.1);
			}
		}
	}
	.blocos {
		position: relative;
		overflow: hidden;
		z-index: 1;
		width: 100%;
		height: 100%;
		
		.bloco {
			position: absolute;
			top: 100%;
			left: 0em;
			font-size: 0.96em;
			//width: calc(16vw - 2px);
			//height: calc(16vw - 2px);
			transition: all 0.25s ease;
		}
		@for $i from 0 through 4 {
			.bloco[data-coluna="#{$i}"] {
				left: calc(#{$i*0.45em} + #{$i*8em} - 0.02em);
			}
		}
		@for $j from 0 through 7 {
			.bloco[data-linha="#{$j}"] {
				top: calc(#{$j*0.45em} + #{$j*8em} - 0.02em);
			}
		}
	}
}

#hud {
	position: relative;
	display: grid;
	margin: 20px 10vw;
	padding-left: 11rem;
	
	@media all and (orientation: landscape) {
		
	}
	
	.next {
		position: absolute;
		top: 0px;
		left: 0px;
		padding: 0.2em;
		border: 2px solid rgba(white,0.25);
		border-radius: 0.5em;
		font-size: 1.1rem;
		.block {
			position: relative !important;
			font-size: 1.0em;
			//width: 64px;
			//height: 64px;
		}
	}
	
	.powers, .tools {
		padding: 0.2em;
		margin: 0em 0em 1em;
		min-height: 4.3em;
		border: 2px solid rgba(white,0.25);
		border-radius: 0.5em;
		display: flex;
		align-items: flex-start;
		justify-content: space-evenly;
	}
	.powers {
	}
	.tools {
	}
}
</style>