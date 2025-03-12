<script>
	import AppMenu from '../components/AppMenu.svelte';
	import MobileBar from '../components/MobileBar.svelte';
	import MyForm from '../components/MyForm.svelte';
	import ToolBar from '../components/ToolBar.svelte';
	import ToolBarItem from '../components/ToolBarItem.svelte';
	import { onMount } from 'svelte';

	let appMenuIsVisible = true;
	let appMenuIsOpen = 0;
	let appMenuWidth = '70px';
	let isMobile = false;

	let usesElectron = isElectron();

	let bottomAppMenuHeight = '90px';
	let bottomAppMenuIsOpen = 0;

	let formRegister;

	let isAuthorized = 1;

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
			bottomAppMenuHeight = '40%';
		} else {
			bottomAppMenuHeight = '90px';
		}
	}

	function toggleRegisterForm() {
		formRegister = !formRegister;
		if (formRegister) document.title = 'Register | Citron';
		else document.title = 'Log In | Citron';
	}

	function isElectron() {
		// Renderer process
		if (
			typeof window !== 'undefined' &&
			typeof window.process === 'object' &&
			window.process.type === 'renderer'
		) {
			return true;
		}
		// Main process
		if (
			typeof process !== 'undefined' &&
			typeof process.versions === 'object' &&
			!!process.versions.electron
		) {
			return true;
		}
		// Detect the user agent when the `nodeIntegration` option is set to true
		if (
			typeof navigator === 'object' &&
			typeof navigator.userAgent === 'string' &&
			navigator.userAgent.indexOf('Electron') >= 0
		) {
			return true;
		}
		return false;
	}

	onMount(() => {
		if (window.innerWidth < 480) {
			appMenuIsVisible = false;
			isMobile = true;
		}
		else {
			appMenuIsVisible = true;
			isMobile = false;
		}

		window.addEventListener(
			'resize',
			function (event) {
				if (window.innerWidth < 480) {
					appMenuIsVisible = false;
					isMobile = true;
				}
				else {
					appMenuIsVisible = true;
					isMobile = false;
				}

				console.log('the component has mounted');
				console.log(window.innerWidth);
			},
			true
		);

		/*
		const userAgent = window.navigator.userAgent;

		if(userAgent.includes('Android') || userAgent.includes('iPhone OS')) {
			console.log('mobile');
			isMobile = true;
		}
		
		else 
		{
			console.log(userAgent);
			isMobile = false;
		}
		*/
	});
	//toggleMenu();
</script>

<div class="window" on:reset={resized}>
	<AppMenu {appMenuWidth} visible={!isMobile}></AppMenu>
	<div class="window-content">
		<ToolBar visible={!appMenuIsVisible}>
			<ToolBarItem label="" click={toggleMenu} visible={appMenuIsVisible}>
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
		</ToolBar>
		<div class="window-content-main">
			{#if !isAuthorized}
				<MyForm id="form" bind:isRegister={formRegister} formTitle="FORM"></MyForm>
			{:else}
				<div></div>
			{/if}
		</div>

		<MobileBar height={bottomAppMenuHeight} visible={isMobile && isAuthorized}
					   expandingControl={toggleBottomDrawer}>
				
		</MobileBar>
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
		background: #fff;
		display: grid;
		grid-template-columns: auto 1fr;
	}

	.window-content {
		display: grid;
		grid-template-rows: auto 1fr;
	}

	.window-content-main {
		display: grid;
		min-width: 310px;
		margin-top: 170px;
		overflow-y: hidden;
	}

	:global(.mobile-bar > .toolbar-item) {
		width: 40px;
		height: 40px;
	}
</style>
