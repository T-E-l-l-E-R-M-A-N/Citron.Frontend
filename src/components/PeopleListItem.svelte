<script>
	import { onMount } from 'svelte';

	export let hubConnection;
	export let userId;
	export let isSelected;
	export let onSelect;
	export let onMessageSendButtonClicked;
	let userName;

	async function getUserNameById(user) {
		return await hubConnection.invoke('GetUserByIdAsync', user);
	}

	onMount(async () => {
		const user = await getUserNameById(userId);
		userName = user.screenName;
	});
</script>

<div class="people-list-item" on:click={() => onSelect(userId)}>
	<div class="people-list-item-avatar">
		<i class="fa fa-user fa-3x"></i>
	</div>
	<div class="people-list-item-info">
		<p class="people-list-item-label">{userName}</p>
		<button class="people-list-item-button" aria-label="send"
						on:click={() => onMessageSendButtonClicked(userId)}>
			<i style="scale: 0.5;" class="fa fa-comment fa-3x"></i>
		</button>
	</div>
</div>

<style>
    .people-list-item {
				margin: 5px;
        background: gray;
        width: 380px;
        height: 170px;
        display: grid;
        grid-template-rows: 1fr auto;
        border-bottom: 1px solid gray;
        color: #FFF;
				flex-shrink: 0;
    }

		.people-list-item-info {
				background: #00000020;
				width: 380px;
				height: 48px;
				display: grid;
				grid-template-columns: 1fr auto;
		}

    .people-list-item-label {
        margin-left: 20px;
        align-self: center;
    }

    .people-list-item-avatar {
				height: 100%;
				width: 100%;
        display: grid;
        align-content: center;
        justify-content: center;
        background: gray;
        align-self: end;
    }

    .people-list-item-button {
        background: transparent;
        border: 0;
        color: #FFF;
    }

    .people-list-item-button:hover {
        background: orange;
    }
</style>