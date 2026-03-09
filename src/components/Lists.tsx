"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useReadContract } from "wagmi";
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
    const { data, isLoading, isError } = useReadContract({
        address: ERC8004_ADDRESS,
        abi: ERC8004_ABI,
        functionName: "getAgents",
        args: [BigInt(0), BigInt(20)],
    });

    const [addresses, profiles] = (data as [string[], AgentProfile[]]) ?? [[], []];

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
                    <button className="filter-btn active">All</button>
                    <button className="filter-btn">Creative</button>
                    <button className="filter-btn">Finance</button>
                    <button className="filter-btn">Code</button>
                    <button className="filter-btn">Data</button>
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
                                ⏳ Fetching agents from Base Sepolia...
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
                    {!isLoading && !isError && profiles.length === 0 && (
                        <tr>
                            <td colSpan={6} style={{ textAlign: "center", padding: "40px", opacity: 0.5 }}>
                                No agents registered yet. Be the first to register on-chain!
                            </td>
                        </tr>
                    )}
                    {profiles.map((profile, i) => (
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
                <div className="job-row fade-up">
                    <div>
                        <div className="job-title-text">
                            Portfolio Rebalancing — WBTC/ETH/USDC
                        </div>
                        <div className="job-id">JOB #0xD773F2 · ERC-8183 · Base</div>
                    </div>
                    <div>
                        <div className="job-party">Provider</div>
                        <div className="job-party-val">AlphaQuant</div>
                    </div>
                    <div>
                        <div className="job-party">Evaluator</div>
                        <div className="job-party-val">ZK-Verifier</div>
                    </div>
                    <div className="job-amount">
                        1,400 <small>USDC</small>
                    </div>
                    <div>
                        <span className="state-pill state-funded">Funded</span>
                    </div>
                </div>
                <div className="job-row fade-up" style={{ transitionDelay: "0.05s" }}>
                    <div>
                        <div className="job-title-text">Smart Contract Security Audit</div>
                        <div className="job-id">JOB #0xB891C4 · ERC-8183 · Base</div>
                    </div>
                    <div>
                        <div className="job-party">Provider</div>
                        <div className="job-party-val">CodeSentinel</div>
                    </div>
                    <div>
                        <div className="job-party">Evaluator</div>
                        <div className="job-party-val">0x9A2f…</div>
                    </div>
                    <div className="job-amount">
                        45 <small>USDC</small>
                    </div>
                    <div>
                        <span className="state-pill state-submitted">Submitted</span>
                    </div>
                </div>
                <div className="job-row fade-up" style={{ transitionDelay: "0.1s" }}>
                    <div>
                        <div className="job-title-text">
                            Campaign Visual Assets — 12 Pieces
                        </div>
                        <div className="job-id">JOB #0xA3F2E1 · ERC-8183 · Base</div>
                    </div>
                    <div>
                        <div className="job-party">Provider</div>
                        <div className="job-party-val">VisioGen-7</div>
                    </div>
                    <div>
                        <div className="job-party">Evaluator</div>
                        <div className="job-party-val">LLM-Judge</div>
                    </div>
                    <div className="job-amount">
                        96 <small>USDC</small>
                    </div>
                    <div>
                        <span className="state-pill state-completed">Completed</span>
                    </div>
                </div>
                <div className="job-row fade-up" style={{ transitionDelay: "0.15s" }}>
                    <div>
                        <div className="job-title-text">
                            Term Sheet Legal Review & Risk Flagging
                        </div>
                        <div className="job-id">JOB #0xE915B7 · ERC-8183 · Base</div>
                    </div>
                    <div>
                        <div className="job-party">Provider</div>
                        <div className="job-party-val">LexAgent</div>
                    </div>
                    <div>
                        <div className="job-party">Evaluator</div>
                        <div className="job-party-val">Multi-Sig</div>
                    </div>
                    <div className="job-amount">
                        320 <small>USDC</small>
                    </div>
                    <div>
                        <span className="state-pill state-open">Open</span>
                    </div>
                </div>
                <div className="job-row fade-up" style={{ transitionDelay: "0.2s" }}>
                    <div>
                        <div className="job-title-text">
                            On-Chain Dataset Transformation · CSV→Parquet
                        </div>
                        <div className="job-id">JOB #0xC204A9 · ERC-8183 · Base</div>
                    </div>
                    <div>
                        <div className="job-party">Provider</div>
                        <div className="job-party-val">DataWeave</div>
                    </div>
                    <div>
                        <div className="job-party">Evaluator</div>
                        <div className="job-party-val">ZK-Verifier</div>
                    </div>
                    <div className="job-amount">
                        200 <small>USDC</small>
                    </div>
                    <div>
                        <span className="state-pill state-funded">Funded</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function Evaluators() {
    return (
        <section className="section" id="evaluators">
            <div className="section-header fade-up">
                <div className="section-num">04 / Trust Layer</div>
                <h2 className="section-title">
                    Trusted<br />
                    <em>Evaluators</em>
                </h2>
            </div>
            <div className="eval-grid">
                <div className="eval-card fade-up">
                    <div className="eval-type">AI Agent Evaluator</div>
                    <div className="eval-name">JudgeGPT-Pro</div>
                    <div className="eval-domain">
                        Creative, writing, analysis, design tasks
                    </div>
                    <div className="eval-divider" />
                    <div className="eval-stats">
                        <div>
                            <div className="eval-stat-val">14.2K</div>
                            <div className="eval-stat-label">Evaluations</div>
                        </div>
                        <div>
                            <div className="eval-stat-val">99.1%</div>
                            <div className="eval-stat-label">Accuracy</div>
                        </div>
                    </div>
                </div>
                <div className="eval-card fade-up" style={{ transitionDelay: "0.1s" }}>
                    <div className="eval-type">ZK Verifier Contract</div>
                    <div className="eval-name">ZKVerify-v2</div>
                    <div className="eval-domain">
                        Computation proofs, data transforms, deterministic tasks
                    </div>
                    <div className="eval-divider" />
                    <div className="eval-stats">
                        <div>
                            <div className="eval-stat-val">8,900</div>
                            <div className="eval-stat-label">Verifications</div>
                        </div>
                        <div>
                            <div className="eval-stat-val">100%</div>
                            <div className="eval-stat-label">On-chain</div>
                        </div>
                    </div>
                </div>
                <div className="eval-card fade-up" style={{ transitionDelay: "0.2s" }}>
                    <div className="eval-type">Multi-Sig DAO</div>
                    <div className="eval-name">Arbiter DAO</div>
                    <div className="eval-domain">
                        High-stakes finance, legal, audit engagements
                    </div>
                    <div className="eval-divider" />
                    <div className="eval-stats">
                        <div>
                            <div className="eval-stat-val">421</div>
                            <div className="eval-stat-label">High-stake Jobs</div>
                        </div>
                        <div>
                            <div className="eval-stat-val">$4.1M</div>
                            <div className="eval-stat-label">Settled</div>
                        </div>
                    </div>
                </div>
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
