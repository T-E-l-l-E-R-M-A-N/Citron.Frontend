<script>
	import { onMount } from 'svelte';
	import { HubConnectionBuilder } from '@microsoft/signalr';

	import AppMenu from '../components/AppMenu.svelte';
	import MobileBar from '../components/MobileBar.svelte';
	import MyForm from '../components/MyForm.svelte';
	import ToolBar from '../components/ToolBar.svelte';
	import ToolBarItem from '../components/ToolBarItem.svelte';
	import ChatsPageView from '../pages/ChatsPageView.svelte';
	import PeoplePageView from '../pages/PeoplePageView.svelte';
	import SearchPageView from '../pages/SearchPageView.svelte';

	let appMenuIsVisible = true;
	let appMenuIsOpen = 0;
	let appMenuWidth = '70px';
	let isMobile = false;

	let bottomAppMenuHeight = '90px';
	let bottomAppMenuIsOpen = 0;

	let formRegister = true;

	let currentPage = 'Chats';
	let accesskey = null;
	let isAuthorized;

	function toggleMenu() {
		const e = document.getElementsByClassName('cl');
		appMenuIsOpen = !appMenuIsOpen;
		if (appMenuIsOpen) {
			appMenuWidth = '190px';

			for (let index = 0; index < e.length; index++) {
				const element = e[index];
				element.style.display = 'grid';
			}
		} else {
			appMenuWidth = '70px';
			for (let index = 0; index < e.length; index++) {
				const element = e[index];
				element.style.display = 'none';
			}
		}
	}

	function toggleBottomDrawer() {
		bottomAppMenuIsOpen = !bottomAppMenuIsOpen;
		if (bottomAppMenuIsOpen) {
			bottomAppMenuHeight = '30%';
		} else {
			bottomAppMenuHeight = '50px';
		}
	}

	function toggleRegisterForm() {
		formRegister = !formRegister;
		if (formRegister) document.title = 'Register | Citron';
		else document.title = 'Log In | Citron';
	}

	onMount(() => {
		accesskey = window.localStorage.getItem('access_key');
		console.log(accesskey);
		isAuthorized = accesskey != null;

		if (!isMobile) {
			if (window.innerWidth < 480) {
				appMenuIsVisible = false;
			} else {
				appMenuIsVisible = true;
			}
		}
		window.addEventListener(
			'resize',
			function (event) {
				if (!isMobile) {
					if (window.innerWidth < 480) {
						appMenuIsVisible = false;
					} else {
						appMenuIsVisible = true;
					}
				}

				console.log('the component has mounted');
				console.log(window.innerWidth);
			},
			true
		);

	

		const userAgent = window.navigator.userAgent;

		if (userAgent.includes('Android') || userAgent.includes('iPhone OS')) {
			console.log('mobile');
			isMobile = true;
		} else {
			console.log(userAgent);
			isMobile = false;
		}
	});

	function appMenuItemSelected(string) {
		console.log(string);
		currentPage = string;
	}
	//toggleMenu();

	const hubConnection = new HubConnectionBuilder()
		.withUrl('http://localhost:5000/index').build();

	hubConnection
		.start()
		.then(function () {
			console.log('connected');
		})
		.catch(function (err) {
			return console.error(err.toString());
		});

	async function onAuthorize(array)
	{
		console.log(array);
		if(array[0] != undefined) {
			const a = await hubConnection.invoke("RegisterAsync", array[0], array[1], array[2]);
			console.log(a);
			window.localStorage.setItem('access_key', a);
		}
		else {
			const a = await hubConnection.invoke("LoginAsync", array[1], array[2]);
			console.log(a);
			window.localStorage.setItem('access_key', a);
		}
		
		accesskey = window.localStorage.getItem('access_key');
		console.log(accesskey);
		isAuthorized = accesskey != null;
	}
</script>

<div class="window" on:reset={resized}>
	<AppMenu
		{appMenuWidth}
		visible={!isMobile & isAuthorized}
		{appMenuItemSelected}
		appMenuActiveItem={currentPage}
	></AppMenu>
	<div class="window-content">
		<ToolBar paddingLeftIsVisible={!isMobile && !isAuthorized}>
			<ToolBarItem label="" click={toggleMenu} visible={isAuthorized && !isMobile}>
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
			<ToolBarItem
				click={toggleRegisterForm}
				label={formRegister ? 'Log in' : 'Create account'}
				visible={!isAuthorized}
			>
				<svg
					version="1.1"
					id="Layer_1"
					class="icon"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					x="0px"
					y="0px"
					viewBox="0 0 512 512"
					style="enable-background:new 0 0 512 512; width: 22px"
					xml:space="preserve"
					><g
						><g
							><circle
								cx="212.293"
								cy="106.146"
								r="106.146"
								fill="#000000"
								style="fill: rgb(255, 255, 255);"
							></circle></g
						></g
					><g
						><g
							><path
								d="M399.61,337.171c-48.277,0-87.415,39.137-87.415,87.415c0,48.278,39.138,87.415,87.415,87.415 c48.275,0,87.415-39.137,87.415-87.415C487.024,376.307,447.885,337.171,399.61,337.171z M449.561,443.317h-31.219v31.219h-37.463 v-31.219h-31.22v-37.463h31.22v-31.219h37.463v31.219h31.219V443.317z"
								fill="#000000"
								style="fill: rgb(255, 255, 255);"
							></path></g
						></g
					><g
						><g
							><path
								d="M372.595,302.659c-32.832-54.167-92.336-90.367-160.302-90.367c-103.451,0-187.317,83.866-187.317,187.317 c0,27.587,22.366,49.951,49.951,49.951h202.316c-1.646-8.072-2.511-16.424-2.511-24.976 C274.732,365.001,316.681,315.039,372.595,302.659z"
								fill="#000000"
								style="fill: rgb(255, 255, 255);"
							></path></g
						></g
					></svg
				>
			</ToolBarItem>
			<div class="page-title">
				<style>
					.page-title .toolbar-item {
						pointer-events: none;
						margin-left: -30px;
					}
				</style>
				<ToolBarItem label={currentPage.toUpperCase()} visible={isAuthorized}></ToolBarItem>
			</div>
			<ToolBarItem label="SEARCH" visible={isAuthorized}>
				<input />
			</ToolBarItem>
		</ToolBar>
		<div class="window-content-main">
			{#if !isAuthorized}
				<MyForm id="form" bind:isRegister={formRegister} 
				formTitle="FORM" 
				visible={!isAuthorized}
				onSubmit={onAuthorize}
				></MyForm>
			{:else}
				<ChatsPageView isActive={currentPage === 'Chats'}></ChatsPageView>
				<PeoplePageView isActive={currentPage === 'People'}></PeoplePageView>
				<SearchPageView isActive={currentPage === 'Search'}></SearchPageView>
			{/if}
		</div>

		<MobileBar
			height={bottomAppMenuHeight}
			visible={isMobile && isAuthorized}
			expandingControl={toggleBottomDrawer}
			appMenuActiveItem={currentPage}
			{appMenuItemSelected}
		></MobileBar>
	</div>
</div>

<style>
	* {
		margin: 0;
		padding: 0;
	}

	.window {
		height: 100%;
		margin: 0;
		background: #515151;
		color: #fff;
		display: grid;
		font-family: 'SegoeWP';
		grid-template-columns: auto 1fr;
		overflow: hidden;
		font-size: 10pt;
	}

	.window-content {
		display: grid;
		grid-template-rows: auto 1fr;
	}

	.window-content-main {
		display: grid;
		min-width: 310px;
		margin-top: 58px;
		overflow-y: auto;
	}

	@font-face {
		font-family: 'SegoeWP'; /*a name to be used later*/
		src: url('/segoe-wp.ttf'); /*URL to font*/
	}

	@font-face {
		font-family: 'SegoeSymbol'; /*a name to be used later*/
		src: url('/segoe-ui-symbol.ttf'); /*URL to font*/
	}
</style>
