<script>
    export let click;
</script>

<button class="generic-button" 
            aria-label="genbtn"
            on:click={click}>
        <slot></slot>
</button>

<style>
    .generic-button {
		height: 29.5px;
        justify-self: end;
        align-self: end;
        margin-top: 8px;
        color: #fff;
        background: blue;
        border: 1px solid #fff;
        cursor: pointer;
	}

    .generic-button:hover {
        background: orange;
    }
</style>