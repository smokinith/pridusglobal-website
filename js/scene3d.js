// Pridus Global — 3D scenes (hero network + ambient wireframe accents)
// Loaded as a native ES module; Three.js comes straight from a CDN build, no bundler required.
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isNarrow = window.innerWidth < 768;

const CYAN = new THREE.Color('#38bdf8');
const TEAL = new THREE.Color('#5eead4');

function makeRenderer(canvas) {
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    return renderer;
}

function sizeToParent(renderer, camera, canvas) {
    const el = canvas.parentElement;
    const w = el.clientWidth || window.innerWidth;
    const h = el.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
}

function observeVisibility(canvas, onChange) {
    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => onChange(entry.isIntersecting));
    }, { threshold: 0.01 });
    io.observe(canvas);
    return io;
}

// Fibonacci sphere distribution for an even particle spread.
function fibonacciSpherePoints(count, radius) {
    const points = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const theta = golden * i;
        const x = Math.cos(theta) * r;
        const z = Math.sin(theta) * r;
        const jitter = radius * (0.94 + Math.random() * 0.12);
        points.push(new THREE.Vector3(x * jitter, y * jitter, z * jitter));
    }
    return points;
}

function buildNetworkLines(points, maxDist, maxPerPoint) {
    const positions = [];
    for (let i = 0; i < points.length; i++) {
        let connections = 0;
        for (let j = i + 1; j < points.length && connections < maxPerPoint; j++) {
            if (points[i].distanceTo(points[j]) < maxDist) {
                positions.push(points[i].x, points[i].y, points[i].z, points[j].x, points[j].y, points[j].z);
                connections++;
            }
        }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
}

function initHeroScene(canvas) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.set(0, 0, 9.5);

    const renderer = makeRenderer(canvas);
    sizeToParent(renderer, camera, canvas);

    const count = isNarrow ? 220 : 480;
    const radius = 4.3;
    const points = fibonacciSpherePoints(count, radius);

    const group = new THREE.Group();
    scene.add(group);

    // Glowing particles, gradient-tinted between cyan and teal.
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    points.forEach((p, i) => {
        positions[i * 3] = p.x;
        positions[i * 3 + 1] = p.y;
        positions[i * 3 + 2] = p.z;
        const mix = (p.y / radius + 1) / 2;
        const c = CYAN.clone().lerp(TEAL, mix);
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
    });
    particleGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
        size: 0.06,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
    });
    group.add(new THREE.Points(particleGeo, particleMat));

    // Sparse connecting lines to read as a "network."
    const lineGeo = buildNetworkLines(points, radius * 0.42, isNarrow ? 2 : 3);
    const lineMat = new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.16,
        blending: THREE.AdditiveBlending,
    });
    group.add(new THREE.LineSegments(lineGeo, lineMat));

    let targetX = 0;
    let targetY = 0;
    window.addEventListener('mousemove', (e) => {
        targetX = (e.clientX / window.innerWidth - 0.5) * 0.6;
        targetY = (e.clientY / window.innerHeight - 0.5) * 0.4;
    });

    let visible = true;
    observeVisibility(canvas, (v) => { visible = v; });

    if (prefersReducedMotion) {
        group.rotation.set(0.15, -0.3, 0);
        renderer.render(scene, camera);
    } else {
        const clock = new THREE.Clock();
        const tick = () => {
            requestAnimationFrame(tick);
            if (!visible) return;
            const dt = clock.getDelta();
            group.rotation.y += dt * 0.06;
            group.rotation.x += (targetY - group.rotation.x) * 0.02;
            group.rotation.y += (targetX - group.rotation.y * 0.05) * 0.002;
            renderer.render(scene, camera);
        };
        requestAnimationFrame(tick);
    }

    window.addEventListener('resize', () => sizeToParent(renderer, camera, canvas));
}

function createWireShape(kind, color) {
    let geometry;
    if (kind === 'torusKnot') {
        geometry = new THREE.TorusKnotGeometry(1.6, 0.45, 100, 12);
    } else {
        geometry = new THREE.IcosahedronGeometry(1.9, 0);
    }
    const material = new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.35 });
    return new THREE.Mesh(geometry, material);
}

function initAmbientScene(canvas, kind, color) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(0, 0, 7);

    const renderer = makeRenderer(canvas);
    sizeToParent(renderer, camera, canvas);

    const shape = createWireShape(kind, color);
    shape.position.set(1.6, 0.2, 0);
    scene.add(shape);

    let visible = true;
    observeVisibility(canvas, (v) => { visible = v; });

    if (prefersReducedMotion) {
        renderer.render(scene, camera);
    } else {
        const clock = new THREE.Clock();
        const tick = () => {
            requestAnimationFrame(tick);
            if (!visible) return;
            const t = clock.getElapsedTime();
            shape.rotation.x = t * 0.12;
            shape.rotation.y = t * 0.18;
            shape.position.y = 0.2 + Math.sin(t * 0.4) * 0.25;
            renderer.render(scene, camera);
        };
        requestAnimationFrame(tick);
    }

    window.addEventListener('resize', () => sizeToParent(renderer, camera, canvas));
}

function boot() {
    const hero = document.getElementById('hero-canvas');
    if (hero && (window.WebGLRenderingContext)) {
        try { initHeroScene(hero); } catch (e) { /* WebGL unavailable — canvas stays empty, layout unaffected */ }
    }

    const ambientCanvases = document.querySelectorAll('.ambient-canvas');
    const kinds = ['icosahedron', 'torusKnot'];
    const colors = [0x38bdf8, 0x5eead4];
    ambientCanvases.forEach((canvas, i) => {
        try {
            initAmbientScene(canvas, kinds[i % kinds.length], colors[i % colors.length]);
        } catch (e) { /* WebGL unavailable — canvas stays empty, layout unaffected */ }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
} else {
    boot();
}
