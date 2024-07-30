<template>
    <div class="poll-container">
        <div class="poll-header">
            <h3 class="poll-title">{{ poll.title }}</h3>
            <p v-if="!ongoing" class="poll-ends">Ended</p>
            <p v-if="ongoing" class="poll-ends">
                Ends in:
                {{ Math.round((poll.endTime - Date.now()) / 1000) }} seconds
            </p>
        </div>
        <p class="poll-description">{{ poll.description }}</p>

        <div class="options">
            <div class="option" v-for="option of poll.options">
                <p class="option-text">
                    {{ option.name }} <span class="option-text-votes">{{ option.votes.length }} votes</span>
                </p>
                <button :class="voted?._id == option._id ? 'option-vote-active' : 'option-vote'" @click="vote(option._id)" v-if="ongoing">VOTE</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.poll-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1rem;

    margin-bottom: 4rem;
}

.poll-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    width: 100%;
}

.poll-title {
    margin: 0;

    font-size: 1.5rem;
    color: white;
}

.poll-ends {
    margin: 0;

    font-size: 1rem;
    color: rgba(white, 0.5);
}

.poll-description {
    margin: 0;

    font-size: 1rem;
    color: rgba(white, 0.5);
}

.options {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 0.5rem;

    width: 100%;
}

.option {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.option-text {
    margin: 0;
    color: rgba(white, 0.5);
}

.option-text-votes {
    margin-left: 1rem;

    color: white;
}

.option-vote {
    border: 1px solid white;
    border-radius: 0;

    padding: 0.25rem 1rem;

    background-color: transparent;
    color: white;

    &:hover {
        background-color: rgba(white, 0.2);
        cursor: pointer;
    }

    &-active {
        @extend .option-vote;

        background-color: white;
        color: black;

        &:hover {
            background-color: white;
        }
    }
}
</style>

<script setup>
const props = defineProps({
    poll: Object,
});

const user = useUserStore();

const ongoing = computed(() => props.poll.endTime - Date.now() > 0);
const voted = computed(() => props.poll.options.find((i) => i.votes.includes(user.data._id)));

function vote(optionId) {
    user.vote(props.poll._id, optionId);
}
</script>
