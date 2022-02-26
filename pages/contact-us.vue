<style scoped>
#top {
    /* color: var(--top-h1-color); */
    font-weight: 900;
}

.card {
    background-color: var(--header-nav-container-bg-color);
    color: var(--header-nav-text-color);
    border-radius: 3rem;
}

input,
textarea {
    outline: none;
}
</style>

<template>
    <main role="main" class="flex flex-col items-center gap-16 max-w-screen-2xl w-full mt-10 lg:mt-0">
        <section class="relative flex flex-wrap-reverse items-center justify-evenly gap-8 lg:gap-20" id="top">
            <img class="" src="/pages/contact-us/PhoneCallMan.png" alt="porteqali-PhoneCallMan" style="max-height: 1920px" />
            <div class="flex flex-col gap-10 text-bluegray-900">
                <h1 class="flex flex-col gap-4 text-5xl lg:text-7xl">
                    <span class="kalameh_black font-bold">تماس با ما</span>
                </h1>
                <ul class="flex items-center gap-2 font-light">
                    <li><nuxt-link title="صفحه اصلی" to="/">صفحه اصلی</nuxt-link></li>
                    <li>&gt;</li>
                    <li>تماس با ما</li>
                </ul>
            </div>
        </section>
        <section class="flex flex-col items-center gap-8 w-full max-w-screen-lg">
            <div class="flex flex-col gap-2 ml-auto mb-8">
                <h2 class="font-bold text-3xl">بی صبرانه منتظر شنیدن نظرات و پیشنهادهای شما هستیم</h2>
                <p class="text-xl">پیشنهادات و انتقادات شما عزیزان، به پیشرفت گروه آموزشی پرتقال کمک بزرگی خواهد کرد</p>
            </div>
            <div class="flex flex-wrap justify-center lg:justify-between gap-16 lg:gap-20 w-full">
                <form class="flex flex-col items-center gap-6 w-full max-w-screen-2sm" @submit="send($event)">
                    <div class="flex items-center gap-4 w-full">
                        <div class="flex flex-col gap-2 w-full">
                            <label class="">نام</label>
                            <input type="text" v-model="name" placeholder="" dir="auto" class="p-3 w-full rounded-xl shadow-xl" />
                        </div>
                        <div class="flex flex-col gap-2 w-full">
                            <label class="">نام خانوادگی</label>
                            <input type="text" v-model="family" placeholder="" dir="auto" class="p-3 w-full rounded-xl shadow-xl" />
                        </div>
                    </div>
                    <div class="flex items-center gap-4 w-full">
                        <div class="flex flex-col gap-2 w-full">
                            <label class="">شماره همراه</label>
                            <input
                                type="text"
                                v-model="mobile"
                                v-mask="'09##-### ####'"
                                :masked="true"
                                placeholder="0912-345 6789"
                                dir="auto"
                                class="p-3 w-full rounded-xl shadow-xl"
                            />
                        </div>
                        <div class="flex flex-col gap-2 w-full">
                            <label class="">ایمیل</label>
                            <input type="email" v-model="email" placeholder="email@example.com" dir="auto" class="p-3 w-full rounded-xl shadow-xl" />
                        </div>
                    </div>
                    <div class="flex flex-col gap-2 w-full">
                        <label class="">موضوع</label>
                        <input type="text" v-model="issue" placeholder="موضوع پیشنهاد، انتقاد و نظر خود را بنویسید" class="p-3 w-full rounded-xl shadow-xl" />
                    </div>
                    <div class="flex flex-col gap-2 w-full">
                        <label class="">توضیحات</label>
                        <textarea type="text" v-model="text" class="p-3 w-full rounded-xl shadow-xl resize-none" rows="5"></textarea>
                    </div>
                    <span
                        class="p-2 rounded-lg"
                        :class="{ 'bg-red-100 text-red-800': messageType == 'error', 'bg-emerald-100 text-emerald-800': messageType == 'success' }"
                        v-if="!!message"
                    >
                        {{ message }}
                    </span>
                    <button
                        class="orange_gradient_h py-3 px-4 flex items-center justify-center gap-2 w-full rounded-xl hover:shadow-lg"
                        :class="{ 'opacity-50': sending }"
                        type="submit"
                    >
                        <div class="flex items-center justify-center gap-2" v-if="!sending">
                            <span class="font-bold">ارسال پیام</span>
                            <img src="/icons/Send.svg" alt="Send" width="24" height="24" />
                        </div>
                        <img src="/icons/TimeCircle.line.svg" alt="loading" width="32" height="32" v-else />
                    </button>
                    <div>
                        <p>
                            لطفا قبل از ارسال پیام،
                            <nuxt-link title="سوالات متداول" to="/faqs" class="underline text-orange-700">سوالات متداول</nuxt-link>
                            را مطالعه نمایید
                        </p>
                        <p>در این قسمت امکان پاسخ به سوال شما وجود ندارد</p>
                    </div>
                </form>
                <div class="flex flex-col gap-4">
                    <h3 class="text-2xl text-center font-bold">راه های ارتباطی</h3>
                    <ul class="card flex flex-col gap-8 p-8 lg:py-16 w-full max-w-sm">
                        <li class="flex flex-wrap items-center justify-between gap-4">
                            <h5 class="flex items-center gap-2">
                                <img src="/icons/Location.orange.line.svg" alt="Calling" width="24" height="24" />
                                <b class="font-bold text-xl">آدرس</b>
                            </h5>
                            <span>{{ contact_info.address }}</span>
                        </li>
                        <li class="flex flex-wrap items-center justify-between gap-4">
                            <h5 class="flex items-center gap-2">
                                <img src="/icons/Calling.orange.line.svg" alt="Calling" width="24" height="24" />
                                <b class="font-bold text-xl">شماره تلفن</b>
                            </h5>
                            <span>
                                <a :href="`tel:${contact_info.tel}`">{{ contact_info.tel }}</a>
                            </span>
                        </li>
                        <li class="flex flex-wrap items-center justify-between gap-4">
                            <h5 class="flex items-center gap-2">
                                <img src="/icons/Message.orange.line.svg" alt="Calling" width="24" height="24" />
                                <b class="font-bold text-xl">پست اکترونیک</b>
                            </h5>
                            <span>
                                <a href="mailto:info@porteqali.com">{{ contact_info.email }}</a>
                            </span>
                        </li>
                        <li class="flex flex-wrap items-center justify-between gap-4">
                            <h5 class="flex items-center gap-2">
                                <img src="/icons/Document.orange.line.svg" alt="Calling" width="24" height="24" />
                                <b class="font-bold text-xl">کدپستی</b>
                            </h5>
                            <span>{{ contact_info.post_code }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
        <section class="flex flex-col items-start gap-8 w-full max-w-screen-lg" v-if="!!contact_info.location">
            <client-only>
                <div class="bg-fuchsia-800 bg-opacity-50 rounded-3xl shadow-xl overflow-hidden w-full h-72 md:h-96">
                    <l-map
                        class="m-0 w-full h-full"
                        :zoom="parseInt(contact_info.location.z)"
                        :center="[contact_info.location.lat, contact_info.location.lng]"
                        :options="map.options"
                    >
                        <l-tile-layer :url="map.url" :options="map.url_options"></l-tile-layer>
                        <l-control-zoom position="bottomleft"></l-control-zoom>
                        <l-marker :lat-lng="[contact_info.location.lat, contact_info.location.lng]">
                            <l-icon :icon-size="mapIcon.iconSize" :icon-anchor="mapIcon.iconAnchor" :icon-url="mapIcon.iconUrl"></l-icon>
                        </l-marker>
                    </l-map>
                </div>
                <a
                    class="orange_gradient_h rounded-xl p-3 px-6 w-max shadow-lg"
                    :href="`https://www.google.com/maps/@${contact_info.location.lat},${contact_info.location.lng},${contact_info.location.z}z`"
                    target="_blank"
                >
                    نمایش روی نقشه
                </a>
            </client-only>
        </section>
    </main>
</template>

<script>
import axios from "axios";
import { mask } from "vue-the-mask";

import "leaflet/dist/leaflet.css";
import getMetadata from "~/mixins/getMetadata";
let Vue2Leaflet = {};
if (process.client) {
    const { LMap, LTileLayer, LMarker, LIcon, LControlZoom } = require("vue2-leaflet");
    Vue2Leaflet = { LMap, LTileLayer, LMarker, LIcon, LControlZoom };
}

export default {
    head() {
        return { title: this.metadata.title, meta: [...this.metadata.meta], link: [...this.metadata.link] };
    },
    mixins: [getMetadata],
    components: {
        "l-map": Vue2Leaflet.LMap,
        "l-tile-layer": Vue2Leaflet.LTileLayer,
        "l-marker": Vue2Leaflet.LMarker,
        "l-icon": Vue2Leaflet.LIcon,
        "l-control-zoom": Vue2Leaflet.LControlZoom,
    },
    directives: { mask },
    data() {
        return {
            name: "",
            family: "",
            mobile: "",
            email: "",
            issue: "",
            text: "",

            message: "",
            messageType: "success",

            sending: false,

            contact_info: {},
            map: {
                url: "https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
                url_options: {
                    maxZoom: 22,
                    subdomains: ["mt0", "mt1", "mt2", "mt3"],
                },
                options: { zoomControl: false },
            },
            mapIcon: {
                iconUrl: "/misc/pin.svg",
                iconSize: [60, 60],
                iconAnchor: [30, 60],
            },
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await Promise.all([this.getMetadata("contact-us"), this.getContactInfo({ headers })]);
    },
    methods: {
        async getContactInfo(data = {}) {
            let url = `/api/contact-info`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            await axios
                .get(url, { headers })
                .then((results) => (this.contact_info = results.data))
                .catch((e) => {});
        },

        async send(e) {
            e.preventDefault();
            if (this.sending) return;
            this.sending = true;

            this.message = "";

            await axios
                .post(`/api/contact-request`, {
                    name: this.name,
                    family: this.family,
                    mobile: this.mobile,
                    email: this.email,
                    issue: this.issue,
                    text: this.text,
                })
                .then(() => {
                    this.messageType = "success";
                    this.message = "پیام شما ارسال شد";
                })
                .catch((e) => {
                    this.messageType = "error";
                    if (typeof e.response !== "undefined" && e.response.data) {
                        if (typeof e.response.data.message === "object") {
                            this.message = e.response.data.message[0].errors[0];
                        }
                    }
                })
                .finally(() => {
                    this.sending = false;
                });
        },
    },
};
</script>
