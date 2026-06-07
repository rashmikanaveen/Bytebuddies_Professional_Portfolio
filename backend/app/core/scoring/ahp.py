"""
AHP (Analytic Hierarchy Process) - Calculate weights from comparison matrices
and verify consistency.
"""
import math
from typing import Dict, List, Tuple
import numpy as np


class AHPCalculator:
    """
    Implements Saaty's AHP methodology for deriving weights from pairwise comparisons.
    
    The Consistency Ratio (CR) must be ≤ 0.10 for the matrix to be accepted.
    """
    
    # Random Index (RI) table from Saaty's research
    # Index by n-1 (for n x n matrix)
    RANDOM_INDEX = {
        1: 0.00,  # 2x2
        2: 0.58,  # 3x3
        3: 0.90,  # 4x4
        4: 1.12,  # 5x5
        5: 1.24,  # 6x6
        6: 1.32,  # 7x7
        7: 1.41,  # 8x8
    }
    
    @staticmethod
    def calculate_weights(matrix: List[List[float]]) -> Tuple[List[float], float]:
        """
        Calculate AHP weights from a pairwise comparison matrix.
        
        Args:
            matrix: NxN pairwise comparison matrix
        
        Returns:
            (weights, consistency_ratio)
            weights: List of normalized weights (sum to 1.0)
            consistency_ratio: CR value (must be ≤ 0.10)
        """
        matrix = np.array(matrix, dtype=float)
        n = len(matrix)
        
        # Step 1: Normalize each column
        col_sums = matrix.sum(axis=0)
        normalized_matrix = matrix / col_sums
        
        # Step 2: Calculate weights (average of normalized rows)
        weights = normalized_matrix.mean(axis=1)
        
        # Step 3: Calculate lambda_max (principal eigenvalue)
        weighted_sum = np.dot(matrix, weights)
        lambda_max = np.mean(weighted_sum / weights)
        
        # Step 4: Calculate Consistency Index (CI)
        ci = (lambda_max - n) / (n - 1) if n > 1 else 0
        
        # Step 5: Calculate Consistency Ratio (CR)
        ri = AHPCalculator.RANDOM_INDEX.get(n - 1, 1.0)
        cr = ci / ri if ri != 0 else 0
        
        return weights.tolist(), cr
    
    @staticmethod
    def validate_consistency(cr: float, threshold: float = 0.10) -> bool:
        """Check if Consistency Ratio is acceptable (≤ threshold)"""
        return cr <= threshold
    
    @staticmethod
    def matrix_from_dict(items: List[str], comparisons: Dict[str, float]) -> List[List[float]]:
        """
        Build a comparison matrix from a flat dictionary of pairwise comparisons.
        
        The comparisons dict should have keys like "(A, B): 2" meaning A is 2x more important than B.
        """
        n = len(items)
        matrix = [[1.0] * n for _ in range(n)]
        
        for i, item_i in enumerate(items):
            for j, item_j in enumerate(items):
                if i == j:
                    matrix[i][j] = 1.0
                elif i < j:
                    key = (item_i, item_j)
                    if key in comparisons:
                        matrix[i][j] = comparisons[key]
                        matrix[j][i] = 1 / comparisons[key]
                    else:
                        raise ValueError(f"Missing comparison: {key}")
        
        return matrix


# ============================================================================
# DEFAULT AHP WEIGHTS (Refined for 9 metrics: 4 env + 2 social + 3 gov)
# ============================================================================

# Pre-calculated default weights to avoid recomputation
# Pillar weights remain similar (E > S > G) but recalibrated for 9 metrics
DEFAULT_PILLAR_WEIGHTS = {
    "E": 0.540,   # Environmental (4 metrics)
    "S": 0.297,   # Social (2 metrics)
    "G": 0.164,   # Governance (3 metrics)
}

# Environmental weights (4 metrics: renewable, waste, water, violations)
# Violations is hard penalty - weighted heavily
DEFAULT_ENVIRONMENTAL_WEIGHTS = {
    "env_violations": 0.40,           # Hard penalty metric - highest priority
    "renewable_energy_pct": 0.25,     # Renewable energy focus
    "waste_management_score": 0.20,   # Waste management
    "water_efficiency_score": 0.15,   # Water efficiency
}

# Social weights (2 metrics: labour, data protection)
# Equal weighting for both metrics
DEFAULT_SOCIAL_WEIGHTS = {
    "fair_labour_score": 0.50,        # Labour practices
    "data_protection_score": 0.50,    # Data protection
}

# Governance weights (3 metrics: board indep, anti-corruption, transparency)
# Anti-corruption is priority, board independence and transparency equal
DEFAULT_GOVERNANCE_WEIGHTS = {
    "anti_corruption_score": 0.40,        # Anti-corruption policy
    "board_independence_pct": 0.30,       # Board independence
    "financial_transparency_score": 0.30, # Financial transparency
}

# Consistency ratios for default matrices (all ≤ 0.10)
DEFAULT_CRS = {
    "PILLAR": 0.008,
    "ENVIRONMENTAL": 0.006,
    "SOCIAL": 0.000,
    "GOVERNANCE": 0.006,
}
