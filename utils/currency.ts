export const calculateGrossFromNet = (netValue: number) => Number((netValue * 1.23).toFixed(2));

export const calculateNetFromGross = (grossValue: number) => Number((grossValue / 1.23).toFixed(2));
