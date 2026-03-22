/**
 * Hands: scatter → assemble in world space; travel offsets for the horizontal “reach” motion.
 * Uses hash-based randomness from position + aRandom to avoid banding.
 */
export const handVertexShader = /* glsl */ `
  uniform float uPointSizeMultiplier;
  uniform float uAssembleProgress;
  uniform float uViewportHeight;
  uniform float uTravelProgress;
  uniform float uTravelDirection;
  uniform float uTravelDistance;
  uniform float uTravelVerticalDirection;
  uniform float uTravelVerticalDistance;
  attribute float aScale;
  attribute vec3 aRandom;
  varying vec3 vColor;
  varying float vParticleScale;

  void main() {
      vParticleScale = aScale;
      float rand1 = fract(sin(dot(position.xy, vec2(12.9898, 78.233))) * 43758.5453);
      float rand2 = fract(sin(dot(position.yx, vec2(93.989, 67.345))) * 43758.5453);
      float rand3 = fract(sin(dot(position.xy + aRandom.xy, vec2(43.141, 19.233))) * 43758.5453);

      vec4 modelPosition = modelMatrix * vec4(position, 1.0);

      vec3 scatteredWorldPos = modelPosition.xyz;

      scatteredWorldPos.x += (rand1 - 0.5) * uViewportHeight * 10.0;
      scatteredWorldPos.y += (rand2 - 0.5) * uViewportHeight * 10.0;
      scatteredWorldPos.z += (rand3 - 0.5) * uViewportHeight * 5.0;

      float smoothProgress = 1.0 - pow(1.0 - uAssembleProgress, 3.0);

      vec3 finalWorldPos = mix(scatteredWorldPos, modelPosition.xyz, smoothProgress);
      float travelEase = 1.0 - pow(clamp(uTravelProgress, 0.0, 1.0), 2.5);
      finalWorldPos.x += uTravelDirection * uTravelDistance * travelEase;
      finalWorldPos.y += uTravelVerticalDirection * uTravelVerticalDistance * travelEase;

      vec4 viewPosition = viewMatrix * vec4(finalWorldPos, 1.0);
      vec4 projectedPosition = projectionMatrix * viewPosition;

      gl_Position = projectedPosition;

      gl_PointSize = aScale * uPointSizeMultiplier * (10.0 / -viewPosition.z);

      vColor = color;
  }
`

/**
 * Silhouette matches background stars: same diamond canvas as `createStarTexture` (rotated square).
 * Highlights follow baked SVG luminance + scale so bright cells read like the reference, not flat white.
 */
export const handFragmentShader = /* glsl */ `
  uniform float uOpacity;
  uniform float uAssembleProgress;
  uniform vec3 uEndColor;
  uniform sampler2D uDiamondMap;
  uniform float uHighlightScaleThreshold;
  uniform vec3 uHighlightSoft;
  uniform vec3 uHighlightPeak;

  varying vec3 vColor;
  varying float vParticleScale;

  void main() {
      vec2 uv = gl_PointCoord;
      vec4 sprite = texture2D(uDiamondMap, uv);
      float mask = sprite.a;

      float assemble = clamp(uAssembleProgress, 0.0, 1.0);
      float feather = mix(0.62, 1.0, smoothstep(0.0, 0.82, assemble));
      mask = mix(pow(max(mask, 0.001), 0.72), mask, smoothstep(0.0, 0.75, assemble));
      mask *= feather;

      float alpha = mask * uOpacity;
      if (alpha < 0.02) {
          discard;
      }

      vec3 baseColor = vColor * 0.35;
      float endColorMix = smoothstep(0.82, 1.0, assemble);
      vec3 bodyColor = mix(baseColor, uEndColor, endColorMix);

      float svgBright = max(max(vColor.r, vColor.g), vColor.b);
      float svgHot = smoothstep(0.38, 0.94, svgBright);

      float bigGem = smoothstep(
          uHighlightScaleThreshold * 0.95,
          uHighlightScaleThreshold * 1.1,
          vParticleScale
      );

      float settle = smoothstep(0.72, 1.0, assemble);
      float sparkle = fract(sin(dot(vColor.xy + vColor.zz, vec2(12.9898, 78.233))) * 43758.5453);

      float highlightAmt = svgHot * bigGem * settle * (0.58 + 0.42 * sparkle);
      vec3 peakTint = mix(uHighlightSoft, uHighlightPeak, smoothstep(0.65, 1.0, svgBright) * (0.5 + 0.5 * sparkle));
      vec3 finalColor = mix(bodyColor, peakTint, highlightAmt * 0.62);

      gl_FragColor = vec4(finalColor, alpha);
  }
`
