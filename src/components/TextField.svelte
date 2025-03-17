<script>
    export let label;
    export let value;
    export let isPassword;
    export let visible;
    export let style;
    export let multiline = false;
</script>

{#if visible}
<label class="app-input" style={style}>
    <text>{label}</text>
    {#if multiline}
        <textarea type="text" bind:value={value}></textarea>
    {:else}
        <input type={ isPassword ? 'password' : 'text'} bind:value={value}>
</label>
{/if}

<style>
    .app-input {
        display: grid;
        margin-top: 5px;
        grid-template-columns: auto 1fr;
    }

	.app-input textarea, input {
        margin-left: 10px;
		padding: 5px;
        outline: none;
        border: none;
        border-radius: 0;
	}

    .app-input text {
        width: 70px;
        text-wrap: wrap;
        text-align: end;
        align-self: top;
    }

    .app-input:hover textarea, input {
        background: orange;
    }

    input:focus {
        background: #ffda96    
    }
</style>