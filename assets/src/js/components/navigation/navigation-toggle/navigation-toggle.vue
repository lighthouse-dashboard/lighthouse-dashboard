<template>
    <div class='navigation-toggle'>
        <div class='navigation-toggle--content-wrapper'>
            <button class='navigation-toggle--toggle-btn'
                    @click='$emit("toggle")'>
                Open
            </button>
        </div>
    </div>
</template>

<script>
    export default {};
</script>
