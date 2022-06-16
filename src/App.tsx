import LayoutStack from '@components/layout/LayoutStack';



function App() {

  // const [page, setPage] = useState(0)

  // const handlePages = (page: number) => {

  //   setPage(page);
  // }

  return (
    <div className="App">
      {/* {page === 0 ? <StartPage handlePages={handlePages}/> :} */}
        <LayoutStack />
    </div>
  );
}

export default App;
