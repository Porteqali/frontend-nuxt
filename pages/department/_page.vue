<style scoped>
.toggle_btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border: 2px solid var(--department-section-toggle-btn-border-color);
    background-color: var(--department-section-toggle-btn-bg-color);
    color: var(--department-section-toggle-btn-border-color);
}
.toggle_btn.fill {
    background-color: var(--department-section-toggle-btn-fill-bg-color);
    color: var(--department-section-toggle-btn-fill-color);
}

.title_alt_text {
    display: none;
    position: absolute !important;
    z-index: 2;
    opacity: 0;
    top: -3rem;
    background-color: var(--department-section-title-alt-text-bg-color);
    color: var(--department-section-title-alt-text-color);
    border-radius: 1rem;
    padding: 0.5rem 1rem;
}
.title_alt:hover + .title_alt_text {
    opacity: 1;
    display: inline-block;
}

.course_card {
    background-color: var(--department-section-title-alt-text-bg-color);
    color: var(--department-section-title-alt-text-color);
}
.course_card_img_box{
    min-width: 18rem;
}
.course_tag {
    background-color: var(--department-section-course-tag-bg-color);
    color: var(--department-section-course-tag-color);
}
</style>

<template>
    <section class="relative flex flex-col gap-8 w-full" id="department">
        <div class="flex flex-wrap justify-between gap-8 w-full">
            <div class="flex flex-wrap items-center gap-4">
                <button class="toggle_btn rounded-full">
                    <img src="/icons/FavouriteOutlineColor.purple.svg" width="24" height="24" alt="FavouriteOutlineColor" />
                    <span>محبوب ها</span>
                </button>
                <button class="toggle_btn fill rounded-full">
                    <img src="/icons/BookOpenOutlineColor.purple.svg" width="24" height="24" alt="BookOpenOutlineColor" />
                    <span>جدیدترین ها</span>
                </button>
            </div>
            <ul class="flex flex-wrap gap-4">
                <li class="relative flex items-center justify-center">
                    <img class="title_alt cursor-pointer" src="/misc/Figma.svg" width="48" height="48" alt="Figma" />
                    <span class="blur title_alt_text">امنیت</span>
                </li>
                <li class="relative flex items-center justify-center">
                    <img class="title_alt cursor-pointer" src="/misc/Figma.svg" width="48" height="48" alt="Figma" />
                    <span class="blur title_alt_text">امنیت</span>
                </li>
                <li class="relative flex items-center justify-center">
                    <img class="title_alt cursor-pointer" src="/misc/Figma.svg" width="48" height="48" alt="Figma" />
                    <span class="blur title_alt_text">امنیت</span>
                </li>
            </ul>
        </div>
        <ul class="flex flex-wrap items-start justify-center md:justify-evenly gap-4 2xl:gap-10 w-full">
            <li class="gray_gradient blur course_card shadow-lg flex flex-col gap-4 p-4 rounded-3xl max-w-screen-xs" v-for="(course, i) in courses" :key="i">
                <div class="course_card_img_box relative overflow-hidden rounded-xl w-full h-64">
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
    </section>
</template>

<script>
export default {
    name: "DepartmentSection",
    data() {
        return {
            courses: ["", "", "", "", "", "", "", "", "", ""],
        };
    },
};
</script>
