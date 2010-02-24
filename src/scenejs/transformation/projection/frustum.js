/**
 * Scene node that specifies the current viewing volume and projection matrix
 */
SceneJS.frustum = function() {
    var cfg = SceneJS._utils.getNodeConfig(arguments);
    var backend = SceneJS._backends.getBackend('projection');
    var projection;
    return SceneJS._utils.createNode(
            function(scope) {
                if (!projection || cfg.fixed) {    // Memoize matrix if node config is constant
                    var params = cfg.getParams(scope);
                    var volume = {
                        xmin: params.left || -1.0,
                        xmax: params.right || 1.0,
                        ymin: params.bottom || -1.0,
                        ymax: params.top || 1.0,
                        zmin: params.near || 0.1,
                        zmax: params.far || 100.0
                    };
                    var tempMat = SceneJS._math.frustumMatrix4(
                            volume.xmin,
                            volume.xmax,
                            volume.ymin,
                            volume.ymax,
                            volume.zmin,
                            volume.zmax
                            );
                    projection = {
                        matrix: tempMat
                    };
                }
                var prevProjection = backend.getTransform();
                backend.setTransform(projection);
                SceneJS._utils.visitChildren(cfg, scope);
                backend.setTransform(prevProjection);
            });
};