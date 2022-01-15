<style scoped>
.rating {
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    width: 100%;
    overflow: hidden;
    position: relative;
}
.rating > input {
    display: none;
}
.rating > label {
    cursor: pointer;
    width: 40px;
    height: 40px;
    margin-top: auto;
    background-image: url("/icons/Star.orange.line.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 76%;
    transition: 0.3s;
}
.rating > input:checked ~ label,
.rating > input:checked ~ label ~ label {
    background-image: url("/icons/Star.orange.fill.svg");
}

.rating > input:not(:checked) ~ label:hover,
.rating > input:not(:checked) ~ label:hover ~ label {
    background-image: url("/icons/Star.orange.fill.svg");
    transform: scale(1.1, 1.1);
}
</style>

<template>
    <div class="rating">
        <input type="radio" name="rating" v-model="score" value="8" id="rating-8" />
        <label for="rating-8"></label>
        <input type="radio" name="rating" v-model="score" value="7" id="rating-7" />
        <label for="rating-7"></label>
        <input type="radio" name="rating" v-model="score" value="6" id="rating-6" />
        <label for="rating-6"></label>
        <input type="radio" name="rating" v-model="score" value="5" id="rating-5" />
        <label for="rating-5"></label>
        <input type="radio" name="rating" v-model="score" value="4" id="rating-4" />
        <label for="rating-4"></label>
        <input type="radio" name="rating" v-model="score" value="3" id="rating-3" />
        <label for="rating-3"></label>
        <input type="radio" name="rating" v-model="score" value="2" id="rating-2" />
        <label for="rating-2"></label>
        <input type="radio" name="rating" v-model="score" value="1" id="rating-1" />
        <label for="rating-1"></label>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Score",
    props: ["courseId", "userScore"],
    data() {
        return {
            score: this.userScore || 0,
            submitting: false,
        };
    },
    watch: {
        score(val) {
            this.submitScore();
        },
    },
    methods: {
        async submitScore() {
            if (this.submitting) return;
            this.submitting = true;

            await axios
                .post(`/api/course/${this.courseId}/score`, { score: this.score })
                .then((response) => {
                    // update the old score
                    this.$emit("update:score", response.data.newScore);
                })
                .catch((e) => (this.score = 0))
                .finally(() => (this.submitting = false));
        },
    },
};
</script>
