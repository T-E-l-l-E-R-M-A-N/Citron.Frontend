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
		console.log(room.room.id)

		const result = await hubConnection.invoke('GetMessages', room.room.id);
		messages = result;
		let lm = room.lastMessage;
		lastMessageText = lm.text;
		lastMessageUserName = lm.user.screenName;
		lastMessageDate = lm.time;
	})
</script>

<div class="rooms-list-item {isSelected ? 'selected' : ''}" on:click={() => onSelect(room.room.id)}>

	<text class="rooms-list-item-label">{room.room.name}</text>
</div>

<style>
    .rooms-list-item {
        width: 100%;
        background: transparent;
        display: flex;
        flex-direction: column;
				height: 30px;
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

		.selected .rooms-list-item-info-label-1 {
				color: #4c422e;
		}

    .rooms-list-item:hover .rooms-list-item-info-label-1 {
        color: #fff;
    }

		.rooms-list-item-info .rooms-list-item-info-label-2 {
				text-align: left;
				margin-left: 10px;
		}


</style>