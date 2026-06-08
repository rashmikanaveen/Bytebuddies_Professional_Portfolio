"""
Normalization logic - Scale raw metric values to 0-100
"""
from typing import Dict, Any
from app.core.scoring.metrics import Metric, get_metric


def normalize_value(raw_value: float, metric: Metric) -> float:
    """
    Normalize a raw metric value to 0-100 scale.
    
    For "higher_is_better" metrics:
        normalized = ((value - min) / (max - min)) * 100
    
    For "lower_is_better" metrics:
        normalized = ((max - value) / (max - min)) * 100
    
    Result is clamped to [0, 100].
    """
    if raw_value is None:
        return 0.0  # Missing data treated as worst case
    
    min_val = metric.min_val
    max_val = metric.max_val
    
    # Handle edge cases
    if max_val <= min_val:
        raise ValueError(f"Invalid metric range for {metric.key}: min={min_val}, max={max_val}")
    
    if metric.direction == "higher_is_better":
        normalized = ((raw_value - min_val) / (max_val - min_val)) * 100
    else:  # lower_is_better
        normalized = ((max_val - raw_value) / (max_val - min_val)) * 100
    
    # Clamp to [0, 100]
    return max(0.0, min(100.0, normalized))


def normalize_metrics(raw_metrics: Dict[str, float]) -> Dict[str, float]:
    """
    Normalize all 14 raw metrics to 0-100 scale.
    
    Args:
        raw_metrics: Dict with keys like "carbon_intensity", "lti_rate", etc.
    
    Returns:
        Dict with same keys, normalized values in [0, 100]
    """
    normalized = {}
    
    for metric_key, raw_value in raw_metrics.items():
        try:
            metric = get_metric(metric_key)
            normalized[metric_key] = normalize_value(raw_value, metric)
        except ValueError as e:
            # If metric not in registry, skip (will be validated elsewhere)
            continue
    
    return normalized
