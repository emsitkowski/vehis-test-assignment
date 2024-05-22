<template>
  <Card>
    <CardHeader>
      <!-- Card title -->
      <CardTitle class="leading-8">Wyliczenie rocznej składki ubezpieczenia OC/AC dla pojazdu: </CardTitle>
    </CardHeader>
    <CardContent class="space-y-8">
      <!-- Car details -->
      <ul>
        <li><strong>Wartość netto</strong>: {{ useInsuranceStore().carValues?.netValue }} zł</li>
        <li><strong>Wartość brutto</strong>: {{ useInsuranceStore().carValues?.grossValue }} zł</li>
        <li><strong>Stan</strong>: {{ useInsuranceStore().carValues?.state === "new" ? "Nowy" : "Używany" }}</li>
        <li><strong>Rok produkcji</strong>: {{ useInsuranceStore().carValues?.year }}</li>
        <li><strong>Pakiet Drive+</strong>: {{ useInsuranceStore().carValues?.drivePlus ? "Tak" : "Nie" }}</li>
      </ul>

      <!-- Separator -->
      <Separator />

      <!-- Installment value -->
      <div class="space-y-2">
        <div class="text-4xl font-bold">{{ useInsuranceStore().installmentValue }} zł</div>
        <div class="flex items-center gap-1 opacity-50">
          <img class="w-4 h-4" src="@/assets/img/ico-info.svg" alt="info" />
          <span class="text-sm">Istnieje możliwość rozłożenia płatności na raty</span>
        </div>
      </div>

      <!-- Action buttons -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <!-- Installments payment modal -->
        <InsurancePaymentModal>
          <Button class="w-full"> Oblicz wysokość raty </Button>
        </InsurancePaymentModal>

        <!-- Calculate again for different car -->
        <Button class="w-full gap-2" variant="outline" @click="handleRepeat">
          <img class="w-4 h-4" src="@/assets/img/ico-repeat.svg" alt="repeat" />
          Oblicz dla innego pojazdu
        </Button>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useInsuranceStore } from "~/store";

const handleRepeat = () => {
  useInsuranceStore().resetStore();
};
</script>

<style scoped></style>
