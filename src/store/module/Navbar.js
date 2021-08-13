const Navbar = {
    namespaced: true,
    state: {
        currentNav: '',
        navs: [
            {component: 'Divisi', title: 'Divisi', icon: ''},
            {component: 'Bagian', title: 'Bagian', icon: ''},
            {component: 'Level', title: 'Level', icon: ''},
            {component: 'Karyawan', title: 'Karyawan', icon: ''},
            {component: 'Absen', title: 'Absen', icon: ''},
            {component: 'Importer', title: 'Importer', icon: ''},
            {component: 'Exporter', title: 'Exporter', icon: ''}
        ]
    },
    mutations: {
        gotoNav (state, val) {
            state.currentNav = val
        }
    },
    actions: {
        gotoNav({commit}, val) {
            val ? commit('gotoNav', val) : false
        }
    },
    getters: {
        navs (state) {
            return state.navs
        },
        currentNav(state) {
            return state.currentNav
        }
    }
}

export default Navbar