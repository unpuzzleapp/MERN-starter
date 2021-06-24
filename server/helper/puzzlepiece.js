const mergeCreatedBy = (obj) => {
    const {createdBy, ...newProps} = obj;
    const returner = {
        ...newProps,
        userHandle: createdBy.handle,
        userImage: createdBy.imageUrl,
    }
    return returner;
}
const mergeCreatedByList = (list) => {
    const newList = list.map(element => {
        return mergeCreatedBy(element.toJSON());
    })
    return newList;
}
const mergeComments = (obj) => {
    const {userId, ...newProps} = obj;
    const returner = {
        ...newProps,
        userHandle: userId.handle,
        userImage: userId.imageUrl,
    }
    return returner;
}
const mergeCommentsList = (obj) => {
    const newObj = {...obj};
    newObj.comments = obj.comments.map(element => {
        return mergeComments(element);
    })
    return newObj;
}
module.exports = {
    mergeCreatedByList,
    mergeCreatedBy,
    mergeCommentsList,
    mergeComments,
}