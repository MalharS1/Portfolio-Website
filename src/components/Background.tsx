import { useState, useEffect } from "react";
import { useMouse } from "@uidotdev/usehooks"; // mouse hook to get position of mouse

// for strict TS checking
interface CustomCSSProperties extends React.CSSProperties {
    "--x"?: string;
    "--y"?: string;
}

// Type for a shooting star
interface ShootingStar {
    id: number;
    startX: number;
    startY: number;
    duration: number;
}

function MeshBackground() {
    const [mouse, ref] = useMouse();
    const [stars, setStars] = useState<ShootingStar[]>([]);

    // Function to generate random shooting stars
    const generateShootingStar = () => {
        const id = Date.now();
        const startX = Math.random() * window.innerWidth; // Random X position
        const startY = Math.random() * window.innerHeight; // Random Y position
        const duration = Math.random() * 2 + 1.5; // Duration between 1.5-3.5 seconds

        setStars((prev) => [
            ...prev,
            { id, startX, startY, duration },
        ]);

        // Remove the star after animation ends
        setTimeout(() => {
            setStars((prev) => prev.filter((star) => star.id !== id));
        }, duration * 1000);
    };

    // Periodically generate shooting stars
    useEffect(() => {
        const interval = setInterval(generateShootingStar, 1500); // New star every 1.5 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="mesh-bg" ref={ref as React.RefObject<HTMLDivElement>}>
            {/* Dot grid background */}
            <div className="dot-grid"></div>

            {/* Gradient overlay that follows the mouse */}
            <div
                className="gradient-bg"
                style={{
                    "--x": mouse.elementX + "px",
                    "--y": mouse.elementY + "px",
                } as CustomCSSProperties}
            ></div>

            {/* Shooting stars */}
            {stars.map((star) => (
                <div
                    key={star.id}
                    className="shooting-star"
                    style={{
                        left: `${star.startX}px`,
                        top: `${star.startY}px`,
                        animationDuration: `${star.duration}s`,
                    }}
                ></div>
            ))}
        </div>
    );
}

export default MeshBackground;
