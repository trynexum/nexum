"use client";

import * as React from "react";
import {
    RainbowKitProvider,
    getDefaultConfig,
    darkTheme,
} from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { mainnet, base, sepolia, baseSepolia } from "wagmi/chains";
import "@rainbow-me/rainbowkit/styles.css";

const config = getDefaultConfig({
    appName: "NEXUM",
    projectId: "f714eb6105f9633e9bbf05cf3936c535", // A valid public Project ID for RainbowKit
    chains: [mainnet, base, sepolia, baseSepolia],
    ssr: true,
});

const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: React.ReactNode }) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider
                    theme={darkTheme({
                        accentColor: "#F5F4F0",
                        accentColorForeground: "#080808",
                        borderRadius: "none",
                        fontStack: "system",
                    })}
                >
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}
