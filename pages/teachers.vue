<style scoped>
#top {
    color: var(--top-h1-color);
    font-weight: 900;
}

.teacher_card {
    background-color: rgba(19, 40, 80, 0.8);
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    color: #fff;
}
.teacher_card * {
    z-index: 2;
}
.teacher_card::before {
    color: #fff;
    background: linear-gradient(0deg, rgba(19, 40, 80, 0.8), rgba(19, 40, 80, 0.8));
    content: "";
    position: absolute;
    inset: 0;
    backdrop-filter: blur(15px);
    border-radius: 2rem;
}
</style>

<template>
    <main role="main" class="flex flex-col items-center gap-16 max-w-screen-2xl w-full mt-10 lg:mt-0">
        <section class="relative flex flex-wrap-reverse items-center justify-evenly gap-8 lg:gap-20" id="top">
            <div class="flex flex-col gap-10">
                <h1 class="flex flex-col gap-4 text-5xl lg:text-7xl">
                    <span class="kalameh_bold font-bold">مدرسان پرتقال</span>
                </h1>
                <ul class="flex items-center gap-2 font-light">
                    <li><nuxt-link title="صفحه اصلی" to="/">صفحه اصلی</nuxt-link></li>
                    <li>&gt;</li>
                    <li>مدرسان پرتقال</li>
                </ul>
            </div>
            <img class="" src="/pages/teachers/group.png" alt="porteqali-UpStairsMan" style="max-height: 1920px" />
        </section>

        <section class="flex flex-wrap-reverse justify-evenly gap-8 w-screen max-w-screen-2xl" v-if="!groupsLoading">
            <div class="w-full flex flex-col gap-4" v-for="(group, i) in groups" :key="i">
                <h3 class="font-bold text-3xl">اساتید دوره های {{ departments[i].name }}</h3>
                <div v-swiper:[departments[i].name]="swiperOptions" class="w-full max-w-screen-2xl select-none overflow-hidden py-4">
                    <ul class="swiper-wrapper flex w-full">
                        <li
                            class="swiper-slide teacher_card flex flex-col items-center justify-start gap-4 p-8 md:p-16 w-screen rounded-3xl shadow-lg max-w-sm flex-shrink-0 ml-6"
                            :style="`background-image: url('${teacher.image}')`"
                            v-for="(teacher, j) in group"
                            :key="j"
                        >
                            <img class="w-24 h-24 rounded-full shadow-md object-cover" :src="teacher.image" :alt="`${teacher.name} ${teacher.family}`" />
                            <b class="text-2xl">{{ `${teacher.name} ${teacher.family}` }}</b>
                            <small class="text-lightblue-400">{{ teacher.title }}</small>
                            <p class="opacity-75 text-center max-w-sm w-full break-words">
                                {{ teacher.description.length > 256 ? teacher.description.substr(0, 256) + "..." : teacher.description }}
                            </p>
                            <ul class="flex flex-wrap items-center gap-2">
                                <li v-for="(social, j) in teacher.social" :key="j">
                                    <a :href="social.link"><Icon class="w-8 h-8 bg-gray-200" folder="social" :name="social.name" /></a>
                                </li>
                            </ul>
                            <nuxt-link :to="`/teacher/${teacher._id}`" class="flex items-center justify-center gray_gradient w-full p-4 rounded-xl mt-auto">
                                مشاهده دوره ها
                            </nuxt-link>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
        <ul class="flex flex-wrap justify-center gap-6 w-full" v-else>
            <li
                class="teacher_card flex flex-col items-center justify-start gap-4 p-8 md:p-16 w-full rounded-3xl shadow-2xl max-w-md"
                v-for="(group, i) in groupsSkeleton"
                :key="i"
            >
                <span class="skeleton w-24 h-24 rounded-full shadow-md"></span>
                <small class="skeleton w-20 h-2 text-lightblue-400"></small>
                <div class="flex flex-col gap-2 w-full">
                    <span class="skeleton w-full h-2"></span>
                    <span class="skeleton w-full h-2"></span>
                    <span class="skeleton w-full h-2"></span>
                    <span class="skeleton w-4/12 h-2"></span>
                </div>
            </li>
        </ul>
    </main>
</template>

<script>
import axios from "axios";
import Icon from "~/components/Icon.vue";
import getMetadata from "~/mixins/getMetadata";

export default {
    head() {
        return { title: this.metadata.title, meta: [...this.metadata.meta], link: [...this.metadata.link] };
    },
    mixins: [getMetadata],
    components: { Icon },
    data() {
        return {
            departments: {
                network: { name: "امنیت شبکه", slug: "network", icon: "/misc/Figma.svg" },
                languages: { name: "زبان های خارجی", slug: "languages", icon: "/misc/Figma.svg" },
                graphic: { name: "طراحی گرافیک", slug: "graphic", icon: "/misc/Figma.svg" },
                university: { name: "دروس دانشگاهی", slug: "university", icon: "/misc/Figma.svg" },
                programming: { name: "برنامه نویسی", slug: "programming", icon: "/misc/Figma.svg" },
                "web-design": { name: "طراحی وب", slug: "web-design", icon: "/misc/Figma.svg" },
                business: { name: "کسب و کار", slug: "business", icon: "/misc/Figma.svg" },
                free: { name: "دوره های رایگان", slug: "free", icon: "/misc/Figma.svg" },
            },

            swiperOptions: {
                autoplay: false,
                slidesPerView: "auto",
                initialSlide: 0,
                // spaceBetween: 16,
                loop: false,
                freeMode: true,
            },

            groupsLoading: false,
            groupsSkeleton: [0, 0, 0],
            groups: this.groups || {},
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await Promise.all([await this.getMetadata("teachers"), this.getTeachers({ headers })]);
    },
    methods: {
        async getTeachers(data = {}) {
            if (this.groupsLoading) return;
            this.groupsLoading = true;

            let url = `/api/teachers`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            await axios
                .get(url, { headers })
                .then((results) => {
                    this.groups = results.data;
                })
                .catch((e) => {})
                .finally(() => (this.groupsLoading = false));
        },
    },
};
</script>
