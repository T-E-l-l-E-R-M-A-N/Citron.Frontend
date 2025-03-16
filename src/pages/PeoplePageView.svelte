<script>
	import Button from "../components/Button.svelte";
	import TextField from "../components/TextField.svelte";

	export let isActive;
	export let items;
    export let hubCoonection;
    export let messageSended;

    let textMessage;

    let peoplePageMessageFormIsOpen = false;
	let peoplePageMessageFormSendTargetId;
	let peoplePageMessageFormText;

    let peoplePageMessageFormName;

    function onTrySendMessage(id)
	{
		peoplePageMessageFormSendTargetId = id;
		peoplePageMessageFormIsOpen = true;
        getUserName(id);
	}

    async function getUserName(id)
    {
        const result = await hubCoonection.invoke('GetUserByIdAsync', id);
        peoplePageMessageFormName = result.name;
    }

    function closeForm()
    {
        peoplePageMessageFormSendTargetId = null;
        peoplePageMessageFormText = '';
		peoplePageMessageFormIsOpen = false;
        peoplePageMessageFormName = '';
    }

    function onSendMesage()
    {
        console.log(textMessage);
        messageSended('e')
        closeForm();
    }
</script>

{#if isActive}
	<div class="page">
        <div class="people-list">
            {#each items as item}
                <div class="people-list-item">
                    <div class="people-list-item-avatar">
                        <i class="fa fa-user fa-3x"></i>
                    </div>
                    <p class="people-list-item-label">{item.name}</p>
                    <button class="people-list-item-button" aria-label="send"
                            on:click={() => onTrySendMessage(item.id)}>
                        <i style="scale: 0.6;" class="fa fa-comment fa-3x"></i>
                    </button>
                </div>
            {/each}
        </div>
        
        {#if peoplePageMessageFormIsOpen}
            <div class="messageSend-form">
                <div class="messageSend-form-header">
                    <div class="people-list-item-avatar">
                        <i class="fa fa-user fa-3x"></i>
                    </div>
                    <p class="people-list-item-label">WRITE NEW MESSAGE</p>
                    <button class="people-list-item-button" aria-label="send"
                            on:click={closeForm}>
                        <i style="scale: 0.4;" class="fa fa-chevron-down fa-3x"></i>
                    </button>
                </div>
                <TextField label={peoplePageMessageFormName}
                           visible=true
                           style="height: 120px; margin-right: 0px"
                           bind:value={textMessage}></TextField>
                <Button visible=true
                        click={onSendMesage}>SEND</Button>
            </div>
        {/if}
    </div>
{/if}

<style>
    .page {
        display: grid;
    }
	.people-list {
		padding: 10px;
		display: grid;
		justify-content: center;
	}
	.people-list-item {
		width: 380px;
		height: 50px;
		background: transparent;
		display: grid;
		grid-template-columns: auto 1fr auto;
		border-bottom: 1px solid gray;
		color: #fff;
	}

	.people-list-item-label {
		margin-left: 10px;
		align-self: center;
	}

	.page-title {
		font-size: 32pt;
		font-family: 'SegoeSymbol';
	}

	.people-list-item-avatar {
		width: 50px;
		height: 50px;
		display: grid;
		align-content: center;
		justify-content: center;
		background: gray;
		align-self: end;
	}

	.people-list-item-button {
		background: transparent;
		border: 0;
		color: #fff;
	}

    .people-list-item-button:hover {
        background: orange;
    }

    .messageSend-form {
        width: 380px;
        justify-self: center;
        display: flex;
        flex-direction: column;
        border: 1px solid gray;
        padding: 20px;
        position: fixed;
        background: #000;
    }

    .messageSend-form-header {
        display: grid;
        grid-template-columns: auto 1fr auto;
    }
</style>
