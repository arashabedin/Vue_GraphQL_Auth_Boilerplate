<template>
  <el-container>
    <el-header></el-header>

    <el-main>
      <div class="container-center">
        <div>Welcome! Finish setting up your account</div>

        <div v-if="error" class="error">{{ error }}</div>

        <el-form ref="form" :model="form">
          <el-form-item>
            <label>Email</label>
            <el-input v-model="form.email" placeholder="Your email"></el-input>
            <label>First name</label>
            <el-input v-model="form.firstname" placeholder="Your first name"></el-input>
            <label>Last name</label>
            <el-input v-model="form.lastname" placeholder="Your last name"></el-input>
            <label>Password</label>
            <el-input v-model="form.password" type="password" placeholder="Password"></el-input>
          </el-form-item>
          <el-form-item>
            <div id="signup-submit" @click="signup" class="ui big green labeled icon button">
              <i class="check icon"></i>
              Sign up
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { Signup } from "../constants/query.gql";
import Auth from "../modules/Auth.js";
export default {
  data() {
    return {
      error: false,
      form: {
        firstname: "",
        lastname: "",
        password: ""
      }
    };
  },
  methods: {
    async signup() {
      this.$apollo.provider.clients.defaultClient.cache.reset();
      const { email, firstname, lastname, password } = this.form;
      if (!(email && firstname && lastname && password)) {
        this.error = "Please complete the form";
        return;
      }
      this.$apollo
        .mutate({
          mutation: Signup,
          variables: {
            email,
            firstname,
            lastname,
            password
          }
        })
        .then(({ data: { signup } }) => {
          const id = signup.user.id;
          const token = signup.token;
          Auth.authenticateUser(id, token);
          this.$root.$data.userId = id;
          this.$router.push({ name: "dashboard" });
        })
        .catch(error => {
          if (error) {
            this.error = error;
            console.log(error);
          } else {
            this.error =
              "Registration Succeed. Please confirm your email, via the link we've sent to your email";
          }
        });
    }
  }
};
</script>

<style scoped>
#signup-submit {
  width: 100%;
}
.el-button {
  width: 100%;
}
.error {
  padding-top: 10px;
}
</style>