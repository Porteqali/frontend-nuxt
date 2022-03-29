<style scoped>
.card {
    background-color: #f2f2f2;
    color: #333;
}
.card h4 {
    color: #333;
}
.load_more_btn {
    background-color: #efefef;
    color: #555;
}

.spacer {
    background: linear-gradient(87.25deg, #ffa825 -11.51%, #ff70d7 114.56%);
}
</style>

<template>
    <main role="main" class="relative flex flex-col items-center gap-16 max-w-screen-2xl w-full mt-24 md:mt-24 px-4 md:px-8 mb-16">
        <img class="absolute -right-1/4 top-1/4 -z-1" src="/pages/faqs/bg.png" v-if="faqs.length != 0" />
        <img class="absolute -left-48 top-40 -z-1" src="/pages/faqs/hand.png" />
        <section class="relative flex flex-col items-center justify-center gap-8 w-full">
            <div class="flex flex-col justify-center gap-2">
                <h1 class="flex flex-col gap-4 kalameh_bold title text-3xl lg:text-4xl w-max">سوالی داری؟</h1>
                <p class="kalameh_bold text-lg opacity-65">چطور میتونیم کمکت کنیم؟</p>
            </div>
            <div class="flex items-center gap-4 p-2 rounded-2xl shadow-lg bg-white w-full max-w-2xl">
                <input class="flex-grow outline-none bg-transparent w-64 pr-2" type="text" v-model="searchQuery" placeholder="سوالتو بپرس..." />
                <button class="orange_gradient_h flex-shrink-0 p-1 md:p-2 rounded-xl shadow-lg flex items-center justify-center" @click="search()">
                    <Icon class="w-7 h-7 bg-gray-100" size="28px" folder="icons/new" name="Search" />
                </button>
            </div>
        </section>

        <div class="flex flex-wrap md:flex-nowrap items-start gap-4 w-full max-w-screen-xl">
            <ul class="flex flex-row md:flex-col gap-4 w-full md:max-w-screen-2xs flex-shrink-0 bg-truegray-50 rounded-3xl">
                <li
                    class="flex flex-col md:flex-row items-center gap-2 p-2 rounded-2xl w-full"
                    :class="{ 'text-gray-100 bg-gray-700': selectedGroup == 'education' }"
                    @click="selectCategory('education')"
                >
                    <Icon class="w-7 h-7" :class="[selectedGroup == 'education' ? 'bg-gray-100' : 'bg-gray-700']" size="28px" folder="icons/new" name="Work" />
                    <strong class="font-bold whitespace-nowrap text-sm md:text-lg flex-shrink-0">آموزش</strong>
                </li>
                <li
                    class="flex flex-col md:flex-row items-center gap-2 p-2 rounded-2xl w-full"
                    :class="{ 'text-gray-100 bg-gray-700': selectedGroup == 'support' }"
                    @click="selectCategory('support')"
                >
                    <Icon class="w-7 h-7" :class="[selectedGroup == 'support' ? 'bg-gray-100' : 'bg-gray-700']" size="28px" folder="icons/new" name="AddUser" />
                    <strong class="font-bold whitespace-nowrap text-sm md:text-lg flex-shrink-0">پشتیبانی</strong>
                </li>
                <li
                    class="flex flex-col md:flex-row items-center gap-2 p-2 rounded-2xl w-full"
                    :class="{ 'text-gray-100 bg-gray-700': selectedGroup == 'collab' }"
                    @click="selectCategory('collab')"
                >
                    <Icon class="w-7 h-7" :class="[selectedGroup == 'collab' ? 'bg-gray-100' : 'bg-gray-700']" size="28px" folder="icons/new" name="Calling" />
                    <strong class="font-bold whitespace-nowrap text-sm md:text-lg flex-shrink-0">همکاری</strong>
                </li>
                <li
                    class="flex flex-col md:flex-row items-center gap-2 p-2 rounded-2xl w-full"
                    :class="{ 'text-gray-100 bg-gray-700': selectedGroup == 'wallet' }"
                    @click="selectCategory('wallet')"
                >
                    <Icon class="w-7 h-7" :class="[selectedGroup == 'wallet' ? 'bg-gray-100' : 'bg-gray-700']" size="28px" folder="icons/new" name="Wallet" />
                    <strong class="font-bold whitespace-nowrap text-sm md:text-lg flex-shrink-0">کارت اعتباری</strong>
                </li>
            </ul>

            <span class="spacer rounded-full w-full h-0.5 md:w-0.5 md:h-56"></span>

            <section class="flex flex-col items-center gap-8 w-full flex-grow">
                <ul class="flex flex-col items-center gap-8 w-full">
                    <li
                        class="card flex flex-wrap md:flex-nowrap items-center gap-4 md:gap-8 p-4 md:p-8 w-full rounded-2xl"
                        v-for="(faq, i) in faqs"
                        :key="i"
                        @click="faq.open = !faq.open"
                    >
                        <div class="flex flex-col gap-4 flex-grow w-full">
                            <h4 class="md:text-lg w-full font-bold">{{ faq.question }}</h4>
                            <transition name="slidedown" mode="out-in" appear>
                                <p class="w-full bg-white p-4 rounded-xl" v-show="faq.open">{{ faq.answer }}</p>
                            </transition>
                        </div>
                        <transition name="fade" mode="out-in" appear>
                            <Icon class="w-6 h-6 bg-gray-700" size="24px" folder="icons/new" name="ArrowUp2" v-if="faq.open" />
                            <Icon class="w-6 h-6 bg-gray-700" size="24px" folder="icons/new" name="ArrowDown2" v-else />
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
                <div v-if="faqsLoading">
                    <ul class="flex flex-col items-center gap-8">
                        <li class="card shadow-xl flex items-center gap-8 p-8 w-full rounded-2xl max-w-screen-xl" v-for="(item, i) in faqsLoadingSkeleton" :key="i">
                            <div class="flex flex-col gap-4 flex-grow w-full">
                                <h4 class="skeleton w-full h-8" style="min-width: 1024px"></h4>
                                <span class="skeleton w-8/12 h-4"></span>
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="flex gap-16" v-if="!faqsLoading && faqs.length == 0">
                    <strong class="kalameh_bold text-rose-400 text-xl">موردی پیدا نشد!</strong>
                </div>
            </section>
        </div>
    </main>
</template>

<script>
import axios from "axios";
import Loading from "~/components/Loading.vue";
import getMetadata from "~/mixins/getMetadata";

export default {
    head() {
        return { title: this.metadata.title, meta: [...this.metadata.meta], link: [...this.metadata.link] };
    },
    mixins: [getMetadata],
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

        await Promise.all([await this.getMetadata("faqs"), this.getFaqs({ headers })]);
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
