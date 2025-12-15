import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<div>OlderBean - 홈 페이지</div>} />
          {/* TODO: 페이지 라우트 추가 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

