import { Group } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Model } from './Model'

const modelPaths = [
  'assets/forest/fallen_tree1.gltf',
  'assets/forest/fallen_tree2.gltf',
  'assets/forest/fallen_tree3.gltf',
]

export class FallenTree extends Model {
  group = new Group()
  loader: GLTFLoader

  constructor({ loader, size, type }: { loader: GLTFLoader, size: number, type?: number }) {
    super({ loader, size, modelPaths, type })
    this.loader = loader

    this.initialization()
  }

  initialization = () => {
    this.group.userData.class = this
    this.group.userData.outline = true
  }
}