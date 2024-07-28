<template>
    <div class="own-poll-container">
        <div class="entry">
            <label class="key">Title</label>
            <input class="input input-title" v-model="title" />
        </div>
        <div class="entry">
            <label class="key">Description</label>
            <input class="input" v-model="description" />
        </div>

        <div>
            <label class="key">Options</label>
            <div v-for="option of options" class="entry">
                <div class="option-key-container">
                    <input class="input" :name="`option-${option.name}`" v-model="option.name" />
                    <p class="option-key-votes">{{ option.votes.length }} votes</p>
                </div>
                <button class="delete-option" @click="deleteOption(option._id)">Delete option</button>
            </div>
            <button class="add-option" @click="addOption()">Add Option</button>
        </div>

        <div class="entry">
            <label class="key">End Time</label>
            <div class="value-end-time">
                <input class="input" type="date" name="date" v-model="endTimeDate" />
                <input class="input" type="time" name="time" v-model="endTimeTime" />
            </div>
        </div>

        <button class="delete-poll" @click="user.deletePoll(poll._id)">Delete Poll</button>
    </div>
</template>

<style lang="scss" scoped>
.entry {
    display: flex;
    justify-content: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    margin: 1rem 0;
}

.key {
    font-size: 1rem;
    color: rgba(white, 0.5);
}

.input {
    padding-bottom: 2px;

    border: none;
    border-bottom: 1px solid white;

    background-color: transparent;
    color: white;

    &:focus {
        outline: none;
    }
}

.option-key-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 2rem;
}

.delete-option {
    padding: 0.25rem 0.5rem;

    border: 1px solid white;
    border-radius: 0;

    background-color: transparent;
    color: white;

    &:hover {
        background-color: rgba(white, 0.2);

        cursor: pointer;
    }
}

.add-option {
    margin-bottom: 1rem;
    padding: 0.25rem 0.5rem;

    border: 1px solid white;
    border-radius: 0;

    background-color: transparent;
    color: white;

    &:hover {
        background-color: rgba(white, 0.2);

        cursor: pointer;
    }
}

.value-end-time {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}

.delete-poll {
    @extend .delete-option;

    margin-top: 1rem;
}
</style>

<script setup>
const user = useUserStore();

const props = defineProps({
    poll: Object,
});

const title = ref(props.poll.title);
const description = ref(props.poll.title);
const options = ref(props.poll.options);
const endTime = computed(() => new Date(endTimeDate.value + " " + endTimeTime.value).getTime());
const endTimeDate = ref(new Date(props.poll.endTime).toISOString().split("T")[0]);
const endTimeTime = ref(`${new Date(props.poll.endTime).getHours()}:${new Date(props.poll.endTime).getMinutes()}`);

function addOption() {
    options.value.push({
        name: "new option",
        _id: generateId(),
    });
}

watch([title, description, options, endTime], updatePoll, { deep: true });

function updatePoll() {
    user.updatePoll(props.poll._id, title.value, description.value, options.value, endTime.value);
}
function generateId() {
    return [...Array(24)].map(() => Math.floor(Math.random() * 16).toString(16)).join("");
}

function deleteOption(_id) {
    options.value = options.value.filter((i) => i._id != _id);
}
</script>
