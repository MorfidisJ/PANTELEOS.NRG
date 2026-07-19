/**
 * PANTELEOS.NRG — Architectural Background Grid Engine
 * Rounded, floaty, fluid & bouncy background matrix with electric neon accents.
 * Serves as the global background for light theme sections without grabbing attention.
 */
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('bg-canvas') || document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let animId;
  let time = 0;

  // Configuration for fluid, floaty, rounded architectural aesthetic with neon power
  const GRID_SIZE = 55;
  const WARP_RADIUS = 160;
  const WARP_FORCE = 8.5;
  const SPRING_K = 0.045;
  const DAMPING = 0.86;

  let mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };
  let gridNodes = [];
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initGrid();
    if (prefersReducedMotion.matches || document.hidden) {
      draw();
    }
  }

  function initGrid() {
    gridNodes = [];
    const cols = Math.ceil(width / GRID_SIZE) + 2;
    const rows = Math.ceil(height / GRID_SIZE) + 2;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c - 1) * GRID_SIZE;
        const y = (r - 1) * GRID_SIZE;
        gridNodes.push({
          baseX: x,
          baseY: y,
          x: x,
          y: y,
          vx: 0,
          vy: 0,
          col: c,
          row: r
        });
      }
    }
  }

  // Listen to window mousemove so it works seamlessly behind pointer-events: none
  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.targetX = -1000;
    mouse.targetY = -1000;
  });

  window.addEventListener('resize', () => {
    resize();
  });

  function update() {
    time += 0.02;

    // Smooth cursor interpolation
    mouse.x += (mouse.targetX - mouse.x) * 0.12;
    mouse.y += (mouse.targetY - mouse.y) * 0.12;

    gridNodes.forEach(node => {
      // Gentle organic floating sine wave displacement
      const floatX = Math.cos(time + node.row * 0.35) * 2.5;
      const floatY = Math.sin(time + node.col * 0.35 + node.row * 0.2) * 3.5;
      
      const targetX = node.baseX + floatX;
      const targetY = node.baseY + floatY;

      // Calculate distance to mouse
      const dx = mouse.x - node.x;
      const dy = mouse.y - node.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Apply bouncy warp repulsion force when cursor is close
      if (dist < WARP_RADIUS && dist > 0.1) {
        const force = Math.pow(1 - dist / WARP_RADIUS, 2) * WARP_FORCE;
        const angle = Math.atan2(dy, dx);
        node.vx -= Math.cos(angle) * force * 0.18;
        node.vy -= Math.sin(angle) * force * 0.18;
      }

      // Spring back to floating architectural coordinates with fluid bounce
      const springX = (targetX - node.x) * SPRING_K;
      const springY = (targetY - node.y) * SPRING_K;

      node.vx = (node.vx + springX) * DAMPING;
      node.vy = (node.vy + springY) * DAMPING;

      node.x += node.vx;
      node.y += node.vy;
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    const cols = Math.ceil(width / GRID_SIZE) + 2;
    const rows = Math.ceil(height / GRID_SIZE) + 2;

    // Draw subtle, fluid architectural grid lines
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(22, 26, 34, 0.045)';
    ctx.lineWidth = 1;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const idx = r * cols + c;
        const node = gridNodes[idx];
        if (!node) continue;

        // Connect to right neighbor with soft line
        if (c < cols - 1) {
          const rightNode = gridNodes[idx + 1];
          if (rightNode) {
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(rightNode.x, rightNode.y);
          }
        }

        // Connect to bottom neighbor
        if (r < rows - 1) {
          const bottomNode = gridNodes[idx + cols];
          if (bottomNode) {
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(bottomNode.x, bottomNode.y);
          }
        }
      }
    }
    ctx.stroke();

    // Draw rounded, floating intersection node points with clean architectural reactivity
    gridNodes.forEach(node => {
      const dx = mouse.x - node.x;
      const dy = mouse.y - node.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      const isNear = dist < WARP_RADIUS * 0.8;
      
      if (isNear) {
        const intensity = 1 - (dist / (WARP_RADIUS * 0.8));
        // Clean architectural cyan dot without blurry AI-style glowing halos
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.4 + (1.2 * intensity), 0, Math.PI * 2);
        ctx.fillStyle = '#00CED1';
        ctx.fill();
      } else {
        // Normal subtle architectural dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(22, 26, 34, 0.08)';
        ctx.fill();
      }
    });
  }

  let isPaused = false;

  function animate() {
    if (isPaused || prefersReducedMotion.matches) return;
    update();
    draw();
    animId = requestAnimationFrame(animate);
  }

  function startAnimation() {
    if (prefersReducedMotion.matches) {
      draw();
      return;
    }
    if (!animId && !isPaused && !document.hidden) {
      animate();
    }
  }

  function stopAnimation() {
    if (animId) {
      cancelAnimationFrame(animId);
      animId = null;
    }
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      isPaused = true;
      stopAnimation();
    } else {
      isPaused = false;
      startAnimation();
    }
  });

  if (typeof prefersReducedMotion.addEventListener === 'function') {
    prefersReducedMotion.addEventListener('change', () => {
      if (prefersReducedMotion.matches) {
        stopAnimation();
        draw();
      } else {
        startAnimation();
      }
    });
  }

  resize();
  startAnimation();
});
