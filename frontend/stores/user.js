export const useUserStore = defineStore("user", () => {
    const userData = useState("user-data");
    const polls = useState("polls", () => []);

    async function loadData() {
        var data = await $fetch("/api" + "/auth/data", {
            method: "POST",
        });

        if (!data) userData.value = null;
        else userData.value = data;

        var data = await $fetch("/api/polls", {
            method: "GET",
        });

        polls.value = data;
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

    async function createPoll(title, description, options, endTime) {
        await $fetch("/api/polls/create", {
            method: "POST",
            body: {
                title,
                description,
                options,
                endTime,
            },
        });

        loadData();
    }

    async function updatePoll(_id, title, description, options, endTime) {
        await $fetch("/api/polls/update", {
            method: "POST",
            body: {
                _id,
                title,
                description,
                options,
                endTime,
            },
        });

        loadData();
    }

    async function deletePoll(_id) {
        await $fetch("/api/polls/delete", {
            method: "POST",
            body: {
                _id,
            },
        });

        loadData();
    }

    loadData();

    return {
        data: userData,
        polls,
        login,
        signup,
        logout,
        createPoll,
        updatePoll,
        deletePoll,
    };
});
