<template>
  <div class="main-div d-flex flex-wrap h-100 flex-column justify-center">
    <div class="d-flex flex-wrap h-100 flex-row justify-center">
      <v-alert
        v-model="alert"
        border="start"
        variant="tonal"
        closable
        close-label="Close Alert"
        color="deep-purple-accent-4"
        title="Message Important !"
        max-width="500"
        class="align-self-center mt-5"
      >
        Tous les champs sont obligatoirs pour une inscription
      </v-alert>

      <v-alert type="success" variant="outlined" v-model="accept">
        Votre compte a été créé avec succès
      </v-alert>
    </div>
    <div class="d-flex flex-wrap h-100 flex-row justify-center">
      <v-card
        max-width="500"
        class="card w-100 ma-5 pa-5 rounded d-flex flex-column h-100 flex-wrap justify-center"
      >
        <v-card-title class="align-self-center mt-5"
          >J'ai un compte</v-card-title
        >
        <v-text-field label="login" v-model="userToLog.login"></v-text-field>
        <v-text-field
          label="Mot de passe"
          type="password"
          v-model="userToLog.password"
        ></v-text-field>
        <v-row align="center" justify="center">
          <v-col cols="auto" class="mb-2">
            <v-btn @click="sendRequestLogin">Me connecter</v-btn>
          </v-col>
        </v-row>
      </v-card>
      <v-card
        max-width="500"
        class="card w-100 ma-5 pa-5 rounded d-flex flex-column h-100 flex-wrap justify-center"
      >
        <v-card-title class="align-self-center mt-5"
          >Je demande accès</v-card-title
        >
        <v-text-field
          v-model="userToCreate.lastname"
          label="Nom"
        ></v-text-field>
        <v-text-field
          v-model="userToCreate.firstname"
          label="Prénom"
        ></v-text-field>
        <v-text-field v-model="userToCreate.email" label="Email"></v-text-field>
        <v-text-field label="login" v-model="userToCreate.login"></v-text-field>
        <v-text-field
          label="Mot de passe"
          type="password"
          v-model="userToCreate.password"
        ></v-text-field>
        <v-text-field
          v-model="userToCreate.checkPassword"
          label="Confirmation"
        ></v-text-field>
        <v-row align="center" justify="center">
          <v-col cols="auto" class="mb-2">
            <v-btn @click="sendRequestAccess">Créer mon compte</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormAuth',
  props: {
    msg: String,
  },
  data() {
    return {
      accept: false,
      acceptLogin: false,
      alert: false,
      baseUrl: 'http://localhost:3000',
      userToCreate: {
        firstname: '',
        lastname: '',
        login: '',
        email: '',
        password: '',
        checkPassword: '',
      },
      userToLog: {},
      errMsg: false,
    };
  },
  methods: {
    async sendRequestAccess(e) {
      for (const elem in this.userToCreate) {
        console.log(this.userToCreate[elem]);
        if (this.userToCreate[elem] === '') {
          this.alert = true;
          throw new Error('test err');
        }
      }
      e.preventDefault();
      try {
        const response = await fetch(`${this.baseUrl}/auth/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:8080',
          },
          body: JSON.stringify(this.userToCreate),
        });
        if (response.status === 200) {
          this.accept = true;
        }

        // this.userToCreate = {};
      } catch (err) {
        console.log(err);
      }
    },
    async sendRequestLogin(e) {
      e.preventDefault();

      try {
        const response = await fetch(`${this.baseUrl}/auth/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:8080',
          },
          body: JSON.stringify(this.userToLog),
        });
        this.userToLog = {};
        if (response.status === 200) {
          this.$router.push('/estate');
        }
      } catch (err) {
        console.log(err);
      }
    },
    checkForm() {
      for (const elem in this.userToCreate) {
        console.log(this.userToCreate[elem]);
        if (this.userToCreate[elem] === '') {
          this.alert = true;
          return false;
        }
      }
    },
    checkFormLogin() {
      for (const elem in this.userToLog) {
        if (this.userToLog[elem] === '') {
          this.alert = true;
          return false;
        }
      }
    },
  },
};
</script>

<style>
.section {
  margin: 20rem;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  gap: 5rem;
}
.section__form {
  background-color: rgb(228, 201, 136);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 10px;
  width: 35rem;
  height: 20rem;
  position: relative;
  padding-top: 20px;
  top: 45%;
}
.section__form-request {
  color: blue;
  display: flex;
  width: 100%;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: flex-start;
}
.section__form_content {
  display: flex;
  justify-content: center;
  width: 100%;
  /* height: 100vh; */
  margin: 5px;
  flex-wrap: wrap;
  align-content: flex-end;
  gap: 2rem;
}
.section__form_content div {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  /* gap: 1rem; */
}
.section__form_content label {
  /* margin-right: 2px; */
}
.section__form_content input {
  padding-left: 2px;
}
.input-form {
  border-radius: 5px;
  text-align: center;
  padding: 0.5rem;
}
.selectlist {
  padding: 0.4rem;
  width: 100%;
  font-family: 'Asap', sans-serif;
  position: relative;
  padding-right: 5rem;
  padding-left: 5rem;
}
.section__form-job label {
  font-size: 15px;
}
.selectlist:after {
  position: absolute;
  content: '';
  top: 14px;
  right: 10px;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-color: #fff transparent transparent transparent;
}
.section__form-title {
  color: white;
  font-weight: 900;
  font-size: 2rem;
  position: absolute;
  bottom: 40px;
}
select {
  margin-top: 10px;
  width: 100%;
  padding: 5px 35px 5px 5px;
  font-size: 18px;
}
.btn {
  border-radius: 5px;
  text-align: center;
  padding: 0.5rem;
  position: absolute;
  bottom: 10px;
}
</style>
