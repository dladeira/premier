export const useUserStore = defineStore("user", () => {
    const userData = useState("user-data");
    const polls = useState("polls", () => []);

    setInterval(() => {
        loadData();
    }, 1000);

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
        try {
            await $fetch("/api" + "/auth/login", {
                method: "POST",
                body: {
                    username,
                    password,
                },
            });

            loadData();
            return true;
        } catch {
            return false;
        }
    }

    async function signup(username, password) {
        try {
            await $fetch("/api" + "/auth/signup", {
                method: "POST",
                body: {
                    username,
                    password,
                },
            });

            loadData();
            return true;
        } catch {
            return false;
        }
    }

    async function logout() {
        await $fetch("/api/auth/logout", {
            method: "POST",
        });

        loadData();
    }

    async function createPoll() {
        await $fetch("/api/polls/create", {
            method: "POST",
            body: {
                title: "New Poll Title",
                description: "New Poll Description",
                options: [{ name: "Option 1" }, { name: "Option 2" }, { name: "Option 3" }],
                endTime: Date.now() + 1000 * 60 * 60 * 60,
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

    async function vote(pollId, optionId) {
        await $fetch("/api/polls/vote", {
            method: "POST",
            body: {
                pollId,
                optionId,
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
        vote,
    };
});
