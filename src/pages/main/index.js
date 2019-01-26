import React, { Component } from "react";
import PropTypes from "prop-types";
import {
    View,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ActivityIndicator
} from "react-native";
import styles from "./styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as FavoriteActions } from "~/store/ducks/favorites";

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
        favorites: PropTypes.shape({
            data: PropTypes.arrayOf(PropTypes.shape),
            errorOnAdd: PropTypes.oneOfType([null, PropTypes.string]),
            loading: PropTypes.bool
        }).isRequired
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
                        {!!this.props.favorites.errorOnAdd && (
                            <Text style={styles.error}>
                                {this.props.favorites.errorOnAdd}
                            </Text>
                        )}

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
                            {this.props.favorites.loading ? (
                                <ActivityIndicator
                                    size="small"
                                    color={styles.loading.color}
                                />
                            ) : (
                                <Text style={styles.buttonText}>
                                    Adicionar aos favoritos
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity onPress={this.navigateToFavorites}>
                        <Text style={styles.footerLink}>
                            Meus Favoritos ({this.props.favorites.data.length})
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => ({
    favorites: state.favorites
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(FavoriteActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);
