import {
    AbstractMesh,
    ActionManager,
    ArcRotateCamera,
    Axis,
    Color3,
    Color4,
    DynamicTexture,
    Engine,
    ExecuteCodeAction,
    HemisphericLight,
    Mesh,
    MeshBuilder,
    Scene,
    Space,
    StandardMaterial,
    Vector3,
} from 'babylonjs'

export default class Render {

    canvas = null
    engine = null
    scene = null
    size = null
    camera = null
    cameraDistance = 0
    habitat = null
    sensors = {}
    theme = {}

    constructor(canvas, size, theme) {
        this.size = size
        this.cameraDistance = size.depth * 2
        this.canvas = canvas
        this.theme = theme
    }

    createScene () {
        this.engine = new Engine(this.canvas, true)
        this.scene = new Scene(this.engine)
        this.camera = new ArcRotateCamera("Camera", 0, 0, 10, new Vector3(0, 0, 0), this.scene)
        this.camera.setPosition(new Vector3(-65, 65, this.size.width*1.8))
        this.camera.attachControl(this.canvas, true)

        new HemisphericLight("HemiLight", new Vector3(0, 1, 0), this.scene).intensity = 0.5

        this.scene.clearColor = new Color3(this.theme.clearColor.r, this.theme.clearColor.g, this.theme.clearColor.b)
        this.scene.ambientColor = this.scene.clearColor

        return this
    }

    createHabitat () {
        this.habitat = MeshBuilder.CreateBox("habitat", this.size, this.scene)
        this.habitat.isPickable = false
        this.habitat.enableEdgesRendering()
        this.habitat.edgesWidth = 35
        this.habitat.edgesColor = new Color4(this.theme.edgeColor.r, this.theme.edgeColor.g, this.theme.edgeColor.b, 1)
        this.habitat.material = new StandardMaterial("habitatMaterial", this.scene)
        this.habitat.material.alpha = 0.05
        this.habitat.material.isPickable = false

        let habitatFrontBar = MeshBuilder.CreateLines("habitat_front", { points: [
                new Vector3(-this.size.width/2, -this.size.height*0.25, this.size.depth/2),
                new Vector3(this.size.width/2, -this.size.height*0.25, this.size.depth/2)
            ] }, this.scene)
        habitatFrontBar.color = new Color3(this.theme.edgeColor.r, this.theme.edgeColor.g, this.theme.edgeColor.b)
        habitatFrontBar.alpha = 0.2
        habitatFrontBar.parent = this.habitat
        habitatFrontBar.isPickable = false

        let habitatFrontDoors = MeshBuilder.CreateLines("habitat_doors", { points: [
                new Vector3(0, -this.size.height/2 + this.size.height*0.25, this.size.depth/2),
                new Vector3(0, this.size.height/2, this.size.depth/2)
            ] }, this.scene)
        habitatFrontDoors.color = new Color3(this.theme.edgeColor.r, this.theme.edgeColor.g, this.theme.edgeColor.b)
        habitatFrontDoors.alpha = 0.3
        habitatFrontDoors.parent = this.habitat
        habitatFrontDoors.isPickable = false

        let habitatFloor = MeshBuilder.CreatePlane("habitat_floor", {width: this.size.width, height: this.size.depth}, this.scene)
        habitatFloor.rotate(Axis.X, Math.PI/2, Space.LOCAL)
        habitatFloor.position = new Vector3(0, -this.size.height/2, 0)

        let habitatMaterial = new StandardMaterial("habitat_floor_mat", this.scene)
        habitatMaterial.diffuseColor = new Color3(0, 0, 0)
        habitatMaterial.alpha = 0.5
        habitatFloor.material = habitatMaterial
        habitatFloor.parent = this.habitat
        habitatFloor.isPickable = false

        return this
    }

    addSensor (id, position, text) {
        this.sensors[id] = MeshBuilder.CreateBox(id, {width: 10, height: 10, depth: 10}, this.scene)
        this.sensors[id].position.x = position.x
        this.sensors[id].position.y = position.y
        this.sensors[id].position.z = position.z
        this.sensors[id].material = new StandardMaterial(id + "_material", this.scene)
        this.sensors[id].material.emissiveColor = new Color3(this.theme.componentColor.r, this.theme.componentColor.g, this.theme.componentColor.b)

        let outputplane = Mesh.CreatePlane(id + "_outputplane",  this.size.width*2, this.scene, false)
        outputplane.billboardMode = AbstractMesh.BILLBOARDMODE_ALL
        outputplane.material = new StandardMaterial("outputplane", this.scene)
        outputplane.material.emissiveColor = new Color3(this.theme.componentColor.r, this.theme.componentColor.g, this.theme.componentColor.b)
        outputplane.position = new Vector3(0, 10, 0)
        outputplane.parent = this.sensors[id]
        outputplane.isPickable = false

        let outputplaneTexture = new DynamicTexture(id + "_outputplane_texture", 512, this.scene, true)
        outputplane.material.diffuseTexture = outputplaneTexture
        outputplaneTexture.drawText(text, null, null, "condensed 28px Roboto", this.theme.fontColor, "transparent")
        outputplaneTexture.hasAlpha = true
        outputplane.isPickable = false

        this.sensors[id].actionManager = new ActionManager(this.scene);
        this.sensors[id].actionManager.registerAction(
            new ExecuteCodeAction(ActionManager.OnPickTrigger, this.sensorClick)
        );

        return this
    }

    render () {
        this.engine.runRenderLoop(() => {
            this.scene.render()
        })

        window.addEventListener("resize", () => {
            this.engine.resize()
        })

        return this
    }

    sensorClick (meshEvent) {
        let pickedMesh = meshEvent.meshUnderPointer;
        window.vueApp.$emit('PhysicalSensorSelected', pickedMesh.name)
        window.console.log("Clicked physical sensor " + pickedMesh.name)
    }

}
