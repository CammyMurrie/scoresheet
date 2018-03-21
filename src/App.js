import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentlyServing: 'A',
      scores: {
        A: 0,
        B: 0,
      },
      sets: {
        A: 0,
        B: 0,
      },
      rotations: {
        A: [10, 2, 6, 4, 8, 9],
        B: [3, 5, 7, 11, 12, 4],
      },
      setOver: false,
      setWinner: null,
    };
  }

  nextSet = (setWinner) => {
    const { sets, sets: { A, B } } = this.state;
    let setWinnerScore = sets[setWinner];

    this.setState({
      sets: {
        ...sets,
        [setWinner]: setWinnerScore+1,
      },
      scores: {
        A: 0,
        B: 0,
      },
      setOver: false,
      setWinner: null,
    });
  }

  rotate = (team) => {
    const { rotations } = this.state;
    let newRotation = rotations[team];
    let server = newRotation.shift();
    newRotation.push(server);

    return newRotation;
  }
  onScoreboardChangeA = (operator) => {
    const {
      scores,
      scores: { A, B },
      currentlyServing,
      rotations,
      rotations: { A: RotationA },
    } = this.state;

    if (operator === '+') {
      let newScore = A+1;
      let setOver = (newScore >= 25 && newScore-B>=2);
      let newRotation = currentlyServing==='B' ? this.rotate('A') : RotationA;
      this.setState({
        ...this.state,
        scores: {
          ...scores,
          A: newScore,
        },
        setOver,
        currentlyServing: 'A',
        rotations: {
          ...rotations,
          A: newRotation,
        },
        setWinner: setOver ? 'A' : null,
      });
    }
    if (operator === '-') {
      this.setState({
        ...this.state,
        scores: {
          ...scores,
          A: A-1,
        }
      });
    }
  };
  onScoreboardChangeB = (operator) => {
    const {
      scores,
      scores: { A, B },
      currentlyServing,
      rotations,
      rotations: { B: RotationB }
    } = this.state;

    if (operator === '+') {
      let newScore = B+1;
      let setOver = (newScore >= 25 && newScore-A>=2);
      let newRotation = currentlyServing==='A' ? this.rotate('B') : RotationB;
      this.setState({
        ...this.state,
        scores: {
          ...scores,
          B: newScore,
        },
        setOver,
        currentlyServing: 'B',
        rotations: {
          ...rotations,
          B: newRotation,
        },
        setWinner: setOver ? 'B' : null,
      });
    }
    if (operator === '-') {
      this.setState({
        ...this.state,
        scores: {
          ...scores,
          B: A-1,
        }
      });
    }
  };
  render() {
    const {
      scores: { A: ScoreA, B: ScoreB },
      setOver,
      rotations: { A: RotationA, B: RotationB },
      currentlyServing,
      sets: { A: SetsA, B: SetsB },
      setWinner,
    } = this.state;
    return (
      <div style={{width: '50%'}}>
        <div>
          Score: {ScoreA} Sets: {SetsA}
          <button disabled={setOver} onClick={() => this.onScoreboardChangeA('+')}>Plus A</button>
          <button disabled={setOver || ScoreA===0} onClick={() => this.onScoreboardChangeA('-')}>Minus A</button>
          {currentlyServing==='A' && 'serving'}
        </div>
        <div style={{ marginBottom: '20px' }}>
          Rotation
          <hr />
          <div style={{display: 'flex', justifyContent: 'space-between'}}><span>4: {RotationA[3]}</span><span>3: {RotationA[2]}</span><span>2: {RotationA[1]}</span></div>
          <div style={{display: 'flex', justifyContent: 'space-between'}}><span>5: {RotationA[4]}</span><span>6: {RotationA[5]}</span><span>1: {RotationA[0]}</span></div>
        </div>
        <div>
          Score: {ScoreB} Sets: {SetsB}
          <button disabled={setOver} onClick={() => this.onScoreboardChangeB('+')}>Plus B</button>
          <button disabled={setOver || ScoreB===0} onClick={() => this.onScoreboardChange('-')}>Minus B</button>
          {currentlyServing==='B' && 'serving'}
        </div>
        <div style={{ marginBottom: '20px' }}>
          Rotation
          <hr />
          <div style={{display: 'flex', justifyContent: 'space-between'}}><span>4: {RotationB[3]}</span><span>3: {RotationB[2]}</span><span>2: {RotationB[1]}</span></div>
          <div style={{display: 'flex', justifyContent: 'space-between'}}><span>5: {RotationB[4]}</span><span>6: {RotationB[5]}</span><span>1: {RotationB[0]}</span></div>
        </div>
        {setOver ? (
          <div>
            Set over
            <button onClick={() => this.nextSet(setWinner)}>Next Set</button>
          </div>
          )
          : null
        }
    </div>
    );
  }
}

export default App;
