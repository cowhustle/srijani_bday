let highestZ = 1;
const papers = Array.from(document.querySelectorAll('.paper'));

class Paper {
  holdingPaper = false;
  startX = 0;
  startY = 0;
  currentX = 0;
  currentY = 0;
  rotation = 0;

  init(paper) {
    // Touch Start
    paper.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.holdingPaper = true;
      paper.style.zIndex = highestZ++;
      
      const touch = e.touches[0];
      this.startX = touch.clientX - this.currentX;
      this.startY = touch.clientY - this.currentY;
    });

    // Touch Move
    document.addEventListener('touchmove', (e) => {
      if (!this.holdingPaper) return;
      e.preventDefault();
      
      const touch = e.touches[0];
      this.currentX = touch.clientX - this.startX;
      this.currentY = touch.clientY - this.startY;
      
      // Add slight rotation when dragging
      this.rotation = (this.currentX * 0.2);
      
      paper.style.transform = `
        translateX(${this.currentX}px) 
        translateY(${this.currentY}px) 
        rotateZ(${this.rotation}deg)
      `;
    }, { passive: false });

    // Touch End
    document.addEventListener('touchend', () => {
      this.holdingPaper = false;
    });
  }
}

// Initialize papers in a neat stack (centered)
window.addEventListener('load', () => {
  const centerX = window.innerWidth / 2 - 150; // Adjust based on paper width
  const startY = window.innerHeight * 0.3; // Start stack at 30% from top
  
  papers.forEach((paper, index) => {
    const p = new Paper();
    p.init(paper);
    
    // Stack papers with slight offset (like a notepad)
    const offsetY = index * 20; // 20px vertical gap between papers
    paper.style.position = 'absolute';
    paper.style.left = `${centerX}px`;
    paper.style.top = `${startY}px`;
    paper.style.transform = `translateY(${offsetY}px) rotateZ(0deg)`;
    paper.style.transition = 'transform 0.2s ease';
  });
});

// Optional: Auto-Drag Button for mobile
document.getElementById('autoDragButton').addEventListener('click', () => {
  const topPaper = papers[papers.length - 1];
  const posX = Math.random() * (window.innerWidth - 300);
  const posY = Math.random() * (window.innerHeight - 300);
  
  topPaper.style.transition = 'transform 0.8s ease';
  topPaper.style.transform = `
    translateX(${posX}px) 
    translateY(${posY}px) 
    rotateZ(${Math.random() * 20 - 10}deg)
  `;
  
  // Move the paper to bottom of array after dragging
  papers.unshift(papers.pop());
});
