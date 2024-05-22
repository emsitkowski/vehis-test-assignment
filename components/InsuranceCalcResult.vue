<template>
  <div class="space-y-6">
    <!-- Car details -->
    <div>
      <div class="text-lg font-bold mb-2">Dane pojazdu:</div>
      <ul>
        <li><span class="font-semibold">Wartość netto</span>: {{ useInsuranceStore().carValues?.netValue }} zł</li>
        <li><span class="font-semibold">Wartość brutto</span>: {{ useInsuranceStore().carValues?.grossValue }} zł</li>
        <li>
          <span class="font-semibold">Stan</span>:
          {{ useInsuranceStore().carValues?.state === "new" ? "Nowy" : "Używany" }}
        </li>
        <li><span class="font-semibold">Rok produkcji</span>: {{ useInsuranceStore().carValues?.year }}</li>
        <li>
          <span class="font-semibold">Pakiet Drive+</span>:
          {{ useInsuranceStore().carValues?.drivePlus ? "Tak" : "Nie" }}
        </li>
      </ul>
    </div>

    <!-- Separator -->
    <Separator />

    <!-- Installment value -->
    <div class="space-y-2">
      <div class="text-4xl font-bold">{{ useInsuranceStore().installmentValue }} zł</div>
      <div class="flex items-center gap-1 opacity-50">
        <img class="w-4 h-4" src="@/assets/img/ico-info.svg" alt="info" />
        <span class="text-sm leading-none">Możliwość rozłożenia płatności na raty</span>
      </div>
    </div>

    <!-- Action buttons -->
    <div class="flex flex-col sm:flex-row gap-4">
      <!-- Installments payment modal -->
      <InsuranceCalcPaymentModal>
        <Button class="w-full"> Oblicz wysokość raty </Button>
      </InsuranceCalcPaymentModal>

      <!-- Calculate again for different car -->
      <Button class="w-full gap-2" variant="outline" @click="handleRepeat">
        <img class="w-4 h-4" src="@/assets/img/ico-repeat.svg" alt="repeat" />
        Oblicz dla innego pojazdu
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Separator } from "@/components/ui/separator";
import { useInsuranceStore } from "~/store";

const handleRepeat = () => {
  // Clear stored data and make the calculator restart
  useInsuranceStore().resetStore();
};
</script>
