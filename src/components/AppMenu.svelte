<script>
	import AppMenuList from "./AppMenuList.svelte";
	import AppMenuListItem from "./AppMenuListItem.svelte";
    export let appMenuItemSelected;
    export let appMenuWidth;
    export let visible;
    export let appMenuActiveItem;

    
</script>

{#if visible}
<div class="app-menu" style:width={appMenuWidth}>
    <AppMenuList >
        <AppMenuListItem isSelected={appMenuActiveItem === 'Chats'} elementWidth={appMenuWidth} label="Chats" listItemSelected={() => appMenuItemSelected("Chats")}>
            <div  class="app-menu-icon">
                <i class="fa fa-comments fa-2x"></i>
            </div> 
        </AppMenuListItem>
        <AppMenuListItem isSelected={appMenuActiveItem === 'People'}  elementWidth={appMenuWidth} label="People" listItemSelected={() => appMenuItemSelected("People")}>
            <div class="app-menu-icon ">
                <i class="fa fa-group fa-2x"></i> 
            </div>
        </AppMenuListItem>
        <AppMenuListItem isSelected={appMenuActiveItem === 'Search'} elementWidth={appMenuWidth} label="Search" listItemSelected={() => appMenuItemSelected("Search")}>
            <div class="app-menu-icon ">
                <i class="fa fa-search fa-2x"></i> 
            </div>
        </AppMenuListItem>
    </AppMenuList>
    <AppMenuList class="bottom">
        <AppMenuListItem label="Account"  listItemSelected={() => appMenuItemSelected("Account")}>
            <div class="app-menu-icon" >
                <i class="fa fa-user-circle-o fa-2x"></i> 
            </div>
        </AppMenuListItem>
        <AppMenuListItem label="Settings"  listItemSelected={() => appMenuItemSelected("Settings")}>
            <div class="app-menu-icon">
                <i class="fa fa-gear fa-2x"></i> 
            </div>
        </AppMenuListItem>
    </AppMenuList>
</div>
{:else}
<div></div>
{/if}




<style>

	.app-menu {
		width: 190px;
		height: 100vh;
		background: black;
		display: grid;
		overflow: hidden;
        overflow-y: hidden;
	}
	.app-menu-icon {
		width: 20px;
		margin-left: 8px;
        align-self: center;
        scale: 0.7;
	}

	
</style>