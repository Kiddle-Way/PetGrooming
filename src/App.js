import { Provider } from "react-redux"; // react-redux에서 Provider 가져오기
import { RouterProvider } from "react-router-dom";
import root from "./common/router/root";
import store from "./store"; // Redux 스토어 가져오기

function App() {
  return (
    <Provider store={store}>
      {" "}
      {/* Provider로 Redux 스토어 제공 */}
      <RouterProvider router={root} />
    </Provider>
  );
}

export default App;
