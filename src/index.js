import React from "react";
import "~/config/ReactotronConfig";
import { Provider } from "react-redux";
import { View, StyleSheet, Component, Text } from "react-native";
import store from "~/store";
import Routes from "~/routes";

const App = () => (
    <Provider store={store}>
        <Routes />
    </Provider>
);

export default App;
