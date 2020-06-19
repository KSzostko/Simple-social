import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import UsercContainer from './components/UsersContainer';

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <UsercContainer />
            </div>
        </Provider>
    );
}

export default App;
