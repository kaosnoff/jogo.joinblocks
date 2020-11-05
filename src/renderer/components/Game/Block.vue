<template>
  <div class="block" :style="estilo">
		<span class="label">
			{{label}}
		</span>
		<div>{{bloco.coluna}}; {{bloco.linha}}</div>
  </div>
</template>

<script>
	const VALORES = [
		'2',
		'4',
		'8',
		'16',
		'32',
		'64',
		'128',
		'256',
		'512',
		'1024',
		'2048',
		'4096',
		'8192',
		'16k',
		'32k',
		'65k',
		'131k',
		'262k',
		'524k',
		'1M',
		'2M',
		'4M',
		'8M',
		'16M',
		'33M',
		'67M',
		'134M',
		'268M',
		'536M',
		'1T',
		'2T',
		'4T',
		'8T',
		'17T',
		'34T',
		'68T',
		'137T',
		'274T',
		'549T',
		'1P',
	];
	const CORES = [
		['#ffff00','#000'],//2
		['#ffea00','#000'],//4
		['#f9a825','#000'],//8
		['#f57f17','#000'],//16
		['#f57f17','#fff'],//32
		['#e65100','#fff'],//64
		['#ff5722','#fff'],//128
		['#bf360c','#fff'],//256
		['#66bb6a','#000'],//512
		['#43a047','#000'],//1024
		['#43a047','#fff'],//2048
		['#2e7d32','#fff'],//4096
		['#1b5e20','#fff'],//8k
		['#558b2f','#fff'],//16k
		['#64b5f6','#000'],//32k
		['#2196f3','#000'],//65k
		['#5c6bc0','#000'],//131k
		['#5c6bc0','#fff'],//262k
		['#3f51b5','#fff'],//524k
		['#1a237e','#fff'],//1M
		['#b39ddb','#000'],//2M
		['#9575cd','#000'],//4M
		['#7e57c2','#000'],//8M
		['#7e57c2','#fff'],//16M
		['#673ab7','#fff'],//33M
		['#4527a0','#fff'],//67M
		['#f48fb1','#000'],//134M
		['#f06292','#000'],//268M
		['#ec407a','#000'],//536M
		['#ec407a','#fff'],//1T
		['#d81b60','#fff'],//1T
		['#ad1457','#fff'],//1T
		['#880e4f','#fff'],//1T
		['#9c27b0','#fff'],//64
		['#7b1fa2','#fff'],//128
		['#6a1b9a','#fff'],//256
		['#4a148c','#fff'],//256
	];
  export default {
    name: 'block',
		props: [
			'bloco',
		],
		data: function()
		{
			return {
			}
		},
		computed: {
			label: function()
			{
				//return this.bloco.valor;
				return VALORES[this.bloco.valor];
			},
			estilo: function()
			{
				let corN = this.bloco.valor;
				while (corN >= CORES.length)
				{
					corN -= CORES.length;
				}
				let cor = CORES[corN];
				return {backgroundColor: cor[0], color:cor[1]};
			}
		}
  }
	export class Bloco
	{
		id = (new Date()).getTime();
		coluna = null;
		linha = null;
		valor = 1;
		lastInteraction = null;
		
		constructor()
		{
			
		}
	}
</script>

<style lang="scss">
.block {
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	width: 100%;
	height: 100%;
	border-radius: 5px;
	background-color: rgba(#666,1);
	width: 8em;
	height: 8em;
	font-weight: 800;
	.label {
		font-size: 2.6em;
	}
}
</style>