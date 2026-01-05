import numpy as np
def reduce_features(x):
    return np.array([
        np.mean(x[:6]),
        np.mean(x[6:11]),
        np.mean(x[11:])
    ])

class BiometricModel:
    def __init__(self):
        self.mu = None
        self.var = None
        self.alpha = None

    def train(self, samples):
        X = np.array(samples, dtype=float)
        self.mu = X.mean(axis=0)
        self.var = X.var(axis=0) + 1e-6

        dists = [self.distance(x) for x in X]
        self.alpha = np.percentile(dists, 90)

    def distance(self, x):
        diff = x - self.mu
        return np.sqrt(np.sum((diff ** 2) / self.var))

    def score(self, x):
        d = self.distance(x)
        return 100 * np.exp(-d / self.alpha)
    
class HybridBiometricProfile:
    def __init__(self):
        self.coarse = BiometricModel()  # 3D
        self.fine = BiometricModel()    # 16D
        self.history = []

    def train(self, samples):
        # Train coarse model
        reduced = [reduce_features(x) for x in samples]
        self.coarse.train(reduced)

        # Train fine model
        self.fine.train(samples)

    def verify(self, attempt):
        # Coarse decision
        coarse_x = reduce_features(attempt)
        coarse_score = self.coarse.score(coarse_x) + 20

        if coarse_score < 60:
            return {
                "decision": "REJECT",
                "coarse_score": round(coarse_score, 2),
                "fine_score": None
            }

        # Fine monitoring
        fine_score = self.fine.score(np.array(attempt)) + 20
        self.history.append(fine_score)

        # Confidence decay
        penalty = np.std(self.history) * 0.5
        final_confidence = max(0, fine_score - penalty)

        return {
            "decision": "ACCEPT",
            "coarse_score": round(coarse_score, 2),
            "fine_score": round(fine_score, 2),
            "confidence": round(final_confidence, 2)
        }

enrollment_data = [
    [120, 98, 110, 102, 95, 88, 90, 100, 105, 99, 101, 97, 92, 94, 96, 98],
    [119, 97, 109, 101, 94, 87, 90, 99, 104, 98, 100, 96, 91, 93, 95, 97],
    [118, 97, 108, 100, 94, 86, 89, 98, 103, 97, 99, 95, 90, 92, 94, 96],
    [117, 96, 107, 100, 93, 86, 89, 97, 102, 96, 98, 94, 90, 92, 93, 95],
    [116, 96, 106, 99, 92, 85, 88, 96, 101, 95, 97, 94, 89, 91, 92, 94],
    [115, 95, 105, 99, 92, 85, 88, 95, 100, 95, 96, 93, 89, 91, 92, 93],
    [114, 95, 104, 98, 91, 84, 87, 95, 99, 94, 96, 92, 88, 90, 91, 92],
    [113, 94, 103, 97, 91, 84, 87, 94, 98, 93, 95, 92, 88, 90, 91, 92],
    [112, 94, 102, 97, 90, 83, 86, 93, 97, 93, 94, 91, 87, 89, 90, 91],
    [111, 93, 101, 96, 90, 83, 86, 92, 96, 92, 94, 90, 87, 89, 90, 90]
]


# profile = BiometricProfile()
# profile.train(enrollment_data)

# # New attempt
# attempt = [117, 96, 107, 100, 93, 86, 89, 97, 102, 96, 98, 94, 90, 92, 93, 95],

# score = profile.similarity_score(attempt)
# print("Similarity Score:", score)
profile = HybridBiometricProfile()
profile.train(enrollment_data)

attempt = [11, 96, 107, 100, 93, 86, 89, 97, 102, 96, 98, 94, 90, 92, 93, 95]

result = profile.verify(attempt)
print(result)