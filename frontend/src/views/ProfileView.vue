<script setup lang="ts">
import { useUserStore } from "@/stores/user.ts";
import { computed, ref, watch } from "vue";
import Corbado from "@corbado/web-js";
import { useRouter } from "vue-router";

const store = useUserStore();
const router = useRouter();
const externalUserInfo = computed(() =>
    store.externalUserInfo.status === "success" ? store.externalUserInfo : null,
);
const passkeyListRef = ref<HTMLDivElement>();
store.onCorbadoLoaded(() => {
    Corbado.mountPasskeyListUI(passkeyListRef.value!);
});
watch(
    () => store.userInfo.status,
    (status) => {
        if (status === "not-authenticated") {
            router.push("/login");
        }
    },
);
</script>

<template>
    <h1>Profile</h1>
    <p><strong>Example userID: </strong>{{ externalUserInfo?.user.id }}</p>
    <!-- We could also get this id from the Corbado web-js package instead of our backend -->
    <p>
        <strong>Corbado userID: </strong
        >{{ externalUserInfo?.user.corbado_user_id }}
    </p>
    <h2>Your Identifiers</h2>
    <div id="identifier-list" v-if="externalUserInfo">
        <div
            v-for="identifier in externalUserInfo.identifiers"
            :key="identifier.identifierID"
        >
            <p><strong>Type:</strong> {{ identifier.type }}</p>
            <p><strong>Value:</strong> {{ identifier.value }}</p>
        </div>
    </div>
    <h2>Manage your Passkeys</h2>
    <div ref="passkeyListRef" />
</template>
