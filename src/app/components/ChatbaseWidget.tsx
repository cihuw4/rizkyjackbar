"use client";

import { useEffect } from "react";

export default function ChatbaseWidget() {
    useEffect(() => {
        const existingScript = document.getElementById("chatbase-widget");
        if (existingScript) return;

        const script = document.createElement("script");
        script.src = "https://www.chatbase.co/embed.min.js";
        script.id = "3SNpOIBj85EONEVfVQgVN";
        script.async = true;
        script.defer = true;
        script.setAttribute("domain", "www.chatbase.co");

        document.body.appendChild(script);

        return () => {
            script.remove();
        };
    }, []);

    return null;
}
