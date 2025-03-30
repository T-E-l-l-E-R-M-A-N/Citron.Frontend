<script>
	import RoomsListItem from './RoomsListItem.svelte';
	import TextField from './TextField.svelte';
	import Button from './Button.svelte';
	import { onMount } from 'svelte';

	export let chatRooms;
	export let selectedRoomId;
	export let hubConnection;

	let room;
	let messages;
	let text;
	export let userId;
	let targetUserId;

	$: selectRoom(selectedRoomId);

	async function selectRoom(id) {
		selectedRoomId = id;
		await getRoomInfo()
		hubConnection.on('OnMessageReceived',
			async (e) => {
				if(e.room.id === selectedRoomId)
				{
					const result = await hubConnection.invoke('GetRoomAsync', selectedRoomId);
					room = result;
					messages = room.messages;
				}
			});

	}

	async function getRoomInfo() {
		const result = await hubConnection.invoke('GetRoomAsync', selectedRoomId);
		room = result;
		messages = room.messages;
		console.log(room);
		if(room.users.length === 2) {
			room.users.map((e)=>{
				if(e.id !== userId)
				{
					targetUserId = e.id;
					console.log('Target id: ', targetUserId);
				}
			});
		}
	}


	async function getMessages() {
		const result = await hubConnection.invoke('GetMessages', selectedRoomId);
		console.log(result);
		messages = result;
	}

	async function sendMessage() {
		await hubConnection.invoke('SendPrivateMessageAsync', userId, targetUserId, text);
	}
</script>

<div class="h-splitview">
	<div class="h-splitview-rooms-list">
		{#each chatRooms as roomItem}
			<RoomsListItem room={roomItem}
										 hubConnection={hubConnection}
										 isSelected={selectedRoomId === roomItem.room.id}
										 onSelect={() => selectRoom(roomItem.room.id)}></RoomsListItem>
		{/each}
	</div>
	{#if selectedRoomId !== 0}
		<div class="h-splitview-room-view">
			<div class="messages-view" >
				<div style="transform: scaleY(-1);" >
					{#each messages as message}

						{#if message.user.id !== userId}
							<div class="message-item" style="justify-self: start">
								<text style="color: purple; text-align: start; margin-left: 10px">{message.user.screenName}</text>
								<div style="background: purple; padding: 8px; display: flex; flex-direction: column">

									<text>{message.text}</text>
									<text style="text-align: end">{message.time}</text>
								</div>
							</div>
						{:else }
							<div class="message-item" style="justify-self: end">
								<text style="color: purple; text-align: end; margin-right: 10px">{message.user.screenName}</text>
								<div style="background: purple; padding: 8px; display: flex; flex-direction: column">

									<text>{message.text}</text>
									<text style="text-align: end">{message.time}</text>
								</div>
							</div>
						{/if}
					{/each}
				</div>
			</div>
			{#if room !== undefined}
				<div class="messages-view-send-message-form">
					<TextField label="MESSAGE"
										 visible=true
										 bind:value={text}></TextField>
					<Button click={sendMessage}>SEND</Button>
				</div>
			{/if}
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
			width: 300px;
	}

	.h-splitview-room-view {

	}

	.message-item {
			margin-top: 10px;
			justify-self: center;
			min-width: 210px;

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

	.messages-view {
			display: grid;
			height: 70vh;
			overflow-y: auto;
			transform: scaleY(-1);
	}

</style>