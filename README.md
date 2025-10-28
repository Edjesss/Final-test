<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Blue Aruba — Professional ROI Calculator</title>
<style>
:root {
  --bg: #0a0e1a;
  --panel: #0d1128;
  --card: #0f1530;
  --ink: #e9eefb;
  --muted: #8b96b8;
  --accent: #1fb6ff;
  --accent2: #12d0b4;
  --danger: #ff5a5f;
  --ok: #31d158;
  --warn: #ffc107;
  --shadow: 0 8px 32px rgba(0,0,0,.4);
  --glow: 0 0 20px rgba(31,182,255,.15);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: var(--bg);
  color: var(--ink);
  line-height: 1.6;
  padding: 2rem;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
}

h1, h2, h3 {
  font-weight: 600;
  margin-bottom: 1rem;
}

h1 { font-size: 2rem; }
h2 { font-size: 1.5rem; color: var(--accent); }
h3 { font-size: 1.25rem; }

.card {
  background: var(--card);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: var(--shadow);
}

.hero {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.hero-stat {
  background: linear-gradient(135deg, var(--panel), var(--card));
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: var(--glow);
  text-align: center;
}

.hero-stat .label {
  font-size: 0.875rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.hero-stat .value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--accent);
  margin-top: 0.5rem;
  font-variant-numeric: tabular-nums;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-size: 0.875rem;
  color: var(--muted);
  font-weight: 500;
}

input, select, button {
  background: var(--panel);
  border: 1px solid rgba(139,150,184,.2);
  color: var(--ink);
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.2s;
}

input:focus, select:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(31,182,255,.1);
}

input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

button {
  cursor: pointer;
  font-weight: 600;
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  border: none;
  padding: 0.875rem 1.5rem;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(31,182,255,.3);
}

button:active {
  transform: translateY(0);
}

.btn-secondary {
  background: var(--panel);
  border: 1px solid rgba(139,150,184,.3);
}

.btn-danger {
  background: var(--danger);
}

.actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-variant-numeric: tabular-nums;
}

th, td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid rgba(139,150,184,.1);
}

th {
  font-weight: 600;
  color: var(--accent2);
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

td {
  color: var(--ink);
}

tr:hover {
  background: rgba(31,182,255,.05);
}

.text-right {
  text-align: right;
}

.text-center {
  text-align: center;
}

.badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 600;
  background: var(--accent);
  color: var(--bg);
}

.badge-success {
  background: var(--ok);
}

.badge-warning {
  background: var(--warn);
}

.badge-danger {
  background: var(--danger);
}

.highlight-row {
  background: rgba(31,182,255,.15) !important;
}

.bold {
  font-weight: 700;
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.kpi-card {
  background: var(--panel);
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid var(--accent);
}

.kpi-label {
  font-size: 0.75rem;
  color: var(--muted);
  text-transform: uppercase;
}

.kpi-value {
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 0.25rem;
}

.chart-container {
  margin: 1.5rem 0;
}

.logo-preview {
  max-width: 200px;
  max-height: 100px;
  margin-top: 0.5rem;
  display: none;
}

.logo-preview.active {
  display: block;
}

.currency-toggle {
  display: inline-flex;
  background: var(--panel);
  border-radius: 8px;
  padding: 0.25rem;
}

.currency-toggle button {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  background: transparent;
  border: none;
  color: var(--muted);
  font-size: 0.875rem;
}

.currency-toggle button.active {
  background: var(--accent);
  color: var(--bg);
}

.progress-bar {
  height: 24px;
  background: var(--panel);
  border-radius: 12px;
  overflow: hidden;
  position: relative;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent), var(--accent2));
  transition: width 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--bg);
  font-size: 0.75rem;
  font-weight: 700;
}

/* Print header - hidden on screen */
#printHeader {
  display: none;
}

@media print {
  @page {
    size: A4 portrait;
    margin: 15mm;
  }

  body {
    background: white;
    color: #000;
    padding: 0;
    margin-top: 46mm;
  }

  #printHeader {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 2rem;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 42mm;
    background: linear-gradient(135deg, #f8f9fa, #e9ecef);
    padding: 6mm 8mm;
    border-bottom: 0.5pt solid rgba(0,0,0,.15);
    z-index: 999;
  }

  .print-left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .print-right {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .realtor-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    font-size: 10pt;
  }

  #printBlueLogo, #printRealtorLogo {
    max-height: 30mm;
    max-width: 150px;
  }

  .hero, .form-group, button, input, select, label {
    display: none !important;
  }

  .card {
    background: white;
    box-shadow: none;
    border: 0.5pt solid #ddd;
    page-break-inside: avoid;
    margin-bottom: 1rem;
    padding: 1rem;
  }

  h2 {
    color: #1fb6ff;
    font-size: 14pt;
  }

  table {
    font-size: 9pt;
  }

  th {
    background: #f8f9fa;
    color: #000;
  }

  tr:hover {
    background: transparent;
  }

  .badge {
    border: 1pt solid #1fb6ff;
  }
}

@media screen {
  .screen-only {
    display: block;
  }
}
</style>
</head>
<body>

<!-- PRINT HEADER (print only) -->
<div id="printHeader">
  <div class="print-left">
    <img id="printBlueLogo" src="" alt="Blue Aruba Rentals" style="display:none;">
    <span id="printBlueLogoText" style="font-size:18pt;font-weight:700;color:#1fb6ff;">Blue Aruba Rentals</span>
    <span id="printBlueWebsite" style="font-size:10pt;color:#666;"></span>
  </div>
  <div class="print-right">
    <img id="printRealtorLogo" src="" alt="" style="display:none;">
    <div class="realtor-info">
      <div id="printRealtorName" style="font-weight:700;"></div>
      <div id="printRealtorCompany" style="font-size:9pt;color:#666;"></div>
      <div id="printRealtorLicense" style="font-size:9pt;color:#666;"></div>
      <div id="printRealtorContact" style="font-size:9pt;color:#666;"></div>
    </div>
  </div>
</div>

<div class="container">

<!-- HERO (screen only) -->
<div class="hero screen-only">
  <div class="hero-stat">
    <div class="label">Est. Annual Revenue</div>
    <div class="value" id="heroRev">$0</div>
  </div>
  <div class="hero-stat">
    <div class="label">Net Owner Income</div>
    <div class="value" id="heroNet">$0</div>
  </div>
  <div class="hero-stat">
    <div class="label">Cap Rate</div>
    <div class="value" id="heroCap">0%</div>
  </div>
  <div class="hero-stat">
    <div class="label">Breakeven Occupancy</div>
    <div class="value" id="heroBreak">0%</div>
  </div>
</div>

<!-- PROPERTY DETAILS (screen only) -->
<div class="card screen-only">
  <h2>Property Details & Configuration</h2>
  
  <h3 style="margin-top:1.5rem;">Branding & Contact</h3>
  <div class="form-grid">
    <div class="form-group">
      <label>Blue Aruba Logo</label>
      <input type="file" id="blueLogoFile" accept="image/*">
      <img id="blueLogoPreview" class="logo-preview">
      <button id="btnClearBlueLogo" class="btn-secondary" style="margin-top:0.5rem;">Clear Logo</button>
    </div>
    <div class="form-group">
      <label>Realtor Logo</label>
      <input type="file" id="realtorLogoFile" accept="image/*">
      <img id="realtorLogoPreview" class="logo-preview">
      <button id="btnClearRealtorLogo" class="btn-secondary" style="margin-top:0.5rem;">Clear Logo</button>
    </div>
    <div class="form-group">
      <label>Website</label>
      <input type="text" id="blueWebsite" value="www.bluearuba.com">
    </div>
  </div>
  
  <div class="form-grid" style="margin-top:1rem;">
    <div class="form-group">
      <label>Realtor Name</label>
      <input type="text" id="realtorName" placeholder="Jane Doe">
    </div>
    <div class="form-group">
      <label>Company</label>
      <input type="text" id="realtorCompany" placeholder="Aruba Realty Group">
    </div>
    <div class="form-group">
      <label>License</label>
      <input type="text" id="realtorLicense" placeholder="License #12345">
    </div>
    <div class="form-group">
      <label>Phone</label>
      <input type="text" id="realtorPhone" placeholder="+297 123 4567">
    </div>
    <div class="form-group">
      <label>Email</label>
      <input type="email" id="realtorEmail" placeholder="jane@example.com">
    </div>
    <div class="form-group">
      <label>Realtor Website</label>
      <input type="text" id="realtorWebsite" placeholder="www.realtor.com">
    </div>
  </div>

  <h3 style="margin-top:1.5rem;">Property & Financing</h3>
  <div class="form-grid">
    <div class="form-group">
      <label>Currency</label>
      <div class="currency-toggle" id="currencyToggle">
        <button data-currency="USD" class="active">USD</button>
        <button data-currency="AWG">AWG</button>
      </div>
    </div>
    <div class="form-group">
      <label>Listing/Purchase Price</label>
      <input type="number" id="priceInput" value="650000" step="1000">
    </div>
    <div class="form-group">
      <label>Total Investment (leave blank = Price)</label>
      <input type="number" id="totalInvInput" placeholder="Leave blank to use price" step="1000">
    </div>
    <div class="form-group">
      <label>Property Type</label>
      <select id="propType">
        <option value="Condo">Condo</option>
        <option value="Villa">Villa</option>
      </select>
    </div>
    <div class="form-group">
      <label>Bedrooms</label>
      <input type="number" id="beds" value="2" min="1" max="10">
    </div>
    <div class="form-group">
      <label>Bathrooms</label>
      <input type="number" id="baths" value="2" min="1" max="10" step="0.5">
    </div>
  </div>

  <div class="form-grid" style="margin-top:1rem;">
    <div class="form-group">
      <label>Financing Mode</label>
      <select id="financingMode">
        <option value="BANK">BANK</option>
        <option value="CASH">CASH</option>
      </select>
    </div>
    <div class="form-group" id="ltvGroup">
      <label>LTV %</label>
      <input type="number" id="ltvPct" value="60" min="5" max="95" step="1">
    </div>
    <div class="form-group" id="downPctGroup">
      <label>Down Payment %</label>
      <input type="number" id="downPct" value="40" min="5" max="95" step="1">
    </div>
    <div class="form-group" id="rateGroup">
      <label>Interest Rate %</label>
      <input type="number" id="ratePct" value="8" min="0" max="20" step="0.1">
    </div>
    <div class="form-group" id="termGroup">
      <label>Term (Years)</label>
      <input type="number" id="termYears" value="30" min="1" max="40">
    </div>
  </div>

  <div class="form-grid" style="margin-top:1rem;">
    <div class="form-group">
      <label>Down Payment Amount</label>
      <input type="text" id="downAmtView" readonly style="background:var(--card);">
    </div>
    <div class="form-group">
      <label>Loan Amount</label>
      <input type="text" id="loanAmtView" readonly style="background:var(--card);">
    </div>
  </div>

  <h3 style="margin-top:1.5rem;">Occupancy & Stay</h3>
  <div class="form-grid">
    <div class="form-group">
      <label>Base Occupancy %</label>
      <input type="number" id="baseOcc" value="59.5" min="0" max="100" step="0.5">
    </div>
    <div class="form-group">
      <label>Average Length of Stay (nights)</label>
      <input type="number" id="avgLOS" value="5" min="1" max="30">
    </div>
  </div>

  <h3 style="margin-top:1.5rem;">Rates & Seasons</h3>
  <div class="form-grid">
    <div class="form-group">
      <label>High Season Nightly Rate</label>
      <input type="number" id="rateHigh" value="420" step="10">
    </div>
    <div class="form-group">
      <label>Mid Season Nightly Rate</label>
      <input type="number" id="rateMid" value="320" step="10">
    </div>
    <div class="form-group">
      <label>Low Season Nightly Rate</label>
      <input type="number" id="rateLow" value="220" step="10">
    </div>
    <div class="form-group">
      <label>Holiday Premium %</label>
      <input type="number" id="holidayPrem" value="30" min="0" max="100" step="5">
    </div>
  </div>

  <div class="form-grid" style="margin-top:1rem;">
    <div class="form-group">
      <label>High Season Weeks</label>
      <input type="number" id="wHigh" value="16" min="0" max="52">
    </div>
    <div class="form-group">
      <label>Mid Season Weeks</label>
      <input type="number" id="wMid" value="20" min="0" max="52">
    </div>
    <div class="form-group">
      <label>Low Season Weeks</label>
      <input type="number" id="wLow" value="16" min="0" max="52">
    </div>
    <div class="form-group">
      <label>Holiday Weeks (subset of High)</label>
      <input type="number" id="wHoliday" value="2" min="0" max="52">
    </div>
  </div>

  <h3 style="margin-top:1.5rem;">Fees & HOA</h3>
  <div class="form-grid">
    <div class="form-group">
      <label>OTA Fee %</label>
      <input type="number" id="otaPct" value="12" min="0" max="30" step="1">
    </div>
    <div class="form-group">
      <label>Management Fee % (fixed)</label>
      <input type="number" id="mgmtPct" value="20" disabled>
    </div>
    <div class="form-group">
      <label>HOA (Monthly)</label>
      <input type="number" id="hoaMonthly" value="420" step="10">
    </div>
  </div>

  <h3 style="margin-top:1.5rem;">OPEX Overrides (Monthly, 0 = Auto)</h3>
  <div class="form-grid">
    <div class="form-group">
      <label>Maintenance</label>
      <input type="number" id="opxMaint" value="0" min="0" step="10">
    </div>
    <div class="form-group">
      <label>Cleaning (per stay)</label>
      <input type="number" id="opxClean" value="0" min="0" step="5">
    </div>
    <div class="form-group">
      <label>Electricity</label>
      <input type="number" id="opxElec" value="0" min="0" step="10">
    </div>
    <div class="form-group">
      <label>Water</label>
      <input type="number" id="opxWater" value="0" min="0" step="5">
    </div>
    <div class="form-group">
      <label>Internet/Cable</label>
      <input type="number" id="opxNet" value="0" min="0" step="5">
    </div>
    <div class="form-group">
      <label>Insurance</label>
      <input type="number" id="opxIns" value="0" min="0" step="10">
    </div>
    <div class="form-group">
      <label>Repairs Reserve</label>
      <input type="number" id="opxRes" value="0" min="0" step="10">
    </div>
    <div class="form-group">
      <label>Gov Taxes/Permits</label>
      <input type="number" id="opxGov" value="0" min="0" step="10">
    </div>
  </div>

  <div class="actions" style="margin-top:1.5rem;">
    <button id="btnCalc">🧮 Calculate ROI</button>
    <button id="btnPrint" class="btn-secondary">🖨️ Print Report</button>
    <button id="btnReset" class="btn-danger">🔄 Reset</button>
  </div>
</div>

<!-- MORTGAGE & CLOSING -->
<div class="card">
  <h2>Mortgage & Closing Costs</h2>
  <table>
    <thead>
      <tr>
        <th>Item</th>
        <th class="text-right">Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Listing Price</td>
        <td class="text-right" id="mOutPrice">$0</td>
      </tr>
      <tr>
        <td>Down Payment</td>
        <td class="text-right" id="mOutDown">$0</td>
      </tr>
      <tr id="rowLoan">
        <td>Loan Amount</td>
        <td class="text-right" id="mOutLoan">$0</td>
      </tr>
      <tr>
        <td>Transfer Tax (3% first Afl 250k + 6% above)</td>
        <td class="text-right" id="mOutTax">$0</td>
      </tr>
      <tr>
        <td>Notary (Transfer) ~1%</td>
        <td class="text-right" id="mOutNotary">$0</td>
      </tr>
      <tr id="rowBankFee">
        <td>Bank Closing Fee ~1%</td>
        <td class="text-right" id="mOutBankFee">$0</td>
      </tr>
      <tr id="rowMortNotary">
        <td>Notary (Mortgage) ~1%</td>
        <td class="text-right" id="mOutMortNotary">$0</td>
      </tr>
      <tr class="bold">
        <td>Total Cash at Closing</td>
        <td class="text-right" id="mOutTotal">$0</td>
      </tr>
      <tr id="rowPmt">
        <td>Monthly P&I Payment</td>
        <td class="text-right" id="mOutPmt">$0</td>
      </tr>
      <tr id="rowAllIn">
        <td>All-in Cost (Price + Closing)</td>
        <td class="text-right" id="mOutAllIn">$0</td>
      </tr>
    </tbody>
  </table>
  <p id="mConversion" style="margin-top:1rem;font-size:0.875rem;color:var(--muted);"></p>
</div>

<!-- KPIS -->
<div class="card">
  <h2>Key Performance Indicators (Base Case)</h2>
  <div class="kpi-grid">
    <div class="kpi-card">
      <div class="kpi-label">Total Revenue</div>
      <div class="kpi-value" id="kpiTotalRev">$0</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Net After OTA</div>
      <div class="kpi-value" id="kpiNetOTA">$0</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Owner Gross (Pre-OPEX)</div>
      <div class="kpi-value" id="kpiOwnerGross">$0</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Total OPEX</div>
      <div class="kpi-value" id="kpiTotalOPEX">$0</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Owner Net Income</div>
      <div class="kpi-value" id="kpiOwnerNet">$0</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Cap Rate / ROI</div>
      <div class="kpi-value" id="kpiCapRate">0%</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">ADR (Net)</div>
      <div class="kpi-value" id="kpiADR">$0</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">RevPAR (Net)</div>
      <div class="kpi-value" id="kpiRevPAR">$0</div>
    </div>
  </div>
  <div style="margin-top:1.5rem;">
    <h3>Breakeven Occupancy</h3>
    <p style="font-size:1.25rem;margin:0.5rem 0;"><span class="badge badge-warning" id="breakeven">0%</span></p>
    <div class="progress-bar">
      <div class="progress-fill" id="breakevenBar" style="width:0%;">0%</div>
    </div>
  </div>
</div>

<!-- REVENUE BREAKDOWN -->
<div class="card">
  <h2>Revenue Breakdown (Base Case)</h2>
  <p><span class="badge" id="occBadge">0% Occupancy</span></p>
  <div class="chart-container" id="revenueChart"></div>
  <table>
    <thead>
      <tr>
        <th>Season</th>
        <th class="text-right">Nights Sold</th>
        <th class="text-right">Revenue</th>
      </tr>
    </thead>
    <tbody id="revenueTableBody"></tbody>
  </table>
</div>

<!-- OPEX DISTRIBUTION -->
<div class="card">
  <h2>OPEX Distribution</h2>
  <div class="chart-container" id="opexChart"></div>
</div>

<!-- CASH FLOW WATERFALL -->
<div class="card">
  <h2>Cash Flow Waterfall (Base Case)</h2>
  <div class="chart-container" id="waterfallChart"></div>
  <table style="margin-top:1rem;">
    <thead>
      <tr>
        <th>Item</th>
        <th class="text-right">Amount</th>
      </tr>
    </thead>
    <tbody id="waterfallTableBody"></tbody>
  </table>
</div>

<!-- OCCUPANCY SCENARIO ANALYSIS -->
<div class="card">
  <h2>Occupancy Scenario Analysis</h2>
  <div style="overflow-x:auto;">
    <table id="scenarioTable">
      <thead>
        <tr>
          <th>Occupancy</th>
          <th class="text-right">Room Revenue</th>
          <th class="text-right">Net After OTA</th>
          <th class="text-right">Owner Gross</th>
          <th class="text-right">Total OPEX</th>
          <th class="text-right">Owner Net</th>
          <th class="text-right">ROI</th>
          <th class="text-right">Cap Rate</th>
        </tr>
      </thead>
      <tbody id="scenarioTableBody"></tbody>
    </table>
  </div>
</div>

<!-- SENSITIVITY TORNADO -->
<div class="card">
  <h2>Sensitivity Analysis (Tornado Chart)</h2>
  <p style="font-size:0.875rem;color:var(--muted);margin-bottom:1rem;">Impact of ±20% change on Owner Net Income</p>
  <div class="chart-container" id="sensitivityChart"></div>
</div>

<!-- DETAILED OPEX -->
<div class="card">
  <h2>Detailed OPEX Breakdown</h2>
  <table id="opexDetailTable">
    <thead>
      <tr>
        <th>Category</th>
        <th class="text-right">Monthly</th>
        <th class="text-right">Annual</th>
        <th class="text-right">% of Total</th>
      </tr>
    </thead>
    <tbody id="opexDetailTableBody"></tbody>
    <tfoot>
      <tr class="bold">
        <td>TOTAL</td>
        <td class="text-right" id="opexTotalMonthly">$0</td>
        <td class="text-right" id="opexTotalAnnual">$0</td>
        <td class="text-right">100%</td>
      </tr>
    </tfoot>
  </table>
</div>

<!-- 10-YEAR PROJECTION -->
<div class="card">
  <h2>10-Year Cash Flow Projection</h2>
  <div class="form-group screen-only" style="max-width:300px;margin-bottom:1rem;">
    <label>Annual Appreciation %</label>
    <input type="number" id="appreciation" value="3" min="0" max="20" step="0.5">
    <p style="margin-top:0.5rem;"><span class="badge" id="appreciation-badge">3% Annual Growth</span></p>
  </div>
  <p style="font-size:0.875rem;color:var(--muted);margin-bottom:1rem;">
    Base occupancy: 60% • OPEX inflation: 2.5%/yr • Rates appreciate with property value
  </p>
  <div class="kpi-grid" style="margin-bottom:1.5rem;">
    <div class="kpi-card">
      <div class="kpi-label">Total Net Income (10Y)</div>
      <div class="kpi-value" id="summary10Net">$0</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Property Value Y10</div>
      <div class="kpi-value" id="summary10Value">$0</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Total ROI (10Y)</div>
      <div class="kpi-value" id="summary10ROI">0%</div>
    </div>
  </div>
  <div class="chart-container" id="yearChart"></div>
  <div style="overflow-x:auto;">
    <table id="yearTable">
      <thead id="yearTableHead"></thead>
      <tbody id="yearTableBody"></tbody>
    </table>
  </div>
</div>

</div>

<script>
// ===== STATE =====
const AWG_PER_USD = 1.79;

const STATE = {
  // Currency
  currency: 'USD',
  
  // Property
  price: 650000,
  totalInv: null,
  propType: 'Condo',
  beds: 2,
  baths: 2,
  
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
  mgmtPct: 20,
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

// ===== FORMATTERS =====
const fmt = {
  money: (val, currency) => {
    const sym = currency === 'AWG' ? 'Afl ' : '$';
    return sym + Math.round(val).toLocaleString();
  },
  pct: (val, decimals = 1) => val.toFixed(decimals) + '%',
  num: (val, decimals = 0) => val.toFixed(decimals)
};

function toCur(usdVal, currency) {
  return currency === 'AWG' ? usdVal * AWG_PER_USD : usdVal;
}

function fromCur(val, currency) {
  return currency === 'AWG' ? val / AWG_PER_USD : val;
}

// ===== BINDINGS =====
function bindInputs() {
  // Currency toggle
  document.querySelectorAll('#currencyToggle button').forEach(btn => {
    btn.addEventListener('click', () => {
      const newCur = btn.dataset.currency;
      if (newCur === STATE.currency) return;
      
      // Convert all monetary values
      const ratio = newCur === 'AWG' ? AWG_PER_USD : 1/AWG_PER_USD;
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
      document.querySelectorAll('#currencyToggle button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      calculate();
    });
  });
  
  // Property inputs
  document.getElementById('priceInput').addEventListener('input', e => {
    STATE.price = parseFloat(e.target.value) || 0;
    updateDerivedAmounts();
  });
  document.getElementById('totalInvInput').addEventListener('input', e => {
    STATE.totalInv = e.target.value ? parseFloat(e.target.value) : null;
  });
  document.getElementById('propType').addEventListener('change', e => STATE.propType = e.target.value);
  document.getElementById('beds').addEventListener('input', e => STATE.beds = parseFloat(e.target.value) || 2);
  document.getElementById('baths').addEventListener('input', e => STATE.baths = parseFloat(e.target.value) || 2);
  
  // Financing
  document.getElementById('financingMode').addEventListener('change', e => {
    STATE.financingMode = e.target.value;
    updateFinancingUI();
    updateDerivedAmounts();
  });
  document.getElementById('ltvPct').addEventListener('input', e => {
    let ltv = parseFloat(e.target.value) || 60;
    ltv = Math.max(5, Math.min(95, ltv));
    STATE.ltvPct = ltv;
    STATE.downPct = 100 - ltv;
    document.getElementById('ltvPct').value = ltv;
    document.getElementById('downPct').value = STATE.downPct;
    updateDerivedAmounts();
  });
  document.getElementById('downPct').addEventListener('input', e => {
    let down = parseFloat(e.target.value) || 40;
    down = Math.max(5, Math.min(95, down));
    STATE.downPct = down;
    STATE.ltvPct = 100 - down;
    document.getElementById('downPct').value = down;
    document.getElementById('ltvPct').value = STATE.ltvPct;
    updateDerivedAmounts();
  });
  document.getElementById('ratePct').addEventListener('input', e => STATE.ratePct = parseFloat(e.target.value) || 8);
  document.getElementById('termYears').addEventListener('input', e => STATE.termYears = parseFloat(e.target.value) || 30);
  
  // Occupancy
  document.getElementById('baseOcc').addEventListener('input', e => STATE.baseOcc = parseFloat(e.target.value) || 59.5);
  document.getElementById('avgLOS').addEventListener('input', e => STATE.avgLOS = parseFloat(e.target.value) || 5);
  
  // Rates
  document.getElementById('rateHigh').addEventListener('input', e => STATE.rateHigh = parseFloat(e.target.value) || 420);
  document.getElementById('rateMid').addEventListener('input', e => STATE.rateMid = parseFloat(e.target.value) || 320);
  document.getElementById('rateLow').addEventListener('input', e => STATE.rateLow = parseFloat(e.target.value) || 220);
  document.getElementById('holidayPrem').addEventListener('input', e => STATE.holidayPrem = parseFloat(e.target.value) || 30);
  
  // Seasons - auto-normalize
  ['wHigh','wMid','wLow','wHoliday'].forEach(key => {
    document.getElementById(key).addEventListener('input', e => {
      STATE[key] = parseFloat(e.target.value) || 0;
      normalizeWeeks();
    });
  });
  
  // Fees
  document.getElementById('otaPct').addEventListener('input', e => STATE.otaPct = parseFloat(e.target.value) || 12);
  document.getElementById('hoaMonthly').addEventListener('input', e => STATE.hoaMonthly = parseFloat(e.target.value) || 420);
  
  // OPEX overrides
  document.getElementById('opxMaint').addEventListener('input', e => STATE.opxMaint = parseFloat(e.target.value) || 0);
  document.getElementById('opxClean').addEventListener('input', e => STATE.opxClean = parseFloat(e.target.value) || 0);
  document.getElementById('opxElec').addEventListener('input', e => STATE.opxElec = parseFloat(e.target.value) || 0);
  document.getElementById('opxWater').addEventListener('input', e => STATE.opxWater = parseFloat(e.target.value) || 0);
  document.getElementById('opxNet').addEventListener('input', e => STATE.opxNet = parseFloat(e.target.value) || 0);
  document.getElementById('opxIns').addEventListener('input', e => STATE.opxIns = parseFloat(e.target.value) || 0);
  document.getElementById('opxRes').addEventListener('input', e => STATE.opxRes = parseFloat(e.target.value) || 0);
  document.getElementById('opxGov').addEventListener('input', e => STATE.opxGov = parseFloat(e.target.value) || 0);
  
  // Branding
  document.getElementById('blueWebsite').addEventListener('input', e => {
    STATE.blueWebsite = e.target.value;
    syncBrandingToPrint();
  });
  ['realtorName','realtorCompany','realtorLicense','realtorPhone','realtorEmail','realtorWebsite'].forEach(key => {
    document.getElementById(key).addEventListener('input', e => {
      STATE[key] = e.target.value;
      syncBrandingToPrint();
    });
  });
  
  // Logo uploads
  document.getElementById('blueLogoFile').addEventListener('change', e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => {
        STATE.blueLogoData = ev.target.result;
        document.getElementById('blueLogoPreview').src = STATE.blueLogoData;
        document.getElementById('blueLogoPreview').classList.add('active');
        syncBrandingToPrint();
      };
      reader.readAsDataURL(file);
    }
  });
  document.getElementById('realtorLogoFile').addEventListener('change', e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => {
        STATE.realtorLogoData = ev.target.result;
        document.getElementById('realtorLogoPreview').src = STATE.realtorLogoData;
        document.getElementById('realtorLogoPreview').classList.add('active');
        syncBrandingToPrint();
      };
      reader.readAsDataURL(file);
    }
  });
  
  document.getElementById('btnClearBlueLogo').addEventListener('click', () => {
    STATE.blueLogoData = null;
    document.getElementById('blueLogoFile').value = '';
    document.getElementById('blueLogoPreview').classList.remove('active');
    syncBrandingToPrint();
  });
  document.getElementById('btnClearRealtorLogo').addEventListener('click', () => {
    STATE.realtorLogoData = null;
    document.getElementById('realtorLogoFile').value = '';
    document.getElementById('realtorLogoPreview').classList.remove('active');
    syncBrandingToPrint();
  });
  
  // Actions
  document.getElementById('btnCalc').addEventListener('click', calculate);
  document.getElementById('btnPrint').addEventListener('click', () => window.print());
  document.getElementById('btnReset').addEventListener('click', reset);
  
  // 10Y appreciation
  document.getElementById('appreciation').addEventListener('input', e => {
    const val = parseFloat(e.target.value) || 3;
    document.getElementById('appreciation-badge').textContent = val + '% Annual Growth';
    calculate();
  });
}

function syncInputsToState() {
  document.getElementById('priceInput').value = STATE.price;
  document.getElementById('totalInvInput').value = STATE.totalInv || '';
  document.getElementById('propType').value = STATE.propType;
  document.getElementById('beds').value = STATE.beds;
  document.getElementById('baths').value = STATE.baths;
  document.getElementById('baseOcc').value = STATE.baseOcc;
  document.getElementById('avgLOS').value = STATE.avgLOS;
  document.getElementById('rateHigh').value = STATE.rateHigh;
  document.getElementById('rateMid').value = STATE.rateMid;
  document.getElementById('rateLow').value = STATE.rateLow;
  document.getElementById('holidayPrem').value = STATE.holidayPrem;
  document.getElementById('wHigh').value = STATE.wHigh;
  document.getElementById('wMid').value = STATE.wMid;
  document.getElementById('wLow').value = STATE.wLow;
  document.getElementById('wHoliday').value = STATE.wHoliday;
  document.getElementById('otaPct').value = STATE.otaPct;
  document.getElementById('hoaMonthly').value = STATE.hoaMonthly;
  document.getElementById('opxMaint').value = STATE.opxMaint;
  document.getElementById('opxClean').value = STATE.opxClean;
  document.getElementById('opxElec').value = STATE.opxElec;
  document.getElementById('opxWater').value = STATE.opxWater;
  document.getElementById('opxNet').value = STATE.opxNet;
  document.getElementById('opxIns').value = STATE.opxIns;
  document.getElementById('opxRes').value = STATE.opxRes;
  document.getElementById('opxGov').value = STATE.opxGov;
  document.getElementById('financingMode').value = STATE.financingMode;
  document.getElementById('ltvPct').value = STATE.ltvPct;
  document.getElementById('downPct').value = STATE.downPct;
  document.getElementById('ratePct').value = STATE.ratePct;
  document.getElementById('termYears').value = STATE.termYears;
  updateFinancingUI();
  updateDerivedAmounts();
}

function updateFinancingUI() {
  const isBank = STATE.financingMode === 'BANK';
  document.getElementById('ltvGroup').style.display = isBank ? 'flex' : 'none';
  document.getElementById('downPctGroup').style.display = isBank ? 'flex' : 'none';
  document.getElementById('rateGroup').style.display = isBank ? 'flex' : 'none';
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
  const totalOPEX = opex.maintenance + cleaning + opex.electricity + opex.water + 
                    opex.internet + opex.insurance + opex.reserve + opex.gov + opex.hoa;
  
  const ownerNet = ownerGross - totalOPEX;
  
  const investment = STATE.totalInv ? fromCur(STATE.totalInv, STATE.currency) : fromCur(STATE.price, STATE.currency);
  const capRate = (ownerNet / investment) * 100;
  
  const adr = rev.totalNights > 0 ? netAfterOTA / rev.totalNights : 0;
  const totalPossibleNights = 365;
  const revpar = netAfterOTA / totalPossibleNights;
  
  return {
    totalRev, netAfterOTA, mgmtFee, ownerGross, totalOPEX, ownerNet, capRate, adr, revpar,
    opex: { ...opex, cleaning }, rev
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
    { label: 'Gov', value: opex.gov }
  ];
  const total = data.reduce((s, d) => s + d.value, 0);
  
  const colors = ['#1fb6ff','#12d0b4','#31d158','#ffc107','#ff5a5f','#9b59b6','#3498db','#e67e22','#95a5a6'];
  
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
  let ly = 50;
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
    ['Gov Taxes/Permits', opex.gov]
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

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  bindInputs();
  syncInputsToState();
  syncBrandingToPrint();
  calculate();
});
</script>

</body>
</html>
