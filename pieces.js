export const PIECE_TYPES = {
    KING: 'king',
    ADVISOR: 'advisor',
    ELEPHANT: 'elephant',
    HORSE: 'horse',
    CHARIOT: 'chariot',
    CANNON: 'cannon',
    PAWN: 'pawn'
};

export const PIECE_NAMES = {
    red: {
        [PIECE_TYPES.KING]: '帅',
        [PIECE_TYPES.ADVISOR]: '仕',
        [PIECE_TYPES.ELEPHANT]: '相',
        [PIECE_TYPES.HORSE]: '马',
        [PIECE_TYPES.CHARIOT]: '车',
        [PIECE_TYPES.CANNON]: '炮',
        [PIECE_TYPES.PAWN]: '兵'
    },
    black: {
        [PIECE_TYPES.KING]: '将',
        [PIECE_TYPES.ADVISOR]: '士',
        [PIECE_TYPES.ELEPHANT]: '象',
        [PIECE_TYPES.HORSE]: '马',
        [PIECE_TYPES.CHARIOT]: '车',
        [PIECE_TYPES.CANNON]: '炮',
        [PIECE_TYPES.PAWN]: '卒'
    }
};

export const PLAYER_COLORS = {
    RED: 'red',
    BLACK: 'black'
};

export class Piece {
    constructor(type, color, x, y) {
        this.type = type;
        this.color = color;
        this.x = x;
        this.y = y;
        this.id = `${color}_${type}_${x}_${y}`;
    }

    getName() {
        return PIECE_NAMES[this.color][this.type];
    }
}

export function createInitialBoard() {
    const pieces = [];

    pieces.push(new Piece(PIECE_TYPES.KING, PLAYER_COLORS.RED, 4, 9));
    pieces.push(new Piece(PIECE_TYPES.ADVISOR, PLAYER_COLORS.RED, 3, 9));
    pieces.push(new Piece(PIECE_TYPES.ADVISOR, PLAYER_COLORS.RED, 5, 9));
    pieces.push(new Piece(PIECE_TYPES.ELEPHANT, PLAYER_COLORS.RED, 2, 9));
    pieces.push(new Piece(PIECE_TYPES.ELEPHANT, PLAYER_COLORS.RED, 6, 9));
    pieces.push(new Piece(PIECE_TYPES.HORSE, PLAYER_COLORS.RED, 1, 9));
    pieces.push(new Piece(PIECE_TYPES.HORSE, PLAYER_COLORS.RED, 7, 9));
    pieces.push(new Piece(PIECE_TYPES.CHARIOT, PLAYER_COLORS.RED, 0, 9));
    pieces.push(new Piece(PIECE_TYPES.CHARIOT, PLAYER_COLORS.RED, 8, 9));
    pieces.push(new Piece(PIECE_TYPES.CANNON, PLAYER_COLORS.RED, 1, 7));
    pieces.push(new Piece(PIECE_TYPES.CANNON, PLAYER_COLORS.RED, 7, 7));
    pieces.push(new Piece(PIECE_TYPES.PAWN, PLAYER_COLORS.RED, 0, 6));
    pieces.push(new Piece(PIECE_TYPES.PAWN, PLAYER_COLORS.RED, 2, 6));
    pieces.push(new Piece(PIECE_TYPES.PAWN, PLAYER_COLORS.RED, 4, 6));
    pieces.push(new Piece(PIECE_TYPES.PAWN, PLAYER_COLORS.RED, 6, 6));
    pieces.push(new Piece(PIECE_TYPES.PAWN, PLAYER_COLORS.RED, 8, 6));

    pieces.push(new Piece(PIECE_TYPES.KING, PLAYER_COLORS.BLACK, 4, 0));
    pieces.push(new Piece(PIECE_TYPES.ADVISOR, PLAYER_COLORS.BLACK, 3, 0));
    pieces.push(new Piece(PIECE_TYPES.ADVISOR, PLAYER_COLORS.BLACK, 5, 0));
    pieces.push(new Piece(PIECE_TYPES.ELEPHANT, PLAYER_COLORS.BLACK, 2, 0));
    pieces.push(new Piece(PIECE_TYPES.ELEPHANT, PLAYER_COLORS.BLACK, 6, 0));
    pieces.push(new Piece(PIECE_TYPES.HORSE, PLAYER_COLORS.BLACK, 1, 0));
    pieces.push(new Piece(PIECE_TYPES.HORSE, PLAYER_COLORS.BLACK, 7, 0));
    pieces.push(new Piece(PIECE_TYPES.CHARIOT, PLAYER_COLORS.BLACK, 0, 0));
    pieces.push(new Piece(PIECE_TYPES.CHARIOT, PLAYER_COLORS.BLACK, 8, 0));
    pieces.push(new Piece(PIECE_TYPES.CANNON, PLAYER_COLORS.BLACK, 1, 2));
    pieces.push(new Piece(PIECE_TYPES.CANNON, PLAYER_COLORS.BLACK, 7, 2));
    pieces.push(new Piece(PIECE_TYPES.PAWN, PLAYER_COLORS.BLACK, 0, 3));
    pieces.push(new Piece(PIECE_TYPES.PAWN, PLAYER_COLORS.BLACK, 2, 3));
    pieces.push(new Piece(PIECE_TYPES.PAWN, PLAYER_COLORS.BLACK, 4, 3));
    pieces.push(new Piece(PIECE_TYPES.PAWN, PLAYER_COLORS.BLACK, 6, 3));
    pieces.push(new Piece(PIECE_TYPES.PAWN, PLAYER_COLORS.BLACK, 8, 3));

    return pieces;
}
