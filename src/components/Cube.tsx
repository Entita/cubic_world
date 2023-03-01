import React from "react"
import { MeshBasicMaterial, Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, Mesh, SphereGeometry, Group, Color } from "three"
import { OrbitControls } from "three-orbitcontrols-ts";

interface CubeProps {
  size?: number;
  rotation?: { x: number; y: number; z: number };
  rotationSpeed?: number;
  gridSize?: number;
}

const Cube: React.FC<CubeProps> = ({ size = 2, rotation = { x: 0, y: 0, z: 0 }, rotationSpeed = 1, gridSize = 16 }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const animationRef = React.useRef<number>(0)
  const scene = React.useMemo(() => new Scene(), [])

  const camera = React.useMemo(() => new PerspectiveCamera(75, 1, 0.1, 1000), [])
  const [cameraPosition, setCameraPosition] = React.useState<{ x: number; y: number; z: number }>({ x: 0, y: 0, z: 5 })

  const plainCubeSize = React.useMemo(() => size - size / gridSize, [size, gridSize])
  const plainCubeGeometry = React.useMemo(() => new BoxGeometry(plainCubeSize, plainCubeSize, plainCubeSize), [plainCubeSize])
  const plainCubeMaterial = React.useMemo(() => new MeshBasicMaterial({ color: 'white' }), [])
  const plainCube = React.useMemo(() => new Mesh(plainCubeGeometry, plainCubeMaterial), [plainCubeGeometry, plainCubeMaterial])
  const [cubeRotation, setCubeRotation] = React.useState<{ x: number; y: number; z: number }>(rotation)
  const [cubePosition, setCubePosition] = React.useState({ x: 0, y: 0, z: 0 })

  const createCubeSide = (color: string, rotationX: number, rotationY: number) => {
    const group = new Group()
    const smallGridSize = gridSize - 2
    for (let i = 0; i < smallGridSize; i++) {
      for (let ii = 0; ii < smallGridSize; ii++) {
        const geometry = new BoxGeometry(size / gridSize, size / gridSize, size / gridSize)
        const material = new MeshBasicMaterial({ color })
        const square = new Mesh(geometry, material)
        const halfSquareSize = size / gridSize / 2
        const squareDiff = size / 2 - halfSquareSize

        square.position.x += (ii + 1) / gridSize * 2 - squareDiff
        square.position.z += (i + 1) / gridSize * 2 - squareDiff
        square.position.y = squareDiff

        group.add(square)
      }
    }
    group.rotation.x = rotationX
    group.rotation.z = rotationY
    return group
  }

  const createCubeFrame = (color: string) => {
    const pieceOfFrame = (x: number = 0, y: number = 0, z: number = 0) => {
      const group = new Group()
      for (let i = 0; i < gridSize; i++) {
        const geometry = new BoxGeometry(size / gridSize, size / gridSize, size / gridSize)
        const material = new MeshBasicMaterial({ color })
        const square = new Mesh(geometry, material)
        const halfSquareSize = size / gridSize / 2
        const squareDiff = size / 2 - halfSquareSize

        square.position.x += squareDiff
        square.position.z += i / gridSize * 2 - squareDiff
        square.position.y = squareDiff

        group.add(square)
      }
      group.rotation.set(x, y, z)
      return group
    }

    const group = new Group()
    // Top
    const firstPieceOfFrame = pieceOfFrame(0, 0, 0)
    const secondPieceOfFrame = pieceOfFrame(0, Math.PI, 0)
    const thirdPieceOfFrame = pieceOfFrame(0, Math.PI/2, 0)
    const fourthPieceOfFrame = pieceOfFrame(0, Math.PI/2, Math.PI/2)

    // Sides
    const fifthPieceOfFrame = pieceOfFrame(Math.PI/2, 0, 0)
    const sixthPieceOfFrame = pieceOfFrame(Math.PI/2, Math.PI, 0)
    const seventhPieceOfFrame = pieceOfFrame(Math.PI/2, Math.PI, Math.PI)
    const eighthPieceOfFrame = pieceOfFrame(Math.PI/2, 0, Math.PI)

    // Bottom
    const ninthPieceOfFrame = pieceOfFrame(Math.PI, 0, 0)
    const tenthPieceOfFrame = pieceOfFrame(Math.PI, Math.PI, 0)
    const eleventhPieceOfFrame = pieceOfFrame(Math.PI, Math.PI/2, 0)
    const twelfthPieceOfFrame = pieceOfFrame(Math.PI, Math.PI/2, Math.PI/2)

    group.add(firstPieceOfFrame)
    group.add(secondPieceOfFrame)
    group.add(thirdPieceOfFrame)
    group.add(fourthPieceOfFrame)

    group.add(fifthPieceOfFrame)
    group.add(sixthPieceOfFrame)
    group.add(seventhPieceOfFrame)
    group.add(eighthPieceOfFrame)
    
    group.add(ninthPieceOfFrame)
    group.add(tenthPieceOfFrame)
    group.add(eleventhPieceOfFrame)
    group.add(twelfthPieceOfFrame)
    return group
  }

  const cube = React.useMemo(() => {
    const group = new Group()
    const frame = createCubeFrame('pink')
    const topSide = createCubeSide('blue', 0, 0)
    const frontSide = createCubeSide('green', Math.PI/2, 0)
    const leftSide = createCubeSide('red', Math.PI/2, Math.PI/2)
    const rightSide = createCubeSide('purple', Math.PI/2, -Math.PI/2)
    const backSide = createCubeSide('yellow', -Math.PI/2, 0)
    const bottomSide = createCubeSide('lime', Math.PI, 0)

    group.add(frame)
    group.add(topSide)
    group.add(frontSide)
    group.add(leftSide)
    group.add(rightSide)
    group.add(backSide)
    group.add(bottomSide)
    return group
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gridSize, size])

  const sphereGeometry =  React.useMemo(() => new SphereGeometry(0.5, 32, 32), [])
  const sphereMaterial =  React.useMemo(() => new MeshBasicMaterial({ color: 0xff8000 }), [])
  const sphere =  React.useMemo(() => new Mesh(sphereGeometry, sphereMaterial), [sphereGeometry, sphereMaterial])
  const [spherePosition, setSpherePosition] = React.useState<{ x: number; y: number; z: number }>({ x: 0, y: 0, z: 0 })

  const group = React.useMemo(() => {
    const group = new Group()
    group.add(plainCube)
    group.add(sphere)
    group.add(cube)
    group.rotation.set(cubeRotation.x, cubeRotation.y, cubeRotation.z)
    plainCube.position.set(cubePosition.x, cubePosition.y, cubePosition.z)
    sphere.position.set(spherePosition.x, spherePosition.y, spherePosition.z)
    return group
  }, [plainCube, sphere, cubeRotation, cubePosition, spherePosition, cube])

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
  
  return <canvas ref={canvasRef} style={{ width: "100vw", height: "100vh", background: 'black' }} />
}

export default Cube
