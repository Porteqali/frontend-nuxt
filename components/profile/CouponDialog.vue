<style scoped>
.card {
    position: relative;
    z-index: 0;
    background-image: url("/misc/coupon.svg");
    background-position: center;
    background-size: 100%;
    background-repeat: no-repeat;
    filter: drop-shadow(0px 15px 15px rgba(0, 0, 0, 7%));
}
.card span {
    letter-spacing: 2px;
}

.discount_tag {
    border-radius: 0 0 1rem 1rem;
}

.porteqal {
    position: absolute;
    right: -3.25rem;
    transform: rotate(90deg);
}
</style>

<template>
    <Dialog :open="open" @update:open="updateOpenState">
        <div class="flex flex-col items-center gap-6 w-full">
            <img class="w-48 h-48 object-contain" src="/misc/congrats.png" alt="congrats" />
            <h3 class="kalameh_bold title text-2xl md:text-3xl">هدیه اتمام نقشه راه</h3>
            <p>کد تخفیف {{ discountPercent }} درصدی</p>
            <hr class="w-full" />
            <div class="card h-40 flex flex-col items-center justify-center w-full">
                <img class="porteqal w-28" src="/misc/half.png" alt="porteqal" />
                <div class="absolute top-0 left-4 flex flex-col gap-3 items-end">
                    <b class="discount_tag kalameh_black text-3xl p-2 bg-rose-600 text-amber-200">{{ discountPercent }}%</b>
                    <span class="kalameh_black text-4xl text-white">{{ code }}</span>
                </div>
            </div>
            <hr class="w-full" />
            <div class="flex flex-col items-center gap-1 w-full">
                <small class="opacity-75">مهلت استفاده این کد تا تاریخ {{ new Date(expireDate).toLocaleDateString("fa") }} میباشد</small>
                <small class="opacity-75">کد تخفیف فقط برای حساب کاربری شما قابل استفاده است</small>
            </div>
        </div>
    </Dialog>
</template>

<script>
import axios from "axios";
import Dialog from "~/components/Dialog";
import Loading from "~/components/Loading";

export default {
    name: "CouponDialog",
    props: ["open", "discountPercent", "code", "expireDate"],
    components: {
        Dialog,
        Loading,
    },
    data() {
        return {
            loading: false,

            errorMsg: "",
            errorTag: "",
        };
    },
    methods: {
        updateOpenState(state) {
            this.$emit("update:open", state);
        },
    },
};
</script>
