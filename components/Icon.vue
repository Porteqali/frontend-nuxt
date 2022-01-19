<style></style>

<template>
    <div
        :style="`mask: url('/${folder}/${name}.svg') no-repeat center; -webkit-mask: url('/${folder}/${name}.svg') no-repeat center; mask-size:${size}; -webkit-mask-size:${size};`"
    ></div>
</template>

<script>
export default {
    name: "Icon",
    props: {
        folder: {},
        name: {},
        size: { default: "24px" },
    },
};
</script>
