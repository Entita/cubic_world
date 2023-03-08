import { BoxGeometry, MeshBasicMaterial, Mesh, Color, Group } from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Tree } from "./Tree"

export class Cube {
  group = new Group()

  targetRotation: { x: number; y: number; z: number; } = { x: 0, y: 0, z: 0 }
  rotationSpeed: number
  loader: GLTFLoader

  constructor({ loader, size = 2, rotationSpeed = 1 }: { loader: GLTFLoader,size?: number, rotationSpeed?: number }) {
    this.loader = loader
    const cubeGeometry = new BoxGeometry(size, size, size)
    const cubeMaterial = [
      new MeshBasicMaterial({ color: new Color("red") }),
      new MeshBasicMaterial({ color: new Color("yellow") }),
      new MeshBasicMaterial({ color: new Color("white") }),
      new MeshBasicMaterial({ color: new Color("orange") }),
      new MeshBasicMaterial({ color: new Color("blue") }),
      new MeshBasicMaterial({ color: new Color("green") }),
    ]

    const tree = new Tree({ loader, size })
    const cube = new Mesh(cubeGeometry, cubeMaterial)
    cube.userData.outline = true
    this.rotationSpeed = rotationSpeed

    this.group.add(cube)
    this.group.add(tree.group)
  }

  rotate = ({ x, y, z }: { x: number, y: number, z: number }) => {
    this.targetRotation = {
      x: x ? this.targetRotation.x + x : this.targetRotation.x,
      y: y ? this.targetRotation.y + y : this.targetRotation.y,
      z: z ? this.targetRotation.z + z : this.targetRotation.z,
    }
  }

  updateRotation = () => {
    const diffX =  this.targetRotation.x - this.group.rotation.x
    const diffY =  this.targetRotation.y - this.group.rotation.y
    const diffZ =  this.targetRotation.z - this.group.rotation.z

    if (Math.abs(diffX) < 0.001 && Math.abs(diffY) < 0.001 && Math.abs(diffZ) < 0.001) return

    this.group.rotation.set(
      this.group.rotation.x + diffX * .05 * this.rotationSpeed,
      this.group.rotation.y + diffY * .05 * this.rotationSpeed,
      this.group.rotation.z + diffZ * .05 * this.rotationSpeed,
    )
  }

  draw = () => {
    this.updateRotation()
  }
}