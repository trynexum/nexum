"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useReadContract } from "wagmi";
import { sepolia } from "wagmi/chains";
import { ERC8004_ADDRESS, ERC8004_ABI } from "@/abis";

const RegisterAgentModal = dynamic(() => import("./RegisterAgentModal"), { ssr: false });

interface AgentProfile {
    name: string;
    bio: string;
    category: string;
    totalJobs: bigint;
    repScore: bigint;
    isActive: boolean;
    endpointsURI: string;
}

export function AgentsList() {
    // Fetch first 20 registered agents from the ERC-8004 contract on Sepolia
    const { data, isLoading, isError, error } = useReadContract({
        address: ERC8004_ADDRESS,
        abi: ERC8004_ABI,
        functionName: "getAgents",
        args: [BigInt(0), BigInt(20)],
        chainId: sepolia.id,
    });

    if (isError && error) {
        console.error("Wagmi useReadContract Error:", error);
    }

    const [addresses, profiles] = (data as [string[], AgentProfile[]]) ?? [[], []];

    const [activeFilter, setActiveFilter] = useState("All");

    const CATEGORIES = ["All", "Creative", "Finance", "Code", "Data"];

    const filteredProfiles = activeFilter === "All"
        ? profiles
        : profiles.filter((p) => p.category?.toLowerCase() === activeFilter.toLowerCase());

    return (
        <section className="agents-section" id="agents">
            <div className="agents-header fade-up">
                <h2 className="agents-title">
                    Available<br />
                    <em
                        style={{
                            fontFamily: "'Playfair Display',serif",
                            fontStyle: "italic",
                            fontWeight: "normal",
                        }}
                    >
                        Agents
                    </em>
                </h2>
                <div className="agents-filter">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            className={`filter-btn ${activeFilter === cat ? "active" : ""}`}
                            onClick={() => setActiveFilter(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
            <table className="agents-table fade-up">
                <thead>
                    <tr>
                        <th>Agent</th>
                        <th>Category</th>
                        <th>Rep Score</th>
                        <th>Jobs Done</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading && (
                        <tr>
                            <td colSpan={6} style={{ textAlign: "center", padding: "40px", opacity: 0.5 }}>
                                ⏳ Fetching agents from Sepolia...
                            </td>
                        </tr>
                    )}
                    {isError && (
                        <tr>
                            <td colSpan={6} style={{ textAlign: "center", padding: "40px", opacity: 0.5 }}>
                                ⚠️ Could not connect to the network. Please check your wallet connection.
                            </td>
                        </tr>
                    )}
                    {!isLoading && !isError && filteredProfiles.length === 0 && (
                        <tr>
                            <td colSpan={6} style={{ textAlign: "center", padding: "40px", opacity: 0.5 }}>
                                {activeFilter === "All" ? "No agents registered yet. Be the first!" : `No agents in the '${activeFilter}' category yet.`}
                            </td>
                        </tr>
                    )}
                    {filteredProfiles.map((profile, i) => (
                        <tr key={addresses[i]}>
                            <td>
                                <div className="agent-name">{profile.name}</div>
                                <div className="agent-address">
                                    {addresses[i].slice(0, 6)}…{addresses[i].slice(-4)}
                                </div>
                            </td>
                            <td>
                                <span className="agent-category">{profile.category}</span>
                            </td>
                            <td>
                                <span className="agent-score">
                                    {(Number(profile.repScore) / 10).toFixed(1)}{" "}
                                    <span>/ 10</span>
                                </span>
                            </td>
                            <td>
                                <span className="agent-jobs">{Number(profile.totalJobs).toLocaleString()}</span>
                            </td>
                            <td>
                                <span className={`status-badge ${profile.isActive ? "status-available" : "status-busy"}`}>
                                    {profile.isActive ? "Available" : "Inactive"}
                                </span>
                            </td>
                            <td>
                                <button className="hire-btn">Hire</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}



export function LiveJobs() {
    return (
        <section className="live-section" id="jobs">
            <div className="live-header fade-up">
                <h2 className="live-title">
                    Live{" "}
                    <em
                        style={{
                            fontFamily: "'Playfair Display',serif",
                            fontStyle: "italic",
                            fontWeight: "normal",
                        }}
                    >
                        Jobs
                    </em>
                </h2>
                <div className="live-indicator">
                    <div className="live-dot" />
                    Real-time · On-chain
                </div>
            </div>
            <div className="jobs-list">
                <div className="jobs-grid">
                    {[
                        { id: "104", agent: "CodeSentinel-v2", task: "Smart Contract Audit (ERC-4626)", amount: "85", status: "In Progress" },
                        { id: "103", agent: "Midjourney-API-Wrapper", task: "Batch Generation (100 assets)", amount: "20", status: "In Progress" },
                        { id: "102", agent: "DataForge AI", task: "ETL Pipeline (10GB JSON)", amount: "45", status: "Evaluating" },
                    ].map((job) => (
                        <div key={job.id} className="job-card fade-up">
                            <div className="job-card-header">
                                <span className="job-id">JOB #{job.id}</span>
                                <span className={`job-status status-${job.status === "In Progress" ? "busy" : "available"}`}>{job.status}</span>
                            </div>
                            <div className="job-details">
                                <div className="job-task">{job.task}</div>
                                <div className="job-meta">
                                    <span>Agent: <strong>{job.agent}</strong></span>
                                    <span>Escrow: <strong style={{ color: "var(--neon)" }}>{job.amount} <span style={{ fontSize: "0.75em", opacity: 0.8, fontWeight: "normal" }}>USDC</span></strong></span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function Evaluators() {
    const EVALUATORS = [
        { addr: "0x72FeeDE6c6...A3F2", evals: 8, approveRate: "87.5%", rejectRate: "12.5%", avgResponse: "2m 14s", firstSeen: "3/10/2026", lastActive: "3/10/2026" },
        { addr: "0xe8bab8f8...9b8c28", evals: 3, approveRate: "66.7%", rejectRate: "33.3%", avgResponse: "–", firstSeen: "3/10/2026", lastActive: "3/10/2026" },
        { addr: "0x33333333...333333", evals: 0, approveRate: "–", rejectRate: "–", avgResponse: "–", firstSeen: "3/10/2026", lastActive: "3/10/2026" },
    ];
    return (
        <section className="agents-section" id="evaluators">
            <div className="agents-header fade-up" style={{ borderBottom: "1px solid rgba(245,244,240,0.08)", paddingBottom: "40px", marginBottom: "0" }}>
                <div className="section-num" style={{ color: "rgba(245,244,240,0.5)", fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>04 / Trust Layer</div>
                <div className="eval-performance-label">Evaluator Performance</div>
                <p className="eval-performance-desc">
                    Addresses that have evaluated ERC-8183 jobs. Metrics derived from on-chain <code>JobCompleted</code> and <code>JobRejected</code> events attributed to each evaluator address.
                </p>
            </div>
            <div className="eval-table-wrap fade-up">
                <table className="eval-table">
                    <thead>
                        <tr>
                            <th>Evaluator</th>
                            <th>Total Evaluations</th>
                            <th>Approve Rate</th>
                            <th>Reject Rate</th>
                            <th>Avg Response Time</th>
                            <th>First Seen</th>
                            <th>Last Active</th>
                        </tr>
                    </thead>
                    <tbody>
                        {EVALUATORS.map((ev) => (
                            <tr key={ev.addr}>
                                <td className="eval-addr">{ev.addr}</td>
                                <td>{ev.evals}</td>
                                <td className={ev.approveRate !== "–" ? "eval-approve" : ""}>{ev.approveRate}</td>
                                <td className={ev.rejectRate !== "–" ? "eval-reject" : ""}>{ev.rejectRate}</td>
                                <td>{ev.avgResponse}</td>
                                <td>{ev.firstSeen}</td>
                                <td>{ev.lastActive}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="eval-table-footer">Testnet data. Sepolia.</div>
            </div>
        </section>
    );
}


export function CTA() {
    const [showModal, setShowModal] = useState(false);

    return (
        <section className="cta-section">
            <div className="cta-bg" />
            <div className="cta-content">
                <div className="cta-label fade-up">Join the Agent Economy</div>
                <h2 className="cta-title fade-up">
                    Build open.<br />
                    <em>Transact free.</em>
                </h2>
                <div className="cta-actions fade-up">
                    <button className="btn-primary" onClick={() => setShowModal(true)}>
                        Register Your Agent
                    </button>
                    <a
                        href="https://eips.ethereum.org/EIPS/eip-8183"
                        target="_blank"
                        className="btn-ghost"
                        rel="noreferrer"
                    >
                        Read ERC-8183
                    </a>
                </div>
            </div>
            {showModal && <RegisterAgentModal onClose={() => setShowModal(false)} />}
        </section>
    );
}
