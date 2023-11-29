"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface HoverProps {
    position: [number, number, number];
}

const Hover: React.FC<HoverProps> = ({ position }) => {
    const [isHovered, setIsHovered] = useState(false);
    const textRef = useRef<THREE.Object3D>();
    const orbitingSpheres = useRef<THREE.Mesh[]>([]);
    const numOrbitingSpheres = 8;

    const handleHover = () => {
        setIsHovered(!isHovered);
    };

    useEffect(() => {
        const cleanupEventListeners = () => {
            textRef.current?.removeEventListener('pointerover', handleHover);
            textRef.current?.removeEventListener('pointerout', handleHover);
        };

        textRef.current?.addEventListener('pointerover', handleHover);
        textRef.current?.addEventListener('pointerout', handleHover);

        // Create and position the orbiting spheres
        const spheres = [];
        for (let i = 0; i < numOrbitingSpheres; i++) {
            const sphere = new THREE.Mesh(
                new THREE.SphereGeometry(0.05, 10, 10),
                new THREE.MeshBasicMaterial({ color: 'hotpink' })
            );
            spheres.push(sphere);
            textRef.current?.add(sphere);
        }
        orbitingSpheres.current = spheres;

        return cleanupEventListeners;
    }, []);

    useEffect(() => {
        if (isHovered) {
            const orbitSpeed = 0.01;
            const timeDelta = 0.01;

            orbitingSpheres.current.forEach((sphere, index) => {
                const angle = index * ((Math.PI * 2) / numOrbitingSpheres);
                const x = Math.cos(angle) * 2;
                const y = Math.sin(angle) * 2;

                sphere.position.set(x, y, 0);
                sphere.rotation.x += orbitSpeed * timeDelta;
                sphere.rotation.y += orbitSpeed * timeDelta;
            });
        }
    }, [isHovered]);

    return (
        <Text
            color={isHovered ? 'hotpink' : 'white'}
            fontSize={2}
            position={position}
            children="LINDH"
            font="helvetiker"
            ref={textRef}
        />
    );
};

export default Hover;
