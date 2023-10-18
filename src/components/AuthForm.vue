<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <v-sheet width="300" class="mx-auto">
        <v-form>
          <v-text-field v-model="email" label="Email"></v-text-field>
          <v-text-field v-model="vitalId" label="Vital Id"></v-text-field>
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
  <v-snackbar color="error" :timeout="2000" v-model="showVoteError">
    You have already voted for this subject
  </v-snackbar>
</template>

<script lang="ts">
import { login } from "../util";
export default {
  data() {
    return {
      showVoteError: false,
      email: "",
      vitalId: "",
      password: "",
    };
  },
  methods: {
    async validate() {
      if (await login(this.vitalId, this.email, this.password)) {
        this.showVoteError = true;
      }
    },
  },
};
</script>
