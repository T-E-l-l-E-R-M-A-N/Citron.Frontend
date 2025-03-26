<script>
	export let label = 'placeholder';
	export let click;
	export let visible;
</script>

<div>
	{#if visible}
		<button class="toolbar-item" aria-label="menu" on:click={click}>
			<div class="slot">
				<slot>

				</slot>
			</div>
			<p>{label}</p>
		</button>
	{/if}

</div>


<style>
    .toolbar-item {
        align-self: center;
        display: grid;
        grid-template-columns: auto 1fr;
        height: 42px;
        background: none;
        border: 0;
        cursor: pointer;
        color: #000;
				margin-bottom: 6px;
    }

    .toolbar-item:nth-child(0) {
        margin-left: 5px;
    }

    .toolbar-item:hover {
        color: orange;
    }

    .toolbar-item .slot {
        display: grid;
        justify-self: center;
        width: 20px;
        height: 20px;
        fill: #fff;
    }

    .toolbar-item p {
        align-self: center;
        margin: 0;
        margin-left: 10px;
        color: #fff;
        font-size: 8pt;
    }

    p:empty {
        display: none;
    }

</style>