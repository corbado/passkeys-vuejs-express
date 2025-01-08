import { defineStore } from "pinia";
import Corbado from "@corbado/web-js";
import { ref } from "vue";
import englishTranslations from "@/utils/corbado-translations.ts";

export type UserInfo =
    | {
          status: "loading";
      }
    | {
          status: "not-authenticated";
      }
    | {
          status: "authenticated";
          email: string;
      };

type UserIdentifiers = Array<{
    identifierID: string;
    userID: string;
    status: "pending" | "primary" | "verified";
    type: "email" | "phone" | "username";
    value: string;
}>;
type DBUser = {
    id: string;
    corbado_user_id: string;
    city: string | null;
};

export type ExternalUserInfo =
    | {
          status: "not-loaded";
      }
    | {
          status: "loading";
      }
    | {
          status: "error";
          message: string;
      }
    | {
          status: "success";
          user: DBUser; // the user object from the database
          identifiers: UserIdentifiers;
      };

export const useUserStore = defineStore("user-store", () => {
    // **State Variables**
    const userInfo = ref<UserInfo>({
        status: "loading",
    });
    const externalUserInfo = ref<ExternalUserInfo>({
        status: "not-loaded",
    });

    const corbadoLoadPromise = Corbado.load({
        projectId: import.meta.env.VITE_CORBADO_PROJECT_ID,
        darkMode: "on",
        theme: "cbo-custom-styles",
        customTranslations: { en: englishTranslations },
    });

    // **Actions**
    const onCorbadoLoaded = (fn: () => void | Promise<void>) => {
        corbadoLoadPromise.then(fn);
    };

    async function loadExternalUserInfo() {
        if (externalUserInfo.value.status === "loading") {
            return;
        }
        try {
            externalUserInfo.value = { status: "loading" };
            const url = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/user`;
            const response = await fetch(url, { credentials: "include" });
            if (!response.ok) {
                throw new Error(
                    `Failed to fetch user info: ${response.status} ${response.statusText}`,
                );
            }
            const data = (await response.json()) as {
                user: DBUser;
                identifiers: UserIdentifiers;
            };
            externalUserInfo.value = {
                status: "success",
                user: data.user,
                identifiers: data.identifiers,
            };
        } catch (e) {
            externalUserInfo.value = {
                status: "error",
                message: `Failed to fetch user info: ${e}`,
            };
        }
    }

    // the caller must handle any errors
    async function updateUserCity(city: string) {
        if (externalUserInfo.value.status !== "success") {
            throw new Error("User info not loaded");
        }
        const citySubmitUrl = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/user/city`;
        const rsp = await fetch(citySubmitUrl, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ city }),
        });

        if (!rsp.ok) {
            throw new Error(`Failed to submit city: ${rsp.status} ${rsp.statusText}`);
        }

        const json = await rsp.json() as DBUser;
        externalUserInfo.value = {
            status: "success",
            user: json,
            identifiers: externalUserInfo.value.identifiers,
        };
    }

    // **Observers / Side Effects**
    // Subscribe to Corbado user changes
    onCorbadoLoaded(() => {
        Corbado.userChanges.subscribe((user) => {
            if (user) {
                // load external info every time the user changes
                void loadExternalUserInfo();
                userInfo.value = {
                    status: "authenticated",
                    email: user.name,
                };
            } else {
                externalUserInfo.value = { status: "not-loaded" };
                userInfo.value = {
                    status: "not-authenticated",
                };
            }
        });
    });

    // **Return Public API**
    return {
        // State
        userInfo,
        externalUserInfo,

        // Actions
        onCorbadoLoaded,
        updateUserCity,
    };
});
