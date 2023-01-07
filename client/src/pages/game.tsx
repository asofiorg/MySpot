import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react";
type Player = "X" | "O" | "BOTH" | null;

const Square = ({
  value,
  onClick,
  winner,
}: {
  winner: Player;
  value: Player;
  onClick: () => void;
}) => {
  if (!value) {
    return (
      <button
        className="h-20 w-20 border text-xl font-bold"
        onClick={onClick}
        disabled={Boolean(winner)}
      />
    );
  }

  return (
    <button className="h-20 w-20 border text-xl font-bold">{value}</button>
  );
};

const calculateWinner = (squares: Player[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i] as [number, number, number];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const Game: NextPage = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">(
    Math.round(Math.random() * 1) === 1 ? "X" : "O"
  );
  const [winner, setWinner] = useState<Player>(null);

  const reset = () => {
    setSquares(Array(9).fill(null));
    setWinner(null);
    setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? "X" : "O");
  };

  const setSquareValue = (index: number) => {
    const newData = squares.map((val, i) => {
      if (i === index) {
        return currentPlayer;
      }
      return val;
    });
    setSquares(newData);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  useEffect(() => {
    const w = calculateWinner(squares);
    if (w) {
      setWinner(w);
    }

    if (!w && !squares.filter((square) => !square).length) {
      setWinner("BOTH");
    }
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full">
        <Link href="/">
          <ChevronLeftIcon className="mt-4 h-10 w-10 cursor-pointer rounded-full border border-gray-300 p-2 hover:bg-gray-200 focus:outline-none focus:ring focus:ring-purple-500 focus:ring-opacity-75" />
        </Link>
      </div>
      <Image
        src="/assets/icons/games.png"
        alt="Games logo"
        width={50}
        height={50}
      />
      <h1 className="mt-2 text-center text-3xl font-bold mb-2">Tic Tac Toe</h1>
      {!winner && <p>Hey {currentPlayer}, it&apos;s your turn</p>}
      {winner && winner !== "BOTH" && <p>Congratulations {winner}</p>}
      {winner && winner === "BOTH" && (
        <p>Congratulations you&apos;re both winners</p>
      )}
      <div className="grid grid-cols-3 my-4">
        {Array(9)
          .fill(null)
          .map((_, i) => {
            return (
              <Square
                winner={winner}
                key={i}
                onClick={() => setSquareValue(i)}
                value={squares[i]}
              />
            );
          })}
      </div>
      <button
        onClick={reset}
        className="mt-4 h-10 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-purple-500 focus:ring-opacity-75"
      >
        Reset
      </button>
    </div>
  );
};

export default Game;
