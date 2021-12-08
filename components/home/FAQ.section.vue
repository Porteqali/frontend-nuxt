<style scoped>
.card {
    background-color: var(--faq-section-card-bg-color);
    color: var(--faq-section-card-color);
}
.card h4 {
    color: var(--faq-section-card-title-color);
}
</style>

<template>
    <section class="relative flex flex-col gap-8 w-full" id="faqs">
        <div class="flex flex-wrap justify-between gap-8 w-full">
            <h3 class="font-bold text-4xl">سوالات متداول</h3>
        </div>
        <ul class="flex flex-col items-center gap-8" v-if="!faqsLoading">
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
                        <p v-show="faq.open">{{ faq.answer }}</p>
                    </transition>
                </div>
                <transition name="fade" mode="out-in" appear>
                    <img src="/icons/ArrowUpCircle.line.svg" alt="ArrowUpCircle" v-if="faq.open" />
                    <img src="/icons/ArrowDownCircle.line.svg" alt="ArrowDownCircle" v-else />
                </transition>
            </li>
        </ul>
        <div v-else>
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
    </section>
</template>

<script>
import axios from 'axios';

export default {
    name: "FaqSection",
    data() {
        return {
            faqs: [],
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
        async getFaqs(data = {}) {
            if (this.faqsLoading || this.faqsPage > this.faqsPageTotal) return;
            this.faqsLoading = true;

            let url = `/api/faqs`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            let params = [`page=${this.faqsPage}`, `pp=5`];
            url = `${url}?${params.join("&")}`;

            await axios
                .get(url, { headers })
                .then((results) => {
                    const newFaqs = results.data.records.map((faq) => {
                        return { ...faq, open: false };
                    });
                    this.faqs = newFaqs;
                })
                .catch((e) => {})
                .finally(() => (this.faqsLoading = false));
        },
    },
};
</script>
