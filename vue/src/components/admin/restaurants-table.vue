<template>
  <section class="restaurants" v-if="allRestaurant != null">
    <div
      class="alert alert-warning"
      role="alert"
      v-if="allRestaurant.length == 0"
    >
      Aucun restaurant
    </div>
    <table class="table table-striped" v-if="allRestaurant.length != 0">
      <thead>
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Nom</th>
          <th scope="col">Catégorie</th>
          <th scope="col">Adresse</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="restaurant in allRestaurant" :key="restaurant.id">
          <td>
            <img v-bind:src="restaurant.logo.url" class="image" />
          </td>

          <td>{{ restaurant.name }}</td>
          <td>{{ restaurant.category }}</td>
          <td>{{ restaurant.address | truncate(40) }}</td>
          <td class="modification-row">
            <router-link
              v-bind:to="{
                name: 'AdminRestaurantDashboard',
                params: { id: restaurant.id },
              }"
            >
              <button class="edit-button">
                <i class="fas fa-edit edit"></i>
              </button>
            </router-link>
            <button
              class="delete-button"
              v-on:click="setRestaurantDelete(restaurant.id)"
            >
              <i class="fa fa-trash delete"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      allRestaurant: null,
      info: null,
    };
  },
  filters: {
    truncate: function(value, limit) {
      if (value.length > limit) {
        value = value.substring(0, limit - 3) + "...";
      }
      return value;
    },
  },

  mounted() {
    this.getAllRestaurant();
  },

  methods: {
    async getAllRestaurant() {
      const response = await axios
        .get("/api/restaurant/all")
        .then(function(response) {
          return response;
        })
        .catch(function(error) {
          console.log(error);
        });

      this.allRestaurant = response.data.results;
    },
    async setRestaurantDelete(id) {
      const response = await axios
        .get("/api/admin/restaurant/" + id + "/delete")
        .then(function(response) {
          return response;
        })
        .catch(function(error) {
          console.log(error);
        });

      console.log(response.data);

      this.info = response.data;

      if (response.data.success) {
        location.reload();
      }
    },
  },
};
</script>
