# Model provenance and preparation

## Source and license

The runtime model combines two releases of **BodyParts3D / Anatomography**, retrieved **2026-10-16**, placed in the 3.0 frame (see Decisions):

- **BodyParts3D 3.0** (release 20110915, `BodyParts3D_3.0_obj_95`) for the two lobes of the thymus, the ascending aorta, aortic arch and its three branches, the superior vena cava, both brachiocephalic veins and the trachea. The 3.0 thymus is far denser than the 4.3 one (32,268 and 45,944 triangles per lobe against about 1,000), and the 3.0 vessels are several times denser too.
- **BodyParts3D / Anatomography 4.3** (object set 4.3, ontology tree FMA3.0) for the heart walls and the pulmonary trunk. 3.0 models the heart as one 331,592-triangle wall and the pulmonary artery as a 116,948-triangle tree, too heavy for a web explorer; the 4.3 meshes have 62,770 and 1,302 triangles.

Both are distributed here under **[CC BY-SA 2.1 Japan](https://creativecommons.org/licenses/by-sa/2.1/jp/deed.en)** ([legal text](https://creativecommons.org/licenses/by-sa/2.1/jp/legalcode)). The original service permits modification and redistribution of contour data and rendered images under that license; an inert [snapshot of its notice](model-source/original-license.html.txt), copied from the lungs explorer, and the [3.0 mirror's license text](model-source/bp30-mirror-LICENSE_content.txt) (SHA-256 `0e26340c…7ec84`, identical to the copy spleen-3d preserved) are included. This license governs `public/models/thymus.glb`, the manifest's model data and the model screenshots, separately from the MIT application code. It matches [lungs-3d](https://github.com/organui/lungs-3d), [pancreas-3d](https://github.com/organui/pancreas-3d) and [spleen-3d](https://github.com/organui/spleen-3d): the LSDB archive's CC BY 4.0 grant covers its 4.0 release and is not extended to these meshes.

Credit: **BodyParts3D / Anatomography, © The Database Center for Life Science (DBCLS).** Adapted by OrganUI. No endorsement is implied.

## Retrieval and pinning

The network policy of the sandbox this was built in blocked both `dbarchive.biosciencedbc.jp` and `lifesciencedb.jp`, so the official archives could not be downloaded. Both sets come from public GitHub mirrors, pinned by commit and checksum in [model-inputs.json](../scripts/model-inputs.json):

- **3.0:** [Kevin-Mattheus-Moerman/BodyParts3D](https://github.com/Kevin-Mattheus-Moerman/BodyParts3D) at commit `f0eeb6e843380cfe6b83797cf8c3e1af74de5e61`, which converted the official OBJ release to binary STL without changing geometry and names each file by its FMA concept (the source spleen-3d uses). Each STL's SHA-256 is pinned, and its file ID must appear in the mirror's pinned `parts_list_e.txt` under a concept the structure claims. The STLs are unindexed; vertices are welded on exact position before normals are recomputed.
- **4.3:** [olivercase/body_parts_3d_api](https://github.com/olivercase/body_parts_3d_api) at commit `fd527e6f4daf732fd814314d9257df5877b844bc` (the commit lungs-3d and pancreas-3d pin). Each OBJ's SHA-256 matches the oid in its Git LFS pointer, its embedded `File ID` and `Concept ID` headers match, and the concept maps to that FJ element in the official 4.3 IS-A table [`FMA2Obj-4.3.tsv`](model-source/FMA2Obj-4.3.tsv) (SHA-256 `c3d16c89…935d4f`), the unchanged official download preserved by lungs-3d. `prepare-model.ts` refuses to run if any hash changes. Two further 3.0 STLs, wall of heart FMA7274 and pulmonary artery FMA66326, are pinned the same way under `bp30.references`; they are used only to measure the 4.3 shifts and are not in the runtime model.

## Selected structures

| Structure | Release | Source concept(s) | Source files |
| --- | --- | --- | --- |
| Right lobe of thymus | 3.0 | FMA71194 | FMA71194 |
| Left lobe of thymus | 3.0 | FMA71195 | FMA71195 |
| Ascending aorta | 3.0 | FMA3736 | FMA3736 |
| Aortic arch | 3.0 | FMA3768 | FMA3768 |
| Brachiocephalic trunk | 3.0 | FMA3932 (file `FMA3932nsn`, "brachiocephalic artery, nsn") | FMA3932nsn |
| Left common carotid artery | 3.0 | FMA4058 | FMA4058 |
| Left subclavian artery | 3.0 | FMA4694 | FMA4694 |
| Pulmonary trunk | 4.3 | FMA8612 | FJ2966 |
| Superior vena cava | 3.0 | FMA4720 | FMA4720 |
| Right brachiocephalic vein | 3.0 | FMA4751 | FMA4751 |
| Left brachiocephalic vein | 3.0 | FMA4761 | FMA4761 |
| Heart | 4.3 | FMA13884 wall of ventricle, FMA9531 wall of left atrium, FMA9457 wall of right atrium | FJ2428, FJ2438, FJ2439 |
| Trachea | 3.0 | FMA7394 | FMA7394 |

15 source files, 171,584 triangles. Each file belongs to exactly one structure; the script refuses duplicates and unused inputs. Per-file hashes, sizes and counts are in the [manifest](../public/models/manifest.json) and [selected-mappings.tsv](model-source/selected-mappings.tsv).

Decisions:

- **The two releases do not share a frame in the chest.** prostate-3d found 3.0 and 4.3 pelvic meshes within a millimetre or two of each other. Here they are not: matching the same concept in both releases, the 4.3 superior vena cava and left brachiocephalic vein are the 3.0 meshes moved down by 10.3 and 11.3 mm, the 4.3 aorta was remodelled and sits 17 to 20 mm lower, and the 4.3 thymus lobes differ in shape and sit about 6 mm further back. Placing 4.3 meshes unmodified would leave the heart detached from the 3.0 vessels.
- **Measured translation for the 4.3 structures.** The heart walls and pulmonary trunk are each moved by one translation (no rotation, scaling or reshaping) onto the 3.0 surface of the same anatomy, which is downloaded and pinned for the measurement only: the heart onto 3.0 wall of heart FMA7274 (shift `[0, 0, +10.2]` mm in source axes), the pulmonary trunk onto the trunk of 3.0 pulmonary artery FMA66326 (`[-0.1, 0, +10.5]` mm). After the shift the median distance to the 3.0 surface is 0.2 mm for both, so these are the same surfaces in a shifted frame. The shifts are pinned in [model-inputs.json](../scripts/model-inputs.json) and `bun run measure:alignment` re-measures them (vertical scan, then coordinate descent on the median nearest-surface distance) and fails if they drift by more than 0.2 mm.
- **Thymic veins and thyroid left out.** Both exist only in 4.3, and with no 3.0 counterpart their offset cannot be measured. Since 4.3 moved neighbouring structures by different amounts (6 to 20 mm), any guessed shift could misplace them, so they are omitted. The [thyroid explorer](https://github.com/organui/thyroid-3d) covers the thyroid.
- **Bones and lungs left out.** The sternum and costal cartilages lie directly in front of the thymus and the lungs wrap around it, so either would hide the gland in every named view.
- **Adult gland.** BodyParts3D is built from an adult body, so the thymus here has the size of an adult gland, smaller than in a child.
- Omitted: pericardium (no mesh in either release), descending aorta, right subclavian and right common carotid arteries, internal thoracic vessels, phrenic and vagus nerves, and the oesophagus.

## Transformation and orientation

Before centring, each 4.3 mesh gets its pinned shift. Vertices are then recentred on the selection's source bounding box and uniformly scaled by `0.016`; axes change from source `[x, y, z]` to display `[x, z, -y]` (source +x patient left, −y anterior, +z superior). The anterior view looks along display −Z, posterior along +Z, and the lateral view looks from the patient's left (camera on display +X), where the left lobe lies in front of the aortic arch and pulmonary trunk. In the anterior view the aortic arch and left subclavian artery run to the viewer's right, as expected. No anatomical reshaping or decimation is performed.

## Reproduce

```sh
bun run prepare:model   # downloads missing STLs and OBJs into .asset-cache, verifies, writes the GLB and manifest
bun run verify:model    # checks the GLB hash, structure IDs, element lists and geometry
bun run measure:alignment # re-measures the pinned 4.3-to-3.0 shifts against the 3.0 reference surfaces
```
