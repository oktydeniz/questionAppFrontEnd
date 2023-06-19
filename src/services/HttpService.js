

export const PostWithAuth= (url, body) => {
    var request = fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token"),
        },
        body: JSON.stringify(body),
    })
    return request;
}



export const PuthWithAuth= (url, body) => {
    var request = fetch(url, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token"),
        },
        body: JSON.stringify(body),
    })
    return request;
}

export const GetWithAuth= (url) => {
    var request = fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token"),
        },
    })
    return request;
}


export const DeleteWithAuth= (url) => {
    var request = fetch(url, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token"),
        },
    })
    return request;
}