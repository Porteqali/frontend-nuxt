<style>
body {
    font-family: "IranYekanRegular";
    /* max-width: 1680px; */
    margin: 0 auto;
    width: 100%;
    height: 100vh;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 0;
}

header{
    color: var(--header-nav-text-color);
}
</style>

<template>
    <div class="relative flex flex-col h-screen" dir="rtl">
        <header class="flex items-center gap-20 p-8 w-full max-w-screen-4xl z-10">
            <div class="flex-shrink-0">
                <img src="/logo_white.png" alt="پرتقال" />
            </div>
            <nav>
                <ul class="flex items-center gap-8">
                    <li class="flex items-center gap-1">
                        <img src="/icons/Category.svg" width="28" alt="Category" />
                        <span>دپارتمان ها</span>
                    </li>
                    <li class="flex items-center gap-1">
                        <span>وبلاگ</span>
                    </li>
                    <li class="flex items-center gap-1">
                        <span>تماس با ما</span>
                    </li>
                    <li class="flex items-center gap-1">
                        <span>درباره ما</span>
                    </li>
                    <li class="flex items-center gap-1">
                        <span>از کجا شروع کنم؟</span>
                    </li>
                </ul>
            </nav>
            <ul class="flex items-center gap-8">
                <li>
                    <img src="/icons/Search.svg" width="28" height="28" alt="Search" />
                </li>
                <li>
                    <img src="/icons/Buy.svg" width="28" height="28" alt="Buy" />
                </li>
                <li>
                    <img src="/icons/Profile.svg" width="28" height="28" alt="Profile" />
                </li>
            </ul>
        </header>

        <Nuxt nuxt-child-key="default" />
    </div>
</template>

<script>
export default {
    name: "Default.layout",
    head: {
        title: "گروه آموزشی پرتقال",
        meta: [{ hid: "description", name: "description", content: "گروه آموزشی پرتقال" }],
    },
};
</script>
