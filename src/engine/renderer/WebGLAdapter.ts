// @ts-ignore
import mat4 from "gl-mat4";
import { Shape } from "./Shape";

// Vertex Shader
const vertexShaderSource = `
  attribute vec2 aPosition; // Posição
  attribute vec2 uOffset;   // Offset por instância
  attribute float uScale;   // Escala por instância
  attribute vec4 aColor;    // Cor por instância

  uniform mat4 uModelViewProjection;

  varying vec4 vColor; // A cor será passada para o fragment shader

  void main() {
    vec2 scaledPosition = aPosition * uScale; // Aplica a escala à posição
    gl_Position = uModelViewProjection * vec4(scaledPosition + uOffset, 0.0, 1.0);
    
    vColor = aColor; // Passa a cor para o fragment shader
  }
`;

// Fragment Shader
const fragmentShaderSource = `
  precision mediump float; // Adicionando precisão para evitar problemas de renderização

  varying vec4 vColor; // A cor vem do vertex shader

  void main() {
    gl_FragColor = vColor; // Usamos a cor da instância
  }
`;

export class WebGLAdapter {
  private shaderProgram: WebGLProgram;

  constructor(private gl: WebGL2RenderingContext) {
    this.gl.canvas.width = window.innerWidth;
    this.gl.canvas.height = window.innerHeight;
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.shaderProgram = this.createShader();
    this.clear();
  }

  public clear() {
    this.gl.clearColor(0, 0, 0, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }

  private compileShader(type: number, source: string): WebGLShader {
    const shader = this.gl.createShader(type);
    if (!shader) {
      throw new Error(`Falha ao criar shader do tipo ${type}`);
    }

    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.error(
        "Erro na compilação do shader:",
        this.gl.getShaderInfoLog(shader)
      );
      this.gl.deleteShader(shader);
      throw new Error("Erro ao compilar shader");
    }

    return shader;
  }

  private createShader(): WebGLProgram {
    const vertexShader = this.compileShader(
      this.gl.VERTEX_SHADER,
      vertexShaderSource
    );
    const fragmentShader = this.compileShader(
      this.gl.FRAGMENT_SHADER,
      fragmentShaderSource
    );

    const shaderProgram = this.gl.createProgram();
    if (!shaderProgram) {
      throw new Error("Falha ao criar o programa de shader");
    }

    this.gl.attachShader(shaderProgram, vertexShader);
    this.gl.attachShader(shaderProgram, fragmentShader);
    this.gl.linkProgram(shaderProgram);

    if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS)) {
      console.error(
        "Erro ao linkar shader program:",
        this.gl.getProgramInfoLog(shaderProgram)
      );
      throw new Error("Erro ao linkar shader program");
    }

    return shaderProgram;
  }

  public renderShapes(shapes: Shape[]) {
    const vertexPositionBuffer = this.gl.createBuffer();
    const size = 2; // Tamanho da posição (2D)

    // Concatenando todos os vértices de todos os triângulos em uma única lista
    const allVertices = shapes.flatMap(shape => shape.triangles.flat());

    // Criação do buffer para os vértices das formas
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexPositionBuffer);
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(allVertices), // Passando todos os vértices concatenados
      this.gl.STATIC_DRAW
    );
    this.gl.useProgram(this.shaderProgram);

    // Posição dos vértices
    const aPosition = this.gl.getAttribLocation(
      this.shaderProgram,
      "aPosition"
    );
    if (aPosition === -1) {
      console.error('Atributo "aPosition" não encontrado!');
      return;
    }
    this.gl.enableVertexAttribArray(aPosition);
    this.gl.vertexAttribPointer(aPosition, size, this.gl.FLOAT, false, 0, 0);

    // Criando um buffer para armazenar os offsets de cada instância
    const instanceOffsetBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, instanceOffsetBuffer);
    const offsets = shapes.flatMap((shape) => [shape.x, shape.y]); // Flatten the offsets for each shape
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(offsets),
      this.gl.STATIC_DRAW
    );
    const uOffsetLocation = this.gl.getAttribLocation(
      this.shaderProgram,
      "uOffset"
    );
    if (uOffsetLocation === -1) {
      console.error('Atributo "uOffset" não encontrado!');
      return;
    }
    this.gl.vertexAttribPointer(uOffsetLocation, 2, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(uOffsetLocation);
    this.gl.vertexAttribDivisor(uOffsetLocation, 1); // Essa linha indica que o offset muda por instância

    // Criando um buffer para armazenar a escala de cada instância
    const instanceScaleBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, instanceScaleBuffer);
    const scales = shapes.map((shape) => shape.scale); // Escalas de cada shape
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(scales),
      this.gl.STATIC_DRAW
    );
    const uScaleLocation = this.gl.getAttribLocation(
      this.shaderProgram,
      "uScale"
    );
    if (uScaleLocation === -1) {
      console.error('Atributo "uScale" não encontrado!');
      return;
    }
    this.gl.vertexAttribPointer(uScaleLocation, 1, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(uScaleLocation);
    this.gl.vertexAttribDivisor(uScaleLocation, 1); // Indica que a escala muda por instância

    // Criando um buffer para armazenar as cores de cada instância
    const instanceColorBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, instanceColorBuffer);
    const colors = shapes.flatMap((shape) => shape.color); // Supondo que `shape.color` seja um array [r, g, b, a]
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(colors),
      this.gl.STATIC_DRAW
    );
    const aColorLocation = this.gl.getAttribLocation(
      this.shaderProgram,
      "aColor"
    );
    if (aColorLocation === -1) {
      console.error('Atributo "aColor" não encontrado!');
      return;
    }
    this.gl.vertexAttribPointer(aColorLocation, 4, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(aColorLocation);
    this.gl.vertexAttribDivisor(aColorLocation, 1); // A cor muda por instância

    // Definindo a matriz de projeção
    const aspect = this.gl.canvas.width / this.gl.canvas.height;
    const projectionMatrix = mat4.create();
    mat4.ortho(projectionMatrix, -aspect, aspect, -1, 1, 0, 1);
    const uModelViewProjectionLocation = this.gl.getUniformLocation(
      this.shaderProgram,
      "uModelViewProjection"
    );
    this.gl.uniformMatrix4fv(
      uModelViewProjectionLocation,
      false,
      projectionMatrix
    );

    // Finalmente, desenhando as formas usando instancing
    const numVerticesPerShape = shapes[0].triangles.length * 3; // 3 vértices por triângulo
    const numInstances = shapes.length;
    this.gl.drawArraysInstanced(this.gl.TRIANGLES, 0, numVerticesPerShape, numInstances);
  }

}
