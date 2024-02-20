import { BlockVectors } from "../../types/globalTypes";
import {
  MoveDirection,
  SquareCoords,
  GameBoardMatrix,
} from "../../types/globalTypes";
import { BOARD_EDGE } from "../../config/board";

function isOnBoard([y, x]: SquareCoords) {
  return (
    y > BOARD_EDGE.TOP &&
    y <= BOARD_EDGE.BOTTOM &&
    x >= BOARD_EDGE.LEFT &&
    x <= BOARD_EDGE.RIGHT
  );
}

function getAdjacentPosition(
  direction: MoveDirection,
  staticBlocksMatrix: GameBoardMatrix,
  [y, x]: SquareCoords
) {
  switch (direction) {
    case "left":
      return staticBlocksMatrix[y]?.[x - 1];
    case "right":
      return staticBlocksMatrix[y]?.[x + 1];
    case "down":
      return staticBlocksMatrix[y + 1]?.[x];
  }
}

function isPositionOccupied(
  direction: MoveDirection,
  blockPosition: BlockVectors,
  staticBlocksMatrix: GameBoardMatrix
) {
  return blockPosition.some(([y, x]) => {
    if (
      isOnBoard([y, x]) &&
      getAdjacentPosition(direction, staticBlocksMatrix, [y, x])
    ) {
      return true;
    }
  });
}

function isBoardEdge(direction: MoveDirection, blockPosition: BlockVectors) {
  switch (direction) {
    case "left":
      return blockPosition.some(([, x]) => x === BOARD_EDGE.LEFT);
    case "right":
      return blockPosition.some(([, x]) => x === BOARD_EDGE.RIGHT);
    case "down":
      return blockPosition.some(([y]) => y === BOARD_EDGE.BOTTOM);
  }
}

function isRotationPossible(
  intendedBlockPosition: BlockVectors,
  staticBlocksMatrix: GameBoardMatrix
) {
  return intendedBlockPosition.every(
    ([y, x]) => isOnBoard([y, x]) && !staticBlocksMatrix[y][x]
  );
}

function pruneRow(row: boolean[]) {
  if (!row.every((column: boolean) => column)) {
    return row;
  } else {
    return null;
  }
}

function createReadyToRender(
  staticBlocksMatrix: GameBoardMatrix,
  blockPosition: BlockVectors
) {
  const readyToRender = JSON.parse(JSON.stringify(staticBlocksMatrix));
  blockPosition.map(([y, x]) => {
    if (x < 0 || y < 0) {
      return;
    }
    readyToRender[y][x] = true;
  });

  return readyToRender;
}

export {
  isOnBoard,
  getAdjacentPosition,
  isPositionOccupied,
  isBoardEdge,
  isRotationPossible,
  pruneRow,
  createReadyToRender,
};
