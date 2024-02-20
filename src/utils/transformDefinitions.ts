import {
  type BlockDefinitions,
  type BlockDefinition,
  type RenderableBlockList,
  NUM_ROTATIONS,
  BlockName,
  translateVector,
} from "./block/block";
import { BlockVectors, Vector } from "../types/globalTypes";

function findBlockCenter(blockMatrixWidth: number) {
  const halfWidth = Math.floor(blockMatrixWidth / 2);
  return [halfWidth, halfWidth] as Vector;
}

function rotateClockwise(blockVectors: BlockVectors) {
  const inputVectors = [...blockVectors.map((row) => [...row])];

  return inputVectors.map(([y, x]) => [-x, y] as Vector);
}

function getBlockRotations(blockVectors: Vector[]) {
  const inputVectors = [...blockVectors.map((vector) => [...vector] as Vector)];
  const AllRotations: BlockVectors[] = [inputVectors];

  for (let i = 1; i < NUM_ROTATIONS; i++) {
    const previousRotation = i - 1;

    AllRotations.push(rotateClockwise(AllRotations[previousRotation]));
  }

  return AllRotations;
}

function extractVectors(blockShape: BlockDefinition) {
  const inputShape = [...blockShape.map((row) => [...row])];
  const blockVectors: Vector[] = [];

  const blockMatrixCenter = findBlockCenter(inputShape.length);
  const offsetFromCenter: Vector = [
    0 - blockMatrixCenter[0],
    0 - blockMatrixCenter[1],
  ];

  inputShape.map((row, rowIdx) =>
    row.map((column, colIdx) => {
      if (column) {
        const normalizedVector = translateVector(
          [rowIdx, colIdx],
          offsetFromCenter
        );
        blockVectors.push(normalizedVector);
      }
    })
  );

  return blockVectors;
}

function getBlockRotationList(blockShape: BlockDefinition) {
  const inputShape = [...blockShape.map((row) => [...row])];
  const blockVectors: BlockVectors = extractVectors(inputShape);
  const rotations = getBlockRotations(blockVectors);

  return rotations;
}

function transformDefinitions(blockDefinitions: BlockDefinitions) {
  const renderableBlockDefinitions = {} as RenderableBlockList;

  Object.entries(blockDefinitions).forEach(([key, value]) => {
    renderableBlockDefinitions[key as BlockName] = {
      rotations: getBlockRotationList(value.SHAPE),
      spawnHook: value.SPAWN_HOOK as Vector,
    };
  });

  return renderableBlockDefinitions;
}

export { transformDefinitions };
