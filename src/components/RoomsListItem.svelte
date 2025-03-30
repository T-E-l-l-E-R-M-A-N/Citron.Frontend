<script>
	import { onMount } from 'svelte';

	export let room;
	export let isSelected;
	export let onSelect;

	export let hubConnection;

	export let messages;
	export let lastMessageText;
	export let lastMessageDate;
	export let lastMessageUserName;

	onMount(async () => {
		console.log(room.id)

		const result = await hubConnection.invoke('GetMessages', room.id);
		messages = result;
		let lm =  messages.at(-1);
		let user = await hubConnection.invoke('GetUserByIdAsync', lm.userId);
		lastMessageText = lm.text;

		lastMessageUserName = user.name;
	})
</script>

<div class="rooms-list-item {isSelected ? 'selected' : ''}" on:click={() => onSelect(room.id)}>

	<text class="rooms-list-item-label">{room.name}</text>
	<div class="rooms-list-item-info">
		<text class="rooms-list-item-info-label-1">{lastMessageUserName}</text>
		<text class="rooms-list-item-info-label-2">{lastMessageText}</text>
		<text class="rooms-list-item-info-label-3">{lastMessageDate}</text>
	</div>
</div>

<style>
    .rooms-list-item {
        width: 380px;
        background: transparent;
        display: flex;
        flex-direction: column;
    }

    .selected {
        background: orange;
        color: #fff;
    }

    .rooms-list-item:hover {
        background: orange;
				color: #fff;
    }

    .rooms-list-item text {
				margin-left: 90px;
				margin-right: 10px;
				margin-top: 2px;
		}

		.rooms-list-item-info {
				display: grid;
				grid-template-columns: auto 1fr auto;
				margin-left: 90px;
				margin-bottom: 5px;
		}

    .rooms-list-item-info text {
				margin: 0;
		}

		.rooms-list-item-info .rooms-list-item-info-label-1 {
				color: orange;
		}

    .rooms-list-item:hover .rooms-list-item-info-label-1 {
        color: #fff;
    }

		.rooms-list-item-info .rooms-list-item-info-label-2 {
				text-align: left;
				margin-left: 10px;
		}
</style>