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
        <DeletePoll />
        <button @click="user.logout()">Logout</button>
    </div>
</template>

<script setup>
const user = useUserStore();

function login(e) {
    user.login(e.target.username.value, e.target.password.value);
}

async function signup(e) {
    await user.signup(e.target.username.value, e.target.password.value);
}
</script>
