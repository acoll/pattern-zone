<template>
	<div class="ui secondary pointing menu">
		<template v-for="item in menuItems">
			<a class="item active" href="$key"> {{item}} </a>
		</template>
		<div class="right menu">
			<a class="ui item"> Logout </a>
		</div>
	</div>
</template>

<script lang="babel">
export default {
    data: function () {
        return {
        	menuItems: {
        		'#/patterns': 'Home',
        		'sdfsdf': 'sdfsdf'
        	}
        }
    }
}
</script>