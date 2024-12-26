/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    draw(mvp, modelView, normalMatrix, modelMatrix) {        
        /**
         * @Task1 : Implement the draw function for the SceneNode class.
         */
        let transformedModel = mat4.multiply(mat4.create(), modelMatrix, normalMatrix); 
        let transformedModelView = mat4.multiply(mat4.create(), modelView, normalMatrix); 
        let transformedMvp = mat4.multiply(mat4.create(), mvp, normalMatrix); 
        let transformedNormals = mat3.normalFromMat4(mat3.create(), transformedModelView); 
        
        /*var transformedMvp = mvp;
        var transformedModelView = modelView;
        var transformedNormals = normalMatrix;
        var transformedModel = modelMatrix;
        */

        // Draw the MeshDrawer
        if (this.meshDrawer) {
            this.meshDrawer.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        }

        //Update the child nodes 
        for (let child of this.children) {
        child.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        }
    }

    

}