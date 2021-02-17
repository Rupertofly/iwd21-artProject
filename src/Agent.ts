import { DEPOSIT_AMT, ROTATION_ANGLE, SENSOR_ANGLE, SENSOR_OFFSET, STEP_SIZE } from './constants';
import { addPt, normAngle, offset, fixPt, toI, wrap, roundPt, TAU } from './utils';

type Radians = number;
type Pt = [x: number, y: number];
type TypedArr = Uint8Array | Float32Array;
type Action = 'turnL' | 'turnR' | 'stay';
const { random: rnd } = Math;
function getAction(l: number, c: number, r: number): Action {
  if (c > l && c > r) return 'stay';
  if (c < l && c < r) return rnd() < 0.5 ? 'turnL' : 'turnR';
  if (l < r) return 'turnR';
  if (r < l) return 'turnL';
  return 'stay';
}
export class Agent {
  pos: Pt;
  heading: Radians;
  lifespan: number;
  location: Agent[];
  constructor(x: number, y: number, heading: number, lifespan: number = Infinity) {
    this.pos = [x, y];
    this.heading = heading;
    this.lifespan = lifespan;
  }
  setLocation(loc: Agent[]) {
    this.location = loc;
  }
  delete() {
    if (!this.location) return;
    let i = this.location.indexOf(this);
    this.location.splice(i, 1);
  }
  senseAndTurn(senseData: TypedArr) {
    let lpos = fixPt(
      addPt(this.pos, offset(normAngle(this.heading + SENSOR_ANGLE), SENSOR_OFFSET))
    );
    let cpos = fixPt(addPt(this.pos, offset(normAngle(this.heading), SENSOR_OFFSET)));
    let rpos = fixPt(
      addPt(this.pos, offset(normAngle(this.heading - SENSOR_ANGLE), SENSOR_OFFSET))
    );
    let l = senseData[toI(...lpos)];
    let c = senseData[toI(...cpos)];
    let r = senseData[toI(...rpos)];
    switch (getAction(l, c, r)) {
      case 'turnL':
        this.heading = normAngle(this.heading + ROTATION_ANGLE);
        break;
      case 'turnR':
        this.heading = normAngle(this.heading - ROTATION_ANGLE);
        break;
      default:
    }
  }
  moveAndDeposit(depositData: TypedArr, WallData?: TypedArr) {
    this.lifespan -= 1;
    let nextPos = wrap(...addPt(this.pos, offset(this.heading, STEP_SIZE)));
    let nextRound = roundPt(...nextPos);
    let nextI = toI(...nextRound);
    if (WallData) {
      const blocked = WallData[nextI] > 128;
      if (blocked) {
        this.heading = rnd() * TAU;
        if (this.lifespan <= 0) this.delete();
        return;
      }
    }
    depositData[nextI] += DEPOSIT_AMT;
    this.pos = nextPos;
    if (this.lifespan <= 0) this.delete();
  }
}
