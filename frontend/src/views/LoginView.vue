<script setup lang="ts">
import { useUserStore } from "@/stores/user.ts";
import { useRouter } from "vue-router";
import { ref, watch } from "vue";
import Corbado from "@corbado/web-js";

const loginRef = ref<HTMLDivElement>();
const router = useRouter();
const store = useUserStore();
store.onCorbadoLoaded(() => {
    Corbado.mountAuthUI(loginRef.value!, {
        initialBlock: "login-init",
        onLoggedIn() {
            // do nothing here. We have to wait for a backend response
            // to check whether the user has gone through onboarding already.
            // The backend call is made in the user store.
        },
    });
});
watch(
    () => store.externalUserInfo,
    (externalUserInfo) => {
        switch (externalUserInfo.status) {
            case "success":
                if (externalUserInfo.user.city === null) {
                    router.push("/signup/onboarding");
                } else {
                    router.push("/profile");
                }
                return;
            case "error":
                // handle this case more gracefully in a real application
                console.error(externalUserInfo.message);
                return;
        }
    },
);
</script>

<template>
    <h1>Login</h1>
    <div ref="loginRef" />
</template>
