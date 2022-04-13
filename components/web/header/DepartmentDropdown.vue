<style scoped>
.box {
    position: absolute;
    top: 10rem;
    margin-right: -2rem;
    background-color: #fff;
    color: #333;
}
ul li:hover {
    transform: scale(1.05, 1.05);
}

@media (min-width: 1024px) {
    .box {
        top: 3.75rem;
    }
}
</style>

<template>
    <transition class="" name="slideup" appear>
        <div class="box rounded-3xl shadow-lg" v-show="open">
            <ul class="grid grid-cols-1 lg:grid-cols-3 gap-4 p-6 w-full">
                <li class="" v-for="(department, i) in departments" :key="i" @click="toggleMenu(false)">
                    <nuxt-link
                        class="w-full flex items-center gap-2 p-1 hover:text-orange-300 hover:bg-warmgray-700 rounded-2xl"
                        :to="`/department?group=${department.slug}#courses`"
                        :title="department.slug"
                    >
                        <img :src="department.icon" class="w-10 h-10 rounded-full object-cover" :alt="department.name" />
                        <span>{{ department.name }}</span>
                    </nuxt-link>
                </li>
            </ul>
        </div>
    </transition>
</template>

<script>
import axios from "axios";

export default {
    name: "DepartmentDropdown",
    props: ["open"],
    components: {},
    data() {
        return {
            loading: false,

            departments: [],
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await Promise.all([this.getCourseGroups({ headers })]);
    },
    methods: {
        toggleMenu(state) {
            this.$store.commit("menu/sideMenuToggle", !!state);
        },

        updateOpenState(state) {
            this.$emit("update:open", state);
        },

        async getCourseGroups(data = {}) {
            let url = `/api/course-groups`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            await axios
                .get(url, { headers })
                .then((results) => {
                    this.departments = [];
                    results.data.records.forEach((record) => this.departments.push({ ...record, slug: record.topGroup }));
                })
                .catch((e) => {});
        },
    },
};
</script>
