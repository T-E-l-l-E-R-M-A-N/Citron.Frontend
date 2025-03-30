<script>
    import MessagesSplitView from '../components/MessagesSplitView.svelte';

    export let isActive;
    export let hubCoonection;
    export let rooms;
    export let roomId;
</script>

{#if isActive}
    <MessagesSplitView hubConnection={hubCoonection}
                       chatRooms={rooms}
                       selectedRoomId={roomId}></MessagesSplitView>
{/if}

<style></style>