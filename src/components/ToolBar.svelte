<script>
	import { onMount } from 'svelte';

	export let paddingLeftIsVisible;
	let isMacElectron;
	onMount(() => {
		let g = getOS();
		console.log(g);

		if (g.includes('Electron') && g.includes('Macintosh')) {
			isMacElectron = true;

			var el = document.getElementsByClassName('draggable')[0];
			el.style.appRegion = 'drag';
		}


	});

	function getOS() {
		return window.navigator.userAgent;
	}
</script>

<div class="toolbar">
	<div class="toolbar-items">
		{#if isMacElectron && paddingLeftIsVisible}
			<div class="macos-traffic-light-placeholder">BUTTONS</div>
		{/if}
		<slot></slot>
	</div>
	<div class="draggable"></div>
</div>

<style>
    .draggable {
        background: transparent;

    }

    .toolbar {
        height: 120px;
        display: grid;
        grid-template-columns: auto 1fr;
        backdrop-filter: blur(8px);
        position: fixed;
        width: 100%;
				padding-left: 20px;
        z-index: 1;
    }

    .toolbar-items {
        display: flex;
        align-items: end;
    }

    .macos-traffic-light-placeholder {
        background: transparent;
        opacity: 0;
        min-width: 70px;
    }
</style>
