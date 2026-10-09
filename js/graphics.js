class Graphics3D {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, this.container.clientWidth / this.container.clientHeight, 0.1, 100);
        this.camera.position.z = 5;

        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.container.appendChild(this.renderer.domElement);

        this.scene.add(new THREE.AmbientLight(0xffffff, 0.7));
        let dLight = new THREE.DirectionalLight(0xffffff, 0.8); dLight.position.set(2, 5, 3);
        this.scene.add(dLight);

        this.matBody = new THREE.MeshLambertMaterial({ color: 0xcdd6f4 });
        this.matEar = new THREE.MeshLambertMaterial({ color: 0xf38ba8 });
        this.matEye = new THREE.MeshBasicMaterial({ color: 0x11111b });

        this.cat = new THREE.Group();
        this.head = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.2, 1.5), this.matBody);
        this.cat.add(this.head);

        const earGeo = new THREE.ConeGeometry(0.3, 0.6, 4);
        let earL = new THREE.Mesh(earGeo, this.matEar); earL.position.set(-0.5, 0.8, 0); earL.rotation.z = 0.2;
        let earR = new THREE.Mesh(earGeo, this.matEar); earR.position.set(0.5, 0.8, 0); earR.rotation.z = -0.2;
        this.cat.add(earL, earR);

        const eyeGeo = new THREE.BoxGeometry(0.2, 0.2, 0.1);
        this.eyeL = new THREE.Mesh(eyeGeo, this.matEye); this.eyeL.position.set(-0.4, 0.1, 0.76);
        this.eyeR = new THREE.Mesh(eyeGeo, this.matEye); this.eyeR.position.set(0.4, 0.1, 0.76);
        this.cat.add(this.eyeL, this.eyeR);
        
        this.mouth = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.1, 0.1), this.matEye);
        this.mouth.position.set(0, -0.2, 0.76);
        this.cat.add(this.mouth);

        this.scene.add(this.cat);

        this.pointer = new THREE.Vector2();
        this.targetRotationY = 0; this.targetRotationX = 0; this.targetScale = 1;
        this.isSleeping = false; this.spinMultiplier = 0;
        
        document.getElementById('screen-display').addEventListener('mousemove', (e) => {
            const rect = this.container.getBoundingClientRect();
            this.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        });
    }

    setState(state, playing) {
        this.isSleeping = state.isSleeping;
        if(!state.isAlive) { this.matBody.color.setHex(0xf38ba8); this.eyeL.scale.y = 0.1; this.eyeR.scale.y = 0.1; }
        else if(state.isSleeping) { this.matBody.color.setHex(0x585b70); this.eyeL.scale.y = 0.1; this.eyeR.scale.y = 0.1; }
        else if(state.hunger < 30 || state.happiness < 30 || state.anomalyCount > 2) { 
            this.matBody.color.setHex(0xa6adc8); this.eyeL.scale.set(1.5, 1.5, 1); this.eyeR.scale.set(1.5, 1.5, 1); 
        }
        else { this.matBody.color.setHex(0xcdd6f4); this.eyeL.scale.set(1, 1, 1); this.eyeR.scale.set(1, 1, 1); }

        if(playing) {
            this.targetScale = 1.3; this.spinMultiplier += 1;
            setTimeout(() => this.targetScale = 1, 300);
        }
    }

    render(time) {
        if(!this.isSleeping) {
            this.targetRotationY = (this.pointer.x * 1.2) + (Math.sin(time * 2) * 0.05);
            this.targetRotationX = (-this.pointer.y * 0.8) + (Math.cos(time * 1.5) * 0.05);
            this.cat.position.y = Math.sin(time * 3) * 0.05;
            
            if (this.spinMultiplier > 0.01) {
                this.targetRotationY += (Math.PI * 2) * this.spinMultiplier;
                this.spinMultiplier *= 0.9;
            }
        } else {
            this.cat.position.y = Math.sin(time) * 0.05 - 0.2;
            this.targetRotationY = 0; this.targetRotationX = 0.3; 
        }

        this.cat.rotation.y += (this.targetRotationY - this.cat.rotation.y) * 0.15;
        this.cat.rotation.x += (this.targetRotationX - this.cat.rotation.x) * 0.15;
        this.cat.scale.lerp(new THREE.Vector3(this.targetScale, this.targetScale, this.targetScale), 0.3);

        this.renderer.render(this.scene, this.camera);
    }
}
