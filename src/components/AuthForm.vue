<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <v-sheet width="300" class="mx-auto">
        <v-form>
          <v-text-field v-model="username" label="Username"></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
          ></v-text-field>
          <v-btn color="success" class="mt-4" block @click="validate">
            Validate
          </v-btn>
        </v-form>
      </v-sheet>
    </v-responsive>
  </v-container>
</template>

<script lang="ts">
import { login } from "../util";
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    validate() {
      login(this.username, this.password);
    },
  },
};
</script>
