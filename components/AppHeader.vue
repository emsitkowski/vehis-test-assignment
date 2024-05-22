<template>
  <div class="flex justify-center items-center flex-wrap gap-6 sm:gap-8 mb-8 sm:mb-16">
    <AppLogo class="w-36 sm:w-40" />
    <h1 class="text-3xl font-semibold text-center">{{ text }}</h1>
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
