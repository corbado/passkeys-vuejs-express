<script setup lang="ts">
import { useUserStore } from "@/stores/user.ts";
import { RouterLink } from "vue-router";
import { computed } from "vue";

const store = useUserStore();
const email = computed(() =>
    store.userInfo.status === "authenticated" ? store.userInfo.email : "",
);
const isAuthenticated = computed(() => store.userInfo.status === "authenticated");
const city = computed(() =>
    store.externalUserInfo.status === "success"
        ? store.externalUserInfo.user.city
        : "unknown",
);
</script>

<template>
    <template v-if="isAuthenticated">
        <div>
            <h1>Welcome {{ email }} from {{ city }}!</h1>
            <p>
                You now have access to everything and can visit the user area:
            </p>
            <RouterLink class="button" to="/userarea">User area</RouterLink>
        </div>
    </template>
    <template v-else>
        <div>
            <h1>Welcome Guest!</h1>
            <p>
                This example demonstrates Corbado's passkey-first authentication
                solution.
            </p>
            <p>It covers all relevant aspects like -</p>
            <ul>
                <li>Sign-up</li>
                <li>Login</li>
                <li>Protecting Routes</li>
            </ul>
            <p>
                It can be used as a starting point for your own application or
                to learn.
            </p>
            <RouterLink class="button" to="/signup">Sign up</RouterLink>
            <RouterLink class="button" to="/login">Login</RouterLink>
        </div>
    </template>
</template>
