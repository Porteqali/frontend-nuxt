const state = {
    toastOptions: {
        delay: 5000,
        icon: "/icons/Category.svg",
        title: "Test Title",
        message: "lorem ipsum martadom il per tama re sola rima ri sodso",
        type: "default", // default | success | warning | error
        dismissible: false,
        btn: {
            text: "Go Home",
            internal: true,
            link: null,
        },
    },
};

const getters = {
    toastOptions: (state) => state.toastOptions,
};

const actions = {
    async makeToast({ commit }, options) {
        const toastOptions = {
            delay: options.delay ? options.delay : 5000,
            icon: options.icon ? options.icon : "",
            title: options.title ? options.title : "",
            message: options.message ? options.message : "",
            type: options.type ? options.type : "default",
            dismissible: options.dismissible ? options.dismissible : false,
            btn: options.btn ? options.btn : { text: "Go Home", internal: true, link: null },
        };
        commit("setToastOptions", toastOptions);
    },
};

const mutations = {
    setToastOptions: (state, options) => (state.toastOptions = options),
};

export default {
    state: () => {
        return state;
    },
    getters,
    actions,
    mutations,
};
