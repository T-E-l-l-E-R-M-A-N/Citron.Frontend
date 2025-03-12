<script>
	import ToolBarItem from "./ToolBarItem.svelte";

	export let visible;
	export let height = "90px";
	export let expandingControl;
</script>

{#if visible}
	<div class="mobile-bar" style:height={height}>
		<ToolBarItem click={expandingControl} label="" visible={true}>
			<svg
				class="icon"
				version="1.1"
				id="Capa_1"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				x="0px"
				y="0px"
				viewBox="0 0 384 384"
				style="enable-background:new 0 0 384 384;"
				xml:space="preserve"
				><g
					><g
						><g
							><rect x="0" y="277.333" width="384" height="42.667" /><rect
								x="0"
								y="170.667"
								width="384"
								height="42.667"
							/><rect x="0" y="64" width="384" height="42.667" /></g
						></g
					></g
				></svg
			>
		</ToolBarItem>
		{#if height != "90px"}
			<div style="margin-top: 20px">
				MENU
				<slot></slot>
			</div>
		{/if}
	</div>
{/if}

<style>
	.mobile-bar {
		position: fixed;
		bottom: 0;
		padding: 10px;
		width: 100%;
		background: #000;
		color: #fff;
	}
</style>
