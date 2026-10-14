/** A patcher release tag, `cc<claude-code-version>-r<revision>`. */
export interface PatcherTag {
  /** Claude Code version the patchers were validated on, e.g. `2.1.280`. */
  cc: string;
  /** Revision of the patcher set for that version. */
  rev: number;
}

const PATCHER_TAG = /^cc(\d+\.\d+\.\d+)-r(\d+)$/;

/**
 * Parse a patcher tag name.
 *
 * @param tag  Tag name as listed by the patcher repo, e.g. `cc2.1.280-r6`.
 * @returns    Its parts, or `undefined` when the name is not a patcher tag.
 */
export function parsePatcherTag(tag: string): PatcherTag | undefined {
  const m = PATCHER_TAG.exec(tag);
  return m ? { cc: m[1], rev: Number(m[2]) } : undefined;
}
