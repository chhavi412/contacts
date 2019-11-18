<template >
  <v-app id="viewcontact">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="green" dark v-on="on">ADD CONTACT</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">{{formTitle}}</span>
        </v-card-title>
        <v-card-text>
          <v-form align="center" justify="center" ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model.lazy="contact.name"
              :counter="10"
              :rules="[v => !!v || 'Name is required',
                      v => (v && v.length <= 10) || 'Name must be less than 10 characters']"
              label="Name"
              required
            ></v-text-field>

            <v-text-field
              v-model.lazy="contact.number1"
              label="Phone"
              type="text"
              :rules="[v => !!v || 'Contact No. is required',
                    v => /[0-9]{10}/.test(v)&& v.length==10 || 'No. must have 10 digits']"
              required
            ></v-text-field>

             <v-text-field
              v-model.lazy="contact.email"
              :rules="[v => !!v || 'E-mail is required',
                      v => /.+@.+\..+/.test(v) || 'E-mail must be valid']"
              label="E-mail"
              type="email"
              required
            ></v-text-field>
          </v-form>

          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text v-on:click="reset()">Reset</v-btn>
          <v-btn color="blue darken-1" text @click="close()">Close</v-btn>
          <v-btn color="blue darken-1" text v-on:click="addContact()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-expansion-panels multiple>
      <v-text-field label="search" name="search" type="text" v-model="search"></v-text-field>

      <v-expansion-panel v-for="contact in filterContacts">
        <v-expansion-panel-header>{{contact.name}}</v-expansion-panel-header>
        <v-expansion-panel-content>
          Phone:{{contact.number1}}
          <br />
          Email:{{contact.email}}
          <br />
          <v-btn color="primary" v-on:click="editcontact(contact)">Edit</v-btn>
          <v-btn color="primary" v-on:click="deletecontact(contact.id)">Delete</v-btn>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>    
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      disabled: false,
      valid: true,
      contacts: [],
      showp: false,
      search: "",
      dialog: false,
      contact: {
        name: "",
        number1: "",
        email: "",
        userid: ""
      },
      defaultItem: {
        name: "",
        number1: "",
        email: ""
      },
      editedIndex: -1,
      search: ""
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({ path: "/" });
    },

    deletecontact(delete_id) {
      this.$http
        .delete(`http://localhost:3000/api/contacts?id=${delete_id}`)
        .then(() => {
              this.$toaster.success("contact deleted successfully");

          this.contacts.splice(0);
          this.displayData();
        }).catch(error=>this.$toaster.error(JSON.stringify(error.body)));
      // console.log("deleted");
    },

    displayData() {
      let data = {
        userid: localStorage.getItem("users")
      };
      this.$http
        .post("http://localhost:3000/api/contacts/get", data)
        .then(function(data) {
          for (let i = 0; i < data.body.length; i++) {
            // if (data.body[i].userid == localStorage.getItem("userId"))
            {
              this.contacts.push(data.body[i]);
              // console.log(data.body[i].name);
            }
          }
        }).catch(error=>this.$toaster.error(JSON.stringify(error.body)));;
    },
    addContact: function() {
      console.log(this.$refs.form.validate());
      
      if ( this.$refs.form.validate() ){
        if (this.editedIndex == -1 && this.contact.name && this.contact.number1 ) {
          console.log(this.contact);

          this.$http
            .post("http://localhost:3000/api/contacts", this.contact)
            .then(data => {
              this.contacts.splice(0);
              this.displayData();
              this.$toaster.success("created contact successfully");
              console.log("created contact successfully");
              this.$refs.form.reset();
            })
            .catch(error => {
              this.$toaster.error(JSON.stringify(error.body));
              this.$refs.form.reset();

              console.log("error occurred" + JSON.stringify(error.body));
            });
          this.dialog = false;
        } else if (this.editedIndex > -1) {
          this.$http
            .put("http://localhost:3000/api/contacts", this.contact)
            .then(() => {
              this.contacts.splice(0);
              this.editedIndex = -1;

              this.displayData();
              console.log("updated contact successfully");
            })
            .catch(error=>this.$toaster.error("invalid email"));
             this.$refs.form.reset();
             this.dialog = false;
        }
      }
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.contact = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.valid = true;
        this.$refs.form.reset();
        // this.$refs.unnecessary.reset();


        // console.log(this.valid);
      }, 300);
    },
    reset() {
      this.dialog = false;
      this.editedIndex = -1;
      this.contact = Object.assign({}, this.defaultItem);
      this.dialog = true;
      this.valid = true;
      this.$refs.form.reset();
        // this.$refs.unnecessary.reset();

    },
    editcontact: function(contact) {
      this.editedIndex = this.contacts.indexOf(contact);
      this.contact = Object.assign({}, contact);
      this.dialog = true;
      this.valid = true;
    }
  },
  computed: {
    sortedArray: function() {
      function compare(a, b) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      }

      return this.contacts.sort(compare);
    },
    filterContacts: function() {
      // console.log(this.sortedArray, "filter");
      return this.sortedArray.filter(c => {
        return c.name.match(this.search);
      });
    },
    formTitle() {
      return this.editedIndex === -1 ? "Add Contact" : "Edit Contact";
    }
  },
  created() {
    this.displayData();
    this.contact.userid = localStorage.getItem("users");
    console.log(this.userid);
  }
};
</script>

<style>
</style>
