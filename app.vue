<template>
  <div class="container mx-auto pt-8 sm:pt-20">
    <!-- Header -->
    <AppHeader text="Kalkulator OC/AC" />

    <!-- Calculator -->
    <div class="w-full max-w-lg mx-auto">
      <InsuranceCalc />
    </div>
  </div>

  <!-- App modals -->
  <Toaster />
</template>

<script setup lang="ts">
import Toaster from "@/components/ui/toast/Toaster.vue";
</script>
