export default {
    rgbToHsv(rgb) {
        let h, s, v;
            
        const r = rgb[0] / 255,
            g = rgb[1] / 255,
            b = rgb[2] / 255,
            min = Math.min(r, g, b),
            max = Math.max(r, g, b);

        if (max == r && g >= b) {
            h = Math.round(60 * (g - b) / (max - min));
        } else if (max == r && g < b) {
            h = Math.round(60 * (g - b) / (max - min) + 360);
        } else if (max == g) {
            h = Math.round(60 * (b - r) / (max - min) + 120);
        } else if (max == b) {
            h = Math.round(60 * (r - g) / (max - min) + 240);
        }
        v = Math.round(max * 100);
        s = max == 0 ? 0 : Math.round((1 - min / max) * 100);

        return [h, s, v];
    },
    hsvToRgb(hsv) {
        let [h, s, v] = hsv;

        s = s / 100;
        v = v / 100;

        let c = v * s,
            x = c * (1 - Math.abs((h / 60) % 2 - 1)),
            m = v - c;
        
        c = Math.round((c + m) * 255);
        x = Math.round((x + m) * 255);
        m = Math.round(m * 255);
        
        if (h < 60) {
            return [c, x, m];
        } else if (h < 120) {
            return [x, c, m];
        } else if (h < 180) {
            return [m, c, x];
        } else if (h < 240) {
            return [m, x, c];
        } else if (h < 300) {
            return [x, m, c];
        } else if (h < 360) {
            return [c, m, x];
        } else if (h == 360) {
            return [c, x, m];
        }
    },
    cssToRgb(cssColor) {
        let rgb = [];

        for (let i = 0; i < 3; i++) {
            rgb[i] = parseInt(cssColor.substr(i * 2, 2), 16);
        }

        return rgb;
    },
    rgbToCss(rgb) {
        return Number(0x1000000 + rgb[0] * 0x10000 + rgb[1] * 0x100 + rgb[2]).toString(16).substring(1).toUpperCase();
    },
    compareCss(cssColorA, cssColorB) {
        if (this.rgbToHsv(this.cssToRgb(cssColorA))[0] > this.rgbToHsv(this.cssToRgb(cssColorB))[0]) return 1;
        if (this.rgbToHsv(this.cssToRgb(cssColorA))[0] < this.rgbToHsv(this.cssToRgb(cssColorB))[0]) return -1;
        return 0;
    }
};