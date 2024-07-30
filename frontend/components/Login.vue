<template>
    <div class="text-container">
        <form class="form" @submit.prevent="login" v-if="loginActive">
            <div class="input-error">&nbsp;{{ error }}</div>
            <input class="input" type="text" name="username" placeholder="Username" />
            <input class="input" type="password" name="password" placeholder="Password" />
            <button type="submit" class="button">Login</button>

            <p class="alternate">
                No account yet?
                <br />
                <span class="alternate-switch" @click="loginActive = !loginActive">Register</span>
            </p>
        </form>
        <form class="form" @submit.prevent="signup" v-else>
            <div class="input-error">&nbsp;{{ error }}</div>
            <input class="input" type="text" name="username" placeholder="Username" />
            <input class="input" type="password" name="password" placeholder="Password" />
            <button type="submit" class="button">Register</button>

            <p class="alternate">
                Already have an account?
                <br />
                <span class="alternate-switch" @click="loginActive = !loginActive">Login</span>
            </p>
        </form>
    </div>
</template>

<style lang="scss" scoped>
.text-container,
.form {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    gap: 2rem;
}

.input {
    margin: 0;
    padding: 1rem;

    border: 1px solid transparent;
    outline: none;

    font-size: 1.5rem;
    font-weight: 400;
    background-color: rgba(white, 0.1);
    color: white;

    transition: background-color 200ms ease-out;

    &::placeholder {
        color: rgba(white, 0.25);
    }

    &:focus {
        border: 1px solid white;
    }

    &:hover,
    &:focus {
        background-color: rgba(white, 0.2);
    }
}

.button {
    margin: 0;
    padding: 1rem;

    border: 2px solid white;
    outline: none;

    font-size: 1.5rem;
    background-color: transparent;
    color: white;

    transition: background-color 200ms ease-out;

    &:hover {
        background-color: rgba(white, 0.2);
        cursor: pointer;
    }

    &:active {
        background-color: rgba(white, 0.5);
    }
}

.alternate {
    margin: 0;

    font-size: 1rem;
    text-align: center;
    line-height: 180%;
    color: rgba(white, 0.25);

    &-switch {
        color: rgba(white, 0.75);
        text-decoration: underline;

        &:hover {
            cursor: pointer;
        }
    }
}

.input-error {
    color: red;
}
</style>

<script setup>
const user = useUserStore();
const loginActive = useState("login", () => true);
const error = useState("login-error");

async function login(e) {
    const result = await user.login(e.target.username.value, e.target.password.value);

    if (!result) {
        error.value = "Invalid username or password";
        setTimeout(() => {
            error.value = "";
        }, 2000);
    }
}

async function signup(e) {
    const result = await user.signup(e.target.username.value, e.target.password.value);

    if (!result) {
        error.value = "Username already exists";
        setTimeout(() => {
            error.value = "";
        }, 2000);
    }
}
</script>
