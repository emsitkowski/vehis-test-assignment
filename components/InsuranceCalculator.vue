<template>
  <Card class="max-w-lg mx-auto">
    <CardHeader>
      <!-- Card title -->
      <CardTitle> Dane samochodu</CardTitle>

      <!-- Card description -->
      <CardDescription>
        Wypełnij dane pojazdu, aby obliczyć roczną składkę ubezpieczenia OC/AC, z możliwością wyliczenia kwoty raty.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <!-- Insurance calculator -->
      <InsuranceCalculatorForm />
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
</script>

<style scoped></style>
