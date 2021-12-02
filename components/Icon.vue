<style></style>

<template>
    <div :style="`mask: url('/${folder}/${name}.svg') no-repeat center; -webkit-mask: url('/${folder}/${name}.svg') no-repeat center`"></div>
</template>

<script>
export default {
    name: "Icon",
    props: ["folder", "name"],
};
</script>
