<script>
    let className;
    export { className as class };
</script>

<div class="app-menu-list {className}" >
    <slot>

    </slot>
</div>

<style>
    .app-menu-list {
		margin-top: 55px;
		align-self: top;
		height: fit-content;
		color: #fff;
	}


	.bottom {
		align-self: end;
		margin-bottom: 20px;
	}
</style>