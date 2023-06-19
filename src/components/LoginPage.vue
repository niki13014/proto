<!--umieszczenie komponentów -->
<template>
  <div class="main-page">
    <div class="login-menu">
      <div class="logo">
        <!-- logo -->
        <img class="logo-image" src="../assets/smog_smart.png" />
      </div>
      <div class="form">
          <div class="field">
            <!-- pole logowania -->
              <label for="username2">Username</label>
              <InputText id="username2" type="username" v-model="userName"/>
          </div>
          <div class="field">
            <!-- pole hasla -->
              <label for="pword">Password</label>
              <InputText id="pword" type="password" v-model="password"/>
          </div>
          <div class="field" v-show="error">
            <div class="error">
              <!-- informacja o bledzie logowania -->
              Wrong username or password.
            </div>
          </div>
          <div class="field">
              <Button class="log-in-button" label="Log in" @click="onLoginClick()"/>
          </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class LoginPage extends Vue {
  userName = "";
  password = "";
  error = false;

  // jak uzytkownik kliknie login wowczas sprawdzi sie czy dane sa dobre jesli tak to przekieruje strone
  onLoginClick() {
    if(this.userName == 'demo' && this.password == 'qwerty') {
      this.error = false;
      this.$router.push('/main');
    } 
    else {
      this.error = true;
    }
  }
  
}
</script>

<style scoped>
.main-page {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #E9E9E9;
  height: 100%;
}
.login-menu {
  color: #fff;
  background-color: #686161;
  border-radius: 1em;
}
.logo-image {
  margin: 1em;
  width: 10em;
  border-radius: 0.5em;
}
.app-name {
  font-size: 2em;
  font-weight: bold;
}
.field {
  margin: 1em;
  display: flex;
  flex-direction: column;
  align-items: baseline;
}
.field label {
  font-weight: 700;
}
.field .log-in-button {
  width: 100%;
  background-color: #403c3c;
  border: none;
}
.field .log-in-button:hover {
  width: 100%;
  background-color: #b9acac;
  color: #403c3c
}
.field .error {
  color: rgb(246, 99, 99);
}
</style>
