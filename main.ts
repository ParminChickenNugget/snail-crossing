namespace SpriteKind {
    export const UnCollectedBerry = SpriteKind.create()
    export const CollectedBerry = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    snail.y += -16
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    snail.x += -16
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.UnCollectedBerry, function (snail, berry) {
    if (heldBerry == null) {
        heldBerry = berry
        berry.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
        berry.setKind(SpriteKind.CollectedBerry)
        berriesLeft += 0 - 1
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    snail.x += 16
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    snail.y += 16
})
scene.onOverlapTile(SpriteKind.Player, sprites.castle.tileGrass2, function (sprite, location) {
    if (heldBerry != null) {
        music.baDing.playUntilDone()
        tiles.placeOnTile(heldBerry, location)
        heldBerry.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
        heldBerry = null
if (berriesLeft == 0) {
            game.over(true)
        }
    }
})
function spawnBerries (numBerries: number, startColumn: number, startRow: number, gap: number) {
    for (let index = 0; index < numBerries; index++) {
        berry = sprites.create(img`
            . . . . . . . 6 . . . . . . . . 
            . . . . . . 8 6 6 . . . 6 8 . . 
            . . . e e e 8 8 6 6 . 6 7 8 . . 
            . . e 2 2 2 2 e 8 6 6 7 6 . . . 
            . e 2 2 4 4 2 7 7 7 7 7 8 6 . . 
            . e 2 4 4 2 6 7 7 7 6 7 6 8 8 . 
            e 2 4 5 2 2 6 7 7 6 2 7 7 6 . . 
            e 2 4 4 2 2 6 7 6 2 2 6 7 7 6 . 
            e 2 4 2 2 2 6 6 2 2 2 e 7 7 6 . 
            e 2 4 2 2 4 2 2 2 4 2 2 e 7 6 . 
            e 2 4 2 2 2 2 2 2 2 2 2 e c 6 . 
            e 2 2 2 2 2 2 2 4 e 2 e e c . . 
            e e 2 e 2 2 4 2 2 e e e c . . . 
            e e e e 2 e 2 2 e e e c . . . . 
            e e e 2 e e c e c c c . . . . . 
            . c c c c c c c . . . . . . . . 
            `, SpriteKind.UnCollectedBerry)
        berry.z = -1
        tiles.placeOnTile(berry, tiles.getTileLocation(startColumn, startRow))
        startColumn += 1 + gap
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy()
})
let left_car: Sprite = null
let right_car: Sprite = null
let startColumn = 0
let berry: Sprite = null
let berriesLeft = 0
let snail: Sprite = null
let heldBerry: Sprite = null
info.setLife(5)
tiles.setTilemap(tilemap`level1`)
scene.setBackgroundColor(13)
snail = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . c c . . . . 
    . . . . . . c c c c 6 3 c . . . 
    . . . . . c 6 6 3 3 3 6 c . . . 
    . . . . c 6 6 3 3 3 3 3 3 c . . 
    b c c c 6 6 c c 3 3 3 3 3 3 c . 
    b 5 5 c 6 c 5 5 c 3 3 3 3 3 c . 
    f f 5 c 6 c 5 f f 6 3 3 3 c c . 
    f f 5 c c c 5 f f 6 6 6 6 c c . 
    . b 5 5 3 5 5 c 3 3 3 3 3 3 c . 
    . c 5 5 5 5 4 c c c 3 3 3 3 c . 
    . c 4 5 5 4 4 b 5 5 c 3 3 c . . 
    . c 5 b 4 4 b b 5 c b b c . . . 
    . c c 5 4 c 5 5 5 c c 5 c . . . 
    . . . c c 5 5 5 5 c c c c . . . 
    . . . . c c c c c c . . . . . . 
    `, SpriteKind.Player)
tiles.placeOnTile(snail, tiles.getTileLocation(8, 29))
scene.cameraFollowSprite(snail)
snail.setStayInScreen(true)
spawnBerries(4, 5, 1, 1)
berriesLeft = 4
game.onUpdateInterval(500, function () {
    right_car = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . 2 2 2 2 2 2 2 2 . . . . 
        . . . 2 4 2 2 2 2 2 2 c 2 . . . 
        . . 2 c 4 2 2 2 2 2 2 c c 2 . . 
        . 2 c c 4 4 4 4 4 4 2 c c 4 2 d 
        . 2 c 2 e e e e e e e b c 4 2 2 
        . 2 2 e b b e b b b e e b 4 2 2 
        . 2 e b b b e b b b b e 2 2 2 2 
        . e e 2 2 2 e 2 2 2 2 2 e 2 2 2 
        . e e e e e e f e e e f e 2 d d 
        . e e e e e e f e e f e e e 2 d 
        . e e e e e e f f f e e e e e e 
        . e f f f f e e e e f f f e e e 
        . . f f f f f e e f f f f f e . 
        . . . f f f . . . . f f f f . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    tiles.placeOnRandomTile(right_car, assets.tile`tile`)
    right_car.vx = 50
    right_car.x = -20
    right_car.setFlag(SpriteFlag.DestroyOnWall, true)
    left_car = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . 2 2 2 2 2 2 2 2 . . 
        . . . . . 2 c 2 2 2 2 2 2 4 2 . 
        . . . . 2 c c 2 2 2 2 2 2 4 c 2 
        . . d 2 4 c c 2 4 4 4 4 4 4 c c 
        . d 2 2 4 c b e e e e e e e 2 c 
        . 2 2 2 4 b e e b b b e b b e 2 
        . 2 2 2 2 2 e b b b b e b b b e 
        . 2 2 2 2 e 2 2 2 2 2 e 2 2 2 e 
        . 2 d d 2 e f e e e f e e e e e 
        . d d 2 e e e f e e f e e e e e 
        . e e e e e e e f f f e e e e e 
        . e e e e f f f e e e e f f f f 
        . . . e f f f f f e e f f f f f 
        . . . . f f f f . . . . f f f . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    tiles.placeOnRandomTile(left_car, sprites.vehicle.roadHorizontal)
    left_car.vx = -50
    left_car.x = 180
    left_car.setFlag(SpriteFlag.DestroyOnWall, true)
})
