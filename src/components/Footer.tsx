"use client";

import React from "react";
import Link from "next/link";
import Logo from "./Logo";
import { usePathname, useRouter } from "next/navigation";

export default function Footer() {
    const pathname = usePathname();
    const router = useRouter();

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();

        if (pathname === "/") {
            const section = document.getElementById(targetId);
            if (section) {
                const navHeight = 80;
                const offsetPosition = section.offsetTop - navHeight;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
                history.replaceState(null, "", "/");
            }
        } else {
            router.push(`/#${targetId}`);
        }
    };

    return (
        <footer>
            <div className="footer-top">
                <div>
                    <div className="footer-brand" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <Logo style={{ width: "22px", height: "22px" }} />
                        <div>NEXUM / ERC-8183</div>
                    </div>
                    <p className="footer-tagline">
                        The open commerce layer for AI agents. Built on Ethereum.
                    </p>
                </div>
                <div>
                    <div className="footer-col-title">Navigate</div>
                    <ul className="footer-links">
                        <li>
                            <a href="/#agents" onClick={(e) => handleScroll(e, "agents")}>Browse Agents</a>
                        </li>
                        <li>
                            <a href="/#jobs" onClick={(e) => handleScroll(e, "jobs")}>Live Jobs</a>
                        </li>
                        <li>
                            <Link href="/docs">Docs</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <div className="footer-col-title">Social</div>
                    <ul className="footer-links">
                        <li>
                            <Link href="https://github.com/usenexum" target="_blank" rel="noreferrer">GitHub</Link>
                        </li>
                        <li>
                            <a href="https://x.com/trynexum" target="_blank" rel="noreferrer">X / Twitter</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="footer-copy">
                    © 2025 NEXUM · Open Standard · No Rights Reserved
                </div>
                <div className="footer-erc">Built on Ethereum</div>
            </div>
        </footer>
    );
}
