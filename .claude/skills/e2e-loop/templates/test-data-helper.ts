/**
 * Test Data Helper — Supabase mock data for E2E testing
 *
 * Inserts realistic mock data into Supabase tables so E2E tests can verify
 * pages that require data (dashboards, lists, logs, etc.).
 *
 * Usage:
 *   npx tsx e2e-results/test-data-helper.ts insert <table> [count]
 *   npx tsx e2e-results/test-data-helper.ts cleanup
 *   npx tsx e2e-results/test-data-helper.ts list-tables
 *
 * Setup:
 *   Requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.
 *   These can be set in a .env or .env.local file.
 *
 * Customization:
 *   Edit the TABLE_CONFIGS below to match your project's database schema.
 *   Each config defines what data to insert and how.
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// --- Load environment variables ---
// Try common locations for .env files
const envPaths = [
  path.join(__dirname, '..', '.env.local'),
  path.join(__dirname, '..', '.env'),
  path.join(__dirname, '..', 'apps', 'web', '.env.local'),
  path.join(__dirname, '..', 'apps', 'web', '.env'),
];

for (const envPath of envPaths) {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    break;
  }
}

// Support both naming conventions
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('[test-data] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  console.error('[test-data] Set these in .env.local or as environment variables');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// --- Cleanup tracking ---
const CLEANUP_FILE = path.join(__dirname, '.test-data-ids.json');

interface CleanupData {
  [table: string]: string[];
}

function saveCleanupData(data: CleanupData) {
  fs.writeFileSync(CLEANUP_FILE, JSON.stringify(data, null, 2));
}

function loadCleanupData(): CleanupData {
  if (fs.existsSync(CLEANUP_FILE)) {
    return JSON.parse(fs.readFileSync(CLEANUP_FILE, 'utf-8'));
  }
  return {};
}

// --- TABLE CONFIGS ---
// Customize these for your project's database schema.
// Each config defines:
//   - generateRow(index): returns one row of mock data
//   - defaultCount: how many rows to insert by default
//   - foreignKeys: tables to query for foreign key values (optional)

interface TableConfig {
  generateRow: (index: number, context: Record<string, string>) => Record<string, unknown>;
  defaultCount: number;
  foreignKeys?: { table: string; column: string; contextKey: string }[];
}

const TABLE_CONFIGS: Record<string, TableConfig> = {
  // --- EXAMPLE: Customize these for your project ---

  // Example: health monitoring snapshots
  // health_snapshots: {
  //   defaultCount: 3,
  //   foreignKeys: [{ table: 'agents', column: 'id', contextKey: 'agent_id' }],
  //   generateRow: (i, ctx) => ({
  //     agent_id: ctx.agent_id,
  //     overall_status: ['healthy', 'warning', 'critical'][i % 3],
  //     checks: [
  //       { name: 'Health Check', status: i % 3 === 0 ? 'pass' : 'fail' },
  //     ],
  //     collected_at: new Date(Date.now() - i * 15 * 60 * 1000).toISOString(),
  //   }),
  // },

  // Example: log events
  // log_events: {
  //   defaultCount: 65,
  //   foreignKeys: [{ table: 'agents', column: 'id', contextKey: 'agent_id' }],
  //   generateRow: (i, ctx) => {
  //     const levels = ['debug', 'info', 'warn', 'error'] as const;
  //     const messages: Record<string, string[]> = {
  //       debug: ['Processing request', 'Cache hit', 'Query executed'],
  //       info: ['Server started', 'User logged in', 'Task completed'],
  //       warn: ['High memory usage', 'Slow query detected', 'Rate limit approaching'],
  //       error: ['Connection lost', 'API call failed', 'Unhandled exception'],
  //     };
  //     const level = levels[i % 4];
  //     return {
  //       agent_id: ctx.agent_id,
  //       level,
  //       message: messages[level][i % messages[level].length],
  //       metadata: { source: 'e2e-test-data', iteration: i },
  //       timestamp: new Date(Date.now() - i * 30000).toISOString(),
  //     };
  //   },
  // },
};

// --- Commands ---

async function resolveForeignKeys(config: TableConfig): Promise<Record<string, string>> {
  const context: Record<string, string> = {};

  if (!config.foreignKeys) return context;

  for (const fk of config.foreignKeys) {
    const { data, error } = await supabase
      .from(fk.table)
      .select(fk.column)
      .limit(1)
      .single();

    if (error || !data) {
      console.error(`[test-data] No rows in ${fk.table} for foreign key ${fk.contextKey}`);
      process.exit(1);
    }

    context[fk.contextKey] = data[fk.column];
    console.log(`[test-data] ${fk.contextKey}: ${data[fk.column]} (from ${fk.table})`);
  }

  return context;
}

async function insertData(table: string, count?: number): Promise<void> {
  const config = TABLE_CONFIGS[table];
  if (!config) {
    console.error(`[test-data] Unknown table: ${table}`);
    console.error(`[test-data] Available: ${Object.keys(TABLE_CONFIGS).join(', ') || '(none configured)'}`);
    process.exit(1);
  }

  const rowCount = count || config.defaultCount;
  const context = await resolveForeignKeys(config);

  const rows = [];
  for (let i = 0; i < rowCount; i++) {
    rows.push(config.generateRow(i, context));
  }

  const { data, error } = await supabase
    .from(table)
    .insert(rows)
    .select('id');

  if (error) {
    console.error(`[test-data] Failed to insert into ${table}:`, error.message);
    return;
  }

  const ids = data.map((r: { id: string }) => r.id);
  const saved = loadCleanupData();
  saved[table] = [...(saved[table] || []), ...ids];
  saveCleanupData(saved);

  console.log(`[test-data] Inserted ${ids.length} rows into ${table}`);
}

async function cleanup(): Promise<void> {
  const saved = loadCleanupData();

  for (const [table, ids] of Object.entries(saved)) {
    if (ids.length === 0) continue;

    const { error } = await supabase
      .from(table)
      .delete()
      .in('id', ids);

    if (error) {
      console.error(`[test-data] Failed to delete from ${table}:`, error.message);
    } else {
      console.log(`[test-data] Deleted ${ids.length} rows from ${table}`);
    }
  }

  if (fs.existsSync(CLEANUP_FILE)) {
    fs.unlinkSync(CLEANUP_FILE);
  }

  console.log('[test-data] Cleanup complete');
}

function listTables(): void {
  const tables = Object.keys(TABLE_CONFIGS);
  if (tables.length === 0) {
    console.log('[test-data] No tables configured. Edit TABLE_CONFIGS in this file.');
    return;
  }
  console.log('[test-data] Configured tables:');
  for (const table of tables) {
    const config = TABLE_CONFIGS[table];
    console.log(`  ${table} (default: ${config.defaultCount} rows)`);
  }
}

// --- CLI ---
const [, , command, ...args] = process.argv;

switch (command) {
  case 'insert':
    if (!args[0]) {
      console.error('Usage: test-data-helper.ts insert <table> [count]');
      process.exit(1);
    }
    insertData(args[0], args[1] ? parseInt(args[1]) : undefined);
    break;
  case 'cleanup':
    cleanup();
    break;
  case 'list-tables':
    listTables();
    break;
  default:
    console.log('Commands: insert <table> [count] | cleanup | list-tables');
    process.exit(1);
}
