import csv
import io
import math

def keystroke_to_vector(sample):
    """
    Converts keystroke events to numeric vector (dwell times)
    """
    return [
        event["release_time"] - event["press_time"]
        for event in sample
    ]

def average_vectors(vectors):
    return [sum(col)/len(col) for col in zip(*vectors)]

def euclidean_distance(v1, v2):
    return math.sqrt(sum((a - b) ** 2 for a, b in zip(v1, v2)))

def save_csv(bucket, path, sample):
    buffer = io.StringIO()
    writer = csv.writer(buffer)
    writer.writerow(["key", "press_time", "release_time"])

    for e in sample:
        writer.writerow([e["key"], e["press_time"], e["release_time"]])

    blob = bucket.blob(path)
    blob.upload_from_string(buffer.getvalue(), content_type="text/csv")
