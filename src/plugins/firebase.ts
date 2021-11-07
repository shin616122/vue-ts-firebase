import store from "@/store";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { ref, onUnmounted, computed } from "vue";

const config = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
};

const app = initializeApp(config);
export const firestore = getFirestore(app);
export const auth = getAuth(app);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAuth = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = ref<unknown | null>(null);
  const unsubscribe = auth.onAuthStateChanged((_user) => (user.value = _user));
  onUnmounted(unsubscribe);
  // const isLogin = computed(() => user.value !== null);
  const isLogin = computed(() => user.value !== null);

  const signIn = async () => {
    const googleProvider = new GoogleAuthProvider();
    await signInWithRedirect(auth, googleProvider)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then(function (result: any) {
        console.log(result);
        store.commit("onAuthStateChanged", result.user);
        store.commit("onUserStatusChanged", result.user.uid ? true : false);
        return result;
      })
      .catch(function (error) {
        console.log(error);
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  const signOut = () =>
    auth.signOut().then(() => {
      window.location.reload();
    });

  return { user, isLogin, signIn, signOut };
};
