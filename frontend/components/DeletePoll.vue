<template>
    <div class="delete-poll-container">
        <h1>Delete a poll</h1>
        <div v-for="poll of userPolls" v-if="userPolls.length > 0">
            {{ poll.title }}
            <button @click="user.deletePoll(poll._id)">Delete Poll</button>
        </div>
        <div v-else>You don't have any polls to delete</div>
    </div>
</template>
<style lang="scss" scoped>
.delete-poll-container {
    margin: 2rem;
}
</style>

<script setup>
const user = useUserStore();
const userPolls = computed(() =>
    user.polls.filter((i) => i.owner == user.data._id)
);
</script>
