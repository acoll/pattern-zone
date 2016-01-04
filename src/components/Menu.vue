<template>
	<div class="ui secondary pointing menu">
		<template v-for="item in menuItems">
			<a class="item {{$key == $route.path ? 'active' : ''}}" href="#{{$key}}"> {{item}} </a>
		</template>
		<template v-if="auth">
			<div class="right menu">
				<a class="ui item" v-on:click="doLogout"> Logout </a>
			</div>
		</template>
		<template v-else>
			<div class="right menu">
				<a class="ui item" v-on:click="doLogin"> Login </a>
			</div>
		</template>
	</div>
</template>

<script lang="babel">

var Store = require('../store')

var ref = Store.ref

export default {
    data: function () {

        var data = {
        	menuItems: {
        		'/patterns': 'Home',
        		'/create': 'Create'
        	},
        	auth: null
        }

        ref.onAuth(auth => data.auth = auth)

        return data
    },
    methods: {
    	doLogin: function () {
    		Store.login((err, data) => {
    			if (err) {
    				console.log('Error:', err)
    			} else {
    				this.auth = data
    			}
    		})
    	},
    	doLogout: function () {
    		ref.unauth();
    	}
    }
}
</script>