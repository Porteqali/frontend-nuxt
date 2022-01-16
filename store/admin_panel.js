const state = {
    sideMenuOpen: false,
};

const getters = {
    sideMenuOpen: (state) => state.sideMenuOpen,
};

const actions = {
    checkPermissions({ dispatch, commit }, data = {}) {
        const permissionsToCheck = data.permissionsToCheck || [];
        const permissions = data.permissions || [];
        const style = data.style || "OR";

        if (style == "AND") {
            for (let i = 0; i < permissionsToCheck.length; i++) if (permissions.indexOf(permissionsToCheck[i]) == -1) return false;
            return true;
        } else {
            for (let i = 0; i < permissionsToCheck.length; i++) if (permissions.indexOf(permissionsToCheck[i]) != -1) return true;
            return false;
        }
    },
};

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
