<script>
	import Button from "./Button.svelte";
    import TextField from "./TextField.svelte";

	let name;
	let login;
	let password;

    export let visible;
	export let isRegister;

    export let onSubmit;
</script>


{#if visible}
<div class="form">
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
</div>
{/if}


<style>
	.form {
        margin-top: 20vh;
		background: rgba(105, 120, 142, 0.474);
		padding: 10px;
		justify-self: center;
		align-self: center;
		display: grid;
        width: 310px;
        color: #fff
	}
	

</style>
