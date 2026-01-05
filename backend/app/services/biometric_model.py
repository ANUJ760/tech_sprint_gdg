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
        self.coarse = BiometricModel()
        self.fine = BiometricModel()
        self.history = []

    def train(self, samples):
        reduced = [reduce_features(x) for x in samples]
        self.coarse.train(reduced)
        self.fine.train(samples)

    def verify(self, attempt):
        coarse_x = reduce_features(attempt)
        coarse_score = self.coarse.score(coarse_x) + 35

        if coarse_score < 60:
            return {
                "decision": "REJECT",
                "coarse_score": round(coarse_score, 2),
                "fine_score": None
            }

        fine_score = self.fine.score(np.array(attempt)) + 35
        self.history.append(fine_score)

        penalty = np.std(self.history) * 0.5
        final_confidence = max(0, fine_score - penalty)

        return {
            "decision": "ACCEPT",
            "coarse_score": round(coarse_score, 2),
            "fine_score": round(fine_score, 2),
            "confidence": round(final_confidence, 2)
        }
