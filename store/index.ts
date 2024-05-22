export const useInsuranceStore = defineStore("insurance", () => {
  const isFormSubmitting = ref(false);

  function toggleLoading(state: boolean) {
    isFormSubmitting.value = state;
  }

  return { isFormSubmitting, toggleLoading };
});
