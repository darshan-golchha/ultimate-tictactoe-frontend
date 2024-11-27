import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../components/ui/button/Button';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../components/ui/alerts/AlertDialog';

const SuperTicTacToe = () => {
    const [userId, setUserId] = useState(null);
    const [gameState, setGameState] = useState(null);
    const [feedback, setFeedback] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Initialize user ID and start game on component mount
    useEffect(() => {
        const storedUserId = localStorage.getItem('tictactoe-user-id');
        const newUserId = storedUserId || uuidv4();

        if (!storedUserId) {
            localStorage.setItem('tictactoe-user-id', newUserId);
        }

        setUserId(newUserId);
        startGame(newUserId);
    }, []);

    // API call to start game
    const startGame = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('https://ultimate-tic-tac-toe-chi.vercel.app/start', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: id })
            });
            const data = await response.json();

            if (response.ok) {
                setGameState(data.state);
                setFeedback(data.feedback);
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // API call to make a move
    const makeMove = async (globalBoard, localBoard) => {
        // If the game is over, do not make a move and disable the board
        if (feedback?.global_win !== 0) return;
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('https://ultimate-tic-tac-toe-chi.vercel.app/move', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: userId,
                    move: { global_board: globalBoard, local_board: localBoard }
                })
            });
            const data = await response.json();

            if (response.ok) {
                setGameState(data.state);
                setFeedback(data.feedback);
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Render game board and controls
    const renderBoard = () => {
        if (!gameState) return null;

        return (
            <div className='flex flex-col items-center justify-center gap-5'>
                {loading && (
                    <div className="fixed left-32 top-24 flex items-center justify-center">
                        <div className="spinner-border text-indigo-500">
                            {/* Add your hourglass spinner */}
                            <img src="hour.png" alt="Loading" className="w-8 h-8 animate-spin" />
                        </div>
                    </div>
                )}

                <div className="flex flex-col items-center justify-center">
                    {/* Adding a gradient background suiting the theme */}
                    <div className="bg-gradient-to-r from-indigo-800 to-pink-800 p-8 rounded-xl shadow-lg scale-150">
                        <h1 className="text-2xl font-bold text-center text-white mb-6">Super Tic-Tac-Toe</h1>
                        {/* Global Board Rendering */}
                        <div className="grid grid-cols-3 gap-4 mb-6"
                        style={{ transform: 'scale(1.25)', transformOrigin: 'center', padding: '20px', transition: 'transform 0.3s ease-in-out' }}>
                            {gameState.board.map((globalCell, globalIndex) => (
                                <div
                                    key={globalIndex}
                                    className={`border-4 rounded-xl overflow-hidden transition-all duration-300 ${feedback?.next_board === globalIndex ? 'border-yellow-400 shadow-2xl scale-125': 'border-gray-200'}`}>
                                    {/* Local Board Rendering with Sub-board Highlighting */}
                                    <div className={`grid grid-cols-3 gap-1 ${feedback?.sub_board_states?.[globalIndex] === 1 ? 'bg-blue-100' : ''}${feedback?.sub_board_states?.[globalIndex] === -1 ? 'bg-red-100' : ''}${feedback?.sub_board_states?.[globalIndex] === 0 ? 'bg-white' : ''}`}>
                                        {globalCell.map((row, rowIndex) =>
                                            row.map((localCell, colIndex) => (
                                                <button
                                                    key={`${rowIndex}-${colIndex}`}
                                                    onClick={() => makeMove(globalIndex, rowIndex * 3 + colIndex)}
                                                    disabled={
                                                        (loading ||
                                                        (feedback?.next_board !== null && feedback?.next_board !== globalIndex) ||
                                                        localCell !== 0) && feedback?.global_win !== 0
                                                    }
                                                    className={`w-full aspect-square flex items-center justify-center transition-all duration-300 ${feedback?.possible_moves?.some(m =>
                                                        m[0] === globalIndex && m[1] === rowIndex * 3 + colIndex
                                                    )
                                                            ? 'hover:bg-gray-300 cursor-pointer'
                                                            : 'cursor-not-allowed opacity-50'} ${localCell === 1 ? 'bg-blue-500 text-white' : ''} ${localCell === -1 ? 'bg-red-500 text-white' : ''}`}
                                                >
                                                    {localCell === 1 && <div className="w-4"><img src="x.png" alt="X" /></div>}
                                                    {localCell === -1 && <div className="w-4"><img src="o.png" alt="O" /></div>}
                                                </button>
                                            ))
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Game Controls */}
                <div className="flex justify-between items-center mt-6">
                    <div>
                        {error && (
                            <AlertDialog open={true}>
                                <AlertDialogContent className="bg-white rounded-2xl">
                                    <AlertDialogHeader>
                                        <AlertDialogTitle className="text-2xl font-bold text-center">
                                            Error
                                        </AlertDialogTitle>
                                        <AlertDialogDescription className="text-center text-lg">
                                            {error}
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogAction
                                            onClick={() => setError(null)}
                                            className="bg-indigo-600 hover:bg-indigo-700 text-white"
                                        >
                                            OK
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}
                    </div>

                    {feedback && feedback?.global_win !== 0 && (
                        <AlertDialog open={true}>
                            <AlertDialogContent className="bg-white rounded-2xl">
                                <AlertDialogHeader>
                                    <AlertDialogTitle className="text-2xl font-bold text-center">
                                        Game Over
                                    </AlertDialogTitle>
                                    <AlertDialogDescription className="text-center text-lg">
                                        {feedback.global_win === 1 ? 'You Won!' :
                                            feedback.global_win === -1 ? 'AI Won!' :
                                                'Draw!'}
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogAction
                                        onClick={() => startGame(userId)}
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white"
                                    >
                                        Play Again
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    )}
                </div>
                <button
                    onClick={() => startGame(userId)}
                    disabled={loading}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white fixed bottom-4 left-4 p-3 z-30"
                >
                    Reset Game
                </button>
            </div>
        );
    };

    return renderBoard();
};

export default SuperTicTacToe;