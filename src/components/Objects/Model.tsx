import { Group } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const getRandomModelIndex = (modelLength: number) => {
  return Math.floor(Math.random() * modelLength)
}

export class Model {
  index
  modelPath
  group = new Group()

  constructor({ loader, size, modelPaths }: { loader: GLTFLoader, size: number, modelPaths: Array<string> }) {
    this.index = getRandomModelIndex(modelPaths.length)
    this.modelPath = modelPaths[this.index]

    loader.load(this.modelPath, (gltf) => {
      const scene = gltf.scene
      scene.position.set(size * .25 - (size * .25 * this.index), size * .5, 0)
      scene.scale.set(size * .25, size * .25, size * .25)

      this.group.add(scene)
    })
  }
}