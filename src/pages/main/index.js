import React, { Component } from "react";
import PropTypes from "prop-types";
import {
    View,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView
} from "react-native";
import styles from "./styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as FavoriteActions from "~/store/actions/favorites";

//Alterada a cor da StatusBar para o IOS
//Usada a SafeAreaView devido a um problema no iphone x do texto do foote nao ficar ok

class Main extends Component {
    state = {
        repoNameInput: ""
    };

    static navigationOptions = {
        header: null
    };

    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func
        }).isRequired,
        addFavoriteRequest: PropTypes.func.isRequired,
        favoritesCount: PropTypes.number.isRequired
    };

    navigateToFavorites = () => {
        this.props.navigation.navigate("Favorites");
    };

    addRepository = () => {
        if (!this.state.repoNameInput) return;
        this.props.addFavoriteRequest(this.state.repoNameInput);
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" />

                <View style={styles.content}>
                    <Text style={styles.title}>Gitmark</Text>
                    <Text style={styles.description}>
                        Comece adicionando alguns repositórios aos favoritos.
                    </Text>

                    <View style={styles.form}>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholder="usuário/repositório"
                            underlineColorAndroid="transparent"
                            value={this.state.repoNameInput}
                            onChangeText={repoNameInput =>
                                this.setState({ repoNameInput })
                            }
                        />

                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.addRepository}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.buttonText}>
                                Adicionar aos favoritos
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity onPress={this.navigateToFavorites}>
                        <Text style={styles.footerLink}>
                            Meus Favoritos ({this.props.favoritesCount})
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => ({
    favoritesCount: state.favorites.length
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(FavoriteActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);
