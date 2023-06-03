import { Color3, Scene, Vector3, MeshBuilder, Mesh, Texture, StandardMaterial } from 'babylonjs'
enum Shapes {
    'circle',
    'square'
}
export class Hotspot {
    private _name: string = '';
    private _size: number = 0;
    private _shape: Shapes = 0;
    private _shapeMesh: Mesh | undefined = undefined;
    private _position = new Vector3(0.0, 0.0, 0.0);
    private readonly _scene: Scene | undefined = undefined;
    constructor(name: string, size: number,position: Vector3, scene: Scene) {
        this._size = size;
        this._name = name;
        this._position = position;
        this._scene = scene;
        this._create()
    }
    private _create(){
        this._shapeMesh = this._createShape();
        const dotTexture = this._createDotTexture('rgb(255, 234, 40)','rgb(0, 135, 195)')
        const material = new StandardMaterial("infoMat", this._scene);
        material.useAlphaFromDiffuseTexture = true;
        material.diffuseTexture = new Texture(dotTexture, this._scene);
        material.diffuseColor = new Color3(1, 1, 1);
        material.emissiveColor = new Color3(1, 1, 1);
        material.disableLighting = true;
        material.diffuseTexture.hasAlpha = true;
        this._shapeMesh.material = material;
        this._shapeMesh.position = this._position;
        this._shapeMesh.billboardMode = Mesh.BILLBOARDMODE_Y;
    }
    private _dispose(){
        this._shapeMesh?.dispose();
    }
    private _createShape(): Mesh{
        let mesh: Mesh | undefined;
        switch (this._shape) {
            case Shapes.circle:
                mesh = MeshBuilder.CreateDisc(this._name, {
                    radius: this._size,
                    sideOrientation: Mesh.DOUBLESIDE
                }, this._scene);
                break;

            case Shapes.square:
                mesh = MeshBuilder.CreatePlane(this._name, {
                    size: this._size,
                    sideOrientation: Mesh.DOUBLESIDE,
                }, this._scene);

                break;
            default:
                mesh = MeshBuilder.CreateDisc(this._name, {
                    radius: this._size,
                    sideOrientation: BABYLON.Mesh.DOUBLESIDE
                }, this._scene);
        }
        return <Mesh>mesh
    }
    private _createDotTexture(mainColor: string, dotColor: string) {
        let canvas = document.createElement('canvas');
        canvas.style.background = 'white';
        canvas.width = 900;
        canvas.height = 900;
        document.body.appendChild(canvas);
        const ctx = canvas.getContext("2d");
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        //console.log(canvas)
        const radius = 180;
        const radius2 = 360;
        if  (ctx){
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius2, 0, 2 * Math.PI, false);
            ctx.lineWidth = 90;
            ctx.fillStyle = mainColor;
            ctx.fill();
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = dotColor;
            ctx.fill();
        }

        let result = canvas.toDataURL("image/svg");
        canvas.remove();
        return result
    }
    get size(): number {
        return this._size;
    }
    set size(value: number) {
        this._dispose();
        this._size = value;
        this._create();
    }

    get position(): Vector3{
        return this._position;
    }
    set position(newPosition: Vector3) {
        this._dispose();
        this._position = newPosition;
        this._create();
    }

    get shape(){
        return this._shape;
    }
    set shape(newShape: Shapes){
        this._dispose()
        this._shape = newShape
        this._create();
    }
}