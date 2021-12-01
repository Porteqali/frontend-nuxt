export default function (to, from, savedPosition) {
    setTimeout(() => {
        document.querySelector("#app").scrollTop = 0;
        // document.querySelector("#app").scrollLeft = 600;
    }, 500);
    return { x: 0, y: 0 };
}
