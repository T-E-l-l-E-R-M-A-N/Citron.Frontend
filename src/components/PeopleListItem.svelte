<script>
	import { onMount } from "svelte";

    export let hubConnection;
    export let userId;
    export let isSelected;
    export let onSelect;
    let userName

    async function getUserNameById(user)
    {
        return await hubConnection.invoke('GetUserByIdAsync', user);
    }
    
    onMount(async ()=>{
        userName = await getUserNameById(userId);
    })
</script>

<div class="people-list-item" on:click={() => onSelect(userId)}>
    <div class="people-list-item-avatar">
        <i class="fa fa-user fa-3x"></i>
    </div>
    <p class="people-list-item-label">{userName}</p>
    <button class="people-list-item-button" aria-label="send"
            on:click={() => onTrySendMessage(userId)}>
        <i style="scale: 0.6;" class="fa fa-comment fa-3x"></i>
    </button>
</div>

<style>
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
</style>