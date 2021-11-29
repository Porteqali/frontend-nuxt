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
    background-color: #F2F6FF;
}

header {
    color: var(--header-nav-text-color);
}
.header_nav_container {
    background-color: var(--header-nav-container-bg-color);
    max-height: 4em;
}
</style>

<template>
    <div class="relative flex flex-col items-center h-screen" dir="rtl">
        <header class="flex items-center gap-8 p-8 w-full max-w-screen-2xl z-10">
            <div class="flex-shrink-0">
                <img src="/logo_white.png" alt="پرتقال" />
            </div>
            <div class="header_nav_container blur w-full flex flex-wrap items-center gap-20 p-8 py-0 rounded-3xl shadow-lg">
                <nav>
                    <ul class="flex items-center gap-8">
                        <li
                            class="flex items-center gap-1 py-4 cursor-pointer"
                            @mouseover="departmentsDropdownOpenState = true"
                            @mouseleave="departmentsDropdownOpenState = false"
                        >
                            <img src="/icons/Category.svg" width="24" alt="Category" class="text-black" />
                            <span>دپارتمان ها</span>
                            <DepartmentDropdown :open.sync="departmentsDropdownOpenState" />
                        </li>

                        <li class="flex items-center gap-1 py-4">
                            <span>وبلاگ</span>
                        </li>
                        <li class="flex items-center gap-1 py-4">
                            <span>تماس با ما</span>
                        </li>
                        <li class="flex items-center gap-1 py-4">
                            <span>درباره ما</span>
                        </li>
                        <li class="flex items-center gap-1 py-4">
                            <span>از کجا شروع کنم؟</span>
                        </li>
                    </ul>
                </nav>
                <ul class="flex items-center gap-4 flex-shrink-0 mr-auto ml-0">
                    <li class="p-4 px-2" @mouseover="searchDropdownOpenState = true" @mouseleave="searchDropdownOpenState = false">
                        <img src="/icons/Search.svg" width="28" height="28" alt="Search" />
                        <SearchDropdown :open.sync="searchDropdownOpenState" />
                    </li>
                    <li class="p-4 px-2" @mouseover="cartDropdownOpenState = true" @mouseleave="cartDropdownOpenState = false">
                        <img src="/icons/Buy.svg" width="28" height="28" alt="Buy" />
                        <CartDropdown :open.sync="cartDropdownOpenState" />
                    </li>
                    <li class="p-4 px-2" @mouseover="profileDropdownOpenState = true" @mouseleave="profileDropdownOpenState = false">
                        <img src="/icons/Profile.svg" width="28" height="28" alt="Profile" />
                        <ProfileDropdown :open.sync="profileDropdownOpenState" />
                    </li>
                </ul>
            </div>
        </header>

        <Nuxt nuxt-child-key="default" />

        <div>
            <footer></footer>
        </div>
    </div>
</template>

<script>
import DepartmentDropdown from "~/components/header/DepartmentDropdown";
import SearchDropdown from "~/components/header/SearchDropdown";
import CartDropdown from "~/components/header/CartDropdown";
import ProfileDropdown from "~/components/header/ProfileDropdown";

export default {
    name: "Default.layout",
    head: {
        title: "گروه آموزشی پرتقال",
        meta: [{ hid: "description", name: "description", content: "گروه آموزشی پرتقال" }],
    },
    components: {
        DepartmentDropdown,
        SearchDropdown,
        CartDropdown,
        ProfileDropdown,
    },
    data() {
        return {
            departmentsDropdownOpenState: false,
            cartDropdownOpenState: false,
            profileDropdownOpenState: false,
            searchDropdownOpenState: false,
        };
    },
};
</script>
