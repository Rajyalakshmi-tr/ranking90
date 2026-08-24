// Set the launch date - December 11, 2026
const launchDate = new Date('December 11, 2026 00:00:00').getTime();

// Update countdown every second
const countdownInterval = setInterval(function() {
    // Get current date and time
    const now = new Date().getTime();
    
    // Calculate the distance between now and launch date
    const distance = launchDate - now;
    
    // Calculate days, hours, minutes, seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Update the countdown elements
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    
    // If countdown is finished, display a message
    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById('countdown').innerHTML = '<p style="font-size: 1.5rem;">We are live!</p>';
    }
}, 1000);

// Handle email form submission
document.querySelector('.email-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    alert('Thank you for subscribing! We will notify you at: ' + email);
    this.reset();
});