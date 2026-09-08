// Bilingual Translation Dictionary: English & Tamil (தமிழ்)

export const translations = {
  en: {
    // Header
    portalTitle: 'Chimetech PharmaCraft',
    gmpCertified: 'GMP Certified',
    catalog: 'Product Catalog',
    steps: 'Steps',
    restart: 'Restart',
    signOut: 'Sign Out',
    batch: 'Batch',
    langName: 'English',
    otherLang: 'தமிழ்',

    // Login Screen
    loginHeaderTitle: 'Lab Operator Sign In',
    loginHeaderSubtitle: 'Authorized personnel authentication',
    phoneLabel: 'Mobile Phone Number',
    phonePlaceholder: 'e.g. 9876543210',
    passwordLabel: 'Passcode / Password',
    passwordPlaceholder: 'Enter your lab password',
    authenticateBtn: 'Authenticate & Enter Lab',
    quickDemoText: 'Need quick testing access?',
    fillDemoBtn: 'Fill Demo Credentials',
    phoneRequiredError: 'Please enter your registered mobile phone number.',
    passwordRequiredError: 'Please enter your password.',
    invalidCredentialsError: 'Invalid credentials. Check your phone number or password.',
    securityBadgeText: 'Complies with GMP (Good Manufacturing Practice) standard',

    // Home / Catalog
    portalBadge: 'Pharmaceutical Formulation Portal',
    catalogTitle: 'Select Medicine Product',
    catalogSubtitle: 'Choose a certified medicine product below. Configure batch volume and complete pre-checks on the next screen.',
    selectBatch: 'Select & Configure Batch',

    // Stages
    stage1Title: 'Stage 1.0',
    stage1Name: 'BMR Attachments',
    stage2Title: 'Stage 2.0 & 2.1',
    stage2Name: 'Line Clearance (Dispensing)',
    stage3Title: 'Stage 3.0',
    stage3Name: 'Batch Volume & Steps',
    stageOf: 'Stage {current} of 3',

    // 1.0 Attachments
    attachmentsTitle: '1.0 List of Attachments',
    attachmentsSubtitle: 'Verify required physical/electronic BMR documents before production begins',
    srNo: 'Sr. No.',
    docName: 'Document Name',
    noOfPages: 'No. of pages',
    statusHeader: 'Status*',
    signDateHeader: 'Sign. / Date**',
    attachedBtn: '✓ Attached',
    notAttachedBtn: '✕ Not Attached',
    naBtn: 'NA',
    pendingSign: 'Pending QA Sign',
    qaVerificationTitle: 'Quality Assurance Dept. Verification (Sign. / Date**)',
    qaVerificationSubtitle: 'Enter QA Officer Name, select Date and Time to authorize attachments',
    qaOfficerNameLabel: 'QA Officer Name:',
    qaNamePlaceholder: 'Type QA Officer Name here',
    selectDate: 'Select Date:',
    timeLabel: 'Time:',
    setNow: 'Set Now',
    qaAuthorizedBadge: 'QA Authorized by:',
    proceedToLineClearance: 'Proceed to 2.0 Line Clearance →',
    backToAttachments: '← Back to 1.0 Attachments',
    proceedToBatchSetup: 'Proceed to 3.0 Batch Volume & Formula →',

    // Footnotes
    footnoteAttached: '* Put √ if attached with the BMR',
    footnoteNotAttached: '* Put × if not attached with the BMR',
    footnoteNA: '* Put NA if Not Applicable in BMR',
    footnoteQA: '** Verification & Approval: Quality Assurance Dept.',

    // 2.0 Line Clearance
    lineClearanceTitle: '2.0 Manufacturing Stage – A (Dispensing)',
    lineClearanceSubtitle: '2.1 Line Clearance for Dispensing Area',
    mfgRoomId: 'Manufacturing Room ID',
    dispRoomId: 'Dispensing Room ID',
    prevProduct: 'Previous Product Name & Batch No.',
    checkListTitle: 'Check List for Line Clearance',
    remarksHeader: 'Remarks (Y/N)',
    temperature: 'Temperature:',
    humidity: 'RH:',
    yesBtn: 'Yes (Y)',
    noBtn: 'No (N)',
    cleanedByTitle: 'Cleaned By – Production (Sign./Date)',
    checkedByTitle: 'Checked By – Production (Sign./Date)',
    cleanerNameLabel: 'Cleaner / Operator Name:',
    inchargeNameLabel: 'Production Incharge Name:',
    cleanedByBadge: 'Cleaned By:',
    checkedByBadge: 'Checked By Incharge:',
    cautionTitle: 'Mandatory Safety Caution:',
    caution1: '1. Use nose or face mask (as applicable), Gloves and Goggles during operation.',
    caution2: '2. Avoid contact with skin, eyes and inhalation with any material.',

    // 3.0 Batch Setup
    lineClearanceVerifiedMsg: 'Line clearance verified. Choose production volume to calculate chemical quantities and begin manufacturing.',
    showMaterialTable: 'Click to View Materials & Cost',
    hideMaterialTable: 'Hide Material Table',
    billOfMaterials: 'Bill of Materials & Cost Analysis',
    colSrNo: '#',
    colRmCode: 'RM Code',
    colMaterial: 'Raw Material',
    colPercentage: 'Percentage (%)',
    colRequiredQty: 'Required Batch Qty',
    colUnit: 'Unit',
    colUnitPrice: 'Unit Price (Rs.)',
    colMaterialCost: 'Total Cost (Rs.)',
    colSupplier: 'Approved Supplier',
    colRemarks: 'Dispensing Allocation / Stage',
    totalBatchRow: 'Total Batch Output',
    rawMaterialRequirementTitle: 'Raw Material Requirement & Dispensing Sheet (Bill of Materials)',
    batchVolumeTitle: 'Production Batch Volume (Max 700 Litres)',
    batchVolumeSubtitle: 'Step-by-step instructions dynamically scale based on this chosen volume',
    targetOutputVolume: 'Target Output Volume',
    selectedBatchFor: 'Selected batch for',
    quickPresets: 'Quick Presets:',
    startBatchBtn: 'Clearance Complete → Start Step-by-Step Method for {litres}L Batch',
    backToCatalog: 'Back to Product Catalog',

    // Process & Steps
    stepCounter: 'Step {current} of {total}',
    actionRequired: 'Action Required ({litres} Litres Batch)',
    stepConfirmedBadge: 'Step action confirmed & verified',
    stepPendingBadge: 'Click to confirm step action is complete',
    doneBadge: 'Done',
    pendingBadge: 'Pending',
    showTechDetails: 'Technical Parameters & Recipe Notes',
    clickToView: 'Click to view',
    clickToHide: 'Click to hide',
    calculatedQuantities: 'Calculated Batch Quantities',
    simpleExplanation: 'Simple Explanation',
    weightBalanceTitle: 'Weight Balance & Final Water (q.s.)',
    materialsAdded: 'Materials Added',
    batchTarget: 'Batch Target',
    waterToAdd: 'Water to Add (q.s.)',
    nextStepBtn: 'Next Step',
    prevStepBtn: 'Previous Step',
    completeFormulationBtn: 'Complete Formulation!',
    confirmToProceed: 'Confirm the checklist action above to unlock the next step',
    qaSignRequired: 'Enter QA Officer name to authorize BMR attachments',
    lineClearanceRequired: 'Ensure all 5 checkpoints are marked Yes and sign-off names entered',

    // Completion Modal
    formulationCertified: 'Formulation Certified',
    medicinePreparedSuccess: 'Medicine Prepared Successfully!',
    completionSubtitle: 'All manufacturing stages and weight balance specifications have been completed under standard operating protocol.',
    qcPassed: 'Quality Control: Passed',
    batchNumberLabel: 'Batch Number:',
    targetOutputLabel: 'Target Output:',
    compoundedLabel: 'Compounded:',
    sterilityLabel: 'Sterility:',
    sterilityValue: '0.22µm Filtered',
    qaClearanceBadge: 'QA Clearance:',
    printReportBtn: 'Print Batch Report',
    restartBtn: 'Restart',
    returnCatalogBtn: 'Return to Catalog',
  },

  ta: {
    // Header
    portalTitle: 'கைமெர்டெக் பார்மாகிராஃப்ட் (Chimetech)',
    gmpCertified: 'GMP சான்றளிக்கப்பட்டது',
    catalog: 'தயாரிப்புகள் பட்டியல்',
    steps: 'செய்முறைப் படிகள்',
    restart: 'மீண்டும் தொடங்கு',
    signOut: 'வெளியேறு',
    batch: 'தொகுதி',
    langName: 'தமிழ்',
    otherLang: 'English',

    // Login Screen
    loginHeaderTitle: 'ஆய்வக பணியாளர் உள்நுழைவு',
    loginHeaderSubtitle: 'அங்கீகரிக்கப்பட்ட பணியாளர் சரிபார்ப்பு',
    phoneLabel: 'கைபேசி எண் (Mobile Number)',
    phonePlaceholder: 'எ.கா. 9876543210',
    passwordLabel: 'கடவுச்சொல் (Password)',
    passwordPlaceholder: 'ஆய்வக கடவுச்சொல்லை உள்ளிடவும்',
    authenticateBtn: 'உள்நுழைந்து ஆய்வகத்திற்குச் செல்க',
    quickDemoText: 'மாதிரி சோதனை அணுகல் தேவையா?',
    fillDemoBtn: 'மாதிரி தகவல்களை நிரப்பவும்',
    phoneRequiredError: 'தயவுசெய்து உங்கள் பதிவுசெய்யப்பட்ட கைபேசி எண்ணை உள்ளிடவும்.',
    passwordRequiredError: 'தயவுசெய்து உங்கள் கடவுச்சொல்லை உள்ளிடவும்.',
    invalidCredentialsError: 'தவறான உள்நுழைவு விவரங்கள். கைபேசி எண் அல்லது கடவுச்சொல்லைச் சரிபார்க்கவும்.',
    securityBadgeText: 'GMP (நல்ல உற்பத்தி நடைமுறை) விதிகளுக்கு உட்பட்டது',

    // Home / Catalog
    portalBadge: 'மருந்து தயாரிப்பு தளம் (Formulation Portal)',
    catalogTitle: 'மருந்து தயாரிப்பைத் தேர்ந்தெடுக்கவும்',
    catalogSubtitle: 'கீழே உள்ள சான்றளிக்கப்பட்ட மருந்து தயாரிப்பைத் தேர்வுசெய்க. அடுத்த திரையில் அளவையும் சரிபார்ப்புகளையும் பூர்த்தி செய்யலாம்.',
    selectBatch: 'தேர்ந்தெடுத்து தொகுதியைத் தொடங்குக',

    // Stages
    stage1Title: 'படி 1.0',
    stage1Name: 'BMR ஆவணங்களின் பட்டியல்',
    stage2Title: 'படி 2.0 & 2.1',
    stage2Name: 'லைன் கிளியரன்ஸ் (டிஸ்பென்சிங்)',
    stage3Title: 'படி 3.0',
    stage3Name: 'தொகுதி அளவு & செய்முறை',
    stageOf: 'நிலை {current} / 3',

    // 1.0 Attachments
    attachmentsTitle: '1.0 இணைப்புகளின் பட்டியல் (BMR Attachments)',
    attachmentsSubtitle: 'உற்பத்தி தொடங்குவதற்கு முன் தேவையான இயற்பியல் / மின்னணு BMR ஆவணங்களைச் சரிபார்க்கவும்',
    srNo: 'வரிசை எண்',
    docName: 'ஆவணப் பெயர்',
    noOfPages: 'பக்கங்களின் எண்ணிக்கை',
    statusHeader: 'நிலை*',
    signDateHeader: 'கையொப்பம் / தேதி**',
    attachedBtn: '✓ இணைக்கப்பட்டது',
    notAttachedBtn: '✕ இணைக்கப்படவில்லை',
    naBtn: 'NA',
    pendingSign: 'QA கையொப்பம் நிலுவையில் உள்ளது',
    qaVerificationTitle: 'தரக்கட்டுப்பாட்டுத் துறை சரிபார்ப்பு (QA Sign. / Date**)',
    qaVerificationSubtitle: 'ஆவணங்களை அங்கீகரிக்க QA அதிகாரியின் பெயரை உள்ளிட்டு தேதி மற்றும் நேரத்தைத் தேர்ந்தெடுக்கவும்',
    qaOfficerNameLabel: 'QA அதிகாரியின் பெயர்:',
    qaNamePlaceholder: 'இங்கே QA அதிகாரியின் பெயரை உள்ளிடவும்',
    selectDate: 'தேதியைத் தேர்ந்தெடுக்கவும்:',
    timeLabel: 'நேரம்:',
    setNow: 'தற்போது',
    qaAuthorizedBadge: 'QA அங்கீகரித்தவர்:',
    proceedToLineClearance: 'படி 2.0 லைன் கிளியரன்ஸுக்குச் செல்க →',
    backToAttachments: '← படி 1.0 ஆவணங்களுக்குத் திரும்பு',
    proceedToBatchSetup: 'படி 3.0 தொகுதி அமைப்பிற்குச் செல்க →',

    // Footnotes
    footnoteAttached: '* BMR உடன் இணைக்கப்பட்டிருந்தால் √ எனக் குறிக்கவும்',
    footnoteNotAttached: '* BMR உடன் இணைக்கப்படவில்லை என்றால் × எனக் குறிக்கவும்',
    footnoteNA: '* BMR-ல் பொருந்தாது என்றால் NA எனக் குறிக்கவும்',
    footnoteQA: '** சரிபார்ப்பு & ஒப்புதல்: தரக்கட்டுப்பாட்டுத் துறை (Quality Assurance Dept.)',

    // 2.0 Line Clearance
    lineClearanceTitle: '2.0 உற்பத்தி நிலை – A (டிஸ்பென்சிங் பிரிவு)',
    lineClearanceSubtitle: '2.1 டிஸ்பென்சிங் பகுதிக்கான லைன் கிளியரன்ஸ் (Line Clearance)',
    mfgRoomId: 'உற்பத்தி அறை எண் (Manufacturing Room ID)',
    dispRoomId: 'டிஸ்பென்சிங் அறை எண் (Dispensing Room ID)',
    prevProduct: 'முந்தைய தயாரிப்பு பெயர் & தொகுதி எண் (Batch No.)',
    checkListTitle: 'லைன் கிளியரன்ஸ் சரிபார்ப்புப் பட்டியல்',
    remarksHeader: 'கருத்துகள் (ஆம் / இல்லை)',
    temperature: 'வெப்பநிலை:',
    humidity: 'ஈரப்பதம் (RH):',
    yesBtn: 'ஆம் (Y)',
    noBtn: 'இல்லை (N)',
    cleanedByTitle: 'சுத்தம் செய்தவர் – உற்பத்திப் பிரிவு (கையொப்பம் / தேதி)',
    checkedByTitle: 'சரிபார்த்தவர் – உற்பத்திப் பொறுப்பாளர் (கையொப்பம் / தேதி)',
    cleanerNameLabel: 'சுத்தம் செய்தவர் பெயர்:',
    inchargeNameLabel: 'உற்பத்திப் பொறுப்பாளர் பெயர்:',
    cleanedByBadge: 'சுத்தம் செய்தவர்:',
    checkedByBadge: 'சரிபார்த்த பொறுப்பாளர்:',
    cautionTitle: 'கட்டாயப் பாதுகாப்பு எச்சரிக்கை:',
    caution1: '1. பணியின் போது முகக்கவசம், கையுறைகள் மற்றும் பாதுகாப்பு கண்ணாடிகளை அணியவும்.',
    caution2: '2. எந்தவொரு மூலப்பொருளும் தோல், கண்கள் மற்றும் சுவாசிப்பில் படுவதைத் தவிர்க்கவும்.',

    // 3.0 Batch Setup
    lineClearanceVerifiedMsg: 'லைன் கிளியரன்ஸ் சரிபார்க்கப்பட்டது. ரசாயன அளவைக் கணக்கிட்டு உற்பத்தியைத் தொடங்க தொகுதியின் அளவைத் தேர்வுசெய்க.',
    showMaterialTable: 'மூலப்பொருட்கள் மற்றும் விலையைக் காண கிளிக் செய்யவும்',
    hideMaterialTable: 'மூலப்பொருள் அட்டவணையை மறைக்க',
    billOfMaterials: 'மூலப்பொருட்களின் பட்டியல் & செலவு பகுப்பாய்வு',
    colSrNo: '#',
    colRmCode: 'RM குறியீடு',
    colMaterial: 'மூலப்பொருள் பெயர்',
    colPercentage: 'சதவீதம் (%)',
    colRequiredQty: 'தேவையான அளவு',
    colUnit: 'அலகு',
    colUnitPrice: 'அலகு விலை (ரூ.)',
    colMaterialCost: 'மொத்த செலவு (ரூ.)',
    colSupplier: 'வழங்குநர்',
    colRemarks: 'பயன்படுத்தும் நிலை / குறிப்புகள்',
    totalBatchRow: 'மொத்த தொகுதி வெளியீடு',
    rawMaterialRequirementTitle: 'மூலப்பொருள் தேவை & டிஸ்பென்சிங் பட்டியல் (Bill of Materials)',
    batchVolumeTitle: 'தயாரிப்பு தொகுதி அளவு (அதிகபட்சம் 700 லிட்டர்)',
    batchVolumeSubtitle: 'தேர்ந்தெடுக்கப்பட்ட அளவிற்கு ஏற்ப செய்முறைப் படிகள் தானாகவே கணக்கிடப்படும்',
    targetOutputVolume: 'இலக்கு வெளியீட்டு அளவு',
    selectedBatchFor: 'தேர்ந்தெடுக்கப்பட்ட தொகுதி:',
    quickPresets: 'விரைவு அளவுகள்:',
    startBatchBtn: 'அனைத்தும் தயார் → {litres}L தொகுதிக்கான செய்முறைப் படிகளைத் தொடங்கு',
    backToCatalog: 'தயாரிப்புகள் பட்டியலுக்குத் திரும்பு',

    // Process & Steps
    stepCounter: 'படி {current} / {total}',
    actionRequired: 'தேவையான நடவடிக்கை ({litres} லிட்டர் தொகுதி)',
    stepConfirmedBadge: 'இந்த படி நடவடிக்கை சரிபார்க்கப்பட்டது',
    stepPendingBadge: 'படி நிறைவடைந்ததை உறுதிசெய்ய இங்கே கிளிக் செய்யவும்',
    doneBadge: 'முடிந்தது',
    pendingBadge: 'நிலுவை',
    showTechDetails: 'தொழில்நுட்ப அளவீடுகள் & செய்முறைக் குறிப்புகள்',
    clickToView: 'பார்க்க கிளிக் செய்க',
    clickToHide: 'மறைக்க கிளிக் செய்க',
    calculatedQuantities: 'கணக்கிடப்பட்ட தொகுதி அளவுகள்',
    simpleExplanation: 'எளிய விளக்கம்',
    weightBalanceTitle: 'எடை சமநிலை & இறுதி நீர் சேர்க்கை (q.s.)',
    materialsAdded: 'சேர்க்கப்பட்ட பொருட்கள்',
    batchTarget: 'தொகுதி இலக்கு',
    waterToAdd: 'சேர்க்க வேண்டிய மீதமுள்ள நீர் (q.s.)',
    nextStepBtn: 'அடுத்த படி →',
    prevStepBtn: '← முந்தைய படி',
    completeFormulationBtn: 'தயாரிப்பை நிறைவு செய்க! 🏆',
    confirmToProceed: 'அடுத்த படிக்குச் செல்ல, மேலே உள்ள படி சரிபார்ப்பை உறுதிப்படுத்தவும்',
    qaSignRequired: 'BMR ஆவணங்களை அங்கீகரிக்க QA அதிகாரி பெயரை உள்ளிடவும்',
    lineClearanceRequired: 'அனைத்து 5 குறிப்புகளையும் (ஆம்) என குறித்து, பொறுப்பாளர் பெயர்களை உள்ளிடவும்',

    // Completion Modal
    formulationCertified: 'மருந்து சான்றளிக்கப்பட்டது',
    medicinePreparedSuccess: 'மருந்து வெற்றிகரமாக தயாரிக்கப்பட்டது!',
    completionSubtitle: 'அனைத்து உற்பத்தி நிலைகளும் தரக்கட்டுப்பாட்டு நெறிமுறைகளின்படி நிறைவடைந்துள்ளன.',
    qcPassed: 'தரக்கட்டுப்பாடு: தேர்ச்சி பெற்றது',
    batchNumberLabel: 'தொகுதி எண்:',
    targetOutputLabel: 'இலக்கு வெளியீடு:',
    compoundedLabel: 'தயாரிக்கப்பட்ட தேதி:',
    sterilityLabel: 'கருத்தடை (Sterility):',
    sterilityValue: '0.22µm வடிகட்டப்பட்டது',
    qaClearanceBadge: 'QA அனுமதி:',
    printReportBtn: 'அறிக்கையை அச்சிடுக',
    restartBtn: 'மீண்டும் தொடங்கு',
    returnCatalogBtn: 'தயாரிப்புகள் பட்டியலுக்குத் திரும்பு',
  },
};

// Document translations for 1.0 Attachments
export const ATTACHMENT_DOCS_TA = {
  'Production Order (PO)': 'உற்பத்தி உத்தரவு (Production Order - PO)',
  'In-Process QC Report': 'செயல்முறை தரக்கட்டுப்பாட்டு அறிக்கை (In-Process QC Report)',
  'Batch Review Record': 'தொகுதி மறுஆய்வுப் பதிவு (Batch Review Record)',
  'Status Labels/Tags': 'நிலை லேபிள்கள் / குறிச்சொற்கள் (Status Labels/Tags)',
  'Finished Good Test Report': 'முடிக்கப்பட்ட தயாரிப்பு ஆய்வு அறிக்கை (Finished Good Test Report)',
  'Transfer Ticket (TT)': 'பரிமாற்றச் சீட்டு (Transfer Ticket - TT)',
};

// Line Clearance check points in Tamil
export const LINE_CHECK_POINTS_TA = {
  no_remnants: 'முந்தைய தொகுதியின் எஞ்சிய பொருட்கள் எதுவும் இப்பகுதியில் இல்லை என்பதை உறுதிசெய்க.',
  cleanliness: 'அறை, எடை எந்திரங்கள், டிஸ்பென்சிங் பூத் மற்றும் பிற சாதனங்களின் தூய்மையை உறுதிசெய்து பதிவை பராமரிக்கவும்.',
  temp_rh: 'டிஸ்பென்சிங் அறையின் வெப்பநிலை மற்றும் ஈரப்பதத்தை பதிவு செய்க.',
  calibration: 'அனைத்து அளவீட்டு கருவிகளும் அளவீடு (Calibrated) செய்யப்பட்டுள்ளதை உறுதிசெய்க.',
  qc_release: 'மூலப்பொருட்களின் QC அனுமதி நிலையை சரிபார்க்கவும்.',
};

// Step titles & dynamic instructions in Tamil for MiDip-700
export function getTamilStep(stepNumber, litres = 700) {
  const num = typeof litres === 'number' ? litres : parseFloat(litres) || 700;
  const solAKg = ((num * 466.666) / 700).toFixed(3);
  const solBKg = ((num * 0.070) / 700).toFixed(3);
  const solBGrams = ((num * 70) / 700).toFixed(0);
  const solCL = ((num * 14.0) / 700).toFixed(3);
  const solDKg = ((num * 21.0) / 700).toFixed(2);
  const solEKg = ((num * 0.875) / 700).toFixed(3);
  const waterForSolEL = ((num * 14.0) / 700).toFixed(2);
  const solFKg = ((num * 0.700) / 700).toFixed(3);
  const solGKg = ((num * 0.210) / 700).toFixed(3);
  const solGGrams = ((num * 210) / 700).toFixed(0);
  const solHL = ((num * 14.0) / 700).toFixed(3);
  const step1Water = ((num * 70.0) / 700).toFixed(2);

  const steps = {
    1: {
      stepNumber: 1,
      title: 'முதன்மை தொட்டி: நீர் மற்றும் Polyvinyl Alcohol (PVA) சேர்க்கவும்',
      shortTitle: 'நீர் & PVA',
      tankBadge: 'முதன்மை தொட்டி (Tank 1)',
      instruction: `முதன்மை உற்பத்தித் தொட்டியில் (Tank 1) ${step1Water} kg சுத்திகரிக்கப்பட்ட நீரைச் சேர்க்கவும். பின்னர் ${solAKg} kg Polyvinyl Alcohol (PVA)-ஐச் சேர்த்து முழுமையாக சீராகும் வரை கலக்கவும்.`,
      studentNote: `முதன்மை தொட்டியில் (Tank 1) ${step1Water} kg சுத்தமான நீரை ஊற்றி, ${solAKg} kg Polyvinyl Alcohol (PVA) சேர்த்து கலவையை சீராக கலக்க வேண்டும்.`,
    },
    2: {
      stepNumber: 2,
      title: 'Solution I செயல்முறை: Molecular Iodine-ஐ Ethanol-ல் கரைக்கவும்',
      shortTitle: 'Iodine-ஐ Ethanol-ல்',
      tankBadge: 'தனி கொள்கலன் (Tank 2) — Solution I',
      warning: 'முதன்மை தொட்டியில் சேர்க்க வேண்டாம்! "Solution I" தயாரிக்க இதை ஒரு சுத்தமான தனி கொள்கலனில் (Tank 2) தயாரிக்க வேண்டும்.',
      instruction: `தனி பொருத்தமான கொள்கலனில் (Tank 2): ${solBKg} kg (${solBGrams} g) Molecular Iodine மற்றும் ${solCL} L Ethanol ஆகியவற்றைச் சேர்க்கவும். Molecular Iodine முழுமையாகக் கரையும் வரை கலக்கவும்.`,
      studentNote: `முதன்மை தொட்டியைப் பயன்படுத்த வேண்டாம்! தனி கொள்கலனில் (Tank 2) ${solBGrams} கிராம் Molecular Iodine பவுடரை ${solCL} லிட்டர் Ethanol திரவத்தில் போட்டு நன்கு கலக்கவும்.`,
    },
    3: {
      stepNumber: 3,
      title: 'Solution I உருவாக்கம்: 1% Decolourization Solution சேர்த்து 30 நிமிடம் நிறமாற்றம்',
      shortTitle: '30-நிமிடம் நிறமாற்றம்',
      tankBadge: 'தனி கொள்கலன் (Tank 2) — Solution I',
      warning: '30 நிமிட டைமர் முடியும் வரை இந்த கொள்கலனை அசைக்காமல் வைக்கவும். இதன் மூலம் புதிய பொருளான "Solution I" உருவாகிறது.',
      instruction: `அதே தனி கொள்கலனில் (Tank 2): ${solHL} L அளவு 1% Solution H (Decolourization Solution)-ஐச் சேர்க்கவும். மெதுவாகக் கலக்கி, முழுமையான நிறமாற்றத்திற்காக 30 நிமிடங்கள் அப்படியே வைக்கவும். இவ்வாறு உருவாக்கப்பட்ட பொருள் "Solution I" ஆகும்.`,
      studentNote: `அதே தனி பாத்திரத்தில் (Tank 2), ${solHL} லிட்டர் 1% Solution H ஊற்றி, மெதுவாக கலக்கி, 30 நிமிடங்கள் அப்படியே வைக்கவும். அதன் நிறம் மாறுவதை (நிறமாற்றம்) நீங்கள் காண்பீர்கள். 30 நிமிட கவுண்ட்டவுன் முடிந்ததும், இவ்வாறு உருவான சிறப்பு கலவை "Solution I" என்று அழைக்கப்படுகிறது!`,
    },
    4: {
      stepNumber: 4,
      title: 'முதன்மை தொட்டி: Glycerine சேர்க்கவும்',
      shortTitle: 'Glycerine சேர்க்கை',
      tankBadge: 'முதன்மை தொட்டி (Tank 1)',
      instruction: `முதன்மை உற்பத்தித் தொட்டிக்கு (Tank 1) திரும்பவும். முதன்மை தொட்டியில் ${solDKg} kg Glycerine-ஐச் சேர்த்து முற்றிலும் ஒரே மாதிரியாக மாறும் வரை கலக்கவும்.`,
      studentNote: `முதன்மை தொட்டிக்கு (Tank 1) சென்று ${solDKg} kg Glycerine சேர்த்து நன்கு கலக்கவும்.`,
    },
    5: {
      stepNumber: 5,
      title: 'PEG 6000-ஐ தனியாக நீரில் கரைத்து முதன்மை தொட்டியில் சேர்க்கவும்',
      shortTitle: 'PEG 6000 முன்-கரைப்பு',
      tankBadge: 'தனி தயாரிப்பு & முதன்மை தொட்டி சேர்க்கை',
      warning: 'PEG 6000 பவுடரை நேரடியாக முதன்மை தொட்டியில் கொட்ட வேண்டாம்! கட்டிகள் உருவாவதைத் தடுக்க முதலில் நீரில் கரைக்க வேண்டும்.',
      instruction: `தனி சுத்தமான பாத்திரத்தில், ${solEKg} kg PEG 6000-ஐ ${waterForSolEL} L சுத்திகரிக்கப்பட்ட நீரில் கரைக்கவும். முழுமையாகக் கரைந்ததும், இக்கரைசலை முதன்மை தொட்டியில் (Tank 1) ஊற்றவும்.`,
      studentNote: `PEG 6000-ஐ ஒரு சிறிய சுத்தமான பாத்திரத்தில் ${waterForSolEL} லிட்டர் நீரில் ${solEKg} kg கரைத்து, பின்னர் அதை பெரிய முதன்மை தொட்டியில் ஊற்றவும்.`,
    },
    6: {
      stepNumber: 6,
      title: 'முதன்மை தொட்டி: Sodium Benzoate சேர்க்கவும்',
      shortTitle: 'Sodium Benzoate சேர்க்கை',
      tankBadge: 'முதன்மை தொட்டி (Tank 1)',
      instruction: `முதன்மை உற்பத்தித் தொட்டியில் (Tank 1) ${solFKg} kg Sodium Benzoate-ஐச் சேர்த்து சீராகும் வரை கலக்கவும்.`,
      studentNote: `முதன்மை தொட்டியில் ${solFKg} kg Sodium Benzoate ஊற்றி சீராக கலக்கவும்.`,
    },
    7: {
      stepNumber: 7,
      title: 'முக்கிய சேர்க்கை: தயார் செய்யப்பட்ட Solution I-ஐ முதன்மை தொட்டியில் மெதுவாக சேர்க்கவும்',
      shortTitle: 'Solution I சேர்க்கை',
      tankBadge: 'தொட்டி 2-லிருந்து தொட்டி 1-க்கு மாற்றுதல்',
      warning: 'வேகமாக ஊற்ற வேண்டாம்! சீரான விநியோகத்திற்காக தொடர்ச்சியான கிளறலுடன் மெதுவாக ஊற்றவும்.',
      instruction: `தனி கொள்கலனில் (Tank 2) தயார் செய்யப்பட்ட நிறமாற்றமடைந்த "Solution I" கலவையை முதன்மை உற்பத்தித் தொட்டியில் (Tank 1) மெதுவாகவும் கவனமாகவும் ஊற்றவும். தொடர்ச்சியாக மிதமான வேகத்தில் கலக்கவும்.`,
      studentNote: `தனி பாத்திரத்தில் 30 நிமிடம் வைத்து தயாரித்த "Solution I" கரைசலை மெதுவாக முதன்மை தொட்டியில் ஊற்றி கலக்கவும்.`,
    },
    8: {
      stepNumber: 8,
      title: 'முதன்மை தொட்டி: Fast Green FCF Colour / Dye சேர்க்கவும்',
      shortTitle: 'Fast Green சேர்க்கை',
      tankBadge: 'முதன்மை தொட்டி (Tank 1)',
      instruction: `முதன்மை உற்பத்தித் தொட்டியில் (Tank 1) ${solGKg} kg (${solGGrams} g) Fast Green FCF Colour / Dye-ஐ நேரடியாகச் சேர்க்கவும். சீரான விநியோகத்தை உறுதிசெய்ய நன்கு கலக்கவும்.`,
      studentNote: `முதன்மை தொட்டியில் ${solGGrams} கிராம் Fast Green FCF Colour / Dye சேர்த்து திரவம் முழுவதும் ஒரே சீரான நிறம் வரும் வரை கிளறவும்.`,
    },
    9: {
      stepNumber: 9,
      title: 'எடை சமநிலை & இறுதி நீர் சேர்த்தல் (q.s. to Target)',
      shortTitle: 'இறுதி நீர் (q.s.)',
      tankBadge: 'முதன்மை தொட்டி — இறுதி சமநிலை',
      instruction: `தொகுதியின் மொத்த எடை சமநிலையைச் சரிபார்க்கவும். இலக்கு தொகுதி எடையை (${num} kg) அடைய தேவையான அளவு சுத்திகரிக்கப்பட்ட நீரை (q.s.) சேர்த்து முழுமையாக கலக்கவும்.`,
      studentNote: `சேர்க்கப்பட்ட பொருட்களின் எடையை இலக்கு எடையுடன் (${num} kg) ஒப்பிட்டு, மீதமுள்ள நீரை ஊற்றி சரியான அளவை எட்ட வேண்டும்!`,
    },
  };

  return steps[stepNumber] || null;
}

// Pre-built dictionary and array for default 700L
export const MIDIP_STEPS_TA = {
  1: getTamilStep(1, 700),
  2: getTamilStep(2, 700),
  3: getTamilStep(3, 700),
  4: getTamilStep(4, 700),
  5: getTamilStep(5, 700),
  6: getTamilStep(6, 700),
  7: getTamilStep(7, 700),
  8: getTamilStep(8, 700),
  9: getTamilStep(9, 700),
  0: getTamilStep(1, 700), // fallback index
};

