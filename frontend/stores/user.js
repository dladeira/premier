export const useUserStore = defineStore("user", () => {
    const userData = useState("user-data");

    async function loadData() {
        const data = await $fetch("/api" + "/auth/data", {
            method: "POST",
        });

        if (!data) userData.value = null;
        else userData.value = data;
    }

    async function login(username, password) {
        await $fetch("/api" + "/auth/login", {
            method: "POST",
            body: {
                username,
                password,
            },
        });

        loadData();
    }

    async function signup(username, password) {
        await $fetch("/api" + "/auth/signup", {
            method: "POST",
            body: {
                username,
                password,
            },
        });

        loadData();
    }

    async function logout() {
        await $fetch("/api/auth/logout", {
            method: "POST",
        });

        loadData();
    }

    loadData();

    return {
        data: userData,
        login,
        signup,
        logout,
    };
});
