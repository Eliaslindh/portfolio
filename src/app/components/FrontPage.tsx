"use client"
import React, { useRef } from 'react';
import { Canvas, useFrame, CanvasProps } from '@react-three/fiber'; // Import CanvasProps
import { Stars } from '@react-three/drei';
import Hover from './hover';

const Star: React.FC<{ position: [number, number, number] }> = ({ position }) => {
    return (
        <mesh position={position}>
            <sphereGeometry args={[0.1, 10, 10]} />
            <meshBasicMaterial color="white" />
        </mesh>
    );
};

const MovingStars: React.FC = () => {
    const groupRef = useRef<THREE.Group>(null);

    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();

        if (groupRef.current) {
            groupRef.current.rotation.z = elapsedTime * 0.1;

            groupRef.current.children.forEach((star, index) => {
                const angle = (index / groupRef.current!.children.length) * Math.PI * 2;
                const radius = 50;

                star.position.x = Math.cos(angle) * radius;
                star.position.y = Math.sin(angle) * radius;
            });
        }
    });

    const starPositions: [number, number, number][] = Array(200)
        .fill(0)
        .map(() => [
            Math.random() * 100 - 50,
            Math.random() * 100 - 50,
            Math.random() * 100 - 50,
        ]);

    return (
        <group ref={groupRef}>
            {starPositions.map((position, index) => (
                <Star key={index} position={position} />
            ))}
        </group>
    );
};

const FrontPage: React.FC = () => {
    return (
        <Canvas
            style={{ background: 'black' }}
            camera={{ position: [0, 0, 5] }}
            gl={{ clearColor: 'black' } as CanvasProps['gl']} // Correct the type
        >
            <Stars />
            <MovingStars />
            <Hover position={[0, 0, 0]} />
        </Canvas>
    );
};

export default FrontPage;
