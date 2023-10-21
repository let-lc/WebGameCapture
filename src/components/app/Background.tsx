import { useCallback, useEffect, useRef } from 'react';

import { useTheme } from 'next-themes';
import {
  DoubleSide,
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  ShaderMaterialParameters,
  WebGLRenderer,
} from 'three';

const getFragmentShader = (color = '#c500b0') => {
  const [r, g, b] = [
    parseInt(color.substring(1, 3), 16) / 255,
    parseInt(color.substring(3, 5), 16) / 255,
    parseInt(color.substring(5), 16) / 255,
  ];

  return `
    uniform float time;
    varying vec3 vEC;

    void main()
    {
      const vec3 up = vec3(0.0, 0.0, 1.0);
      vec3 x = dFdx(vEC);
      vec3 y = dFdy(vEC);
      vec3 normal = normalize(cross(x, y));
      float c = 1.0 - dot(normal, up);
      c = (1.0 - cos(c * c)) / 3.0;
      gl_FragColor = vec4(${r}, ${g}, ${b}, c * 1.5);
    }
  `;
};

const SHADER_PARAMS: ShaderMaterialParameters = {
  uniforms: {
    time: { value: 1.0 },
  },
  vertexShader: `
    varying vec3 vEC;
    uniform float time;

    float iqhash(float n) {
      return fract(sin(n) * 43758.5453);
    }

    float noise(vec3 x) {
      vec3 p = floor(x);
      vec3 f = fract(x);
      f = f * f * (3.0 - 2.0 * f);
      float n = p.x + p.y * 57.0 + 113.0 * p.z;
      return  mix(mix(mix(iqhash(n), iqhash(n + 1.0), f.x),
              mix(iqhash(n + 57.0), iqhash(n + 58.0), f.x), f.y),
              mix(mix(iqhash(n + 113.0), iqhash(n + 114.0), f.x),
              mix(iqhash(n + 170.0), iqhash(n + 171.0), f.x), f.y), f.z);
    }

    float xmb_noise2(vec3 x) {
      return cos(x.z * 4.0) * cos(x.z + time / 10.0 + x.x);
    }

    void main() {
      vec4 pos = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      vec3 v = vec3(pos.x, 0.0, pos.y);
      vec3 v2 = v;
      vec3 v3 = v;

      v.y = xmb_noise2(v2) / 8.0;

      v3.x -= time / 5.0;
      v3.x /= 4.0;

      v3.z -= time / 10.0;
      v3.y -= time / 100.0;

      v.z -= noise(v3 * 7.0) / 15.0;
      v.y -= noise(v3 * 7.0) / 15.0 + cos(v.x * 2.0 - time / 2.0) / 5.0 - 0.3;

      vEC = v;
      gl_Position = vec4(v, 1.0);
    }
  `,
  fragmentShader: getFragmentShader(),
  extensions: {
    derivatives: true,
    fragDepth: false,
    drawBuffers: false,
    shaderTextureLOD: false,
  },
  side: DoubleSide,
  transparent: true,
  depthTest: false,
};

// Port from: https://codepen.io/bsehovac/pen/jdawXK

const Background = () => {
  const ref = useRef<HTMLDivElement>(null);
  const scene = useRef<Scene>();
  const camera = useRef<PerspectiveCamera>();
  const renderer = useRef<WebGLRenderer>();
  const ribbon = useRef<Mesh<PlaneGeometry, ShaderMaterial>>();
  const { resolvedTheme } = useTheme();

  // initialize
  useEffect(() => {
    if (ref?.current && ref.current.childElementCount === 0) {
      scene.current = new Scene();
      camera.current = new PerspectiveCamera();
      camera.current.position.z = 2;

      renderer.current = new WebGLRenderer({ antialias: true, alpha: true });
      ref.current.appendChild(renderer.current.domElement);

      const planeGeometry = new PlaneGeometry(1, 1, 128, 128);
      const shaderMaterial = new ShaderMaterial(SHADER_PARAMS);
      ribbon.current = new Mesh(planeGeometry, shaderMaterial);

      scene.current.add(ribbon.current);

      const { offsetWidth, offsetHeight } = ref.current;

      renderer.current.setSize(offsetWidth, offsetHeight);
      renderer.current.setPixelRatio(devicePixelRatio);

      camera.current.aspect = offsetWidth / offsetHeight;
      camera.current.updateProjectionMatrix();

      ribbon.current.scale.set(camera.current.aspect * 1.55, 0.75, 1);
    }
  }, [ref]);

  // trigger ribbon animation
  const animate = useCallback(() => {
    if (scene.current && camera.current && renderer.current && ribbon.current) {
      ribbon.current.material.uniforms.time.value += 0.01;

      renderer.current.render(scene.current, camera.current);

      requestAnimationFrame(animate);
    }
  }, []);

  useEffect(() => {
    if (ribbon.current && ribbon.current.material.uniforms.time.value === 1) {
      animate();
    }
  }, [animate]);

  useEffect(() => {
    if (ribbon.current) {
      ribbon.current.material.needsUpdate = true;
      ribbon.current.material.fragmentShader = getFragmentShader(resolvedTheme === 'dark' ? '#c500b0' : '#0874ce');
    }
  }, [resolvedTheme]);

  return <div ref={ref} className="fixed inset-0 -z-10 [&>canvas]:block" />;
};

export default Background;
