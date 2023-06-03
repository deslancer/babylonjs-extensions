import {
    Engine,
    Scene,
    Color4,
    Vector3,
    ArcRotateCamera,
    HemisphericLight,
    CubeTexture,
    SceneLoader,
    Color3
} from 'babylonjs'
import 'babylonjs-loaders';
import { Hotspot } from "./Hotspot.ts";
function createDemoScene(canvas: HTMLCanvasElement) {

    const engine = new Engine(canvas, true, {doNotHandleContextLost: true});
    const scene = new Scene(engine);
    scene.clearColor = new Color4(1.0, 1.0, 1.0, 1);
    scene.collisionsEnabled = true;
    const light = new HemisphericLight(
        'HemiLight',
        new Vector3(0, 1, -15),
        scene,
    );
    light.intensity = 0.7;
    const camera = new ArcRotateCamera(
        'arcRotateCamera',
        1.13,
        Math.PI / 2.3,
        100,
        new Vector3(0, 20, -3),
        scene,
    );
    camera.zoomToMouseLocation = true;
    camera.wheelDeltaPercentage = 0.01;
    camera.lowerRadiusLimit = 50;
    camera.upperRadiusLimit = 150;
    camera.attachControl(canvas, false);

    const debugLayer = scene.debugLayer;
    debugLayer.show({
        overlay: true,
        globalRoot: document.body
    }).then(()=> console.log("App in debug mode"));

    SceneLoader.AppendAsync(
        'https://assets.babylonjs.com/meshes/vintageDeskFan/',
        "vintageFan_animated.gltf",
        scene,
    )
    const testHotspot = new Hotspot('test',1, new Vector3(10.0, 25.5, 10.0), scene)
    testHotspot.size = 3;
    testHotspot.shape = 1;
    scene.environmentTexture = CubeTexture.CreateFromPrefilteredData(
        'assets/textures/royal_esplanade.env',
        scene,
    );

    engine.runRenderLoop(() => {
        scene.render();
    });

    function resize() {
        engine.resize();
    }

    window.addEventListener('resize', resize);
}
window.addEventListener('load',()=> {
    const canvas = document.querySelector('canvas');
    if (canvas) {
        createDemoScene(canvas)
    }
})

