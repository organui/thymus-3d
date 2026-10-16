import { createHash } from 'node:crypto'

export const sha = (data: Uint8Array) => createHash('sha256').update(data).digest('hex')

export async function fetchPinned(
  path: string,
  input: { file: string; url: string; sha256: string },
) {
  const file = Bun.file(`${path}/${input.file}`)
  if (!(await file.exists())) {
    console.log(`Downloading ${input.file}…`)
    const response = await fetch(input.url)
    if (!response.ok) throw new Error(`${input.file}: HTTP ${response.status}`)
    await Bun.write(file, response)
  }
  // Re-open after a download: the first handle can report the pre-write size.
  const bytes = new Uint8Array(await Bun.file(`${path}/${input.file}`).arrayBuffer())
  if (sha(bytes) !== input.sha256)
    throw new Error(
      `Checksum mismatch: ${input.file}. Refusing changed upstream data; review it before updating the pin.`,
    )
  return bytes
}

// Binary STL triangles as flat [x, y, z, …] corner positions, in millimetres.
export function stlCorners(bytes: Uint8Array, id: string) {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength)
  const triangles = view.getUint32(80, true)
  if (bytes.length !== 84 + triangles * 50) throw new Error(`Invalid binary STL: ${id}`)
  const corners = new Float32Array(triangles * 9)
  for (let t = 0; t < triangles; t++)
    for (let k = 0; k < 9; k++) corners[t * 9 + k] = view.getFloat32(84 + t * 50 + 12 + k * 4, true)
  return { triangles, corners }
}

export function objVertices(text: string) {
  const vertices: number[] = []
  for (const line of text.split(/\r?\n/)) {
    const tokens = line.trim().split(/\s+/)
    if (tokens[0] === 'v') vertices.push(...tokens.slice(1, 4).map(Number))
  }
  return vertices
}
