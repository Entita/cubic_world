import { Group } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Model } from './Model'

const modelPaths = [
  'assets/forest/small_rock1.gltf',
  'assets/forest/small_rock2.gltf',
  'assets/forest/small_rock3.gltf',
  'assets/forest/small_rock4.gltf',
  'assets/forest/small_rock5.gltf',
]

export class SmallRock extends Model {
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