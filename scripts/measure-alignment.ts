import { mkdir } from 'node:fs/promises'
import inputs from './model-inputs.json'
import { structures } from '../src/anatomy'
import { fetchPinned, objVertices, stlCorners } from './pinned'

// BodyParts3D 4.3 moved parts of the chest relative to 3.0: its heart, pulmonary
// trunk and great veins sit about 10 mm lower. Each 4.3 structure used here is
// translated onto the matching 3.0 surface. This script measures that
// translation (the shift that minimises the median nearest-surface distance;
// translation only, no rotation or scaling) and checks it against the pinned value, so the pin can
// be reproduced: `bun scripts/measure-alignment.ts`.
const { bp30, bp43 } = inputs
const CELL = 4

function grid(points: Float32Array | number[]) {
  const cells = new Map<string, number[]>()
  for (let i = 0; i < points.length; i += 3) {
    const key = [0, 1, 2].map((k) => Math.floor(points[i + k] / CELL)).join(',')
    let cell = cells.get(key)
    if (!cell) cells.set(key, (cell = []))
    cell.push(points[i], points[i + 1], points[i + 2])
  }
  return cells
}

function nearest(cells: Map<string, number[]>, p: number[]) {
  const c = p.map((v) => Math.floor(v / CELL))
  let best: number[] | null = null,
    bestD = Infinity
  for (let r = 1; r <= 8 && !best; r++)
    for (let x = -r; x <= r; x++)
      for (let y = -r; y <= r; y++)
        for (let z = -r; z <= r; z++)
          for (const q of [cells.get(`${c[0] + x},${c[1] + y},${c[2] + z}`) ?? []])
            for (let i = 0; i < q.length; i += 3) {
              const d = Math.hypot(q[i] - p[0], q[i + 1] - p[1], q[i + 2] - p[2])
              if (d < bestD) ((bestD = d), (best = [q[i], q[i + 1], q[i + 2]]))
            }
  return { point: best!, distance: bestD }
}

const median = (values: number[]) => {
  const sorted = [...values].sort((a, b) => a - b)
  return sorted[Math.floor(sorted.length / 2)]
}

export async function measure(structureId: string, referenceId: string) {
  const structure = structures.find((s) => s.id === structureId)!
  const source: number[] = []
  for (const id of structure.elements) {
    const input = bp43.objects.find((o) => o.id === id)!
    source.push(
      ...objVertices(new TextDecoder().decode(await fetchPinned('.asset-cache/obj', input))),
    )
  }
  const reference = bp30.references.find((r) => r.id === referenceId)!
  const { corners } = stlCorners(await fetchPinned('.asset-cache/stl', reference), referenceId)
  const cells = grid(corners)
  // Every n-th vertex, about 1,500 samples: deterministic and fast enough.
  const step = Math.max(1, Math.floor(source.length / 3 / 1500))
  const samples: number[][] = []
  for (let i = 0; i < source.length; i += 3 * step) samples.push(source.slice(i, i + 3))
  const cost = (shift: number[]) =>
    median(
      samples.map(
        (p) =>
          nearest(
            cells,
            p.map((v, k) => v + shift[k]),
          ).distance,
      ),
    )
  // The offsets between releases are mostly vertical, and the heart's nested
  // walls give the median distance several local minima. So scan vertical
  // shifts first, then refine all three axes by coordinate descent.
  let shift = [0, 0, 0],
    best = cost(shift)
  for (let z = -20; z <= 20; z++) {
    const c = cost([0, 0, z])
    if (c < best) ((best = c), (shift = [0, 0, z]))
  }
  for (const size of [1, 0.5, 0.2, 0.1])
    for (let improved = true; improved;) {
      improved = false
      for (let k = 0; k < 3; k++)
        for (const sign of [1, -1]) {
          const next = shift.map((v, i) => (i === k ? v + sign * size : v))
          const c = cost(next)
          if (c < best - 1e-6) ((best = c), (shift = next), (improved = true))
        }
    }
  const residual = samples.map(
    (p) =>
      nearest(
        cells,
        p.map((v, k) => v + shift[k]),
      ).distance,
  )
  return {
    shiftMm: shift.map((v) => Math.round(v * 10) / 10),
    medianResidualMm: Math.round(median(residual) * 10) / 10,
  }
}

if (import.meta.main) {
  await mkdir('.asset-cache/stl', { recursive: true })
  await mkdir('.asset-cache/obj', { recursive: true })
  for (const pin of bp43.alignment) {
    const result = await measure(pin.structure, pin.reference)
    const drift = Math.max(...result.shiftMm.map((v, k) => Math.abs(v - (pin.shiftMm?.[k] ?? NaN))))
    console.log(`${pin.structure} → ${pin.reference}: ${JSON.stringify(result)}`)
    if (!(drift <= 0.2))
      throw new Error(`Pinned shift for ${pin.structure} differs from the measurement`)
  }
  console.log('Pinned alignments match the measurement.')
}
