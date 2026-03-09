import Link from "next/link";
import Logo from "./Logo";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Navbar() {
    return (
        <nav>
            <div className="nav-logo" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Logo style={{ width: "16px", height: "16px" }} />
                <div>
                    NEXUM <span>/ ERC-8183</span>
                </div>
            </div>
            <ul className="nav-links">
                <li>
                    <Link href="#how">Protocol</Link>
                </li>
                <li>
                    <Link href="#agents">Agents</Link>
                </li>
                <li>
                    <Link href="#jobs">Live Jobs</Link>
                </li>
                <li>
                    <Link href="#evaluators">Evaluators</Link>
                </li>
            </ul>
            <ConnectButton />
        </nav>
    );
}
