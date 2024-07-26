<template>
    <div>this is a test page</div>
    <div>{{ user.data }}</div>
    <div>{{ user.polls }}</div>

    <div v-if="!user.data">
        Login
        <form @submit.prevent="login">
            <input type="text" name="username" placeholder="Username" />
            <input type="text" name="password" placeholder="Password" />
            <button type="submit">Submit</button>
        </form>

        Signup
        <form @submit.prevent="signup">
            <input type="text" name="username" placeholder="Username" />
            <input type="text" name="password" placeholder="Password" />
            <button type="submit">Submit</button>
        </form>
    </div>

    <div v-if="user.data">
        <CreatePoll />
        <h1>Your Polls</h1>
        <OwnPoll v-for="poll of userPolls" :poll="poll" />
        <button @click="user.logout()">Logout</button>
    </div>
</template>

<script setup>
const user = useUserStore();

const userPolls = computed(() =>
    user.polls.filter((i) => i.owner == user.data._id)
);

function login(e) {
    user.login(e.target.username.value, e.target.password.value);
}

async function signup(e) {
    await user.signup(e.target.username.value, e.target.password.value);
}
</script>
