import type { Car } from "~/types/index";

export default defineEventHandler(async (event) => {
  const body = await readBody<Car>(event);
  let installment = 0;

  /* Calculate insurance ratio value */
  const calculateInsurance = () => {
    const { netValue, state, drivePlus } = body;

    let ratio = 0;
    let installment = 0;

    /* Calculate standard insurance ratio */
    if (netValue) {
      if (netValue < 40000) {
        ratio = 8;
      } else if (netValue >= 40000 && netValue <= 100000) {
        ratio = 5;
      } else if (netValue >= 100000 && netValue <= 200000) {
        ratio = 4;
      } else if (netValue >= 200000 && netValue <= 400000) {
        ratio = 2;
      }
    }

    /* If car is used increase ratio by 1 */
    if (state === "used") {
      ratio++;
    }

    /* Calculate total installment */
    installment = netValue! * (ratio / 100);

    /* If client opted out from Drive+ package: add 11% to the installment */
    if (!drivePlus) {
      installment *= 1.11;
    }

    return Number(installment.toFixed(2));
  };

  installment = calculateInsurance();

  if (installment <= 0) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to calculate insurance installment properly.",
    });
  } else {
    return installment;
  }
});
