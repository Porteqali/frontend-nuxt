const state = {
    sideMenuOpen: false,
};

const getters = {
    sideMenuOpen: (state) => state.sideMenuOpen,
};

const actions = {};

const mutations = {
    sideMenuToggle: (state, status) => (state.sideMenuOpen = status),
};

export default {
    state: () => {
        return state;
    },
    getters,
    actions,
    mutations,
};
