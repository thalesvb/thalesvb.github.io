var TopGear = {
    Car : {
        White : {
            straight : [
                {
                    offset : new THREE.Vector2(0.005,0.93),
                    repeat : new THREE.Vector2(0.1,0.07)
                },
                {
                    offset : new THREE.Vector2(0.106,0.932),
                    repeat : new THREE.Vector2(0.10,0.07)
                },
            ],
            curveSoft : [
                {
                    offset : new THREE.Vector2(0.0,0.87),
                    repeat : new THREE.Vector2(0.1,0.07)
                },
                {
                    offset : new THREE.Vector2(0.11,0.87),
                    repeat : new THREE.Vector2(0.1,0.07)
                },
            ],
            curveHard : [
                {
                    offset : new THREE.Vector2(0.0,0.80),
                    repeat : new THREE.Vector2(0.1,0.07)
                },
                {
                    offset : new THREE.Vector2(0.115,0.80),
                    repeat : new THREE.Vector2(0.1,0.07)
                },
            ],
            viewTop : {
                offset : new THREE.Vector2(0.235,0.89),
                repeat : new THREE.Vector2(0.23,0.11)
            },
            viewSide : {
                offset : new THREE.Vector2(0.235,0.33),
                repeat : new THREE.Vector2(0.17,0.055)
            },
        },
        Purple : {
            straight : [
                {
                    offset : new THREE.Vector2(0.0025,0.73),
                    repeat : new THREE.Vector2(0.1,0.07)
                },
                {
                    offset : new THREE.Vector2(0.11685,0.73),
                    repeat : new THREE.Vector2(0.1,0.07)
                }
            ],
            curveSoft : [
                {
                    offset : new THREE.Vector2(0.01,0.665),
                    repeat : new THREE.Vector2(0.1,0.07)
                },
                {
                    offset : new THREE.Vector2(0.12,0.665),
                    repeat : new THREE.Vector2(0.1,0.07)
                }
            ],
            curveHard : [
                {
                    offset : new THREE.Vector2(0.01,0.605),
                    repeat : new THREE.Vector2(0.1,0.07)
                },
                {
                    offset : new THREE.Vector2(0.12,0.605),
                    repeat : new THREE.Vector2(0.1,0.07)
                }
            ],
            viewTop : {
                offset : new THREE.Vector2(0.235,0.66),
                repeat : new THREE.Vector2(0.23,0.11)
            },
            viewSide : {
                offset : new THREE.Vector2(0.235,0.405),
                repeat : new THREE.Vector2(0.17,0.055)
            },
        },
        Red : {
            straight : [
                {
                    offset : new THREE.Vector2(0.0,0.53),
                    repeat : new THREE.Vector2(0.1,0.07)
                },
                {
                    offset : new THREE.Vector2(0.119,0.53),
                    repeat : new THREE.Vector2(0.1,0.07)
                }
            ],
            curveSoft : [
                {
                    offset : new THREE.Vector2(0.0,0.47),
                    repeat : new THREE.Vector2(0.1,0.07)
                },
                {
                    offset : new THREE.Vector2(0.12,0.47),
                    repeat : new THREE.Vector2(0.1,0.07)
                }
            ],
            curveHard : [
                {
                    offset : new THREE.Vector2(0.005,0.40),
                    repeat : new THREE.Vector2(0.1,0.07)
                },
                {
                    offset : new THREE.Vector2(0.125,0.40),
                    repeat : new THREE.Vector2(0.1,0.07)
                }
            ],
            viewTop : {
                offset : new THREE.Vector2(0.235,0.775),
                repeat : new THREE.Vector2(0.23,0.11)
            },
            viewSide : {
                offset : new THREE.Vector2(0.235,0.475),
                repeat : new THREE.Vector2(0.17,0.06)
            },
        },
        Blue : {
            straight : [
                {
                    offset : new THREE.Vector2(0.0085,0.33),
                    repeat : new THREE.Vector2(0.1,0.07)
                },
                {
                    offset : new THREE.Vector2(0.1315,0.328),
                    repeat : new THREE.Vector2(0.1,0.07)
                }
            ],
            curveSoft : [
                {
                    offset : new THREE.Vector2(0.01,0.27),
                    repeat : new THREE.Vector2(0.1,0.07)
                },
                {
                    offset : new THREE.Vector2(0.13,0.26),
                    repeat : new THREE.Vector2(0.1,0.07)
                }
            ],
            curveHard : [
                {
                    offset : new THREE.Vector2(0.015,0.195),
                    repeat : new THREE.Vector2(0.1,0.07)
                },
                {
                    offset : new THREE.Vector2(0.13,0.195),
                    repeat : new THREE.Vector2(0.1,0.07)
                }
            ],
            viewTop : {
                offset : new THREE.Vector2(0.235,0.55),
                repeat : new THREE.Vector2(0.23,0.11)
            },
            viewSide : {
                offset : new THREE.Vector2(0.235,0.26),
                repeat : new THREE.Vector2(0.17,0.06)
            },
        }
    }
}

function getTexture() {
    var texture = new THREE.ImageUtils.loadTexture("index_res/043.png");
    return texture;
};
function createSprite(Object, size, transparent, opacity, color) {
var texture = getTexture();

var object = Object;

texture.offset = object.offset;
texture.repeat = object.repeat;
var spriteMaterial = new THREE.SpriteMaterial({
                        opacity: opacity,
                        color: color,
                        transparent: transparent,
                        useScreenCoordinates: false,
                        sizeAttenuation: true,
                        map: texture}
            );

            spriteMaterial.blending = THREE.AdditiveBlending;

            var sprite = new THREE.Sprite(spriteMaterial);
            sprite.scale.set(size, size, size);
            return [sprite, texture];
}

function Sprite(SpriteReference) {
    this.spriteData = SpriteReference;
    this.idleFrames = 3;
    var spriteObj = createSprite(this.spriteData[0], 1, false, 1, 0xffffff);
    this.sprite = spriteObj[0];
    this.texture = spriteObj[1];
    this.totalFramesIdx = (SpriteReference.length - 1) * this.idleFrames;
    this.currentFrame = 0;
    
    this.sprite.scale.y = 0.7;
    this.sprite.position.y = 1;
    this.sprite.position.z = 2.5;
    
    this.getSprite = function() {
        return this.sprite;
    };
    this.render = function() {
//        return;
        this.currentFrame = (this.currentFrame != this.totalFramesIdx) ? this.currentFrame + 1 : 0;
        var spriteData = this.spriteData[Math.floor(this.currentFrame/this.idleFrames)];
        this.texture.offset = spriteData.offset;
        this.texture.repeat = spriteData.repeat;
    };
}