import asyncio
from app.api.v1.database import get_async_db
from app.api.v1.models import Question

ESG_QUESTIONS = [
    # ── Environmental ──────────────────────────────────────────
    Question(
        question_text="What percentage of your total energy consumption comes from renewable sources (solar, wind, hydro, etc.)?",
        category="E",
        weight=1.0,
    ),
    Question(
        question_text="How does your organisation manage waste? Please rate your waste management practices on a scale of 0–5 based on GRI 306 (0 = no programme, 5 = full circular-economy practices with third-party verification).",
        category="E",
        weight=1.0,
    ),
    Question(
        question_text="How does your water consumption compare to your industry benchmark? Please provide a score of 0–5 (0 = significantly above benchmark, 5 = best-in-class efficiency with recycling/reuse programmes).",
        category="E",
        weight=1.0,
    ),
    Question(
        question_text="How many environmental compliance violations has your organisation received in the last 3 years? (Enter a number; any value above 0 will cap your Environmental score at 30.)",
        category="E",
        weight=1.0,
    ),

    # ── Social ─────────────────────────────────────────────────
    Question(
        question_text="How well does your organisation adhere to ILO Core Labour Standards (fair wages, no child/forced labour, freedom of association)? Rate 0–5 (0 = no policy, 5 = fully certified & audited).",
        category="S",
        weight=1.0,
    ),
    Question(
        question_text="How compliant is your organisation with the Personal Data Protection Act (PDPA) of Sri Lanka? Rate 0–5 (0 = no data protection policy, 5 = fully compliant with DPO appointed & annual audits).",
        category="S",
        weight=1.0,
    ),

    # ── Governance ─────────────────────────────────────────────
    Question(
        question_text="What percentage of your board of directors are independent non-executive directors?",
        category="G",
        weight=1.0,
    ),
    Question(
        question_text="How robust is your organisation's anti-corruption policy per CBSL Direction No. 11? Rate 0–5 (0 = no policy, 5 = policy published, training conducted, whistleblower mechanism active & independently audited).",
        category="G",
        weight=1.0,
    ),
    Question(
        question_text="How would you rate your financial transparency and reporting quality? Rate 0–5 (0 = no public disclosures, 5 = full IFRS-compliant reports with external audit & integrated ESG reporting).",
        category="G",
        weight=1.0,
    ),
]


async def seed():
    async for db in get_async_db():
        from sqlalchemy.future import select
        result = await db.execute(select(Question))
        existing = result.scalars().all()

        if len(existing) == 0:
            db.add_all(ESG_QUESTIONS)
            await db.commit()
            print(f"✅ Seeded {len(ESG_QUESTIONS)} ESG questions.")
        else:
            print(f"⚠️  Questions already exist ({len(existing)} rows). Skipping seed.")
        break


if __name__ == "__main__":
    asyncio.run(seed())