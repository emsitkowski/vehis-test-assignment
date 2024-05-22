<template>
  <div class="container mx-auto pt-20">
    <!-- Header -->
    <AppHeader text="Kalkulator OC/AC" />

    <!-- Calculator -->
    <InsuranceCalculator v-if="!useInsuranceStore().isCalculationSuccess" />

    <div v-else>Installment value: {{ useInsuranceStore().installmentValue }}</div>
  </div>

  <Toaster />
</template>

<script setup lang="ts">
import { useInsuranceStore } from "~/store";
import Toaster from "@/components/ui/toast/Toaster.vue";
</script>
