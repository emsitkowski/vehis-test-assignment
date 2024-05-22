<template>
  <div class="container mx-auto pt-20">
    <!-- Header -->
    <AppHeader text="Kalkulator OC/AC" />

    <!-- Calculator -->
    <InsuranceCalculator />
  </div>

  <Toaster />
</template>

<script setup lang="ts">
import Toaster from "@/components/ui/toast/Toaster.vue";
</script>
