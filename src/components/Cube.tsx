import { BoxGeometry, MeshBasicMaterial, Mesh, Color, Group, PlaneGeometry } from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { BigRock } from "./Objects/BigRock";
import { Bush } from "./Objects/Bush";
import { FallenTree } from "./Objects/FallenTree";
import { Grass } from "./Objects/Grass";
import { Pedal } from "./Objects/Pedal";
import { SmallRock } from "./Objects/SmallRock";
import { Tree } from "./Objects/Tree"
import { Trunk } from "./Objects/Trunk";

export class Cube {
  group = new Group()
  grid: Array<Array<any>>

  targetRotation: { x: number; y: number; z: number; } = { x: 0, y: 0, z: 0 }
  rotationSpeed: number
  loader: GLTFLoader

  constructor({ loader, size = 2, rotationSpeed = 1, gridSize = 10 }: { loader: GLTFLoader,size?: number, rotationSpeed?: number, gridSize?: number }) {
    this.grid = [...Array(gridSize)].map(() => Array(gridSize))
    this.loader = loader
    this.rotationSpeed = rotationSpeed

    const cube = this.createCube(size)
    const gridHelper = this.createGridHelper(size, gridSize, 'cyan')
    const tree = new Tree({ loader, size })
    const bigRock = new BigRock({ loader, size })
    const smallRock = new SmallRock({ loader, size })
    const bush = new Bush({ loader, size })
    const fallenTree = new FallenTree({ loader, size })
    const trunk = new Trunk({ loader, size })
    const pedal = new Pedal({ loader, size })
    const grass = new Grass({ loader, size })

    this.grid[0][0] = tree.group
    this.grid[0][1] = bigRock.group
    this.grid[0][2] = smallRock.group
    this.grid[0][3] = bush.group
    this.grid[0][4] = fallenTree.group
    this.grid[0][5] = trunk.group
    this.grid[0][6] = pedal.group
    this.grid[0][7] = grass.group

    // this.group.add(tree.group)
    const objectsFromGrid = this.getGroupsFromGrid()
    this.group.add(objectsFromGrid)
    this.group.add(gridHelper)
    this.group.add(cube)
  }

  getGroupsFromGrid = () => {
    const groups = new Group()
    this.grid.forEach(col => col.forEach(object => object && groups.add(object)))

    return groups
  }

  createGridHelper = (size: number, gridSize: number, color: 'cyan') => {
    const group = new Group()
    const planeW = gridSize
    const planeH = gridSize
    const numW = size / gridSize
    const numH = size / gridSize

    const top = new Mesh(
        new PlaneGeometry(planeW*numW, planeH*numH, planeW, planeH),
        new MeshBasicMaterial({
            color: new Color(color),
            wireframe: true,
        })
    )
    const front = top.clone()
    top.rotation.x = Math.PI * .5
    top.position.y = size * .5 + .001

    front.rotation.x = 0
    front.position.y = 0
    front.position.z = size * .5 + .001

    const back = front.clone()
    back.rotation.x = 0
    back.position.y = 0
    back.position.z = - size * .5 - .001

    const left = top.clone()
    left.rotation.x = 0
    left.rotation.y = Math.PI * .5
    left.position.x = - size * .5 - .001
    left.position.y = 0

    const right = left.clone()
    right.position.x = size * .5 + .001

    const bottom = top.clone()
    bottom.position.y = - size * .5 - .001
    
    group.add(top)
    group.add(front)
    group.add(back)
    group.add(left)
    group.add(right)
    group.add(bottom)

    return group
  }

  createCube = (size: number) => {
    const cubeGeometry = new BoxGeometry(size, size, size)
    const cubeMaterial = [
      new MeshBasicMaterial({ color: new Color("red") }),
      new MeshBasicMaterial({ color: new Color("yellow") }),
      new MeshBasicMaterial({ color: new Color("white") }),
      new MeshBasicMaterial({ color: new Color("orange") }),
      new MeshBasicMaterial({ color: new Color("blue") }),
      new MeshBasicMaterial({ color: new Color("green") }),
    ]

    const cube = new Mesh(cubeGeometry, cubeMaterial)
    // cube.userData.class = this
    // cube.userData.outline = true

    return cube
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