<script>
    export let isActive;
    export let items;
</script>

{#if isActive}
    <h4 class="page-title">people</h4>
    <div class="people-list">
        {#each items as item }
            
        {/each}

        <div class="people-list-item">
           <div class="people-list-item-avatar">
            <i class="fa fa-user fa-3x"></i> 
            
           </div>
            <p class="people-list-item-label">user1</p>
            <button class="people-list-item-button"></button>
        </div>
    </div>
{/if}

<style>
    .people-list {
        padding: 10px;
        display: grid;
        justify-content: center;
    }
    .people-list-item {
        padding-bottom: 10px;
        width: 350px;
        margin-left: -10PX;
        height: 50px;
        background: blue;
        display: grid;
        grid-template-columns: auto 1fr auto;
        border-bottom: 1px solid gray;
    }

    .people-list-item-label {
        margin-left: 10px;
        align-self: center;
    }
    
    .page-title {
        font-size: 32pt;
        font-family: 'SegoeSymbol';
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
</style>