export type Group = 'Thymus' | 'Arteries' | 'Veins' | 'Neighbouring organs'
export type Structure = {
  id: string
  fma: string
  name: string
  sourceName: string
  group: Group
  // BodyParts3D release the meshes come from: 3.0 STLs for the thymus, the
  // great vessels and the trachea (denser meshes), 4.3 OBJs for the heart and
  // pulmonary trunk, which 3.0 models as single very heavy surfaces. The 4.3
  // meshes are translated onto their 3.0 counterparts (see model-inputs.json).
  source: '3.0' | '4.3'
  // FMA concepts this group draws its source meshes from.
  concepts: string[]
  // Source files: FMA file IDs for 3.0, FJ elements for 4.3. Each file
  // belongs to exactly one structure.
  elements: string[]
  color: string
  description: string
  note: string
}

export const anatomySource =
  'https://training.seer.cancer.gov/anatomy/lymphatic/components/thymus.html'
export const structures: Structure[] = [
  {
    id: 'right-lobe',
    fma: 'FMA71194',
    name: 'Right lobe',
    sourceName: 'right lobe of thymus',
    group: 'Thymus',
    source: '3.0',
    concepts: ['FMA71194'],
    elements: ['FMA71194'],
    color: '#d79a86',
    description:
      'One of the two soft lobes of the thymus. It lies behind the upper sternum, in front of the superior vena cava and the ascending aorta.',
    note: 'Shown as one surface. The thymus is where T cells, a kind of white blood cell, mature.',
  },
  {
    id: 'left-lobe',
    fma: 'FMA71195',
    name: 'Left lobe',
    sourceName: 'left lobe of thymus',
    group: 'Thymus',
    source: '3.0',
    concepts: ['FMA71195'],
    elements: ['FMA71195'],
    color: '#e3ad94',
    description:
      'The other lobe, lying over the aortic arch and the pulmonary trunk. The two lobes meet in the midline.',
    note: 'Shown as one surface. The thymus is largest in childhood and is slowly replaced by fat after puberty, so its size varies a lot between people.',
  },
  {
    id: 'ascending-aorta',
    fma: 'FMA3736',
    name: 'Ascending aorta',
    sourceName: 'ascending aorta',
    group: 'Arteries',
    source: '3.0',
    concepts: ['FMA3736'],
    elements: ['FMA3736'],
    color: '#c0564b',
    description: 'The first part of the aorta, rising from the left ventricle behind the thymus.',
    note: 'Included for orientation.',
  },
  {
    id: 'aortic-arch',
    fma: 'FMA3768',
    name: 'Aortic arch',
    sourceName: 'arch of aorta',
    group: 'Arteries',
    source: '3.0',
    concepts: ['FMA3768'],
    elements: ['FMA3768'],
    color: '#b14a41',
    description:
      'Curves back and to the left over the root of the left lung. The thymus rests against its front.',
    note: 'The descending aorta beyond it is omitted.',
  },
  {
    id: 'brachiocephalic-trunk',
    fma: 'FMA3932',
    name: 'Brachiocephalic trunk',
    sourceName: 'brachiocephalic artery, nsn',
    group: 'Arteries',
    source: '3.0',
    concepts: ['FMA3932'],
    elements: ['FMA3932nsn'],
    color: '#cc6a5c',
    description:
      'The first branch of the arch. It supplies the right arm and the right side of the head and neck.',
    note: 'Its right subclavian and right common carotid branches are omitted.',
  },
  {
    id: 'left-common-carotid',
    fma: 'FMA4058',
    name: 'Left common carotid artery',
    sourceName: 'left common carotid artery',
    group: 'Arteries',
    source: '3.0',
    concepts: ['FMA4058'],
    elements: ['FMA4058'],
    color: '#d47b6b',
    description: 'The second branch of the arch, running up the left side of the neck.',
    note: 'Shown only for its first few centimetres.',
  },
  {
    id: 'left-subclavian',
    fma: 'FMA4694',
    name: 'Left subclavian artery',
    sourceName: 'left subclavian artery',
    group: 'Arteries',
    source: '3.0',
    concepts: ['FMA4694'],
    elements: ['FMA4694'],
    color: '#a8443d',
    description: 'The third branch of the arch. It heads out toward the left arm.',
    note: 'Included for orientation.',
  },
  {
    id: 'pulmonary-trunk',
    fma: 'FMA8612',
    name: 'Pulmonary trunk',
    sourceName: 'pulmonary trunk',
    group: 'Arteries',
    source: '4.3',
    concepts: ['FMA8612'],
    elements: ['FJ2966'],
    color: '#7f86b8',
    description:
      'Carries blood from the right ventricle to the lungs. The lower part of the left lobe of the thymus lies over it.',
    note: 'Its branches into the lungs are omitted.',
  },
  {
    id: 'superior-vena-cava',
    fma: 'FMA4720',
    name: 'Superior vena cava',
    sourceName: 'superior vena cava',
    group: 'Veins',
    source: '3.0',
    concepts: ['FMA4720'],
    elements: ['FMA4720'],
    color: '#5f7fae',
    description:
      'Returns blood from the head, neck and arms to the right atrium. The right lobe of the thymus lies in front of it.',
    note: 'Included for orientation.',
  },
  {
    id: 'right-brachiocephalic-vein',
    fma: 'FMA4751',
    name: 'Right brachiocephalic vein',
    sourceName: 'right brachiocephalic vein',
    group: 'Veins',
    source: '3.0',
    concepts: ['FMA4751'],
    elements: ['FMA4751'],
    color: '#6f8fbc',
    description:
      'A short vein that joins the left brachiocephalic vein to form the superior vena cava.',
    note: 'Included for orientation.',
  },
  {
    id: 'left-brachiocephalic-vein',
    fma: 'FMA4761',
    name: 'Left brachiocephalic vein',
    sourceName: 'left brachiocephalic vein',
    group: 'Veins',
    source: '3.0',
    concepts: ['FMA4761'],
    elements: ['FMA4761'],
    color: '#4f6f9f',
    description:
      'Crosses from left to right just behind the thymus. The small thymic veins, not modelled here, drain into it.',
    note: 'Included for orientation.',
  },
  {
    id: 'heart',
    fma: 'FMA7274',
    name: 'Heart',
    sourceName: 'walls of the ventricles and atria',
    group: 'Neighbouring organs',
    source: '4.3',
    concepts: ['FMA13884', 'FMA9531', 'FMA9457'],
    elements: ['FJ2428', 'FJ2438', 'FJ2439'],
    color: '#b98a80',
    description:
      'The thymus sits in the upper front of the chest, just above and in front of the heart and the sac around it.',
    note: 'Three walls (ventricles, left atrium, right atrium) are grouped as one surface. The pericardium is not modelled.',
  },
  {
    id: 'trachea',
    fma: 'FMA7394',
    name: 'Trachea',
    sourceName: 'trachea',
    group: 'Neighbouring organs',
    source: '3.0',
    concepts: ['FMA7394'],
    elements: ['FMA7394'],
    color: '#c6cdbf',
    description:
      'The windpipe, behind the great vessels. In young children an enlarged thymus can extend up toward the neck in front of it.',
    note: 'Included for orientation. The sternum, ribs and lungs, which surround the thymus, are omitted so it stays visible.',
  },
]
export const groups = [
  'Thymus',
  'Arteries',
  'Veins',
  'Neighbouring organs',
] as const satisfies readonly Group[]
export const byId = Object.fromEntries(structures.map((s) => [s.id, s]))
export type View = 'Anterior' | 'Lateral' | 'Posterior'
export const tour: { id: string; title: string; text: string; view: View; isolate?: boolean }[] = [
  {
    id: 'right-lobe',
    title: 'Behind the breastbone',
    text: 'The thymus lies in the upper front of the chest, behind the sternum, which is omitted here. Its two lobes drape over the great vessels above the heart.',
    view: 'Anterior',
  },
  {
    id: 'left-lobe',
    title: 'Over the arch',
    text: 'From the left side, the left lobe rests in front of the aortic arch and the pulmonary trunk.',
    view: 'Lateral',
  },
  {
    id: 'left-brachiocephalic-vein',
    title: 'A vein across the back',
    text: 'The left brachiocephalic vein crosses just behind the thymus on its way to the superior vena cava.',
    view: 'Anterior',
  },
  {
    id: 'right-lobe',
    title: 'Seen from behind',
    text: 'From the back, the trachea and the great vessels stand between you and the thymus, which shows through them here.',
    view: 'Posterior',
  },
  {
    id: 'left-lobe',
    title: 'Changes with age',
    text: 'The left lobe is isolated here. The thymus is largest in childhood, when T cells mature in it, and is slowly replaced by fat in adults. Restore all to see what surrounds it.',
    view: 'Anterior',
    isolate: true,
  },
]

export type Emphasis = 'normal' | 'selected' | 'ghosted'
// With nothing selected every structure keeps its own color. A selection
// keeps its structure solid and ghosts the rest so it stays visible even
// when it sits behind or inside other geometry (the thymus seen from behind).
export function emphasis(id: string, selected: string | null): Emphasis {
  if (!selected) return 'normal'
  return id === selected ? 'selected' : 'ghosted'
}
