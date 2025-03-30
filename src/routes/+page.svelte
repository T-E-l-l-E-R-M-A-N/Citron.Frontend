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
	import * as timers from 'node:timers';

	let appMenuIsVisible = true;
	let appMenuIsOpen = false;
	let appMenuWidth = '70px';
	let isMobile = false;

	let bottomAppMenuHeight = '90px';
	let bottomAppMenuIsOpen = false;

	let formRegister = true;

	let currentPage = 'Chats';
	let accesskey = null;
	let isAuthorized;

	let error = '';

	let hubConnection;

	let peopleList = [];
	let chatRooms;

	let userId = -1;

	let notificationIsShow =0;
	let notificationTitle = 'notification title';
	let notificationContent = 'notification text';


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

	onMount(async () => {
		hubConnection = new HubConnectionBuilder()
			.withUrl('https://localhost:5001/index')
			.build();

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
			function(event) {
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

		hubConnection.on('OnMessageReceived', newMessageReceived);

		hubConnection.start().then(async () => {
			if (isAuthorized)
				await onAuthorized();
		});

		if (isAuthorized)
			await onAuthorized();
	});

	async function appMenuItemSelected(string) {
		console.log(string);
		currentPage = string;


		if (currentPage === 'People') {
			const result = await hubConnection.invoke('GetUsersAsync');

			peopleList = result;
		} else if (currentPage === 'Chats') {
			console.log(userId);
			const result2 = await hubConnection.invoke('GetRoomsAsync', userId);
			console.log(result2);
			chatRooms = result2;
		}


	}

	//toggleMenu();

	async function onAuthFormSubmit(array) {
		console.log(array);
		const cred = {
			name: formRegister ? array[0] : '',
			login: array[1],
			password: array[2]
		};
		console.log(cred);
		if (cred.name === '') {
			const result = await hubConnection.invoke('LoginAsync', cred.login, cred.password);
			console.log(result);
			if (result == 'Invalid credentials') return;
			window.localStorage.setItem('access_key', result);
		} else {
			const result = await hubConnection.invoke(
				'RegisterAsync',
				cred.name,
				cred.login,
				cred.password
			);
			console.log(result);
			if (result == 'Invalid credentials') return;
			window.localStorage.setItem('access_key', result);
		}

		accesskey = window.localStorage.getItem('access_key');
		console.log(accesskey);
		isAuthorized = accesskey != null;
		if (isAuthorized)
			await onAuthorized();
	}

	async function onAuthorized() {
		let d = await hubConnection.invoke('ConnectAsync', hubConnection.connectionId, accesskey);
		userId = d;
		if (userId === -1)
			isAuthorized = false;
		else
		{
			await appMenuItemSelected('Chats');
		}
	}

	let selectedRoomId;
	let notificationTimer = '';

	async function newMessageReceived(msg) {
		console.log(msg);
		let user = await hubConnection.invoke('GetUserByIdAsync', msg.userId);
		console.log(user);
		if(msg.userId !== userId)
		{
			notificationTitle = 'Message from: ' + user.screenName;
			notificationContent = msg.text;
			notificationIsShow = true;
			let second = 9;
			const timer = setTimeout(() => {
				notificationIsShow = false
				clearTimeout(timer);
				clearInterval(notification);
			}, 10000);
			const notification = setInterval(() => notificationTimer = `Close within: ${second--}`, 1000);

		}
	}
</script>

<div class="window">

	<div class="window-content">
		<ToolBar paddingLeftIsVisible={!isMobile && !isAuthorized}>
			<ToolBarItem label="" click={toggleMenu} visible={isAuthorized && !isMobile}>
				<p style="font-family: SegoeSymbol; font-size: 28px;"></p>
			</ToolBarItem>
			<AppMenu
				visible={!isMobile & isAuthorized}
				{appMenuItemSelected}
				appMenuActiveItem={currentPage}

			></AppMenu>
		</ToolBar>
		{#if !isAuthorized}
			<MyForm
				id="form"
				bind:isRegister={formRegister}
				visible=true
				formTitle="FORM"
				onSubmit={onAuthFormSubmit}
			></MyForm>
		{:else}
			<div style="height: 120px"></div>
			<ChatsPageView isActive={currentPage === 'Chats'}
										 hubConnection={hubConnection}
										 rooms={chatRooms}
										 roomId={selectedRoomId}
			userId={userId}></ChatsPageView>
			<PeoplePageView isActive={currentPage === 'People'}
											items={peopleList}
											hubConnection={hubConnection}
											messageSended={newMessageReceived}
											userId={userId}></PeoplePageView>
			<SearchPageView isActive={currentPage === 'Search'}
											hubConnection={hubConnection}></SearchPageView>
		{/if}
		{#if error !== ''}
			<label style="color: #FFF; background: red; min-height: 90px; align-self: start"
			>{error}</label
			>
		{/if}

		<MobileBar
			height={bottomAppMenuHeight}
			visible={isMobile && isAuthorized}
			expandingControl={toggleBottomDrawer}
			appMenuActiveItem={currentPage}
			{appMenuItemSelected}
		></MobileBar>
		{#if notificationIsShow}
			<div class="notification-view">
				<button class="notification-view-button" on:click={() => notificationIsShow = false}>
					<i class="fa fa-close fa-1x" style="color: #fff"></i>
				</button>
				<text class="notification-view-title">{notificationTitle}</text>
				<text class="notification-view-text">{notificationContent}</text>
				<text class="notification-view-timer">{notificationTimer}</text>
			</div>
		{/if}
	</div>
</div>

<style>
    * {
        margin: 0;
        padding: 0;
    }

    .notification-view {
        display: flex;
        flex-direction: column;
        position: fixed;
        right: 20px;
        bottom: 10px;
        height: 120px;
        width: 320px;
				color: #fff;
				font-family: 'SegoeWP';
        background: #493314;
    }

    .notification-view-button {
        background: transparent;
        border: 0;
        width: 32px;
        height: 32px;
        position: fixed;
        right: 20px;
    }

    .notification-view-button:hover {
        background: orange;
    }

		.notification-view-title {
				margin-top: 20px;
				font-size: 14pt;
				margin-left: 20px;
				margin-right: 20px;

		}

		.notification-view-text {
				margin-left: 20px;
				margin-right: 20px;
		}

		.notification-view-timer {
				position: fixed;
				right: 32px;
				bottom: 20px;

		}

    .window {
        height: 100%;
        margin: 0;
        background: #fff;
        color: #000;
        display: grid;
        font-family: 'SegoeWP', serif;
        overflow: hidden;
        font-size: 10pt;
    }

    .window-content {
        display: grid;
        grid-template-rows: auto 1fr;
        height: 100%;
    }

    @font-face {
        font-family: 'SegoeWP'; /*a name to be used later*/
        src: url('/segoe-wp-light.ttf'); /*URL to font*/
    }

    @font-face {
        font-family: 'SegoeSymbol'; /*a name to be used later*/
        src: url('/seguisym.ttf'); /*URL to font*/
    }
</style>
