controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    snail.y += -16
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    snail.x += -16
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    snail.x += 16
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    snail.y += 16
})
let snail: Sprite = null
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
tiles.placeOnTile(snail, tiles.getTileLocation(8, 1))
scene.cameraFollowSprite(snail)
snail.setStayInScreen(true)
