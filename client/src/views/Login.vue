<template>
  <el-container>
    <el-header></el-header>

    <el-main>
      <div class="container-center">
        <h2>Log in</h2>

        <div v-if="error" class="error">{{ error }}</div>

        <el-form ref="form" :model="form">
          <el-form-item>
            <label>Email</label>
            <el-input v-model="form.email" placeholder="Email"></el-input>
            <label>Password</label>
            <el-input v-model="form.password" type="password" placeholder="Password"></el-input>
          </el-form-item>
          <el-form-item>
            <div @click="login" id="signin-button" class="ui big blue labeled icon button">
              <i class="sign-in icon"></i>
              Sign In
            </div>
          </el-form-item>
        </el-form>

        <div>
          <span>Don't have an account?</span>
          <div  @click="goToSignUp" id="signup-button" class="ui big green labeled icon button">
            <i class="signup icon"></i>
            Create an account
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { Login } from "../constants/query.gql";
import Auth from "../modules/Auth.js";

export default {
  data() {
    return {
      error: false,
      form: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async goToSignUp() {
      this.$router.push({ name: "signup" });
    },
    async login() {
      this.$apollo.provider.clients.defaultClient.cache.reset();
      const { email, password } = this.form;
      if (email && password) {
        this.$apollo
          .mutate({
            mutation: Login,
            variables: { email, password }
          })
          .then(async data => {
            const login = data.data.login;
            const id = login.user.id;
            const token = login.token;
            Auth.authenticateUser(id, token);
            this.$router.push({ name: "dashboard" });
          })
          .catch(error => {
            this.error = "Invalid email or password";
            console.log(error);
          });
      }
    }
  }
};
</script>

<style scoped>
.el-button {
  width: 100%;
}
#signup-button,
#signin-button {
  width: 100%;
  margin-top: 20px;
}
</style>