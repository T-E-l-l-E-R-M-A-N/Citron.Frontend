<script>
	import AppMenuList from "./AppMenuList.svelte";
	import AppMenuListItem from "./AppMenuListItem.svelte";
    export let appMenuItemSelected;
    export let visible;
    export let appMenuActiveItem;

    
</script>

{#if visible}
<div class="app-menu" >
    <AppMenuListItem isSelected={appMenuActiveItem === 'Chats'} label="Chats" listItemSelected={() => appMenuItemSelected("Chats")}>

    </AppMenuListItem>
    <AppMenuListItem isSelected={appMenuActiveItem === 'People'}  label="People" listItemSelected={() => appMenuItemSelected("People")}>

    </AppMenuListItem>
    <AppMenuListItem isSelected={appMenuActiveItem === 'Search'}  label="Search" listItemSelected={() => appMenuItemSelected("Search")}>

    </AppMenuListItem>
</div>
{:else}
<div></div>
{/if}




<style>

	.app-menu {
      margin-left: 20px;
		  display: flex;
      overflow: hidden;
      align-items: end;
	}
	
</style>