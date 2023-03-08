import { Group } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const treeModelPaths = [
  'assets/forest/tree1.gltf',
  'assets/forest/tree2.gltf',
  'assets/forest/tree3.gltf',
  'assets/forest/tree4.gltf',
  'assets/forest/tree5.gltf',
]

const getRandomTreeModelPath = () => {
  const index = Math.floor(Math.random() * treeModelPaths.length);
  return treeModelPaths[index];
}

export class Tree {
  treeModelPath = getRandomTreeModelPath()
  group = new Group()
  loader: GLTFLoader

  constructor({ loader, size }: { loader: GLTFLoader, size: number }) {
    this.loader = loader

    this.initialization()
  }

  initialization = () => {
    this.loader.load(this.treeModelPath, (gltf) => {
      this.group.add(gltf.scene)
    })
  }
}