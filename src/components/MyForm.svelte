<script>
	import Button from './Button.svelte';
	import TextField from './TextField.svelte';

	let name;
	let login;
	let password;

	export let visible;
	export let isRegister;

	export let onSubmit;

	function onSwitchFormMode() {
		isRegister = !isRegister;
	}
</script>


{#if visible}
	<div class="form">
		<div class="form-header">
			<p>
				WELCOME
			</p>
		</div>
		<TextField label="NAME:"
							 bind:value={name}
							 visible={isRegister}></TextField>
		<TextField label="LOGIN:"
							 bind:value={login}
							 visible=1></TextField>
		<TextField label="PASSWORD:"
							 bind:value={password}
							 isPassword="true"
							 visible=1></TextField>
		<Button click={() => onSubmit([name, login, password])}>
			SUBMIT
		</Button>
		<div class="form-footer">
			<p>
				{isRegister ? 'Already have an account?' : 'Create a new account'}
			</p>
			<Button click={() => onSwitchFormMode()}>
				{isRegister ? 'SIGN IN' : 'CREATE'}
			</Button>
		</div>
	</div>
{/if}


<style>
    .form {
				margin-top: 15vh;
        background: #FFFFFF20;
				border: 1px solid gray;
        padding: 10px;
        justify-self: center;
        align-self: center;
        display: grid;
        width: 310px;
        color: #000
    }

    .form-header {
        display: flex;
        flex-direction: column;
				text-align: center;
    }

    div :global(.generic-button) {
				width: 100%;
		}

    .form-footer :global(.generic-button) {
        justify-self: center;
        align-self: start;
				background: transparent;
				color: orange;
    }

		.form-footer p {
				text-align: center;
		}
</style>
