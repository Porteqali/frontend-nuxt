<style scoped>
.dialog {
    position: fixed;
    inset: 0;
    z-index: 100;
    color: #3c3c3c;
    padding: 1rem;
}
.backdrop {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 50%);
}
</style>

<template>
    <div class="dialog flex flex-col items-center px-2 gap-4" :class="{ open: open }" v-show="open">
        <div class="backdrop" @click="updateOpenState(false)"></div>
        <transition name="slidedown" appear>
            <form class="relative flex items-center gap-4 p-4 bg-warmgray-200 rounded-xl shadow-lg w-full max-w-lg" @submit="search($event)">
                <Icon class="w-6 h-6 bg-gray-700" size="24px" folder="icons/new" name="Search" />
                <input class="flex-grow outline-none bg-transparent" v-model="searchQuery" type="text" placeholder="جستجو..." />
                <img class="flex-shrink-0 mr-2" src="/icons/new/Cancel.svg" width="20" @click="clearSearch()" v-show="!!searchResults.length" />
            </form>
        </transition>
        <transition name="slidedown" appear>
            <div class="relative flex flex-col items-center gap-4 bg-white rounded-2xl w-full max-w-xl shadow-xl p-4" v-if="searchResults.length > 0">
                <ul class="flex flex-col w-full max-h-96 overflow-auto overflow-x-hidden">
                    <li class="flex w-full" v-for="(course, i) in searchResults" :key="i">
                        <nuxt-link :to="`/course/${course._id}/${course.name.replace(/ /g, '-')}`" class="flex items-start justify-between gap-2 p-3 w-full">
                            <div class="flex items-start gap-2 flex-grow">
                                <img class="w-32 h-20 rounded-xl object-cover shadow-md" :src="course.image" loading="lazy" :alt="course.image" />
                                <div class="flex flex-col gap-2 w-full">
                                    <span class="kalameh_bold w-full text-gray-700">{{ course.name }}</span>
                                    <p class="w-full text-xs opacity-80">
                                        {{ course.description.length > 60 ? course.description.substr(0, 60) + "..." : course.description }}
                                    </p>
                                </div>
                            </div>
                            <span class="rounded-md p-2 px-3 text-xs font-bold bg-warmgray-200 flex-shrink-0">{{ course.totalTime }}</span>
                        </nuxt-link>
                    </li>
                </ul>
                <div class="flex items-center justify-center rounded-xl shadow-lg bg-warmgray-100 w-full" @click="updateOpenState(false)">
                    <nuxt-link :to="`/search/${searchQuery}`" class="w-full py-2 px-4 text-center">مشاهده نتایج بیشتر</nuxt-link>
                </div>
            </div>
        </transition>
        <div class="relative flex flex-col items-center gap-4 bg-white rounded-2xl shadow-xl p-4" v-if="!!showNoResult">نتیجه ای پیدا نشد!</div>
        <Loading class="w-8 h-8" v-if="searchResultsLoading" />
    </div>
</template>

<script>
import axios from "axios";
import Icon from "~/components/Icon.vue";
import Loading from "~/components/Loading.vue";

export default {
    name: "SearchDropdown",
    props: ["open"],
    components: {
        Icon,
        Loading,
    },
    data() {
        return {
            loading: false,

            suggestedCourses: [0, 0, 0, 0],
            suggestedCoursesLoading: false,

            searchQuery: "",
            searchResults: [],
            searchResultsLoading: false,

            showNoResult: false,
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;
    },
    methods: {
        updateOpenState(state) {
            this.$emit("update:open", state);
        },

        async search(e) {
            e.preventDefault();

            if (this.searchResultsLoading) return;
            this.searchResultsLoading = true;
            this.showNoResult = false;

            let url = `/api/search/${this.searchQuery}`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            let params = [`page=1`, `order=newest`, `section=course`];
            url = `${url}?${params.join("&")}`;

            await axios
                .get(encodeURI(url), { headers })
                .then((results) => {
                    if (results.data.records.length > 6) results.data.records.length = 6;
                    this.searchResults = results.data.records;

                    if (results.data.records.length == 0) this.showNoResult = true;
                })
                .catch((e) => {})
                .finally(() => (this.searchResultsLoading = false));
        },

        clearSearch() {
            this.searchQuery = "";
            this.searchResults = [];
        },
    },
};
</script>
