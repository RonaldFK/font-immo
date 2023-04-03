<template>
  <div class="main-div d-flex flex-wrap h-100 flex-column justify-center">
    <v-card class="d-flex flex-wrap h-100 flex-column justify-center">
      <v-card-text v-for="message in messages" :key="message.message">{{
        message.message
      }}</v-card-text>

      <v-text-field v-model="value" label="test"></v-text-field>
      <v-btn @click="onSubmit">Envoyer</v-btn>
    </v-card>
  </div>
</template>

<script>
import { socket } from '@/socket';

export default {
  name: 'MyForm',

  data() {
    return {
      isLoading: false,
      value: '',
      messages: [],
    };
  },

  methods: {
    onSubmit() {
      console.log(this.value);
      this.isLoading = true;
      socket.emit('chat message', this.value);
      this.value = '';
      this.test();
    },
    test() {
      socket.on('my broadcast', (data) => {
        console.log(this.messages);
        this.messages.push(data);
      });
    },
  },
};
</script>
<style></style>
