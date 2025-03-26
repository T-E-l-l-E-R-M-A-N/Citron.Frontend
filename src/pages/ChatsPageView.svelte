<script>
    import MessagesSplitView from '../components/MessagesSplitView.svelte';

    export let isActive;
    export let hubCoonection;
    export let rooms;
</script>

{#if isActive}
    <MessagesSplitView hubConnection={hubCoonection}
                       chatRooms={rooms}></MessagesSplitView>
{/if}

<style></style>