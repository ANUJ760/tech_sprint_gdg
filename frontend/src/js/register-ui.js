document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const passwordInput = document.getElementById('password');
    const strengthMeter = document.querySelector('.strength-meter');
    const strengthText = document.getElementById('strengthText');
    const passwordGroup = document.querySelector('.form-group:has(#password)');
    const biometricFeedback = document.getElementById('biometricFeedback');
    const submitButton = document.getElementById('submit');
    
    // Keystroke timing variables
    let lastKeyTime = 0;
    let keyPressCount = 0;
    let keystrokeTimings = [];
    const REQUIRED_KEYSTROKES = 10;
    
    // Show biometric feedback after first keystroke
    if (passwordInput) {
        passwordInput.addEventListener('keydown', function() {
            if (!biometricFeedback.classList.contains('active')) {
                biometricFeedback.classList.add('active');
            }
            
            // Animate the input on key press
            this.classList.add('keystroke-active');
            setTimeout(() => {
                this.classList.remove('keystroke-active');
            }, 300);
        });
        
        // Track keystroke dynamics
        passwordInput.addEventListener('keypress', function(e) {
            const currentTime = new Date().getTime();
            
            if (lastKeyTime > 0) {
                const timeBetweenKeys = currentTime - lastKeyTime;
                keystrokeTimings.push(timeBetweenKeys);
                keyPressCount++;
                
                // Update UI based on keystrokes
                if (keyPressCount >= 3) {
                    const keystrokeDynamicsEl = document.getElementById('keystrokeDynamics');
                    if (keystrokeDynamicsEl) {
                        keystrokeDynamicsEl.innerHTML = 
                            '<i class="fas fa-check-circle"></i><span>Keystroke dynamics captured</span>';
                        keystrokeDynamicsEl.classList.add('active');
                    }
                }
                
                if (keyPressCount >= 6) {
                    const typingRhythmEl = document.getElementById('typingRhythm');
                    if (typingRhythmEl) {
                        typingRhythmEl.innerHTML = 
                            '<i class="fas fa-check-circle"></i><span>Typing rhythm established</span>';
                        typingRhythmEl.classList.add('active');
                    }
                }
                
                // Enable submit button after enough keystrokes
                if (keyPressCount >= REQUIRED_KEYSTROKES && submitButton) {
                    submitButton.disabled = false;
                }
            }
            
            lastKeyTime = currentTime;
        });
        
        // Reset timer if user stops typing for 2 seconds
        let typingTimer;
        passwordInput.addEventListener('keyup', function() {
            clearTimeout(typingTimer);
            typingTimer = setTimeout(() => {
                // Reset timing if user pauses for too long
                if (keyPressCount > 0 && keyPressCount < REQUIRED_KEYSTROKES) {
                    const keystrokeDynamicsEl = document.getElementById('keystrokeDynamics');
                    if (keystrokeDynamicsEl) {
                        keystrokeDynamicsEl.innerHTML = 
                            '<i class="fas fa-exclamation-circle"></i><span>Keep typing to complete analysis</span>';
                    }
                }
            }, 2000);
        });
        
        // Password strength checker
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            let strength = 0;
            
            // Reset strength meter if empty
            if (password.length === 0) {
                if (strengthMeter) strengthMeter.style.width = '0%';
                if (passwordGroup) passwordGroup.className = 'form-group';
                if (strengthText) strengthText.textContent = 'Weak';
                return;
            }
            
            // Length check
            if (password.length >= 8) strength += 1;
            if (password.length >= 12) strength += 1;
            
            // Complexity checks
            if (password.match(/[a-z]+/)) strength += 1; // Lowercase
            if (password.match(/[A-Z]+/)) strength += 1; // Uppercase
            if (password.match(/[0-9]+/)) strength += 1; // Numbers
            if (password.match(/[!@#$%^&*(),.?":{}|<>]+/)) strength += 1; // Special chars
            
            // Update UI based on strength
            if (strength <= 2) {
                // Weak
                if (strengthMeter) {
                    strengthMeter.style.width = '33%';
                    strengthMeter.style.backgroundColor = '#ef4444';
                }
                if (passwordGroup) passwordGroup.className = 'form-group strength-weak';
                if (strengthText) strengthText.textContent = 'Weak';
            } else if (strength <= 4) {
                // Medium
                if (strengthMeter) {
                    strengthMeter.style.width = '66%';
                    strengthMeter.style.backgroundColor = '#f59e0b';
                }
                if (passwordGroup) passwordGroup.className = 'form-group strength-medium';
                if (strengthText) strengthText.textContent = 'Medium';
            } else {
                // Strong
                if (strengthMeter) {
                    strengthMeter.style.width = '100%';
                    strengthMeter.style.backgroundColor = '#10b981';
                }
                if (passwordGroup) passwordGroup.className = 'form-group strength-strong';
                if (strengthText) strengthText.textContent = 'Strong';
            }
        });
    }
    
    // Form submission
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the registration data to your server
            const formData = {
                name: document.getElementById('fullName')?.value,
                email: document.getElementById('email')?.value,
                password: document.getElementById('password')?.value,
                biometricData: keystrokeTimings // In a real app, you'd process this securely
            };
            
            console.log('Registration data:', formData);
            
            // Show success message
            alert('Registration successful! Your biometric profile has been created.');
        });
    }
});
