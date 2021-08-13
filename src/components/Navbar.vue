<template>
    <div id="navbar" class="w3-center w3-teal w3-card-4 w3-top">
		<!--Tombol navigasi bar-->
		<span class="">
			<button
			v-for="nav in navs"
			:key="nav.title"
			@click="gotoNav(nav.component)"
			:class="['w3-bar-item', 'w3-button', 'w3-hover-light-grey', 'w3-padding', currentNav == nav.component ? 'w3-white' : 'w3-teal']"
			>
        	{{ nav.title }}
			</button>
		</span>
	</div>
</template>

<script>
export default ({
    name: 'Navbar',
    data() {
        return {
            navs: this.$store.getters['Navbar/navs'],
        }
    },
    methods: {
        gotoNav(nav) {
            this.$store.dispatch('Navbar/gotoNav', nav)
        }
    },
    computed: {
        currentNav () {
           return this.$store.getters['Navbar/currentNav']
        }
    }
})
</script>
