<template>
  <form class="flex flex-col gap-8" @submit.prevent="onSubmit" novalidate>
    <div class="grid grid-cols-2 gap-6">
      <!-- Net value -->
      <FormField v-slot="{ componentField }" name="netValue">
        <FormItem>
          <FormLabel>Wartość netto (zł)</FormLabel>
          <FormControl>
            <Input
              type="number"
              placeholder="Podaj wartość netto"
              step="0.1"
              min="1"
              v-bind="componentField"
              v-model="carValue.net"
              @change="handleCarValues"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- Gross value -->
      <FormField v-slot="{ componentField }" name="grossValue">
        <FormItem>
          <FormLabel>Wartość brutto (zł)</FormLabel>
          <FormControl>
            <Input
              type="number"
              placeholder="Podaj wartość brutto"
              step="0.1"
              min="1.23"
              v-bind="componentField"
              v-model="carValue.gross"
              @change="handleCarValues"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- Car state -->
      <FormField v-slot="{ componentField }" name="state">
        <FormItem>
          <FormLabel>Stan samochodu</FormLabel>
          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Wybierz stan" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="new"> Nowy </SelectItem>
                <SelectItem value="used"> Używany </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <!-- Submit -->
    <Button class="w-full" type="submit">Oblicz roczną składkę OC/AC</Button>
  </form>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { calculateGrossFromNet, calculateNetFromGross } from "~/utils/currency";

/* Define car values interface */
interface CarValues {
  net: undefined | number;
  gross: undefined | number;
}

/* Define refs for keeping car values */
const carValue = ref<CarValues>({
  net: undefined,
  gross: undefined,
});

/* Define form schema */
const formSchema = toTypedSchema(
  z.object({
    netValue: z
      .number({ message: "Wpisz poprawną wartość" })
      .min(1, { message: "Wartość netto musi wynosić minimum 1 zł" })
      .max(400000, { message: "Maksymalna wartość samochodu może wynosić 400000 zł netto" })
      .multipleOf(0.01, { message: "Wpisz poprawną wartość" })
      .positive()
      .safe(),
    grossValue: z
      .number({ message: "Wpisz poprawną wartość" })
      .min(1.23, { message: "Wartość brutto musi wynosić minimum 1.23 zł" })
      .max(492000, { message: "Maksymalna wartość samochodu może wynosić 492000 zł brutto" })
      .multipleOf(0.01, { message: "Wpisz poprawną wartość" })
      .positive()
      .safe(),
    state: z.string({ message: "Wybierz stan samochodu" }),
  })
);

/* Initialize form with validation schema using vee-validate function */
const { handleSubmit, setFieldValue } = useForm({
  validationSchema: formSchema,
});

/* Handle car values */
const handleCarValues = (e: Event) => {
  const target = e.target as HTMLElement;
  const targetName = target.getAttribute("name");

  // check which form field is updated (net or gross value field) and update their values interchangeably
  if (targetName === "netValue" && carValue.value.net) {
    const computedGrossValue = calculateGrossFromNet(carValue.value.net);
    carValue.value.gross = computedGrossValue !== 0 ? computedGrossValue : undefined;

    // send computed value to vee-validate components, to make it validate the correct values
    setFieldValue("grossValue", computedGrossValue);
  } else if (targetName === "grossValue" && carValue.value.gross) {
    // calculate net value from gross value
    const computedNetValue = calculateNetFromGross(carValue.value.gross);
    carValue.value.net = computedNetValue !== 0 ? computedNetValue : undefined;

    // send computed value to vee-validate components, to make it validate the correct values
    setFieldValue("netValue", computedNetValue);
  }
};

/* Handle form submit */
const onSubmit = handleSubmit((values) => {
  console.log("Form submitted with values: ", values);
});
</script>
