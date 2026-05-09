import { PIECE_TYPES, PLAYER_COLORS } from './pieces.js';

export class MovementRules {
    constructor(pieces) {
        this.pieces = pieces;
    }

    setPieces(pieces) {
        this.pieces = pieces;
    }

    getPieceAt(x, y) {
        return this.pieces.find(p => p.x === x && p.y === y);
    }

    isValidPosition(x, y) {
        return x >= 0 && x <= 8 && y >= 0 && y <= 9;
    }

    isInPalace(x, y, color) {
        if (color === PLAYER_COLORS.RED) {
            return x >= 3 && x <= 5 && y >= 7 && y <= 9;
        } else {
            return x >= 3 && x <= 5 && y >= 0 && y <= 2;
        }
    }

    hasCrossedRiver(y, color) {
        if (color === PLAYER_COLORS.RED) {
            return y <= 4;
        } else {
            return y >= 5;
        }
    }

    getValidMoves(piece) {
        const moves = [];
        switch (piece.type) {
            case PIECE_TYPES.KING:
                moves.push(...this.getKingMoves(piece));
                break;
            case PIECE_TYPES.ADVISOR:
                moves.push(...this.getAdvisorMoves(piece));
                break;
            case PIECE_TYPES.ELEPHANT:
                moves.push(...this.getElephantMoves(piece));
                break;
            case PIECE_TYPES.HORSE:
                moves.push(...this.getHorseMoves(piece));
                break;
            case PIECE_TYPES.CHARIOT:
                moves.push(...this.getChariotMoves(piece));
                break;
            case PIECE_TYPES.CANNON:
                moves.push(...this.getCannonMoves(piece));
                break;
            case PIECE_TYPES.PAWN:
                moves.push(...this.getPawnMoves(piece));
                break;
        }
        return moves;
    }

    getKingMoves(piece) {
        const moves = [];
        const directions = [
            { dx: 0, dy: -1 },
            { dx: 0, dy: 1 },
            { dx: -1, dy: 0 },
            { dx: 1, dy: 0 }
        ];

        for (const dir of directions) {
            const newX = piece.x + dir.dx;
            const newY = piece.y + dir.dy;

            if (this.isValidPosition(newX, newY) && this.isInPalace(newX, newY, piece.color)) {
                const targetPiece = this.getPieceAt(newX, newY);
                if (!targetPiece || targetPiece.color !== piece.color) {
                    moves.push({ x: newX, y: newY });
                }
            }
        }

        moves.push(...this.getKingFacingMoves(piece));

        return moves;
    }

    getKingFacingMoves(piece) {
        const moves = [];
        const enemyKing = this.pieces.find(
            p => p.type === PIECE_TYPES.KING && p.color !== piece.color
        );

        if (enemyKing && enemyKing.x === piece.x) {
            let hasPieceBetween = false;
            const minY = Math.min(piece.y, enemyKing.y);
            const maxY = Math.max(piece.y, enemyKing.y);

            for (let y = minY + 1; y < maxY; y++) {
                if (this.getPieceAt(piece.x, y)) {
                    hasPieceBetween = true;
                    break;
                }
            }

            if (!hasPieceBetween) {
                moves.push({ x: enemyKing.x, y: enemyKing.y });
            }
        }

        return moves;
    }

    getAdvisorMoves(piece) {
        const moves = [];
        const directions = [
            { dx: -1, dy: -1 },
            { dx: 1, dy: -1 },
            { dx: -1, dy: 1 },
            { dx: 1, dy: 1 }
        ];

        for (const dir of directions) {
            const newX = piece.x + dir.dx;
            const newY = piece.y + dir.dy;

            if (this.isValidPosition(newX, newY) && this.isInPalace(newX, newY, piece.color)) {
                const targetPiece = this.getPieceAt(newX, newY);
                if (!targetPiece || targetPiece.color !== piece.color) {
                    moves.push({ x: newX, y: newY });
                }
            }
        }

        return moves;
    }

    getElephantMoves(piece) {
        const moves = [];
        const directions = [
            { dx: -2, dy: -2, blockDx: -1, blockDy: -1 },
            { dx: 2, dy: -2, blockDx: 1, blockDy: -1 },
            { dx: -2, dy: 2, blockDx: -1, blockDy: 1 },
            { dx: 2, dy: 2, blockDx: 1, blockDy: 1 }
        ];

        for (const dir of directions) {
            const newX = piece.x + dir.dx;
            const newY = piece.y + dir.dy;
            const blockX = piece.x + dir.blockDx;
            const blockY = piece.y + dir.blockDy;

            if (this.isValidPosition(newX, newY) && !this.hasCrossedRiver(newY, piece.color)) {
                if (!this.getPieceAt(blockX, blockY)) {
                    const targetPiece = this.getPieceAt(newX, newY);
                    if (!targetPiece || targetPiece.color !== piece.color) {
                        moves.push({ x: newX, y: newY });
                    }
                }
            }
        }

        return moves;
    }

    getHorseMoves(piece) {
        const moves = [];
        const directions = [
            { dx: -2, dy: -1, blockDx: -1, blockDy: 0 },
            { dx: -2, dy: 1, blockDx: -1, blockDy: 0 },
            { dx: 2, dy: -1, blockDx: 1, blockDy: 0 },
            { dx: 2, dy: 1, blockDx: 1, blockDy: 0 },
            { dx: -1, dy: -2, blockDx: 0, blockDy: -1 },
            { dx: 1, dy: -2, blockDx: 0, blockDy: -1 },
            { dx: -1, dy: 2, blockDx: 0, blockDy: 1 },
            { dx: 1, dy: 2, blockDx: 0, blockDy: 1 }
        ];

        for (const dir of directions) {
            const newX = piece.x + dir.dx;
            const newY = piece.y + dir.dy;
            const blockX = piece.x + dir.blockDx;
            const blockY = piece.y + dir.blockDy;

            if (this.isValidPosition(newX, newY)) {
                if (!this.getPieceAt(blockX, blockY)) {
                    const targetPiece = this.getPieceAt(newX, newY);
                    if (!targetPiece || targetPiece.color !== piece.color) {
                        moves.push({ x: newX, y: newY });
                    }
                }
            }
        }

        return moves;
    }

    getChariotMoves(piece) {
        const moves = [];
        const directions = [
            { dx: 0, dy: -1 },
            { dx: 0, dy: 1 },
            { dx: -1, dy: 0 },
            { dx: 1, dy: 0 }
        ];

        for (const dir of directions) {
            let newX = piece.x + dir.dx;
            let newY = piece.y + dir.dy;

            while (this.isValidPosition(newX, newY)) {
                const targetPiece = this.getPieceAt(newX, newY);
                if (!targetPiece) {
                    moves.push({ x: newX, y: newY });
                } else {
                    if (targetPiece.color !== piece.color) {
                        moves.push({ x: newX, y: newY });
                    }
                    break;
                }
                newX += dir.dx;
                newY += dir.dy;
            }
        }

        return moves;
    }

    getCannonMoves(piece) {
        const moves = [];
        const directions = [
            { dx: 0, dy: -1 },
            { dx: 0, dy: 1 },
            { dx: -1, dy: 0 },
            { dx: 1, dy: 0 }
        ];

        for (const dir of directions) {
            let newX = piece.x + dir.dx;
            let newY = piece.y + dir.dy;
            let hasJumped = false;

            while (this.isValidPosition(newX, newY)) {
                const targetPiece = this.getPieceAt(newX, newY);

                if (!hasJumped) {
                    if (!targetPiece) {
                        moves.push({ x: newX, y: newY });
                    } else {
                        hasJumped = true;
                    }
                } else {
                    if (targetPiece) {
                        if (targetPiece.color !== piece.color) {
                            moves.push({ x: newX, y: newY });
                        }
                        break;
                    }
                }

                newX += dir.dx;
                newY += dir.dy;
            }
        }

        return moves;
    }

    getPawnMoves(piece) {
        const moves = [];
        const forwardDir = piece.color === PLAYER_COLORS.RED ? -1 : 1;

        const forwardX = piece.x;
        const forwardY = piece.y + forwardDir;

        if (this.isValidPosition(forwardX, forwardY)) {
            const targetPiece = this.getPieceAt(forwardX, forwardY);
            if (!targetPiece || targetPiece.color !== piece.color) {
                moves.push({ x: forwardX, y: forwardY });
            }
        }

        if (this.hasCrossedRiver(piece.y, piece.color)) {
            const leftX = piece.x - 1;
            const leftY = piece.y;
            if (this.isValidPosition(leftX, leftY)) {
                const targetPiece = this.getPieceAt(leftX, leftY);
                if (!targetPiece || targetPiece.color !== piece.color) {
                    moves.push({ x: leftX, y: leftY });
                }
            }

            const rightX = piece.x + 1;
            const rightY = piece.y;
            if (this.isValidPosition(rightX, rightY)) {
                const targetPiece = this.getPieceAt(rightX, rightY);
                if (!targetPiece || targetPiece.color !== piece.color) {
                    moves.push({ x: rightX, y: rightY });
                }
            }
        }

        return moves;
    }
}
