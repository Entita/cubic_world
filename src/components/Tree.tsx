import { Group, Mesh, MeshBasicMaterial, SphereGeometry, CylinderGeometry, Color } from 'three'

export class Tree {
  group = new Group()

  constructor({ size }: { size: number }) {
    const trunkGeometry = new CylinderGeometry(size * .025, size * .025, size * .2)
    const trunkMaterial = new MeshBasicMaterial({ color: new Color('brown') })
    const trunk = new Mesh(trunkGeometry, trunkMaterial)
    trunk.position.y = size * .6;

    const leavesGeometry = new SphereGeometry(size * .15, size * 4, size * 3)
    const leavesMaterial = new MeshBasicMaterial({ color: new Color('green') })
    const leaves = new Mesh(leavesGeometry, leavesMaterial)
    leaves.position.y = size * .8;

    this.group.add(trunk)
    this.group.add(leaves)
  }
}