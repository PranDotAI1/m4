import { useState } from "react";

const CopyText = ({ text }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // 2 seconds ke liye "Copied" show karega
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };

    return (
        <span className="contentCopy" onClick={handleCopy} style={{ cursor: "pointer" }}>
            <i className="material-icons">content_copy</i>
            {copied && <span style={{ marginLeft: "5px", color: "green", fontSize: "0.9em" }}>Copied</span>}
        </span>
    );
};

export default CopyText;
