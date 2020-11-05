<template>
  <div class="block">
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
				return VALORES[this.bloco.valor];
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
	background-color: rgba(red,0.5);
	width: 8em;
	height: 8em;
	font-weight: 800;
	.label {
		font-size: 2.6em;
	}
}
</style>