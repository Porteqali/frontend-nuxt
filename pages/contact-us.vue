<style scoped>
.background {
    background: linear-gradient(233.4deg, #ffa825 11.05%, rgba(255, 112, 215, 0.34) 100.55%);
}

input,
textarea {
    outline: none;
}
</style>

<template>
    <main role="main" class="relative flex flex-col items-center gap-16 w-full max-w-screen-2xl mt-24 md:mt-28 px-4 md:px-8">
        <img class="absolute -left-1/4 top-40 -z-1" src="/pages/contact-us/path.svg" />
        <section class="flex flex-wrap items-center justify-evenly gap-8 w-full">
            <div class="flex flex-col gap-8">
                <h1 class="flex flex-col gap-4 text-3xl md:text-4xl">
                    <span class="kalameh_bold title text-bluegray-900 w-max">راه های ارتباطی</span>
                </h1>
                <div class="card flex flex-col gap-8 w-full max-w-md">
                    <div class="flex flex-col justify-between gap-2" v-if="!!contact_info.address">
                        <h5 class="flex items-center gap-2">
                            <Icon class="w-6 h-6 bg-orange-500" size="24px" folder="icons/new" name="Location" />
                            <b class="font-bold text-lg">آدرس</b>
                        </h5>
                        <span>{{ contact_info.address }}</span>
                    </div>
                    <div class="flex flex-wrap lg:flex-nowrap items-center gap-8" v-if="!!contact_info.tel">
                        <div class="flex flex-col justify-between gap-2">
                            <h5 class="flex items-center gap-2">
                                <Icon class="w-6 h-6 bg-orange-500" size="24px" folder="icons/new" name="Calling" />
                                <b class="font-bold text-lg">شماره تلفن</b>
                            </h5>
                            <a :href="`tel:${contact_info.tel}`">{{ contact_info.tel }}</a>
                        </div>
                        <div class="flex flex-col justify-between gap-2" v-if="!!contact_info.email">
                            <h5 class="flex items-center gap-2">
                                <Icon class="w-6 h-6 bg-orange-500" size="24px" folder="icons/new" name="Message" />
                                <b class="font-bold text-lg">پست اکترونیک</b>
                            </h5>
                            <a href="mailto:info@porteqali.com">{{ contact_info.email }}</a>
                        </div>
                        <div class="flex flex-col justify-between gap-2" v-if="!!contact_info.post_code">
                            <h5 class="flex items-center gap-2">
                                <Icon class="w-6 h-6 bg-orange-500" size="24px" folder="icons/new" name="EditSquare" />
                                <b class="font-bold text-lg">کدپستی</b>
                            </h5>
                            <span>{{ contact_info.post_code }}</span>
                        </div>
                    </div>
                    <div class="flex flex-col justify-between gap-2" v-if="!!contact_info.socials">
                        <h5 class="flex items-center gap-2">
                            <Icon class="w-6 h-6 bg-orange-500" size="24px" folder="icons/new" name="Chat" />
                            <b class="font-bold text-lg">شبکه های اجتماعی</b>
                        </h5>
                        <ul class="flex flex-wrap items-center gap-2">
                            <li v-if="!!contact_info.socials.telegram">
                                <a :href="contact_info.socials.telegram"><img class="w-8 h-8" src="/social/telegram.png" alt="telegram" /></a>
                            </li>
                            <li v-if="!!contact_info.socials.instagram">
                                <a :href="contact_info.socials.instagram"><img class="w-8 h-8" src="/social/instagram.png" alt="instagram" /></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="flex flex-col items-start gap-8 w-full max-w-lg bg-gray-700 p-4 rounded-3xl overflow-hidden" v-if="!!contact_info.location">
                <client-only>
                    <div class="bg-gray-200 rounded-2xl overflow-hidden w-full h-72 md:h-80">
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
                </client-only>
            </div>
        </section>

        <section class="relative flex flex-col items-center gap-8 w-full max-w-screen-xl mb-16">
            <h2 class="kalameh_bold title text-3xl w-full lg:w-max">بی صبرانه منتظر شنیدن نظرات و پیشنهادهای شما هستیم</h2>
            <div class="flex flex-col gap-2">
                <p class="text-lg opacity-75">پیشنهادات و انتقادات شما عزیزان، به پیشرفت گروه آموزشی پرتقال کمک بزرگی خواهد کرد</p>
            </div>
            <div class="flex items-end justify-center w-full">
                <div class="background absolute sm:relative flex items-start justify-start w-full max-w-3xl rounded-2xl pb-16 -ml-96 -mb-6">
                    <img class="-mr-20" src="/pages/contact-us/back.png" alt="bg" />
                </div>
                <form class="flex flex-col items-center gap-6 w-full max-w-screen-sm shadow-xl rounded-2xl bg-white p-6 lg:px-16 z-10" @submit="send($event)">
                    <div class="flex items-center gap-4 w-full">
                        <div class="flex flex-col gap-2 w-full">
                            <label class="">نام</label>
                            <input type="text" v-model="name" placeholder="" dir="auto" class="p-3 w-full bg-warmgray-100 rounded-xl focus:shadow-xl" />
                        </div>
                        <div class="flex flex-col gap-2 w-full">
                            <label class="">نام خانوادگی</label>
                            <input type="text" v-model="family" placeholder="" dir="auto" class="p-3 w-full bg-warmgray-100 rounded-xl focus:shadow-xl" />
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
                                class="p-3 w-full bg-warmgray-100 rounded-xl focus:shadow-xl"
                            />
                        </div>
                        <div class="flex flex-col gap-2 w-full">
                            <label class="">ایمیل</label>
                            <input
                                type="email"
                                v-model="email"
                                placeholder="email@example.com"
                                dir="auto"
                                class="p-3 w-full bg-warmgray-100 rounded-xl focus:shadow-xl"
                            />
                        </div>
                    </div>
                    <div class="flex flex-col gap-2 w-full">
                        <label class="">موضوع</label>
                        <input
                            type="text"
                            v-model="issue"
                            placeholder="موضوع پیشنهاد، انتقاد و نظر خود را بنویسید"
                            class="p-3 w-full bg-warmgray-100 rounded-xl focus:shadow-xl"
                        />
                    </div>
                    <div class="flex flex-col gap-2 w-full">
                        <label class="">توضیحات</label>
                        <textarea type="text" v-model="text" class="p-3 w-full bg-warmgray-100 rounded-xl focus:shadow-xl resize-none" rows="5"></textarea>
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
            </div>
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
