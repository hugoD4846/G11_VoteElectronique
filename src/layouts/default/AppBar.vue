<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <v-icon icon="mdi-email-lock" />
      Electron Vote
    </v-app-bar-title>
    <drop-down title="Menu" :items="dropdownItems"></drop-down>
  </v-app-bar>
</template>

<script lang="ts">
import DropDown from "../../components/DropDown.vue";
import { logout } from "../../util";
export default {
  components: {
    DropDown,
  },
  data() {
    return {
      dropdownItems: [
        {
          name: "Deconnexion",
          action: () => {
            logout();
          },
        },
      ],
    };
  },
};
//
</script>
