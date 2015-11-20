var init = function () {
    "use strict";
    SceneJS.setConfigs({
	physicsEngine: 'cannon',
	pluginPath: '/src/plugins'
    });
    var makeSphFluid = function () {
	var particles = [], i;
	for (i = 0; i < 1000; i += 1) {
	    particles.push({
		type: 'physics/body',
		friction: 0.05,
		mass: 1.0,
		movable: true,
		pos: [Math.random(), 10, Math.random()],
		restitution: 0.05,
		shape: 'particle',
		radius: 0.1,
		sphEnabled: false,
		velocity: [Math.random() * 2, 0, 0],
		nodes: [{
		    type: 'material',
		    color: { r: 0.5, g: 0.55, b: 1.0 },
		    nodes: [{
			type: 'geometry/sphere',
			latitudeBands: 4,
			longitudeBands: 4,
			radius: 0.1
		    }]
		}] 
	    });
	}
	return particles;
    }, scene = SceneJS.createScene({
	//canvasId: 'theCanvas',
	nodes: [{
	    type: 'cameras/orbit',
	    yaw: 20,
	    pitch: -20,
	    zoom: 30,
	    zoomSensivity: 1.0,
	    nodes: [{
		type: 'flags',
		flags: {
		    backfaces: false
		},
		nodes: [{ // The ground
		    type: 'physics/body',
		    depth: 1000,
		    dir: [0, 1, 0],
		    friction: 0.1,
		    height: 0,
		    mass: 0.0,
		    movable: false,
		    restitution: 0.3,
		    pos: [0, 0, 0], // Fixed pos
		    shape: 'plane',
		    velocity: [0, 0, 0],
		    width: 1000,
		    nodes: [{
			type: 'material',
			color: { r: 0.6, g: 0.6, b: 0.5 },
			nodes: [{
			    type: 'geometry/grid',
			    size: { x: 700, z: 700 },
			    xSegments: 100,
			    zSegments: 100
			}]
		    }]
		}, {
		    type: 'physics/body',
		    pos: [0, 0, 0],
		    shape: 'plane',
		}, {
		    type: 'node',
		    nodes: [{
			type: 'physics/body',
			depth: 2,
			friction: 0.01,
			height: 2,
			mass: 100,
			movable: true,
			pos: [-2.5, 12, 0],
			radius: 0.5,
			restitution: 0,
			shape: 'sphere',
			width: 2,
			nodes: [{
			    type: 'material',
			    color: { r: 0.7, g: 0.4, b: 0.5 },
			    nodes: [{
				type: 'geometry/sphere',
				radius: 0.5,
				xSize: 1,
				ySize: 1,
				zSize: 1
			    }]
			}]
		    }, {
			type: 'physics/body',
			depth: 4,
			friction: 10,
			height: 0.5,
			mass: 1,
			movable: false,
			pos: [2.5, 0.5, -3],
			restitution: 0,
			shape: 'box',
			width: 0.5,
			nodes: [{
			    type: 'material',
			    color: { r: 0.7, g: 0.4, b: 0.5 },
			    nodes: [{
				type: 'geometry/box',
				xSize: 0.25,
				ySize: 0.25,
				zSize: 2
			    }]
			}]
		    }, {
			nodes: [{
			    type: 'physics/body',
			    depth: 5.0,
			    height: 5.0,
			    id: 'bigbox',
			    mass: 101,
			    movable: true,
			    friction: 0.01,
			    pos: [0, 4.5, 0],
			    restitution: 0,
			    shape: 'box',
			    width: 5.0,
			    nodes: [{
				type: 'material',
				color: { r: 0.7, g: 0.7, b: 0.6 },
				nodes: [{
				    nodes: [{
					type: 'geometry/box',
					xSize: 2.5,
					ySize: 2.5,
					zSize: 2.5
				    }]
				}]
			    }]
			}, {
			    type: 'physics/body',
			    depth: 0.1,
			    height: 0.1,
			    shape: 'box',
			    width: 0.1
			}]
		    }].concat(makeSphFluid())
		}]
	    }]
	}]
    });
		
};
