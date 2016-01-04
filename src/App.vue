<template >
<div class="ui">
	<div>
		<main-menu />
		</main-menu>
	</div>
	<div class="ui segment">
		<router-view class="view" keep-alive transition transition-mode="out-in" />
	</div>    
</div>
</template>

<style>
	table {
		border-collapse:collapse;
		border:1px solid black;
	}

	table td {
		border:1px solid black;
		
		height: 10px;
		width: 10px;
		padding: 0px;

		empty-cells: show;
	}

	table td div
	{
		height: 10px;
		width: 10px;
		overflow: hidden;
	}

	table td.on {
		background-color: blue;
	}
</style>

<script lang="babel">
import Menu from './components/Menu'

export default {
    data: function () {
        return {};
    },
    components: {
		'main-menu': Menu
	}
}
</script>