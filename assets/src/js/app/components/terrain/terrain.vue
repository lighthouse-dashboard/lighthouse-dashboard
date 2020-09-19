<template>
    <div class="terrain"
            ref="root">
    </div>
</template>

<script>
    import * as THREE from 'three';
    import Perlin from './Perlin';

    export default {
        data: () => ({
            renderer: null,
            scene: null,
            camera: null,
            terrain: null,
        }),

        methods: {
            init() {
                const COLORS = { MATERIAL: 0xffffff };
                const width = window.innerWidth;
                const height = window.innerHeight;

                // Setup the scene
                this.scene = new THREE.Scene();
                this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 3000);
                const cameraTarget = { x: 0, y: 0, z: 0 };
                this.camera.position.y = Math.random() * 300;
                this.camera.position.z = Math.random() * 1000;
                this.camera.rotation.x = -15 * Math.PI / 180;
                this.camera.lookAt(cameraTarget.x, cameraTarget.y, cameraTarget.z);

                this.renderer = new THREE.WebGLRenderer({ alpha: true });
                this.renderer.setPixelRatio(window.devicePixelRatio);
                this.renderer.setSize(width, height);
                this.$refs.root.appendChild(this.renderer.domElement);

                const light = new THREE.DirectionalLight(COLORS.BG, 1.3);
                light.position.set(this.camera.position.x, this.camera.position.y + 500, this.camera.position.z + 500).normalize();
                this.scene.add(light);

                // Setup the terrain
                const geometry = new THREE.PlaneBufferGeometry(2000, 2000, 256, 256);
                const material = new THREE.MeshLambertMaterial({ color: COLORS.MATERIAL, wireframe: true });
                this.terrain = new THREE.Mesh(geometry, material);
                this.terrain.rotation.x = -Math.PI / 2;
                this.scene.add(this.terrain);
                this.refreshVertices();
            },

            refreshVertices() {
                const perlin = new Perlin();
                const peak = Math.random() * 100 + 50;
                const smoothing = Math.random() * 500 + 200;

                var vertices = this.terrain.geometry.attributes.position.array;
                for (var i = 0; i <= vertices.length; i += 3) {
                    vertices[i + 2] = peak * perlin.noise(
                        (this.terrain.position.x + vertices[i]) / smoothing,
                        (this.terrain.position.z + vertices[i + 1]) / smoothing
                    );
                }
                this.terrain.geometry.attributes.position.needsUpdate = true;
                this.terrain.geometry.computeVertexNormals();
                this.renderer.render(this.scene, this.camera);
            },
        },
        mounted() {
            this.init();
        }
    };
</script>
