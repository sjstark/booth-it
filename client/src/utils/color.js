
//brightens (+) or darkens (-) a hex color and returns with or without # (based on input)
export function LightenDarkenColor(col, amt) {
  let usePound = false;
  if (col[0] == "#") {
    col = col.slice(1);
    usePound = true;
  }

  let num = parseInt(col, 16);

  let r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  let b = ((num >> 8) & 0x00FF) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  let g = (num & 0x0000FF) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}


//returns an object of {r, g, b} if success, null if not. can take eithe '#a1b2c3' or 'a1b2c3'
export const hexToRgb = (hex) => {
  // Use regex to parse r, g, b into result
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

export const alphaToHex = (a) => {
  a = Math.round(a * 255).toString(16)
  if (a.length == 1) a = "0" + a;
  return a
}

// takes hex background color and gets luminence to determine font color
export const getTextColor = (col) => {
  if (col[0] == "#") {
    col = col.slice(1);
  }

  let color = hexToRgb(col)

  let tracker = {}
  for (const key in color) {
    let c = color[key]
    c = c / 255
    if (c <= 0.03928) {
      tracker[key] = c / 12.92
    } else {
      tracker[key] = Math.pow(((c + 0.055) / 1.055), 2.4)
    }
  }
  const L = tracker.r * 0.2126 + tracker.g * 0.7152 + tracker.b * 0.0722

  return L > 0.179 ? '#000000' : '#ffffff'
}
