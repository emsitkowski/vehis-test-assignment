<template>
  <Card>
    <CardHeader>
      <!-- Card cover image -->
      <img class="max-h-40 rounded-lg object-cover mb-4" src="~/assets/img/car.jpg" alt="red car" />

      <!-- Card title -->
      <CardTitle class="leading-8">
        {{
          !useInsuranceStore().isCalculationSuccessful
            ? "Dane samochodu"
            : "Wyliczenie rocznej składki ubezpieczenia OC/AC"
        }}
      </CardTitle>

      <!-- Card description -->
      <CardDescription v-if="!useInsuranceStore().isCalculationSuccessful">
        Wypełnij dane pojazdu, aby obliczyć roczną składkę ubezpieczenia OC/AC, z możliwością wyliczenia kwoty raty.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <!-- Insurance calculator content -->
      <InsuranceCalcForm v-if="!useInsuranceStore().isCalculationSuccessful" />
      <InsuranceCalcResult v-else />
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useInsuranceStore } from "~/store";
</script>
