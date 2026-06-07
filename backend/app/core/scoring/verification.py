"""
Document verification pipeline - Cross-check extracted values against submissions
"""
from typing import Dict, Any, Tuple, List


class VerificationEngine:
    """
    Implements the verification pipeline from SCORING.md.
    
    Process:
    1. PENDING → documents uploaded
    2. Extract values from documents
    3. Compare extracted vs submitted within tolerance
    4. If within tolerance → SYSTEM_VERIFIED
    5. If outside tolerance → FLAGGED_FOR_OFFICER
    6. Officer reviews flagged fields
    7. All fields SYSTEM_VERIFIED or OFFICER_VERIFIED or OFFICER_REJECTED
    8. Submission status → CROSS_CHECKED
    """
    
    # Tolerance rules from SCORING.md
    TOLERANCE_RULES = {
        "percentage": 2,  # ±2 percentage points
        "continuous": 5,   # ±5% of submitted value
        "exact": 0,        # Exact match required
    }
    
    # Accepted document types per metric
    ACCEPTED_DOCUMENTS = {
        # Environmental
        "carbon_intensity": ["audited_carbon_report", "iso_14064_cert", "cea_annual_return"],
        "renewable_energy_pct": ["ceb_leco_invoices", "solar_cert", "energy_audit"],
        "waste_management_score": ["cea_licence", "disposal_manifest", "iso_14001_cert"],
        "water_efficiency_score": ["water_authority_report", "nwsdb_benchmark"],
        "env_violations": ["cea_compliance_cert"],
        
        # Social
        "lti_rate": ["labour_accident_register", "dosh_report"],
        "fair_labour_score": ["labour_compliance_cert", "internal_policy"],
        "community_investment_pct": ["audited_financial_statements", "csr_report"],
        "data_protection_score": ["pdpa_cert", "iso_27001_cert"],
        
        # Governance
        "board_independence_pct": ["annual_report", "companies_registry_filing"],
        "board_gender_diversity_pct": ["annual_report", "companies_registry_filing"],
        "anti_corruption_score": ["anti_corruption_policy", "training_records"],
        "regulatory_violations": ["cbsl_clearance", "sec_clearance"],
        "financial_transparency_score": ["audited_financials", "gri_index", "cbsl_return"],
    }
    
    @staticmethod
    def check_tolerance(
        submitted_value: float,
        extracted_value: float,
        metric_key: str,
        tolerance_type: str = "percentage"
    ) -> bool:
        """
        Check if extracted value is within tolerance of submitted value.
        
        Args:
            submitted_value: Value from submission form
            extracted_value: Value extracted from document
            metric_key: Key of the metric (for reference)
            tolerance_type: "percentage", "continuous", or "exact"
        
        Returns:
            True if within tolerance, False otherwise
        """
        if submitted_value is None or extracted_value is None:
            return False
        
        if tolerance_type == "exact":
            return submitted_value == extracted_value
        
        elif tolerance_type == "percentage":
            # ±2 percentage points for percentages
            tolerance = VerificationEngine.TOLERANCE_RULES["percentage"]
            return abs(submitted_value - extracted_value) <= tolerance
        
        elif tolerance_type == "continuous":
            # ±5% of submitted value for continuous metrics
            tolerance_pct = VerificationEngine.TOLERANCE_RULES["continuous"]
            tolerance = (tolerance_pct / 100) * abs(submitted_value)
            return abs(submitted_value - extracted_value) <= tolerance
        
        else:
            raise ValueError(f"Unknown tolerance type: {tolerance_type}")
    
    @staticmethod
    def determine_tolerance_type(metric_key: str) -> str:
        """
        Determine tolerance type for a metric.
        
        From SCORING.md tolerance rules:
        - Percentages: ±2%
        - Continuous values: ±5%
        - Integer counts: Exact
        - Scores 0-5: Exact
        """
        percentage_metrics = [
            "renewable_energy_pct",
            "board_independence_pct",
            "board_gender_diversity_pct",
            "community_investment_pct",
        ]
        
        continuous_metrics = [
            "carbon_intensity",
            "lti_rate",
        ]
        
        if metric_key in percentage_metrics:
            return "percentage"
        elif metric_key in continuous_metrics:
            return "continuous"
        else:
            return "exact"
    
    @staticmethod
    def verify_field(
        submitted_value: float,
        extracted_value: float,
        metric_key: str,
    ) -> Tuple[str, str]:
        """
        Verify a single field.
        
        Returns:
            (status, reason)
            status: "SYSTEM_VERIFIED" or "FLAGGED_FOR_OFFICER"
            reason: Human-readable explanation
        """
        tolerance_type = VerificationEngine.determine_tolerance_type(metric_key)
        
        if VerificationEngine.check_tolerance(
            submitted_value, extracted_value, metric_key, tolerance_type
        ):
            return "SYSTEM_VERIFIED", f"Value matches within {tolerance_type} tolerance"
        else:
            return (
                "FLAGGED_FOR_OFFICER",
                f"Value mismatch: submitted {submitted_value}, extracted {extracted_value}"
            )
    
    @staticmethod
    def apply_cross_metric_consistency_checks(normalized_metrics: Dict[str, float]) -> List[Dict[str, str]]:
        """
        Apply cross-metric consistency rules from SCORING.md.
        
        Returns:
            List of flags (empty if all consistent)
        
        Example flags:
        - "Full renewable claim inconsistent with high carbon intensity"
        - "Active violation present — maximum waste score is not credible"
        """
        flags = []
        
        # Rule 1: 100% renewable + high carbon intensity
        renewable = normalized_metrics.get("renewable_energy_pct", 0)
        carbon = normalized_metrics.get("carbon_intensity", 0)
        
        if renewable == 100 and carbon > 40:  # High carbon (norm score)
            flags.append({
                "type": "renewable_carbon_inconsistency",
                "message": "Full renewable claim inconsistent with high carbon intensity — verify carbon methodology",
                "severity": "warning",
            })
        
        # Rule 2: Active env violation + maximum waste score
        env_violations = normalized_metrics.get("env_violations", 0)
        waste_score = normalized_metrics.get("waste_management_score", 0)
        
        if env_violations > 0 and waste_score == 100:
            flags.append({
                "type": "violation_waste_inconsistency",
                "message": "Active violation present — maximum waste score is not credible without explanation",
                "severity": "warning",
            })
        
        # Rule 3: Maximum labour score + high injury rate
        labour_score = normalized_metrics.get("fair_labour_score", 0)
        lti_rate = normalized_metrics.get("lti_rate", 0)
        
        if labour_score == 100 and lti_rate > 50:  # High injury rate (norm score)
            flags.append({
                "type": "labour_injury_inconsistency",
                "message": "Maximum labour score inconsistent with high injury rate",
                "severity": "warning",
            })
        
        # Rule 4: Active regulatory violation + maximum anti-corruption score
        regulatory_violations = normalized_metrics.get("regulatory_violations", 0)
        anti_corruption = normalized_metrics.get("anti_corruption_score", 0)
        
        if regulatory_violations > 0 and anti_corruption == 100:
            flags.append({
                "type": "regulatory_corruption_inconsistency",
                "message": "Active regulatory violation present — maximum anti-corruption score requires officer review",
                "severity": "warning",
            })
        
        return flags
