import { PHASE_PRODUCTION_BUILD } from "next/constants";
import { productionBuildGate } from "./scripts/release-gate.mjs";
import type { NextConfig } from "next";
import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
};

export default async function config(phase: string) {
  if (phase === PHASE_PRODUCTION_BUILD) await productionBuildGate();
  return withMDX(nextConfig);
}
