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

  void main() {
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

/** Diamond SDF in point space; color shifts toward CSS `--cyan-atom` as assembly completes. */
export const handFragmentShader = /* glsl */ `
  uniform float uOpacity;
  uniform float uAssembleProgress;
  uniform vec3 uEndColor;
  varying vec3 vColor;
  void main() {
      vec2 p = gl_PointCoord * 2.0 - 1.0;

      float dist = abs(p.x) + abs(p.y);

      float delta = fwidth(dist);
      float alpha = smoothstep(1.0 + delta, 1.0 - delta, dist) * uOpacity;

      if (alpha < 0.02) {
          discard;
      }

      vec3 baseColor = vColor * 0.35;
      float endColorMix = smoothstep(0.82, 1.0, uAssembleProgress);
      vec3 finalColor = mix(baseColor, uEndColor, endColorMix);

      gl_FragColor = vec4(finalColor, alpha);
  }
`
