<template>
  <v-app id="register">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Registration form</v-toolbar-title>
              </v-toolbar>
              <div
                class="alert"
                v-if="credentials==false"
              >* All fields are necessary and should be as mentioned</div>
              <v-card-text>
                <v-form align="center" justify="center" ref="form" lazy-validation>
                  <v-text-field
                    v-model.lazy="users.name"
                    :counter="10"
                    :rules="[v => !!v || 'Name is required',
                      v => (v && v.length <= 10) || 'Name must be less than 10 characters']"
                    label="Name"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model.lazy="users.email"
                    :rules="[v => !!v || 'E-mail is required',
                      v => /.+@.+\..+/.test(v) || 'E-mail must be valid']"
                    label="E-mail"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model.lazy="users.address"
                    :rules="[v => !!v || 'Address is required']"
                    label="Address"
                    type="text"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model.lazy="users.phone"
                    label="Phone"
                    type="text"
                    :rules="[v => !!v || 'Contact No. is required',
                    v => /[0-9]{10}/.test(v)&& v.length==10 || 'No. must have 10 digits']"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model.lazy="users.password"
                    :rules="[v => !!v || 'Password is required',
                    v => /.(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,}/.test(v) || 'Password must have atleast 1 Capital, 1 special, 1 numeric and more than 8 characters']"
                    label="Password"
                    type="password"
                    required
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="success" class="mr-4" @click="validate">Register</v-btn>
                <v-btn color="success" class="mr-4" @click="login()">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      credentials: true,
      users: {
        name: "",

        email: "",

        password: "",

        address: "",

        phone: ""
      }
    };
  },
  methods: {
    validate() {
      if (
        this.$refs.form.validate() &&
        this.users.name &&
        this.users.email &&
        this.users.password &&
        this.users.address &&
        this.users.phone
      ) {
        this.$http
          .post("http://localhost:3000/api/users", this.users)
          .then(data => {
            // this.$router.push({ path: "/home" });
            // alert(data.data)
            this.$toaster.success("Registered successfully");
            this.$router.push({ path: "/login" });
          })
          .catch(error => {
            this.$toaster.error(JSON.stringify(error.message));
          });
      } else {
        this.credentials = false;
      }
    },
    login() {
      this.$router.push({ path: "/login" });
    }
  }
};
</script>

<style scoped>
.alert {
  color: red;
}
</style>