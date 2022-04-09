<style scoped></style>

<template>
    <Dialog :open="open" @update:open="updateOpenState">
        <div class="flex flex-col gap-4 w-full max-w-xs md:max-w-3xl">
            <h4 class="kalameh_black title font-bold text-3xl w-max max-w-full overflow-hidden">حوزه مورد علاقه شما</h4>
            <p>با توجه به جواب هایی که دادی، ما فکر میکنیم تو این حوزه ها موفقتر باشی</p>
            <hr />
            <ul class="flex flex-col justify-center gap-8 w-full">
                <li class="flex flex-col md:flex-row items-start gap-2 w-full" v-for="(major, i) in majorsSorted" :key="i">
                    <img class="w-32 h-32 object-contain flex-shrink-0" :src="major.image" :alt="major.title" />
                    <div class="flex flex-col gap-4 flex-grow">
                        <h3 class="kalameh_bold text-xl md:text-2xl w-max">{{ major.title }}</h3>
                        <div class="flex items-center gap-2 w-full">
                            <div class="flex h-4 bg-warmgray-200 rounded-full flex-grow">
                                <span class="orange_gradient_v h-4 rounded-full" :style="`width: ${major.percent}%;`"></span>
                            </div>
                            <b class="kalameh_bold flex-shrink-0">{{ major.percent }}%</b>
                        </div>
                        <nuxt-link
                            class="flex items-center gap-1 rounded-2xl p-2 px-4 w-max border-2 border-solid border-gray-700 bg-white hover:bg-amber-500 hover:text-white"
                            :to="`/major/${major.slug}`"
                        >
                            <Icon class="w-5 h-5 bg-gray-700" size="20px" folder="icons/new" name="Filter" />
                            <span class="text-sm">زیر شاخه ها</span>
                        </nuxt-link>
                    </div>
                </li>
            </ul>
        </div>
    </Dialog>
</template>

<script>
import axios from "axios";
import Dialog from "~/components/Dialog";
import Loading from "~/components/Loading";

export default {
    name: "QuestionResultDialog",
    props: ["open", "results", "totalPoints"],
    components: {
        Dialog,
        Loading,
    },
    data() {
        return {
            loading: false,

            majors: this.majors || {},
            majorsSorted: [],

            errorMsg: "",
            errorTag: "",
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await Promise.all([this.getMajors({ headers })]);
    },
    watch: {
        results(val) {
            for (const majorId in val) {
                const major = val[majorId];
                val[majorId].percent = ((val[majorId].points / this.totalPoints) * 100).toFixed(1);
                this.majors[majorId].percent = val[majorId].percent;
            }

            for (var majorId in this.majors) {
                this.majorsSorted.push(this.majors[majorId]);
            }
            this.majorsSorted.sort((a, b) => (a.percent > b.percent ? -1 : b.percent > a.percent ? 1 : 0));
        },
    },
    methods: {
        updateOpenState(state) {
            this.$emit("update:open", state);
        },

        async getMajors(data = {}, route) {
            let url = `/api/majors?pp=50`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }
            await axios
                .get(url, { headers })
                .then((results) => {
                    results.data.records.forEach((record) => {
                        this.majors[record._id] = { _id: record._id, image: record.image, title: record.title, slug: record.slug, percent: 0 };
                    });
                })
                .catch((e) => {});
        },
    },
};
</script>
