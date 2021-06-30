// test-utils.js
import React from 'react'
import {render as rtlRender} from '@testing-library/react'
import {applyMiddleware, createStore} from 'redux'
import thunk from "redux-thunk"
import {Provider} from 'react-redux'
// Import your own reducer
import {rootReducer} from "./src/store/store";

function render(
    ui,
    {
        initialState,
        store = createStore(rootReducer, initialState, applyMiddleware(thunk)),
        ...renderOptions
    } = {}
) {
    function Wrapper({children}) {
        return <Provider store={store}>{children}</Provider>
    }

    return rtlRender(ui, {wrapper: Wrapper, ...renderOptions})
}

// re-export everything
export * from '@testing-library/react'
// override render method
export {render}
