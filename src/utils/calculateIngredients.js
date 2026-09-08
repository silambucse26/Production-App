// Helper to calculate scaled ingredient quantities, costs, and summary metrics based on batch Litres

export function calculateIngredients(ingredients, litres) {
  // Allow 0 litres cleanly without defaulting
  const parsedLitres =
    typeof litres === 'number'
      ? (isNaN(litres) ? 0 : Math.max(0, litres))
      : (isNaN(parseFloat(litres)) ? 0 : Math.max(0, parseFloat(litres)));

  let totalCost = 0;
  let totalSolidWeightKg = 0;
  let totalLiquidVolumeL = 0;

  const items = ingredients.map((ing) => {
    // Required quantity: supports custom formula like (litres * 10% / 15%) or percentageVal
    const calculatedQty =
      typeof ing.customFormula === 'function'
        ? ing.customFormula(parsedLitres)
        : ((ing.percentageVal || 0) / 100) * parsedLitres;

    const cost = calculatedQty * (ing.unitPrice || 0);
    totalCost += cost;

    if (ing.unit === 'kg') {
      totalSolidWeightKg += calculatedQty;
    } else {
      totalLiquidVolumeL += calculatedQty;
    }

    const formattedQty = `${Number(calculatedQty.toFixed(3))} ${ing.unit}`;

    return {
      ...ing,
      calculatedQty,
      formattedQty,
      rawCost: cost,
      formattedCost: `Rs. ${cost.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      formattedUnitPrice: `Rs. ${(ing.unitPrice || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    };
  });

  return {
    items,
    totalCost,
    formattedTotalCost: `Rs. ${totalCost.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    totalSolidWeightKg: Number(totalSolidWeightKg.toFixed(2)),
    totalLiquidVolumeL: Number(totalLiquidVolumeL.toFixed(2)),
    litres: parsedLitres,
  };
}
