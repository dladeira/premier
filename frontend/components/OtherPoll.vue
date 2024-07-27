<template>
    <div>
        <h3>{{ poll.title }}</h3>
        <p>{{ poll.description }}</p>
        <p v-if="!ongoing">Ended</p>
        <p v-if="ongoing">
            Ends in:
            {{ Math.round((poll.endTime - Date.now()) / 1000) }} seconds
        </p>
        {{ voted }}a
        <div class="options">
            <div class="option" v-for="option of poll.options">
                <div>
                    {{ option.name }} -- {{ option.votes.length }} votes
                    <button @click="vote(option._id)" v-if="ongoing">
                        VOTE
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    poll: Object,
});

const user = useUserStore();

const ongoing = computed(() => props.poll.endTime - Date.now() > 0);
const voted = computed(() =>
    props.poll.options.find((i) => i.votes.includes(user.data._id))
);

function vote(optionId) {
    user.vote(props.poll._id, optionId);
}
</script>
