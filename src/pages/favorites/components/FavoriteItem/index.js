import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";
import propTypes from "prop-types";

const FavoriteItem = ({ favorite: { name, owner, description } }) => (
    <View style={styles.container}>
        <Image style={styles.avatar} source={{ uri: owner.avatar_url }} />
        <View style={styles.info}>
            <Text style={styles.title}>{name}</Text>
            <Text numberOfLines={2} style={styles.description}>
                {description}
            </Text>
        </View>
    </View>
);

FavoriteItem.propTypes = {
    favorite: propTypes.shape({
        name: propTypes.string,
        description: propTypes.string,
        owner: propTypes.shape({
            avatar_url: propTypes.string
        })
    }).isRequired
};

export default FavoriteItem;
