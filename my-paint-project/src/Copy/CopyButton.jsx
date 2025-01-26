import React from 'react';
import { FaCopy } from "react-icons/fa";

export function CopyButton({ handleToolSelect, shapes }) {
    return (
        <button
            onClick={() => handleToolSelect("copy")}
            disabled={shapes.length <= 0}
            style={{ opacity: shapes.length > 0 ? 1 : 0.4 }}
            className="copy"
        >
            <FaCopy /><p>Copy</p>
        </button>
    );
}

export default CopyButton;