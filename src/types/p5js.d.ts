declare function rect(x: number, y: number, w: number): void;
declare function rect(x: number, y: number, w: number, h: number): void;

declare function color(r: number, g: number, b: number): void;
declare function color(color: string): void;

declare function fill(r: number, g: number, b: number): void;
declare function fill(color: string): void;

declare function stroke(r: number, g: number, b: number): void;
declare function stroke(color: string): void;

declare function noFill(): void;
declare function noStroke(): void;

declare function background(r: number, g: number, b: number): void;
declare function background(color: string): void;

declare function random(min: number, max: number): number;
declare function random<T>(choices: Array<T>): T;

declare function createCanvas(w: number, h: number, canvas?: HTMLCanvasElement): void;

declare function frameRate(fps: number): void;


declare let mouseX: number
declare let mouseY: number
