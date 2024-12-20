document.addEventListener('DOMContentLoaded', function() {
    function drawAxes(ctx, width, height) {
        const padding = 30; // Space for labels

        // Draw axes
        ctx.beginPath();
        ctx.moveTo(width/2, padding);
        ctx.lineTo(width/2, height-padding);
        ctx.moveTo(padding, height/2);
        ctx.lineTo(width-padding, height/2);
        ctx.strokeStyle = '#000';
        ctx.stroke();

        // Add labels
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#000';
        ctx.fillText('β₁', width-15, height/2-5);
        ctx.fillText('β₂', width/2+15, padding+15);
    }
    function drawContours(ctx, width, height, scale) {
    const centerX = width/2;
    const centerY = height/2;
    
    // Draw several elliptical contours centered at (30, -40) relative to origin
    for(let r = 0.5; r <= 2; r += 0.5) {
        ctx.beginPath();
        // Make ellipses with different x and y radii, and offset center
        ctx.ellipse(centerX + 30, centerY - 40, r*scale*0.9, r*scale*0.6, 0, 0, 2*Math.PI);
        ctx.strokeStyle = 'rgba(100, 100, 150, 0.8)'; // Darker gray
        ctx.stroke();
    }
    }
    function drawL1Constraint(canvas, t) {
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const scale = 80;
        
        ctx.clearRect(0, 0, width, height);
        drawAxes(ctx, width, height);
        drawContours(ctx, width, height, scale);
        
        ctx.beginPath();
        ctx.moveTo(width/2 + t*scale, height/2);
        ctx.lineTo(width/2, height/2 - t*scale);
        ctx.lineTo(width/2 - t*scale, height/2);
        ctx.lineTo(width/2, height/2 + t*scale);
        ctx.closePath();
        
        ctx.fillStyle = 'rgba(0, 123, 255, 0.2)';
        ctx.fill();
        ctx.strokeStyle = '#0056b3';
        ctx.stroke();
    }

    function drawL2Constraint(canvas, t) {
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const scale = 80;
        
        ctx.clearRect(0, 0, width, height);
        drawAxes(ctx, width, height);
        drawContours(ctx, width, height, scale);
        
        ctx.beginPath();
        ctx.arc(width/2, height/2, t*scale, 0, 2*Math.PI);
        
        ctx.fillStyle = 'rgba(40, 167, 69, 0.2)';
        ctx.fill();
        ctx.strokeStyle = '#198754';
        ctx.stroke();
    }

    // Setup slider interaction
    const slider = document.getElementById('tSlider');
    const tValue = document.getElementById('tValue');
    const l1Canvas = document.getElementById('l1Canvas');
    const l2Canvas = document.getElementById('l2Canvas');

    if (slider && tValue && l1Canvas && l2Canvas) {
        slider.oninput = function() {
            const t = parseFloat(this.value);
            tValue.textContent = t.toFixed(1);
            drawL1Constraint(l1Canvas, t);
            drawL2Constraint(l2Canvas, t);
        }

        // Initial draw
        drawL1Constraint(l1Canvas, 1);
        drawL2Constraint(l2Canvas, 1);
    }
});