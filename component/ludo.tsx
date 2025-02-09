'use client';
export default function Ludo() {
  return (
    <div className="ludo-board">
      {/* Top section */}
      <div className="board-row">
        <div className="player-home green"></div>
        <div className="center-section"></div>
        <div className="player-home red"></div>
      </div>
      
      {/* Middle section */}
      <div className="board-row center">
        <div className="center-section"></div>
        <div className="center-cross"></div>
        <div className="center-section"></div>
      </div>
      
      {/* Bottom section */}
      <div className="board-row">
        <div className="player-home yellow"></div>
        <div className="center-section"></div>
        <div className="player-home blue"></div>
      </div>

      <style jsx>{`
        .ludo-board {
          display: flex;
          flex-direction: column;
          width: 600px;
          height: 600px;
          border: 2px solid #333;
          margin: 20px auto;
        }

        .board-row {
          display: flex;
          flex: 1;
        }

        .player-home {
          width: 200px;
          height: 200px;
          border: 2px solid #333;
        }

        .green { background-color: #90EE90; }
        .red { background-color: #FFB6B6; }
        .yellow { background-color: #FFFF99; }
        .blue { background-color: #ADD8E6; }

        .center-section {
          flex: 1;
          border: 2px solid #333;
          background-color: #fff;
        }

        .center-cross {
          flex: 1;
          border: 2px solid #333;
          background: linear-gradient(
            45deg, 
            transparent 45%, 
            #333 45%, 
            #333 55%, 
            transparent 55%
          ),
          linear-gradient(
            -45deg, 
            transparent 45%, 
            #333 45%, 
            #333 55%, 
            transparent 55%
          );
        }
      `}</style>
    </div>
  );
}

