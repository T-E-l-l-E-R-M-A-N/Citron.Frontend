<script>
    export let label;
    export let value;
    export let isPassword;
    export let visible;
</script>

{#if visible}
<label class="app-input" >
    <text>{label}</text>
    <input type="{ isPassword ? 'password' : 'text'}" bind:value={value}>
</label>
{/if}

<style>
    .app-input {
        display: grid;
        margin-top: 5px;
        grid-template-columns: auto 1fr;
    }

	.app-input input {
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
        align-self: center;
    }

    .app-input:hover input {
        background: orange;
    }

    input:focus {
        background: #ffda96    
    }
</style>