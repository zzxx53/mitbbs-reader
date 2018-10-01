const navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    return {
        title: `${state.params.title}`,
    };
};

ChangeThisTitle = (titleText) => {
    const { setParams } = this.props.navigation;
    setParams({ title: titleText })
}
