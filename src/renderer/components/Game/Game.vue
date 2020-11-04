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
					:valor="bloco.valor"
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
					:valor="newBlock.valor"
				></block>
			</div>
			<div class="powers">
				
			</div>
			<div class="tools">
				
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
				rangeN: 5,
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
				grid: []
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
				let blocosColuna = this.checaColuna(n);
				this.createBlock();
				setTimeout(()=>
					{
						bloco.linha = blocosColuna.length;
						console.log(bloco, blocosColuna);
					},50
				);
				this.blocos.push(bloco);
			},
			createBlock()
			{
				let valor = Math.floor(Math.random() * (this.rangeN)) + (this.minN - 1);
				let bloco = new Bloco();
				bloco.valor = valor;
				
				this.newBlock = bloco;
			},
			checaColuna(n)
			{
				let blocos = this.blocos.filter(bl => bl.coluna == n);
				return blocos;
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
	border: 1px solid rgba(white,0.1);
	
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
}
</style>