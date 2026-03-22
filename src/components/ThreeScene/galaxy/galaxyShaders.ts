/** Galaxy point sprite: perspective-correct size with cap to avoid huge quads in the core. */
export const galaxyVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  attribute float aScale;
  varying vec3 vColor;
  void main() {
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectedPosition = projectionMatrix * viewPosition;
      gl_Position = projectedPosition;

      gl_PointSize = uSize * aScale;
      gl_PointSize *= (1.0 / -viewPosition.z);

      // Cap point size to prevent massive squares when flying through the core
      gl_PointSize = min(gl_PointSize, 150.0);

      vColor = color;
  }
`

/** Soft circular falloff; additive blend reads as volumetric glow. */
export const galaxyFragmentShader = /* glsl */ `
  uniform float uOpacity;
  varying vec3 vColor;
  void main() {
      float strength = distance(gl_PointCoord, vec2(0.5));
      strength = 1.0 - strength;
      strength = pow(strength, 3.0);

      vec3 finalColor = mix(vec3(0.0), vColor, strength);

      gl_FragColor = vec4(finalColor, uOpacity);
  }
`
