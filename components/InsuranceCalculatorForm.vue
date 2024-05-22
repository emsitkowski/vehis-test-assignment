<template>
  <form
    class="flex flex-col gap-8"
    :class="{ 'cursor-not-allowed': useInsuranceStore().isFormSubmitting }"
    @submit.prevent="onSubmit"
    novalidate
  >
    <div
      class="grid grid-cols-1 sm:grid-cols-2 gap-6"
      :class="{ 'opacity-40 pointer-events-none': useInsuranceStore().isFormSubmitting }"
    >
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
              v-model="formState.netValue"
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
              v-model="formState.grossValue"
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
          <Select v-bind="componentField" v-model="formState.state" @update:model-value="handleStateFieldChange">
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

      <!-- Car production year -->
      <FormField v-slot="{ componentField }" name="year">
        <FormItem>
          <FormLabel>Rok produkcji</FormLabel>
          <Select v-bind="componentField" v-model="formState.year" :disabled="!formState.state">
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Wybierz rok" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectItem v-for="year in productionYears" :value="year.toString()" :key="year">
                  {{ year }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- Additional services -->
      <FormField v-slot="{ handleChange }" name="drivePlus">
        <FormItem>
          <FormLabel> Dodatkowe opcje </FormLabel>

          <FormControl>
            <div class="flex items-center gap-2">
              <Switch @update:checked="handleChange" v-model="formState.drivePlus" :default-checked="true" />
              <Label>Pakiet Drive+</Label>
            </div>
          </FormControl>
        </FormItem>
      </FormField>
    </div>

    <!-- Submit -->
    <Button v-if="useInsuranceStore().isFormSubmitting === true" class="w-full" type="submit" disabled>
      <Loader2 class="w-4 h-4 mr-2 animate-spin" />
      Trwa obliczanie składki...
    </Button>
    <Button v-else class="w-full" type="submit"> Oblicz roczną składkę OC/AC </Button>
  </form>
</template>

<script setup lang="ts">
import * as z from "zod";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { calculateGrossFromNet, calculateNetFromGross } from "~/utils/currency";
import { useInsuranceStore } from "~/store";
import { Loader2 } from "lucide-vue-next";

/* Define car values interface */
interface Car {
  netValue: undefined | number;
  grossValue: undefined | number;
  state: undefined | string;
  year: undefined | string;
  drivePlus: boolean;
}

/* Define ref for keeping form values */
const formState = ref<Car>({
  netValue: undefined,
  grossValue: undefined,
  state: undefined,
  year: undefined,
  drivePlus: true, // set default value to true
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
    year: z.string({ message: "Wybierz rok produkcji" }),
    drivePlus: z.boolean().default(true),
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
  if (targetName === "netValue" && formState.value.netValue) {
    const computedGrossValue = calculateGrossFromNet(formState.value.netValue);
    formState.value.grossValue = computedGrossValue !== 0 ? computedGrossValue : undefined;

    // send computed value to vee-validate components, to make it validate the correct values
    setFieldValue("grossValue", computedGrossValue);
  } else if (targetName === "grossValue" && formState.value.grossValue) {
    // calculate net value from gross value
    const computedNetValue = calculateNetFromGross(formState.value.grossValue);
    formState.value.netValue = computedNetValue !== 0 ? computedNetValue : undefined;

    // send computed value to vee-validate components, to make it validate the correct values
    setFieldValue("netValue", computedNetValue);
  }
};

/* Compute production years for new and used cars */
const productionYears = computed(() => {
  const years = [];
  const currentYear = new Date().getFullYear();

  // populate years array with 5 recent years
  for (let i = currentYear; i > currentYear - 5; i--) {
    years.push(i);
  }

  // narrow down years depending on car state (new cars are made in 2 recent years)
  if (formState.value.state === "new") {
    return years.slice(0, 2);
  } else if (formState.value.state === "used") {
    return years.slice(2, 5);
  }
});

const handleStateFieldChange = () => {
  // reset production year field after car state field change
  if (formState.value.year !== undefined) {
    formState.value.year = undefined;
    setFieldValue("year", undefined);
  }
};

/* Handle form submit */
const onSubmit = handleSubmit((values) => {
  useInsuranceStore().toggleLoading(true);
  console.log("Form submitted with values: ", values);

  setTimeout(() => {
    useInsuranceStore().toggleLoading(false);
  }, 2000);
});
</script>
