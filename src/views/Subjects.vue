<template>
  <div class="d-flex justify-center">
    <v-data-table
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="subjects"
      item-value="name"
      class="elevation-1"
    >
      <template v-slot:item.actions="{ item }">
        <v-btn @click="viewPanels(item)"> Show propositions </v-btn>
      </template>
    </v-data-table>
  </div>

  <v-overlay v-model="showOverlay" class="justify-center align-center">
    <v-row align="center" justify="center" class="overlay-content">
      <v-card class="custom-card">
        <v-select
          v-model="choosenVote"
          return-object
          item-title="name"
          item-value="name"
          :items="panel"
          :label="choosenSubject.name"
        >
        </v-select>

        <v-card-actions>
          <v-btn :disabled="choosenVote == null" @click="voteForPanel">
            Vote
          </v-btn>
          <v-btn @click="showOverlay = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-overlay>
  <v-snackbar color="error" :timeout="2000" v-model="showVoteError">
    You have already voted for this subject
  </v-snackbar>
  <v-snackbar
    :timeout="2000"
    color="success"
    v-model="showVoteToaster"
    variant="outlined"
  >
    Vote successfully added
  </v-snackbar>
</template>
<style>
.overlay-content {
  height: 100%;
}

.custom-card {
  width: 300px; /* Set the desired width of the card */
}
</style>
<script>
import axios from "axios";

export default {
  created() {
    axios.get("/subject", {}).then(
      (response) => {
        this.subjects = response.data;
        this.setNbOfVotes(this.subjects);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  methods: {
    voteForPanel() {
      axios
        .post("/vote", {
          panelId: this.choosenVote.id,
          subjectId: this.choosenSubject.id,
        })
        .then(
          (response) => {
            this.choosenSubject.nbVotes++;
            this.showOverlay = false;
            this.showVoteToaster = true;
          },
          (error) => {
            this.showVoteError = true;
          }
        );
    },

    setNbOfVotes(items) {
      let nbVotes = 0;
      for (const item of items) {
        nbVotes = 0;
        for (const panel of item.Panel) {
          console.log("panel", panel);
          nbVotes += panel._count.votes;
        }
        item.nbVotes = nbVotes;
      }
    },
    viewPanels(item) {
      // get items
      this.choosenSubject = item;
      this.panel = this.choosenSubject.Panel;
      this.showOverlay = true;
    },
  },

  data() {
    return {
      showVoteToaster: false,
      choosenVote: null,
      panel: [],
      showOverlay: false,
      subjects: [],
      choosenSubject: "",
      headers: [
        {
          title: "Name",
          align: "start",
          sortable: false,
          key: "name",
        },
        { title: "Creation date", key: "createdAt" },
        { title: "Number of votes", key: "nbVotes" },
        { title: "Proposals", key: "actions" },
      ],
    };
  },
};
</script>
