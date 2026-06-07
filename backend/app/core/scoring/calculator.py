"""
Main scoring calculator - Implements the Green Score formula from SCORING.md
"""
from typing import Dict, Any, Tuple
from app.core.scoring.metrics import get_metrics_by_pillar, get_metric
from app.core.scoring.ahp import (
    DEFAULT_PILLAR_WEIGHTS,
    DEFAULT_ENVIRONMENTAL_WEIGHTS,
    DEFAULT_SOCIAL_WEIGHTS,
    DEFAULT_GOVERNANCE_WEIGHTS,
)


class ScoringCalculator:
    """
    Calculates Green Score using normalized metrics and AHP-derived weights.
    
    Formula:
    1. Calculate pillar sub-scores: E_score, S_score, G_score
    2. Apply hard penalties (cap at 30 if violations exist)
    3. Combine pillars: GreenScore = w_E * E + w_S * S + w_G * G
    """
    
    @staticmethod
    def calculate_sub_score(
        pillar: str,
        normalized_metrics: Dict[str, float],
        weights: Dict[str, float] = None
    ) -> Tuple[float, Dict[str, Any]]:
        """
        Calculate score for a pillar (E, S, or G).
        
        Args:
            pillar: "E", "S", or "G"
            normalized_metrics: Dict of normalized metric values (0-100)
            weights: Custom weights (use defaults if None)
        
        Returns:
            (score, breakdown) where breakdown shows metric contributions
        """
        if weights is None:
            if pillar == "E":
                weights = DEFAULT_ENVIRONMENTAL_WEIGHTS
            elif pillar == "S":
                weights = DEFAULT_SOCIAL_WEIGHTS
            elif pillar == "G":
                weights = DEFAULT_GOVERNANCE_WEIGHTS
            else:
                raise ValueError(f"Invalid pillar: {pillar}")
        
        pillar_metrics = get_metrics_by_pillar(pillar)
        score = 0.0
        breakdown = {}
        
        for metric_key, metric in pillar_metrics.items():
            normalized_value = normalized_metrics.get(metric_key, 0.0)
            weight = weights.get(metric_key, 0.0)
            
            contribution = weight * normalized_value
            score += contribution
            
            breakdown[metric_key] = {
                "normalized_value": normalized_value,
                "weight": weight,
                "contribution": contribution,
                "label": metric.label,
            }
        
        return score, breakdown
    
    @staticmethod
    def apply_hard_penalties(
        e_score: float,
        s_score: float,
        g_score: float,
        normalized_metrics: Dict[str, float]
    ) -> Tuple[float, float, float]:
        """
        Apply hard penalties to pillar scores.
        
        - If env_violations > 0: E_score = min(E_score, 30)
        - If regulatory_violations > 0: G_score = min(G_score, 30)
        """
        env_violations = normalized_metrics.get("env_violations", 0.0)
        regulatory_violations = normalized_metrics.get("regulatory_violations", 0.0)
        
        if env_violations > 0:
            e_score = min(e_score, 30)
        
        if regulatory_violations > 0:
            g_score = min(g_score, 30)
        
        return e_score, s_score, g_score
    
    @staticmethod
    def calculate_final_score(
        e_score: float,
        s_score: float,
        g_score: float,
        pillar_weights: Dict[str, float] = None
    ) -> float:
        """
        Combine pillar scores into final Green Score (0-100).
        
        Formula:
        GreenScore = w_E * E_score + w_S * S_score + w_G * G_score
        """
        if pillar_weights is None:
            pillar_weights = DEFAULT_PILLAR_WEIGHTS
        
        green_score = (
            pillar_weights["E"] * e_score +
            pillar_weights["S"] * s_score +
            pillar_weights["G"] * g_score
        )
        
        return green_score
    
    @staticmethod
    def determine_grade(score: float) -> str:
        """
        Determine letter grade based on score.
        
        Grade bands:
        - A: 75–100
        - B: 60–74
        - C: 40–59 (passes hard gate)
        - D: 0–39 (blocked at hard gate)
        """
        if score >= 75:
            return "A"
        elif score >= 60:
            return "B"
        elif score >= 40:
            return "C"
        else:
            return "D"
    
    @staticmethod
    def passed_hard_gate(score: float) -> bool:
        """Check if score passes the hard gate (≥ 40)"""
        return score >= 40
    
    @staticmethod
    def calculate_full_score(
        normalized_metrics: Dict[str, float],
        environmental_weights: Dict[str, float] = None,
        social_weights: Dict[str, float] = None,
        governance_weights: Dict[str, float] = None,
        pillar_weights: Dict[str, float] = None,
    ) -> Dict[str, Any]:
        """
        Calculate full ESG score with all breakdowns.
        
        Returns:
            {
                "green_score": float,
                "grade": str,
                "passed_gate": bool,
                "e_score": float,
                "s_score": float,
                "g_score": float,
                "e_breakdown": {...},
                "s_breakdown": {...},
                "g_breakdown": {...},
                "top_contributors": [...],  # Top 3 metrics
            }
        """
        # Calculate pillar sub-scores
        e_score, e_breakdown = ScoringCalculator.calculate_sub_score(
            "E", normalized_metrics, environmental_weights
        )
        s_score, s_breakdown = ScoringCalculator.calculate_sub_score(
            "S", normalized_metrics, social_weights
        )
        g_score, g_breakdown = ScoringCalculator.calculate_sub_score(
            "G", normalized_metrics, governance_weights
        )
        
        # Apply hard penalties
        e_score, s_score, g_score = ScoringCalculator.apply_hard_penalties(
            e_score, s_score, g_score, normalized_metrics
        )
        
        # Combine into final score
        green_score = ScoringCalculator.calculate_final_score(
            e_score, s_score, g_score, pillar_weights
        )
        
        # Determine grade and gate status
        grade = ScoringCalculator.determine_grade(green_score)
        passed_gate = ScoringCalculator.passed_hard_gate(green_score)
        
        # Find top 3 contributing metrics
        all_contributions = {}
        all_contributions.update({
            f"{k} (E)": v["contribution"] for k, v in e_breakdown.items()
        })
        all_contributions.update({
            f"{k} (S)": v["contribution"] for k, v in s_breakdown.items()
        })
        all_contributions.update({
            f"{k} (G)": v["contribution"] for k, v in g_breakdown.items()
        })
        
        top_contributors = sorted(
            all_contributions.items(),
            key=lambda x: x[1],
            reverse=True
        )[:3]
        
        return {
            "green_score": round(green_score, 2),
            "grade": grade,
            "passed_gate": passed_gate,
            "e_score": round(e_score, 2),
            "s_score": round(s_score, 2),
            "g_score": round(g_score, 2),
            "e_breakdown": e_breakdown,
            "s_breakdown": s_breakdown,
            "g_breakdown": g_breakdown,
            "top_contributors": [
                {"metric": k, "contribution": round(v, 2)} for k, v in top_contributors
            ],
        }
