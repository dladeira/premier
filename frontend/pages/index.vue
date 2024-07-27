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
                        <CreatePoll />
                    </div>
                    <div v-else>
                        <OtherPoll v-for="poll of otherPolls" :poll="poll" />
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
}
.container {
    height: 100vh;
    margin: 0;

    padding: 6rem;

    background: linear-gradient(270deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.27) 53.5%, rgba(0, 0, 0, 0.78) 67%, #000 100%), url("https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/e496f2101153245.5f185ec683a78.png") lightgray 50% / cover no-repeat;
    background-image: cover;
    background-position: center;
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
</style>

<script setup>
const user = useUserStore();
const managing = useState("managing", () => true);

const userPolls = computed(() => user.polls.filter((i) => i.owner == user.data._id));

const otherPolls = computed(() => user.polls.filter((i) => i.owner != user.data._id));
</script>
