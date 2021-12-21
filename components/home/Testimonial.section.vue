<style scoped>
.card {
    background-color: var(--testimonial-section-card-bg-color);
    color: var(--testimonial-section-card-color);
}
</style>

<template>
    <section class="relative flex flex-col gap-8 w-full" id="testimonials">
        <div class="flex flex-wrap justify-between gap-8 w-full">
            <h2 class="font-bold text-4xl">نظرات دانشجویان پرتقال</h2>
        </div>
        <div v-swiper="testimonialsSwiperOptions" class="w-full max-w-screen-4xl select-none overflow-hidden">
            <ul class="swiper-wrapper flex items-start">
                <li
                    class="swiper-slide blur card shadow-lg flex flex-col items-center gap-8 p-16 rounded-3xl max-w-screen-2sm z-10 ml-10"
                    v-for="(testimonial, i) in testimonials"
                    :key="i"
                >
                    <img class="mr-auto" src="/misc/comma.svg" alt="comma" width="34" />
                    <p class="">
                        اطلاعات رو بهتون میده،توی اینستا میخونم، اونجا قبلا خوندم، از بیس، یعنی من هرچی توی یوتیوب میبینم، هرچی اطلاعات دوره iu و xu که وااقعا کامله
                        به نظرم
                    </p>
                    <div class="flex items-center gap-3">
                        <img class="border-2 border-solid border-orange-500 rounded-full" src="/misc/Figma.svg" alt="Figma" width="78" height="78" />
                        <div class="flex flex-col gap-2">
                            <b class="text-xl">محمد گودرزی</b>
                            <span class="text-pink-300">برنامه نویس</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
export default {
    name: "TestimonialSection",
    data() {
        return {
            testimonials: ["", "", "", "", "", "", ""],
            testimonialsSwiperOptions: {
                autoplay: false,
                slidesPerView: "auto",
                initialSlide: 0,
                // spaceBetween: 46,
                loop: true,
                freeMode: true,
            },
        };
    },
};
</script>
