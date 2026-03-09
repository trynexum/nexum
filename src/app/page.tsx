import { Hero, Marquee } from "@/components/Hero";
import { ProtocolSteps, Roles, Manifesto } from "@/components/Informational";
import { AgentsList, LiveJobs, Evaluators, CTA } from "@/components/Lists";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <ProtocolSteps />
      <Roles />
      <Manifesto />
      <AgentsList />
      <LiveJobs />
      <Evaluators />
      <CTA />
    </main>
  );
}
