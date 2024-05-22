<template>
  <Card>
    <CardHeader>
      <!-- Card title -->
      <CardTitle class="leading-8">
        {{
          !useInsuranceStore().isCalculationSuccess
            ? "Dane samochodu"
            : "Wyliczenie rocznej składki ubezpieczenia OC/AC dla pojazdu:"
        }}
      </CardTitle>

      <!-- Card description -->
      <CardDescription v-if="!useInsuranceStore().isCalculationSuccess">
        Wypełnij dane pojazdu, aby obliczyć roczną składkę ubezpieczenia OC/AC, z możliwością wyliczenia kwoty raty.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <!-- Insurance calculator content -->
      <InsuranceCalculatorForm v-if="!useInsuranceStore().isCalculationSuccess" />
      <InsuranceResult v-else />
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useInsuranceStore } from "~/store";
</script>

<style scoped></style>
