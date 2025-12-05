"use client";

import React, { useEffect, useState } from 'react';

type HostGroup = {
  groupid: string;
  name: string;
};

export default function HostGroupsPage(): JSX.Element {
  const [groups, setGroups] = useState<HostGroup[]>([]);
  // selectedIds holds the list of selected group ids for the multi-select
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // // Fetch host groups from our server-side proxy
  // useEffect(() => {
  //   let mounted = true;
  //   async function load() {
  //     setLoading(true);
  //     setError(null);
  //     try {
  //       const resp = await fetch('/api/zabbix', {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({
  //           jsonrpc: '2.0',
  //           method: 'hostgroup.get',
  //           params: { output: ['groupid', 'name'], sortfield: 'name' },
  //           id: 1,
  //         }),
  //       });

  //       if (!resp.ok) throw new Error(`Server returned ${resp.status}`);
  //       const body = await resp.json();

  //       // Zabbix returns result in body.result
  //       const result = body?.result;
  //       if (!result) {
  //         throw new Error(body?.error?.data || 'Invalid response from Zabbix');
  //       }

  //       if (mounted) {
  //         setGroups(result as HostGroup[]);
  //         // reset selection state
  //         setSelectedIds([]);
  //       }
  //     } catch (err: any) {
  //       if (mounted) setError(err?.message || String(err));
  //     } finally {
  //       if (mounted) setLoading(false);
  //     }
  //   }

  //   load();
  //   return () => {
  //     mounted = false;
  //   };
  // }, []);

  const selectAll = () => setSelectedIds(groups.map((g) => g.groupid));
  const clearAll = () => setSelectedIds([]);

  const selectedGroups = groups.filter((g) => selectedIds.includes(g.groupid));

  return (
    <main style={{ padding: 20, fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif' }}>
      <h1 style={{ margin: 0, fontSize: 20 }}>Zabbix Host Groups</h1>
      <p style={{ color: '#666', marginTop: 6 }}>Select host groups (fetched from Zabbix via server proxy)</p>

      <div style={{ marginTop: 16 }}>
        <div style={{ marginBottom: 8 }}>
          <button onClick={selectAll} style={{ marginRight: 8 }}>Select All</button>
          <button onClick={clearAll}>Clear All</button>
        </div>

        <div style={{ border: '1px solid #e6e6e6', borderRadius: 6, padding: 12, minHeight: 120 }}>
          {loading ? (
            <div>Loading host groups…</div>
          ) : error ? (
            <div style={{ color: 'crimson' }}>Error: {error}</div>
          ) : groups.length === 0 ? (
            <div style={{ color: '#666' }}>No host groups found.</div>
          ) : (
            <div>
              {/* Multi-select native control */}
              <select
                multiple
                size={Math.min(12, Math.max(4, groups.length))}
                value={selectedIds}
                onChange={(e) => {
                  const opts = Array.from(e.target.selectedOptions).map((o) => o.value);
                  setSelectedIds(opts);
                }}
                style={{ width: '100%', minHeight: 120 }}
              >
                {groups.map((g) => (
                  <option key={g.groupid} value={g.groupid}>
                    {g.name}
                  </option>
                ))}
              </select>

              {/* Also show a checkbox list — keeps form controls visible and selection in sync */}
              <div style={{ marginTop: 12 }}>
                <strong style={{ display: 'block', marginBottom: 6 }}>Or pick with checkboxes</strong>
                <div style={{ maxHeight: 180, overflow: 'auto', paddingRight: 6 }}>
                  {groups.map((g) => (
                    <label key={g.groupid} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0' }}>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(g.groupid)}
                        onChange={(e) => {
                          if (e.target.checked) setSelectedIds((s) => Array.from(new Set([...s, g.groupid])));
                          else setSelectedIds((s) => s.filter((id) => id !== g.groupid));
                        }}
                      />
                      <span>{g.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <section style={{ marginTop: 18 }}>
        <h3 style={{ margin: '8px 0' }}>Selected groups</h3>
        <pre style={{ background: '#f7f7f7', padding: 12, borderRadius: 6, maxHeight: 240, overflow: 'auto' }}>
          {JSON.stringify(selectedGroups, null, 2)}
        </pre>
      </section>
    </main>
  );
}
