export default {
    methods: {
        checkPermissions(PermissionsToCheck = [], Permissions = [], style = "OR") {
            if (style == "AND") {
                for (let i = 0; i < PermissionsToCheck.length; i++) {
                    if (Permissions.indexOf(PermissionsToCheck[i]) == -1) return false;
                }
                return true;
            } else {
                for (let i = 0; i < PermissionsToCheck.length; i++) {
                    if (Permissions.indexOf(PermissionsToCheck[i]) != -1) return true;
                }
                return false;
            }
        },
    },
};
