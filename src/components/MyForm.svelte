<script>
	export let name;
	export let login;
	export let password;

	export let isRegister = 1;
</script>



<div class="form">
	{#if isRegister}
    <label class="form-input" >
		Name
        <input bind:value={name} />
	</label>
	{/if}
    <label class="form-input" >
		Login
        <input bind:value={login} />
	</label>
	<label class="form-input" >
		Password
        <input type="password" bind:value={password} />
	</label>
    <button class="form-submit" aria-label="submit">
        SUBMIT
    </button>
</div>

<style>
	.form {
		background: rgba(105, 120, 142, 0.474);
		padding: 10px;
		justify-self: center;
		align-self: center;
		display: grid;
        width: 310px;
        color: #fff
	}

    .form-input {
        display: flex;
        flex-direction: column;
        margin-top: 5px;
    }

	.form-input input {
		margin-top: 5px;
		padding: 5px;
        outline: none;
        border: none;
        border-radius: 0;
	}

    .form-input:hover {
        background: orange;
    }

	.form-submit {
		height: 29.5px;
        justify-self: end;
        align-self: end;
        border: none;
        margin-top: 8px;
        color: #fff;
        background: blue;
        cursor: pointer;
	}

    .form-submit:hover {
        background: orange;
    }

</style>
