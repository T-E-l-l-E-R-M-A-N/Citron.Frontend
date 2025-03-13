<script>
    export let listItemSelected;
    export let label;
	export let isSelected;
	export let elementWidth;
</script>

<button class="aoo-menu-list-item {isSelected ? 'selected' : ''}" on:click={listItemSelected}
		style:width={elementWidth}>
		<div class="aoo-menu-list-item-content">
			<slot></slot>
		</div>
    	<p class="aoo-menu-list-item-label">{label}</p>
	
</button>

<style>
    .aoo-menu-list-item {
        color: #fff;
        background: transparent;
        border: 0;
		cursor: pointer;
		height: 42px;
        width: 100%;
		display: flex;
		align-content: center;
	}

	.aoo-menu-list-item:hover {
		background: orange;
	}

	.aoo-menu-list-item-content {
		margin-top: 6px;
		margin-left: 8px;
	}

    .aoo-menu-list-item .aoo-menu-list-item-label {
		align-self: center;
		text-align: left;
		margin-left:30px;
	}

	.selected {
		background: darkgoldenrod;
	}
</style>