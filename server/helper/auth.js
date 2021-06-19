const convertIntoLikesList = (list, user) => {
    const newList = list.map(e => {
        return {
            puzzlepieceId: e.puzzlepieceId,
            userHandle: user.handle
        }
    })
    return newList;
}

module.exports = {
    convertIntoLikesList
}