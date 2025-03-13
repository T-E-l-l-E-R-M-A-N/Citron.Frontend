<script>
	import ToolBarItem from './ToolBarItem.svelte';
	import AppMenuListItem from '../components/AppMenuListItem.svelte';


	export let visible;
	export let height = '90px';
	export let expandingControl;

	export let appMenuItemSelected;
	export let appMenuActiveItem;
</script>

{#if visible}
	<div class="mobile-bar" style:height>
		<div class="navigation-bar">
			<ToolBarItem click={expandingControl} label="" visible={true}>
				<svg
					class="icon"
					version="1.1"
					id="Capa_1"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					x="0px"
					y="0px"
					viewBox="0 0 384 384"
					style="enable-background:new 0 0 384 384;"
					xml:space="preserve"
					><g
						><g
							><g
								><rect x="0" y="277.333" width="384" height="42.667" /><rect
									x="0"
									y="170.667"
									width="384"
									height="42.667"
								/><rect x="0" y="64" width="384" height="42.667" /></g
							></g
						></g
					></svg
				>
			</ToolBarItem>
			<AppMenuListItem
				isSelected={appMenuActiveItem === 'Chats'}
				label="Chats"
				listItemSelected={() => appMenuItemSelected('Chats')}
			>
				<div class="app-menu-icon">
					<i class="fa fa-comments fa-2x"></i>
				</div>
			</AppMenuListItem>
			<AppMenuListItem
				isSelected={appMenuActiveItem === 'People'}
				label="People"
				listItemSelected={() => appMenuItemSelected('People')}
			>
				<div class="app-menu-icon">
					<i class="fa fa-group fa-2x"></i>
				</div>
			</AppMenuListItem>
			<AppMenuListItem
				isSelected={appMenuActiveItem === 'Search'}
				label="Search"
				listItemSelected={() => appMenuItemSelected('Search')}
			>
				<div class="app-menu-icon">
					<i class="fa fa-search fa-2x"></i>
				</div>
			</AppMenuListItem>
		</div>
		{#if height != '90px'}
			<div style="margin-top: 20px">
				<slot></slot>
			</div>
		{/if}
	</div>
{/if}

<style>
	.mobile-bar {
		position: fixed;
		bottom: 0;
		padding: 10px;
		width: 100%;
		background: #000000;
		backdrop-filter: blur(20px);
		color: #fff;
	}

	.navigation-bar {
		display: flex;
	}

	:global(.mobile-bar > .toolbar-item) {
		width: 40px;
		height: 40px;
	}

	:global(.mobile-bar .app-menu-icon) {
		margin-left: -9px;
		margin-top: 8px;
	}

	:global(.mobile-bar .aoo-menu-list-item) {
		flex-direction: column;
		width: 90px;
		margin-left: 20px;
	}

	:global(.mobile-bar .aoo-menu-list-item-content) {
		margin-left: 32px;
		margin-top: 2px;
	}

	:global(.mobile-bar .aoo-menu-list-item-label) {
		display: none;
	}
</style>
