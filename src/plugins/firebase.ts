import store from "@/store";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { ref, onUnmounted, computed } from "vue";

const config = {
  apiKey: "AIzaSyAJC0xyYgTx2vrIFZ2K9h4rmN4aT8_4CuQ",
  authDomain: "vue-ts-firebase-915b8.firebaseapp.com",
  projectId: "vue-ts-firebase-915b8",
  storageBucket: "vue-ts-firebase-915b8.appspot.com",
  messagingSenderId: "993056706700",
  appId: "1:993056706700:web:87649c8bebb5ec8ae2aba9",
};

const app = initializeApp(config);
export const firestore = getFirestore(app);
export const auth = getAuth(app);

export const useAuth = () => {
  const user = ref<any | null>(null);
  const unsubscribe = auth.onAuthStateChanged((_user) => (user.value = _user));
  onUnmounted(unsubscribe);
  const isLogin = computed(() => user.value !== null);

  const signIn = async () => {
    const googleProvider = new GoogleAuthProvider();
    await signInWithRedirect(auth, googleProvider)
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
