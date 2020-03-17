<template>
    <div v-masonry-tile :class="[itemSelector, ...classes]">
        <slot> </slot>
    </div>
</template>

<script>

    export default {

        props: {
            itemSelector: {
                default: 'masonry-item',
                type: String
            },
            classes: {
                default: () => ['col-sm-6', 'col-md-4', 'col-lg-4', 'col-xl-3'],
                type: String|Array
            }
        }
    }

</script>
