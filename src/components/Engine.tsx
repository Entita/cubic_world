import { Scene, PerspectiveCamera, WebGLRenderer, Group, DirectionalLight, Raycaster, Mesh, Color, Material, Vector2, Event, Object3D } from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { EffectComposer  } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { Cube } from "./Cube"

export class Engine {
  canvas: HTMLCanvasElement
  animation: number = 0
  scene = new Scene()
  camera = new PerspectiveCamera(75, 1, 0.1, 1000)
  light = new DirectionalLight('white', 1)
  raycaster = new Raycaster()
  group = new Group()
  arrayOfObjects: Array<Cube> = []

  renderer: WebGLRenderer
  controls: OrbitControls
  cube: Cube

  outlinePass: OutlinePass;
  composer: EffectComposer;

  constructor({ canvas }: { canvas: HTMLCanvasElement }) {
    this.canvas = canvas

    this.cube = new Cube()

    this.renderer = new WebGLRenderer({ canvas, antialias: true, logarithmicDepthBuffer: true })
    this.composer = new EffectComposer(this.renderer)
    this.outlinePass = new OutlinePass(new Vector2(window.innerWidth, window.innerHeight), this.scene, this.camera)
    this.outlinePass.visibleEdgeColor = new Color('yellow')
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enablePan = false

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

    const renderPass = new RenderPass(this.scene, this.camera)
    this.composer.setSize(window.innerWidth, window.innerHeight)
    this.composer.addPass(renderPass)
    this.composer.addPass(this.outlinePass)

    window.addEventListener('resize', this.handleResize)
    window.addEventListener('mousemove', this.onMouseMove)
  }

  onMouseMove = (e: any) => {
    this.raycaster.setFromCamera({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1
    }, this.camera)

    const intersects = this.raycaster.intersectObjects(this.group.children, true)

    if ( intersects.length > 0 ) this.outlinePass.selectedObjects = [intersects[0].object]
    else this.outlinePass.selectedObjects = []
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
    
    this.composer.render()
    this.arrayOfObjects.forEach(object => object.draw())
  }

  start = () => {
    this.draw()
  }

  pause = () => {
    cancelAnimationFrame(this.animation)
  }
}
