<script setup lang="ts">
import { onMounted } from "vue";
import authgear from "@authgear/web";
import { router } from "../router";

onMounted(() => {
  authgear
    .finishPromoteAnonymousUser()
    .then(({userInfo}) => {
      console.log("promoted successfully!", {userInfo})
        // Promoted successfully
        // You should redirect the user to another path
    })
    .catch((err) => {
        // Failed to finish promotion
        console.error(err)
    });
  // async function updateToken() {
  //   authgear
  //   .finishPromoteAnonymousUser()
  //       .then(({userInfo}) => {
  //           // Promoted successfully
  //           // You should redirect the user to another path
  //       })
  //       .catch((err) => {
  //           // Failed to finish promotion
  //       });
  //   );
  // }
  // updateToken().catch((e) => console.error(e));
});
</script>

<template>Redirecting...</template>
