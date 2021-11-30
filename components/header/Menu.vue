<style scoped>
.header_nav_container {
    background-color: var(--header-nav-container-bg-color);
    max-height: initial;
    position: absolute;
    top: 7rem;
    right: 0;
}

.nav_toggle {
    background-color: var(--header-nav-container-bg-color);
}

@media (min-width: 1024px) {
    .menu {
        display: flex !important;
    }
    .header_nav_container {
        max-height: 4em;
        position: relative;
        top: initial;
        right: initial;
    }
}
</style>

<template>
    <div class="flex items-center gap-4 w-max lg:w-full">
        <button class="nav_toggle blur flex justify-center items-center p-6 rounded-3xl shadow-lg lg:hidden" @click="open = !open">
            <img src="/icons/Category.svg" width="24" alt="Category" />
        </button>
        <div class="header_nav_container menu blur w-full flex flex-wrap items-start md:items-center gap-1 lg:gap-8 p-8 py-0 rounded-3xl shadow-lg" v-show="open">
            <nav>
                <ul class="flex flex-wrap md:flex-nowrap items-center gap-8 py-4 md:p-0">
                    <li
                        class="flex items-center gap-1 md:py-4 cursor-pointer"
                        @mouseover="departmentsDropdownOpenState = true"
                        @mouseleave="departmentsDropdownOpenState = false"
                    >
                        <img src="/icons/Category.svg" width="24" alt="Category" />
                        <span>دپارتمان ها</span>
                        <DepartmentDropdown class="z-10" :open.sync="departmentsDropdownOpenState" />
                    </li>

                    <li class="flex items-center gap-1 md:py-4">
                        <span>وبلاگ</span>
                    </li>
                    <li class="flex items-center gap-1 md:py-4">
                        <span>تماس با ما</span>
                    </li>
                    <li class="flex items-center gap-1 md:py-4">
                        <span>درباره ما</span>
                    </li>
                    <li class="flex items-center gap-1 md:py-4">
                        <span>از کجا شروع کنم؟</span>
                    </li>
                </ul>
            </nav>
            <ul class="flex items-center gap-2 xl:gap-4 flex-shrink-0 mr-auto ml-0">
                <li class="p-4 px-2" @mouseover="searchDropdownOpenState = true" @mouseleave="searchDropdownOpenState = false">
                    <img src="/icons/Search.svg" width="28" height="28" alt="Search" />
                    <SearchDropdown class="z-10" :open.sync="searchDropdownOpenState" />
                </li>
                <li class="p-4 px-2" @mouseover="cartDropdownOpenState = true" @mouseleave="cartDropdownOpenState = false">
                    <img src="/icons/Buy.svg" width="28" height="28" alt="Buy" />
                    <CartDropdown class="z-10" :open.sync="cartDropdownOpenState" />
                </li>
                <li class="p-4 px-2" @mouseover="profileDropdownOpenState = true" @mouseleave="profileDropdownOpenState = false">
                    <img src="/icons/Profile.svg" width="28" height="28" alt="Profile" />
                    <ProfileDropdown class="z-10" :open.sync="profileDropdownOpenState" />
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import DepartmentDropdown from "~/components/header/DepartmentDropdown";
import SearchDropdown from "~/components/header/SearchDropdown";
import CartDropdown from "~/components/header/CartDropdown";
import ProfileDropdown from "~/components/header/ProfileDropdown";

export default {
    components: {
        DepartmentDropdown,
        SearchDropdown,
        CartDropdown,
        ProfileDropdown,
    },
    data() {
        return {
            open: false,

            departmentsDropdownOpenState: false,
            cartDropdownOpenState: false,
            profileDropdownOpenState: false,
            searchDropdownOpenState: false,
        };
    },
    mounted() {},
    methods: {},
};
</script>
