<script>
    export let listItemSelected;
    export let label;
</script>

<button class="aoo-menu-list-item" on:click={listItemSelected}>
    <slot></slot>
    <p>{label}</p>
</button>

<style>
    .aoo-menu-list-item {
        color: #fff;
        background: transparent;
        border: 0;
		cursor: pointer;
		height: 32px;
		display: grid;
        width: 100%;
		grid-template-columns: auto 1fr;
		align-content: center;
		text-align: left;
		padding-left: 14px;
	}

	.aoo-menu-list-item:hover {
		background: orange;
	}

    .aoo-menu-list-item p {
		align-self: center;
		margin-left: 30px;
	}
</style>