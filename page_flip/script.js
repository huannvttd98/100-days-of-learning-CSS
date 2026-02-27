// Initialize Three.js Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x333333);

// Camera setup
const canvasContainer = document.getElementById('canvas-container');
const width = canvasContainer.clientWidth;
const height = canvasContainer.clientHeight;
const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
camera.position.set(0, 0, 50); // Focusing on the page
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
canvasContainer.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(10, 20, 20);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
scene.add(directionalLight);

// Page Constants
const PAGE_WIDTH = 30;
const PAGE_HEIGHT = 45;
const SEGMENTS_X = 50;
const SEGMENTS_Y = 50;

// Create Page Geometry (Plane)
// Using BufferGeometry for direct vertex manipulation
const geometry = new THREE.PlaneGeometry(PAGE_WIDTH, PAGE_HEIGHT, SEGMENTS_X, SEGMENTS_Y);
// Store original vertex positions
const originalPositions = geometry.attributes.position.clone();

// Add a simple texture or pattern to make the curl visible
function createPageTexture(color, text) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 768;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Lines/Text simulation
    ctx.fillStyle = '#111';
    ctx.font = 'bold 40px Arial';
    ctx.fillText(text, 40, 60);

    ctx.fillStyle = '#666';
    for (let i = 100; i < canvas.height - 40; i += 30) {
        ctx.fillRect(40, i, canvas.width - 80, 2);
    }

    // Border
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 10;
    ctx.strokeRect(0,0, canvas.width, canvas.height);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
}

const frontTexture = createPageTexture('#fdfdfd', 'Front Page - Drag corner!');
const backTexture = createPageTexture('#e0e0e0', 'Back Page');
backTexture.wrapS = THREE.RepeatWrapping;
backTexture.repeat.x = -1; // Mirror texture horizontally for readable back page

// Front Material
const frontMaterial = new THREE.MeshStandardMaterial({
    map: frontTexture,
    side: THREE.FrontSide,
    roughness: 0.6,
    metalness: 0.1,
});

// Back Material
const backMaterial = new THREE.MeshStandardMaterial({
    map: backTexture,
    side: THREE.BackSide,
    roughness: 0.8,
    metalness: 0.0, // Paper is matte
});

// Front Mesh
const pageMesh = new THREE.Mesh(geometry, frontMaterial);
pageMesh.castShadow = true;
pageMesh.receiveShadow = true;
scene.add(pageMesh);

// Back Mesh (Sharing same geometry for synced deformation)
const backMesh = new THREE.Mesh(geometry, backMaterial);
backMesh.castShadow = true;
backMesh.receiveShadow = true;
scene.add(backMesh);

// Logic Variables
let isDragging = false;
let startPoint = new THREE.Vector2(); // World space start point (Z=0)
let currentPoint = new THREE.Vector2(); // World space current point
let dragVector = new THREE.Vector2();

// Fold parameters
let foldAngle = 0; // The angle of the fold line
let foldNormal = new THREE.Vector3(1, 0, 0); // Direction perpendicular to fold line
let foldOrigin = new THREE.Vector3(0, 0, 0); // Point on the fold line (World space)

// Raycaster for mouse interaction
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const planeNormal = new THREE.Vector3(0, 0, 1); // The page's normal
const planeConstant = 0; // Z=0 plane
const plane = new THREE.Plane(planeNormal, planeConstant);

// Event Listeners
window.addEventListener('resize', onWindowResize, false);
document.addEventListener('pointerdown', onPointerDown, false);
document.addEventListener('pointermove', onPointerMove, false);
document.addEventListener('pointerup', onPointerUp, false);

// Reset handler
const resetBtn = document.getElementById('reset-btn');
if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        canvasContainer.style.display = 'block';
        isDragging = false;
        resetGeometry();
    });
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onPointerDown(event) {
    if (event.button !== 0 && event.type === 'pointerdown') return; // Only left click or touch

    updateMouseCoords(event);

    // Raycast to find intersection with the abstract plane Z=0
    raycaster.setFromCamera(mouse, camera);
    const intersectPoint = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, intersectPoint);

    if (intersectPoint) {
        // Check if click is broadly near the page
        // Page is centered at 0,0. Extents: [-W/2, W/2], [-H/2, H/2]
        if (Math.abs(intersectPoint.x) < PAGE_WIDTH/2 + 10 && Math.abs(intersectPoint.y) < PAGE_HEIGHT/2 + 10) {
            isDragging = true;
            // For fold logic, startPoint is where the drag began
            startPoint.set(intersectPoint.x, intersectPoint.y);
            currentPoint.copy(startPoint);
        }
    }
}

function onPointerMove(event) {
    if (!isDragging) return;
    updateMouseCoords(event);

    raycaster.setFromCamera(mouse, camera);
    const intersectPoint = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, intersectPoint);

    if (intersectPoint) {
        currentPoint.set(intersectPoint.x, intersectPoint.y);
        updateFold();
    }
}

function onPointerUp() {
    isDragging = false;
    // Simple release: reset geometry for now
    resetGeometry();
}

function updateMouseCoords(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function updateFold() {
    // 1. Calculate drag vector
    dragVector.subVectors(currentPoint, startPoint);

    const dist = dragVector.length();

    // Check if drag exceeds 90% of page width
    if (dist > PAGE_WIDTH * 0.9) {
        canvasContainer.style.display = 'none';
        isDragging = false;
        return;
    }

    // Avoid calculation if drag is too small
    if (dist < 0.5) return; // Threshold to prevent jitter

    // 2. Compute angle using atan2
    // We want the angle of the drag relative to the positive X axis
    let angle = Math.atan2(dragVector.y, dragVector.x);

    // 3. 8-Direction Snap Logic
    // Divide full circle (2*PI) into 8 sectors (PI/4 each)
    const SECTOR_SIZE = Math.PI / 4;
    const sector = Math.round(angle / SECTOR_SIZE);
    const snappedAngle = sector * SECTOR_SIZE;

    // 4. Calculate Fold Normal and Origin
    // The Fold Normal points in the direction of the curl 'wave' movement.
    // If we drag Right (-X dir?), no, Drag +X -> Normal -X?
    // Let's stick to the convention: Normal points towards the 'meat' of the page that is staying put?
    // Or points towards the curl direction?
    // Let's try: Normal aligns with Drag.
    // Ideally, if I drag Top-Right corner to Bottom-Left:
    // Drag Vector is (-1, -1). Snapped Angle matches (-1, -1).
    // Fold line is perpendicular -> (1, -1).
    // Normal is (-1, -1).

    foldNormal.set(Math.cos(snappedAngle), Math.sin(snappedAngle), 0);

    // We want the fold to start from the dragged point?
    // Or rather the 'spine' of the fold is perpendicular to drag,
    // located somewhere between start and current.
    // Let's define the 'foldOrigin' (point zero of the deformation)
    // as moving with the drag.
    // A simple approximation for proper curl visuals:
    // The fold line moves along the drag vector.

    // Let's set foldOrigin to currentPoint.
    // The logic inside updateGeometry loop maps distance from this line.
    foldOrigin.set(currentPoint.x, currentPoint.y, 0);

    // If I drag Point A to Point B.
    // The Page material at A should now look like it is at B?
    // With my current logic:
    // Vertex A is at 'startPoint'. Origin is 'currentPoint'.
    // vector = A - B. length = dist.
    // dot(A-B, Normal). Normal points B->A? or A->B?
    // If Normal is Drag (A->B).
    // Then (A - B) dot (B-A) is negative.
    // dist < 0. No fold.
    // So Normal must prevent this?
    // If Normal is opposite Drag: (B-A) -> (A-B).
    // dot(A - B, A - B) is positive.
    // distance > 0. A folds.
    // So foldNormal should be NEGATIVE of Drag Direction.

    foldNormal.set(-Math.cos(snappedAngle), -Math.sin(snappedAngle), 0);

    updateGeometry();
}

function updateGeometry() {
    const positions = geometry.attributes.position;
    const origPos = originalPositions;
    const count = positions.count;

    // Radius of the curl
    // Make it dynamic based on drag distance? Or fixed.
    // Fixed radius gives a nice 'rolling' effect.
    // Dynamic radius suggests tightening curl.
    // Let's use a fixed-ish radius that tightens slightly.
    const radius = 4;

    for (let i = 0; i < count; i++) {
        const ox = origPos.getX(i);
        const oy = origPos.getY(i);
        const oz = origPos.getZ(i);

        // Vector from origin to vertex
        // v = vertex - foldOrigin
        const vx = ox - foldOrigin.x;
        const vy = oy - foldOrigin.y;

        // distance = dot(vertex - foldOrigin, foldNormal)
        const distance = vx * foldNormal.x + vy * foldNormal.y;

        if (distance > 0) {
            // Apply Cylindrical Bend
            const theta = distance / radius;

            // Math for cylindrical wrap:
            // The vertex is moved:
            // 1. 'Retracted' towards the fold line in the direction of Normal.
            //    New dist from line = radius * sin(theta) - distance
            // 2. 'Lifted' in Z.
            //    New Z = radius * (1 - cos(theta))
            //    (Using 1-cos ensures continuity at distance=0, where cos=1, z=0)

            const sinTheta = Math.sin(theta);
            const cosTheta = Math.cos(theta);

            // New position relative to fold line (projected on XY plane)
            // mappedDistance = radius * sinTheta;

            // Shift vector = (mappedDistance - distance) * Normal
            const shift = (radius * sinTheta) - distance;

            const dx = shift * foldNormal.x;
            const dy = shift * foldNormal.y;

            // Z height
            // We can add a bit of 'roll up' multi-turn effect?
            // If theta > 2*PI, it rolls over.
            // For simple page curl, usually 0 < theta < PI.
            // But let's allow it to roll.

            // Note: The 'oz' (original Z) is usually 0 for plane.
            positions.setXYZ(i, ox + dx, oy + dy, radius * (1 - cosTheta) + oz);

        } else {
            // Flat part
            positions.setXYZ(i, ox, oy, oz);
        }
    }

    positions.needsUpdate = true;
    geometry.computeVertexNormals();
}

function resetGeometry() {
    // Determine target (original positions)
    // For now, instant snap back
    const positions = geometry.attributes.position;
    const origPos = originalPositions;
    for (let i = 0; i < positions.count; i++) {
        positions.setXYZ(i, origPos.getX(i), origPos.getY(i), origPos.getZ(i));
    }
        positions.needsUpdate = true;
    geometry.computeVertexNormals();
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
// Start loop
animate();
