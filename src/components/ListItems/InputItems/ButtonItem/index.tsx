import React from "react"
import { Image, TouchableOpacity } from "react-native";

import { styles } from "./style";

export const ButtonItem = (props: any) => {
    return (
        <TouchableOpacity>
            <Image source={props.source} style={styles.actionIcon} />
        </TouchableOpacity>
    )
}