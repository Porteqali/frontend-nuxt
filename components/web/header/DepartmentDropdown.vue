<style scoped>
.box {
    position: absolute;
    top: 3.75rem;
    margin-right: -2rem;
    background-color: var(--header-nav-container-bg-color);
    color: var(--header-nav-text-color);
}
ul li {
    border-bottom: 1px solid #ffffff22;
}
ul li:last-of-type {
    border-bottom: 0;
}
ul li:hover {
    transform: scale(1.05, 1.05);
}
</style>

<template>
    <transition class="" name="slideup" appear>
        <div class="box blur rounded-3xl shadow-lg" v-show="open">
            <ul class="flex flex-col p-6 w-full">
                <li class="" v-for="(department, i) in departments" :key="i">
                    <nuxt-link class="w-full flex items-center gap-2 p-3" :to="`/department?group=${department.slug}`" :title="department.slug">
                        <img :src="department.icon" class="w-8 h-8 rounded-full object-cover" :alt="department.name" />
                        <span>{{ department.name }}</span>
                    </nuxt-link>
                </li>
            </ul>
        </div>
    </transition>
</template>

<script>
import axios from 'axios';

export default {
    name: "DepartmentDropdown",
    props: ["open"],
    components: {},
    data() {
        return {
            loading: false,

            departments: [
                { name: "امنیت شبکه", slug: "network", icon: "/misc/Figma.svg" },
                { name: "زبان های خارجی", slug: "languages", icon: "/misc/Figma.svg" },
                { name: "طراحی گرافیک", slug: "graphic", icon: "/misc/Figma.svg" },
                { name: "دروس دانشگاهی", slug: "university", icon: "/misc/Figma.svg" },
                { name: "برنامه نویسی", slug: "programming", icon: "/misc/Figma.svg" },
                { name: "طراحی وب", slug: "web-design", icon: "/misc/Figma.svg" },
                { name: "کسب و کار", slug: "business", icon: "/misc/Figma.svg" },
                { name: "دوره های رایگان", slug: "free", icon: "/misc/Figma.svg" },
            ],
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await Promise.all([this.getCourseGroups({ headers })]);
    },
    methods: {
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
