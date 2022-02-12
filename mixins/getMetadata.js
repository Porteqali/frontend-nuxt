import axios from "axios";

export default {
    data() {
        return {
            metadata: { meta: [], link: [] },
        };
    },
    methods: {
        async getMetadata(page) {
            let url = `/api/metadata/${page}`;
            let headers = {};
            if (process.server) url = `${process.env.BASE_URL}${url}`;
            if (process.server) headers = this.$nuxt.context.req.headers;
            this.metadata = { meta: [], link: [] };
            await axios
                .get(encodeURI(url), { headers })
                .then((response) => (this.metadata = response.data))
                .catch((e) => {});
        },
    },
};
