<style scoped>
.question_box {
    border: 0.75rem solid #c4c4c4;
    background-image: url("/pages/ask-me/bg.svg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center left;
}
</style>

<template>
    <main role="main" class="relative flex flex-col items-center gap-16 max-w-screen-2xl w-full mt-24 md:mt-24 px-4 md:px-8 mb-16">
        <!-- <div class="fixed flex bg-white shadow-xl p-4 rounded-2xl w-full max-w-5xl">
            <div class="absolute top-6 mt-0.5 flex w-full h-3 -mx-4 px-4">
                <span class="absolute bg-gray-300 w-full h-3"></span>
                <span class="bg-orange-400 w-8/12 h-3"></span>
            </div>
            <ul class="relative flex items-center justify-between gap-1 w-full">
                <li class="flex flex-col items-center gap-2" v-for="(questionGroup, i) in questionGroups" :key="i">
                    <div class="orange_gradient_v w-8 h-8 rounded-full"></div>
                    <h3 class="kalameh_bold text-sm">{{ questionGroup[0].category.name }}</h3>
                </li>
            </ul>
        </div> -->
        <ul class="flex flex-col gap-8 w-full">
            <li class="flex flex-col gap-4 w-full" v-for="(questionGroup, i) in questionGroups" :key="i">
                <div class="flex flex-col gap-2 w-full">
                    <h4 class="flex items-center gap-2">
                        <div class="orange_gradient_v w-8 h-8 rounded-full"></div>
                        <strong class="kalameh_bold text-xl md:text-2xl">{{ questionGroup[0].category.name }}</strong>
                    </h4>
                    <p>{{ questionGroup[0].category.desc }}</p>
                    <hr class="border-0 border-b-4 border-solid border-orange-500 rounded-full w-7/12" />
                </div>
                <ul class="flex flex-col gap-4">
                    <li class="question_box flex flex-col gap-4 p-4 md:p-6 w-full bg-orange-200 rounded-3xl" v-for="(question, j) in questionGroup" :key="j">
                        <h5 class="flex items-center gap-3 w-full">
                            <b class="kalameh_bold text-2xl flex-shrink-0">{{ j + 1 }}</b>
                            <strong class="text-lg bg-white rounded-lg p-2 flex-grow">{{ question.question }}</strong>
                        </h5>
                        <ol class="flex flex-col gap-4">
                            <li
                                class="flex items-center gap-2 cursor-pointer select-none"
                                v-for="(answer, k) in question.answers"
                                :key="k"
                                v-show="!!answer.text"
                                @click="question.check = k"
                            >
                                <div class="flex items-center justify-center w-5 h-5 rounded-full shadow-lg bg-white">
                                    <transition name="check" mode="out-in" appear>
                                        <span class="w-3 h-3 rounded-full bg-orange-400" v-if="question.check == k"></span>
                                    </transition>
                                </div>
                                <span class="text-sm opacity-75">{{ answer.text }}</span>
                            </li>
                        </ol>
                    </li>
                </ul>
            </li>
        </ul>
        <button
            class="flex items-center gap-1 border-2 border-solid border-gray-300 bg-warmgray-600 text-white p-2.5 px-4 rounded-xl hover:shadow-lg"
            @click="showResults()"
        >
            نمایش نتیجه
        </button>

        <QuestionResultDialog :open.sync="resultsDialogOpenState" :results="results" :totalPoints="totalPoints" />
    </main>
</template>

<script>
import axios from "axios";
import Loading from "~/components/Loading.vue";
import getMetadata from "~/mixins/getMetadata";
import QuestionResultDialog from "~/components/web/roadmap/QuestionResultDialog.vue";

export default {
    head() {
        return { title: this.metadata.title, meta: [...this.metadata.meta], link: [...this.metadata.link] };
    },
    mixins: [getMetadata],
    components: {
        Loading,
        QuestionResultDialog,
    },
    data() {
        return {
            questionGroups: [],
            questionsLoading: false,

            totalPoints: 0,
            results: {},
            resultsDialogOpenState: false,
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await Promise.all([this.getMetadata("ask-me"), this.getQuestions({ headers })]);
    },
    methods: {
        async getQuestions(data = {}) {
            if (this.questionsLoading) return;
            this.questionsLoading = true;

            let url = `/api/roadmap-questions`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            await axios
                .get(encodeURI(url), { headers })
                .then((results) => (this.questionGroups = results.data.questions))
                .catch((e) => {})
                .finally(() => (this.questionsLoading = false));
        },

        showResults() {
            const majors = {};
            let totalPoints = 0;
            for (const groupId in this.questionGroups) {
                const questionGroup = this.questionGroups[groupId];
                for (let j = 0; j < questionGroup.length; j++) {
                    const question = questionGroup[j];
                    if (!question.answers[question.check]) continue;
                    for (let k = 0; k < question.answers[question.check].majorPoints.length; k++) {
                        const majorPoint = question.answers[question.check].majorPoints[k];
                        if (!majors[majorPoint.major]) majors[majorPoint.major] = { points: 0, percent: 0 };
                        majors[majorPoint.major].points += parseInt(majorPoint.point);
                        totalPoints += parseInt(majorPoint.point);
                    }
                }
            }

            this.resultsDialogOpenState = true;
            this.results = majors;
            this.totalPoints = totalPoints;
        },
    },
};
</script>
