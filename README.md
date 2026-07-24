# Xai — Intelligence Workspace

A single-page interactive product experience built for the Xai frontend
challenge. It visually narrates: **raw data → structured intelligence →
actionable insight → AI automations**, using 3D particle systems, scroll-driven
choreography, and a mock product dashboard.

## Live demo & video

- Live URL: https://xai-intelligence-workspace-live.vercel.app/
- Figma: https://uxpilot.ai/s/adae2f13c0e8a807b7a87ef3946253f2

## Tech stack

| Concern             | Tool                                | Why                                                                                 |
| ------------------- | ----------------------------------- | ----------------------------------------------------------------------------------- |
| Framework           | Next.js 14 (App Router)             | File-based routing, server components where useful, fast dev loop                   |
| Styling             | Tailwind CSS                        | Consistent spacing/type scale, fast iteration on a dark, restrained palette         |
| 3D                  | React Three Fiber + drei + three.js | Declarative Three.js that fits naturally into React's component model               |
| Scroll choreography | GSAP + ScrollTrigger                | Precise, scrubbed timelines for the pinned Insight Flow section                     |
| UI motion           | Framer Motion                       | Entrance animations, layout animations (tab highlight), AnimatePresence transitions |

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

To build for production:

```bash
npm run build
npm start
```

## Project structure

```
app/
  layout.tsx                     Root layout, fonts, metadata
  page.tsx                       Composes all sections in order
  globals.css                    Design tokens (colors, grain overlay, glass panel utility)

lib/
  scrollStore.ts                 Shared scroll state

components/
  layout/
    Navbar.tsx                   Fixed nav, fades in on load
    Footer.tsx

  canvas/
    ParticleField.tsx            3D particle field, scroll-driven choreography
    Scene.tsx                    R3F scene: particle field

  features/
    dashboard/
      Dashboard.tsx              Mock product UI: sidebar, tabs, table, cards
      NavCart.tsx                Dashboard navigation card
      OverviewTab.tsx            Interactive overview tab
      SignalsTab.tsx             Interactive signals tab
      AnimationTab.tsx           Interactive automations tab
      SingnalTable.tsx           Interactive signal table
      TrendChart.tsx             Interactive trend chart

    hero/
      Hero.tsx                   hero wrapper, headline choreography

    insight-flow/
      InsightFlow.tsx            GSAP ScrollTrigger pinned 3-stage explainer

    signature/
      SignatureInteraction.tsx   Wrapper + trigger button for the "wow moment"
      SignatureScene.tsx         R3F scene: data points that cluster on demand
      DataMesh.tsx               Compute graph edges from nearest-neighbor distances
```

## Key animation & interaction decisions

**Hero — a knowledge graph forming, not a grid.** `Scene.tsx` computes two
literal states per node: a noisy volumetric cloud (raw, disconnected data) and
a small-world node layout (topic clusters with local scatter). It then
precomputes real graph edges from nearest-neighbor distances in the structured
layout, and only fades edges in during the back half of the scroll transition
— so the reveal reads as "connections forming," not "shapes rearranging."
That's a more accurate metaphor for an intelligence product than a flat grid:
the point isn't that data becomes _organized_, it's that it becomes
_connected_. A secondary cursor-driven ripple keeps the graph feeling alive
once it resolves.

**Insight Flow — pinned, scrubbed stages.** This section pins itself for the
duration of three stages and scrubs between them with GSAP's ScrollTrigger,
rather than using individual fade-ins per stage. Scrubbing (vs. a fixed-duration
tween) keeps the section directly under the user's scroll input, which reads as
more "product" and less "marketing site." Framer Motion's `AnimatePresence`
handles the lighter-weight copy/microchart swap on the right side, since that
content doesn't need frame-perfect scroll coupling.

**Dashboard — restraint over decoration.** The dashboard intentionally uses
real UI patterns (sidebar nav with a `layoutId`-animated active-state pill,
a data table with per-row confidence bars) instead of illustrative "cards."
The goal was to make it look like a product screenshot, not a landing-page
graphic.

**Signature interaction — tracing a real path through a real graph.** The "wow
moment" builds an organic node mesh (each node connected to its 3 nearest
neighbors) and runs an actual breadth-first search across it to find one
shortest path between two distant nodes. Triggering the automation doesn't
just rearrange points — it dims every edge except that computed path, which
lights up in a second accent color (teal) with a traveling reveal. This is a
literal dramatization of the product's core claim: Xai finds the one thread of
causality inside a mesh of raw connections. A separate parallax rig rotates the
whole scene based on pointer position, kept independent from the path
animation so the two motions read as distinct: what you triggered vs. ambient
depth.

**Micro-interactions.** Two places specifically
needed hover/focus/transition treatment beyond scroll-driven animation:

- _Insight Flow_ stage buttons now have a hover state independent of the
  scroll-active state (a sliding highlight pill, a color shift, and a
  sliding arrow that reveals on hover or keyboard focus), plus
  `focus-visible` rings for keyboard users. The segmented progress dots
  above the detail panel show a stage-name tooltip on hover.
- _Dashboard_ — the trend chart tracks pointer position and renders a
  live tooltip with a dashed guide line and a highlighted point (a real
  chart interaction, not just a static image); summary cards lift and gain
  an accent border on hover; sidebar tabs get a hover tint in addition to
  their active state.
