<template>
  <Dialog>
    <DialogTrigger>
      <slot></slot>
    </DialogTrigger>
    <DialogContent>
      <div class="space-y-6">
        <!-- Modal header -->
        <DialogHeader>
          <DialogTitle> Oblicz wysokość raty </DialogTitle>
          <DialogDescription> Wybierz liczbę rat, aby obliczyć wysokość pojedyńczej raty.</DialogDescription>
        </DialogHeader>

        <!-- Number of payments selection -->
        <div>
          <Label class="block mb-3">Liczba rat</Label>
          <Select v-model="numberOfInstallments">
            <SelectTrigger class="w-full sm:w-1/2">
              <SelectValue placeholder="Wybierz liczbę płatności" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="2"> 2 raty </SelectItem>
                <SelectItem value="4"> 4 raty </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div v-if="numberOfInstallments">
          <!-- Separator -->
          <Separator />

          <!-- Computed payment installment value -->
          <div class="text-2xl font-bold pt-6">Rata wyniesie: {{ paymentInstallment }} zł</div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useInsuranceStore } from "~/store";

const numberOfInstallments = ref<undefined | number>(undefined);

/* Calculate payment installment value depending on number of payments selected */
const paymentInstallment = computed(() => {
  let computedInstallment = 0;

  if (numberOfInstallments.value === "2") {
    computedInstallment = useInsuranceStore().installmentValue * 1.02;
  } else if (numberOfInstallments.value === "4") {
    computedInstallment = useInsuranceStore().installmentValue * 1.04;
  }

  return Number(computedInstallment + 200).toFixed(2);
});
</script>

<style scoped></style>
