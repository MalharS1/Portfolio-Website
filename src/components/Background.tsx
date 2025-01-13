import { useMouse } from "@uidotdev/usehooks"; // mouse hook to get position of mouse

// for strict ts checking
interface CustomCSSProperties extends React.CSSProperties {
    "--x"?: string;
    "--y"?: string;
}

function MeshBackground() {
    const [mouse, ref] = useMouse();

    return (
        <div className="mesh-bg" ref={ref as React.RefObject<HTMLDivElement>}>

            {/* Dot grid background */}
            <div className="dot-grid"></div>

            {/* Gradient overlay that follows the mouse */}
            <div
                className="gradient-bg"

                // set mouse x and y positions in var --x and --y
                style={{
                    "--x": mouse.elementX + "px",
                    "--y": mouse.elementY + "px",
                } as CustomCSSProperties}
            >
            </div>
        </div>
    );
};

export default MeshBackground;