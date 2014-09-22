/**
 * Depth-of-Field postprocess effect
 *
 */
SceneJS.Types.addType("postprocess/sepia", {

    construct: function (params) {

        var colorTargetId = this.id + ".colorTarget";

        this.addNodes([
            {
                type: "stage",
                priority: 1,
                nodes: [
                    {
                        type: "colorTarget",
                        id: colorTargetId,
                        nodes: params.nodes
                    }
                ]
            },
            {
                type: "stage",
                priority: 2,

                nodes: [
                    {
                        type: "textureMap",
                        target: colorTargetId,

                        nodes: [
                            {
                                type: "flags",
                                flags: {
                                    picking: false
                                },

                                nodes: [
                                    {
                                        type: "shader",
                                        shaders: [
                                            {
                                                stage: "vertex",
                                                code: [
                                                    "attribute vec3 SCENEJS_aVertex;",
                                                    "attribute vec2 SCENEJS_aUVCoord;",
                                                    "varying vec2 vUv;",
                                                    "void main () {",
                                                    "    gl_Position = vec4(SCENEJS_aVertex, 1.0);",
                                                    "    vUv = SCENEJS_aUVCoord;",
                                                    "}"
                                                ]
                                            },
                                            {
                                                stage: "fragment",
                                                code: [
                                                    "precision mediump float;",
                                                    "uniform sampler2D SCENEJS_uSampler0;",
                                                    "uniform float amount;",
                                                    "varying vec2 vUv;",
                                                    "void main() {",
                                                    "   vec4 color = texture2D( SCENEJS_uSampler0, vUv );",
                                                    "   vec3 c = color.rgb;",
                                                    "   color.r = dot( c, vec3( 1.0 - 0.607 * amount, 0.769 * amount, 0.189 * amount ) );",
                                                    "   color.g = dot( c, vec3( 0.349 * amount, 1.0 - 0.314 * amount, 0.168 * amount ) );",
                                                    "   color.b = dot( c, vec3( 0.272 * amount, 0.534 * amount, 1.0 - 0.869 * amount ) );",
                                                    "   gl_FragColor = vec4( min( vec3( 1.0 ), color.rgb ), color.a );",
                                                    "}"
                                                ]
                                            }
                                        ],
                                        params: {
                                            amount: 0.4
                                        },

                                        nodes: [

                                            // Quad primitive, implemented by plugin at
                                            // http://scenejs.org/api/latest/plugins/node/geometry/quad.js
                                            {
                                                type: "geometry/quad"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]);
    }
});
