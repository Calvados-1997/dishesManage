<script setup lang="ts">
    const props = defineProps({
        title:{
            type: String,
            default: "タイトル"
        },
        fontSize:{
            type: String,
            default: "10px"
        },
        color:{
            type: String,
            default: "black"
        }
    })

    const styleObject = {
        'font-size': props.fontSize,
        'color': props.color
    }
</script>

<template>
    <button class="btn" type="button" :style="styleObject">{{ props.title }}</button>    
</template>

<style lang="css">
    .btn{
        padding: 5px 20px;
    }
</style>