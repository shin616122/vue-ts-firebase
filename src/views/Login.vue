<template>
  <div class="row">
    <div class="flex sm4 md7">
      <div class="left-item item" />
    </div>
    <div class="flex xs12 sm8 md5">
      <va-card class="item card-box-shadow">
        <div style="padding: 64px 32px">
          <va-avatar icon="lock_outline" style="margin: 8px" color="#9C27B0" />
          <h1 class="display-6">Sign in</h1>
          <div style="margin: 24px 0px 16px 0px">
            <div v-if="isLogin" class="login">
              <va-button @click="signOut" class="va-button" color="#607d8b"
                >Sign Out</va-button
              >
            </div>
            <va-button v-else @click="signIn" class="va-button" color="#607d8b"
              >Sign In With Google</va-button
            >
          </div>
          <div>
            <p>
              Copyright ©
              <a href="https://mui.com/"> Xavier Chan </a>
              {{ new Date().getFullYear() }}
              .
            </p>
          </div>
        </div>
      </va-card>
    </div>
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
.item {
  height: 100vh;
}

.card-box-shadow {
  box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%),
    0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%);
}

.left-item {
  background-image: url(https://source.unsplash.com/featured/?rock-climbing);
  background-repeat: no-repeact;
  background-size: cover;
  background-position: center;
}
.va-button {
  width: 100%;
}
</style>
