import { config } from 'dotenv';
import { existsSync } from 'fs';
import { resolve } from 'path';

// Resolve from the module, so both src and compiled dist work from any cwd.
export const serverRoot = existsSync(resolve(__dirname, '../package.json'))
  ? resolve(__dirname, '..')
  : resolve(__dirname, '../..');
config({ path: resolve(serverRoot, '.env') });
config({ path: resolve(serverRoot, '../.env') });

export const uploadsPath = resolve(serverRoot, process.env.STATIC_PATH || 'uploads');
