<template>
  <v-app id="login">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form">
                  <div
                    class="alert"
                    v-if="credentials==false"
                  >* Please enter some valid email and password</div>
                  <v-text-field label="Email" name="email" type="text" v-model.lazy="users.email"></v-text-field>
                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    v-model.lazy="users.password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" v-on:click="post()">Login</v-btn>
                <v-btn color="primary" v-on:click="navigate()">Register</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import ViewContact from "./viewcontact.vue";

export default {
  data() {
    return {
      credentials: true,
      users: {
        email: "",
        password: "",
        // id: -1,
        // username: "",
        // useremail: "",
        userId: ""
      }
    };
  },
  methods: {
    post: function() {
      if (this.$refs.form.validate()) {
        if (this.users.email && this.users.password) {
          this.$http
            .post(`http://localhost:3000/api/users/login`, this.users)
            .then(data => {
              console.log(data);
              localStorage.setItem("users", data.body.id);
              // this.$router.push('/home');
              this.$router.push("/home");
              this.$toaster.success("successfully logged in");
            })
            .catch(error => {
              this.$toaster.error(JSON.stringify(error.body));

              // console.log("error occurred"+JSON.stringify(error.body));
            });
        } else {
          this.credentials = false;
        }
      }
    },
    navigate() {
      this.$router.push({ path: "/register" });
    }
  }
};
</script>

<style scoped>
.alert {
  color: red;
}
</style>
