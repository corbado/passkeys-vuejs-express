<script setup lang="ts">
import { RouterView } from "vue-router";
import Navigation from "@/components/MainNavigation.vue";
import Footer from "@/components/MainFooter.vue";
</script>

<template>
    <Navigation />
    <main>
        <section>
            <RouterView />
        </section>
        <Footer />
    </main>
</template>
