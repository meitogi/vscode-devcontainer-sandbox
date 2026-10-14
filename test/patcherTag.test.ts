import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parsePatcherTag } from '../src/patcherTag';

test('parses the Claude Code version and the revision', () => {
  assert.deepEqual(parsePatcherTag('cc2.1.280-r6'), { cc: '2.1.280', rev: 6 });
});

test('keeps a multi-digit revision as a number', () => {
  assert.deepEqual(parsePatcherTag('cc2.1.220-r12'), { cc: '2.1.220', rev: 12 });
});

test('rejects names that are not patcher tags', () => {
  for (const tag of ['v1.10.0', 'cc2.1.280', 'cc2.1.280-r', 'cc2.1.280-r6x', 'cc2.1-r6', 'cc2.1.280-r6\n']) {
    assert.equal(parsePatcherTag(tag), undefined, JSON.stringify(tag));
  }
});
