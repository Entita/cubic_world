import React from "react"
import { MeshBasicMaterial, Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, Mesh, SphereGeometry, Group, Color } from "three"
import { OrbitControls } from "three-orbitcontrols-ts";

interface CubeProps {
  size?: number;
  rotation?: { x: number; y: number; z: number };
  rotationSpeed?: number;
}

const Cube: React.FC<CubeProps> = ({ size = 2, rotation = { x: 0, y: 0, z: 0 }, rotationSpeed = 1 }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const animationRef = React.useRef<number>(0)
  const scene = React.useMemo(() => new Scene(), [])

  const camera = React.useMemo(() => new PerspectiveCamera(75, 1, 0.1, 1000), [])
  const [cameraPosition, setCameraPosition] = React.useState<{ x: number; y: number; z: number }>({ x: 0, y: 0, z: 5 })
  
  const cubeGeometry = React.useMemo(() => new BoxGeometry(size, size, size), [size])
  const cubeMaterial = React.useMemo(() => [
    new MeshBasicMaterial({ color: 0xff0000 }), // red
    new MeshBasicMaterial({ color: 0x00ff00 }), // green
    new MeshBasicMaterial({ color: 0x0000ff }), // blue
    new MeshBasicMaterial({ color: 0xffff00 }), // yellow
    new MeshBasicMaterial({ color: 0xff00ff }), // magenta
    new MeshBasicMaterial({ color: 0x00ffff }), // cyan
  ], [])
  const cube = React.useMemo(() => new Mesh(cubeGeometry, cubeMaterial), [cubeGeometry, cubeMaterial])
  const [cubeRotation, setCubeRotation] = React.useState<{ x: number; y: number; z: number }>(rotation)
  const [cubePosition, setCubePosition] = React.useState({ x: 0, y: 0, z: 0 })

  const sphereGeometry =  React.useMemo(() => new SphereGeometry(0.5, 32, 32), [])
  const sphereMaterial =  React.useMemo(() => new MeshBasicMaterial({ color: 0xff8000 }), [])
  const sphere =  React.useMemo(() => new Mesh(sphereGeometry, sphereMaterial), [sphereGeometry, sphereMaterial])
  const [spherePosition, setSpherePosition] = React.useState<{ x: number; y: number; z: number }>({ x: 0, y: 0, z: 0 })

  const group = React.useMemo(() => {
    const group = new Group()
    group.add(cube)
    group.add(sphere)
    group.rotation.set(cubeRotation.x, cubeRotation.y, cubeRotation.z)
    cube.position.set(cubePosition.x, cubePosition.y, cubePosition.z)
    sphere.position.set(spherePosition.x, spherePosition.y, spherePosition.z)
    return group
  }, [cube, sphere, cubeRotation, cubePosition, spherePosition])

  const [renderer, setRenderer] = React.useState<WebGLRenderer | null>(null)
  const [controls, setControls] = React.useState<OrbitControls | null>(null)

  const restoreState = React.useCallback(() => {
    camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z)
    group.rotation.set(cubeRotation.x, cubeRotation.y, cubeRotation.z)
    cube.position.set(cubePosition.x, cubePosition.y, cubePosition.z)
    sphere.position.set(cubePosition.x, cubePosition.y + size * .5, cubePosition.z)
  }, [camera, cube.position, sphere.position, group.rotation, size, cubeRotation, cubePosition, cameraPosition])

  const updateCubeRotation = (cubeTargetRotation: { x: number; y: number; z: number }, cubeRotation: { x: number; y: number; z: number }) => {
    const diffX = cubeTargetRotation.x - cubeRotation.x
    const diffY = cubeTargetRotation.y - cubeRotation.y
    const diffZ = cubeTargetRotation.z - cubeRotation.z

    if (Math.abs(diffX) < 0.001 && Math.abs(diffY) < 0.001 && Math.abs(diffZ) < 0.001) return

    const newRotation = {
      x: cubeRotation.x + diffX * .05 * rotationSpeed,
      y: cubeRotation.y + diffY * .05 * rotationSpeed,
      z: cubeRotation.z + diffZ * .05 * rotationSpeed,
    }
    setCubeRotation(newRotation)

    const requestCallback = () => updateCubeRotation(cubeTargetRotation, newRotation)
    requestAnimationFrame(requestCallback)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => updateCubeRotation(rotation, cubeRotation), [rotation])

  React.useEffect(() => {
    setCubePosition(cube.position)
    setSpherePosition(sphere.position)
    setCameraPosition(camera.position)
  }, [cube.position, sphere.position, camera.position])
  
  React.useEffect(() => {
    if (!canvasRef.current) return
    if (!renderer || !controls) {
      const newRenderer = new WebGLRenderer({ canvas: canvasRef.current, antialias: true, logarithmicDepthBuffer: true })
      newRenderer.autoClear = false
      setRenderer(newRenderer)
      setControls(new OrbitControls(camera, newRenderer.domElement))
    } else setControls(new OrbitControls(camera, renderer.domElement))
    
    const width = canvasRef.current?.clientWidth ?? 0
    const height = canvasRef.current?.clientHeight ?? 0
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer?.setSize(width, height)

    const animate = (): void => {
      if (!canvasRef.current) return

      animationRef.current = requestAnimationFrame(animate)
      renderer?.render(scene, camera)
      controls?.update()
    }
    
    const handleResize = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      
      canvas.style.width = "100vw"
      canvas.style.height = "100vh"
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      camera.aspect = canvas.offsetWidth / canvas.offsetHeight
      camera.updateProjectionMatrix()
      renderer?.setSize(canvas.offsetWidth, canvas.offsetHeight)
    }

    sphere.position.copy(cube.position)
    sphere.position.y += size * .5

    scene.add(group)
    
    restoreState()
    animate()
    window.addEventListener("resize", handleResize)
    
    return () => {
      scene.remove(group)
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener("resize", handleResize)
      controls?.dispose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef, size, renderer, camera, scene, cube, sphere, group])
  
  return <canvas ref={canvasRef} style={{ width: "100vw", height: "100vh" }} />
}

export default Cube
