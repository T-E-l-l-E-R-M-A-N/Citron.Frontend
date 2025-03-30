<script>
    import MessagesSplitView from '../components/MessagesSplitView.svelte';
    import { onMount } from 'svelte';

    export let isActive;
    export let hubConnection;
    export let rooms;
    export let roomId;
    export let userId;

    $: roomId;
    $: rooms;


</script>

{#if isActive}
    <MessagesSplitView hubConnection={hubConnection}
                       chatRooms={rooms}
                       selectedRoomId={roomId}
    userId={userId}></MessagesSplitView>
{/if}

<style></style>