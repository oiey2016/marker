import { createInitialBoard, PLAYER_COLORS, PIECE_TYPES } from './pieces.js';
import { MovementRules } from './rules.js';

const CELL_SIZE = 60;
const PADDING = 30;
const BOARD_WIDTH = 8;
const BOARD_HEIGHT = 9;

export class ChessGame {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.pieces = [];
        this.currentPlayer = PLAYER_COLORS.RED;
        this.selectedPiece = null;
        this.validMoves = [];
        this.moveHistory = [];
        this.gameOver = false;
        this.rules = new MovementRules(this.pieces);
        this.init();
    }

    init() {
        this.resetGame();
        this.setupEventListeners();
    }

    resetGame() {
        this.pieces = createInitialBoard();
        this.currentPlayer = PLAYER_COLORS.RED;
        this.selectedPiece = null;
        this.validMoves = [];
        this.moveHistory = [];
        this.gameOver = false;
        this.rules.setPieces(this.pieces);
        this.updateUI();
        this.draw();
    }

    setupEventListeners() {
        this.canvas.addEventListener('click', (e) => this.handleClick(e));

        const restartBtn = document.getElementById('restartBtn');
        const undoBtn = document.getElementById('undoBtn');

        restartBtn.addEventListener('click', () => this.resetGame());
        undoBtn.addEventListener('click', () => this.undoMove());
    }

    handleClick(e) {
        if (this.gameOver) return;

        const rect = this.canvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        const gridX = Math.round((clickX - PADDING) / CELL_SIZE);
        const gridY = Math.round((clickY - PADDING) / CELL_SIZE);

        if (gridX < 0 || gridX > BOARD_WIDTH || gridY < 0 || gridY > BOARD_HEIGHT) {
            return;
        }

        const clickedPiece = this.getPieceAt(gridX, gridY);

        if (this.selectedPiece) {
            const isValidMove = this.validMoves.some(
                move => move.x === gridX && move.y === gridY
            );

            if (isValidMove) {
                this.movePiece(this.selectedPiece, gridX, gridY);
                this.selectedPiece = null;
                this.validMoves = [];
                this.draw();
                return;
            }

            if (clickedPiece && clickedPiece.color === this.currentPlayer) {
                this.selectPiece(clickedPiece);
                return;
            }

            this.selectedPiece = null;
            this.validMoves = [];
            this.draw();
            return;
        }

        if (clickedPiece && clickedPiece.color === this.currentPlayer) {
            this.selectPiece(clickedPiece);
        }
    }

    selectPiece(piece) {
        this.selectedPiece = piece;
        this.validMoves = this.rules.getValidMoves(piece);
        this.draw();
    }

    getPieceAt(x, y) {
        return this.pieces.find(p => p.x === x && p.y === y);
    }

    movePiece(piece, toX, toY) {
        const fromX = piece.x;
        const fromY = piece.y;
        const capturedPiece = this.getPieceAt(toX, toY);

        this.moveHistory.push({
            piece: { ...piece },
            fromX,
            fromY,
            toX,
            toY,
            capturedPiece: capturedPiece ? { ...capturedPiece } : null
        });

        if (capturedPiece) {
            this.pieces = this.pieces.filter(p => p.id !== capturedPiece.id);
        }

        piece.x = toX;
        piece.y = toY;

        this.rules.setPieces(this.pieces);

        this.currentPlayer = this.currentPlayer === PLAYER_COLORS.RED
            ? PLAYER_COLORS.BLACK
            : PLAYER_COLORS.RED;

        this.updateUI();
        this.checkGameOver();
    }

    undoMove() {
        if (this.moveHistory.length === 0) return;

        const lastMove = this.moveHistory.pop();
        const piece = this.pieces.find(p => p.id === lastMove.piece.id);

        if (piece) {
            piece.x = lastMove.fromX;
            piece.y = lastMove.fromY;
        }

        if (lastMove.capturedPiece) {
            this.pieces.push({ ...lastMove.capturedPiece });
        }

        this.currentPlayer = this.currentPlayer === PLAYER_COLORS.RED
            ? PLAYER_COLORS.BLACK
            : PLAYER_COLORS.RED;

        this.gameOver = false;
        this.rules.setPieces(this.pieces);
        this.updateUI();
        this.draw();
    }

    checkGameOver() {
        const redKing = this.pieces.find(
            p => p.type === PIECE_TYPES.KING && p.color === PLAYER_COLORS.RED
        );
        const blackKing = this.pieces.find(
            p => p.type === PIECE_TYPES.KING && p.color === PLAYER_COLORS.BLACK
        );

        if (!redKing) {
            this.gameOver = true;
            this.showGameOver(PLAYER_COLORS.BLACK);
            return;
        }

        if (!blackKing) {
            this.gameOver = true;
            this.showGameOver(PLAYER_COLORS.RED);
            return;
        }

        if (this.isKingFacing()) {
            this.gameOver = true;
            const winner = this.currentPlayer === PLAYER_COLORS.RED
                ? PLAYER_COLORS.BLACK
                : PLAYER_COLORS.RED;
            this.showGameOver(winner);
        }
    }

    isKingFacing() {
        const redKing = this.pieces.find(
            p => p.type === PIECE_TYPES.KING && p.color === PLAYER_COLORS.RED
        );
        const blackKing = this.pieces.find(
            p => p.type === PIECE_TYPES.KING && p.color === PLAYER_COLORS.BLACK
        );

        if (redKing.x !== blackKing.x) return false;

        const minY = Math.min(redKing.y, blackKing.y);
        const maxY = Math.max(redKing.y, blackKing.y);

        for (let y = minY + 1; y < maxY; y++) {
            if (this.getPieceAt(redKing.x, y)) {
                return false;
            }
        }

        return true;
    }

    showGameOver(winner) {
        const statusEl = document.getElementById('gameStatus');
        statusEl.textContent = winner === PLAYER_COLORS.RED ? '红方获胜！' : '黑方获胜！';
        statusEl.style.color = winner === PLAYER_COLORS.RED ? '#e74c3c' : '#2c3e50';
    }

    updateUI() {
        const playerEl = document.getElementById('currentPlayer');
        playerEl.textContent = this.currentPlayer === PLAYER_COLORS.RED ? '红方' : '黑方';
        playerEl.style.color = this.currentPlayer === PLAYER_COLORS.RED ? '#e74c3c' : '#2c3e50';

        const undoBtn = document.getElementById('undoBtn');
        undoBtn.disabled = this.moveHistory.length === 0;

        const statusEl = document.getElementById('gameStatus');
        if (!this.gameOver) {
            statusEl.textContent = '';
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawBoard();
        this.drawValidMoves();
        this.drawPieces();
        this.drawSelectedPiece();
    }

    drawBoard() {
        this.ctx.fillStyle = '#DEB887';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.strokeStyle = '#8B4513';
        this.ctx.lineWidth = 2;

        for (let i = 0; i <= BOARD_WIDTH; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(PADDING + i * CELL_SIZE, PADDING);
            if (i === 0 || i === BOARD_WIDTH) {
                this.ctx.lineTo(PADDING + i * CELL_SIZE, PADDING + BOARD_HEIGHT * CELL_SIZE);
            } else {
                this.ctx.lineTo(PADDING + i * CELL_SIZE, PADDING + 4 * CELL_SIZE);
                this.ctx.moveTo(PADDING + i * CELL_SIZE, PADDING + 5 * CELL_SIZE);
                this.ctx.lineTo(PADDING + i * CELL_SIZE, PADDING + BOARD_HEIGHT * CELL_SIZE);
            }
            this.ctx.stroke();
        }

        for (let i = 0; i <= BOARD_HEIGHT; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(PADDING, PADDING + i * CELL_SIZE);
            this.ctx.lineTo(PADDING + BOARD_WIDTH * CELL_SIZE, PADDING + i * CELL_SIZE);
            this.ctx.stroke();
        }

        this.drawPalaceLines();

        this.ctx.font = 'bold 24px serif';
        this.ctx.fillStyle = '#8B4513';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText('楚  河', PADDING + 2 * CELL_SIZE, PADDING + 4.5 * CELL_SIZE);
        this.ctx.fillText('汉  界', PADDING + 6 * CELL_SIZE, PADDING + 4.5 * CELL_SIZE);
    }

    drawPalaceLines() {
        this.ctx.strokeStyle = '#8B4513';
        this.ctx.lineWidth = 2;

        this.ctx.beginPath();
        this.ctx.moveTo(PADDING + 3 * CELL_SIZE, PADDING);
        this.ctx.lineTo(PADDING + 5 * CELL_SIZE, PADDING + 2 * CELL_SIZE);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(PADDING + 5 * CELL_SIZE, PADDING);
        this.ctx.lineTo(PADDING + 3 * CELL_SIZE, PADDING + 2 * CELL_SIZE);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(PADDING + 3 * CELL_SIZE, PADDING + 7 * CELL_SIZE);
        this.ctx.lineTo(PADDING + 5 * CELL_SIZE, PADDING + 9 * CELL_SIZE);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(PADDING + 5 * CELL_SIZE, PADDING + 7 * CELL_SIZE);
        this.ctx.lineTo(PADDING + 3 * CELL_SIZE, PADDING + 9 * CELL_SIZE);
        this.ctx.stroke();
    }

    drawValidMoves() {
        this.ctx.fillStyle = 'rgba(46, 204, 113, 0.6)';

        for (const move of this.validMoves) {
            const x = PADDING + move.x * CELL_SIZE;
            const y = PADDING + move.y * CELL_SIZE;

            this.ctx.beginPath();
            this.ctx.arc(x, y, 8, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    drawPieces() {
        for (const piece of this.pieces) {
            this.drawPiece(piece);
        }
    }

    drawPiece(piece) {
        const x = PADDING + piece.x * CELL_SIZE;
        const y = PADDING + piece.y * CELL_SIZE;
        const radius = 25;

        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = piece.color === PLAYER_COLORS.RED ? '#c0392b' : '#2c3e50';
        this.ctx.fill();

        this.ctx.strokeStyle = piece.color === PLAYER_COLORS.RED ? '#8b0000' : '#1a252f';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        this.ctx.font = 'bold 22px serif';
        this.ctx.fillStyle = '#fff';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(piece.getName(), x, y);
    }

    drawSelectedPiece() {
        if (!this.selectedPiece) return;

        const x = PADDING + this.selectedPiece.x * CELL_SIZE;
        const y = PADDING + this.selectedPiece.y * CELL_SIZE;

        this.ctx.strokeStyle = '#f39c12';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.arc(x, y, 28, 0, Math.PI * 2);
        this.ctx.stroke();
    }
}

const game = new ChessGame('chessBoard');
