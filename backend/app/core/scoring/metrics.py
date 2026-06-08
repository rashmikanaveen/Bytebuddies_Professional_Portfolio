"""
Metric Registry - 9 ESG metrics (refined subset focusing on core ESG areas)
"""
from dataclasses import dataclass
from typing import Dict, Any


@dataclass
class Metric:
    key: str
    label: str
    pillar: str  # E, S, or G
    direction: str  # "higher_is_better" or "lower_is_better"
    min_val: float
    max_val: float
    hard_penalty: bool = False
    tolerance: Dict[str, Any] = None
    unit: str = ""
    description: str = ""


# ============================================================================
# ENVIRONMENTAL METRICS (3)
# ============================================================================

RENEWABLE_ENERGY_PCT = Metric(
    key="renewable_energy_pct",
    label="Renewable Energy Usage",
    pillar="E",
    direction="higher_is_better",
    min_val=0,
    max_val=100,
    hard_penalty=False,
    tolerance={"type": "percentage", "value": 2},
    unit="%",
    description="Percentage of energy from renewable sources"
)

WASTE_MANAGEMENT_SCORE = Metric(
    key="waste_management_score",
    label="Waste Management Score",
    pillar="E",
    direction="higher_is_better",
    min_val=0,
    max_val=5,
    hard_penalty=False,
    tolerance={"type": "exact", "value": 0},
    unit="score (0-5)",
    description="Waste management score based on GRI 306"
)

WATER_EFFICIENCY_SCORE = Metric(
    key="water_efficiency_score",
    label="Water Efficiency Score",
    pillar="E",
    direction="higher_is_better",
    min_val=0,
    max_val=5,
    hard_penalty=False,
    tolerance={"type": "exact", "value": 0},
    unit="score (0-5)",
    description="Water efficiency vs industry benchmark"
)

ENV_VIOLATIONS = Metric(
    key="env_violations",
    label="Environmental Compliance Violations",
    pillar="E",
    direction="lower_is_better",
    min_val=0,
    max_val=5,
    hard_penalty=True,  # Hard penalty: caps E-score at 30 if > 0
    tolerance={"type": "exact", "value": 0},
    unit="count (last 3 years)",
    description="Environmental violations with hard penalty — caps E-score at 30 if > 0"
)


# ============================================================================
# SOCIAL METRICS (2)
# ============================================================================

FAIR_LABOUR_SCORE = Metric(
    key="fair_labour_score",
    label="Fair Labour Practices Score",
    pillar="S",
    direction="higher_is_better",
    min_val=0,
    max_val=5,
    hard_penalty=False,
    tolerance={"type": "exact", "value": 0},
    unit="score (0-5)",
    description="Fair labour practices per ILO Core Labour Standards"
)

DATA_PROTECTION_SCORE = Metric(
    key="data_protection_score",
    label="Data Protection Compliance Score",
    pillar="S",
    direction="higher_is_better",
    min_val=0,
    max_val=5,
    hard_penalty=False,
    tolerance={"type": "exact", "value": 0},
    unit="score (0-5)",
    description="Data protection compliance per PDPA Sri Lanka"
)


# ============================================================================
# GOVERNANCE METRICS (3)
# ============================================================================

BOARD_INDEPENDENCE_PCT = Metric(
    key="board_independence_pct",
    label="Board Independence",
    pillar="G",
    direction="higher_is_better",
    min_val=0,
    max_val=100,
    hard_penalty=False,
    tolerance={"type": "percentage", "value": 2},
    unit="%",
    description="Board independence percentage"
)

ANTI_CORRUPTION_SCORE = Metric(
    key="anti_corruption_score",
    label="Anti-Corruption Policy Score",
    pillar="G",
    direction="higher_is_better",
    min_val=0,
    max_val=5,
    hard_penalty=False,
    tolerance={"type": "exact", "value": 0},
    unit="score (0-5)",
    description="Anti-corruption policy score per CBSL Direction No. 11"
)

FINANCIAL_TRANSPARENCY_SCORE = Metric(
    key="financial_transparency_score",
    label="Financial Transparency Score",
    pillar="G",
    direction="higher_is_better",
    min_val=0,
    max_val=5,
    hard_penalty=False,
    tolerance={"type": "exact", "value": 0},
    unit="score (0-5)",
    description="Financial transparency and reporting quality"
)


# ============================================================================
# METRIC REGISTRY (Single source of truth)
# ============================================================================

METRIC_REGISTRY: Dict[str, Metric] = {
    # Environmental (3 metrics)
    "renewable_energy_pct": RENEWABLE_ENERGY_PCT,
    "waste_management_score": WASTE_MANAGEMENT_SCORE,
    "water_efficiency_score": WATER_EFFICIENCY_SCORE,
    "env_violations": ENV_VIOLATIONS,
    
    # Social (2 metrics)
    "fair_labour_score": FAIR_LABOUR_SCORE,
    "data_protection_score": DATA_PROTECTION_SCORE,
    
    # Governance (3 metrics)
    "board_independence_pct": BOARD_INDEPENDENCE_PCT,
    "anti_corruption_score": ANTI_CORRUPTION_SCORE,
    "financial_transparency_score": FINANCIAL_TRANSPARENCY_SCORE,
}


def get_metrics_by_pillar(pillar: str) -> Dict[str, Metric]:
    """Get all metrics for a pillar (E, S, or G)"""
    return {k: v for k, v in METRIC_REGISTRY.items() if v.pillar == pillar}


def get_metric(key: str) -> Metric:
    """Get a single metric by key"""
    if key not in METRIC_REGISTRY:
        raise ValueError(f"Unknown metric: {key}")
    return METRIC_REGISTRY[key]
