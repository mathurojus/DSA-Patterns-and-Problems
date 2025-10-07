
document.addEventListener('DOMContentLoaded', function() {
  const flowchartButtons = document.querySelectorAll('.fc-button');

  flowchartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const container = this.closest('.fc-container');
      const flowchartImage = container.querySelector('.fc-image');
      if (!flowchartImage) return;

      // Get visibility state (default = false)
      const isVisible = flowchartImage.dataset.visible === 'true';

      if (isVisible) {
        // Hide image
        flowchartImage.style.display = 'none';
        flowchartImage.dataset.visible = 'false';
        this.textContent = 'View Flowchart';
      } else {
        // Show image
        flowchartImage.style.display = 'block';
        flowchartImage.dataset.visible = 'true';
        this.textContent = 'Hide Flowchart';
      }
    });
  });
});