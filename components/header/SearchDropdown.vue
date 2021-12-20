<style scoped>
.box {
    position: absolute;
    top: 1.25rem;
    left: 0;
    background-color: var(--header-nav-container-bg-color);
    color: var(--header-nav-text-color);
}

.search_box {
    background-color: var(--header-nav-container-bg-color);
}

.tag {
    background-color: var(--header-nav-container-bg-color);
}

ul li:hover {
    transform: scale(1.05, 1.05);
}

@media (min-width: 768px) {
    .box {
        top: 3.75rem;
    }
}
</style>

<template>
    <transition class="" name="slideup" appear>
        <div class="box flex flex-col gap-4 p-6 blur rounded-3xl shadow-lg" v-show="open">
            <div class="search_box flex items-center gap-4 p-2 rounded-xl shadow-lg">
                <img class="flex-shrink-0 mr-2" src="/icons/Search.svg" width="24" height="24" alt="Search" />
                <input class="flex-grow outline-none bg-transparent" type="text" placeholder="جستجو" />
            </div>
            <div class="flex items-center gap-2">
                <h4 class="flex-shrink-0 text-lg">دوره های پیشنهادی</h4>
                <hr class="w-full opacity-50" />
            </div>
            <ul class="flex flex-col w-full">
                <li class="flex items-center gap-2 p-3">
                    <img src="/misc/Figma.svg" width="28" height="28" alt="" />
                    <span class="text-sm">دوره آموزش فتوشاپ</span>
                    <span class="rounded-md p-2 px-3 text-xs tag">3 ساعت</span>
                </li>
                <li class="flex items-center gap-2 p-3">
                    <img src="/misc/Figma.svg" width="28" height="28" alt="" />
                    <span class="text-sm">دوره آموزش فتوشاپ</span>
                    <span class="rounded-md p-2 px-3 text-xs tag">3 ساعت</span>
                </li>
                <li class="flex items-center gap-2 p-3">
                    <img src="/misc/Figma.svg" width="28" height="28" alt="" />
                    <span class="text-sm">دوره آموزش فتوشاپ</span>
                    <span class="rounded-md p-2 px-3 text-xs tag">3 ساعت</span>
                </li>
                <li class="flex items-center gap-2 p-3">
                    <img src="/misc/Figma.svg" width="28" height="28" alt="" />
                    <span class="text-sm">دوره آموزش فتوشاپ</span>
                    <span class="rounded-md p-2 px-3 text-xs tag">3 ساعت</span>
                </li>
            </ul>
            <div class="flex items-center gap-2">
                <h4 class="flex-shrink-0 text-lg">دسترسی سریع</h4>
                <hr class="w-full opacity-50" />
            </div>
            <ul class="flex flex-col w-full">
                <li class="">
                    <nuxt-link class="flex items-center gap-2 p-3" to="/department" title="departments">
                        <img src="/icons/Category.svg" width="24" height="24" alt="Category" />
                        <span class="text-sm">دپارتمان ها</span>
                    </nuxt-link>
                </li>
                <li class="">
                    <nuxt-link class="flex items-center gap-2 p-3" to="/blog" title="blog">
                        <img src="/icons/Document.gray.svg" width="24" height="24" alt="Document" />
                        <span class="text-sm">مقالات</span>
                    </nuxt-link>
                </li>
                <li class="">
                    <nuxt-link class="flex items-center gap-2 p-3" to="#" title="#">
                        <img src="/icons/Discovery.gray.svg" width="24" height="24" alt="Discovery" />
                        <span class="text-sm">از کجا شروع کنم؟</span>
                    </nuxt-link>
                </li>
            </ul>
        </div>
    </transition>
</template>

<script>
export default {
    name: "SearchDropdown",
    props: ["open"],
    components: {},
    data() {
        return {
            loading: false,
        };
    },
    methods: {
        updateOpenState(state) {
            this.$emit("update:open", state);
        },
    },
};
</script>
