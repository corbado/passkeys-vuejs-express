<script setup lang="ts">
import { useUserStore } from "@/stores/user.ts";
import { computed, ref } from "vue";
import Corbado from "@corbado/web-js";

type SecretStatus =
    | {
          status: "idle";
      }
    | {
          status: "loading";
      }
    | {
          status: "success";
          secret: string;
      }
    | {
          status: "error";
          error: string;
      };

const store = useUserStore();
const isAuthenticated = computed(
    () => store.userInfo.status === "authenticated",
);
const revealSecretResult = ref<SecretStatus>({ status: "idle" });
const revealSecretDiv = ref<HTMLDivElement>();

async function onSubmit() {
    revealSecretResult.value = { status: "loading" };
    const secretGetUrl = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/secret`;
    try {
        const rsp = await fetch(secretGetUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${Corbado.sessionToken}`,
            },
        });
        if (!rsp.ok) throw new Error(`Failed to get secret: ${rsp.statusText}`);
        const json = (await rsp.json()) as { secret: string };
        revealSecretResult.value = { status: "success", secret: json.secret };
    } catch (e) {
        revealSecretResult.value = { status: "error", error: `${e}` };
    }
}
</script>

<template>
    <h1>User area!</h1>
    <template v-if="isAuthenticated">
        <p>Since you are logged-in, we can tell you a secret:</p>
        <button
            id="reveal-secret-button"
            @click="onSubmit"
            :disabled="
                ['loading', 'success'].includes(revealSecretResult.status)
            "
        >
            Reveal secret
        </button>
        <div id="reveal-secret-result" ref="revealSecretDiv">
            <div v-if="revealSecretResult.status === 'success'" id="secret-box">
                <h3>Secret: </h3>
                <p>{{ revealSecretResult.secret }}</p>
            </div>
            <div v-else-if="revealSecretResult.status === 'loading'">
                <div class="loader" />
            </div>
            <div v-else-if="revealSecretResult.status === 'error'">
                <p>Failed to reveal secret: {{ revealSecretResult.error }}</p>
            </div>
        </div>
    </template>
    <template v-else>
        <p>This page is for logged-in users only. Please login:</p>
        <RouterLink class="button" to="/login">Login</RouterLink>
    </template>
</template>
