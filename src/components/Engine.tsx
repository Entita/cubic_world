import { Scene, PerspectiveCamera, WebGLRenderer, Group, DirectionalLight } from "three"
import { OrbitControls } from "three-orbitcontrols-ts"
import { Cube } from "./Cube"

export class Engine {
  canvas: HTMLCanvasElement
  animation: number = 0
  scene = new Scene()
  camera = new PerspectiveCamera(75, 1, 0.1, 1000)

  group = new Group()
  arrayOfObjects: Array<Cube> = []

  renderer: WebGLRenderer
  controls: OrbitControls
  light: DirectionalLight
  cube: Cube

  constructor({ canvas }: { canvas: HTMLCanvasElement }) {
    this.canvas = canvas

    this.cube = new Cube()

    this.renderer = new WebGLRenderer({ canvas, antialias: true, logarithmicDepthBuffer: true })
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.light = new DirectionalLight('white', 1)

    this.initialization()
  }

  initialization = () => {
    const width = this.canvas.clientWidth
    const height = this.canvas.clientHeight

    this.camera.aspect = width / height
    this.camera.position.set(0, 0, 5)
    this.camera.updateProjectionMatrix()
    
    this.renderer.setSize(width, height)
    this.light.position.set(0, 1, 0)

    this.arrayOfObjects.push(this.cube)
    this.group.add(this.cube.group)

    this.scene.add(this.light)
    this.scene.add(this.group)
  
    window.addEventListener('resize', this.handleResize)
  }

  handleResize = () => {
    this.canvas.style.width = '100vw'
    this.canvas.style.height = '100vh'
    this.canvas.width = this.canvas.offsetWidth
    this.canvas.height = this.canvas.offsetHeight
    this.camera.aspect = this.canvas.offsetWidth / this.canvas.offsetHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(this.canvas.offsetWidth, this.canvas.offsetHeight)
  }

  rotateCube = ({ x, y, z }: { x: number, y: number, z: number }) => {
    this.cube.rotate({ x, y, z })
  }

  draw = () => {
    this.animation = requestAnimationFrame(() => this.draw())
    
    this.arrayOfObjects.forEach(object => object.draw())
    this.renderer.render(this.scene, this.camera)
    this.controls.update()
  }

  start = () => {
    this.draw()
  }

  pause = () => {
    cancelAnimationFrame(this.animation)
  }
}
