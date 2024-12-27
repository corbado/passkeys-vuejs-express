import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/login",
            name: "login",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("../views/LoginView.vue"),
        },
        {
            path: "/signup",
            name: "signup",
            component: () => import("../views/SignupView.vue"),
        },
        {
            path: "/profile",
            name: "profile",
            component: () => import("../views/ProfileView.vue"),
        },
        {
            path: "/signup/onboarding",
            name: "onboarding",
            component: () => import("../views/OnboardingView.vue"),
        },
        {
            path: "/userarea",
            name: "userarea",
            component: () => import("../views/UserAreaView.vue"),
        }
    ],
});

export default router;
