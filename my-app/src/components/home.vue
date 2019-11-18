<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item @click="userDetails()">
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="contacts()">
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="logout()">
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer">=</v-app-bar-nav-icon>
      <v-toolbar-title>Contact Book</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <div v-if="show===1">
            <h2>Name:{{details.name}}</h2>
            <p>Email:{{details.email}}  Phone no.{{details.phone}}</p>
          </div>

          <!-- show contact list -->
          <div v-if="show===2" class="contactdiv">
            <app-contacts></app-contacts>
          </div>
        </v-row>
      </v-container>
    </v-content>
    <v-footer color="indigo" app></v-footer>
  </v-app>
</template>

<script>
import Contacts from "./viewcontact.vue";
// import AddContact from './addContactbutton.vue'
export default {
  components: {
    "app-contacts": Contacts
  },

  data() {
    return {
      show: 2,
      drawer: false,
      details: {
        name: "",
        email: "",
        phone: "",
        userid: ""
      }
    };
  },

  methods: {
    userDetails() {
      this.show = 1;
      this.details.userid = localStorage.getItem("users");
      console.log(this.details.userid);

      this.$http
        .post(`http://localhost:3000/api/users/home1`, this.details)
        .then(data => {
          console.log(data.body);

          this.details.name = data.body.name;
          this.details.email = data.body.email;
          this.details.phone = data.body.phone;
        });
    },
    contacts() {
      this.show = 2;
    },

    settings() {
      this.show = 3;
    },
    logout() {
      localStorage.clear();
      this.$router.push({ path: "/" });
    }
  }
};
</script>

<style scoped>
.contactdiv {
  min-width: 800px;
  max-width: 800px;
}
</style>>
