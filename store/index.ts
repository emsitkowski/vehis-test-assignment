export const useInsuranceStore = defineStore("insurance", () => {
  const isFormSubmitting = ref(false);
  const isCalculationSuccess = ref(false);
  const installmentValue = ref<undefined | number>(undefined);

  function toggleLoading(state: boolean) {
    isFormSubmitting.value = state;
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
      isCalculationSuccess.value = true;
    }, 1000);
  }

  return { isFormSubmitting, toggleLoading, saveInstallmentValue, installmentValue, isCalculationSuccess };
});
