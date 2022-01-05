const state = {
    list: {},
    total: 0,
};

const getters = {
    list: (state) => state.list,
    total: (state) => state.total,
};

const actions = {
    async addItemToCart({ dispatch, commit }, data = {}) {
        commit("insertToCart", data.item);
        commit("updateTotal");
    },
    async removeItemFromCart({ dispatch, commit }, data = {}) {
        commit("deleteFromCart", data.item);
        commit("updateTotal");
    },
};

const mutations = {
    insertToCart: (state, newItem) => (state.list = { ...state.list, [newItem._id]: newItem }),
    deleteFromCart: (state, item) => {
        delete state.list[item._id];
        state.list = { ...state.list };
    },
    updateTotal: (state, total = 0) => {
        for (const item in state.list) total += parseInt(state.list[item].discountedPrice);
        state.total = total;
    },
};

export default {
    state: () => {
        return state;
    },
    getters,
    actions,
    mutations,
};
