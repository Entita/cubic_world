import { Group } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Model } from './Model'

const modelPaths = [
  'assets/forest/big_rock1.gltf',
  'assets/forest/big_rock2.gltf',
  'assets/forest/big_rock3.gltf',
  'assets/forest/big_rock4.gltf',
  'assets/forest/big_rock5.gltf',
  'assets/forest/big_rock6.gltf',
]

export class BigRock extends Model {
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