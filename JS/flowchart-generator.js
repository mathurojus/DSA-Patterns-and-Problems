/**
 * Dynamic Flowchart Generator for DSA Problems
 * Generates flowcharts from pseudocode for Math Problems
 */

// Function to generate flowchart from algorithm steps
function generateFlowchart(problemData) {
  const { title, steps } = problemData;
  
  // Build Mermaid.js flowchart syntax
  let flowchartCode = 'graph TD\n';
  
  // Add start node
  flowchartCode += '    Start([Start])\n';
  
  // Process each step and create nodes
  steps.forEach((step, index) => {
    const nodeId = `step${index}`;
    const nextNodeId = index < steps.length - 1 ? `step${index + 1}` : 'End';
    
    // Determine node shape based on step type
    if (step.type === 'condition') {
      // Diamond for conditionals
      flowchartCode += `    ${nodeId}{${step.text}}\n`;
      flowchartCode += `    ${nodeId} -->|Yes| ${step.yesPath || nextNodeId}\n`;
      flowchartCode += `    ${nodeId} -->|No| ${step.noPath || nextNodeId}\n`;
    } else if (step.type === 'process') {
      // Rectangle for process steps
      flowchartCode += `    ${nodeId}[${step.text}]\n`;
      flowchartCode += `    ${nodeId} --> ${nextNodeId}\n`;
    } else if (step.type === 'input') {
      // Parallelogram for input
      flowchartCode += `    ${nodeId}[/${step.text}/]\n`;
      flowchartCode += `    ${nodeId} --> ${nextNodeId}\n`;
    } else if (step.type === 'output') {
      // Parallelogram for output
      flowchartCode += `    ${nodeId}[/${step.text}/]\n`;
      flowchartCode += `    ${nodeId} --> ${nextNodeId}\n`;
    }
  });
  
  // Add end node
  flowchartCode += '    End([End])\n';
  
  return flowchartCode;
}

// Function to render flowchart using Mermaid.js
function renderFlowchart(flowchartCode, containerId) {
  const container = document.getElementById(containerId);
  
  if (!container) {
    console.error('Container not found:', containerId);
    return;
  }
  
  // Create mermaid div
  const mermaidDiv = document.createElement('div');
  mermaidDiv.className = 'mermaid';
  mermaidDiv.textContent = flowchartCode;
  
  // Clear container and add new flowchart
  container.innerHTML = '';
  container.appendChild(mermaidDiv);
  
  // Initialize Mermaid if available
  if (typeof mermaid !== 'undefined') {
    mermaid.init(undefined, mermaidDiv);
  } else {
    console.error('Mermaid.js library not loaded');
  }
}

// Function to convert flowchart to PNG
function exportFlowchartToPNG(containerId) {
  const container = document.getElementById(containerId);
  
  if (!container) {
    console.error('Container not found:', containerId);
    return;
  }
  
  // Use html2canvas to convert to image
  if (typeof html2canvas !== 'undefined') {
    html2canvas(container).then(canvas => {
      // Convert canvas to blob and download
      canvas.toBlob(blob => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'flowchart.png';
        link.click();
        URL.revokeObjectURL(url);
      });
    });
  } else {
    console.error('html2canvas library not loaded');
  }
}

// Function to show flowchart in modal
function showFlowchartModal(flowchartCode) {
  // Create modal if it doesn't exist
  let modal = document.getElementById('flowchart-modal');
  
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'flowchart-modal';
    modal.className = 'flowchart-modal';
    modal.innerHTML = `
      <div class="flowchart-modal-content">
        <span class="flowchart-close">&times;</span>
        <div id="flowchart-display" class="flowchart-display"></div>
        <button id="download-flowchart" class="download-btn">Download PNG</button>
      </div>
    `;
    document.body.appendChild(modal);
    
    // Add close functionality
    const closeBtn = modal.querySelector('.flowchart-close');
    closeBtn.onclick = () => {
      modal.style.display = 'none';
    };
    
    // Add download functionality
    const downloadBtn = document.getElementById('download-flowchart');
    downloadBtn.onclick = () => {
      exportFlowchartToPNG('flowchart-display');
    };
    
    // Close on outside click
    window.onclick = (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };
  }
  
  // Render flowchart in modal
  modal.style.display = 'block';
  renderFlowchart(flowchartCode, 'flowchart-display');
}

// Initialize flowchart generator for Math Problems
function initializeFlowchartGenerator() {
  // Add "Get Flowchart" button to Math Problems card
  const mathCard = document.querySelector('.math-problems-card');
  
  if (mathCard) {
    const flowchartBtn = document.createElement('button');
    flowchartBtn.className = 'get-flowchart-btn';
    flowchartBtn.textContent = 'Get Flowchart';
    flowchartBtn.onclick = () => {
      // Sample Math Problem flowchart data
      const mathProblemData = {
        title: 'Math Problem Algorithm',
        steps: [
          { type: 'input', text: 'Input: n' },
          { type: 'process', text: 'Initialize result = 0' },
          { type: 'condition', text: 'Is n > 0?', yesPath: 'step3', noPath: 'End' },
          { type: 'process', text: 'Calculate operation' },
          { type: 'process', text: 'Update result' },
          { type: 'output', text: 'Output: result' }
        ]
      };
      
      const flowchartCode = generateFlowchart(mathProblemData);
      showFlowchartModal(flowchartCode);
    };
    
    mathCard.appendChild(flowchartBtn);
  }
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeFlowchartGenerator);
} else {
  initializeFlowchartGenerator();
}

// Export functions for external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    generateFlowchart,
    renderFlowchart,
    exportFlowchartToPNG,
    showFlowchartModal
  };
}
