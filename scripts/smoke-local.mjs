import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { resolve } from 'node:path';

const origin = 'http://127.0.0.1:3187/';
const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', '3187'], { stdio: ['ignore', 'pipe', 'pipe'] });
try {
  await new Promise((yes, no) => {
    const timeout = setTimeout(() => no(new Error('Local build did not start within 30 seconds')), 30_000);
    const finish = (error) => { clearTimeout(timeout); if (error) no(error); else yes(); };
    server.once('error', finish);
    server.once('exit', (code) => finish(new Error(`Local server exited ${code}`)));
    server.stdout.on('data', (chunk) => { if (chunk.toString().includes('Ready')) finish(); });
  });
  const smoke = spawn(process.execPath, ['scripts/smoke-downloads.mjs', origin], { stdio: 'inherit', env: { ...process.env, SMOKE_ARTIFACT_DIR: resolve('test-results/local-download-smoke') } });
  const [code] = await once(smoke, 'exit');
  if (code !== 0) process.exitCode = 1;
} finally {
  server.kill('SIGTERM');
}
