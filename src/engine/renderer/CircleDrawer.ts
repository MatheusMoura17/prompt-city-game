export interface IDrawCircleParams {
  x: number;
  y: number;
  color: number[]
}

export class CircleDrawer {
  private gl: WebGL2RenderingContext;
  private program: WebGLProgram;
  private positionBuffer: WebGLBuffer;
  private offsetBuffer: WebGLBuffer;
  private vao: WebGLVertexArrayObject;
  private resolutionUniformLocation: WebGLUniformLocation;
  private colorUniformLocation: WebGLUniformLocation;
  private numSegments: number;
  private circleColor: [number, number, number, number];
  private circleCenters: number[] = [];

  constructor(gl: WebGL2RenderingContext) {
    this.gl = gl;
    this.program = this.createProgram();
    this.vao = this.gl.createVertexArray()!;
    this.gl.bindVertexArray(this.vao);

    // Criar buffers
    this.positionBuffer = this.gl.createBuffer()!;
    this.offsetBuffer = this.gl.createBuffer()!;

    // Localizar uniforms
    this.resolutionUniformLocation = this.gl.getUniformLocation(
      this.program,
      "u_resolution"
    )!;
    this.colorUniformLocation = this.gl.getUniformLocation(
      this.program,
      "u_color"
    )!;

    this.numSegments = 0;
    this.circleColor = [1, 1, 1, 1]; // Branco por padrão
  }

  /** Instancia um círculo base para instancing */
  public instanceCircle(radius: number, color: string, segments: number): void {
    this.numSegments = segments;
    this.circleColor = this.hexToRGBA(color);

    const vertices = this.createCircleVertices(radius, segments);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);

    const positionAttributeLocation = this.gl.getAttribLocation(
      this.program,
      "a_position"
    );
    this.gl.enableVertexAttribArray(positionAttributeLocation);
    this.gl.vertexAttribPointer(
      positionAttributeLocation,
      2,
      this.gl.FLOAT,
      false,
      0,
      0
    );
  }

  /** Adiciona um centro de círculo ao array */
  public drawCircle({ x, y }: IDrawCircleParams) {
    this.circleCenters.push(x, y);
  }

  /** Renderiza todos os círculos e limpa a lista */
  public drawCall(): void {
    if (this.circleCenters.length === 0) return;

    this.gl.useProgram(this.program);
    this.gl.bindVertexArray(this.vao);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.offsetBuffer);
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(this.circleCenters),
      this.gl.DYNAMIC_DRAW
    );

    const offsetAttributeLocation = this.gl.getAttribLocation(
      this.program,
      "a_offset"
    );
    this.gl.enableVertexAttribArray(offsetAttributeLocation);
    this.gl.vertexAttribPointer(
      offsetAttributeLocation,
      2,
      this.gl.FLOAT,
      false,
      0,
      0
    );
    this.gl.vertexAttribDivisor(offsetAttributeLocation, 1);

    this.gl.uniform4f(this.colorUniformLocation, ...this.circleColor);
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.uniform2f(
      this.resolutionUniformLocation,
      this.gl.canvas.width,
      this.gl.canvas.height
    );

    this.gl.drawArraysInstanced(
      this.gl.TRIANGLE_FAN,
      0,
      this.numSegments + 2,
      this.circleCenters.length / 2
    );

    this.circleCenters = [];
  }

  /** Compila shaders e cria um programa WebGL */
  private createProgram(): WebGLProgram {
    const vsSource = `#version 300 es
      in vec2 a_position;
      in vec2 a_offset;
      uniform vec2 u_resolution;
      void main() {
          vec2 pos = (a_position + a_offset) / u_resolution * 2.0 - 1.0;
          gl_Position = vec4(pos * vec2(1, -1), 0, 1);
      }
    `;

    const fsSource = `#version 300 es
      precision mediump float;
      uniform vec4 u_color;
      out vec4 outColor;
      void main() {
          outColor = u_color;
      }
    `;

    const program = this.gl.createProgram()!;
    const vs = this.compileShader(this.gl.VERTEX_SHADER, vsSource);
    const fs = this.compileShader(this.gl.FRAGMENT_SHADER, fsSource);
    this.gl.attachShader(program, vs);
    this.gl.attachShader(program, fs);
    this.gl.linkProgram(program);

    if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
      throw new Error(
        "Erro ao linkar programa: " + this.gl.getProgramInfoLog(program)
      );
    }
    return program;
  }

  /** Compila um shader */
  private compileShader(type: number, source: string): WebGLShader {
    const shader = this.gl.createShader(type)!;
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      throw new Error(
        "Erro ao compilar shader: " + this.gl.getShaderInfoLog(shader)
      );
    }
    return shader;
  }

  /** Gera vértices de um círculo usando TRIANGLE_FAN */
  private createCircleVertices(radius: number, segments: number): Float32Array {
    const vertices: number[] = [0, 0]; // Centro do círculo

    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      vertices.push(Math.cos(angle) * radius, Math.sin(angle) * radius);
    }

    return new Float32Array(vertices);
  }

  /** Converte cor hex para RGBA */
  private hexToRGBA(hex: string): [number, number, number, number] {
    if (hex.startsWith("#")) hex = hex.slice(1);
    if (hex.length === 3)
      hex = hex
        .split("")
        .map((c) => c + c)
        .join("");
    const bigint = parseInt(hex, 16);
    return [
      ((bigint >> 16) & 255) / 255,
      ((bigint >> 8) & 255) / 255,
      (bigint & 255) / 255,
      1,
    ];
  }
}
