import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { AmbientLight, Material, MeshDepthMaterial } from 'three'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

/**
 * Object
 */

 const material = new THREE.MeshStandardMaterial()
 material.roughness = 0.75
 material.metalness = 0.95

 const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    material
)
cube.position.y = 2

scene.add(cube)
const centerPlanet = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32), 
    material
)
scene.add(centerPlanet)

const planetwo = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32), 
    material
)

planetwo.position.x = 2
planetwo.position.y = 1
planetwo.position.z = 0.5

scene.add(planetwo)

const planetthree = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32), 
    material
)

planetthree.position.x = -2
planetthree.position.y = -1
planetthree.position.z = -0.5

scene.add(planetthree)

const sun = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 32), 
    material
)
sun.position.x = 7
sun.position.y = 3.5
scene.add(sun)

const pluto = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 32), 
    material
)
pluto.position.x = -7 
pluto.position.z = 3.0
scene.add(pluto)

const ufo = new THREE.Mesh(
    new THREE.CapsuleGeometry(1, 2,2), 
    material
)
ufo.position.x = -3
ufo.position.z = 3 
ufo.position.y=-1
scene.add(ufo)

const ufo2  = new THREE.Mesh(
    new THREE.CapsuleGeometry(1, 2, 2), 
    material
)
ufo2.position.x = 3
ufo2.position.z = -3
ufo2.position.y = -1
scene.add(ufo2)

const jupitor = new THREE.Mesh(
    new THREE.SphereGeometry(10, 50, 32), 
    material
)
jupitor.position.z = -60
jupitor.position.y = 3
jupitor.position.x = -35
scene.add(jupitor)

const flat = new THREE.Mesh(
    new THREE.PlaneGeometry(15,15),
    material
)
flat.rotation.x = - Math.PI * 0.5
flat.position.y = - 2

scene.add(flat)

gui.add(material, 'roughness').min(0).max(3)
gui.add(material, 'metalness').min(0).max(3).step(0.0001)


//Light 

const topLight = new THREE.PointLight(0x4e00ff, 3)
scene.add(topLight)


const ambient = new THREE.AmbientLight(0xff9000)
ambient.position.set(2, 1, 2)
scene.add(ambient)



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 15
camera.position.y = 6
camera.position.z = 10
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    //cube animation 
    cube.rotation.x = 1 * elapsedTime
    cube.rotation.y = 1 * elapsedTime

    //ufo 1 and 2 animations 
    ufo.rotation.y = 3 * elapsedTime
    ufo2.rotation.y = 3 * elapsedTime

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()