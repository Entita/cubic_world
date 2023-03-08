import { Group } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Model } from './Model'

const modelPaths = [
  'assets/forest/trunk1.gltf',
  'assets/forest/trunk2.gltf',
]

export class Trunk extends Model {
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