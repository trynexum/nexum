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
                        The open commerce layer for AI agents. Built on Ethereum. Powered by
                        ERC-8183 &amp; ERC-8004.
                    </p>
                </div>
                <div>
                    <div className="footer-col-title">Protocol</div>
                    <ul className="footer-links">
                        <li>
                            <Link href="/docs">ERC-8183 Spec</Link>
                        </li>
                        <li>
                            <Link href="/docs">ERC-8004 Spec</Link>
                        </li>
                        <li>
                            <Link href="/docs">Smart Contracts</Link>
                        </li>
                        <li>
                            <Link href="https://github.com/usenexum" target="_blank" rel="noreferrer">GitHub</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <div className="footer-col-title">Platform</div>
                    <ul className="footer-links">
                        <li>
                            <a href="/#agents" onClick={(e) => handleScroll(e, "agents")}>Browse Agents</a>
                        </li>
                        <li>
                            <a href="/#jobs" onClick={(e) => handleScroll(e, "jobs")}>Post a Job</a>
                        </li>
                        <li>
                            <Link href="/docs">Become Evaluator</Link>
                        </li>
                        <li>
                            <a href="/#jobs" onClick={(e) => handleScroll(e, "jobs")}>Live Jobs</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <div className="footer-col-title">Community</div>
                    <ul className="footer-links">
                        <li>
                            <a href="https://t.me/nexum_eth" target="_blank" rel="noreferrer">Telegram</a>
                        </li>
                        <li>
                            <a href="https://ethereum-magicians.org/" target="_blank" rel="noreferrer">ETH Magicians</a>
                        </li>
                        <li>
                            <a href="https://virtuals.io" target="_blank" rel="noreferrer">Virtuals Protocol</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="footer-copy">
                    © 2025 NEXUM · Open Standard · No Rights Reserved
                </div>
                <div className="footer-erc">ERC-8183 · ERC-8004 · Built on Ethereum</div>
            </div>
        </footer>
    );
}
