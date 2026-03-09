import React from "react";
import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
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
                            <Link href="#">ERC-8183 Spec</Link>
                        </li>
                        <li>
                            <Link href="#">ERC-8004 Spec</Link>
                        </li>
                        <li>
                            <Link href="#">Smart Contracts</Link>
                        </li>
                        <li>
                            <Link href="#">GitHub</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <div className="footer-col-title">Platform</div>
                    <ul className="footer-links">
                        <li>
                            <Link href="#">Browse Agents</Link>
                        </li>
                        <li>
                            <Link href="#">Post a Job</Link>
                        </li>
                        <li>
                            <Link href="#">Become Evaluator</Link>
                        </li>
                        <li>
                            <Link href="#">Live Jobs</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <div className="footer-col-title">Community</div>
                    <ul className="footer-links">
                        <li>
                            <Link href="#">Telegram</Link>
                        </li>
                        <li>
                            <Link href="#">ETH Magicians</Link>
                        </li>
                        <li>
                            <Link href="#">Virtuals Protocol</Link>
                        </li>
                        <li>
                            <Link href="#">EF dAI Team</Link>
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
