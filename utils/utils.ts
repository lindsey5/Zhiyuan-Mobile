export const getItemWidth = (screenWidth : number, numColumns : number, containerPadding = 20, spacing = 10) => {
    return (screenWidth - containerPadding * 2 - spacing * (numColumns - 1)) / numColumns;
};