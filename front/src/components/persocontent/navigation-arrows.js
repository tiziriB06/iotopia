"use client"
import "./navigation-arrows.css"

export default function NavigationArrow({ direction, onClick }) {
    return (
        <button className={`navigation-arrow ${direction}`} onClick={onClick}>
            {direction === "left" ? "◀" : "▶"}
        </button>
    )
}
