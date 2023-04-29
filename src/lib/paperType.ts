export function drawDots(ctx: any) {
  if (ctx) {
    let r = 2
    let cw = 30
    let ch = 30
    let vw = ctx?.canvas?.width
    let vh = ctx?.canvas?.height

    for (var x = 20; x < vw; x += cw) {
      for (var y = 20; y < vh; y += ch) {
        ctx.fillStyle = "#cbd5e1"
        ctx?.fillRect(x - r / 2, y - r / 2, r, r)
      }
    }
  }
}
