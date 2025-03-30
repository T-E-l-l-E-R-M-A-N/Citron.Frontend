<script>
	import Button from '../components/Button.svelte';
	import TextField from '../components/TextField.svelte';
	import PeopleListItem from '../components/PeopleListItem.svelte';

	export let isActive;
	export let items;
	export let hubConnection;
	export let messageSended;
	export let userId;

	let textMessage;

	let peoplePageMessageFormIsOpen = false;
	let peoplePageMessageFormSendTargetId;
	let peoplePageMessageFormText;

	let peoplePageMessageFormName;

	let selectedUserId = -1;

	async function onTrySendMessage(id) {
		peoplePageMessageFormSendTargetId = id;
		peoplePageMessageFormIsOpen = true;
		getUserName(id);


	}

	async function getUserName(id) {
		const result = await hubConnection.invoke('GetUserByIdAsync', id);
		peoplePageMessageFormName = result.name;
	}

	function closeForm() {
		peoplePageMessageFormSendTargetId = null;
		peoplePageMessageFormText = '';
		peoplePageMessageFormIsOpen = false;
		peoplePageMessageFormName = '';
	}

	async function onSendMesage() {
		console.log(textMessage);
		await hubConnection.invoke('SendPrivateMessageAsync', userId, peoplePageMessageFormSendTargetId, textMessage);
		messageSended('e');
		closeForm();

	}

	function userSelected(id) {
		selectedUserId = id;
	}
</script>

{#if isActive}
	<div class="page">
		<div class="people-list">
			{#each items as item}
				<PeopleListItem hubConnection={hubConnection}
												userId={item.id}
												isSelected={ selectedUserId !== -1 }
												onSelect={userSelected}
												onMessageSendButtonClicked={onTrySendMessage}></PeopleListItem>
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
									 multiline=true
									 visible=true
									 style="height: 120px; margin-right: 0px"
									 bind:value={textMessage}></TextField>
				<Button visible=true
								click={onSendMesage}>SEND
				</Button>
			</div>
		{/if}
	</div>
{/if}

<style>
    .page {
        display: grid;
    }

    .people-list {
        width: 90vw;
        display: inline-flex;
				flex-direction: column;
				flex-wrap: wrap;
        padding: 0 0 0 80px;
				height: 70vh;
				overflow-x: auto;

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
