<style scoped>
#top h1,
#top ul {
    color: var(--top-h1-color);
    font-weight: 900;
}
.search_box {
    background-color: var(--search-box-bg-color);
    color: var(--search-box-color);
}
.search_box button {
    color: var(--search-box-button-color);
}
.category_card {
    background-color: #000c7888;
    color: var(--top-h1-color);
    cursor: pointer;
}

.card {
    background-color: var(--faq-section-card-bg-color);
    color: var(--faq-section-card-color);
}
.card h4 {
    color: var(--faq-section-card-title-color);
}
.load_more_btn {
    background-color: var(--department-section-title-alt-text-bg-color);
    color: var(--department-section-title-alt-text-color);
}
</style>

<template>
    <main role="main" class="flex flex-col items-center gap-16 max-w-screen-4xl w-full">
        <section class="relative flex flex-wrap-reverse justify-evenly gap-8 lg:gap-20" id="top">
            <img class="" src="/pages/faqs/ResearchMan.png" alt="porteqali-PhoneCallMan" style="max-height: 1920px" />
            <div class="flex flex-col gap-10 mt-28">
                <h1 class="flex flex-col gap-4 text-7xl">
                    <span class="kalameh_bold font-bold">سوالات متداول</span>
                </h1>
                <ul class="flex items-center gap-2 font-light">
                    <li><nuxt-link to="/">صفحه اصلی</nuxt-link></li>
                    <li>&gt;</li>
                    <li>سوالات متداول</li>
                </ul>
                <div class="search_box flex items-center gap-4 p-2 rounded-xl shadow-lg">
                    <input class="flex-grow outline-none bg-transparent w-64" type="text" v-model="searchQuery" placeholder="جستجو..." />
                    <button class="orange_gradient_v flex-shrink-0 p-2 md:px-8 rounded-xl shadow-lg flex items-center justify-center" @click="search()">
                        <span class="hidden md:inline-block">جستجو</span>
                        <img class="flex-shrink-0 inline-block md:hidden" src="/icons/Search.svg" width="24" height="24" alt="Search" />
                    </button>
                </div>
            </div>
        </section>

        <ul class="flex flex-wrap justify-center gap-8 w-full max-w-screen-xl mx-auto -mt-52">
            <li
                class="category_card blur flex flex-col items-center justify-center gap-4 p-8 md:px-16 rounded-2xl"
                :class="{ 'border-4 border-solid border-orange-300': selectedGroup == 'education' }"
                @click="selectCategory('education')"
            >
                <img src="/pages/faqs/Book.svg" class="w-24 md:w-32" alt="Book" />
                <strong class="text-lg md:text-2xl">آموزش</strong>
            </li>
            <li
                class="category_card blur flex flex-col items-center justify-center gap-4 p-8 md:px-16 rounded-2xl"
                :class="{ 'border-4 border-solid border-orange-300': selectedGroup == 'support' }"
                @click="selectCategory('support')"
            >
                <img src="/pages/faqs/Window.svg" class="w-24 md:w-32" alt="Window" />
                <strong class="text-lg md:text-2xl">پشتیبانی</strong>
            </li>
            <li
                class="category_card blur flex flex-col items-center justify-center gap-4 p-8 md:px-16 rounded-2xl"
                :class="{ 'border-4 border-solid border-orange-300': selectedGroup == 'collab' }"
                @click="selectCategory('collab')"
            >
                <img src="/pages/faqs/Mail.svg" class="w-24 md:w-32" alt="Mail" />
                <strong class="text-lg md:text-2xl">همکاری</strong>
            </li>
            <li
                class="category_card blur flex flex-col items-center justify-center gap-4 p-8 md:px-16 rounded-2xl"
                :class="{ 'border-4 border-solid border-orange-300': selectedGroup == 'wallet' }"
                @click="selectCategory('wallet')"
            >
                <img src="/pages/faqs/Wallet.svg" class="w-24 md:w-32" alt="Wallet" />
                <strong class="text-lg md:text-2xl">کارت اعتباری</strong>
            </li>
        </ul>

        <section class="flex flex-col items-center gap-8 w-full max-w-screen-xl">
            <ul class="flex flex-col items-center gap-8">
                <li
                    class="card shadow-xl flex items-center gap-8 p-8 w-full rounded-2xl max-w-screen-xl"
                    v-for="(faq, i) in faqs"
                    :key="i"
                    @click="faq.open = !faq.open"
                >
                    <span class="flex items-center justify-center w-10 h-10 p-4 rounded-full bg-indigo-100">{{ i + 1 }}</span>
                    <div class="flex flex-col gap-4 flex-grow w-full">
                        <h4 class="md:text-xl">{{ faq.question }}</h4>
                        <transition name="slidedown" mode="out-in" appear>
                            <p class="max-w-screen-md" v-show="faq.open">{{ faq.answer }}</p>
                        </transition>
                    </div>
                    <transition name="fade" mode="out-in" appear>
                        <img src="/icons/ArrowUpCircle.line.svg" alt="ArrowUpCircle" v-if="faq.open" />
                        <img src="/icons/ArrowDownCircle.line.svg" alt="ArrowDownCircle" v-else />
                    </transition>
                </li>
            </ul>
            <button
                class="load_more_btn blur flex items-center gap-2 py-3 px-6 rounded-xl w-max"
                v-if="!faqsLoading && faqsPage <= faqsPageTotal"
                @click="getFaqs()"
            >
                <span>بارگذاری بیشتر</span>
            </button>
            <!-- <Loading v-if="faqsLoading" /> -->
            <div v-if="faqsLoading">
                <ul class="flex flex-col items-center gap-8">
                    <li class="card shadow-xl flex items-center gap-8 p-8 w-full rounded-2xl max-w-screen-xl" v-for="(item, i) in faqsLoadingSkeleton" :key="i">
                        <span class="flex items-center justify-center w-10 h-10 p-4 rounded-full bg-indigo-100">{{ i + 1 }}</span>
                        <div class="flex flex-col gap-4 flex-grow w-full">
                            <h4 class="skeleton w-full h-8" style="min-width: 1024px"></h4>
                            <span class="skeleton w-8/12 h-4"></span>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="flex items-center justify-center gap-16" v-if="!faqsLoading && faqs.length == 0">
                <strong class="text-4xl">موردی پیدا نشد!</strong>
            </div>
        </section>
    </main>
</template>

<script>
import axios from "axios";
import Loading from "~/components/Loading.vue";

export default {
    head: {
        title: "سوالات متداول - گروه آموزشی پرتقال",
        meta: [{ hid: "description", name: "description", content: "" }],
    },
    components: { Loading },
    data() {
        return {
            searchQuery: "",
            selectedGroup: "",

            faqs: [],
            faqsPage: 1,
            faqsTotal: 0,
            faqsPageTotal: 1,
            faqsLoading: false,
            faqsLoadingSkeleton: [0, 0, 0],
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await this.getFaqs({ headers });
    },
    methods: {
        async selectCategory(group) {
            if (this.selectedGroup === group) {
                this.selectedGroup = "";
                return;
            }
            this.selectedGroup = group;

            this.clearFaqs();
            await this.getFaqs();
        },

        async search() {
            this.clearFaqs();
            await this.getFaqs();
        },

        async getFaqs(data = {}) {
            if (this.faqsLoading || this.faqsPage > this.faqsPageTotal) return;
            this.faqsLoading = true;

            let url = `/api/faqs`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            let params = [`page=${this.faqsPage}`, `search=${this.searchQuery}`, `group=${this.selectedGroup}`];
            url = `${url}?${params.join("&")}`;

            await axios
                .get(url, { headers })
                .then((results) => {
                    const newFaqs = results.data.records.map((faq) => {
                        return { ...faq, open: false };
                    });
                    this.faqs = [...this.faqs, ...newFaqs];

                    this.faqsPage = results.data.page + 1;
                    this.faqsTotal = results.data.total;
                    this.faqsPageTotal = results.data.pageTotal;
                })
                .catch((e) => {})
                .finally(() => (this.faqsLoading = false));
        },

        clearFaqs() {
            this.faqs = [];
            this.faqsPage = 1;
            this.faqsTotal = 0;
            this.faqsPageTotal = 1;
        },
    },
};
</script>
