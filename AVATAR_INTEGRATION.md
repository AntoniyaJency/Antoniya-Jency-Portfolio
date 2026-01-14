# Avatar Integration Guide

This guide will help you integrate your animated avatar into the portfolio website.

## Supported Avatar Types

The portfolio supports multiple avatar formats:

1. **Image/GIF Avatar** - Simple animated GIF or static image
2. **Lottie Animation** - JSON-based animations
3. **3D Model (GLB/GLTF)** - 3D avatars like Ready Player Me
4. **Animated SVG** - Custom SVG animations

## Integration Steps

### Option 1: Image/GIF Avatar (Easiest)

1. Place your avatar file (`.gif`, `.png`, `.jpg`, etc.) in the project folder
2. Open `script.js` and find the commented section at the bottom
3. Uncomment and update this line:

```javascript
window.addEventListener('load', () => {
    loadImageAvatar('path/to/your/avatar.gif');
});
```

4. Replace `'path/to/your/avatar.gif'` with your actual file path (e.g., `'avatar.gif'` or `'images/my-avatar.gif'`)

### Option 2: Lottie Animation

1. Get your Lottie JSON file URL or path
2. Open `index.html` and uncomment the Lottie container:
   ```html
   <div id="lottie-avatar" style="display: none;"></div>
   ```
3. In `script.js`, uncomment and configure:
   ```javascript
   loadLottieAvatar('path/to/your/animation.json');
   ```

### Option 3: 3D Model (Ready Player Me / GLB)

1. Export your 3D avatar as a `.glb` or `.gltf` file
2. Place it in your project folder
3. Open `index.html` and uncomment the model-viewer:
   ```html
   <model-viewer src="avatar.glb" alt="3D Avatar" class="avatar-3d" id="avatar-3d" 
       style="display: none;" camera-controls auto-rotate ar shadow-intensity="1"></model-viewer>
   ```
4. In `script.js`, uncomment and configure:
   ```javascript
   load3DAvatar('path/to/your/model.glb');
   ```

### Option 4: Animated SVG

1. Get your SVG code
2. Open `index.html` and uncomment the SVG container:
   ```html
   <div class="avatar-svg" id="avatar-svg" style="display: none;"></div>
   ```
3. In `script.js`, uncomment and configure:
   ```javascript
   loadSVGAvatar('<svg>Your SVG code here</svg>');
   ```

## Quick Start Example

If you have a GIF file named `avatar.gif` in the root folder:

1. Open `script.js`
2. Scroll to the bottom
3. Uncomment these lines:
   ```javascript
   window.addEventListener('load', () => {
       loadImageAvatar('avatar.gif');
   });
   ```

The placeholder will automatically hide when your avatar loads!

## Customization

### Adjust Avatar Size

Edit `styles.css` and modify the `.avatar-wrapper` class:
```css
.avatar-wrapper {
    max-width: 500px;  /* Change this */
    height: 500px;      /* Change this */
}
```

### Change Animation Speed

Edit the `avatar-float` animation in `styles.css`:
```css
@keyframes avatar-float {
    0%, 100% {
        transform: translateY(0) rotate(0deg);
    }
    50% {
        transform: translateY(-20px) rotate(2deg);  /* Adjust values */
    }
}
```

### Remove Glow Effect

In `styles.css`, remove or comment out:
```css
.avatar-wrapper::before {
    /* ... */
}
```

## Troubleshooting

- **Avatar not showing**: Check the file path is correct
- **Avatar too large/small**: Adjust `.avatar-wrapper` dimensions in CSS
- **Animation not working**: Ensure your file format is supported
- **3D model not loading**: Make sure the model-viewer script is loaded

## Need Help?

If you're using Ready Player Me or another avatar service, they usually provide:
- Direct image URLs (use Option 1)
- GLB/GLTF files (use Option 3)
- Embed codes (adapt to Option 4)

Check your avatar service's documentation for the best integration method.
