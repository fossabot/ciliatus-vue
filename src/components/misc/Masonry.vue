<template>
    <div v-masonry :transition-duration="transitionDuration" :item-selector="itemSelector" :horizontalOrder="true">
        <slot> </slot>
    </div>
</template>

<script>
    export default {

        props: {
            transitionDuration: {
                default: '0.3s',
                type: String
            },
            itemSelector: {
                default: '.masonry-item',
                type: String
            }
        }

    }
</script>
