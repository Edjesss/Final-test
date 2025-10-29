/**
 * Blue Aruba ROI Calculator
 * Professional tool for calculating return on investment for rental properties
 */

// ===== CONSTANTS =====
const AWG_PER_USD = 1.79;
const MANAGEMENT_FEE_PCT = 20; // Fixed management fee percentage
const TOTAL_WEEKS_PER_YEAR = 52;
const DAYS_PER_WEEK = 7;
const DAYS_PER_YEAR = 365;
const MONTHS_PER_YEAR = 12;

// Default OPEX values (annual in USD)
const DEFAULTS = {
  VILLA_MAINTENANCE: 2800,
  CONDO_MAINTENANCE: 1800,
  VILLA_ELECTRICITY_MONTHLY: 650,
  CONDO_ELECTRICITY_MONTHLY: 400,
  VILLA_WATER_MONTHLY: 120,
  CONDO_WATER_MONTHLY: 70,
  INTERNET_MONTHLY: 85,
  VILLA_INSURANCE_MONTHLY: 200,
  CONDO_INSURANCE_MONTHLY: 100,
  VILLA_CLEANING: 150,
  CONDO_CLEANING: 85,
  GOV_TAXES_ANNUAL: 1000,
  PROPERTY_RESERVE_RATE: 0.005, // 0.5% of property value
  VILLA_SIZE_MULTIPLIER: 1.25,
  CONDO_SIZE_MULTIPLIER: 1.0,
  OPEX_INFLATION: 0.025, // 2.5% annual
  UTILITY_MULTIPLIER: 0.9
};

// Transfer tax rates (Aruba specific)
const TRANSFER_TAX = {
  FIRST_TIER_LIMIT: 250000, // AWG
  FIRST_TIER_RATE: 0.03,    // 3%
  SECOND_TIER_RATE: 0.06    // 6%
};

// ===== STATE =====
const STATE = {
  // Currency
  currency: 'USD',
  
  // Property
  price: 650000,
  totalInv: null,
  propType: 'Condo',
  beds: 2,
  baths: 2,
  propertyName: '',
  propertyAddress: '',
  studios: 0,
  apartments: 0,
  
  // Occupancy
  baseOcc: 59.5,
  avgLOS: 5,
  
  // Rates
  rateHigh: 420,
  rateMid: 320,
  rateLow: 220,
  holidayPrem: 30,
  
  // Seasons
  wHigh: 16,
  wMid: 20,
  wLow: 16,
  wHoliday: 2,
  
  // Fees
  otaPct: 12,
  mgmtPct: MANAGEMENT_FEE_PCT,
  hoaMonthly: 420,
  
  // OPEX overrides (monthly, 0=auto)
  opxMaint: 0,
  opxClean: 0,
  opxElec: 0,
  opxWater: 0,
  opxNet: 0,
  opxIns: 0,
  opxRes: 0,
  opxGov: 0,
  
  // Financing
  financingMode: 'BANK',
  ltvPct: 60,
  downPct: 40,
  ratePct: 8,
  termYears: 30,
  
  // Branding
  blueLogoData: null,
  realtorLogoData: null,
  blueWebsite: 'www.bluearuba.com',
  realtorName: '',
  realtorCompany: '',
  realtorLicense: '',
  realtorPhone: '',
  realtorEmail: '',
  realtorWebsite: ''
};

// ===== DOM ELEMENT CACHE =====
const DOM = {};

/**
 * Cache frequently accessed DOM elements for better performance
 */
function cacheDOMElements() {
  // Hero stats
  DOM.heroRev = document.getElementById('heroRev');
  DOM.heroNet = document.getElementById('heroNet');
  DOM.heroCap = document.getElementById('heroCap');
  DOM.heroBreak = document.getElementById('heroBreak');
  
  // Currency toggle
  DOM.currencyToggle = document.getElementById('currencyToggle');
  
  // Input elements
  DOM.priceInput = document.getElementById('priceInput');
  DOM.totalInvInput = document.getElementById('totalInvInput');
  DOM.propType = document.getElementById('propType');
  DOM.beds = document.getElementById('beds');
  DOM.baths = document.getElementById('baths');
  DOM.propertyName = document.getElementById('propertyName');
  DOM.propertyAddress = document.getElementById('propertyAddress');
  DOM.studios = document.getElementById('studios');
  DOM.apartments = document.getElementById('apartments');
  
  // Print property summary elements
  DOM.printPropertyName = document.getElementById('printPropertyName');
  DOM.printPropertyAddress = document.getElementById('printPropertyAddress');
  DOM.printPropertyType = document.getElementById('printPropertyType');
  DOM.printBedrooms = document.getElementById('printBedrooms');
  DOM.printBathrooms = document.getElementById('printBathrooms');
  DOM.printExtraSpaces = document.getElementById('printExtraSpaces');
  DOM.printExtraSpacesItem = document.getElementById('printExtraSpacesItem');
  
  // Financing
  DOM.financingMode = document.getElementById('financingMode');
  DOM.ltvPct = document.getElementById('ltvPct');
  DOM.downPct = document.getElementById('downPct');
  DOM.ratePct = document.getElementById('ratePct');
  DOM.termYears = document.getElementById('termYears');
  DOM.downAmtView = document.getElementById('downAmtView');
  DOM.loanAmtView = document.getElementById('loanAmtView');
  
  // Display groups
  DOM.ltvGroup = document.getElementById('ltvGroup');
  DOM.downPctGroup = document.getElementById('downPctGroup');
  DOM.rateGroup = document.getElementById('rateGroup');
  DOM.termGroup = document.getElementById('termGroup');
  
  // Occupancy
  DOM.baseOcc = document.getElementById('baseOcc');
  DOM.avgLOS = document.getElementById('avgLOS');
  
  // Rates
  DOM.rateHigh = document.getElementById('rateHigh');
  DOM.rateMid = document.getElementById('rateMid');
  DOM.rateLow = document.getElementById('rateLow');
  DOM.holidayPrem = document.getElementById('holidayPrem');
  
  // Seasons
  DOM.wHigh = document.getElementById('wHigh');
  DOM.wMid = document.getElementById('wMid');
  DOM.wLow = document.getElementById('wLow');
  DOM.wHoliday = document.getElementById('wHoliday');
  
  // Fees
  DOM.otaPct = document.getElementById('otaPct');
  DOM.hoaMonthly = document.getElementById('hoaMonthly');
  
  // OPEX
  DOM.opxMaint = document.getElementById('opxMaint');
  DOM.opxClean = document.getElementById('opxClean');
  DOM.opxElec = document.getElementById('opxElec');
  DOM.opxWater = document.getElementById('opxWater');
  DOM.opxNet = document.getElementById('opxNet');
  DOM.opxIns = document.getElementById('opxIns');
  DOM.opxRes = document.getElementById('opxRes');
  DOM.opxGov = document.getElementById('opxGov');
  
  // Branding
  DOM.blueWebsite = document.getElementById('blueWebsite');
  DOM.realtorName = document.getElementById('realtorName');
  DOM.realtorCompany = document.getElementById('realtorCompany');
  DOM.realtorLicense = document.getElementById('realtorLicense');
  DOM.realtorPhone = document.getElementById('realtorPhone');
  DOM.realtorEmail = document.getElementById('realtorEmail');
  DOM.realtorWebsite = document.getElementById('realtorWebsite');
  
  // Logo handling
  DOM.blueLogoFile = document.getElementById('blueLogoFile');
  DOM.realtorLogoFile = document.getElementById('realtorLogoFile');
  DOM.blueLogoPreview = document.getElementById('blueLogoPreview');
  DOM.realtorLogoPreview = document.getElementById('realtorLogoPreview');
  DOM.btnClearBlueLogo = document.getElementById('btnClearBlueLogo');
  DOM.btnClearRealtorLogo = document.getElementById('btnClearRealtorLogo');
  
  // Buttons
  DOM.btnCalc = document.getElementById('btnCalc');
  DOM.btnPrint = document.getElementById('btnPrint');
  DOM.btnReset = document.getElementById('btnReset');
  
  // Appreciation
  DOM.appreciation = document.getElementById('appreciation');
  DOM.appreciationBadge = document.getElementById('appreciation-badge');
}

// ===== UTILITY FUNCTIONS =====

/**
 * Safely parse a float value with fallback
 * @param {string|number} value - Value to parse
 * @param {number} defaultValue - Default value if parsing fails
 * @returns {number} Parsed value or default
 */
function safeParseFloat(value, defaultValue = 0) {
  const parsed = parseFloat(value);
  return isNaN(parsed) ? defaultValue : parsed;
}

/**
 * Clamp a number between min and max values
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Clamped value
 */
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

// ===== FORMATTERS =====
const fmt = {
  /**
   * Format a number as currency
   * @param {number} val - Value to format
   * @param {string} currency - Currency code (USD or AWG)
   * @returns {string} Formatted currency string
   */
  money: (val, currency) => {
    const sym = currency === 'AWG' ? 'Afl ' : '$';
    return sym + Math.round(val).toLocaleString();
  },
  
  /**
   * Format a number as percentage
   * @param {number} val - Value to format
   * @param {number} decimals - Number of decimal places
   * @returns {string} Formatted percentage string
   */
  pct: (val, decimals = 1) => val.toFixed(decimals) + '%',
  
  /**
   * Format a number
   * @param {number} val - Value to format
   * @param {number} decimals - Number of decimal places
   * @returns {string} Formatted number string
   */
  num: (val, decimals = 0) => val.toFixed(decimals)
};

/**
 * Convert USD value to specified currency
 * @param {number} usdVal - Value in USD
 * @param {string} currency - Target currency
 * @returns {number} Converted value
 */
function toCur(usdVal, currency) {
  return currency === 'AWG' ? usdVal * AWG_PER_USD : usdVal;
}

/**
 * Convert value from specified currency to USD
 * @param {number} val - Value in currency
 * @param {string} currency - Source currency
 * @returns {number} Value in USD
 */
function fromCur(val, currency) {
  return currency === 'AWG' ? val / AWG_PER_USD : val;
}

// ===== EVENT BINDINGS =====

/**
 * Bind all input event listeners
 * Uses cached DOM elements and validates all inputs
 */
function bindInputs() {
  // Currency toggle - use event delegation
  DOM.currencyToggle.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    
    const newCur = btn.dataset.currency;
    if (newCur === STATE.currency) return;
    
    // Update aria-pressed attributes
    DOM.currencyToggle.querySelectorAll('button').forEach(b => {
      b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      b.classList.toggle('active', b === btn);
    });
    
    // Convert all monetary values
    const ratio = newCur === 'AWG' ? AWG_PER_USD : 1 / AWG_PER_USD;
    STATE.price *= ratio;
    if (STATE.totalInv) STATE.totalInv *= ratio;
    STATE.rateHigh *= ratio;
    STATE.rateMid *= ratio;
    STATE.rateLow *= ratio;
    STATE.hoaMonthly *= ratio;
    
    // OPEX overrides
    if (STATE.opxMaint > 0) STATE.opxMaint *= ratio;
    if (STATE.opxClean > 0) STATE.opxClean *= ratio;
    if (STATE.opxElec > 0) STATE.opxElec *= ratio;
    if (STATE.opxWater > 0) STATE.opxWater *= ratio;
    if (STATE.opxNet > 0) STATE.opxNet *= ratio;
    if (STATE.opxIns > 0) STATE.opxIns *= ratio;
    if (STATE.opxRes > 0) STATE.opxRes *= ratio;
    if (STATE.opxGov > 0) STATE.opxGov *= ratio;
    
    STATE.currency = newCur;
    syncInputsToState();
    calculate();
  });
  
  // Property inputs with validation
  DOM.priceInput.addEventListener('input', e => {
    STATE.price = safeParseFloat(e.target.value, 0);
    updateDerivedAmounts();
  });
  
  DOM.totalInvInput.addEventListener('input', e => {
    STATE.totalInv = e.target.value ? safeParseFloat(e.target.value, null) : null;
  });
  
  DOM.propType.addEventListener('change', e => {
    STATE.propType = e.target.value;
  });
  
  DOM.beds.addEventListener('input', e => {
    STATE.beds = safeParseFloat(e.target.value, 2);
  });
  
  DOM.baths.addEventListener('input', e => {
    STATE.baths = safeParseFloat(e.target.value, 2);
  });
  
  DOM.propertyName.addEventListener('input', e => {
    STATE.propertyName = e.target.value;
  });
  
  DOM.propertyAddress.addEventListener('input', e => {
    STATE.propertyAddress = e.target.value;
  });
  
  DOM.studios.addEventListener('input', e => {
    STATE.studios = safeParseFloat(e.target.value, 0);
  });
  
  DOM.apartments.addEventListener('input', e => {
    STATE.apartments = safeParseFloat(e.target.value, 0);
  });
  
  // Financing
  DOM.financingMode.addEventListener('change', e => {
    STATE.financingMode = e.target.value;
    updateFinancingUI();
    updateDerivedAmounts();
  });
  
  DOM.ltvPct.addEventListener('input', e => {
    let ltv = safeParseFloat(e.target.value, 60);
    ltv = clamp(ltv, 5, 95);
    STATE.ltvPct = ltv;
    STATE.downPct = 100 - ltv;
    DOM.ltvPct.value = ltv;
    DOM.downPct.value = STATE.downPct;
    updateDerivedAmounts();
  });
  
  DOM.downPct.addEventListener('input', e => {
    let down = safeParseFloat(e.target.value, 40);
    down = clamp(down, 5, 95);
    STATE.downPct = down;
    STATE.ltvPct = 100 - down;
    DOM.downPct.value = down;
    DOM.ltvPct.value = STATE.ltvPct;
    updateDerivedAmounts();
  });
  
  DOM.ratePct.addEventListener('input', e => {
    STATE.ratePct = safeParseFloat(e.target.value, 8);
  });
  
  DOM.termYears.addEventListener('input', e => {
    STATE.termYears = safeParseFloat(e.target.value, 30);
  });
  
  // Occupancy
  DOM.baseOcc.addEventListener('input', e => {
    STATE.baseOcc = safeParseFloat(e.target.value, 59.5);
  });
  
  DOM.avgLOS.addEventListener('input', e => {
    STATE.avgLOS = safeParseFloat(e.target.value, 5);
  });
  
  // Rates
  DOM.rateHigh.addEventListener('input', e => {
    STATE.rateHigh = safeParseFloat(e.target.value, 420);
  });
  
  DOM.rateMid.addEventListener('input', e => {
    STATE.rateMid = safeParseFloat(e.target.value, 320);
  });
  
  DOM.rateLow.addEventListener('input', e => {
    STATE.rateLow = safeParseFloat(e.target.value, 220);
  });
  
  DOM.holidayPrem.addEventListener('input', e => {
    STATE.holidayPrem = safeParseFloat(e.target.value, 30);
  });
  
  // Seasons - auto-normalize
  [DOM.wHigh, DOM.wMid, DOM.wLow, DOM.wHoliday].forEach((input, idx) => {
    const keys = ['wHigh', 'wMid', 'wLow', 'wHoliday'];
    input.addEventListener('input', e => {
      STATE[keys[idx]] = safeParseFloat(e.target.value, 0);
      normalizeWeeks();
    });
  });
  
  // Fees
  DOM.otaPct.addEventListener('input', e => {
    STATE.otaPct = safeParseFloat(e.target.value, 12);
  });
  
  DOM.hoaMonthly.addEventListener('input', e => {
    STATE.hoaMonthly = safeParseFloat(e.target.value, 420);
  });
  
  // OPEX overrides
  DOM.opxMaint.addEventListener('input', e => {
    STATE.opxMaint = safeParseFloat(e.target.value, 0);
  });
  
  DOM.opxClean.addEventListener('input', e => {
    STATE.opxClean = safeParseFloat(e.target.value, 0);
  });
  
  DOM.opxElec.addEventListener('input', e => {
    STATE.opxElec = safeParseFloat(e.target.value, 0);
  });
  
  DOM.opxWater.addEventListener('input', e => {
    STATE.opxWater = safeParseFloat(e.target.value, 0);
  });
  
  DOM.opxNet.addEventListener('input', e => {
    STATE.opxNet = safeParseFloat(e.target.value, 0);
  });
  
  DOM.opxIns.addEventListener('input', e => {
    STATE.opxIns = safeParseFloat(e.target.value, 0);
  });
  
  DOM.opxRes.addEventListener('input', e => {
    STATE.opxRes = safeParseFloat(e.target.value, 0);
  });
  
  DOM.opxGov.addEventListener('input', e => {
    STATE.opxGov = safeParseFloat(e.target.value, 0);
  });
  
  // Branding
  DOM.blueWebsite.addEventListener('input', e => {
    STATE.blueWebsite = e.target.value;
    syncBrandingToPrint();
  });
  
  const brandingFields = [
    { dom: DOM.realtorName, key: 'realtorName' },
    { dom: DOM.realtorCompany, key: 'realtorCompany' },
    { dom: DOM.realtorLicense, key: 'realtorLicense' },
    { dom: DOM.realtorPhone, key: 'realtorPhone' },
    { dom: DOM.realtorEmail, key: 'realtorEmail' },
    { dom: DOM.realtorWebsite, key: 'realtorWebsite' }
  ];
  
  brandingFields.forEach(({ dom, key }) => {
    dom.addEventListener('input', e => {
      STATE[key] = e.target.value;
      syncBrandingToPrint();
    });
  });
  
  // Logo uploads
  DOM.blueLogoFile.addEventListener('change', e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => {
        STATE.blueLogoData = ev.target.result;
        DOM.blueLogoPreview.src = STATE.blueLogoData;
        DOM.blueLogoPreview.classList.add('active');
        syncBrandingToPrint();
      };
      reader.readAsDataURL(file);
    }
  });
  
  DOM.realtorLogoFile.addEventListener('change', e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => {
        STATE.realtorLogoData = ev.target.result;
        DOM.realtorLogoPreview.src = STATE.realtorLogoData;
        DOM.realtorLogoPreview.classList.add('active');
        syncBrandingToPrint();
      };
      reader.readAsDataURL(file);
    }
  });
  
  DOM.btnClearBlueLogo.addEventListener('click', () => {
    STATE.blueLogoData = null;
    DOM.blueLogoFile.value = '';
    DOM.blueLogoPreview.classList.remove('active');
    syncBrandingToPrint();
  });
  
  DOM.btnClearRealtorLogo.addEventListener('click', () => {
    STATE.realtorLogoData = null;
    DOM.realtorLogoFile.value = '';
    DOM.realtorLogoPreview.classList.remove('active');
    syncBrandingToPrint();
  });
  
  // Actions
  DOM.btnCalc.addEventListener('click', calculate);
  DOM.btnPrint.addEventListener('click', () => window.print());
  DOM.btnReset.addEventListener('click', reset);
  
  // 10Y appreciation
  DOM.appreciation.addEventListener('input', e => {
    const val = safeParseFloat(e.target.value, 3);
    DOM.appreciationBadge.textContent = val + '% Annual Growth';
    calculate();
  });
}

/**
 * Sync state values back to form inputs
 */
function syncInputsToState() {
  DOM.priceInput.value = STATE.price;
  DOM.totalInvInput.value = STATE.totalInv || '';
  DOM.propType.value = STATE.propType;
  DOM.beds.value = STATE.beds;
  DOM.baths.value = STATE.baths;
  DOM.baseOcc.value = STATE.baseOcc;
  DOM.avgLOS.value = STATE.avgLOS;
  DOM.rateHigh.value = STATE.rateHigh;
  DOM.rateMid.value = STATE.rateMid;
  DOM.rateLow.value = STATE.rateLow;
  DOM.holidayPrem.value = STATE.holidayPrem;
  DOM.wHigh.value = STATE.wHigh;
  DOM.wMid.value = STATE.wMid;
  DOM.wLow.value = STATE.wLow;
  DOM.wHoliday.value = STATE.wHoliday;
  DOM.otaPct.value = STATE.otaPct;
  DOM.hoaMonthly.value = STATE.hoaMonthly;
  DOM.opxMaint.value = STATE.opxMaint;
  DOM.opxClean.value = STATE.opxClean;
  DOM.opxElec.value = STATE.opxElec;
  DOM.opxWater.value = STATE.opxWater;
  DOM.opxNet.value = STATE.opxNet;
  DOM.opxIns.value = STATE.opxIns;
  DOM.opxRes.value = STATE.opxRes;
  DOM.opxGov.value = STATE.opxGov;
  DOM.financingMode.value = STATE.financingMode;
  DOM.ltvPct.value = STATE.ltvPct;
  DOM.downPct.value = STATE.downPct;
  DOM.ratePct.value = STATE.ratePct;
  DOM.termYears.value = STATE.termYears;
  updateFinancingUI();
  updateDerivedAmounts();
}

/**
 * Update financing UI visibility based on mode
 */
function updateFinancingUI() {
  const isBank = STATE.financingMode === 'BANK';
  DOM.ltvGroup.style.display = isBank ? 'flex' : 'none';
  DOM.downPctGroup.style.display = isBank ? 'flex' : 'none';
  DOM.rateGroup.style.display = isBank ? 'flex' : 'none';
  document.getElementById('termGroup').style.display = isBank ? 'flex' : 'none';
  
  // Mortgage output rows
  document.getElementById('rowLoan').style.display = isBank ? '' : 'none';
  document.getElementById('rowBankFee').style.display = isBank ? '' : 'none';
  document.getElementById('rowMortNotary').style.display = isBank ? '' : 'none';
  document.getElementById('rowPmt').style.display = isBank ? '' : 'none';
  document.getElementById('rowAllIn').style.display = isBank ? '' : 'none';
}

function updateDerivedAmounts() {
  const price = STATE.price;
  const isBank = STATE.financingMode === 'BANK';
  const downAmt = isBank ? price * STATE.downPct / 100 : price;
  const loanAmt = isBank ? price * STATE.ltvPct / 100 : 0;
  
  document.getElementById('downAmtView').value = fmt.money(downAmt, STATE.currency);
  document.getElementById('loanAmtView').value = isBank ? fmt.money(loanAmt, STATE.currency) : 'N/A';
}

function normalizeWeeks() {
  const total = STATE.wHigh + STATE.wMid + STATE.wLow;
  if (total === 0) return;
  const scale = 52 / total;
  STATE.wHigh = Math.round(STATE.wHigh * scale);
  STATE.wMid = Math.round(STATE.wMid * scale);
  STATE.wLow = Math.round(STATE.wLow * scale);
  
  // Adjust to exactly 52
  const newTotal = STATE.wHigh + STATE.wMid + STATE.wLow;
  if (newTotal < 52) STATE.wHigh += (52 - newTotal);
  else if (newTotal > 52) STATE.wHigh -= (newTotal - 52);
  
  // Clamp holiday
  STATE.wHoliday = Math.min(STATE.wHoliday, STATE.wHigh);
  
  document.getElementById('wHigh').value = STATE.wHigh;
  document.getElementById('wMid').value = STATE.wMid;
  document.getElementById('wLow').value = STATE.wLow;
  document.getElementById('wHoliday').value = STATE.wHoliday;
}

function syncBrandingToPrint() {
  // Blue logo
  if (STATE.blueLogoData) {
    document.getElementById('printBlueLogo').src = STATE.blueLogoData;
    document.getElementById('printBlueLogo').style.display = 'block';
    document.getElementById('printBlueLogoText').style.display = 'none';
  } else {
    document.getElementById('printBlueLogo').style.display = 'none';
    document.getElementById('printBlueLogoText').style.display = 'block';
  }
  
  // Realtor logo
  if (STATE.realtorLogoData) {
    document.getElementById('printRealtorLogo').src = STATE.realtorLogoData;
    document.getElementById('printRealtorLogo').style.display = 'block';
  } else {
    document.getElementById('printRealtorLogo').style.display = 'none';
  }
  
  document.getElementById('printBlueWebsite').textContent = STATE.blueWebsite;
  document.getElementById('printRealtorName').textContent = STATE.realtorName;
  document.getElementById('printRealtorCompany').textContent = STATE.realtorCompany;
  document.getElementById('printRealtorLicense').textContent = STATE.realtorLicense;
  
  const contactParts = [STATE.realtorPhone, STATE.realtorEmail, STATE.realtorWebsite].filter(x => x);
  document.getElementById('printRealtorContact').textContent = contactParts.join(' • ');
}

function reset() {
  // Reset to defaults
  STATE.currency = 'USD';
  STATE.price = 650000;
  STATE.totalInv = null;
  STATE.propType = 'Condo';
  STATE.beds = 2;
  STATE.baths = 2;
  STATE.baseOcc = 59.5;
  STATE.avgLOS = 5;
  STATE.rateHigh = 420;
  STATE.rateMid = 320;
  STATE.rateLow = 220;
  STATE.holidayPrem = 30;
  STATE.wHigh = 16;
  STATE.wMid = 20;
  STATE.wLow = 16;
  STATE.wHoliday = 2;
  STATE.otaPct = 12;
  STATE.mgmtPct = 20;
  STATE.hoaMonthly = 420;
  STATE.opxMaint = 0;
  STATE.opxClean = 0;
  STATE.opxElec = 0;
  STATE.opxWater = 0;
  STATE.opxNet = 0;
  STATE.opxIns = 0;
  STATE.opxRes = 0;
  STATE.opxGov = 0;
  STATE.financingMode = 'BANK';
  STATE.ltvPct = 60;
  STATE.downPct = 40;
  STATE.ratePct = 8;
  STATE.termYears = 30;
  STATE.blueLogoData = null;
  STATE.realtorLogoData = null;
  STATE.blueWebsite = 'www.bluearuba.com';
  STATE.realtorName = '';
  STATE.realtorCompany = '';
  STATE.realtorLicense = '';
  STATE.realtorPhone = '';
  STATE.realtorEmail = '';
  STATE.realtorWebsite = '';
  
  document.getElementById('blueLogoFile').value = '';
  document.getElementById('realtorLogoFile').value = '';
  document.getElementById('blueLogoPreview').classList.remove('active');
  document.getElementById('realtorLogoPreview').classList.remove('active');
  document.getElementById('appreciation').value = 3;
  document.getElementById('appreciation-badge').textContent = '3% Annual Growth';
  
  document.querySelectorAll('#currencyToggle button').forEach(b => b.classList.remove('active'));
  document.querySelector('#currencyToggle button[data-currency="USD"]').classList.add('active');
  
  syncInputsToState();
  syncBrandingToPrint();
  calculate();
}

// ===== CALCULATIONS =====
function getOPEX() {
  const priceUSD = fromCur(STATE.price, STATE.currency);
  const typeMult = STATE.propType === 'Villa' ? 1.25 : 1.0;
  const sizeMult = Math.max(0.6, 0.8 + 0.10 * (STATE.beds - 2) + 0.06 * (STATE.baths - 2));
  
  // Auto values (annual in USD)
  const maintAuto = (STATE.propType === 'Villa' ? 2800 : 1800) * sizeMult;
  const elecAuto = (STATE.propType === 'Villa' ? 650 : 400) * 12 * sizeMult * 0.9;
  const waterAuto = (STATE.propType === 'Villa' ? 120 : 70) * 12 * sizeMult * 0.9;
  const internetAuto = 85 * 12;
  const insAuto = (STATE.propType === 'Villa' ? 200 : 100) * 12 * 0.9;
  const reserveAuto = priceUSD * 0.005 * typeMult;
  const govAuto = 1000;
  
  // Use override if > 0, else auto (convert override from monthly to annual, then to current currency)
  const maintenance = STATE.opxMaint > 0 ? fromCur(STATE.opxMaint * 12, STATE.currency) : maintAuto;
  const electricity = STATE.opxElec > 0 ? fromCur(STATE.opxElec * 12, STATE.currency) : elecAuto;
  const water = STATE.opxWater > 0 ? fromCur(STATE.opxWater * 12, STATE.currency) : waterAuto;
  const internet = STATE.opxNet > 0 ? fromCur(STATE.opxNet * 12, STATE.currency) : internetAuto;
  const insurance = STATE.opxIns > 0 ? fromCur(STATE.opxIns * 12, STATE.currency) : insAuto;
  const reserve = STATE.opxRes > 0 ? fromCur(STATE.opxRes * 12, STATE.currency) : reserveAuto;
  const gov = STATE.opxGov > 0 ? fromCur(STATE.opxGov * 12, STATE.currency) : govAuto;
  
  // HOA
  const hoa = fromCur(STATE.hoaMonthly * 12, STATE.currency);
  
  return { maintenance, electricity, water, internet, insurance, reserve, gov, hoa };
}

function getCleaningCost(totalNights) {
  const stays = totalNights / STATE.avgLOS;
  const perStayUSD = STATE.propType === 'Villa' ? 150 : 85;
  const perStay = STATE.opxClean > 0 ? fromCur(STATE.opxClean, STATE.currency) : perStayUSD;
  return perStay * stays;
}

function computeRevenue(occPct) {
  // Normalize weeks
  const wh = STATE.wHigh, wm = STATE.wMid, wl = STATE.wLow, whol = STATE.wHoliday;
  
  const nightsHigh = wh * 7 * occPct / 100;
  const nightsMid = wm * 7 * occPct / 100;
  const nightsLow = wl * 7 * occPct / 100;
  
  // Holiday is subset of high
  const nightsHoliday = Math.min(whol * 7 * occPct / 100, nightsHigh);
  const nightsRegularHigh = nightsHigh - nightsHoliday;
  
  const rh = STATE.rateHigh, rm = STATE.rateMid, rl = STATE.rateLow;
  const holidayRate = rh * (1 + STATE.holidayPrem / 100);
  
  const revHigh = nightsRegularHigh * rh;
  const revHoliday = nightsHoliday * holidayRate;
  const revMid = nightsMid * rm;
  const revLow = nightsLow * rl;
  
  const totalRev = revHigh + revHoliday + revMid + revLow;
  const totalNights = nightsHigh + nightsMid + nightsLow;
  
  return {
    totalRev, totalNights,
    high: { nights: nightsRegularHigh, rev: revHigh },
    holiday: { nights: nightsHoliday, rev: revHoliday },
    mid: { nights: nightsMid, rev: revMid },
    low: { nights: nightsLow, rev: revLow }
  };
}

function computeKPIs(occPct) {
  const rev = computeRevenue(occPct);
  const totalRev = rev.totalRev;
  const netAfterOTA = totalRev * (1 - STATE.otaPct / 100);
  const mgmtFee = netAfterOTA * (STATE.mgmtPct / 100);
  const ownerGross = netAfterOTA - mgmtFee;
  
  const opex = getOPEX();
  const cleaning = getCleaningCost(rev.totalNights);
  const mort = computeMortgage();
  const mortgageAnnual = mort.pmt * 12; // Convert monthly payment to annual
  
  const totalOPEX = opex.maintenance + cleaning + opex.electricity + opex.water + 
                    opex.internet + opex.insurance + opex.reserve + opex.gov + opex.hoa + mortgageAnnual;
  
  const ownerNet = ownerGross - totalOPEX;
  
  const investment = STATE.totalInv ? fromCur(STATE.totalInv, STATE.currency) : fromCur(STATE.price, STATE.currency);
  const capRate = (ownerNet / investment) * 100;
  
  const adr = rev.totalNights > 0 ? netAfterOTA / rev.totalNights : 0;
  const totalPossibleNights = 365;
  const revpar = netAfterOTA / totalPossibleNights;
  
  return {
    totalRev, netAfterOTA, mgmtFee, ownerGross, totalOPEX, ownerNet, capRate, adr, revpar,
    opex: { ...opex, cleaning, mortgage: mortgageAnnual }, rev
  };
}

function findBreakeven() {
  let low = 0, high = 100;
  for (let i = 0; i < 50; i++) {
    const mid = (low + high) / 2;
    const kpi = computeKPIs(mid);
    if (Math.abs(kpi.ownerNet) < 50) return mid;
    if (kpi.ownerNet < 0) low = mid;
    else high = mid;
  }
  return (low + high) / 2;
}

function computeMortgage() {
  const price = STATE.price;
  const isBank = STATE.financingMode === 'BANK';
  
  const downAmt = isBank ? price * STATE.downPct / 100 : price;
  const loanAmt = isBank ? price * STATE.ltvPct / 100 : 0;
  
  // Transfer tax (in currency, apply to AWG equivalent)
  const priceAWG = STATE.currency === 'AWG' ? price : price * AWG_PER_USD;
  const first250k = Math.min(priceAWG, 250000);
  const above250k = Math.max(0, priceAWG - 250000);
  const taxAWG = first250k * 0.03 + above250k * 0.06;
  const tax = STATE.currency === 'AWG' ? taxAWG : taxAWG / AWG_PER_USD;
  
  const notary = price * 0.01;
  const bankFee = isBank ? loanAmt * 0.01 : 0;
  const mortNotary = isBank ? price * 0.01 : 0;
  
  const totalClosing = downAmt + tax + notary + bankFee + mortNotary;
  const allInCost = price + tax + notary + bankFee + mortNotary;
  
  // P&I
  let pmt = 0;
  if (isBank && loanAmt > 0) {
    const r = STATE.ratePct / 12 / 100;
    const n = STATE.termYears * 12;
    if (r > 0) {
      pmt = loanAmt * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    } else {
      pmt = loanAmt / n;
    }
  }
  
  return { price, downAmt, loanAmt, tax, notary, bankFee, mortNotary, totalClosing, allInCost, pmt };
}

// ===== RENDERING =====
/**
 * Updates the property summary panel for print output
 */
function updatePropertySummary() {
  // Update property name
  DOM.printPropertyName.textContent = STATE.propertyName || '—';
  
  // Update address
  DOM.printPropertyAddress.textContent = STATE.propertyAddress || '—';
  
  // Update property type
  DOM.printPropertyType.textContent = STATE.propType || '—';
  
  // Update bedrooms
  DOM.printBedrooms.textContent = STATE.beds;
  
  // Update bathrooms
  DOM.printBathrooms.textContent = STATE.baths;
  
  // Update extra spaces
  const extraSpaces = [];
  if (STATE.studios > 0) {
    extraSpaces.push(`${STATE.studios} Studio${STATE.studios > 1 ? 's' : ''}`);
  }
  if (STATE.apartments > 0) {
    extraSpaces.push(`${STATE.apartments} Apartment${STATE.apartments > 1 ? 's' : ''}`);
  }
  
  if (extraSpaces.length > 0) {
    DOM.printExtraSpaces.textContent = extraSpaces.join(', ');
    DOM.printExtraSpacesItem.style.display = '';
  } else {
    DOM.printExtraSpaces.textContent = 'None';
    DOM.printExtraSpacesItem.style.display = 'none';
  }
}

function calculate() {
  const kpi = computeKPIs(STATE.baseOcc);
  const mort = computeMortgage();
  const breakeven = findBreakeven();
  
  // HERO
  document.getElementById('heroRev').textContent = fmt.money(toCur(kpi.totalRev, STATE.currency), STATE.currency);
  document.getElementById('heroNet').textContent = fmt.money(toCur(kpi.ownerNet, STATE.currency), STATE.currency);
  document.getElementById('heroCap').textContent = fmt.pct(kpi.capRate);
  document.getElementById('heroBreak').textContent = fmt.pct(breakeven);
  
  // MORTGAGE
  document.getElementById('mOutPrice').textContent = fmt.money(mort.price, STATE.currency);
  document.getElementById('mOutDown').textContent = fmt.money(mort.downAmt, STATE.currency);
  document.getElementById('mOutLoan').textContent = fmt.money(mort.loanAmt, STATE.currency);
  document.getElementById('mOutTax').textContent = fmt.money(mort.tax, STATE.currency);
  document.getElementById('mOutNotary').textContent = fmt.money(mort.notary, STATE.currency);
  document.getElementById('mOutBankFee').textContent = fmt.money(mort.bankFee, STATE.currency);
  document.getElementById('mOutMortNotary').textContent = fmt.money(mort.mortNotary, STATE.currency);
  document.getElementById('mOutTotal').textContent = fmt.money(mort.totalClosing, STATE.currency);
  document.getElementById('mOutPmt').textContent = fmt.money(mort.pmt, STATE.currency);
  document.getElementById('mOutAllIn').textContent = fmt.money(mort.allInCost, STATE.currency);
  
  const otherCur = STATE.currency === 'USD' ? 'AWG' : 'USD';
  const convPrice = toCur(fromCur(mort.price, STATE.currency), otherCur);
  document.getElementById('mConversion').textContent = 
    `Conversion: ${fmt.money(mort.price, STATE.currency)} = ${fmt.money(convPrice, otherCur)} (1 USD = ${AWG_PER_USD} AWG)`;
  
  // KPIS
  document.getElementById('kpiTotalRev').textContent = fmt.money(toCur(kpi.totalRev, STATE.currency), STATE.currency);
  document.getElementById('kpiNetOTA').textContent = fmt.money(toCur(kpi.netAfterOTA, STATE.currency), STATE.currency);
  document.getElementById('kpiOwnerGross').textContent = fmt.money(toCur(kpi.ownerGross, STATE.currency), STATE.currency);
  document.getElementById('kpiTotalOPEX').textContent = fmt.money(toCur(kpi.totalOPEX, STATE.currency), STATE.currency);
  document.getElementById('kpiOwnerNet').textContent = fmt.money(toCur(kpi.ownerNet, STATE.currency), STATE.currency);
  document.getElementById('kpiCapRate').textContent = fmt.pct(kpi.capRate);
  document.getElementById('kpiADR').textContent = fmt.money(toCur(kpi.adr, STATE.currency), STATE.currency);
  document.getElementById('kpiRevPAR').textContent = fmt.money(toCur(kpi.revpar, STATE.currency), STATE.currency);
  
  document.getElementById('breakeven').textContent = fmt.pct(breakeven);
  document.getElementById('breakevenBar').style.width = breakeven + '%';
  document.getElementById('breakevenBar').textContent = fmt.pct(breakeven);
  
  // REVENUE BREAKDOWN
  document.getElementById('occBadge').textContent = fmt.pct(STATE.baseOcc, 1) + ' Occupancy';
  renderRevenueChart(kpi.rev);
  renderRevenueTable(kpi.rev);
  
  // OPEX DISTRIBUTION
  renderOPEXChart(kpi.opex);
  
  // WATERFALL
  renderWaterfallChart(kpi);
  renderWaterfallTable(kpi);
  
  // SCENARIO ANALYSIS
  renderScenarioTable();
  
  // SENSITIVITY
  renderSensitivityChart();
  
  // DETAILED OPEX
  renderOPEXDetailTable(kpi.opex, kpi.totalOPEX);
  
  // 10-YEAR PROJECTION
  render10YearProjection();
  
  // PROPERTY SUMMARY (for print)
  updatePropertySummary();
}

function renderRevenueChart(rev) {
  const data = [
    { label: 'High', value: rev.high.rev + rev.holiday.rev },
    { label: 'Mid', value: rev.mid.rev },
    { label: 'Low', value: rev.low.rev }
  ];
  const max = Math.max(...data.map(d => d.value));
  const width = 600, height = 300, pad = 60;
  const barWidth = (width - 2 * pad) / data.length - 20;
  
  let svg = `<svg width="100%" height="${height}" viewBox="0 0 ${width} ${height}">`;
  data.forEach((d, i) => {
    const x = pad + i * ((width - 2 * pad) / data.length);
    const h = max > 0 ? (d.value / max) * (height - 2 * pad) : 0;
    const y = height - pad - h;
    svg += `<rect x="${x}" y="${y}" width="${barWidth}" height="${h}" fill="#1fb6ff" rx="4"/>`;
    svg += `<text x="${x + barWidth/2}" y="${y - 5}" fill="#e9eefb" font-size="12" text-anchor="middle">${fmt.money(toCur(d.value, STATE.currency), STATE.currency)}</text>`;
    svg += `<text x="${x + barWidth/2}" y="${height - pad + 20}" fill="#8b96b8" font-size="14" text-anchor="middle">${d.label}</text>`;
  });
  svg += `</svg>`;
  document.getElementById('revenueChart').innerHTML = svg;
}

function renderRevenueTable(rev) {
  const rows = [
    ['High', rev.high.nights + rev.holiday.nights, rev.high.rev + rev.holiday.rev],
    ['Mid', rev.mid.nights, rev.mid.rev],
    ['Low', rev.low.nights, rev.low.rev],
    ['TOTAL', rev.totalNights, rev.totalRev]
  ];
  let html = '';
  rows.forEach((r, i) => {
    const cls = i === rows.length - 1 ? 'bold' : '';
    html += `<tr class="${cls}"><td>${r[0]}</td><td class="text-right">${fmt.num(r[1])}</td><td class="text-right">${fmt.money(toCur(r[2], STATE.currency), STATE.currency)}</td></tr>`;
  });
  document.getElementById('revenueTableBody').innerHTML = html;
}

function renderOPEXChart(opex) {
  const data = [
    { label: 'Maintenance', value: opex.maintenance },
    { label: 'Cleaning', value: opex.cleaning },
    { label: 'Electricity', value: opex.electricity },
    { label: 'Water', value: opex.water },
    { label: 'Internet', value: opex.internet },
    { label: 'Insurance', value: opex.insurance },
    { label: 'HOA', value: opex.hoa },
    { label: 'Reserve', value: opex.reserve },
    { label: 'Gov', value: opex.gov },
    { label: 'Mortgage', value: opex.mortgage || 0 }
  ];
  const total = data.reduce((s, d) => s + d.value, 0);
  
  const colors = ['#1fb6ff','#12d0b4','#31d158','#ffc107','#ff5a5f','#9b59b6','#3498db','#e67e22','#95a5a6','#e74c3c'];
  
  let svg = `<svg width="100%" height="400" viewBox="0 0 700 400">`;
  let startAngle = 0;
  const cx = 200, cy = 200, r = 120;
  
  data.forEach((d, i) => {
    const pct = total > 0 ? d.value / total : 0;
    const angle = pct * 2 * Math.PI;
    const endAngle = startAngle + angle;
    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);
    const large = angle > Math.PI ? 1 : 0;
    
    svg += `<path d="M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z" fill="${colors[i % colors.length]}" stroke="#0a0e1a" stroke-width="2"/>`;
    startAngle = endAngle;
  });
  
  // Legend
  let ly = 20;
  data.forEach((d, i) => {
    svg += `<rect x="450" y="${ly}" width="20" height="20" fill="${colors[i % colors.length]}"/>`;
    svg += `<text x="480" y="${ly + 15}" fill="#e9eefb" font-size="14">${d.label}: ${fmt.pct(total > 0 ? d.value / total * 100 : 0, 1)}</text>`;
    ly += 30;
  });
  
  svg += `</svg>`;
  document.getElementById('opexChart').innerHTML = svg;
}

function renderWaterfallChart(kpi) {
  const steps = [
    { label: 'Room Rev', value: kpi.totalRev, isPositive: true },
    { label: 'OTA Fees', value: kpi.totalRev - kpi.netAfterOTA, isPositive: false },
    { label: 'Mgmt Fee', value: kpi.mgmtFee, isPositive: false },
    { label: 'OPEX', value: kpi.totalOPEX, isPositive: false },
    { label: 'Owner Net', value: kpi.ownerNet, isPositive: true }
  ];
  
  let running = 0;
  const width = 700, height = 400, pad = 60;
  const barWidth = (width - 2 * pad) / steps.length - 20;
  const max = kpi.totalRev * 1.1;
  
  let svg = `<svg width="100%" height="${height}" viewBox="0 0 ${width} ${height}">`;
  
  steps.forEach((s, i) => {
    const x = pad + i * ((width - 2 * pad) / steps.length);
    let y1, y2;
    if (s.isPositive) {
      y1 = height - pad - (running / max) * (height - 2 * pad);
      running += s.value;
      y2 = height - pad - (running / max) * (height - 2 * pad);
    } else {
      y1 = height - pad - (running / max) * (height - 2 * pad);
      running -= s.value;
      y2 = height - pad - (running / max) * (height - 2 * pad);
    }
    const h = Math.abs(y2 - y1);
    const fill = s.isPositive ? '#31d158' : '#ff5a5f';
    svg += `<rect x="${x}" y="${Math.min(y1, y2)}" width="${barWidth}" height="${h}" fill="${fill}" rx="4"/>`;
    svg += `<text x="${x + barWidth/2}" y="${Math.min(y1, y2) - 5}" fill="#e9eefb" font-size="11" text-anchor="middle">${fmt.money(toCur(s.value, STATE.currency), STATE.currency)}</text>`;
    svg += `<text x="${x + barWidth/2}" y="${height - pad + 20}" fill="#8b96b8" font-size="12" text-anchor="middle">${s.label}</text>`;
  });
  
  svg += `</svg>`;
  document.getElementById('waterfallChart').innerHTML = svg;
}

function renderWaterfallTable(kpi) {
  const rows = [
    ['Room Revenue', kpi.totalRev],
    ['OTA Fees', -(kpi.totalRev - kpi.netAfterOTA)],
    ['Net After OTA', kpi.netAfterOTA],
    ['Management Fee (20%)', -kpi.mgmtFee],
    ['Owner Gross (Pre-OPEX)', kpi.ownerGross],
    ['Total OPEX', -kpi.totalOPEX],
    ['Owner Net Income', kpi.ownerNet]
  ];
  let html = '';
  rows.forEach((r, i) => {
    const cls = i === rows.length - 1 ? 'bold' : '';
    html += `<tr class="${cls}"><td>${r[0]}</td><td class="text-right">${fmt.money(toCur(r[1], STATE.currency), STATE.currency)}</td></tr>`;
  });
  document.getElementById('waterfallTableBody').innerHTML = html;
}

function renderScenarioTable() {
  let html = '';
  for (let occ = 30; occ <= 85; occ += 5) {
    const kpi = computeKPIs(occ);
    const investment = STATE.totalInv ? fromCur(STATE.totalInv, STATE.currency) : fromCur(STATE.price, STATE.currency);
    const roi = (kpi.ownerNet / investment) * 100;
    const highlight = Math.abs(occ - STATE.baseOcc) <= 2.5 ? 'highlight-row' : '';
    html += `<tr class="${highlight}">
      <td>${occ}%</td>
      <td class="text-right">${fmt.money(toCur(kpi.totalRev, STATE.currency), STATE.currency)}</td>
      <td class="text-right">${fmt.money(toCur(kpi.netAfterOTA, STATE.currency), STATE.currency)}</td>
      <td class="text-right">${fmt.money(toCur(kpi.ownerGross, STATE.currency), STATE.currency)}</td>
      <td class="text-right">${fmt.money(toCur(kpi.totalOPEX, STATE.currency), STATE.currency)}</td>
      <td class="text-right">${fmt.money(toCur(kpi.ownerNet, STATE.currency), STATE.currency)}</td>
      <td class="text-right">${fmt.pct(roi)}</td>
      <td class="text-right">${fmt.pct(kpi.capRate)}</td>
    </tr>`;
  }
  document.getElementById('scenarioTableBody').innerHTML = html;
}

function renderSensitivityChart() {
  const base = computeKPIs(STATE.baseOcc);
  const baseNet = base.ownerNet;
  
  // Variables to test
  const vars = [
    {
      name: 'Occupancy',
      down: () => {
        const oldOcc = STATE.baseOcc;
        STATE.baseOcc *= 0.8;
        const kpi = computeKPIs(STATE.baseOcc);
        STATE.baseOcc = oldOcc;
        return kpi.ownerNet;
      },
      up: () => {
        const oldOcc = STATE.baseOcc;
        STATE.baseOcc *= 1.2;
        const kpi = computeKPIs(STATE.baseOcc);
        STATE.baseOcc = oldOcc;
        return kpi.ownerNet;
      }
    },
    {
      name: 'High Season Rate',
      down: () => {
        const old = STATE.rateHigh;
        STATE.rateHigh *= 0.8;
        const kpi = computeKPIs(STATE.baseOcc);
        STATE.rateHigh = old;
        return kpi.ownerNet;
      },
      up: () => {
        const old = STATE.rateHigh;
        STATE.rateHigh *= 1.2;
        const kpi = computeKPIs(STATE.baseOcc);
        STATE.rateHigh = old;
        return kpi.ownerNet;
      }
    },
    {
      name: 'OTA Fee',
      down: () => {
        const old = STATE.otaPct;
        STATE.otaPct *= 0.8;
        const kpi = computeKPIs(STATE.baseOcc);
        STATE.otaPct = old;
        return kpi.ownerNet;
      },
      up: () => {
        const old = STATE.otaPct;
        STATE.otaPct *= 1.2;
        const kpi = computeKPIs(STATE.baseOcc);
        STATE.otaPct = old;
        return kpi.ownerNet;
      }
    },
    {
      name: 'HOA',
      down: () => {
        const old = STATE.hoaMonthly;
        STATE.hoaMonthly *= 0.8;
        const kpi = computeKPIs(STATE.baseOcc);
        STATE.hoaMonthly = old;
        return kpi.ownerNet;
      },
      up: () => {
        const old = STATE.hoaMonthly;
        STATE.hoaMonthly *= 1.2;
        const kpi = computeKPIs(STATE.baseOcc);
        STATE.hoaMonthly = old;
        return kpi.ownerNet;
      }
    }
  ];
  
  const impacts = vars.map(v => {
    const downNet = v.down();
    const upNet = v.up();
    const downImpact = downNet - baseNet;
    const upImpact = upNet - baseNet;
    return { name: v.name, downImpact, upImpact, absImpact: Math.abs(downImpact) + Math.abs(upImpact) };
  });
  
  impacts.sort((a, b) => b.absImpact - a.absImpact);
  
  const width = 700, height = 400, pad = 100;
  const barHeight = (height - 2 * pad) / impacts.length;
  const maxImpact = Math.max(...impacts.map(i => Math.max(Math.abs(i.downImpact), Math.abs(i.upImpact))));
  const scale = (width - 2 * pad) / 2 / maxImpact;
  const centerX = width / 2;
  
  let svg = `<svg width="100%" height="${height}" viewBox="0 0 ${width} ${height}">`;
  svg += `<line x1="${centerX}" y1="${pad}" x2="${centerX}" y2="${height - pad}" stroke="#8b96b8" stroke-width="2"/>`;
  
  impacts.forEach((imp, i) => {
    const y = pad + i * barHeight + barHeight / 2;
    const downX = centerX + imp.downImpact * scale;
    const upX = centerX + imp.upImpact * scale;
    
    svg += `<rect x="${Math.min(centerX, downX)}" y="${y - 15}" width="${Math.abs(downX - centerX)}" height="30" fill="#ff5a5f" rx="4"/>`;
    svg += `<rect x="${centerX}" y="${y - 15}" width="${Math.abs(upX - centerX)}" height="30" fill="#31d158" rx="4"/>`;
    
    svg += `<text x="${pad - 10}" y="${y + 5}" fill="#e9eefb" font-size="13" text-anchor="end">${imp.name}</text>`;
    svg += `<text x="${downX - 5}" y="${y + 5}" fill="#fff" font-size="11" text-anchor="end">${fmt.money(toCur(imp.downImpact, STATE.currency), STATE.currency)}</text>`;
    svg += `<text x="${upX + 5}" y="${y + 5}" fill="#fff" font-size="11" text-anchor="start">${fmt.money(toCur(imp.upImpact, STATE.currency), STATE.currency)}</text>`;
  });
  
  svg += `</svg>`;
  document.getElementById('sensitivityChart').innerHTML = svg;
}

function renderOPEXDetailTable(opex, total) {
  const rows = [
    ['Maintenance', opex.maintenance],
    ['Cleaning/Turnover', opex.cleaning],
    ['Electricity', opex.electricity],
    ['Water', opex.water],
    ['Internet/Cable', opex.internet],
    ['Insurance', opex.insurance],
    ['HOA', opex.hoa],
    ['Repairs Reserve', opex.reserve],
    ['Gov Taxes/Permits', opex.gov],
    ['Mortgage Payment (P&I)', opex.mortgage || 0]
  ];
  
  let html = '';
  rows.forEach(r => {
    const annual = r[1];
    const monthly = annual / 12;
    const pct = total > 0 ? (annual / total) * 100 : 0;
    html += `<tr>
      <td>${r[0]}</td>
      <td class="text-right">${fmt.money(toCur(monthly, STATE.currency), STATE.currency)}</td>
      <td class="text-right">${fmt.money(toCur(annual, STATE.currency), STATE.currency)}</td>
      <td class="text-right">${fmt.pct(pct)}</td>
    </tr>`;
  });
  document.getElementById('opexDetailTableBody').innerHTML = html;
  document.getElementById('opexTotalMonthly').textContent = fmt.money(toCur(total / 12, STATE.currency), STATE.currency);
  document.getElementById('opexTotalAnnual').textContent = fmt.money(toCur(total, STATE.currency), STATE.currency);
}

function render10YearProjection() {
  const apprPct = parseFloat(document.getElementById('appreciation').value) || 3;
  const apprRate = apprPct / 100;
  const opexInflation = 0.025;
  const fixedOcc = 60;
  
  const priceUSD = fromCur(STATE.price, STATE.currency);
  const baseKPI = computeKPIs(fixedOcc);
  
  let propValue = priceUSD;
  let cumulativeNet = 0;
  const years = [];
  
  for (let y = 1; y <= 10; y++) {
    propValue *= (1 + apprRate);
    const rateMultiplier = Math.pow(1 + apprRate, y);
    
    // Adjust rates
    const oldHigh = STATE.rateHigh;
    const oldMid = STATE.rateMid;
    const oldLow = STATE.rateLow;
    STATE.rateHigh = fromCur(STATE.rateHigh, STATE.currency) * rateMultiplier;
    STATE.rateMid = fromCur(STATE.rateMid, STATE.currency) * rateMultiplier;
    STATE.rateLow = fromCur(STATE.rateLow, STATE.currency) * rateMultiplier;
    
    const kpi = computeKPIs(fixedOcc);
    
    // Inflate OPEX
    const opexMult = Math.pow(1 + opexInflation, y);
    const adjustedOPEX = baseKPI.totalOPEX * opexMult;
    const adjustedNet = kpi.ownerGross - adjustedOPEX;
    
    cumulativeNet += adjustedNet;
    
    const avgRate = (STATE.rateHigh + STATE.rateMid + STATE.rateLow) / 3;
    
    years.push({
      year: y,
      propValue,
      avgRate,
      grossRev: kpi.totalRev,
      netAfterOTA: kpi.netAfterOTA,
      mgmtFee: kpi.mgmtFee,
      ownerGross: kpi.ownerGross,
      opex: adjustedOPEX,
      ownerNet: adjustedNet,
      cumulative: cumulativeNet
    });
    
    // Restore rates
    STATE.rateHigh = oldHigh;
    STATE.rateMid = oldMid;
    STATE.rateLow = oldLow;
  }
  
  const totalNet = cumulativeNet;
  const finalValue = years[9].propValue;
  const investment = STATE.totalInv ? fromCur(STATE.totalInv, STATE.currency) : priceUSD;
  const totalAppreciation = finalValue - priceUSD;
  const totalROI = ((totalNet + totalAppreciation) / investment) * 100;
  
  document.getElementById('summary10Net').textContent = fmt.money(toCur(totalNet, STATE.currency), STATE.currency);
  document.getElementById('summary10Value').textContent = fmt.money(toCur(finalValue, STATE.currency), STATE.currency);
  document.getElementById('summary10ROI').textContent = fmt.pct(totalROI);
  
  // Table - TRANSPOSED (years as columns, metrics as rows)
  const metrics = [
    { label: 'Property Value', key: 'propValue' },
    { label: 'Avg Nightly Rate', key: 'avgRate' },
    { label: 'Gross Revenue', key: 'grossRev' },
    { label: 'Net After OTA', key: 'netAfterOTA' },
    { label: 'Mgmt Fee', key: 'mgmtFee' },
    { label: 'Owner Gross', key: 'ownerGross' },
    { label: 'OPEX', key: 'opex' },
    { label: 'Owner Net', key: 'ownerNet', highlight: true },
    { label: 'Cumulative', key: 'cumulative' }
  ];
  
  let headHtml = '<tr><th>Metric</th>';
  for (let y = 1; y <= 10; y++) {
    headHtml += `<th class="text-right">Y${y}</th>`;
  }
  headHtml += '<th class="text-right">10Y Total</th></tr>';
  document.getElementById('yearTableHead').innerHTML = headHtml;
  
  let bodyHtml = '';
  metrics.forEach(metric => {
    const cls = metric.highlight ? 'bold' : '';
    bodyHtml += `<tr class="${cls}"><td>${metric.label}</td>`;
    years.forEach(yr => {
      bodyHtml += `<td class="text-right">${fmt.money(toCur(yr[metric.key], STATE.currency), STATE.currency)}</td>`;
    });
    
    // 10Y Total column
    if (metric.key === 'ownerNet') {
      bodyHtml += `<td class="text-right bold">${fmt.money(toCur(totalNet, STATE.currency), STATE.currency)}</td>`;
    } else {
      bodyHtml += `<td class="text-right">-</td>`;
    }
    
    bodyHtml += '</tr>';
  });
  
  document.getElementById('yearTableBody').innerHTML = bodyHtml;
  
  // Chart
  const width = 700, height = 300, pad = 60;
  const maxNet = Math.max(...years.map(y => y.ownerNet));
  const minNet = Math.min(...years.map(y => y.ownerNet), 0);
  const range = maxNet - minNet;
  const barWidth = (width - 2 * pad) / years.length - 10;
  
  let svg = `<svg width="100%" height="${height}" viewBox="0 0 ${width} ${height}">`;
  years.forEach((yr, i) => {
    const x = pad + i * ((width - 2 * pad) / years.length);
    const h = range > 0 ? (yr.ownerNet - minNet) / range * (height - 2 * pad) : 0;
    const y = height - pad - h;
    svg += `<rect x="${x}" y="${y}" width="${barWidth}" height="${h}" fill="#1fb6ff" rx="4"/>`;
    svg += `<text x="${x + barWidth/2}" y="${height - pad + 20}" fill="#8b96b8" font-size="12" text-anchor="middle">Y${yr.year}</text>`;
  });
  svg += `</svg>`;
  document.getElementById('yearChart').innerHTML = svg;
}

// ===== INITIALIZATION =====

/**
 * Initialize the application
 * Cache DOM elements, bind events, and perform initial calculation
 */
document.addEventListener('DOMContentLoaded', () => {
  cacheDOMElements();
  bindInputs();
  syncInputsToState();
  syncBrandingToPrint();
  calculate();
});
