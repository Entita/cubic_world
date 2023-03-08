import { Group } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Model } from './Model'

const modelPaths = [
  'assets/forest/pedal1.gltf',
  'assets/forest/pedal2.gltf',
  'assets/forest/pedal3.gltf',
]

export class Pedal extends Model {
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