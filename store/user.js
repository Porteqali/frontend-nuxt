import axios from "axios";

const state = {
    info: {
        image: "",
        name: "",
        family: "",
        email: "",
        permissions: [],
    },
};

const getters = {
    info: (state) => state.info,
};

const actions = {
    async getUserInfo({ dispatch, commit }, data = {}) {
        let url = `/api/users/info`;
        let headers = {};
        if (process.server) {
            url = `${process.env.BASE_URL}${url}`;
            headers = data.headers ? data.headers : {};
        }

        await axios
            .get(url, { headers })
            .then((results) => {
                commit("setInfo", results.data);
            })
            .catch((e) => {
                throw e;
            });
    },

    async refresh({ commit, dispatch }, data = {}) {
        const refreshRate = 60 * 10; // 10 minutes
        await axios
            .post(`/auth/refresh`)
            .then(() => {
                let interval = setInterval(() => {
                    axios.post(`/auth/refresh`).catch((error) => clearInterval(interval));
                }, refreshRate * 1000);
            })
            .catch((e) => {});
    },

    logout({ commit }, data = {}) {
        commit("setInfo", {
            image: "",
            name: "",
            family: "",
            email: "",
            role: {
                name: "",
                permissions: [],
            },
            image: "",
        });
    },
};

const mutations = {
    setInfo: (state, info) => (state.info = info),
};

export default {
    state: () => {
        return state;
    },
    getters,
    actions,
    mutations,
};
