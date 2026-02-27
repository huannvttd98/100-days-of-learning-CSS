# 3D Page Curl WebGL (8 Directions)

## Overview

This project implements a **3D Page Curl effect** using WebGL with
directional snapping to **8 primary directions**.

The page: - Uses real mesh deformation (vertex manipulation) - Snaps to
8 directions (N, S, E, W, NE, NW, SE, SW) - Supports mouse and touch
input - Includes lighting, shading, and shadow - Optimized for 60 FPS
desktop and mobile - Designed to be production-ready

------------------------------------------------------------------------

## Technology

-   Three.js (WebGL rendering)
-   PlaneGeometry with high segment density
-   MeshStandardMaterial
-   Custom cylindrical vertex deformation
-   Direction snapping logic
-   Shadow-enabled lighting

------------------------------------------------------------------------

## 8 Direction Snap System

When dragging:

1.  Calculate drag vector
2.  Compute angle using atan2
3.  Divide full circle into 8 sectors (45° each)
4.  Snap angle to nearest sector

Formula:

    sector = round(angle / (PI / 4))
    snappedAngle = sector * (PI / 4)

This ensures deformation occurs only along 8 primary directions.

------------------------------------------------------------------------

## Mesh Deformation (Cylindrical Bend)

For each vertex:

    distance = dot(vertex - foldOrigin, foldNormal)

    if distance > 0:
        theta = distance / radius
        y' = radius * sin(theta)
        z' = radius * (1 - cos(theta))

Then: - Update position attribute - Recompute vertex normals - Trigger
geometry update

------------------------------------------------------------------------

## Features

-   Real 3D curvature
-   Front & back textures
-   Paper thickness simulation
-   Shadow casting & receiving
-   Fresnel edge shading
-   Mobile touch support
-   Inertia animation after release
-   Boundary clamp to avoid mesh distortion

------------------------------------------------------------------------

## Performance Optimization

-   No object creation inside vertex loops
-   Cached vectors
-   Update geometry only while dragging
-   Adaptive segment reduction for low FPS
-   Efficient raycasting

------------------------------------------------------------------------

## Architecture

Recommended structure:

-   initScene()
-   createPaper()
-   handleInput()
-   snapDirection()
-   bendPaper()
-   animate()

------------------------------------------------------------------------

## Mobile Support

-   Touch events supported
-   Responsive rendering
-   Optimized raycasting
-   Adjustable geometry density

------------------------------------------------------------------------

## Future Extensions

-   Multiple pages
-   Spring-based physics
-   16-direction snapping
-   Full custom GLSL shader
-   WebGL-only implementation (without Three.js)
-   Paper tear 3D effect

------------------------------------------------------------------------

## Goal

Deliver a smooth, realistic 3D page turning experience similar to tablet
reading applications, with controlled directional snapping and stable
physics-based deformation.
