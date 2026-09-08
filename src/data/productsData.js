// Pharmaceutical Products Data with IDs, Formula Percentages, Pricing, and Dynamic Calculations

export const MAX_LITRES = 700;

export const PRODUCTS = [
  {
    id: 'INTAS-700',
    name: 'Intas Order Product',
    shortName: 'Intas Order',
    category: 'Topical Veterinary & Healthcare Dip',
    badgeVariant: 'primary',
    image: '/images/products/midip_antiseptic.jpg',
    defaultLitres: 700,
    shelfLife: '24 Months',
    storageCondition: 'Store in cool ventilated warehouse below 30°C',
    description: 'Intas Order Product protective anti-septic teat dip solution. Specially calibrated for 700 Litres batch compounding with multi-solution blending.',
    methodSummary: 'Step 1 (Main Tank): Water (70 kg) & Polyvinyl Alcohol (PVA) (466.666 kg) → Step 2 & 3 (Separate Container B): Dissolve Molecular Iodine (70g) in Ethanol (14L), add 1% Decolourization Solution (14L), 30-min Decolourization to make "Solution I" → Step 4: Add Glycerine (21 kg) → Step 5: Dissolve PEG 6000 (0.875 kg) in 14L water separately & add → Step 6: Add Sodium Benzoate (0.7 kg) → Step 7: Slowly add Solution I mixture → Step 8: Add Fast Green FCF Colour / Dye (0.21 kg) → Step 9: Calculate weight balance & Add Water q.s. to final 700 kg.',
    preChecks: [
      'Confirm Main Manufacturing Tank (Tank 1) is sanitized, clean, and bottom drain valve locked',
      'Confirm Separate Container (Tank 2 / Container B) is ready and labeled for "Solution I" preparation',
      'Calibrate analytical digital scale for accurate gram-level weighing of Molecular Iodine (70g) and Fast Green FCF Colour / Dye (210g)',
      'Verify liquid flowmeters/graduated transfer vessels for Purified Water, Ethanol, and 1% Decolourization Solution',
      'Verify operator personal protective equipment (safety goggles, lab coat, nitrile gloves, safety boots)',
      'Confirm raw material lots, certificates of analysis, and batch manufacturing record (BMR) are verified',
    ],
    // Raw Materials mapped directly from Master BMR Specification:
    // CPL-RM-005 (Polyvinyl Alcohol (PVA) 10.00%)
    // CPL-RM-003 (Glycerine 3.00%)
    // CPL-RM-006 (Ethanol 2.00%)
    // CPL-RM-009 (Molecular Iodine 0.10%)
    // CPL-RM-007 (PEG 6000 0.125%)
    // CPL-RM-008 (Sodium Benzoate 0.10%)
    // CPL-RM-029 (Fast Green FCF Colour / Dye 0.030%)
    // CPL-RM-027 (water 84.65%)
    ingredients: [
      {
        rmCode: 'CPL-RM-005',
        materialName: 'Polyvinyl Alcohol (PVA)',
        percentage: '10.00%',
        percentageVal: 10.00,
        customFormula: (l) => (l * 466.666) / 700,
        unit: 'kg',
        unitPrice: 275.0,
        supplier: 'POPULAR/SMC Maharashtra',
        remarks: 'Step 1: Main Tank Charge (466.666 kg for 700L)',
      },
      {
        rmCode: 'CPL-RM-003',
        materialName: 'Glycerine',
        percentage: '3.00%',
        percentageVal: 3.0,
        customFormula: (l) => (l * 21.0) / 700,
        unit: 'kg',
        unitPrice: 154.0,
        supplier: 'petrochem/Cenutry petro',
        remarks: 'Step 4: Main Tank Addition (21.00 kg for 700L)',
      },
      {
        rmCode: 'CPL-RM-006',
        materialName: 'Ethanol',
        percentage: '2.00%',
        percentageVal: 2.0,
        customFormula: (l) => (l * 14.0) / 700,
        unit: 'L',
        unitPrice: 200.0,
        supplier: 'originex/AIC/SREE GANESH',
        remarks: 'Step 2: Base for Solution I (14.00 L for 700L)',
      },
      {
        rmCode: 'CPL-RM-009',
        materialName: 'Molecular Iodine',
        percentage: '0.10%',
        percentageVal: 0.10,
        customFormula: (l) => (l * 0.070) / 700,
        unit: 'kg',
        unitPrice: 230.0,
        supplier: 'SK MATHUR/PETROCHEM',
        remarks: 'Step 2: Dissolved in Ethanol (70 g for 700L)',
      },
      {
        rmCode: 'CPL-RM-007',
        materialName: 'PEG 6000',
        percentage: '0.125%',
        percentageVal: 0.125,
        customFormula: (l) => (l * 0.875) / 700,
        unit: 'kg',
        unitPrice: 146.0,
        supplier: 'SK MATHUR/PETROCHEM',
        remarks: 'Step 5: Pre-dissolved in 14L water (0.875 kg for 700L)',
      },
      {
        rmCode: 'CPL-RM-008',
        materialName: 'Sodium Benzoate',
        percentage: '0.10%',
        percentageVal: 0.1,
        customFormula: (l) => (l * 0.700) / 700,
        unit: 'kg',
        unitPrice: 146.0,
        supplier: 'PETROCHEM',
        remarks: 'Step 6: Main Tank Addition (0.700 kg for 700L)',
      },
      {
        rmCode: 'CPL-RM-029',
        materialName: 'Fast Green FCF Colour / Dye',
        percentage: '0.030%',
        percentageVal: 0.03,
        customFormula: (l) => (l * 0.210) / 700,
        unit: 'kg',
        unitPrice: 1800.0,
        supplier: 'Formulators Inc',
        remarks: 'Step 8: Main Tank Addition (0.210 kg for 700L)',
      },
      {
        rmCode: 'CPL-RM-027',
        materialName: 'water',
        percentage: '84.65%',
        percentageVal: 84.65,
        customFormula: (l) => (l * 196.479) / 700,
        unit: 'L',
        unitPrice: 10.0,
        supplier: 'In-house USP Line',
        remarks: 'Total Water: Step 1 (70L) + Step 3/5 + Step 9 q.s. (98.479L)',
      },
    ],
    generateSteps: (litres) => {
      const factor = (litres || 700) / 700;
      const step1Water = (70.0 * factor).toFixed(3);
      const solAKg = (466.666 * factor).toFixed(3);
      const solBKg = (0.070 * factor).toFixed(3);
      const solBGrams = ((0.070 * factor) * 1000).toFixed(1);
      const solCL = (14.0 * factor).toFixed(3);
      const solHL = (14.0 * factor).toFixed(3);
      const solDKg = (21.0 * factor).toFixed(3);
      const solEKg = (0.875 * factor).toFixed(3);
      const waterForSolEL = (14.0 * factor).toFixed(3);
      const solFKg = (0.700 * factor).toFixed(3);
      const solGKg = (0.210 * factor).toFixed(3);

      // Total ingredients added in Steps 1 through 8 before final water q.s.
      // 70.0 + 466.666 + 0.070 + 14.0 + 14.0 + 21.0 + 0.875 + 14.0 + 0.700 + 0.210 = 601.521 kg for 700L
      const currentWeight = Number((601.521 * factor).toFixed(3));
      const targetWeight = Number(litres);
      const pendingWater = Number((98.479 * factor).toFixed(3)); // Remaining water q.s.

      return [
        {
          stepNumber: 1,
          tankBadge: 'Main Tank (Tank 1)',
          title: 'Step 1 – Main Tank: Add Water & Polyvinyl Alcohol (PVA)',
          shortTitle: 'Water & PVA',
          instruction: `Add ${step1Water} kg of purified water to the main manufacturing tank. Then add ${solAKg} kg of Polyvinyl Alcohol (PVA). Mix until completely uniform.`,
          detailedNotes: `Initial water charge (${step1Water} kg) establishes the base solution volume. Polyvinyl Alcohol (PVA) (${solAKg} kg) forms the primary active foundation. Run mechanical agitator at 250 RPM until fully homogeneous.`,
          studentNote: `Start with your big main tank (Tank 1). Pour ${step1Water} kg of clean water, then add ${solAKg} kg of Polyvinyl Alcohol (PVA). Turn on the mixer and stir until the liquid looks smooth and uniform.`,
          image: '/images/steps/step1_water.jpg',
          imageCaption: `Main Tank: Add ${step1Water} kg water + ${solAKg} kg Polyvinyl Alcohol (PVA) and mix uniform`,
          parameters: [
            { label: 'Purified Water', value: `${step1Water} kg` },
            { label: 'Polyvinyl Alcohol (PVA)', value: `${solAKg} kg` },
            { label: 'Target Vessel', value: 'Main Tank (Tank 1)' },
            { label: 'Agitation', value: 'Mix until uniform' },
          ],
          checkItem: `Confirmed ${step1Water} kg water and ${solAKg} kg Polyvinyl Alcohol (PVA) charged into Main Tank and mixed uniform`,
          hasTimer: false,
          timerSeconds: 0,
        },
        {
          stepNumber: 2,
          tankBadge: 'Separate Container (Tank 2) — Solution I',
          warning: 'DO NOT ADD TO MAIN TANK! This must be prepared in a clean separate container to create the new material "Solution I".',
          title: 'Step 2 – Solution I Process: Dissolve Molecular Iodine in Ethanol',
          shortTitle: 'Iodine in Ethanol',
          instruction: `In a separate suitable container (Tank 2): Add ${solBKg} kg (${solBGrams} g) Molecular Iodine and add ${solCL} L Ethanol. Mix until Molecular Iodine is completely dissolved.`,
          detailedNotes: `Molecular Iodine (${solBGrams} grams) requires high-solubility cosolvent dispersion in Ethanol (${solCL} L) before introducing Solution H. Do not add to the main tank yet!`,
          studentNote: `Do NOT use the big main tank here! Take a clean separate container (Tank 2). Put ${solBGrams} grams of Molecular Iodine powder into ${solCL} Litres of Ethanol liquid. Stir well until all the powder disappears.`,
          image: '/images/steps/step2_solution_a.jpg',
          imageCaption: `Separate Tank 2: Dissolve ${solBGrams}g Molecular Iodine into ${solCL}L Ethanol`,
          parameters: [
            { label: 'Molecular Iodine', value: `${solBKg} kg (${solBGrams} g)` },
            { label: 'Ethanol', value: `${solCL} Litres` },
            { label: 'Vessel', value: 'Separate Tank 2' },
            { label: 'Target State', value: 'Completely Dissolved' },
          ],
          checkItem: `Confirmed ${solBKg} kg (${solBGrams} g) Molecular Iodine fully dissolved in ${solCL} L Ethanol in separate container`,
          hasTimer: false,
          timerSeconds: 0,
        },
        {
          stepNumber: 3,
          tankBadge: 'Separate Container (Tank 2) — Solution I',
          warning: 'Keep this container undisturbed during the 30-minute timer. This creates the new material "Solution I".',
          title: 'Step 3 – Solution I Creation: Add 1% Solution H & 30-Min Decolourization',
          shortTitle: '30-Min Decolourization',
          instruction: `In the same separate container (Tank 2): Add ${solHL} L of 1% Solution H. Mix gently, then allow the mixture to stand for 30 minutes for complete decolourization. This created material is Solution I.`,
          detailedNotes: `Adding 1% Solution H initiates the active chromophore reaction. Standing for 30 minutes allows complete decolourization and chemical equilibration to form "Solution I".`,
          studentNote: `In the same separate container, pour ${solHL} Litres of 1% Solution H. Mix it gently, and then let it sit still for 30 minutes. You will see it lose its color (decolourization). Once the 30-minute countdown finishes, this special mixture is now called "Solution I"!`,
          image: '/images/steps/step3_mixing.jpg',
          imageCaption: `Separate Tank 2: Add ${solHL}L 1% Solution H and allow 30 min standing for decolourization`,
          parameters: [
            { label: '1% Solution H', value: `${solHL} Litres` },
            { label: 'Decolourization Time', value: '30 Minutes' },
            { label: 'New Material Name', value: 'Solution I' },
            { label: 'Reaction State', value: 'Decolourizing' },
          ],
          checkItem: `Confirmed ${solHL} L 1% Solution H added and allowed to stand 30 minutes for complete decolourization (Solution I ready)`,
          hasTimer: true,
          timerSeconds: 1800, // 30 minutes
          timerLabel: '30-Minute Decolourization Standing Timer (Solution I)',
        },
        {
          stepNumber: 4,
          tankBadge: 'Main Tank (Tank 1)',
          title: 'Step 4 – Main Tank Addition: Add Glycerine',
          shortTitle: 'Add Glycerine',
          instruction: `Return to the main manufacturing tank (Tank 1). Add ${solDKg} kg of Glycerine to the main tank and mix thoroughly.`,
          detailedNotes: `Glycerine (${solDKg} kg) acts as a secondary body builder and stabilizer. Agitate until fully integrated with the water and PVA base.`,
          studentNote: `Go back to your big Main Tank (Tank 1). Add ${solDKg} kg of Glycerine and stir until it dissolves completely into the main tank liquid.`,
          image: '/images/steps/step2_solution_a.jpg',
          imageCaption: `Main Tank: Add ${solDKg} kg Glycerine and mix thoroughly`,
          parameters: [
            { label: 'Glycerine', value: `${solDKg} kg` },
            { label: 'Target Vessel', value: 'Main Tank (Tank 1)' },
            { label: 'Agitation', value: 'Continuous Stirring' },
            { label: 'Appearance', value: 'Uniform Blend' },
          ],
          checkItem: `Confirmed ${solDKg} kg Glycerine added to Main Tank and mixed thoroughly`,
          hasTimer: false,
          timerSeconds: 0,
        },
        {
          stepNumber: 5,
          tankBadge: 'Premix Jug → Main Tank 1',
          warning: 'DO NOT dump dry PEG 6000 directly into the main tank! Dissolve in water first to prevent clumping.',
          title: 'Step 5 – Main Tank: Dissolve PEG 6000 in Water Separately & Add',
          shortTitle: 'PEG 6000 Pre-dissolve',
          instruction: `In a separate clean vessel, dissolve ${solEKg} kg of PEG 6000 in ${waterForSolEL} L of purified water. Once completely dissolved, pour this solution into the main tank.`,
          detailedNotes: `Pre-dissolving ${solEKg} kg of PEG 6000 in ${waterForSolEL} L water prevents micro-gel formation and ensures rapid uniform distribution upon entering the main tank.`,
          studentNote: `Never dump dry PEG 6000 straight into the big tank! In a clean small jug or bucket, take ${waterForSolEL} Litres of water and dissolve ${solEKg} kg of PEG 6000 until clear. Then pour that dissolved liquid into the big Main Tank.`,
          image: '/images/steps/step1_water.jpg',
          imageCaption: `Dissolve ${solEKg} kg PEG 6000 in ${waterForSolEL}L water separately, then add to Main Tank`,
          parameters: [
            { label: 'PEG 6000 Qty', value: `${solEKg} kg` },
            { label: 'Pre-dissolve Water', value: `${waterForSolEL} Litres` },
            { label: 'Preparation', value: 'Dissolve in small jug first' },
            { label: 'Transfer', value: 'Pour into Main Tank' },
          ],
          checkItem: `Confirmed ${solEKg} kg PEG 6000 pre-dissolved in ${waterForSolEL} L water and transferred into Main Tank`,
          hasTimer: false,
          timerSeconds: 0,
        },
        {
          stepNumber: 6,
          tankBadge: 'Main Tank (Tank 1)',
          title: 'Step 6 – Main Tank Addition: Add Sodium Benzoate',
          shortTitle: 'Add Sodium Benzoate',
          instruction: `Add ${solFKg} kg of Sodium Benzoate to the main manufacturing tank and mix until uniform.`,
          detailedNotes: `Sodium Benzoate (${solFKg} kg) provides stabilizing buffering. Maintain medium agitation to ensure rapid integration throughout the batch.`,
          studentNote: `Add ${solFKg} kg of Sodium Benzoate directly into the Main Tank while the stirrer is running, and mix until the mixture is uniform.`,
          image: '/images/steps/step4_stabilizer.jpg',
          imageCaption: `Main Tank: Add ${solFKg} kg Sodium Benzoate and mix until uniform`,
          parameters: [
            { label: 'Sodium Benzoate', value: `${solFKg} kg` },
            { label: 'Target Vessel', value: 'Main Tank (Tank 1)' },
            { label: 'Mixer State', value: 'Medium Speed' },
            { label: 'Status', value: 'Uniform Distribution' },
          ],
          checkItem: `Confirmed ${solFKg} kg Sodium Benzoate added to Main Tank and mixed uniform`,
          hasTimer: false,
          timerSeconds: 0,
        },
        {
          stepNumber: 7,
          tankBadge: 'Main Tank 1 ← Solution I (Tank 2)',
          title: 'Step 7 – Main Tank Addition: Slowly Add Solution I Mixture',
          shortTitle: 'Add Solution I Slowly',
          instruction: `Add the Step 2 Solution I mixture slowly to the main tank under continuous mixing.`,
          detailedNotes: `Slow transfer of the decolourized Solution I (${(parseFloat(solCL) + parseFloat(solHL)).toFixed(2)} L) under continuous agitation prevents localized precipitation and ensures smooth micellar incorporation.`,
          studentNote: `Now take the decolourized Solution I that you prepared in Container 2 (Step 2 & 3). Slowly and steadily pour it into the Main Tank while the mixer is spinning. Do not dump it all at once!`,
          image: '/images/steps/step3_mixing.jpg',
          imageCaption: `Slowly transfer decolourized Solution I mixture into Main Tank under continuous mixing`,
          parameters: [
            { label: 'Added Mixture', value: 'Solution I (from Tank 2)' },
            { label: 'Solution I Volume', value: `~${(parseFloat(solCL) + parseFloat(solHL)).toFixed(2)} Litres` },
            { label: 'Addition Rate', value: 'Slow & Steady Stream' },
            { label: 'Agitator State', value: 'Continuous Stirring' },
          ],
          checkItem: `Confirmed Solution I mixture added slowly to Main Tank under continuous mixing`,
          hasTimer: false,
          timerSeconds: 0,
        },
        {
          stepNumber: 8,
          tankBadge: 'Main Tank (Tank 1)',
          title: 'Step 8 – Main Tank Addition: Add Fast Green FCF Colour / Dye',
          shortTitle: 'Add Fast Green Dye',
          instruction: `Add ${solGKg} kg of Fast Green FCF Colour / Dye to the main tank and mix until completely homogeneous.`,
          detailedNotes: `Fast Green FCF Colour / Dye (${solGKg} kg) is the color and indicator component. Mix until uniform coloration is observed from top to bottom.`,
          studentNote: `Add ${solGKg} kg of Fast Green FCF Colour / Dye to the Main Tank. Keep the stirrer running until the entire liquid is completely homogeneous and evenly colored.`,
          image: '/images/steps/step4_stabilizer.jpg',
          imageCaption: `Main Tank: Add ${solGKg} kg Fast Green FCF Colour / Dye and mix until homogeneous`,
          parameters: [
            { label: 'Fast Green FCF Colour / Dye', value: `${solGKg} kg` },
            { label: 'Target Vessel', value: 'Main Tank (Tank 1)' },
            { label: 'State', value: 'Homogeneous Solution' },
            { label: 'Stage', value: 'Ready for Final Weight Balance' },
          ],
          checkItem: `Confirmed ${solGKg} kg Fast Green FCF Colour / Dye added to Main Tank and mixed homogeneous`,
          hasTimer: false,
          timerSeconds: 0,
        },
        {
          stepNumber: 9,
          tankBadge: 'Main Tank (Tank 1) — Final Balance',
          title: 'Step 9 – Weight Balance & Final Water Addition (q.s. to Target)',
          shortTitle: 'Water q.s. & Weight Balance',
          instruction: `Check current batch weight (${currentWeight} kg). Add ${pendingWater} kg of purified water (q.s.) to reach the exact final batch weight of ${targetWeight} kg. Continue mixing until the batch is completely homogeneous.`,
          detailedNotes: `Quantum Satis (q.s.): Weigh all materials added (${currentWeight} kg). The pending balance of ${pendingWater} kg / Litres of purified water is charged to attain the exact target batch weight of ${targetWeight} kg. Final mix ensures full homogeneity.`,
          studentNote: `Think of a balance scale! We have added ${currentWeight} kg of ingredients so far. Our target is exactly ${targetWeight} kg. The pending balance is ${pendingWater} kg. So we add ${pendingWater} Litres of water to bring it up to the exact final target weight, and mix well!`,
          image: '/images/steps/step5_finished.jpg',
          imageCaption: `Final Balance: Current ${currentWeight} kg + ${pendingWater} kg Water q.s. = ${targetWeight} kg complete batch`,
          parameters: [
            { label: 'Current Added Weight', value: `${currentWeight} kg` },
            { label: 'Target Final Weight', value: `${targetWeight} kg` },
            { label: 'Pending Water (q.s.)', value: `+ ${pendingWater} kg / L` },
            { label: 'Batch Homogeneity', value: 'Completely Homogeneous' },
          ],
          weightBalance: {
            currentWeight: currentWeight,
            targetWeight: targetWeight,
            pendingWater: pendingWater,
          },
          checkItem: `Confirmed ${pendingWater} kg purified water (q.s.) added to reach final ${targetWeight} kg and batch mixed completely homogeneous`,
          hasTimer: false,
          timerSeconds: 0,
        },
      ];
    },
  },
];

