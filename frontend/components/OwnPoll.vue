<template>
    <div class="own-poll-container">
        <div>
            <label>Title:</label>
            <input v-model="title" />
        </div>
        <div>
            <label>Description:</label>
            <input v-model="description" />
        </div>

        <div>
            <label>Options:</label>
            <div v-for="option of options">
                <input :name="`option-${option.name}`" v-model="option.name" />
                <button @click="deleteOption(option._id)">Delete option</button>
            </div>
            <button @click="addOption()">Add Option</button>
        </div>

        <div>
            <input type="date" name="date" v-model="endTimeDate" />
            <input type="time" name="time" v-model="endTimeTime" />
        </div>

        <button @click="user.deletePoll(poll._id)">Delete Poll</button>
    </div>
</template>
<style lang="scss" scoped>
.own-poll-container {
    margin: 2rem;
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
const endTime = computed(() =>
    new Date(endTimeDate.value + " " + endTimeTime.value).getTime()
);
const endTimeDate = ref(
    new Date(props.poll.endTime).toISOString().split("T")[0]
);
const endTimeTime = ref(
    `${new Date(props.poll.endTime).getHours()}:${new Date(
        props.poll.endTime
    ).getMinutes()}`
);

function addOption() {
    options.value.push({
        name: "new option",
        _id: generateId(),
    });
}

watch([title, description, options, endTime], updatePoll, { deep: true });

function updatePoll() {
    user.updatePoll(
        props.poll._id,
        title.value,
        description.value,
        options.value,
        endTime.value
    );
}
function generateId() {
    return [...Array(24)]
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join("");
}

function deleteOption(_id) {
    options.value = options.value.filter((i) => i._id != _id);
}
</script>
