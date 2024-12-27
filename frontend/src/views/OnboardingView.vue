<script setup lang="ts">
import { useUserStore } from "@/stores/user.ts";
import { useRouter } from "vue-router";
import { watch } from "vue";

const store = useUserStore();
const router = useRouter();

watch(
    () => store.userInfo.status,
    (status) => {
        if (status === "not-authenticated") {
            router.push("/login");
        }
    },
);

async function onSubmit(e: Event) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const city = formData.get("city") as string;
    try {
        await store.updateUserCity(city);
    } catch (e) {
        console.error("Failed to update user city:", e);
    }
    await router.push("/");
}
</script>

<template>
    <h1>Onboarding</h1>
    <h2>Choose your city</h2>
    <form id="city-form" method="post" @submit="onSubmit">
        <input type="text" name="city" required />
        <button type="submit">Finish onboarding</button>
    </form>
</template>
