<template>
  <div class="text-center">
    <v-menu open-on-hover transition="slide-y-transition">
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props"> {{ title }}</v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index">
          <v-list-item-title :onclick="item.action">{{
            item.name
          }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
      validator: (value) => {
        return value.every(
          (item) =>
            typeof item.name === "string" && typeof item.action === "function"
        );
      },
    },
  },
};
</script>
