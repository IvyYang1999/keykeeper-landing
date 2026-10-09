export interface DownloadMetadata { version: string; tag: string; filename: string; url: string; length: number }
export function productionBuildGate(env?: NodeJS.ProcessEnv, verify?: () => Promise<DownloadMetadata>): Promise<DownloadMetadata | undefined>;
