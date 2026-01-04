from config import KEYSTROKE_SAMPLE_COUNT

def validate_sample_count(samples):
    if len(samples) != KEYSTROKE_SAMPLE_COUNT:
        raise ValueError("Exactly 10 keystroke samples required")
