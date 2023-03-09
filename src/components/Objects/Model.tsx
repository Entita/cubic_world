import { Group } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const getRandomModelIndex = (modelLength: number) => {
  return Math.floor(Math.random() * modelLength)
}

export class Model {
  modelPath
  group = new Group()
  index: number

  constructor({ loader, size, modelPaths, type }: { loader: GLTFLoader, size: number, modelPaths: Array<string>, type?: number }) {
    this.index = type ?? getRandomModelIndex(modelPaths.length)
    this.modelPath = modelPaths[this.index]

    loader.load(this.modelPath, (gltf) => {
      const scene = gltf.scene
      scene.position.y = size * .5
      scene.scale.set(size * .25, size * .25, size * .25)

      this.group.add(scene)
    })
  }
}