<style scoped>
h3::after {
    content: "";
    position: absolute;
    left: -5%;
    bottom: -2px;
    display: inline-block;
    width: 100%;
    height: 1rem;
    background-color: #ffc8a2;
    z-index: 0;
}

.course_card {
    max-width: 210px;
    width: 500vw;
}
.card_bar {
    backdrop-filter: blur(8px);
}
</style>

<template>
    <section class="flex flex-col gap-6 p-4 md:p-6 w-screen max-w-full">
        <header class="flex flex-wrap items-center justify-between gap-4">
            <h3 class="relative text-2xl"><b class="relative z-10">پر فروش ترین دوره ها</b></h3>
            <div class="flex">
                <Select :selectedOption.sync="period" @update:selectedOption="updatePeriod()" :options="periodOptions">
                    <template v-slot:option="{ option }">
                        <span :value="option.value">{{ option.name }}</span>
                    </template>
                </Select>
            </div>
        </header>
        <div v-swiper="coursesSwiperOptions" class="w-full select-none overflow-hidden px-1 -mb-2">
            <ul class="swiper-wrapper flex items-center w-screen pb-4">
                <li class="swiper-slide course_card flex flex-col gap-2 shadow-md p-1 ml-4 rounded-2xl bg-gray-50" v-for="(item, i) in courses" :key="i">
                    <div class="relative flex flex-col items-center p-1 overflow-hidden">
                        <img
                            class="w-full h-36 object-cover rounded-2xl scale-50"
                            v-if="item.info"
                            :src="item.info.image || `/misc/course.png`"
                            loading="lazy"
                            alt=""
                        />
                        <div class="card_bar absolute bottom-2 gray_gradient flex flex-col gap-2 p-2 rounded-2xl w-screen" style="max-width: 186px">
                            <h5 class="w-full overflow-hidden whitespace-nowrap overflow-ellipsis text-sm" v-if="item.info">{{ item.info.name }}</h5>
                            <div class="flex items-center gap-1 w-full" v-if="item.info && item.info.teacher">
                                <img
                                    class="w-5 h-5 rounded-full object-cover"
                                    :src="item.info.teacher.image"
                                    loading="lazy"
                                    :alt="`${item.info.teacher.name} ${item.info.teacher.family}`"
                                />
                                <small class="w-full overflow-hidden whitespace-nowrap overflow-ellipsis text-xs">
                                    {{ `${item.info.teacher.name} ${item.info.teacher.family}` }}
                                </small>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-start gap-2 p-1">
                        <Icon class="w-6 h-6 bg-emerald-600" size="24px" folder="icons/admin" name="SackDollar" />
                        <span class="text-xl text-emerald-900">{{ new Intl.NumberFormat("fa").format(item.buyCount) }}</span>
                    </div>
                </li>
            </ul>
            <div class="flex justify-center swiper-pagination2 swiper-pagination-bullets"></div>
        </div>
    </section>
</template>

<script>
import axios from "axios";
import Select from "~/components/forms/Select.vue";
import Icon from "~/components/Icon.vue";

export default {
    name: "MostSoldCoursesSection",
    components: {
        Select,
        Icon,
    },
    data() {
        return {
            isDataLoading: false,
            courses: [],
            period: { name: "در این ماه", value: "this-month" },
            periodOptions: [
                { name: "دیروز", value: "yesterday" },
                { name: "در این ماه", value: "this-month" },
                { name: "ماه پیش", value: "last-month" },
            ],

            coursesSwiperOptions: {
                autoplay: false,
                slidesPerView: "auto",
                initialSlide: 0,
                loop: false,
                freeMode: true,
                pagination: ".swiper-pagination2",
            },
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await Promise.all([this.getCourses({ headers })]);
    },
    methods: {
        async getCourses(data = {}) {
            if (this.isDataLoading) return;
            this.isDataLoading = true;

            let url = `/api/marketer-panel/dashboard/most-sold-courses?period=${this.period.value}`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            await axios
                .get(encodeURI(url), { headers })
                .then((response) => {
                    this.courses = response.data;
                })
                .catch((e) => {})
                .finally(() => (this.isDataLoading = false));
        },

        async updatePeriod() {
            await this.getCourses();
        },
    },
};
</script>
