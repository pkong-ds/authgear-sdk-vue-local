// src/components/Home.vue  
<script setup lang="ts">
import authgear, { Page, PromptOption } from "@authgear/web";
import { inject, onMounted, ref } from "vue";
import { UserStateSymbol } from "../contexts/UserProvider.vue";

const { isLoggedIn } = inject(UserStateSymbol)!;
const isLoading = ref(false);
const greetingMessage = ref("");

onMounted(() => {
  async function updateGreetingMessage() {
    isLoading.value = true;
    try {
      if (isLoggedIn.value) {
        const userInfo = await authgear.fetchUserInfo();
        greetingMessage.value = "The current User sub: " + userInfo.sub;
      }
    } finally {
      isLoading.value = false;
    }
  }

  updateGreetingMessage().catch((e) => {
    console.error(e);
  });
});

const startLogin = () => {
  // promote

  authgear
    .authenticateAnonymously()
    .then(({userInfo}) => {
      console.log({userInfo})
        // Logged in as anonymous user successfully
    })
    .catch((err) => {
        // Handle the error
    });


  // normal authentication

  // authgear
  //   .startAuthentication({
  //     redirectURI: "http://localhost:5173/auth-redirect",
  //     prompt: PromptOption.Login,
  //   })
  //   .then(
  //     () => {
  //       // started authorization, user should be redirected to Authgear
  //     },
  //     (err) => {
  //       // failed to start authorization
  //       console.error(err);
  //     }
  //   );
};

const promote = () => {
  authgear
    .startPromoteAnonymousUser({
        // Configure redirectURI which users will be redirected to
        // after they have promoted with Authgear.
        // You can use any path in your website.
        // Make sure it is in the "Redirect URIs" list of the Application.
        // The redirect uri for anonymous user promotion should be
        // different from the one for normal user authentication.
        // e.g. "https://yourdomain.com/promote-redirect"
        redirectURI: "http://localhost:5173/promote-redirect",
    })
    .then(() => {
      console.log("promotion started")
        // Started the promotion flow
    })
    .catch((err) => {
        // Failed to start the promotion flow
    });
}
const logout = () => {
  authgear
    .logout({
      redirectURI: "http://localhost:5173/",
    })
    .then(
      () => {
        greetingMessage.value = "";
      },
      (err) => {
        console.error(err);
      }
    );
};

const userSetting = async () => {
  await authgear.open(Page.Settings);
};
</script>

<template>
  <h1>Home Page</h1>
  <span v-if="isLoading">Loading...</span>
  <span v-if="greetingMessage">{{ greetingMessage }}</span>
  <div v-if="!isLoggedIn">
    <button @click="startLogin">Login</button>
  </div>
  <div v-if="isLoggedIn">
    <button @click="promote()">Promote</button>
    <br />
    <button @click="logout()">Logout</button>
    <br />
    <a
      target="_blank"
      rel="noreferrer"
      @click.stop.prevent="userSetting"
      href="#"
    >
      User Setting
    </a>
  </div>
</template>
