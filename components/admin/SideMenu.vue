<style scoped>
.side_nav {
    position: absolute;
    width: 100%;
    max-width: 280px;
    height: calc(100vh - 7rem);
    background-color: #ffffffbb;
    color: #000;
    z-index: 20;
}
.side_nav ul {
    overflow-y: auto;
    overflow-x: hidden;
}
.side_nav li:hover > a,
.nuxt-link-exact-active {
    box-shadow: 0px 8px 12px rgba(0, 0, 0, 10%);
    background-color: #cfcfcf;
}

.submenu {
    width: calc(100% - 1.25rem);
    border-right: 2px solid #aaa;
    padding-inline-start: 1rem;
    margin-inline-start: 1.25rem;
    overflow: initial !important;
}

@media (min-width: 768px) {
    .side_nav {
        position: relative !important;
        /* max-width: 250px; */
    }
}
</style>

<template>
    <transition name="slideleft" appear="">
        <nav class="side_nav blur flex flex-col gap-4 p-2 rounded-3xl shadow-lg" v-show="sideMenuOpen">
            <ul class="flex flex-col p-1 w-full h-full flex-grow text-sm" v-clickaway:sidenav_toggler="menuOnBlur">
                <li class="flex w-full">
                    <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin">
                        <img src="/icons/admin/Home.svg" width="24" alt="Home" />
                        <span>داشبورد</span>
                    </nuxt-link>
                </li>

                <hr class="w-11/12 mx-auto my-2 border-gray-400" />

                <li
                    class="flex w-full p-2 rounded-xl cursor-pointer hover:shadow-md"
                    @click="openGroup('admins')"
                    v-if="checkPermissions(['admin.list.view', 'admin.permissions.view'], userPermissions, 'OR')"
                >
                    <div class="flex items-center gap-2 w-full">
                        <img src="/icons/admin/ShieldDone.svg" width="24" />
                        <b>مدیریت ادمین ها</b>
                    </div>
                    <img class="mr-auto" src="/icons/ArrowDown.line.svg" width="16" />
                </li>
                <transition name="accordiondown" appear>
                    <ul class="submenu flex flex-col gap-1 py-1" v-show="openedGroup.includes('admins')" name="admins">
                        <li class="" v-if="checkPermissions(['admin.list.view'], userPermissions)">
                            <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/list">
                                <img src="/icons/admin/Users2.svg" width="24" />
                                <span>لیست ادمین ها</span>
                            </nuxt-link>
                        </li>
                        <li class="" v-if="checkPermissions(['admin.permissions.view'], userPermissions)">
                            <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/permissions">
                                <img src="/icons/admin/ShieldDone.svg" width="24" />
                                <span>دسترسی ها</span>
                            </nuxt-link>
                        </li>
                    </ul>
                </transition>

                <li
                    class="flex w-full p-2 rounded-xl cursor-pointer hover:shadow-md"
                    @click="openGroup('marketers')"
                    v-if="checkPermissions([], userPermissions, 'OR')"
                >
                    <div class="flex items-center gap-2 w-full">
                        <img src="/icons/admin/Users2.svg" width="24" />
                        <b>مدیریت بازاریابان</b>
                    </div>
                    <img class="mr-auto" src="/icons/ArrowDown.line.svg" width="16" />
                </li>
                <transition name="accordiondown" appear>
                    <ul class="submenu flex flex-col gap-1 py-1" v-show="openedGroup.includes('marketers')" name="marketers">
                        <li class="" v-if="checkPermissions([], userPermissions)">
                            <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/marketers">لیست بازاریابان</nuxt-link>
                        </li>
                        <li class="" v-if="checkPermissions([], userPermissions)">
                            <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/marketers-commissions">لیست کمیسیون ها</nuxt-link>
                        </li>
                        <li class="" v-if="checkPermissions([], userPermissions)">
                            <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/marketers-commission-payments">پرداخت کمیسیون</nuxt-link>
                        </li>
                    </ul>
                </transition>

                <li class="flex w-full p-2 rounded-xl cursor-pointer hover:shadow-md" @click="openGroup('users')" v-if="checkPermissions([], userPermissions, 'OR')">
                    <div class="flex items-center gap-2 w-full">
                        <img src="/icons/admin/Users3.svg" width="24" />
                        <b>مدیریت کاربران</b>
                    </div>
                    <img class="mr-auto" src="/icons/ArrowDown.line.svg" width="16" />
                </li>
                <transition name="accordiondown" appear>
                    <ul class="submenu flex flex-col gap-1 py-1" v-show="openedGroup.includes('users')" name="users">
                        <li class="" v-if="checkPermissions([], userPermissions)">
                            <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/users">لیست کاربران</nuxt-link>
                        </li>
                        <li class="" v-if="checkPermissions([], userPermissions)">
                            <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/users-comments">نظرات کاربران</nuxt-link>
                        </li>
                    </ul>
                </transition>

                <li class="flex w-full">
                    <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/teachers">
                        <img src="/icons/admin/Teacher.svg" width="24" />
                        <span>مدیریت اساتید</span>
                    </nuxt-link>
                </li>

                <li class="flex w-full">
                    <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/user-groups">
                        <img src="/icons/Wallet.gray.svg" width="24" />
                        <span>گروه کاربران</span>
                    </nuxt-link>
                </li>

                <hr class="w-11/12 mx-auto my-2 border-gray-400" />

                <li
                    class="flex w-full p-2 rounded-xl cursor-pointer hover:shadow-md"
                    @click="openGroup('courses')"
                    v-if="checkPermissions([], userPermissions, 'OR')"
                >
                    <div class="flex items-center gap-2 w-full">
                        <img src="/icons/admin/Play.svg" width="24" />
                        <b>مدیریت دوره ها</b>
                    </div>
                    <img class="mr-auto" src="/icons/ArrowDown.line.svg" width="16" />
                </li>
                <transition name="accordiondown" appear>
                    <ul class="submenu flex flex-col gap-1 py-1" v-show="openedGroup.includes('courses')" name="courses">
                        <li class="" v-if="checkPermissions([], userPermissions)">
                            <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/courses">لیست دوره ها</nuxt-link>
                        </li>
                        <li class="" v-if="checkPermissions([], userPermissions)">
                            <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/course-groups">گروه دوره ها</nuxt-link>
                        </li>
                    </ul>
                </transition>

                <hr class="w-11/12 mx-auto my-2 border-gray-400" />

                <li
                    class="flex w-full p-2 rounded-xl cursor-pointer hover:shadow-md"
                    @click="openGroup('finance')"
                    v-if="checkPermissions([], userPermissions, 'OR')"
                >
                    <div class="flex items-center gap-2 w-full">
                        <img src="/icons/admin/Document.svg" width="24" />
                        <b>مدیریت مالی</b>
                    </div>
                    <img class="mr-auto" src="/icons/ArrowDown.line.svg" width="16" />
                </li>
                <transition name="accordiondown" appear>
                    <ul class="submenu flex flex-col gap-1 py-1" v-show="openedGroup.includes('finance')" name="finance">
                        <li class="" v-if="checkPermissions([], userPermissions)">
                            <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/transitions">لیست تراکنش ها</nuxt-link>
                        </li>
                        <li class="" v-if="checkPermissions([], userPermissions)">
                            <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/commissions">کمیسیون ها</nuxt-link>
                        </li>
                        <li class="" v-if="checkPermissions([], userPermissions)">
                            <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/discounts">تخفیف ها</nuxt-link>
                        </li>
                    </ul>
                </transition>

                <li
                    class="flex w-full p-2 rounded-xl cursor-pointer hover:shadow-md"
                    @click="openGroup('usances')"
                    v-if="checkPermissions([], userPermissions, 'OR')"
                >
                    <div class="flex items-center gap-2 w-full">
                        <img src="/icons/admin/Discount.svg" width="24" />
                        <b>مدیریت سررسید ها</b>
                    </div>
                    <img class="mr-auto" src="/icons/ArrowDown.line.svg" width="16" />
                </li>
                <transition name="accordiondown" appear>
                    <ul class="submenu flex flex-col gap-1 py-1" v-show="openedGroup.includes('usances')" name="usances">
                        <li class="" v-if="checkPermissions([], userPermissions)">
                            <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/usance-settings">تنظیمات سررسید</nuxt-link>
                        </li>
                        <li class="" v-if="checkPermissions([], userPermissions)">
                            <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/usances">لیست سررسید ها</nuxt-link>
                        </li>
                        <li class="" v-if="checkPermissions([], userPermissions)">
                            <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/usance-payments">پرداختی های سررسید</nuxt-link>
                        </li>
                    </ul>
                </transition>

                <hr class="w-11/12 mx-auto my-2 border-gray-400" />

                <li class="flex w-full">
                    <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/collaborate-requests">
                        <img src="/icons/admin/HandShake.svg" width="24" />
                        <span>همکاری با ما</span>
                    </nuxt-link>
                </li>
                <li class="flex w-full">
                    <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/contact-us-requests">
                        <img src="/icons/admin/Calling.svg" width="24" />
                        <span>تماس با ما</span>
                    </nuxt-link>
                </li>

                <hr class="w-11/12 mx-auto my-2 border-gray-400" />

                <li class="flex w-full">
                    <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/articles">
                        <img src="/icons/admin/Blog.svg" width="24" />
                        <span>مقالات</span>
                    </nuxt-link>
                </li>
                <li class="flex w-full">
                    <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/faqs">
                        <img src="/icons/admin/Question.svg" width="24" />
                        <span>سوالات متداول</span>
                    </nuxt-link>
                </li>
                <li class="flex w-full">
                    <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/testimonials">
                        <img src="/icons/admin/Chat.svg" width="24" />
                        <span>نظرات نمایشی</span>
                    </nuxt-link>
                </li>

                <hr class="w-11/12 mx-auto my-2 border-gray-400" />

                <li class="flex w-full">
                    <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/contact-info">
                        <img src="/icons/admin/InfoCircle.svg" width="24" />
                        <span>اطلاعات تماس</span>
                    </nuxt-link>
                </li>

                <li class="flex w-full p-2 rounded-xl cursor-pointer hover:shadow-md" @click="openGroup('pages')" v-if="checkPermissions([], userPermissions, 'OR')">
                    <div class="flex items-center gap-2 w-full">
                        <img src="/icons/admin/Discount.svg" width="24" />
                        <b>مدیریت صفحات</b>
                    </div>
                    <img class="mr-auto" src="/icons/ArrowDown.line.svg" width="16" />
                </li>
                <transition name="accordiondown" appear>
                    <ul class="submenu flex flex-col gap-1 py-1" v-show="openedGroup.includes('pages')" name="pages">
                        <li class="" v-if="checkPermissions([], userPermissions)">
                            <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/page/about-us">درباره ما</nuxt-link>
                        </li>
                        <li class="" v-if="checkPermissions([], userPermissions)">
                            <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/page/collaborate">همکاری با ما</nuxt-link>
                        </li>
                    </ul>
                </transition>
            </ul>
            <button class="flex items-center gap-2 p-2 mb-2 w-full rounded-xl bg-red-100 border-2 border-solid border-rose-300">
                <img src="/icons/Logout.gray.svg" width="24" />
                <span class="text-rose-800">خروج</span>
            </button>
        </nav>
    </transition>
</template>

<script>
import permissionCheck from "~/mixins/permissionCheck";

export default {
    mixins: [permissionCheck],
    data() {
        return {
            openedGroup: "",
        };
    },
    mounted() {
        if (screen.width <= 768) {
            this.$store.commit("admin_panel/sideMenuToggle", false);
        } else this.$store.commit("admin_panel/sideMenuToggle", true);
    },
    beforeDestroy() {
        this.$store.commit("admin_panel/sideMenuToggle", false);
    },
    computed: {
        sideMenuOpen() {
            return this.$store.state.admin_panel.sideMenuOpen;
        },
        userPermissions() {
            return this.$store.state.user.info.permissions;
        },
    },
    methods: {
        menuOnBlur() {
            if (screen.width <= 768 && !!this.sideMenuOpen) this.$store.commit("admin_panel/sideMenuToggle", false);
        },

        openGroup(groupName) {
            if (this.openedGroup == groupName) this.openedGroup = "";
            else this.openedGroup = groupName;
        },
    },
};
</script>
