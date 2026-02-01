// Polyfill for CanvasRenderingContext2D.roundRect (not supported in all browsers)
export function addRoundRectPolyfill() {
  if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function (
      x: number,
      y: number,
      width: number,
      height: number,
      radius: number | number[]
    ) {
      if (width < 0 || height < 0) {
        throw new DOMException("Width and height must be non-negative");
      }

      // Handle radius parameter
      let radii: [number, number, number, number];
      if (Array.isArray(radius)) {
        if (radius.length === 1) {
          radii = [radius[0], radius[0], radius[0], radius[0]];
        } else if (radius.length === 2) {
          radii = [radius[0], radius[1], radius[0], radius[1]];
        } else if (radius.length === 4) {
          radii = [radius[0], radius[1], radius[2], radius[3]];
        } else {
          throw new DOMException("Invalid radius array length");
        }
      } else {
        radii = [radius, radius, radius, radius];
      }

      const [topLeft, topRight, bottomRight, bottomLeft] = radii;

      this.beginPath();
      this.moveTo(x + topLeft, y);
      this.lineTo(x + width - topRight, y);
      this.arcTo(x + width, y, x + width, y + topRight, topRight);
      this.lineTo(x + width, y + height - bottomRight);
      this.arcTo(x + width, y + height, x + width - bottomRight, y + height, bottomRight);
      this.lineTo(x + bottomLeft, y + height);
      this.arcTo(x, y + height, x, y + height - bottomLeft, bottomLeft);
      this.lineTo(x, y + topLeft);
      this.arcTo(x, y, x + topLeft, y, topLeft);
      this.closePath();
    };
  }
}