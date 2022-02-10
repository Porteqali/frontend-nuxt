<style scoped>
.side_nav {
    position: fixed;
    width: 100%;
    max-width: 280px;
    height: calc(100vh - 7rem);
    background-color: #222222de;
    /* backdrop-filter: blur(10px); */
    color: #ddd;
    z-index: 20;
}

.side_nav ul {
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-color: #888 transparent !important;
    scrollbar-width: thin !important;
}
.side_nav ul::-webkit-scrollbar {
    width: 2px;
}

.side_nav li:hover > a,
.nuxt-link-active {
    /* box-shadow: 0px 8px 12px rgba(0, 0, 0, 10%); */
    background-color: #606060;
}

.menu_icon {
    /* background-color: #f1f1f1;
    padding: .15rem;
    border-radius: .25rem; */
    width: 1.5rem;
    height: 1.5rem;
    filter: invert(1);
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
        /* position: relative !important; */
        position: sticky !important;
        top: 6rem;
    }
}
</style>

<template>
    <transition name="slideleft" appear="">
        <nav class="side_nav flex flex-col gap-4 p-2 rounded-2xl shadow-2xl" v-show="sideMenuOpen">
            <ul class="flex flex-col p-1 gap-1 w-full h-full flex-grow text-sm" v-clickaway:sidenav_toggler="menuOnBlur">
                <li class="flex w-full">
                    <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/dashboard">
                        <img src="/icons/admin/Home.svg" class="menu_icon" width="24" />
                        <span>داشبورد</span>
                    </nuxt-link>
                </li>

                <hr class="w-11/12 mx-auto my-1 border-gray-600" />

                <li
                    class="flex w-full p-2 rounded-xl cursor-pointer hover:bg-gray-600"
                    @click="openGroup('admins')"
                    v-if="checkPermissions(['admin.list.view', 'admin.permissions.view'], userPermissions, 'OR')"
                >
                    <div class="flex items-center gap-2 w-full">
                        <img src="/icons/admin/ShieldDone.svg" class="menu_icon" width="24" />
                        <span>مدیریت ادمین ها</span>
                    </div>
                    <img class="mr-auto" src="/icons/Arrow.white.svg" width="8" />
                </li>
                <transition name="accordiondown" appear>
                    <ul class="submenu flex flex-col gap-1 py-1" v-show="openedGroup.includes('admins')" name="admins">
                        <li class="" v-if="checkPermissions(['admin.list.view'], userPermissions)">
                            <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/list">
                                <img src="/icons/admin/Users2.svg" class="menu_icon" width="24" />
                                <span>لیست ادمین ها</span>
                            </nuxt-link>
                        </li>
                        <li class="" v-if="checkPermissions(['admin.permissions.view'], userPermissions)">
                            <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/permissions">
                                <img src="/icons/admin/ShieldDone.svg" class="menu_icon" width="24" />
                                <span>دسترسی ها</span>
                            </nuxt-link>
                        </li>
                    </ul>
                </transition>

                <li class="flex w-full" v-if="checkPermissions(['admin.marketers.view'], userPermissions)">
                    <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/marketers">
                        <img src="/icons/admin/Users2.svg" class="menu_icon" width="24" />
                        <span>مدیریت بازاریابان</span>
                    </nuxt-link>
                </li>

                <li
                    class="flex w-full p-2 rounded-xl cursor-pointer hover:bg-gray-600"
                    @click="openGroup('users')"
                    v-if="checkPermissions(['admin.users.view', 'admin.users-comments.view'], userPermissions, 'OR')"
                >
                    <div class="flex items-center gap-2 w-full">
                        <img src="/icons/admin/Users3.svg" class="menu_icon" width="24" />
                        <span>مدیریت کاربران</span>
                    </div>
                    <img class="mr-auto" src="/icons/Arrow.white.svg" width="8" />
                </li>
                <transition name="accordiondown" appear>
                    <ul class="submenu flex flex-col gap-1 py-1" v-show="openedGroup.includes('users')" name="users">
                        <li class="" v-if="checkPermissions(['admin.users.view'], userPermissions)">
                            <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/users">
                                <img src="/icons/admin/Users2.svg" class="menu_icon" width="24" />
                                <span>لیست کاربران</span>
                            </nuxt-link>
                        </li>
                        <li class="" v-if="checkPermissions(['admin.users-comments.view'], userPermissions)">
                            <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/users-comments">
                                <img src="/icons/admin/Chat.svg" class="menu_icon" width="24" />
                                <span>نظرات کاربران</span>
                            </nuxt-link>
                        </li>
                    </ul>
                </transition>

                <li class="flex w-full" v-if="checkPermissions(['admin.teachers.view'], userPermissions)">
                    <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/teachers">
                        <img src="/icons/admin/Teacher.svg" class="menu_icon" width="24" />
                        <span>مدیریت اساتید</span>
                    </nuxt-link>
                </li>

                <hr class="w-11/12 mx-auto my-1 border-gray-600" />

                <li
                    class="flex w-full p-2 rounded-xl cursor-pointer hover:bg-gray-600"
                    @click="openGroup('courses')"
                    v-if="checkPermissions(['admin.courses.view', 'admin.course-groups.view'], userPermissions, 'OR')"
                >
                    <div class="flex items-center gap-2 w-full">
                        <img src="/icons/admin/Play.svg" class="menu_icon" width="24" />
                        <span>مدیریت دوره ها</span>
                    </div>
                    <img class="mr-auto" src="/icons/Arrow.white.svg" width="8" />
                </li>
                <transition name="accordiondown" appear>
                    <ul class="submenu flex flex-col gap-1 py-1" v-show="openedGroup.includes('courses')" name="courses">
                        <li class="" v-if="checkPermissions(['admin.courses.view'], userPermissions)">
                            <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/courses">
                                <img src="/icons/admin/List.svg" class="menu_icon" width="24" />
                                <span>لیست دوره ها</span>
                            </nuxt-link>
                        </li>
                        <li class="" v-if="checkPermissions(['admin.course-groups.view'], userPermissions)">
                            <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/course-groups">
                                <img src="/icons/admin/WorkBag.svg" class="menu_icon" width="24" />
                                <span>گروه دوره ها</span>
                            </nuxt-link>
                        </li>
                    </ul>
                </transition>

                <hr class="w-11/12 mx-auto my-1 border-gray-600" />

                <li
                    class="flex w-full p-2 rounded-xl cursor-pointer hover:bg-gray-600"
                    @click="openGroup('finance')"
                    v-if="
                        checkPermissions(['admin.commissions.view', 'admin.discounts.view'], userPermissions, 'OR') ||
                        checkPermissions(['admin.wallet-transactions.view', 'admin.course-transactions.view'], userPermissions, 'OR')
                    "
                >
                    <div class="flex items-center gap-2 w-full">
                        <img src="/icons/admin/Usd.svg" class="menu_icon" width="24" />
                        <span>مدیریت مالی</span>
                    </div>
                    <img class="mr-auto" src="/icons/Arrow.white.svg" width="8" />
                </li>
                <transition name="accordiondown" appear>
                    <ul class="submenu flex flex-col gap-1 py-1" v-show="openedGroup.includes('finance')" name="finance">
                        <li class="" v-if="checkPermissions(['admin.course-transactions.view'], userPermissions)">
                            <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/course-transactions">
                                <img src="/icons/admin/Receipt.svg" class="menu_icon" width="24" />
                                <span>تراکنش های خرید دوره</span>
                            </nuxt-link>
                        </li>
                        <li class="" v-if="checkPermissions(['admin.wallet-transactions.view'], userPermissions)">
                            <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/wallet-transactions">
                                <img src="/icons/admin/Receipt.svg" class="menu_icon" width="24" />
                                <span>تراکنش های شارژ کیف پول</span>
                            </nuxt-link>
                        </li>
                        <li class="" v-if="checkPermissions(['admin.commissions.view'], userPermissions)">
                            <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/commissions">
                                <img src="/icons/admin/SackDollar.svg" class="menu_icon" width="24" />
                                <span>کمیسیون ها</span>
                            </nuxt-link>
                        </li>
                        <li class="" v-if="checkPermissions(['admin.discounts.view'], userPermissions)">
                            <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/discounts">
                                <img src="/icons/admin/BadgePercent.svg" class="menu_icon" width="24" />
                                <span>تخفیف ها</span>
                            </nuxt-link>
                        </li>
                    </ul>
                </transition>

                <!-- <li class="flex w-full p-2 rounded-xl cursor-pointer hover:bg-gray-600" @click="openGroup('usances')">
                    <div class="flex items-center gap-2 w-full">
                        <img src="/icons/admin/Discount.svg" class="menu_icon" width="24" />
                        <span>مدیریت سررسید ها</span>
                    </div>
                    <img class="mr-auto" src="/icons/Arrow.white.svg" width="8" />
                </li>
                <transition name="accordiondown" appear>
                    <ul class="submenu flex flex-col gap-1 py-1" v-show="openedGroup.includes('usances')" name="usances">
                        <li class="">
                            <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/usance-settings">تنظیمات سررسید</nuxt-link>
                        </li>
                        <li class="">
                            <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/usances">لیست سررسید ها</nuxt-link>
                        </li>
                        <li class="">
                            <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/usance-payments">پرداختی های سررسید</nuxt-link>
                        </li>
                    </ul>
                </transition> -->

                <hr class="w-11/12 mx-auto my-1 border-gray-600" />

                <li class="flex justify-between items-center w-full gap-2" v-if="checkPermissions(['admin.collaborate-requests.view'], userPermissions)">
                    <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/collaborate-requests">
                        <img src="/icons/admin/HandShake.svg" class="menu_icon" width="24" />
                        <span>درخواست های همکاری</span>
                    </nuxt-link>
                    <small class="flex items-center justify-center px-1 h-5 rounded-md bg-warmgray-50 text-black text-xs" style="min-width: 1rem">
                        {{ collabRequestCount }}
                    </small>
                </li>
                <li class="flex justify-between items-center w-full gap-2" v-if="checkPermissions(['admin.contact-requests.view'], userPermissions)">
                    <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/contact-requests">
                        <img src="/icons/admin/Calling.svg" class="menu_icon" width="24" />
                        <span>پیام های تماس با ما</span>
                    </nuxt-link>
                    <small class="flex items-center justify-center px-1 h-5 rounded-md bg-warmgray-50 text-black text-xs" style="min-width: 1rem">
                        {{ contactRequestCount }}
                    </small>
                </li>

                <hr class="w-11/12 mx-auto my-1 border-gray-600" />

                <li class="flex w-full" v-if="checkPermissions(['admin.articles.view'], userPermissions)">
                    <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/articles">
                        <img src="/icons/admin/Blog.svg" class="menu_icon" width="24" />
                        <span>مقالات</span>
                    </nuxt-link>
                </li>
                <li class="flex w-full" v-if="checkPermissions(['admin.faqs.view'], userPermissions)">
                    <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/faqs">
                        <img src="/icons/admin/Question.svg" class="menu_icon" width="24" />
                        <span>سوالات متداول</span>
                    </nuxt-link>
                </li>
                <li class="flex w-full" v-if="checkPermissions(['admin.testimonials.view'], userPermissions)">
                    <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/testimonials">
                        <img src="/icons/admin/Chat.svg" class="menu_icon" width="24" />
                        <span>نظرات نمایشی</span>
                    </nuxt-link>
                </li>
                <li class="flex w-full" v-if="checkPermissions(['admin.banner.view'], userPermissions)">
                    <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/banner">
                        <img src="/icons/admin/Flag.svg" class="menu_icon" width="24" />
                        <span>بنر وبسایت</span>
                    </nuxt-link>
                </li>
                <li class="flex w-full">
                    <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/latest-news">
                        <img src="/icons/admin/Mic.svg" class="menu_icon" width="24" />
                        <span>اخبار سایت</span>
                    </nuxt-link>
                </li>

                <hr class="w-11/12 mx-auto my-1 border-gray-600" />

                <li class="flex w-full" v-if="checkPermissions(['admin.contact-info.view'], userPermissions)">
                    <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/contact-info">
                        <img src="/icons/admin/InfoCircle.svg" class="menu_icon" width="24" />
                        <span>اطلاعات تماس</span>
                    </nuxt-link>
                </li>

                <li class="flex w-full p-2 rounded-xl cursor-pointer hover:bg-gray-600" @click="openGroup('pages')">
                    <div class="flex items-center gap-2 w-full">
                        <img src="/icons/admin/Document.svg" class="menu_icon" width="24" />
                        <span>مدیریت صفحات</span>
                    </div>
                    <img class="mr-auto" src="/icons/Arrow.white.svg" width="8" />
                </li>
                <transition name="accordiondown" appear>
                    <ul class="submenu flex flex-col gap-1 py-1" v-show="openedGroup.includes('pages')" name="pages">
                        <li class="">
                            <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/page/about-us">درباره ما</nuxt-link>
                        </li>
                        <li class="">
                            <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/page/collaborate">همکاری با ما</nuxt-link>
                        </li>
                        <li class="">
                            <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/page/terms-and-conditions">قوانین و مقررات</nuxt-link>
                        </li>
                        <li class="">
                            <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/admin/page/privacy-policy">حریم خصوصی</nuxt-link>
                        </li>
                    </ul>
                </transition>
            </ul>
            <div class="flex flex-col p-1">
                <button class="flex items-center gap-2 p-2 w-full rounded-xl bg-rose-800" @click="$router.push('/')">
                    <img src="/icons/Logout.gray.svg" class="menu_icon" width="24" />
                    <span class="text-rose-200">خروج</span>
                </button>
            </div>
        </nav>
    </transition>
</template>

<script>
import axios from "axios";
import permissionCheck from "~/mixins/permissionCheck";

export default {
    mixins: [permissionCheck],
    data() {
        return {
            openedGroup: "",

            collabRequestCount: 0,
            contactRequestCount: 0,
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await this.getNewRequestCounts({ headers });
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

        async getNewRequestCounts(data = {}) {
            let url = `/api/admin/home/newRequestCounts`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            url = encodeURI(url);
            await axios
                .get(url, { headers })
                .then((response) => {
                    this.collabRequestCount = response.data.collabRequestCount;
                    this.contactRequestCount = response.data.contactRequestCount;
                })
                .catch((e) => {});
        },
    },
};
</script>
