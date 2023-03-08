import { Group } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Model } from './Model'

const modelPaths = [
  'assets/forest/tree1.gltf',
  'assets/forest/tree2.gltf',
  'assets/forest/tree3.gltf',
  'assets/forest/tree4.gltf',
  'assets/forest/tree5.gltf',
]

export class Tree extends Model {
  group = new Group()
  loader: GLTFLoader

  constructor({ loader, size }: { loader: GLTFLoader, size: number }) {
    super({ loader, size, modelPaths })
    this.loader = loader

    this.initialization()
  }

  initialization = () => {
    this.group.userData.class = this
    this.group.userData.outline = true
  }
}