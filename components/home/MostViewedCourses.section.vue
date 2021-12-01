<style scoped>
.more_courses_btn {
    background-color: var(--department-section-title-alt-text-bg-color);
    color: var(--department-section-title-alt-text-color);
}

.course_card {
    background-color: var(--department-section-title-alt-text-bg-color);
    color: var(--department-section-title-alt-text-color);
}
.course_tag {
    background-color: var(--department-section-course-tag-bg-color);
    color: var(--department-section-course-tag-color);
}
</style>

<template>
    <section class="relative flex flex-col gap-8 w-full" id="department">
        <div class="flex flex-wrap justify-between gap-8 w-full">
            <h2 class="font-bold text-4xl">دوره های پر مخاطب</h2>
        </div>
        <div v-swiper="coursesSwiperOptions" class="w-full max-w-screen-4xl select-none overflow-hidden p-4">
            <ul class="swiper-wrapper flex items-start">
                <li class="swiper-slide course_card shadow-lg flex flex-col gap-4 p-4 rounded-2xl max-w-screen-xs" v-for="(course, i) in courses" :key="i">
                    <div class="relative overflow-hidden rounded-xl w-full h-64">
                        <img class="absolute inset-0 object-cover" src="/misc/course.png" alt="course" draggable="false" />
                        <img class="absolute top-2 right-2" src="/misc/Figma.svg" width="32" height="32" alt="Figma" />
                        <span class="course_tag flex items-center justify-center p-4 w-auto h-16 rounded-xl absolute top-2 left-2">جدید</span>
                    </div>
                    <div class="flex flex-col gap-4">
                        <h3 class="font-bold text-xl overflow-hidden overflow-ellipsis whitespace-nowrap">آموزش طراحی سایت</h3>
                        <div class="flex items-center gap-2">
                            <img src="/misc/Figma.svg" alt="Figma" width="40" height="40" />
                            <span>محمد گودرزی</span>
                        </div>
                        <div class="flex flex-wrap justify-between gap-4">
                            <span class="flex items-end gap-1">
                                <img src="/icons/TimeCircle.line.svg" alt="TimeCircle" width="20" height="20" />
                                <small>05:11:29</small>
                            </span>
                            <span class="flex items-end gap-1">
                                <img src="/icons/User.line.svg" alt="User" width="20" height="20" />
                                <small>425</small>
                            </span>
                            <span class="flex items-end gap-1">
                                <img src="/icons/Star.line.svg" alt="Star" width="20" height="20" />
                                <small>4 از 10 امتیاز</small>
                            </span>
                        </div>
                        <button class="orange_gradient_h flex items-center justify-center gap-4 py-4 px-8 rounded-xl">
                            <span>
                                <b class="text-3xl">50</b>
                                <span>هزار</span>
                                تومان
                            </span>
                            <img src="/icons/Buy.svg" alt="Buy" width="24" height="24" />
                        </button>
                    </div>
                </li>
            </ul>
        </div>
        <div class="flex items-center justify-center w-full">
            <button class="more_courses_btn blur flex items-center gap-2 py-3 px-6 rounded-xl w-max">
                <img src="/icons/BookOpenOutlineColor.orange.svg" width="24" height="24" alt="BookOpenOutlineColor" />
                <span>مشاهده همه دوره ها</span>
            </button>
        </div>
    </section>
</template>

<script>
export default {
    name: "MostViewedCoursesSection",
    data() {
        return {
            courses: ["", "", "", "", "", "", ""],
            coursesSwiperOptions: {
                autoplay: false,
                slidesPerView: "auto",
                initialSlide: 0,
                spaceBetween: 16,
                loop: false,
                freeMode: true,
            },
        };
    },
};
</script>
