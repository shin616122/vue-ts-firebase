<template>
  <div class="Login">
    <h1><strong>Vue</strong></h1>
    <div v-if="isLogin" class="login">
      <va-button @click="signOut"> Sign Out </va-button>
    </div>
    <va-button v-else @click="signIn"> Sign In </va-button>
  </div>
</template>

<script lang="ts">
import { ComputedRef, Ref } from "vue";
import { useAuth } from "@/plugins/firebase";

export default {
  name: "Login",
  setup(): {
    user: Ref<unknown>;
    isLogin: ComputedRef<boolean>;
    signOut: () => Promise<void>;
    signIn: () => Promise<void>;
  } {
    const { user, isLogin, signOut, signIn } = useAuth();
    return { user, isLogin, signOut, signIn };
  },
};
</script>

<style lang="scss" scoped>
.container-fluid {
  width: 100%;
  position: absolute;
  top: 50%;
  -webkit-transform: translate(0%, -50%);
  transform: translate(0%, -50%);
}
</style>
