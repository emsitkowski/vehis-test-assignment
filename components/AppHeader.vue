<template>
  <div class="flex justify-center items-center flex-wrap gap-12 mb-16">
    <AppLogo />
    <h1 class="text-4xl font-semibold text-center">{{ text }}</h1>
  </div>
</template>

<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>
