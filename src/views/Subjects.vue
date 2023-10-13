<template>
  <div class="d-flex justify-center">
    <v-data-table v-model:items-per-page="itemsPerPage" :headers="headers" :items="subjects" item-value="name" class="elevation-1">
      <template v-slot:item.actions="{ item }">
        <v-btn @click="viewPanels(item)"> Show propositions </v-btn>
      </template>
    </v-data-table>
  </div>

  <v-overlay v-model="showOverlay" class="justify-center align-center">
    <v-row align="center" justify="center" class="overlay-content">
      <v-card class="custom-card">
        <v-select v-model="choosenVote" return-object item-title="name" item-value="name" :items="panel" :label="choosenSubject.name">
        </v-select>

        <v-card-actions>
          <v-btn :disabled="choosenVote == null" @click="voteForPanel"> Vote </v-btn>
          <v-btn @click="showOverlay = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-overlay>
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
import axios from 'axios';

export default {
  created() {
    axios
      .get('/subject', {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2aXRhbElkIjoiMTI2OTY5Mzg3OTM3MDkiLCJpZCI6IjViZGU1ZmE1LTkwMDgtNDZmNi1iNjQ0LTMyNzhmYTA4NzQ5NSIsImlhdCI6MTY5NzE5MDU2MSwiZXhwIjoxNjk3MjUwNTYxfQ.b21VozArFlvJ9AaZFlpny0NeFQc8iuz_FjVmNrxqZAk',
        },
      })
      .then(
        response => {
          console.log('response', response);
          this.subjects = response.data;
        },
        error => {
          console.log(error);
        }
      );
  },
  methods: {
    voteForPanel() {
      axios
        .post(
          '/vote',
          { panelId: this.choosenVote.id, subjectId: this.choosenSubject.id },
          {
            headers: {
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2aXRhbElkIjoiMTI2OTY5Mzg3OTM3MDkiLCJpZCI6IjViZGU1ZmE1LTkwMDgtNDZmNi1iNjQ0LTMyNzhmYTA4NzQ5NSIsImlhdCI6MTY5NzE5MDU2MSwiZXhwIjoxNjk3MjUwNTYxfQ.b21VozArFlvJ9AaZFlpny0NeFQc8iuz_FjVmNrxqZAk',
            },
          }
        )
        .then(
          response => {
            this.showOverlay = false;
            this.showVoteToaster = true;
          },
          error => {
            console.log(error);
          }
        );
    },
    viewPanels(item) {
      // get items
      this.choosenSubject = item;

      axios
        .get(`/subject/${item.id}/panels`, {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2aXRhbElkIjoiMTI2OTY5Mzg3OTM3MDkiLCJpZCI6IjViZGU1ZmE1LTkwMDgtNDZmNi1iNjQ0LTMyNzhmYTA4NzQ5NSIsImlhdCI6MTY5NzE5MDU2MSwiZXhwIjoxNjk3MjUwNTYxfQ.b21VozArFlvJ9AaZFlpny0NeFQc8iuz_FjVmNrxqZAk',
          },
        })
        .then(response => {
          console.log('panel : ', response);
          this.panel = response.data.Panel;
        })
        .catch(error => {
          console.log(error);
        });
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
      choosenSubject: '',
      headers: [
        {
          title: 'Name',
          align: 'start',
          sortable: false,
          key: 'name',
        },
        { title: 'Organisation', key: 'organisation' },
        { title: 'Creation date', key: 'createdAt' },
        { title: 'Proposals', key: 'actions' },
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: 1,
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: 1,
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: 7,
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: 8,
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: 16,
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: 0,
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: 2,
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: 45,
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: 22,
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: 6,
        },
      ],
    };
  },
};
</script>
