<script>
    import TextField from '../components/TextField.svelte';
    import Button from '../components/Button.svelte';

    export let isActive;
    export let hubCoonection;

    let query;
    let mode = 'people';
    let items;

    function tabClick(str)
    {
        mode = str;
        items = [];
    }

    async function onSearch()
    {
        let result;
        if(mode === 'people')
        {
            result = await hubCoonection.invoke('SearchUsers', query);
            items = result;
            console.log(items);
        }
        else if(mode === 'messages')
        {
            console.log(`hubCoonection.invoke('SearchMessages', ${query})`);
        }
    }

    async function onSearchByEnterPressed(e)
    {
        if (!e) e = window.event;
        var keyCode = e.code || e.key;
        if (keyCode === 'Enter'){
            let result;
            if(mode === 'people')
            {
                result = await hubCoonection.invoke('SearchUsers', query);
                items = result;
                console.log(items)
            }
            else if(mode === 'messages')
            {
                console.log(`hubCoonection.invoke('SearchMessages', ${query})`);
            }
        }

    }
</script>

{#if isActive}
    <div class="search-split-view">
        <div class="search-box">
            <input class="search-box-input"
                    bind:value={query}
                   on:keydown={onSearchByEnterPressed}>
            <button class="search-box-button" aria-label="go" on:click={onSearch}>
                <i style="color: #fff; scale: 1.2" class="fa fa-search fa-1x"></i>
            </button>
        </div>
        <div class="tabs-container">
            <div class="tabs-container-items">
                <button class="tab-item {mode === 'people' ? 'selected' : ''}"
                        aria-label="people"
                        on:click={() => tabClick('people')}>
                    PEOPLE
                </button>
                <button class="tab-item {mode === 'messages' ? 'selected' : ''}"
                        aria-label="messages"
                        on:click={() => tabClick('messages')}>
                    MESSAGES
                </button>
            </div>
        </div>
        <div class="results-list">
            {#each items as item}
                <div class="results-item">
                    {item.name}
                </div>
            {/each}
        </div>
    </div>
{/if}

<style >
    :global(.generic-button) {
        width: 100px;
        margin-top: 5px;
    }

    .search-split-view {
        height: 100%;
        width: 100%;
        display: grid;
        justify-content: center;
        align-content: start;
    }

    .search-box {
        background: #bcbbbb;
        width: 50vw;
        display: grid;
        padding: 5px;
        grid-template-columns: 1fr auto;
    }

    .search-box-input {
        background: transparent;
        padding: 5px;
        outline: none;
        border: none;
        align-content: center;
        overflow: hidden;
    }

    .search-box-input:focus {
        outline: none;
        border: none;
    }

    .search-box-button {
        background: orange;
        padding: 5px;
        width: 40px;
        align-self: start;
        cursor: pointer;
        border: 0;
    }

    ::placeholder {
        color: blue;
    }

    .tabs-container {
        display: grid;
        overflow-x: visible;
        width: 100%;
    }

    .tabs-container-header {
        height: 35px;
        align-content: center;
        text-align: center;
    }

    .tabs-container-items {
        display: flex;
    }

    .tab-item {
        cursor: pointer;
        height: 35px;
        width: 50%;
        background: transparent;
        border: 0;
        color: #000;
    }

    .selected {
        color: orange;
    }

    .results-list {
        background: #fff;
        height: 35px;
        align-content: center;
        padding: 5px;
        color: orange;
    }
</style>