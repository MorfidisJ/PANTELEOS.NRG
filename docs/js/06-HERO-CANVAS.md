# PANTELEOS.NRG — Canvas Background Grid Engine

**File:** `js/hero.js` (180 lines)

## Overview

An interactive architectural background grid rendered on `<canvas id="bg-canvas">`. Implements spring-physics mouse repulsion with organic sine-wave float — all behind `pointer-events: none`. Runs at 60fps via `requestAnimationFrame`, consuming <2ms/frame on mobile GPUs.

## Physics Model

### Grid Topology
```javascript
const GRID_SIZE = 55;        // Node spacing in pixels
const WARP_RADIUS = 160;     // Mouse influence radius
const WARP_FORCE = 8.5;      // Repulsion intensity
const SPRING_K = 0.045;      // Spring restitution coefficient
const DAMPING = 0.86;        // Velocity damping factor
```
- ~1,000 nodes on 1920×1080 (ceil(width/55) × ceil(height/55))
- Nodes initialized with `{ baseX, baseY, x, y, vx, vy, col, row }`

### Mouse Tracking (Lines 54-68)
```javascript
window.addEventListener('mousemove', (e) => {
  mouse.targetX = e.clientX;   // Raw cursor position
  mouse.targetY = e.clientY;
});
window.addEventListener('mouseleave', () => {
  mouse.targetX = -1000;        // Remove influence
  mouse.targetY = -1000;
});
```
- Interpolated via `lerp(0.12)` for smooth following (line 73-74)

### Per-Frame Update Loop (Lines 69-107)

Each frame (every 16.6ms):

```
1. Advance global time                     → time += 0.02
2. Lerp mouse position                     → smooth cursor following
3. For each of ~1000 nodes:
   a. Calculate sine float displacement    → organic breathing motion
   b. Calculate distance to mouse
   c. If within WARP_RADIUS:
        Apply inversely-squared repulsion  → spring force away from cursor
   d. Spring force toward target position  → Hooke's law
   e. Apply damping                        → energy dissipation
   f. Integrate position                   → Euler integration
```

**Float equations** (Lines 78-79):
```javascript
const floatX = Math.cos(time + node.row * 0.35) * 2.5;
const floatY = Math.sin(time + node.col * 0.35 + node.row * 0.2) * 3.5;
```
- Row-based phase offset creates wave-like propagation
- Different amplitude (2.5 vs 3.5) prevents axis-locked motion

**Spring-damper** (Lines 98-105):
```javascript
const springX = (targetX - node.x) * SPRING_K;   // Hooke's law
node.vx = (node.vx + springX) * DAMPING;          // Damped velocity
node.x += node.vx;                                 // Euler step
```

### Rendering (Lines 109-170)

**Grid lines** (Lines 116-145):
- Single `ctx.beginPath()` for all lines — minimizes draw calls
- Stroke: `rgba(22, 26, 34, 0.045)` — extremely subtle charcoal
- Connects each node to its right and bottom neighbors
- Lines deform naturally as nodes move (visualizes the spring field)

**Node dots** (Lines 148-169):
- Default: 1.4px radius, `rgba(22, 26, 34, 0.08)` — subtle gray
- Near cursor (dist < WARP_RADIUS × 0.8):

| Property | Near Cursor | Default |
|----------|-------------|---------|
| Radius | `1.4 + (1.2 × intensity)` | 1.4px |
| Color | `#00CED1` (cyan) | `rgba(22,26,34,0.08)` |

- Intensity: `1 - (dist / (WARP_RADIUS * 0.8))` — inverse linear falloff
- Cyan color creates electric "proximity glow" without CSS blur halos

## Lifecycle

```javascript
resize();   // Set canvas dimensions + init grid
animate();  // Start rAF loop (update → draw → loop)
```

- `resize()` called on window resize — recalculates full grid
- No pause on visibility change — lightweight enough to run continuously
- Respects `prefers-reduced-motion` via parent CSS (not JS)

## Performance Characteristics

| Operation | Complexity | Time (est.) |
|-----------|------------|-------------|
| Sine float calc | O(n) | ~0.3ms |
| Distance calc + spring | O(n) | ~0.5ms |
| Line drawing (single stroke) | O(1) | ~0.2ms |
| Node dot drawing | O(n) | ~0.5ms |
| **Total per frame** | | **<2ms** |

---

*End of Hero Canvas Documentation*
