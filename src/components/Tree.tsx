import { Group } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const treeModelPaths = [
  'assets/forest/tree1.gltf',
  'assets/forest/tree2.gltf',
  'assets/forest/tree3.gltf',
  'assets/forest/tree4.gltf',
  'assets/forest/tree5.gltf',
]

const getRandomTreeIndex = () => {
  return Math.floor(Math.random() * treeModelPaths.length)
}

export class Tree {
  treeNumber = getRandomTreeIndex()
  treeModelPath = treeModelPaths[this.treeNumber]
  group = new Group()
  loader: GLTFLoader

  constructor({ loader, size }: { loader: GLTFLoader, size: number }) {
    this.loader = loader

    this.initialization(size)
  }

  initialization = (size: number) => {
    this.group.userData.outline = true

    this.loader.load(this.treeModelPath, (gltf) => {
      const scene = gltf.scene
      scene.position.set(size * .25 - (size * .25 * this.treeNumber), size * .5, 0)
      scene.scale.set(.5, .5, .5)

      this.group.add(scene)
    })
  }
}