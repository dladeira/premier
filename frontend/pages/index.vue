<template>
    <div class="container">
        <button @click="user.logout()" class="logout" v-if="user.data">Logout</button>
        <div class="content-container">
            <div class="text-title">
                <h2 class="subtitle">Premier Studios</h2>
                <h1 class="title">Poll Voting</h1>
            </div>
            <Login v-if="!user.data" />

            <div class="polls-container" v-if="user.data">
                <button :class="`${managing ? 'button-active' : 'button-inactive'}`" @click="managing = true">Manage Your Polls</button>
                <button :class="`${!managing ? 'button-active' : 'button-inactive'}`" @click="managing = false">Vote On Polls</button>

                <div class="polls-inner-container">
                    <div v-if="managing">
                        <OwnPoll v-for="poll of userPolls" :poll="poll" />
                        <div v-if="userPolls.length == 0" class="info">You don't have any polls</div>
                        <CreatePoll />
                    </div>
                    <div v-else>
                        <OtherPoll v-for="poll of otherPolls" :poll="poll" />
                        <div v-if="otherPolls.length == 0" class="info">No polls active</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.logout {
    position: absolute;
    bottom: 1.5rem;
    left: 6rem;

    height: 2.5rem;
    width: 7rem;

    border: 1px solid white;

    font-size: 1rem;
    background-color: transparent;
    color: white;

    opacity: 0.2;

    transition: background-color 200ms ease-out;

    &:hover {
        background-color: rgba(white, 0.2);
        cursor: pointer;
    }

    &:active {
        background-color: rgba(white, 0.5);
    }

    @include phone-only {
        left: 1.5rem;
    }
}

.container {
    height: 100vh;
    margin: 0;

    padding: 6rem;

    background: linear-gradient(270deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.27) 53.5%, rgba(0, 0, 0, 0.78) 67%, #000 100%), url("https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/e496f2101153245.5f185ec683a78.png") lightgray 50% / cover no-repeat;
    background-image: cover;
    background-position: center;

    @include phone-only {
        padding: 2rem 0 5rem;
        background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url("https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/e496f2101153245.5f185ec683a78.png") lightgray 50% / cover no-repeat;
    }
}

.content-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    gap: 2rem;

    width: 550px;
    height: 100%;

    overflow-y: overlay;

    @include phone-only {
        margin: 0 auto;
        width: 90%;
    }
}

.subtitle {
    margin: 0;

    font-size: 1.5rem;
    font-weight: 400;
}

.title {
    margin: 0;

    font-size: 6rem;
    font-weight: 700;

    @include phone-only {
        font-size: 5rem;
    }
}

.polls-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    gap: 2rem;

    height: 100%;

    overflow-y: scroll;
}

.polls-inner-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    gap: 2rem;

    height: 100%;

    overflow-y: scroll;
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

    &-active {
        @extend .button;

        background-color: white;
        color: black;

        &:hover {
            background-color: white;
        }

        &:active {
            background-color: white;
        }
    }

    &-inactive {
        @extend .button;
    }
}

.info {
    width: fit-content;

    margin: 1rem auto 0;

    font-style: italic;
    color: rgba(white, 0.75);
}
</style>

<script setup>
const user = useUserStore();
const managing = useState("managing", () => true);

const userPolls = [];

const otherPolls = [];
</script>
