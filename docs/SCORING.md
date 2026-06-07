# ESG Green Scoring System — AHP Methodology

**Commercial Bank of Sri Lanka · Team ByteBuddies**  
Regulatory alignment: CBSL Green Finance Taxonomy · GRI Standards · IFC Performance Standards

---

## Table of Contents

1. [Overview](#1-overview)
2. [Why AHP](#2-why-ahp)
3. [Scoring Hierarchy](#3-scoring-hierarchy)
4. [Saaty's Comparison Scale](#4-seatys-comparison-scale)
5. [Default Comparison Matrices](#5-default-comparison-matrices)
6. [Derived Weights & Consistency](#6-derived-weights--consistency)
7. [Metric Registry](#7-metric-registry)
8. [Normalization](#8-normalization)
9. [Scoring Formula](#9-scoring-formula)
10. [Hard Gate](#10-hard-gate)
11. [Grade Bands](#11-grade-bands)
12. [Verification Pipeline](#12-verification-pipeline)
13. [Document Verification](#13-document-verification)
14. [How to Update Weights](#14-how-to-update-weights)
15. [Regulatory Alignment](#15-regulatory-alignment)

---

## 1. Overview

The Green Score is a composite 0–100 score that quantifies an applicant's Environmental, Social, and Governance (ESG) performance. It is used as a **hard gate** in the loan approval process — applicants must score ≥ 40 to proceed to the standard credit evaluation stage.

The score is calculated from 14 raw metric inputs submitted by the applicant, verified against supporting documents, and combined using **AHP-derived weights**. Every score is stored with a full breakdown of metric contributions, weights used, and the algorithm version, satisfying CBSL audit requirements.

---

## 2. Why AHP

The Analytic Hierarchy Process (Saaty, 1980) is the industry-standard method for deriving weights in multi-criteria scoring systems used by financial institutions. It is used by the World Bank Group, IFC, and numerous Asian central banks for exactly this type of green finance evaluation.

Compared to alternatives:

| Method | Transparency | Explainability | Regulatory defensibility | Complexity |
|---|---|---|---|---|
| **AHP + weighted average** | High | High | High — weights derived from documented expert judgment | Low |
| Simple weighted average | High | High | Medium — weights are arbitrary | Very low |
| Fuzzy logic | Low | Low | Low — hard to explain rejections | High |
| ML model | Low | Very low | Not acceptable for individual loan decisions | High |

AHP is chosen because CBSL requires that any automated element of the loan decision be **explainable and auditable**. When a loan is rejected due to a low green score, the bank must be able to show exactly which metrics caused the low score and why those metrics carry the weights they do.

---

## 3. Scoring Hierarchy

```
Green Score (0–100)
├── E — Environmental  (~54% weight)
│   ├── Carbon Emissions Intensity        (~24%)
│   ├── Renewable Energy Usage            (~14%)
│   ├── Waste Management Score            (~14%)
│   ├── Water Efficiency Score            ( ~8%)
│   └── Environmental Violations          (~40%)  ← hard penalty
│
├── S — Social         (~30% weight)
│   ├── Workplace Safety Rate             (~29%)
│   ├── Fair Labour Practices Score       (~29%)
│   ├── Community Investment %            (~14%)
│   └── Data Protection Compliance        (~29%)
│
└── G — Governance     (~16% weight)
    ├── Board Independence %              (~14%)
    ├── Board Gender Diversity %          ( ~8%)
    ├── Anti-Corruption Policy Score      (~24%)
    ├── Regulatory Violations             (~40%)  ← hard penalty
    └── Financial Transparency Score      (~14%)
```

Percentages shown are from the **DEFAULT** sector matrices. Sector-specific matrices may differ.

---

## 4. Saaty's Comparison Scale

When running the expert elicitation session to build comparison matrices, use only these values:

| Value | Meaning |
|---|---|
| 1 | Equal importance |
| 3 | Moderate importance |
| 5 | Strong importance |
| 7 | Very strong importance |
| 9 | Extreme importance (rare) |
| 1/3, 1/5, 1/7 | Reciprocals of the above |

Use even values (2, 4, 6) only when genuinely unable to decide between adjacent levels. Prefer odd values for clarity and lower Consistency Ratio.

---

## 5. Default Comparison Matrices

These are the baseline matrices loaded into the `ahp_matrices` database table on first deployment (`sector = DEFAULT`). They are derived from CBSL Green Finance Taxonomy, GRI Standards, and IFC Performance Standards. Replace with expert-session results when available.

### 5.1 Pillar-Level Matrix (E / S / G)

Based on: CBSL Green Finance Taxonomy priority ordering.

|   | E | S | G |
|---|---|---|---|
| **E** | 1 | 2 | 3 |
| **S** | 1/2 | 1 | 2 |
| **G** | 1/3 | 1/2 | 1 |

Rationale: Environmental metrics are most directly observable and measurable in a Sri Lankan banking context, and most central to the CBSL Green Finance Taxonomy. Social follows. Governance, while critical, is partially covered by the existing credit risk assessment.

### 5.2 Environmental Metrics Matrix

Based on: GRI 305 (Emissions), GRI 302 (Energy), GRI 306 (Waste), CEA compliance requirements.

|   | Carbon | Renewable | Waste | Water | Violations |
|---|---|---|---|---|---|
| **Carbon** | 1 | 2 | 2 | 3 | 1/2 |
| **Renewable** | 1/2 | 1 | 1 | 2 | 1/3 |
| **Waste** | 1/2 | 1 | 1 | 2 | 1/3 |
| **Water** | 1/3 | 1/2 | 1/2 | 1 | 1/4 |
| **Violations** | 2 | 3 | 3 | 4 | 1 |

Rationale: Environmental violations are ranked highest — a CEA conviction is a hard regulatory risk signal regardless of other metrics. Carbon emissions second as the primary climate impact measure. Water ranked lowest because Sri Lanka's water stress index is lower than regional peers.

### 5.3 Social Metrics Matrix

Based on: ILO Core Labour Standards, GRI 403 (Occupational Health), PDPA Sri Lanka.

|   | Safety | Labour | Community | Data Prot. |
|---|---|---|---|---|
| **Safety** | 1 | 1 | 2 | 1 |
| **Labour** | 1 | 1 | 2 | 1 |
| **Community** | 1/2 | 1/2 | 1 | 1/2 |
| **Data Prot.** | 1 | 1 | 2 | 1 |

Rationale: Safety, labour practices, and data protection are equally weighted — each represents a distinct legal risk category. Community investment is positive but does not carry the same risk weight.

### 5.4 Governance Metrics Matrix

Based on: CBSL Direction No. 11 of 2021 (Corporate Governance), SEC Listing Rules.

|   | Bd. Indep. | Gender | Anti-Corr. | Reg. Viol. | Transparency |
|---|---|---|---|---|---|
| **Bd. Indep.** | 1 | 2 | 1/2 | 1/3 | 1 |
| **Gender** | 1/2 | 1 | 1/3 | 1/4 | 1/2 |
| **Anti-Corr.** | 2 | 3 | 1 | 1/2 | 2 |
| **Reg. Viol.** | 3 | 4 | 2 | 1 | 3 |
| **Transparency** | 1 | 2 | 1/2 | 1/3 | 1 |

Rationale: Regulatory violations ranked highest — no bank can approve a loan to an entity under active regulatory sanction. Anti-corruption second per CBSL Direction No. 11. Gender diversity ranked lowest — it is encouraged but not yet a hard governance risk factor in Sri Lanka's regulatory framework.

---

## 6. Derived Weights & Consistency

Weights are derived by normalising each column of the comparison matrix and averaging row values. The Consistency Ratio (CR) must be ≤ 0.10 for a matrix to be accepted.

### 6.1 Pillar Weights

| Pillar | Weight | 
|---|---|
| **E — Environmental** | **54.0%** |
| **S — Social** | **29.7%** |
| **G — Governance** | **16.4%** |

CR = **0.008** ✓

### 6.2 Environmental Metric Weights

| Metric | Weight |
|---|---|
| Environmental Violations | 40.2% |
| Carbon Emissions Intensity | 24.4% |
| Renewable Energy Usage | 13.7% |
| Waste Management Score | 13.7% |
| Water Efficiency Score | 8.0% |

CR = **0.006** ✓

### 6.3 Social Metric Weights

| Metric | Weight |
|---|---|
| Workplace Safety Rate | 28.6% |
| Fair Labour Practices Score | 28.6% |
| Data Protection Compliance | 28.6% |
| Community Investment % | 14.3% |

CR = **0.000** ✓ (perfectly consistent)

### 6.4 Governance Metric Weights

| Metric | Weight |
|---|---|
| Regulatory Violations | 40.2% |
| Anti-Corruption Policy Score | 24.4% |
| Board Independence % | 13.7% |
| Financial Transparency Score | 13.7% |
| Board Gender Diversity % | 8.0% |

CR = **0.006** ✓

---

## 7. Metric Registry

All 14 metrics across the three pillars. Raw values are submitted by the applicant and normalised to 0–100 before scoring.

### Environmental

| Key | Label | Direction | Min (score=0) | Max (score=100) | Hard Penalty | Tolerance |
|---|---|---|---|---|---|---|
| `carbon_intensity` | Carbon Emissions Intensity (kg CO₂ / LKR M revenue) | Lower is better | 0 | 500 | No | ±5% |
| `renewable_energy_pct` | Renewable Energy Usage (%) | Higher is better | 0 | 100 | No | ±2% |
| `waste_management_score` | Waste Management Score (0–5) | Higher is better | 0 | 5 | No | Exact |
| `water_efficiency_score` | Water Efficiency vs Industry Benchmark (0–5) | Higher is better | 0 | 5 | No | Exact |
| `env_violations` | Environmental Compliance Violations (last 3 years) | Lower is better | 0 | 5 | **Yes** — caps E-score at 30 | Exact |

### Social

| Key | Label | Direction | Min (score=0) | Max (score=100) | Hard Penalty | Tolerance |
|---|---|---|---|---|---|---|
| `lti_rate` | Lost-Time Injury Rate (per 100 employees) | Lower is better | 0 | 10 | No | ±5% |
| `fair_labour_score` | Fair Labour Practices Score (0–5) | Higher is better | 0 | 5 | No | Exact |
| `community_investment_pct` | Community Investment (% of annual profit) | Higher is better | 0 | 5 | No | ±2% |
| `data_protection_score` | Data Protection Compliance Score (0–5) | Higher is better | 0 | 5 | No | Exact |

### Governance

| Key | Label | Direction | Min (score=0) | Max (score=100) | Hard Penalty | Tolerance |
|---|---|---|---|---|---|---|
| `board_independence_pct` | Board Independence (%) | Higher is better | 0 | 100 | No | ±2% |
| `board_gender_diversity_pct` | Board Gender Diversity (%) | Higher is better | 0 | 100 | No | ±2% |
| `anti_corruption_score` | Anti-Corruption Policy Score (0–5) | Higher is better | 0 | 5 | No | Exact |
| `regulatory_violations` | Regulatory Violations (last 5 years) | Lower is better | 0 | 5 | **Yes** — caps G-score at 30 | Exact |
| `financial_transparency_score` | Financial Transparency Score (0–5) | Higher is better | 0 | 5 | No | Exact |

**Hard Penalty:** If `env_violations > 0`, the E sub-score is capped at 30/100 regardless of other metrics. Same rule applies to `regulatory_violations` for the G sub-score. This prevents an excellent score in other areas from masking an active violation.

**Missing data:** Any metric not provided by the applicant is treated as `0` (worst case). The officer can override this if the metric is genuinely not applicable to the business (e.g. a purely service-sector business with no manufacturing processes).

---

## 8. Normalization

Each raw value is normalised to a 0–100 scale using the metric's `min_val` and `max_val` from the registry.

**Higher is better:**

$$\text{normalised} = \frac{\text{value} - \text{min\_val}}{\text{max\_val} - \text{min\_val}} \times 100$$

**Lower is better:**

$$\text{normalised} = \frac{\text{max\_val} - \text{value}}{\text{max\_val} - \text{min\_val}} \times 100$$

Result is clamped to `[0, 100]`. Values exceeding `max_val` receive a score of 100; values below `min_val` receive 0.

---

## 9. Scoring Formula

**Step 1 — Calculate sub-scores:**

$$E_{score} = \sum_{i=1}^{5} w_{E_i} \cdot n_{E_i}$$

$$S_{score} = \sum_{i=1}^{4} w_{S_i} \cdot n_{S_i}$$

$$G_{score} = \sum_{i=1}^{5} w_{G_i} \cdot n_{G_i}$$

Where $w$ is the AHP-derived within-pillar weight and $n$ is the normalised metric score (0–100).

**Step 2 — Apply hard penalty caps:**
- If `env_violations > 0`: $E_{score} = \min(E_{score},\ 30)$
- If `regulatory_violations > 0`: $G_{score} = \min(G_{score},\ 30)$

**Step 3 — Combine pillars:**

$$\text{GreenScore} = w_E \cdot E_{score} + w_S \cdot S_{score} + w_G \cdot G_{score}$$

Where $w_E \approx 0.540$, $w_S \approx 0.297$, $w_G \approx 0.164$ (DEFAULT sector).

---

## 10. Hard Gate

| Condition | Outcome |
|---|---|
| GreenScore < 40 | **BLOCKED** — application cannot proceed to credit evaluation |
| GreenScore ≥ 40 | **PASSED** — application moves to credit evaluation stage |

The rejection response must include the full score breakdown (E/S/G sub-scores and top contributing metrics) so the officer can explain the decision to the applicant and the applicant can improve their submission if eligible to reapply.

---

## 11. Grade Bands

| Grade | Score Range | Meaning |
|---|---|---|
| **A** | 75 – 100 | Exemplary ESG performance |
| **B** | 60 – 74 | Good ESG performance |
| **C** | 40 – 59 | Satisfactory — passes gate, eligible for standard credit evaluation |
| **D** | 0 – 39 | Insufficient — **blocked at gate** |

Grade is stored alongside the score in `esg_scores` and displayed in the officer's dashboard.

---

## 12. Verification Pipeline

Each ESG submission passes through three stages before the scoring engine will run.

```
PENDING
  │
  ▼
  Documents uploaded per section (E / S / G)
  Document intelligence service extracts key-value pairs
  Extracted value compared to submitted value within tolerance
  │
  ├── Within tolerance → field status: SYSTEM_VERIFIED
  └── Outside tolerance or extraction failed → field status: FLAGGED_FOR_OFFICER
  │
  ▼
  If any field is FLAGGED_FOR_OFFICER:
  Officer reviews flagged fields, views submitted value + extracted value + document
  │
  ├── Officer confirms → field status: OFFICER_VERIFIED
  └── Officer rejects  → field status: OFFICER_REJECTED (metric score = 0)
  │
  ▼
  All fields are SYSTEM_VERIFIED or OFFICER_VERIFIED or OFFICER_REJECTED
  Submission status: CROSS_CHECKED
  │
  ▼
  POST /api/v1/scoring/calculate → scoring engine runs
```

The scoring endpoint returns HTTP 422 if submission status is not `CROSS_CHECKED`.

---

## 13. Document Verification

For each metric, the following documents are the accepted evidence. The document intelligence service attempts to extract the relevant value from these document types.

| Metric | Accepted Documents |
|---|---|
| `carbon_intensity` | Audited carbon footprint report, ISO 14064 certificate, CEA annual return |
| `renewable_energy_pct` | CEB/LECO invoices showing renewable tariff, solar installation certificate, energy audit |
| `waste_management_score` | CEA waste disposal licence, certified disposal manifests, ISO 14001 certificate |
| `water_efficiency_score` | Water authority reports, industry benchmark comparison from NWSDB |
| `env_violations` | CEA compliance certificate (bank-obtained, not self-declared) |
| `lti_rate` | Labour Department accident register extract, DOSH annual report |
| `fair_labour_score` | Labour Department compliance certificate, internal policy documents |
| `community_investment_pct` | Audited financial statements CSR note, board-approved CSR report |
| `data_protection_score` | PDPA registration certificate, ISO 27001 certificate |
| `board_independence_pct` | Latest audited annual report directors' section, Companies Registry filing |
| `board_gender_diversity_pct` | Latest audited annual report directors' section, Companies Registry filing |
| `anti_corruption_score` | Board-approved anti-corruption policy, training records |
| `regulatory_violations` | CBSL/SEC/relevant regulatory authority clearance letter (bank-obtained) |
| `financial_transparency_score` | Audited financial statements, GRI index, CBSL annual return |

### Tolerance Rules

| Metric type | Acceptable match tolerance |
|---|---|
| Percentages (`renewable_energy_pct`, `board_*_pct`, `community_investment_pct`) | ± 2 percentage points |
| Continuous values (`carbon_intensity`, `lti_rate`) | ± 5% of submitted value |
| Integer counts (`env_violations`, `regulatory_violations`) | Exact match |
| Scores 0–5 (`waste_management_score`, etc.) | Exact match |

### Cross-Metric Consistency Rules

These are checked automatically after document extraction. A flag is raised (not an automatic rejection) and sent to the officer queue if:

| Rule | Flag message |
|---|---|
| `renewable_energy_pct = 100` AND `carbon_intensity > 200` | "Full renewable claim inconsistent with high carbon intensity — verify carbon methodology" |
| `env_violations > 0` AND `waste_management_score = 5` | "Active violation present — maximum waste score is not credible without explanation" |
| `fair_labour_score = 5` AND `lti_rate > 5` | "Maximum labour score inconsistent with high injury rate" |
| `regulatory_violations > 0` AND `anti_corruption_score = 5` | "Active regulatory violation present — maximum anti-corruption score requires officer review" |

---

## 14. How to Update Weights

Weights are stored in the `ahp_matrices` database table. They can be updated by an admin through the API without any code deployment.

**Process:**

1. Conduct an expert elicitation session — minimum 3 participants (loan officer + risk manager + sustainability officer)
2. For each matrix level (pillar + each pillar's internal metrics), record pairwise comparison values using Saaty's scale
3. If multiple experts: aggregate their individual matrices using the **geometric mean** of corresponding cells
4. Submit the new matrix via `PUT /api/v1/admin/ahp-matrices/{id}` — the API will compute the weights and CR automatically
5. The API rejects the update if CR > 0.10 — revise the matrix and resubmit
6. Once accepted, the new weights take effect for all subsequent score calculations
7. Existing scores are **not recalculated** — they retain the `pillar_weights_snapshot` from when they were calculated

**Sector-specific matrices:**  
To create sector-specific weights (e.g. `MANUFACTURING`), create a new row in `ahp_matrices` with the sector field set appropriately. The scoring engine uses the sector from the `esg_submissions` record to load the correct matrix, falling back to `DEFAULT` if none exists for that sector.

---

## 15. Regulatory Alignment

| Standard | Alignment |
|---|---|
| **CBSL Green Finance Taxonomy (2022)** | E/S/G pillar structure and environmental metric selection follow the Taxonomy's priority categories |
| **CBSL Direction No. 11 of 2021** | Governance metrics aligned to the corporate governance requirements in Direction 11 |
| **GRI Standards** | GRI 302 (Energy), GRI 303 (Water), GRI 305 (Emissions), GRI 306 (Waste), GRI 403 (Safety), GRI 205 (Anti-corruption) |
| **IFC Performance Standards** | Pillar-level weighting approach follows IFC PS 1–8 priority ordering for financial institutions |
| **Saaty (1980)** | AHP methodology, Consistency Ratio threshold, Random Index table |
| **PCI-DSS / ISO 27001** | Data protection score metric aligns to these standards as accepted evidence |

The algorithm version stored with every `esg_scores` record ensures that if the scoring methodology is updated in future, historical scores can be traced to the exact version of this document that was active at the time of calculation.
