class Overworld extends Phaser.Scene {
    constructor() {
        super('overworldScene')
    }

    init() {
        this.VEL = 100  // slime velocity constant
    }

    preload() {
        this.load.path = './assets/'
        this.load.spritesheet('slime', 'slime.png', {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.tilemapTiledJSON('map', 'tilemap.json')
        this.load.image('tiles', 'tileset.png')
    }

    create() {
        

        // input
        this.cursors = this.input.keyboard.createCursorKeys()

        const map = this.make.tilemap({key: 'map'})
        const tileset = map.addTilesetImage('tileset', 'tiles')
        const groundLayer = map.createLayer('groundLayer', tileset, 0, 0)
        const collisionLayer = map.createLayer('collisionLayer', tileset, 0, 0)
    
        collisionLayer.setCollisionByProperty({collides: true})

        // add slime
        this.slime = this.physics.add.sprite(32, 32, 'slime', 0)
        this.slime.body.setCollideWorldBounds(true)

        // slime animation
        this.anims.create
        ({
            key: "jiggle",
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('slime',
            {
                start: 0,
                end: 1
            })
        })

        this.slime.anims.play("jiggle")
    
        this.physics.add.collider(this.slime, collisionLayer)
        
    }

    update() {
        // slime movement
        this.direction = new Phaser.Math.Vector2(0)
        if(this.cursors.left.isDown) {
            this.direction.x = -1
        } else if(this.cursors.right.isDown) {
            this.direction.x = 1
        }

        if(this.cursors.up.isDown) {
            this.direction.y = -1
        } else if(this.cursors.down.isDown) {
            this.direction.y = 1
        }

        this.direction.normalize()
        this.slime.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y)
    }

}