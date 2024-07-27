<template>
    <div class="create-poll-container">
        <form @submit.prevent="createPoll">
            <h1>Create a poll</h1>
            <input type="text" name="title" placeholder="title" required />
            <input type="text" name="description" placeholder="description" required />
            <p>Options</p>
            <div v-for="option of options">
                <input :name="`option-${option.name}`" v-model="option.name" />
            </div>
            <button @click="addOption">Add New Option</button>
            <br />
            <br />
            <input type="date" name="date" required />
            <input type="time" name="time" required />
            <br />
            <br />
            <br />
            <button type="submit">Create Poll</button>
        </form>
    </div>
</template>

<script setup>
const user = useUserStore();
const options = useState("create-poll-options", () => [{ name: "option1" }, { name: "option2" }]);

function addOption() {
    options.value.push({ name: "option" });
}

function createPoll(e) {
    const endTime = new Date(e.target.date.value + " " + e.target.time.value);
    user.createPoll(e.target.title.value, e.target.description.value, options.value, endTime.getTime());
}
</script>
