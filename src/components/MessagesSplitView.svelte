<script>
	import RoomsListItem from './RoomsListItem.svelte';
	import TextField from './TextField.svelte';
	import Button from './Button.svelte';

	export let chatRooms = [];
	export let selectedRoomId = -1;
	export let hubConnection;

	let room;
	let messages = [];
	let text;

	function selectRoom(id) {
		selectedRoomId = id;
		getRoomInfo();
		getMessages();
	}

	async function getRoomInfo() {

	}

	async function getMessages() {
		const result = await hubConnection.invoke('GetMessages', selectedRoomId);
		console.log(result);
		messages = result;
	}

	async function sendMessage() {

	}
</script>

<div class="h-splitview">
	<div class="h-splitview-rooms-list">
		{#each chatRooms as roomItem}
			<RoomsListItem room={roomItem}
										 hubConnection={hubConnection}
										 isSelected={selectedRoomId !== -1}
										 onSelect={selectRoom}></RoomsListItem>
		{/each}
	</div>
	{#if selectedRoomId !== -1}
		<div class="h-splitview-room-view">
			<div class="messages-view">
				{#each messages as message}
					<div class="message-item">
						<text>{message.user.name}</text>
						<text>{message.text}</text>
					</div>
				{/each}
			</div>
			<div class="messages-view-send-message-form">
				<TextField label="MESSAGE"
									 visible=true
									 bind:value={text}></TextField>
				<Button click={sendMessage}>SEND</Button>
			</div>
		</div>
	{/if}
</div>

<style>
		.h-splitview {
				height: 100%;
				display: grid;
				grid-template-columns: auto 1fr;
		}

	.h-splitview-rooms-list {
			background: #00000010;
	}

	.h-splitview-room-view {
			display: grid;
			grid-template-rows: 1fr auto;
	}

	.message-item {
			background: purple;
			margin-left: 24%;
			margin-right: 24%;
			color: #fff;
			display: flex;
			flex-direction: column;
			min-height: 50px;
      padding: 2px 15px;
  }

	.messages-view-send-message-form {
			bottom: 0;
			display: flex;
			flex-direction: column;
	}

</style>