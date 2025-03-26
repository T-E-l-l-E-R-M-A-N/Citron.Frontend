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
        color: #000;
        background: transparent;
        border: 0;
        cursor: pointer;
        height: 42px;
        width: auto;
        display: flex;
        align-content: start;
        font-size: 32pt;
				margin-bottom: 8px;
				font-family: 'SegoeWP', serif;
    }

		.aoo-menu-list-item:nth-child(2) {
        margin-left: 40px;
		}
		.aoo-menu-list-item:nth-child(3) {
        margin-left: 40px;
		}

    .aoo-menu-list-item:hover {
        color: orange;
    }

    .aoo-menu-list-item-content {
        margin-top: 6px;
        margin-left: 8px;
    }

    .aoo-menu-list-item .aoo-menu-list-item-label {
        align-self: center;
        text-align: left;
        margin-left: 0;
    }

    .selected {
        color: orange;
    }
</style>