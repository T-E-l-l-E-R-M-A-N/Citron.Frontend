<script>
	export let label;
	export let value;
	export let isPassword;
	export let visible;
	export let style;
	export let multiline = false;
</script>

{#if visible}
	<div class="app-input" style={style}>
		<text>{label}</text>
		{#if multiline}
			<textarea type="text" bind:value={value}></textarea>
		{:else}
			<input type={ isPassword ? 'password' : 'text'} bind:value={value}>
		{/if}
	</div>
{/if}

<style>
    .app-input {
        display: flex;
        margin-top: 5px;
        flex-direction: column;
    }

    .app-input textarea, input {
        padding: 5px;
        outline: none;
        border: none;
        border-radius: 0;
    }

    .app-input text {
        text-wrap: wrap;
        text-align: end;
        align-self: start;
    }

    .app-input:hover textarea, input {
        background: #d1d1d1;

    }

    input:focus {
        background: #ffda96
    }
</style>