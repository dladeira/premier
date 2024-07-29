<template>
    <div class="create-poll-container">
        <form @submit.prevent="createPoll()">
            <button type="submit" class="create-new-poll">Create A New Poll</button>
        </form>
    </div>
</template>

<style lang="scss" scoped>
.create-new-poll {
    display: block;

    margin: 4rem auto 0;
    padding: 0.5rem 0.75rem;

    border: 1px solid white;

    font-size: 1.25rem;
    background-color: transparent;
    color: white;

    &:hover {
        background-color: rgba(white, 0.2);
        cursor: pointer;
    }
}
</style>

<script setup>
const user = useUserStore();

function createPoll() {
    user.createPoll();
}
</script>
