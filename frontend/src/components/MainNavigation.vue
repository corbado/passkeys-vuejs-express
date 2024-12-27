<script lang="ts" setup>
import { useUserStore } from "@/stores/user.ts";
import { useRoute, useRouter } from "vue-router";
import Corbado from "@corbado/web-js";
import { computed } from "vue";

const currentRoute = useRoute();
const router = useRouter();
const userStore = useUserStore();
const isAuthenticated = computed(() => userStore.userInfo.status === "authenticated");
const onCorbadoLoaded = userStore.onCorbadoLoaded;

function isRouteActive(route: string): boolean {
    return currentRoute.path === route;
}
function onLogout() {
    onCorbadoLoaded(() => Corbado.logout());
    router.push("/");
}
</script>

<template>
    <div>
        <nav>
            <RouterLink to="/" class="nav-logo">
                <img
                    src="/logo.svg"
                    alt="Corbado Logo"
                    height="40"
                    width="40"
                />
                <p>Corbado Example</p>
            </RouterLink>
            <ul>
                <li>
                    <RouterLink to="/" :data-selected="isRouteActive('/')"
                        >Home
                    </RouterLink>
                </li>
                <li>
                    <RouterLink
                        to="/userarea"
                        :data-selected="isRouteActive('/userarea')"
                        >User area
                    </RouterLink>
                </li>
                <template v-if="isAuthenticated">
                    <li>
                        <RouterLink
                            to="/profile"
                            :data-selected="isRouteActive('/profile')"
                            >Profile
                        </RouterLink>
                    </li>
                </template>
                <template v-else>
                    <li>
                        <RouterLink
                            to="/signup"
                            :data-selected="isRouteActive('/signup')"
                            >Sign up
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink
                            to="/login"
                            :data-selected="isRouteActive('/login')"
                            >Login
                        </RouterLink>
                    </li>
                </template>
            </ul>
            <button v-if="isAuthenticated" class="button" @click="onLogout">
                Logout
            </button>
        </nav>
    </div>
</template>
