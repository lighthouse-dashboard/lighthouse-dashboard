<template>
    <div class='side-nav-toggle'>
        <div class='side-nav-toggle--content-wrapper'>
            <button class='side-nav-toggle--toggle-btn'
                    @click='$emit("toggle")'>
                <div class="side-nav-toggle--stripe"></div>
                <div class="side-nav-toggle--stripe"></div>
                <div class="side-nav-toggle--stripe"></div>
            </button>
        </div>
    </div>
</template>

<script>
    export default {};
</script>
