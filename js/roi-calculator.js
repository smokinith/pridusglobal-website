// ROI Calculator for Why Us page
function calculateROI() {
    const salary = parseInt(document.getElementById('salary').value) || 120000;
    const hires = parseInt(document.getElementById('hires').value) || 3;
    
    // Traditional agency costs (15-25% of salary)
    const traditionalLow = Math.round((salary * 0.15) * hires);
    const traditionalHigh = Math.round((salary * 0.25) * hires);
    
    // Pridus Global costs (Tier 2-4 range)
    const pridusLow = 1500 * hires; // Tier 2
    const pridusHigh = 6000 * hires; // Tier 4
    
    // Savings
    const savingsLow = traditionalHigh - pridusHigh;
    const savingsHigh = traditionalHigh - pridusLow;
    
    // Savings percentage
    const savingsPercentLow = Math.round((savingsLow / traditionalHigh) * 100);
    const savingsPercentHigh = Math.round((savingsHigh / traditionalHigh) * 100);
    
    // Update UI
    document.getElementById('traditionalCost').textContent = 
        `$${traditionalLow.toLocaleString()} - $${traditionalHigh.toLocaleString()}`;
    
    document.getElementById('pridusCost').textContent = 
        `$${pridusLow.toLocaleString()} - $${pridusHigh.toLocaleString()}`;
    
    document.getElementById('savings').textContent = 
        `$${savingsLow.toLocaleString()} - $${savingsHigh.toLocaleString()}`;
    
    document.getElementById('savingsPercent').textContent = 
        `${savingsPercentLow}-${savingsPercentHigh}%`;
}

// Calculate on page load
if (document.getElementById('salary')) {
    calculateROI();
}
