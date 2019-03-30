<template>
  <el-container>
    <el-header>
    </el-header>

    <el-main>
      <div class="container-center">
        <h2>Welcome!</h2>
            <sui-button content="Pause" icon="pause" label-position="left" />

        <button @click="goToSignUp"> Create a New Account </button>
      </div>
    </el-main>
  </el-container>

</template>

<script>
import { CaptureEmail } from '../constants/query.gql'
import { validateEmail } from '@/helpers/helpers'
export default {
  data() {
    return {
      submitted: false,
      error: false,
      form: {
        email: '',
      }
    }
  },
  methods: {
    goToSignUp() {
       this.$router.push({ name: "signup" });
    },
  }
}
</script>

<style scoped lang="scss">
.el-button {
  width: 100%;
}
.error {
  padding-top: 10px;
}
</style>
