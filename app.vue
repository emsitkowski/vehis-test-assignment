<template>
  <div class="container mx-auto pt-20">
    <!-- Header -->
    <AppHeader text="Kalkulator OC/AC" />

    <!-- Calculator -->
    <div class="w-full max-w-lg mx-auto">
      <InsuranceCalculator v-if="!useInsuranceStore().isCalculationSuccess" />
      <InsuranceResult v-else />
    </div>
  </div>

  <Toaster />
</template>

<script setup lang="ts">
import { useInsuranceStore } from "~/store";
import Toaster from "@/components/ui/toast/Toaster.vue";
</script>
