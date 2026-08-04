import React, { useEffect, useState } from 'react';

const COLS = ['A', 'B', 'C', 'D'];

const pokerScenarios = [
  {
    winner: '4',
    digit: '4',
    hint: 'Remember the poker hand rankings. One player can make an extremely powerful hand using the community cards.',
    community: [{ rank: 'A', suit: '♠' }, { rank: 'K', suit: '♠' }, { rank: 'Q', suit: '♠' }, { rank: '9', suit: '♦' }, { rank: '2', suit: '♣' }],
    players: [
      [{ rank: 'A', suit: '♥' }, { rank: '9', suit: '♣' }],
      [{ rank: 'K', suit: '♦' }, { rank: 'K', suit: '♣' }],
      [{ rank: '9', suit: '♠' }, { rank: '9', suit: '♥' }],
      [{ rank: 'J', suit: '♠' }, { rank: '10', suit: '♠' }]
    ]
  },
  {
    winner: '2',
    digit: '7',
    hint: 'Check whether any player can use the community cards to form four of a kind.',
    community: [{ rank: 'A', suit: '♠' }, { rank: 'A', suit: '♥' }, { rank: 'A', suit: '♦' }, { rank: 'K', suit: '♣' }, { rank: '3', suit: '♣' }],
    players: [
      [{ rank: 'K', suit: '♠' }, { rank: 'Q', suit: '♠' }],
      [{ rank: 'A', suit: '♣' }, { rank: '2', suit: '♦' }],
      [{ rank: 'K', suit: '♥' }, { rank: 'J', suit: '♣' }],
      [{ rank: '3', suit: '♥' }, { rank: '3', suit: '♠' }]
    ]
  },
  {
    winner: '1',
    digit: '2',
    hint: 'Look for players who can connect five cards in sequence of the same suit.',
    community: [{ rank: '6', suit: '♥' }, { rank: '7', suit: '♥' }, { rank: '8', suit: '♥' }, { rank: 'K', suit: '♣' }, { rank: 'K', suit: '♦' }],
    players: [
      [{ rank: '5', suit: '♥' }, { rank: '9', suit: '♥' }],
      [{ rank: 'K', suit: '♥' }, { rank: '2', suit: '♣' }],
      [{ rank: '8', suit: '♠' }, { rank: '8', suit: '♣' }],
      [{ rank: 'A', suit: '♣' }, { rank: 'J', suit: '♣' }]
    ]
  },
  {
    winner: '3',
    digit: '8',
    hint: 'If multiple players make a flush, compare the highest cards in each flush.',
    community: [{ rank: '2', suit: '♣' }, { rank: '6', suit: '♣' }, { rank: '9', suit: '♣' }, { rank: 'Q', suit: '♦' }, { rank: '4', suit: '♥' }],
    players: [
      [{ rank: 'A', suit: '♦' }, { rank: 'A', suit: '♥' }],
      [{ rank: 'Q', suit: '♣' }, { rank: '3', suit: '♣' }],
      [{ rank: 'A', suit: '♣' }, { rank: 'K', suit: '♣' }],
      [{ rank: '9', suit: '♦' }, { rank: '9', suit: '♥' }]
    ]
  },
  {
    winner: '2',
    digit: '6',
    hint: 'See whether any player can combine three matching cards and two matching cards into a full house.',
    community: [{ rank: 'Q', suit: '♠' }, { rank: 'Q', suit: '♦' }, { rank: '10', suit: '♣' }, { rank: '4', suit: '♥' }, { rank: '2', suit: '♣' }],
    players: [
      [{ rank: 'A', suit: '♠' }, { rank: 'K', suit: '♠' }],
      [{ rank: 'Q', suit: '♣' }, { rank: '10', suit: '♦' }],
      [{ rank: '10', suit: '♥' }, { rank: '10', suit: '♠' }],
      [{ rank: 'A', suit: '♦' }, { rank: '4', suit: '♣' }]
    ]
  },
  {
    winner: '1',
    digit: '9',
    hint: 'A straight uses five consecutive ranks. Check all possible combinations.',
    community: [{ rank: '10', suit: '♦' }, { rank: 'J', suit: '♣' }, { rank: 'Q', suit: '♥' }, { rank: '3', suit: '♣' }, { rank: '7', suit: '♠' }],
    players: [
      [{ rank: 'K', suit: '♠' }, { rank: 'A', suit: '♥' }],
      [{ rank: 'Q', suit: '♣' }, { rank: 'Q', suit: '♦' }],
      [{ rank: '9', suit: '♥' }, { rank: '8', suit: '♥' }],
      [{ rank: 'J', suit: '♦' }, { rank: '7', suit: '♣' }]
    ]
  }
];

const sudokuScenarios = [
  {
    target: 'C3',
    grid: [['1', '?', '3', '?'], ['?', '4', '?', '2'], ['2', '?', '?', '?'], ['?', '3', '2', '1']],
    solution: [['1', '2', '3', '4'], ['3', '4', '1', '2'], ['2', '1', '4', '3'], ['4', '3', '2', '1']]
  },
  {
    target: 'B4',
    grid: [['2', '?', '4', '?'], ['?', '3', '?', '1'], ['1', '?', '3', '4'], ['3', '?', '1', '?']],
    solution: [['2', '1', '4', '3'], ['4', '3', '2', '1'], ['1', '2', '3', '4'], ['3', '4', '1', '2']]
  },
  {
    target: 'A1',
    grid: [['?', '3', '?', '2'], ['4', '?', '1', '?'], ['?', '1', '?', '4'], ['2', '?', '3', '1']],
    solution: [['1', '3', '4', '2'], ['4', '2', '1', '3'], ['3', '1', '2', '4'], ['2', '4', '3', '1']]
  }
];

const nerdleScenarios = [
  { equation: '12+35=47', digit: '7', clue: 'Addition unlocks this firewall.' },
  { equation: '90-45=45', digit: '5', clue: 'Subtraction balances the system.' },
  { equation: '06*07=42', digit: '2', clue: 'The AI padded one side with a zero.' },
  { equation: '084/7=12', digit: '4', clue: 'Division protects the shutdown terminal.' },
  { equation: '17+18=35', digit: '3', clue: 'A true equation opens the next lock.' }
];

const wordleScenarios = [
  { word: 'CACHE', digit: '7', clue: 'Stores data temporarily to improve performance.' },
  { word: 'ROBOT', digit: '5', clue: 'An automated worker the AI deployed across the office.' },
  { word: 'CLOUD', digit: '8', clue: 'Where the AI moved the company systems.' },
  { word: 'LOGIN', digit: '6', clue: 'The first step to regain access to locked systems.' },
  { word: 'EMAIL', digit: '3', clue: 'The communication channel the AI intercepted first.' }
];

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function normalize(value) {
  return String(value || '').trim().toUpperCase();
}

function getCellRef(row, col) {
  return COLS[col] + String(row + 1);
}

function buildSudokuEntries(grid) {
  const entries = {};
  grid.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell === '?') entries[getCellRef(rowIndex, colIndex)] = '';
    });
  });
  return entries;
}

function createGame() {
  const poker = pick(pokerScenarios);
  const sudoku = pick(sudokuScenarios);
  const nerdle = pick(nerdleScenarios);
  const wordle = pick(wordleScenarios);
  const row = Number(sudoku.target.slice(1)) - 1;
  const col = COLS.indexOf(sudoku.target[0]);
  return {
    poker,
    sudoku: { ...sudoku, digit: sudoku.solution[row][col] },
    nerdle,
    wordle
  };
}

function evaluateGuess(guess, target) {
  const result = Array(target.length).fill('absent');
  const targetChars = target.split('');
  const used = Array(target.length).fill(false);
  for (let i = 0; i < target.length; i += 1) {
    if (guess[i] === targetChars[i]) {
      result[i] = 'correct';
      used[i] = true;
    }
  }
  for (let i = 0; i < target.length; i += 1) {
    if (result[i] === 'correct') continue;
    const found = targetChars.findIndex((ch, index) => ch === guess[i] && !used[index]);
    if (found !== -1) {
      result[i] = 'present';
      used[found] = true;
    }
  }
  return result;
}

function cleanEquation(value) {
  return String(value || '').replace(/[^0-9+\-*/=]/g, '').slice(0, 8);
}

function evalMath(expression) {
  if (!/^\d+(?:[+\-*/]\d+)*$/.test(expression)) return null;
  const tokens = expression.match(/\d+|[+\-*/]/g);
  if (!tokens) return null;
  const values = [Number(tokens[0])];
  const ops = [];
  for (let i = 1; i < tokens.length; i += 2) {
    const op = tokens[i];
    const next = Number(tokens[i + 1]);
    if (!Number.isFinite(next)) return null;
    if (op === '*') values[values.length - 1] *= next;
    else if (op === '/') {
      if (next === 0) return null;
      values[values.length - 1] /= next;
    } else {
      ops.push(op);
      values.push(next);
    }
  }
  let total = values[0];
  ops.forEach((op, index) => {
    if (op === '+') total += values[index + 1];
    if (op === '-') total -= values[index + 1];
  });
  return total;
}

function validEquation(equation) {
  const parts = equation.split('=');
  if (equation.length !== 8 || parts.length !== 2) return false;
  const left = parts[0];
  const right = parts[1];
  if (!left || !right || !/^\d+$/.test(right)) return false;
  const leftValue = evalMath(left);
  const rightValue = Number(right);
  return Number.isFinite(leftValue) && Number.isFinite(rightValue) && leftValue === rightValue;
}

function Suit({ suit }) {
  const isRed = suit === '♥' || suit === '♦';
  return <span className={isRed ? 'redSuit' : 'whiteSuit'}>{suit}</span>;
}

function Cards({ cards }) {
  return (
    <span className="cards">
      {cards.map((card, index) => (
        <span key={index} className="playingCard">
          <span>{card.rank}</span>
          <Suit suit={card.suit} />
        </span>
      ))}
    </span>
  );
}

function RoomCard({ number, title, subtitle, done, children }) {
  return (
    <section className="room">
      <div className="roomHeader">
        <div className="roomTitleWrap">
          <div className="roomNumber">{number}</div>
          <div>
            <h2 className="roomTitle">{title}</h2>
            <p className="roomSubtitle">{subtitle}</p>
          </div>
        </div>
        <span className={`unlockBadge ${done ? 'done' : ''}`}>{done ? 'Unlocked' : 'Locked'}</span>
      </div>
      <div className="roomBody">{children}</div>
    </section>
  );
}

function Legend() {
  return (
    <div className="legend">
      <div className="legendItem"><span className="legendSwatch correctSwatch" />Correct spot</div>
      <div className="legendItem"><span className="legendSwatch presentSwatch" />Wrong spot</div>
      <div className="legendItem"><span className="legendSwatch absentSwatch" />Not included</div>
    </div>
  );
}

function App() {
  const [game, setGame] = useState(() => createGame());
  const [timeLeft, setTimeLeft] = useState(1800);
  const [pokerAnswer, setPokerAnswer] = useState('');
  const [sudokuEntries, setSudokuEntries] = useState(() => buildSudokuEntries(game.sudoku.grid));
  const [nerdleGuess, setNerdleGuess] = useState('');
  const [nerdleGuesses, setNerdleGuesses] = useState([]);
  const [nerdleMessage, setNerdleMessage] = useState('');
  const [wordleGuess, setWordleGuess] = useState('');
  const [wordleGuesses, setWordleGuesses] = useState([]);
  const [wordleMessage, setWordleMessage] = useState('');

  // Hint visibility state for all puzzles
  const [showPokerHint, setShowPokerHint] = useState(false);
  const [showSudokuHint, setShowSudokuHint] = useState(false);
  const [showNerdleHint, setShowNerdleHint] = useState(false);
  const [showWordleHint, setShowWordleHint] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const sudokuRow = Number(game.sudoku.target.slice(1)) - 1;
  const sudokuCol = COLS.indexOf(game.sudoku.target[0]);
  const sudokuTargetAnswer = game.sudoku.solution[sudokuRow][sudokuCol];
  const sudokuTargetEntry = sudokuEntries[game.sudoku.target] || '';

  const pokerDone = normalize(pokerAnswer) === game.poker.winner;
  const sudokuDone = sudokuTargetEntry === sudokuTargetAnswer;
  const nerdleDone = nerdleGuesses.includes(game.nerdle.equation);
  const wordleDone = wordleGuesses.includes(game.wordle.word);
  const completed = [pokerDone, sudokuDone, nerdleDone, wordleDone];
  const solvedCount = completed.filter(Boolean).length;
  const progress = solvedCount * 25;
  const digits = [game.poker.digit, game.sudoku.digit, game.nerdle.digit, game.wordle.digit];
  const codeFragments = digits.map((digit, index) => (completed[index] ? digit : '_')).join(' ');
  const fullCode = digits.join('');

  const editableCells = Object.keys(sudokuEntries);
  const filledCells = editableCells.filter((key) => sudokuEntries[key] !== '').length;
  const correctCells = editableCells.filter((key) => {
    const col = COLS.indexOf(key[0]);
    const row = Number(key.slice(1)) - 1;
    return sudokuEntries[key] === game.sudoku.solution[row][col];
  }).length;

  function resetGame() {
    const nextGame = createGame();
    setGame(nextGame);
    setTimeLeft(1800);
    setPokerAnswer('');
    setSudokuEntries(buildSudokuEntries(nextGame.sudoku.grid));
    setNerdleGuess('');
    setNerdleGuesses([]);
    setNerdleMessage('');
    setWordleGuess('');
    setWordleGuesses([]);
    setWordleMessage('');

    // Hide all hints on reset
    setShowPokerHint(false);
    setShowSudokuHint(false);
    setShowNerdleHint(false);
    setShowWordleHint(false);
  }

  function updateSudoku(cell, value) {
    const clean = value.replace(/[^1-4]/g, '').slice(0, 1);
    setSudokuEntries((prev) => ({ ...prev, [cell]: clean }));
  }

  function sudokuStyle(cell, row, col) {
    const value = sudokuEntries[cell] || '';
    const correct = game.sudoku.solution[row][col];
    const isTarget = cell === game.sudoku.target;
    if (isTarget && value === '') return 'targetCell';
    if (isTarget && value === correct) return 'correctCell targetSolvedCell';
    if (isTarget && value !== correct) return 'targetCell';
    if (value === '') return 'emptyCell';
    if (value === correct) return 'correctCell';
    return 'wrongCell';
  }

  function submitNerdle() {
    const guess = cleanEquation(nerdleGuess);
    if (nerdleDone) return;
    if (guess.length !== 8) {
      setNerdleMessage('Enter exactly 8 characters.');
      return;
    }
    if (!guess.includes('=')) {
      setNerdleMessage('Your equation must include an equals sign.');
      return;
    }
    if (!validEquation(guess)) {
      setNerdleMessage('That equation is not mathematically true.');
      return;
    }
    setNerdleGuesses((prev) => [...prev, guess]);
    setNerdleGuess('');
    setNerdleMessage(guess === game.nerdle.equation ? `Solved. Digit unlocked: ${game.nerdle.digit}` : 'Equation accepted. Use the colors to narrow it down.');
  }

  function submitWordle() {
    const guess = normalize(wordleGuess).replace(/[^A-Z]/g, '').slice(0, 5);
    if (wordleDone) return;
    if (guess.length !== 5) {
      setWordleMessage('Enter a 5-letter guess.');
      return;
    }
    setWordleGuesses((prev) => [...prev, guess]);
    setWordleGuess('');
    setWordleMessage(guess === game.wordle.word ? `Solved. Digit unlocked: ${game.wordle.digit}` : 'Guess submitted. Use the colors to narrow it down.');
  }

  function tileClass(status, isWord = false) {
    const base = isWord ? 'tile wordTile' : 'tile';
    if (status === 'correct') return `${base} tileCorrect`;
    if (status === 'present') return `${base} tilePresent`;
    return `${base} tileAbsent`;
  }

  return (
    <div className="appBackground">
      <div className="shell">
        <header className="hero">
          <div>
            <p className="eyebrow">Digital Escape Room</p>
            <h1>AI Has Taken Over the Office</h1>
            <p className="subtle">Solve four puzzle rooms to recover the shutdown code and restore human control.</p>
          </div>
          <button className="resetButton" onClick={resetGame}>Reset and Randomize</button>
        </header>

        <div className="dashboard">
          <div className="statCard redCard">
            <p className="statLabel">Countdown</p>
            <p className="timerText">{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</p>
          </div>
          <div className="statCard wideCard">
            <div className="progressHeader">
              <p className="statLabel">Mission Progress</p>
              <p className="cyanText">{solvedCount}/4 rooms</p>
            </div>
            <div className="progressBar">
              <div className="progressFill" style={{ width: `${progress}%` }} />
            </div>
            <div className="roomStatusGrid">
              {completed.map((done, index) => (
                <div key={index} className={`statusPill ${done ? 'done' : ''}`}>Room {index + 1}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Room 1: Poker */}
        <RoomCard number="1" title="Casino Firewall" subtitle="Find the Texas Holdem winner. The winning player number becomes the first digit." done={pokerDone}>
          <div className="pokerGrid">
            <div className="greenPanel">
              <p className="panelLabel">Community Cards</p>
              <div className="largeCards"><Cards cards={game.poker.community} /></div>
            </div>
            <div className="playersGrid">
              {game.poker.players.map((hand, index) => (
                <div key={index} className="playerPanel">Player {index + 1}<br /><Cards cards={hand} /></div>
              ))}
            </div>
          </div>

          {showPokerHint ? (
            <div>
              <p className="subtle hintText">
                Hint: {game.poker.hint}
              </p>

              <button
                className="purpleButton"
                onClick={() => setShowPokerHint(false)}
              >
                Hide Hint
              </button>
            </div>
          ) : (
            <button
              className="purpleButton"
              onClick={() => setShowPokerHint(true)}
            >
              Show Hint
            </button>
          )}

          <div className="inputRow">
            <input value={pokerAnswer} onChange={(event) => setPokerAnswer(event.target.value)} placeholder="Winning player number" className="textInput" />
            {pokerDone && <p className="successText">Correct. Digit unlocked: {game.poker.digit}</p>}
          </div>
        </RoomCard>

        {/* Room 2: Sudoku */}
        <RoomCard number="2" title="Spreadsheet Audit Sudoku" subtitle={`Solve the grid and determine cell ${game.sudoku.target}. That value becomes the second digit.`} done={sudokuDone}>
          {showSudokuHint ? (
            <div style={{ marginBottom: '0.75rem' }}>
              <p className="subtle hintText">
                Hint: Focus on small 4×4 Sudoku rules—each row, column, and 2×2 box must contain 1–4 exactly once.
              </p>
              <button
                className="purpleButton"
                onClick={() => setShowSudokuHint(false)}
              >
                Hide Hint
              </button>
            </div>
          ) : (
            <button
              className="purpleButton"
              style={{ marginBottom: '0.75rem' }}
              onClick={() => setShowSudokuHint(true)}
            >
              Show Hint
            </button>
          )}

          <div className="sudokuLayout">
            <div className="tableScroll">
              <table className="sudokuTable">
                <thead><tr><th></th>{COLS.map((col) => <th key={col}>{col}</th>)}</tr></thead>
                <tbody>
                  {game.sudoku.grid.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      <th>{rowIndex + 1}</th>
                      {row.map((cell, colIndex) => {
                        const currentRef = getCellRef(rowIndex, colIndex);
                        return (
                          <td key={currentRef}>
                            {cell === '?' ? <input value={sudokuEntries[currentRef] || ''} onChange={(event) => updateSudoku(currentRef, event.target.value)} className={sudokuStyle(currentRef, rowIndex, colIndex)} inputMode="numeric" maxLength={1} /> : <div className="fixedCell">{cell}</div>}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="auditPanel">
              <h3>Audit Panel</h3>
              <p>Filled cells: <b>{filledCells}/{editableCells.length}</b></p>
              <p>Correct entries: <b>{correctCells}/{editableCells.length}</b></p>
              <p>Target cell: <b className="redText">{game.sudoku.target}</b></p>
              {sudokuDone && <p className="successText">Correct. Digit unlocked: {game.sudoku.digit}</p>}
            </div>
          </div>
        </RoomCard>

        {/* Room 3: Nerdle */}
        <RoomCard number="3" title="AI Equation Firewall" subtitle="Guess the hidden 8-character equation. Valid equations can use +, -, *, /, and =." done={nerdleDone}>
          {showNerdleHint ? (
            <div>
              <p className="subtle">
                Clue: <b>{game.nerdle.clue}</b>
              </p>
              <button
                className="purpleButton"
                onClick={() => setShowNerdleHint(false)}
                style={{ marginBottom: '0.75rem', marginTop: '0.5rem' }}
              >
                Hide Hint
              </button>
            </div>
          ) : (
            <button
              className="purpleButton"
              onClick={() => setShowNerdleHint(true)}
              style={{ marginBottom: '0.75rem' }}
            >
              Show Hint
            </button>
          )}

          <div className="gamePanel">
            <div className="tileRows">
              {nerdleGuesses.map((guess, rowIndex) => {
                const statuses = evaluateGuess(guess, game.nerdle.equation);
                return <div key={`${guess}-${rowIndex}`} className="tileRow">{guess.split('').map((ch, index) => <div key={index} className={tileClass(statuses[index])}>{ch}</div>)}</div>;
              })}
              {!nerdleDone && <div className="tileRow">{Array.from({ length: 8 }).map((_, index) => <div key={index} className="tile">{nerdleGuess[index] || ''}</div>)}</div>}
            </div>
            <div className="inputRow centeredRow">
              <input value={nerdleGuess} onChange={(event) => setNerdleGuess(cleanEquation(event.target.value))} onKeyDown={(event) => { if (event.key === 'Enter') submitNerdle(); }} disabled={nerdleDone} placeholder="Enter 8-char equation" className="textInput" />
              <button onClick={submitNerdle} disabled={nerdleDone} className="purpleButton">Submit</button>
            </div>
            {nerdleMessage && <p className={nerdleDone ? 'successText' : 'subtle'}>{nerdleMessage}</p>}
            <Legend />
          </div>
        </RoomCard>

        {/* Room 4: Wordle */}
        <RoomCard number="4" title="AI Word Firewall" subtitle="Guess the 5-letter office AI word. Each guess adds a new row." done={wordleDone}>
          {showWordleHint ? (
            <div>
              <p className="subtle">
                Clue: <b>{game.wordle.clue}</b>
              </p>
              <button
                className="purpleButton"
                onClick={() => setShowWordleHint(false)}
                style={{ marginBottom: '0.75rem', marginTop: '0.5rem' }}
              >
                Hide Hint
              </button>
            </div>
          ) : (
            <button
              className="purpleButton"
              onClick={() => setShowWordleHint(true)}
              style={{ marginBottom: '0.75rem' }}
            >
              Show Hint
            </button>
          )}

          <div className="gamePanel">
            <div className="tileRows">
              {wordleGuesses.map((guess, rowIndex) => {
                const statuses = evaluateGuess(guess, game.wordle.word);
                return <div key={`${guess}-${rowIndex}`} className="tileRow">{guess.split('').map((ch, index) => <div key={index} className={tileClass(statuses[index], true)}>{ch}</div>)}</div>;
              })}
              {!wordleDone && <div className="tileRow">{[0, 1, 2, 3, 4].map((index) => <div key={index} className="tile wordTile">{wordleGuess[index] || ''}</div>)}</div>}
            </div>
            <div className="inputRow centeredRow">
              <input value={wordleGuess} onChange={(event) => setWordleGuess(event.target.value.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 5))} onKeyDown={(event) => { if (event.key === 'Enter') submitWordle(); }} disabled={wordleDone} placeholder="Enter 5-letter word" className="textInput uppercaseInput" />
              <button onClick={submitWordle} disabled={wordleDone} className="purpleButton">Submit</button>
            </div>
            {wordleMessage && <p className={wordleDone ? 'successText' : 'subtle'}>{wordleMessage}</p>}
            <Legend />
          </div>
        </RoomCard>

        <div className="codePanel">
          <p className="statLabel">Shutdown Code Fragments</p>
          <p className="codeText">{codeFragments}</p>
          {solvedCount === 4 && <p className="successText">Final shutdown code recovered: {fullCode}. The office has been saved.</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
