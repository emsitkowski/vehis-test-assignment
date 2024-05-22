import type { Car } from "~/types/index";

export const useInsuranceStore = defineStore("insurance", () => {
  const isFormSubmitting = ref(false);
  const isCalculationSuccessful = ref(false);
  const installmentValue = ref<undefined | number>(undefined);
  const carValues = ref<undefined | Car>();

  function toggleLoading(state: boolean) {
    isFormSubmitting.value = state;
  }

  function saveCarValues(values: Car) {
    carValues.value = values;
  }

  function saveInstallmentValue(value: number) {
    /* Enable loading state */
    useInsuranceStore().toggleLoading(true);

    /* Save installment value */
    installmentValue.value = value;

    setTimeout(() => {
      /* Disable loading state */
      useInsuranceStore().toggleLoading(false);

      /* Switch success variable to true */
      isCalculationSuccessful.value = true;
    }, 1000);
  }

  /* Reset all store values and states */
  function resetStore() {
    isFormSubmitting.value = false;
    isCalculationSuccessful.value = false;
    installmentValue.value = undefined;
    carValues.value = undefined;
  }

  return {
    isFormSubmitting,
    toggleLoading,
    saveCarValues,
    saveInstallmentValue,
    installmentValue,
    isCalculationSuccessful,
    carValues,
    resetStore,
  };
});
